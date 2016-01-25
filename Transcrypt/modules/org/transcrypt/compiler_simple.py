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
			self.targetDir = '{}/{}'.format (self.sourceDir, __base__.__envir__.targetSubDir)
			
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
		
		self.moduleDict = {}
		self.fragments = {}
		self.compile ()
		
	def compile (self):
		# Define names early, since they are cross-used in module compilation
		prefix = 'org.{}'.format (__base__.__envir__.transpilerName)
		self.coreModuleName = '{}.{}'.format (prefix, '__core__')
		self.baseModuleName = '{}.{}'.format (prefix, '__base__')
		self.standardModuleName = '{}.{}'.format (prefix, '__standard__')
		self.builtinModuleName = '{}.{}'.format (prefix, '__builtin__')
		self.mainModuleName = self.sourceFileName [ : -3]

		# Module compilation
		Module (self, ModuleMetadata (self, self.coreModuleName))
		Module (self, ModuleMetadata (self, self.baseModuleName))
		Module (self, ModuleMetadata (self, self.standardModuleName))
		Module (self, ModuleMetadata (self, self.builtinModuleName))
					
		try:
			Module (self, ModuleMetadata (self, self.mainModuleName))	# Will trigger recursive compilation
		except Exception as exception:
			utils.enhanceException (exception, message = 'Error: can\'t compile {}\n'.format (self.sourcePath))
			
		# Join all non-inline modules
		normallyImportedTargetCode = ''.join ([
			self.moduleDict [moduleName] .targetCode
			for moduleName in sorted (self.moduleDict)
			if not moduleName in (self.coreModuleName, self.baseModuleName, self.standardModuleName, self.builtinModuleName, self.mainModuleName)
		])
		
		# And sandwich them between the in-line modules
		targetCode = (
			self.header +
			'function {} () {{\n'.format (self.mainModuleName) +
			self.moduleDict [self.coreModuleName].targetCode +
			self.moduleDict [self.baseModuleName] .targetCode +
			self.moduleDict [self.standardModuleName] .targetCode +
			self.moduleDict [self.builtinModuleName].targetCode +
			normallyImportedTargetCode +
			self.moduleDict [self.mainModuleName].targetCode +
			'	return __all__;\n' +
			'}\n' +
			'window [\'{0}\'] = {0};\n'.format (self.mainModuleName)
		)	
		
		targetFileName = '{}/{}.js'.format ('{}/{}'.format (self.sourceDir, __base__.__envir__.targetSubDir), self.mainModuleName)
		utils.log (False, 'Saving result in: {}\n', targetFileName)
		with utils.create (targetFileName) as aFile:
			aFile.write (targetCode)

		miniFileName = '{}/{}/{}.min.js'.format (self.sourceDir, __base__.__envir__.targetSubDir, self.mainModuleName)
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
		self.skipSemiNew = False
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

		self.filterIds = ('arguments',)
		
		try:
			self.visit (module.parseTree)
		except Exception as exception:
			utils.enhanceException (exception, moduleName = self.module.metadata.name)
			
		if self.tempIndices:
			raise utils.Error (
				message = '\n\tTemporary variables leak in code generator: {}'.format (self.tempIndices)
			)
		
	def filterId (self, qualifiedId):
		return '.'.join (['__${}__'.format (id) if id in self.filterIds else id for id in qualifiedId.split ('.')])	# $ to avoid magics like __init__
		
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
			
	def emitBody (self, body):
		for stmt in body:		
			self.visit (stmt)
			if self.skipSemiNew:	# No imports here, but just to be sure for the future
				self.skipSemiNew = False
			else:
				self.emit (';\n')
				
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
		if self.tempIndices [name] < 0:
			del self.tempIndices [name]
		
	def visit_arg (self, node):
		self.emit (node.arg)
		
	def visit_arguments (self, node):	# Visited for def's, not for calls
		self.emit ('(')
		
		for index, arg in enumerate (node.args):
			self.emitComma (index)
			self.visit (arg)
				
		# If there's a vararg or a kwarg, no formal parameter is emitted for it, it's just retrieved in the body
		# so f (a, b=3, *x, c, d=4, **y, e, f = 5) generates f (a, b, c, d, e, f), since x and y are never passed in positionally
			
		self.emit (') {{\n')
		
		self.indent ()
		
		# Defaults for positional args (before *), only if not passed normally before this point
		# They can also be passed in as keyword args
		for arg, expr in zip (node.args, node.defaults):
			if expr:
				self.emit ('if (typeof {} == \'undefined\') {{;\n', arg.arg)
				self.indent ()
				self.emit ('var {} = ', arg.arg)
				self.visit (expr)
				self.emit (';\n')
				self.dedent ()
				self.emit ('}};\n')
			
		# Defaults for keyword args unconditionally, since they will be passed only after this point
		for arg, expr in zip (node.kwonlyargs, node.kw_defaults):
			if expr:
				self.emit ('var {} = ', arg.arg)
				self.visit (expr)
				self.emit (';\n')
			
		# If there's anything other than explicit positional args (which have been passed and dealth with already)
		if node.args or node.vararg or node.kwarg or node.kwonlyargs:		
			# We'll to work with parts of the calltime args, so we have to convert arguments to an array to allow for slicing
			nrOfArgs = len (node.args) + len (node.kwonlyargs) + (1 if node.vararg else 0) + (1 if node.kwarg else 0)

			self.emit ('var {} = [].slice.apply (arguments);\n', self.nextTemp ('args'))
			
			if node.args or node.kwarg or node.kwonlyargs:			
				# Store index of last actual param 
				self.emit ('var {} = {}.length - 1;\n', self.nextTemp ('ilastarg'), self.getTemp ('args'))
			
				# Any calltime keyword args are passed in a JavaScript-only object of type __kwargdict__
				# If it's there, copy the __kwargdict__ into local var __allkwargs__
				# And lower __ilastarg__ by 1, since the last calltime arg wasn't a normal (Python) one
				self.emit ('if (typeof {} [{}] == __kwargdict__) {{\n', self.getTemp ('args'), self.getTemp ('ilastarg'))
				self.indent ()
				self.emit ('var {} = {} [{}--];\n', self.nextTemp ('allkwargs'), self.getTemp ('args'), self.getTemp ('ilastarg'))

				# If there is a **kwargs arg, make a local to hold its calltime contents
				if node.kwarg:
					self.emit ('var {} = {{}};\n', node.kwarg.arg)
					
				# __kwargdict__ may contain deftime defined keyword args, but also keyword args that are absorbed by **kwargs
				self.emit ('for (var {} in {}) {{\n', self.nextTemp ('attrib'), self.getTemp ('allkwargs'))
				self.indent ()
				
				# We'll make the distinction between normal keyword args and **kwargs keyword args in a switch
				self.emit ('switch ({}) {{\n', self.getTemp ('attrib'))
				self.indent ()
							
				# First generate a case for each normal keyword arg, generating a local for it
				for arg in node.args + node.kwonlyargs:
					self.emit ('case \'{0}\': var {0} = {1} [{2}]; break;\n', arg.arg, self.getTemp ('allkwargs'), self.getTemp ('attrib'))
									
				# Then put the rest into the **kwargs local
				if node.kwarg:
					self.emit ('default: {0} [{1}] = {2} [{1}];\n', node.kwarg.arg, self.getTemp ('attrib'), self.getTemp ('allkwargs'))
					
				self.prevTemp ('allkwargs')
				self.prevTemp ('attrib')
					
				self.dedent ()
				self.emit ('}}\n')
				
				self.dedent ()
				self.emit ('}}\n')	# for (__attrib__..
				
				# Take out the kwargdict marker
				if node.kwarg:
					self.emit ('{}.__class__ = null;\n', node.kwarg.arg)

				self.dedent ()
				self.emit ('}}\n')	# if (type..
				
				
				# If there's a vararg, assign an array containing the remainder of the actual non keyword only params, except for the __kwargdict__
				if node.vararg:
					# Slice starts at end of formal positional params, ends with last actual param, all actual keyword args are taken out into the __kwargdict__
					self.emit (
						'var {} = tuple ({}.slice ({}, {} + 1));\n',
						node.vararg.arg,
						self.getTemp ('args') if nrOfArgs > 1 else 'arguments',
						len (node.args),
						self.getTemp ('ilastarg')
					)
					
				self.prevTemp ('ilastarg')			
			else:
				if node.vararg:
					if nrOfArgs > 1:
						self.emit ('var {} = tuple ({}.slice ({}));\n', node.vararg.arg, self.getTemp ('args'), len (node.args))
					else:
						self.emit ('var {} = tuple (arguments);\n', node.vararg.arg)
			
			self.prevTemp ('args')							
				
	def visit_Assign (self, node):
		targetLeafs = (ast.Attribute, ast.Subscript, ast.Name)
		
		def assignTarget (target, value):
			# Special case for target slice (as opposed to target index)
			if type (target) == ast.Subscript and type (target.slice) == ast.Slice:
				self.visit (target.value)
				
				try:
					self.emit ('.__setslice__ (')
					
					if target.slice.lower == None:
						self.emit ('0')
					else:
						self.visit (target.slice.lower)
						
					self.emit (', ')
					if target.slice.upper == None:
						self.emit ('null')
					else:
						self.visit (target.slice.upper)
				
					self.emit (', ')
					if target.slice.step:
						self.visit (target.slice.step)
					else:
						self.emit ('null')

					self.emit (', ')
					self.visit (value)
							
					self.emit (')')
				except Exception as exception:
					utils.enhanceException (exception, lineNr = target.lineno, message = 'Invalid LHS slice')	
			else:
				if type (target) == ast.Name:
					self.emit ('var ')
				
				self.visit (target)
				self.emit (' = ')
				self.visit (value)		

		# Tuple assignment LHS tree walker
		# The target (LHS) guides the walk, so it determines the source indices
		# However if a target leaf is an LHS slice,
		# the actual assignment will involve iterating through an extra index level,
		# as [1, 2][1:1] = [2, 3] should give [1, 2, 3, 4] rather than [1, [2, 3], 4]
		# This extra target level is walked in the splice and 
		def walkTarget (expr, pathIndices):
			if type (expr) in targetLeafs:			# It's an LValue, matching an RHS leaf source
				self.emit (';\n')
				
				# Create and visit RHS node on the fly, to benefit from assignTarget
				assignTarget (expr, ast.Name (id = self.getTemp ('left'), ctx = ast.Load))
				
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
			assignTarget (node.targets [0], node.value)			
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
		
	def visit_AugAssign (self, node):
		self.visit (node.target)	# No need to emit var first, it has to exist already
		
		# Optimize for ++ and --
		if type (node.value) == ast.Num and node.value.n == 1:
			if type (node.op) == ast.Add:
				self.emit ('++')
				return
			elif type (node.op) == ast.Sub:
				self.emit ('--')
				return
		elif type (node.value) == ast.UnaryOp and type (node.value.operand) == ast.Num and node.value.operand.n == 1:
			if type (node.op) == ast.Add:
				if type (node.value.op) == ast.UAdd:
					self.emit ('++')
					return
				elif type (node.value.op) == ast.USub:
					self.emit ('--')
					return
			elif type (node.op) == ast.Sub:
				if type (node.value.op) == ast.UAdd:
					self.emit ('--')
					return
				elif type (node.value.op) == ast.USub:
					self.emit ('++')
					return				
				
		self.emit (' {}= ', self.binOps [type (node.op)])
		self.visit (node.value)
	
	def visit_BinOp (self, node):
		if type (node.op) == ast.FloorDiv:
			self.emit ('Math.floor (')
			self.visit (node.left)
			self.emit (') / ')
			self.emit ('Math.floor (')
			self.visit (node.right)
			self.emit (')')
		elif type (node.op) == ast.MatMult:
			self.emit ('__matmul__ (')
			self.visit (node.left)
			self.emit (', ')
			self.visit (node.right)
			self.emit (')')			
		else:
			self.visit (node.left)
			self.emit (' {} '.format (self.binOps [type (node.op)]))			
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
		def emitKwargDict ():
			self.emit ('__kwargdict__ (')
			
			hasSeparateKeyArgs = False
			hasKwargs = False
			for keyword in node.keywords:
				if keyword.arg:
					hasSeparateKeyArgs = True
				else:
					hasKwargs = True
					break	# **kwargs is always the last arg
				
			if hasSeparateKeyArgs:	
				if hasKwargs:
					self.emit ('__merge__ (')
				self.emit ('{{')	# Allways if hasSeparateKeyArgs
				
			for keywordIndex, keyword in enumerate (node.keywords):
				if keyword.arg:
					self.emitComma (keywordIndex)
					self.emit ('{}: ', keyword.arg)
					self.visit (keyword.value)
				else:
					# It's the **kwargs arg, so the last arg
					# In JavaScript this must be an expression denoting an Object (sometimes specialized as kwargdict)
					# The keyword args in there have to be added to the __kwargdict__ as well	
					if hasSeparateKeyArgs:
						self.emit ('}}, ')			
					self.visit (keyword.value)

			if hasSeparateKeyArgs:
				if hasKwargs:
					self.emit (')')		# Terminate merge
				else:
					self.emit ('}}')	# Only if not terminated already because hasKwargs
				
			self.emit (')')

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
						
				if node.keywords:
					self.emit ('.concat ([')	# At least *args was present before this point
					emitKwargDict ()
					self.emit ('])')
					
				self.emit (')')			
				break;
		else:	
			self.emit (' (')
			for index, expr in enumerate (node.args):
				self.emitComma (index)
				self.visit (expr)
				
			if node.keywords:
				self.emitComma (len (node.args))
				emitKwargDict ()
				
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
			
	def visit_Continue (self, node):
		self.emit ('continue')
	
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
		# Create and visit assignment node on the fly to benefit from tupple assignment
		self.visit (ast.Assign (
			[node.target],
			ast.Subscript (
				value = ast.Name (id = self.getTemp ('iter'), ctx = ast.Load),
				slice = ast.Index (ast.Num (n = self.getTemp ('index'))),
				ctx = ast.Load
			)
		))
		
		self.emit (';\n')
		self.emitBody (node.body)
		self.dedent ()
		self.emit ('}}\n')
		
		if node.orelse:
			self.emit ('if (!{}) {{\n', self.getTemp ('break'))
			self.prevTemp ('break')
			
			self.indent ()
			self.emitBody (node.orelse)
			self.dedent ()
			
			self.emit ('}}\n')
			
		self.skipSemiNew = True
			
		self.prevTemp ('index')
		self.prevTemp ('iter')
		
	def visit_FunctionDef (self, node):
		if not self.scopes or self.scopes [-1] == self.functionScope:	# Global or function scope, so it's no method
			if not self.scopes:
				self.all.add (node.name)
			self.emit ('var {} = function ', node.name)
		else:															# Class scope, so it's a method and needs the currying mechanism
			self.emit ('\nget {} () {{return __get__ (this, function ', node.name)
			
		self.inscope (self.functionScope)		
		self.visit (node.args)
		self.emitBody (node.body)
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
		self.emitBody (node.body)
		self.dedent ()
		
		self.emit ('}}\n')
		
		if node.orelse:
			self.emit ('else {{\n')
			self.indent ()
			self.emitBody (node.orelse)
			self.dedent ()
			self.emit ('}}\n')
			
		self.skipSemiNew = True
		
	def visit_IfExp (self, node):
		self.emit ('(')
		self.visit (node.test)
		self.emit (' ? ')
		self.visit (node.body)
		self.emit (' : ')
		self.visit (node.orelse)
		self.emit (')')
		
	def visit_Import (self, node):	# Import .. can only import modules
		names = [alias for alias in node.names if not alias.name.startswith (self.stubsName)]
		
		if not names:
			self.skipSemiNew = True
			return
		
		for index, alias in enumerate (names):
			try:
				self.module.program.provide (alias.name)

			except Exception as exception:
				utils.enhanceException (exception, moduleName = self.module.metadata.name, lineNr = node.lineno, message = 'Can\'t import module \'{}\''.format (alias.name))
			
			if alias.asname:
				self.emit ('var {} =  __init__ (__world__.{})', self.filterId (alias.asname), self.filterId (alias.name))
			else:
				aliasSplit = alias.name.split ('.', 1)
				head = aliasSplit [0]
				tail = aliasSplit [1] if len (aliasSplit) > 1 else ''
				
				self.importHeads.add (head)
				self.emit ('__nest__ ({}, \'{}\', __init__ (__world__.{}))', self.filterId (head), self.filterId (tail), self.filterId (alias.name))
			
			if index < len (names) - 1:
				self.emit (';\n')
				
	def visit_ImportFrom (self, node):	# From .. import can import modules or entities in modules
		if node.module.startswith (self.stubsName):
			self.skipSemiNew = True 
			return
		
		try:			
			# N.B. It's ok to call a modules __init__ multiple times, see __core__.mod.js
			for index, alias in enumerate (node.names):
				if alias.name == '*':								# * Never refers to modules, only to entities in modules
					if len (node.names) > 1:
						raise Error (moduleName = module.metadata.name, lineNr = node.lineno, message = 'Can\'t import module \'{}\''.format (alias.name))
						
					module = self.module.program.provide (node.module)
					for index, name in enumerate (module.all):				
						self.emit ('var {0} = __init__ (__world__.{1}).{0}', self.filterId (name), self.filterId (node.module))
						if index < len (module.all) - 1:
							self.emit (';\n')
				else:
					try:											# Try if alias.name denotes a module				
						self.module.program.provide ('{}.{}'.format (self.filterId (node.module), self.filterId (alias.name)))
												
						if alias.asname:
							self.emit ('var {} = __init__ (__world__.{}.{})', self.filterId (alias.asname), self.filterId (node.module), self.filterId (alias.name))
						else:
							self.emit ('var {0} = __init__ (__world__.{1}.{0})', self.filterId (alias.name), self.filterId (node.module))						
					except:											# If it doesn't it denotes an entity inside a module
						self.module.program.provide (node.module)
				
						if alias.asname:
							self.emit ('var {} = __init__ (__world__.{}).{}', self.filterId (alias.asname), self.filterId (node.module), self.filterId (alias.name))
						else:
							self.emit ('var {0} = __init__ (__world__.{1}).{0}', self.filterId (alias.name), self.filterId (node.module))						
					if index < len (node.names) - 1:
						self.emit (';\n')
		except Exception as exception:
			utils.enhanceException (exception, lineNr = node.lineno, message = 'Can\'t import from module \'{}\''.format (node.module))
			
	def visit_Index (self, node):
		self.emit (' [')
		self.visit (node.value)
		self.emit ('] ')
		
	def visit_Lambda (self, node):
		self.emit ('(function __lambda__ ',)	# Extra () needed to make it callable at definition time
		self.visit (node.args)
		self.emit ('return ')
		self.visit (node.body)
		self.dedent ()
		self.emit (';}})')
	
	def visit_List (self, node):
		self.emit ('list ([')
		for index, elt in enumerate (node.elts):
			self.emitComma (index)
			self.visit (elt)
		self.emit ('])')
		
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
			self.emit ('\'{}\', {{\n', self.filterId (self.module.metadata.name))			
			self.indent ()
			self.emit ('__all__: {{\n')
			self.indent ()
			self.emit ('__inited__: false,\n')
			self.emit ('__init__: function (__all__) {{\n')
			
		self.indent ()
		
		importHeadsIndex = len (self.targetFragments)
		importHeadsLevel = self.indentLevel
		
		self.emitBody (node.body)
		
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
			'{}var {} = {{}};\n'.format (self.tabs (importHeadsLevel), self.filterId (head))
			for head in sorted (self.importHeads)
		]))
		
	def visit_Name (self, node):
		if type (node.ctx) == ast.Store:
			if not self.scopes:
				self.all.add (node.id)
				
		self.emit (self.filterId (node.id))
		
	def visit_NameConstant (self, node):
		self.emit (self.nameConsts [node.value])
		
	def visit_Num (self, node):
		self.emit ('{}', node.n)
		
	def visit_Raise (self, node):
		self.emit ('__except__ = ') 
		self.visit (node.exc)
		self.emit (';\n')
		self.emit ('__except__.__cause__ = ')
		if node.cause:
			self.visit (node.cause)
		else:
			self.emit ('null')
		self.emit (';\n')
		self.emit ('throw __except__')
		
	def visit_Return (self, node):
		self.emit ('return ')
		self.visit (node.value)
		
	def visit_Set (self, node):
		self.emit ('new set ([')
		for index, elt in enumerate (node.elts):
			self.emitComma (index)
			self.visit (elt)
		self.emit ('])')		
				
	def visit_Str (self, node):
		self.emit ('{}', repr (node.s))
		
	# Visited for RHS index, RHS slice and LHS index but not for LHS slice
	# LHS slices are dealth with directy in visit_Assign, since the RHS is needed for it also
	def visit_Subscript (self, node):
		self.visit (node.value)
		
		if type (node.slice) == ast.Slice:	# Then we're sure node.ctx == ast.Load	
			try:
				if node.slice.step == None:
					self.emit ('.slice (')
					
					if node.slice.lower == None:
						self.emit ('0')
					else:
						self.visit (node.slice.lower)
						
					if node.slice.upper != None:
						self.emit (', ')
						self.visit (node.slice.upper)
				else:
					self.emit ('.__getslice__ (')
					
					if node.slice.lower == None:
						self.emit ('0')
					else:
						self.visit (node.slice.lower)
						
					self.emit (', ')
					if node.slice.upper == None:
						self.emit ('null')
					else:
						self.visit (node.slice.upper)
				
					self.emit (', ')
					self.visit (node.slice.step)
					
				self.emit (')')
			except Exception as exception:
				utils.enhanceException (exception, lineNr = node.lineno, message = 'Invalid RHS slice')	
		else:								# Here target.slice is an ast.Index, target.ctx may vary (ast.ExtSlice not dealth with yet)
			self.visit (node.slice)
			
	def visit_Try (self, node):
		self.emit ('try {{\n')
		self.indent ()	
		self.emitBody (node.body)
		self.dedent ()
		self.emit ('}}\n')
		
		self.emit ('catch (__except__) {{\n')
		self.indent ()
		for index, excepthandler in enumerate (node.handlers):
			if excepthandler.type:
				if index:
					self.emit ('else ')
				self.emit ('if (isinstance (__except__, ')
				self.visit (excepthandler.type)
				self.emit (')) {{\n')
			else:
				self.emit ('else {{\n')
				
			self.indent ()
			if excepthandler.name:
				self.emit ('var {} = __except__;\n', excepthandler.name)				
			self.emitBody (excepthandler.body)
			self.dedent ()	
			self.emit ('}}\n')
		self.dedent ()
		self.emit ('}}\n')
		
		if node.finalbody:
			self.emit ('finally {{')
			self.emitBody (node.finalbody)
			self.emit ('}}\n')
			
		self.skipSemiNew = True
		
	def visit_Tuple (self, node):
		self.emit ('tuple (')
		self.visit_List (node)
		self.emit (')')
			
	def visit_UnaryOp (self, node):
		self.emit (self.unOps [type (node.op)])			
		self.visit (node.operand)
		
	def visit_While (self, node):
		if node.orelse:
			self.emit ('var {} = false;\n', self.nextTemp ('break'))
		
		self.emit ('while (')
		self.visit (node.test)
		self.emit (') {{\n')
		
		self.indent ()	
		self.emitBody (node.body)
		self.dedent ()
		
		self.emit ('}}\n')
		
		if node.orelse:
			self.emit ('if (!{}) {{\n', self.getTemp ('break'))
			self.prevTemp ('break')
			
			self.indent ()
			self.emitBody (node.orelse)
			self.dedent ()
			
			self.emit ('}}\n')
			
		self.skipSemiNew = True
		
	def visit_With (self, node):	
		for withitem in node.items:
			self.visit (withitem.optional_vars)
			self.emit (' = ')
			self.visit (withitem.context_expr)
			self.emit (';\n')
			
		self.emitBody (node.body)
			
		for withitem in node.items:
			self.visit (withitem.optional_vars)
			self.emit ('.close ()')
			