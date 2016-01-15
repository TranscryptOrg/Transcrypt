# ====== Legal notices
#
# Copyright (C) 2015 GEATEC engineering
#
# This program is free software.
# You can use, redistribute and/or modify it, but only under the terms stated in the QQuickLicence.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY, without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
# See the QQuickLicense for details.
#
# The QQuickLicense can be accessed at: http://www.qquick.org/licence.html

import os
import sys
import ast
import traceback
import datetime
import shutil

from org.transcrypt import __base__, utils, minify

class ModuleMetadata:
	def __init__ (self, program, name):
		self.name = name
		searchList = []
		for searchDir in program.moduleSearchDirs:
			relPrepath = self.name.replace ('.', '/')
			prepath = '{}/{}'.format (searchDir, relPrepath)			
			self.isDir = os.path.isdir (prepath)
			
			if self.isDir:
				self.sourceDir = prepath
				self.filePrename = '__init__'
			else:				
				self.sourceDir, self.filePrename = prepath.rsplit ('/', 1)
							
			# Target dir should be the JavaScript subdir of the sourceDir
			self.targetDir = '{}/{}'.format (self.sourceDir, program.outSubdir)
			
			self.sourcePath = '{}/{}.py' .format (self.sourceDir, self.filePrename)
			self.targetPath = '{}/{}.mod.js'.format (self.targetDir, self.filePrename)
			
			searchedModulePaths = [self.sourcePath, self.targetPath]
			
			if (os.path.isfile (self.sourcePath) or os.path.isfile (self.targetPath)):
				break;	
		else:
			# If even the target can't be loaded then there's a problem with this module, root or not
			raise utils.Error (
				message = '\n\tAttempt to load module: {}\n\tCan\'t find any of:\n\t\t{}\n'.format (self.name, '\n\t\t'. join (searchedModulePaths))
			)
			
	def sourceExists (self):
		return os.path.isfile (self.sourcePath)
		
	def targetExists (self):
		return os.path.isfile (self.targetPath)
		
	def exists (self):
		return self.sourceExists () or self.targetExists ()
		
	def dirty (self):
		# Find youngest of .py and .js files and use that as "original"
		youngestTime = 0
		youngestPath = None
		for path in self.targetPath, self.sourcePath:					# Order matters
			if os.path.isfile (path):
				pathTime = os.path.getmtime (path)
				if utils.commandArgs.build or pathTime > youngestTime:	# Builds correctly also if some source files are missing
					youngestTime = pathTime
					youngestPath = path
					
		return youngestPath == self.sourcePath
	
class Program:
	def __init__ (self, moduleSearchDirs):
		self.header = '"use strict";\n// {}\'ed from Python, {}\n'.format (
			__base__.__envir__.transpilerName.capitalize (), datetime.datetime.now ().strftime ('%Y-%m-%d %H:%M:%S'),
		)
		
		self.moduleSearchDirs = moduleSearchDirs
		
		self.sourcePath = os.path.abspath (utils.commandArgs.source) .replace ('\\', '/')
		self.sourceDir = '/'.join (self.sourcePath.split ('/') [ : -1])
		self.sourceFileName = self.sourcePath.split ('/') [-1]
		
		self.outSubdir = 'javascript'
		
		self.moduleDict = {}
		self.fragments = {}
		self.compile ()
		
	def compile (self):
		# Define names early, since they are cross-used in module compilation
		prefix = 'org.{}'.format (__base__.__envir__.transpilerName)
		self.coreModuleName = '{}.{}'.format (prefix, '__core__')
		self.baseModuleName = '{}.{}'.format (prefix, '__base__')
		self.builtinModuleName = '{}.{}'.format (prefix, '__builtin__')
		self.mainModuleName = self.sourceFileName [ : -3]

		# Module compilation
		Module (self, ModuleMetadata (self, self.coreModuleName))
		Module (self, ModuleMetadata (self, self.baseModuleName))
		Module (self, ModuleMetadata (self, self.builtinModuleName))
					
		try:
			Module (self, ModuleMetadata (self, self.mainModuleName))	# Will trigger recursive compilation
		except Exception as exception:
			utils.enhanceException (exception, message = 'Error: can\'t compile {}\n'.format (self.sourcePath))
			
		# Join all non-inline modules
		normallyImportedTargetCode = ''.join ([
			self.moduleDict [moduleName] .targetCode
			for moduleName in sorted (self.moduleDict)
			if not moduleName in (self.coreModuleName, self.baseModuleName, self.builtinModuleName, self.mainModuleName)
		])
		
		# And sandwich them between the in-line modules
		targetCode = (
			self.header +
			'function {} () {{\n'.format (self.mainModuleName) +
			self.moduleDict [self.coreModuleName].targetCode +
			self.moduleDict [self.baseModuleName] .targetCode +
			self.moduleDict [self.builtinModuleName].targetCode +
			normallyImportedTargetCode +
			self.moduleDict [self.mainModuleName].targetCode +
			'	return __all__;\n' +
			'}\n' +
			'window [\'{0}\'] = {0};\n'.format (self.mainModuleName)
		)	
		
		targetFileName = '{}/{}.js'.format ('{}/{}'.format (self.sourceDir, self.outSubdir), self.mainModuleName)
		utils.log (False, 'Saving result in: {}\n', targetFileName)
		with utils.create (targetFileName) as aFile:
			aFile.write (targetCode)

		miniFileName = '{}/{}/{}.min.js'.format (self.sourceDir, self.outSubdir, self.mainModuleName)
		utils.log (False, 'Saving minified result in: {}\n', miniFileName)
		minify.run (targetFileName, miniFileName)
		
	def provide (self, moduleName):
		if moduleName == '__main__':
			moduleName = self.mainModuleName
	
		moduleMetadata = ModuleMetadata (self, moduleName)
		
		if moduleMetadata.name in self.moduleDict:	# Find out if module is already provided
			return self.moduleDict [moduleMetadata.name] 
		else:										# If not, provide by loading or compiling
			return Module (self, moduleMetadata)
						
class Module:
	def __init__ (self, program, moduleMetadata, strip = False):
		self.program = program
		self.metadata = moduleMetadata	# May contain dots if it's imported
		self.program.moduleDict [self.metadata.name] = self
		
		if self.metadata.dirty ():
			self.parse ()
			self.dump ()
			self.generate ()
			self.extract ()
			self.saveJavascript ()
		else:
			self.loadJavascript ()
			self.extract ()
		
	def loadJavascript (self):
		utils.log (False, 'Loading precompiled module: {}\n', self.metadata.targetPath)
		
		with open (self.metadata.targetPath) as aFile:
			self.targetCode = aFile.read ()
			
		if False and self.metadata.name in (self.coreModuleName, self.program.builtinModuleName):
			# Remove comment-like line tails and empty lines (so no // inside a string allowed)
			self.targetCode = '{}\n'.format (
				'\n'.join ([line for line in [line.split ('//') [0] .rstrip () for line in self.targetCode.split ('\n')] if line])
			)
			
	def saveJavascript (self,):
		utils.log (False, 'Saving precompiled module: {}\n', self.metadata.targetPath)
		
		with utils.create (self.metadata.targetPath) as aFile:
			aFile.write (self.targetCode)

	def extract (self):
		utils.log (False, 'Extracting metadata from: {}\n', self.metadata.targetPath)
		allFragment = self.targetCode [self.targetCode.rfind ('<all>') : self.targetCode.rfind ('</all>')]
		
		self.all = sorted (set ([
			word [1 : ]
			for word in allFragment.replace ('__all__', ' ') .replace ('=', ' ') .split ()
			if word.startswith ('.')
		])) # So skip the words 'var' and 'return'
			
	def parse (self):
		utils.log (False, 'Parsing module: {}\n', self.metadata.sourcePath)
		
		with open (self.metadata.sourcePath) as sourceFile:
			self.sourceCode = sourceFile.read ()
			
		self.parseTree = None
		
		if not self.parseTree:
			self.parseTree = ast.parse (self.sourceCode)
		
	def dump (self):
		utils.log (False, 'Dumping syntax tree of module: {}\n', self.metadata.sourcePath)

		def walk (name, value, tabLevel):
			self.treeFragments .append ('\n{0}{1}: {2} '.format (tabLevel * '\t', name, type (value).__name__ ))
			if isinstance (value, ast.AST):
				for field in ast.iter_fields (value):
					walk (field [0], field [1], tabLevel + 1)
			elif isinstance (value, list):
				for element in value:
					walk ('element', element, tabLevel + 1)
			else:
				self.treeFragments.append ('= {0}'.format (value))
				
		self.treeFragments = []
		walk ('file', self.parseTree, 0)
		self.textTree = ''.join (self.treeFragments) [1:]
		
		with utils.create ('{}/{}.tree'.format (self.metadata.targetDir, self.metadata.filePrename)) as treeFile:
			treeFile.write (self.textTree)
			
	def generate (self):
		utils.log (False, 'Generating code for module: {}\n', self.metadata.targetPath)
		self.targetCode = ''.join (Generator (self) .targetFragments)
		
		with utils.create (self.metadata.targetPath) as targetFile:
			targetFile.write (self.targetCode)
					
class Generator (ast.NodeVisitor):
	classScope, functionScope = range (2)
	# Terms like parent, child, ancestor and descendant refer to the parse tree here, not to inheritance

	def __init__ (self, module):
		self.module = module
		
		self.targetFragments = []		
		self.statementSkipped = False
		self.indentLevel = 0
		self.scopes = []
		self.all = set ()
		self.importHeads = set ()
		self.tempIndices = {}
		self.stubsName = 'org.{}.stubs.'.format (__base__.__envir__.transpilerName)
		
		self.nameConsts = {
			None: 'null',
			True: 'true',
			False: 'false'
		}
		
		self.unOps = {
			ast.Invert: '~',
			ast.Not: '!',
			ast.UAdd: '+',
			ast.USub: '-'
		}
		
		self.binOps = {
			ast.Add: '+',
			ast.Sub: '-',
			ast.Mult: '*',
			ast.Div: '/',
			ast.MatMult: None,	# Dealt with separately
			ast.Mod: '%', 
			ast.Pow: '**',
			ast.LShift: '<<',
            ast.RShift: '>>',
			ast.BitOr: '|',
			ast.BitXor: '^',
			ast.BitAnd: '&',
			ast.FloorDiv: None	# Dealt with separately
		}
		
		self.boolOps = {
			ast.And: '&&',
			ast.Or: '||'
		}
		
		self.compOps = {
			ast.Eq: '==',
			ast.NotEq: '!=',
			ast.Lt: '<',
			ast.LtE: '<=',
			ast.Gt: '>',
			ast.GtE: '>=',
			ast.Is: '===',		# Not really, but closest for now
			ast.IsNot: '!==',	# Not really, but closest for now
			ast.In:	None,		# Dealt with separately
			ast.NotIn: None		# Dealt with separately
		}
		
		try:
			self.visit (module.parseTree)
		except Exception as exception:
			utils.enhanceException (exception, moduleName = self.module.metadata.name)
		
	def tabs (self, indentLevel = None):
		if indentLevel == None:
			indentLevel = self.indentLevel
		return indentLevel * '\t'
		
	def emit (self, fragment, *formatter):
		if (
			not self.targetFragments or
			(self.targetFragments and self.targetFragments [-1] .endswith ('\n'))
		):
			self.targetFragments.append (self.tabs ())
			
		fragment = fragment [:-1] .replace ('\n', '\n' + self.tabs ()) + fragment [-1]
		self.targetFragments.append (fragment.format (*formatter))

	def indent (self):
		self.indentLevel += 1
		
	def dedent (self):
		self.indentLevel -= 1
		
	def inscope (self, scope):
		self.scopes.append (scope)
		
	def descope (self):
		self.scopes.pop ()
		
	def emitComma (self, index, blank = True):
		if index:
			self.emit (', ' if blank else ',')
			
	def nextTemp (self, name):
		if name in self.tempIndices:
			self.tempIndices [name] += 1
		else:
			self.tempIndices [name] = 0
		return self.getTemp (name)
		
	def getTemp (self, name):
		return '__{}{}__'.format (name, self.tempIndices [name])
	
	def prevTemp (self, name):
		self.tempIndices [name] -= 1
		
	def visit_arg (self, node):
		self.emit (node.arg)
		
	def visit_arguments (self, node):
		for index, arg in enumerate (node.args):
			self.emitComma (index)
			self.visit (arg)
			
		# If there's a vararg, no formal parameter is emitted for it, it's just retrieved in the body
				
	def visit_Assign (self, node):
		targetLeafs = (ast.Attribute, ast.Subscript, ast.Name)

		# Tuple assignment LHS tree walker
		def walkTarget (expr, pathIndices):
			if type (expr) in targetLeafs:			# It's an LValue, matching an RHS leaf source
				self.emit (';\n')
				if type (expr) == ast.Name:
					self.emit ('var ')	
				self.visit (expr)
				self.emit (' = {} '.format (self.getTemp ('left')))
				for pathIndex in pathIndices:
					self.emit ('[{}]'.format (pathIndex))
			else:									# It's a sequence
				pathIndices.append (None)			# Add indexing level for that sequence
				for index, elt in enumerate (expr.elts):
					pathIndices [-1] = index
					walkTarget (elt, pathIndices)	# Walk deeper until finally pathIndices is used in emitting an RHS leaf
				pathIndices.pop ()					# Remove the indexing level since we're done with that sequence
				
		if len (node.targets) == 1 and type (node.targets [0]) in targetLeafs:
			# Fast shortcut for the most frequent and simple case
			if type (node.targets [0]) == ast.Name:
				self.emit ('var ')
					
			self.visit (node.targets [0])
			self.emit (' = ')
			self.visit (node.value)

		else:
			# Multiple RHS or tuple assignment, we need __tmp__
			self.emit ('var ')
			self.emit (self.nextTemp ('left'))
			self.emit (' = ')
			self.visit (node.value)

			for expr in node.targets:
				walkTarget (expr, [])
				
			self.prevTemp ('left')
				
	def visit_Attribute (self, node):
		self.visit (node.value)
		self.emit ('.{}', node.attr)
	
	def visit_BinOp (self, node):
		opType = type (node.op)
		if opType == ast.FloorDiv:
			self.emit ('Math.floor (')
			self.visit (node.left)
			self.emit (') / ')
			self.emit ('Math.floor (')
			self.visit (node.right)
			self.emit (')')
		elif opType == ast.MatMult:
			self.emit ('__matmul__ (')
			self.visit (node.left)
			self.emit (', ')
			self.visit (node.right)
			self.emit (')')			
		else:
			self.visit (node.left)
			self.emit (' {} '.format (self.binOps [opType]))			
			self.visit (node.right)
			
	def visit_BoolOp (self, node):
		for index, value in enumerate (node.values):
			if index:
				self.emit (' {} '.format (self.boolOps [type (node.op)]))
			self.visit (value)	
	
	def visit_Break (self, node):
		self.emit ('{} = true;\n', self.getTemp ('break'))
		self.emit ('break')
	
	def visit_Call (self, node):
		self.visit (node.func)
		
		for index, expr in enumerate (node.args):
			if type (expr) == ast.Starred:
				self.emit ('.apply (null, ')	# Note that in generated a.b.f (), a.b.f is a bound function already
				for index, expr in enumerate (node.args):
					if index:
						self.emit ('.concat (')
					if type (expr) == ast.Starred:
						self.visit (expr)
					else:
						self.emit ('[')
						self.visit (expr)
						self.emit (']')
					if index:
						self.emit (')')
				self.emit (')')			
				break;
		else:	
			self.emit (' (')
			for index, expr in enumerate (node.args):
				self.emitComma (index)
				self.visit (expr)
			self.emit (')')
		
	def visit_ClassDef (self, node):
		if not self.scopes:
			self.all.add (node.name)
		
		self.emit ('var {0} = __class__ (\'{0}\', [', node.name)
		self.inscope (self.classScope)
		
		if node.bases:
			for index, expr in enumerate (node.bases):
				try:
					self.emitComma (index)
					self.visit_Name (expr)
				except Exception as exception:
					utils.enhanceException (moduleName = self.module.metadata.name, lineNr = node.lineno, message = 'Invalid base class')
		else:
			self.emit ('object')
		self.emit ('], {{')
		
		self.indent ()
		for index, stmt in enumerate (node.body):
			self.emitComma (index, False)
			self.visit (stmt)
		self.dedent ()
		
		self.descope ()
		self.emit ('\n}})')
		
	def visit_Compare (self, node):
		if len (node.comparators) > 1:
			self.emit ('(')
			
		left = node.left
		for index, (operand, right) in enumerate (zip (node.ops, node.comparators)):
			if index:
				self.emit (' && ')
				
			if type (operand) in (ast.In, ast.NotIn):
				self.emit ('{}__in__ (', '!' if type (operand) == ast.NotIn else '')
				self.visit (left)
				self.emit (', ')
				self.visit (right)
				self.emit (')')
			else:						
				self.visit (left)
				self.emit (' {0} '.format (self.compOps [type (operand)]))
				self.visit (right)
				
			left = right
			
		if len (node.comparators) > 1:
			self.emit(')')
			
	def visit_Dict (self, node):
		self.emit ('{{')
		for index, (key, value) in enumerate (zip (node.keys, node.values)):
			self.emitComma (index)
			self.visit (key)
			self.emit (': ')
			self.visit (value)
		self.emit ('}}')
			
	def visit_Expr (self, node):
		self.visit (node.value)
		
	def visit_For (self, node):
		self.emit ('var {} = ', self.nextTemp ('iter'))
		self.visit (node.iter)
		self.emit (';\n')
		
		if node.orelse:
			self.emit ('var {} = false;\n', self.nextTemp ('break'))
		
		self.emit ('for (var {0} = 0; {0} < {1}.length; {0}++) {{\n', self.nextTemp ('index'), self.getTemp ('iter'))
		
		self.indent ()
		self.visit (ast.Assign (
			[node.target],
			ast.Subscript (
				value = ast.Name (id = self.getTemp ('iter'), ctx = ast.Load),
				slice = ast.Index (ast.Num (n = self.getTemp ('index'))),
				ctx = ast.Load
			)
		))
		self.emit (';\n')
		for stmt in node.body:		
			self.visit (stmt)
			if self.statementSkipped:	# No imports here, but just to be sure for the future
				self.statementSkipped = False
			else:
				self.emit (';\n')	
		self.dedent ()
		
		self.emit ('}}\n')
		
		if node.orelse:
			self.emit ('if (!{}) {{\n', self.getTemp ('break'))
			self.prevTemp ('break')
			
			self.indent ()
			for stmt in node.orelse:
				self.visit (stmt)
				if self.statementSkipped:
					self.statementSkipped = False
				else:
					self.emit (';\n')	
			self.dedent ()
			
			self.emit ('}}\n')
			self.statementSkipped = True
			
		self.prevTemp ('index')
		self.prevTemp ('iter')
		
	def visit_FunctionDef (self, node):
		if not self.scopes or self.scopes [-1] == self.functionScope:	# Global or function scope, so it's no method
			if not self.scopes:
				self.all.add (node.name)
			self.emit ('var {} = function (', node.name)
		else:															# Class scope, so it's a method and needs the currying mechanism
			self.emit ('\nget {} () {{return __get__ (this, function (', node.name)
			
		self.inscope (self.functionScope)
		
		self.visit (node.args)
		self.emit (') {{\n')
		
		self.indent ()
		if node.args.vararg:	# If there's a vararg, assign an array containing the remainder of the actual parameters to it
			self.emit ('var {} = [] .slice.apply (arguments) .slice ({});\n', node.args.vararg.arg, len (node.args.args))
			
		for stmt in node.body:
			self.visit (stmt)
			if self.statementSkipped:
				self.statementSkipped = False
			else:
				self.emit (';\n')
		self.dedent ()
		
		self.descope ()
		
		if not self.scopes or self.scopes [-1] == self.functionScope:
			self.emit ('}}')
		else:
			self.emit ('}});}}')
		
	def visit_If (self, node):
		self.emit ('if (')
		self.visit (node.test)
		self.emit (') {{\n')
		
		self.indent ()
		for stmt in node.body:
			self.visit (stmt)
			if self.statementSkipped:
				self.statementSkipped = False
			else:
				self.emit (';\n')	
		self.dedent ()
		
		self.emit ('}}\n')
		
		if node.orelse:
			self.emit ('else {{\n')
			
			self.indent ()
			for stmt in node.orelse:
				self.visit (stmt)
				if self.statementSkipped:
					self.statementSkipped = False
				else:
					self.emit (';\n')	
			self.dedent ()

			self.emit ('}}\n')
			
		self.statementSkipped = True
		
	def visit_Import (self, node):
		names = [alias for alias in node.names if not alias.name.startswith (self.stubsName)]
		
		if not names:
			self.statementSkipped = True
			return
		
		for index, alias in enumerate (names):
			try:
				self.module.program.provide (alias.name)

			except Exception as exception:			
				utils.enhanceException (exception, moduleName = self.module.metadata.name, lineNr = node.lineno, message = 'Can\'t import module \'{}\''.format (alias.name))
			
			if alias.asname:
				self.emit ('var {} = {}.{}', alias.asname, __base__.__envir__.transpilerName, alias.name)
			else:
				aliasSplit = alias.name.split ('.', 1)
				head = aliasSplit [0]
				tail = aliasSplit [1] if len (aliasSplit) > 1 else ''
				
				self.importHeads.add (head)
				self.emit ('__nest__ ({}, \'{}\', __init__ (__world__.{}))', head, tail, alias.name)
			
			if index < len (names) - 1:
				self.emit (';\n')
				
	def visit_ImportFrom (self, node):
		if node.module.startswith (self.stubsName):
			self.statementSkipped = True 
			return
		
		try:
			module = self.module.program.provide (node.module)
			
			for index, alias in enumerate (node.names):
				if alias.name == '*':
					if len (node.names) > 1:
						raise Error (moduleName = module.metadata.name, lineNr = node.lineno, message = 'Can\'t import module \'{}\''.format (alias.name))

					for index, name in enumerate (module.all):
						self.emit ('var {0} = {1}.{2}.{0}', name, __base__.__envir__.transpilerName, node.module)
						if index < len (module.all) - 1:
							self.emit (';\n')
				else:
					if alias.asname:
						self.emit ('var {} = {}.{}.{}', alias.asname, __base__.__envir__.transpilerName, node.module, alias.name)
					else:
						self.emit ('var {0} = {1}.{2}.{0}', alias.name, __base__.__envir__.transpilerName, node.module)
					if index < len (node.names) - 1:
						self.emit (';\n')
		except Exception as exception:
			utils.enhanceException (exception, lineNr = node.lineno, message = 'Can\'t import from module \'{}\''.format (node.module))
			
	def visit_Index (self, node):
		self.emit (' [')
		self.visit (node.value)
		self.emit ('] ')
			
	def visit_List (self, node):
		self.emit ('[')
		for index, elt in enumerate (node.elts):
			self.emitComma (index)
			self.visit (elt)
		self.emit (']')
		
	def visit_ListComp (self, node):
		def nestLoops (generators):
			comprehension = generators.pop (0)
			self.emit ('var {} = ', self.nextTemp ('iter'))
			self.visit (comprehension.iter)
			self.emit (';\n')
			
			self.emit (												# A target for is generated for each source for
				'for (var {0} = 0; {0} < {1}.length; {0}++) {{\n',
				self.nextTemp ('index'),
				self.getTemp ('iter')
			)
			self.indent ()
			
			self.emit ('var ')
			self.visit (comprehension.target)
			self.emit (' = {} [{}];\n', self.getTemp ('iter'), self.getTemp ('index'))
			
			# Start of optional if-prologue, multiple ifs are condensed into one
			if len (comprehension.ifs):
				self.emit ('if (')									# One target if is generated with multiple source ifs anded
				for index, expr in enumerate (comprehension.ifs):
					if index:
						self.emit (' && ')
					if len (comprehension.ifs) > 1:					# if (a if b else c) if (d if e else f)  (braces implicit in ast) should generate
						self.emit ('(')								# if (b ? a : c) && (e ? d : f)   rather than   if b ? a : c && e ? d : f   (&& has higher prio than ?:)
					self.visit (expr)
					if len (comprehension.ifs) > 1:
						self.emit (')')
				self.emit (') {{\n')
				self.indent ()
			# End of optional if-prologue
				
			if len (generators):
				nestLoops (generators)
			else:
				self.emit ('{} .push (', self.getTemp ('accu'))
				self.visit (node.elt)
				self.emit (');\n')
					
			# Start of optional if-epilogue
			if len (comprehension.ifs):
				self.dedent ()
				self.emit ('}}\n')									# Close target if
			# End of optional if-epilogue
			
			self.dedent ()
			self.emit ('}}\n')										# Close target for
			
			self.prevTemp ('index')
			self.prevTemp ('iter')
			
		self.emit ('function () {{\n')
		self.indent ()
		self.emit ('var {} = [];\n', self.nextTemp ('accu'))
		nestLoops (node.generators [:])	# Leave original in intact, just for neatness
		self.emit ('return {};\n'.format (self.getTemp ('accu')))
		self.prevTemp ('accu')	
		self.dedent ()
		self.emit ('}} ()')
		
	def visit_Module (self, node):
		self.indent ()
		if self.module.metadata.name == self.module.program.mainModuleName:
			self.emit ('(function () {{\n')
		else:
			self.emit ('__nest__ (\n')
			self.indent ()
			self.emit ('__all__,\n')
			self.emit ('\'{}\', {{\n', self.module.metadata.name)			
			self.indent ()
			self.emit ('__all__: {{\n')
			self.indent ()
			self.emit ('__inited__: false,\n')
			self.emit ('__init__: function (__all__) {{\n')
			
		self.indent ()
		
		importHeadsIndex = len (self.targetFragments)
		importHeadsLevel = self.indentLevel
		
		for stmt in node.body:
			self.visit (stmt)
			if self.statementSkipped:
				self.statementSkipped = False
			else:
				self.emit (';\n')		
		
		self.all = sorted (self.all)
		self.emit ('//<all>\n')	# Only the last occurence of <all> and </all> are special.
		for name in self.all:
			self.emit ('__all__.{0} = {0};\n', name)
		self.emit ('//</all>\n')
		
		self.dedent ()

		if self.module.metadata.name == self.module.program.mainModuleName:
			self.emit ('}}) ();\n')
		else:	
			self.emit ('}}\n')
			self.dedent ()
			self.emit ('}}\n')
			self.dedent ()
			self.emit ('}}\n')
			self.dedent ()
			self.emit (');\n')
			self.dedent ()
		
		self.targetFragments.insert (importHeadsIndex, ''.join ([
			'{}var {} = {{}};\n'.format (self.tabs (importHeadsLevel), head)
			for head in sorted (self.importHeads)
		]))
		
	def visit_Name (self, node):
		if type (node.ctx) == ast.Store:
			if not self.scopes:
				self.all.add (node.id)
				
		self.emit (node.id)
		
	def visit_NameConstant (self, node):
		self.emit (self.nameConsts [node.value])
		
	def visit_Num (self, node):
		self.emit ('{}', node.n)
		
	def visit_Return (self, node):
		self.emit ('return ')
		self.visit (node.value)
		
	def visit_Set (self, node):
		self.emit ('new set ([')
		for index, elt in enumerate (node.elts):
			self.emitComma (index)
			self.visit (elt)
		self.emit ('])')		
		
	def visit_Slice (self, node):
		if node.step == None:
			self.emit ('.slice (')
		else:
			self.emit ('.__pyslice__ (')
		
		if node.lower == None:
			self.emit ('0')
		else:
			self.visit (node.lower)
			
		if node.upper != None:
			self.emit (', ')
			self.visit (node.upper)		
			
		if node.step != None:
			self.emit (', ')
			self.visit (node.step)		

		self.emit (')')
		
	def visit_Str (self, node):
		self.emit ('{}', repr (node.s))
		
	def visit_Subscript (self, node):	
		self.visit (node.value)
		try:
			self.visit (node.slice)
		except Exception as exception:
			utils.enhanceException (exception, lineNr = node.lineno, message = 'Invalid subscript')
		
	def visit_Tuple (self, node):
		self.emit ('tuple (')
		self.visit_List (node)
		self.emit (')')
			
	def visit_UnaryOp (self, node):
		self.emit (self.unOps [type (node.op)])			
		self.visit (node.operand)
		
	def visit_With (self, node):	
		for withitem in node.items:
			self.visit (withitem.optional_vars)
			self.emit (' = ')
			self.visit (withitem.context_expr)
			self.emit (';\n')
			
		for stmt in node.body:
			self.visit (stmt)
			self.emit (';\n')
			
		for withitem in node.items:
			self.visit (withitem.optional_vars)
			self.emit ('.close ()')
			