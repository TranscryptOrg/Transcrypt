# ====== Legal notices
#
# Copyright 2014, 2015, 2016 Jacques de Hooge, GEATEC engineering, www.geatec.com
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 	http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os
import sys
import ast
import re
import copy
import datetime
import math
import traceback

from org.transcrypt import __base__, utils, sourcemaps, minify, static_check

class ModuleMetadata:
	def __init__ (self, program, name):
		self.name = name
		searchedModulePaths = []
		for searchDir in program.moduleSearchDirs:
			relPrepath = self.name.replace ('.', '/')
			prepath = '{}/{}'.format (searchDir, relPrepath)			
			self.isDir = os.path.isdir (prepath)
			
			if self.isDir:
				self.sourceDir = prepath
				self.filePrename = '__init__'
			else:				
				self.sourceDir, self.filePrename = prepath.rsplit ('/', 1)
				
			self.targetDir = '{}/{}'.format (self.sourceDir, __base__.__envir__.target_subdir)			
			self.targetPath = '{}/{}.mod.js'.format (self.targetDir, self.filePrename)

			self.sourcePath = '{}/{}.py' .format (self.sourceDir, self.filePrename)
			if not os.path.isfile (self.sourcePath):
				self.sourcePath = self.targetPath	# For a Javascript-only module, source and target are the same and a source map can be faked
										
			self.extraSubdir = 'extra'
			self.treePath = '{}/{}/{}.mod.tree'.format (self.targetDir, self.extraSubdir, self.filePrename)
			
			searchedModulePaths += [self.sourcePath, self.targetPath]
			
			if (os.path.isfile (self.sourcePath) or os.path.isfile (self.targetPath)):
				break;	
		else:
			# If even the target can't be loaded then there's a problem with this module, root or not
			raise utils.Error (
				moduleName = self.name,
				message = '\n\tAttempt to load module: {}\n\tCan\'t find any of:\n\t\t{}\n'.format (
					self.name, '\n\t\t'. join (searchedModulePaths)
				)
			)
			
	def sourceExists (self):
		return os.path.isfile (self.sourcePath)
		
	def targetExists (self):
		return os.path.isfile (self.targetPath)
		
	def exists (self):
		return self.sourceExists () or self.targetExists ()
		
	def dirty (self):
		# Javascript-only modules are never dirty (so don't try to parse and compile Javascript)
		if self.targetPath == self.sourcePath:
			return False
		
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
		self.rawModuleCaption = '\n\n// ============ Source: {} ============\n\n' if utils.commandArgs.anno else ''
		self.moduleCaptionSkip = self.rawModuleCaption.count ('\n')
	
		self.moduleSearchDirs = moduleSearchDirs
		self.moduleDict = {}

		# Set paths that don't require the module dict
		self.sourcePath = os.path.abspath (utils.commandArgs.source) .replace ('\\', '/')
		self.sourceDir = '/'.join (self.sourcePath.split ('/') [ : -1])
		self.sourceFileName = self.sourcePath.split ('/') [-1]
	
		# Define names early, since they are cross-used in module compilation	
		prefix = 'org.{}'.format (__base__.__envir__.transpiler_name)
		self.coreModuleName = '{}.{}'.format (prefix, '__core__')
		self.baseModuleName = '{}.{}'.format (prefix, '__base__')
		self.standardModuleName = '{}.{}'.format (prefix, '__standard__')
		self.builtinModuleName = '{}.{}'.format (prefix, '__builtin__')
		self.mainModuleName = self.sourceFileName [ : -3]

		# Compile inline modules
		Module (self, ModuleMetadata (self, self.coreModuleName))
		Module (self, ModuleMetadata (self, self.baseModuleName))
		Module (self, ModuleMetadata (self, self.standardModuleName))
		Module (self, ModuleMetadata (self, self.builtinModuleName))

		# Compile imported modules
		try:
			moduleMetadata = ModuleMetadata (self, self.mainModuleName)
			Module (self, moduleMetadata)	# Compile of main module, will trigger recursive compilation
		except Exception as exception:
			utils.enhanceException (
				exception,
				message = str (exception)
			)

		# Set paths that require the module dict
		self.targetPath = '{}/{}.js'.format (self.moduleDict [self.mainModuleName] .metadata.targetDir, self.mainModuleName)
		self.miniTargetPath = '{}/{}.min.js'.format (self.moduleDict [self.mainModuleName] .metadata.targetDir, self.mainModuleName)
		
		# Set sourcemaps
		if utils.commandArgs.map:
			self.prettyMap = sourcemaps.SourceMap (
				self.moduleDict [self.mainModuleName] .metadata.targetDir,
				'{}.js'.format (self.mainModuleName),
				self.moduleDict [self.mainModuleName] .metadata.extraSubdir,
				
			)
			
			if not utils.commandArgs.nomin:
				self.shrinkMap = sourcemaps.SourceMap (
					self.moduleDict [self.mainModuleName] .metadata.targetDir,
					'{}.shrink.js'.format (self.mainModuleName),
					self.moduleDict [self.mainModuleName] .metadata.extraSubdir,
				)
				
				self.miniMap = sourcemaps.SourceMap (
					self.moduleDict [self.mainModuleName] .metadata.targetDir,
					'{}.min.js'.format (self.mainModuleName),
					self.moduleDict [self.mainModuleName] .metadata.extraSubdir,
				)
							
		# Round up imported modules
		importedModules = [
			self.moduleDict [moduleName]
			for moduleName in sorted (self.moduleDict)
			if not moduleName in (self.coreModuleName, self.baseModuleName, self.standardModuleName, self.builtinModuleName, self.mainModuleName)
		]
			
		# And sandwich them between the in-line modules
		self.allModules = (
			[
				self.moduleDict [self.coreModuleName],
				self.moduleDict [self.baseModuleName],
				self.moduleDict [self.standardModuleName],
				self.moduleDict [self.builtinModuleName]
			] +
			importedModules +
			[self.moduleDict [self.mainModuleName]]
		)
		
		# Encapsulate target code for all modules
		header = '"use strict";\n// {}\'ed from Python, {}\n'.format (
			__base__.__envir__.transpiler_name.capitalize (), datetime.datetime.now ().strftime ('%Y-%m-%d %H:%M:%S'),
		)

		if utils.commandArgs.parent == '.none':
			initializer = '{0} ();\n' .format (self.mainModuleName)
		elif utils.commandArgs.parent == '.user':
			initializer = ''
		else:
			if utils.commandArgs.parent == None:
				parent = 'window'
			else:
				parent = utils.commandArgs.parent
				
			initializer =  '{0} [\'{1}\'] = {1} ();\n' .format (parent, self.mainModuleName)
			
		targetCode = (
			header +
			'function {} () {{\n'.format (self.mainModuleName) +
			''.join ([module.getModuleCaption () + module.targetCode for module in self.allModules]) +			
			'	return __all__;\n' +
			'}\n' +
			initializer
		)	
						
		# Write encapsulated target code
		utils.log (True, 'Saving result in: {}\n', self.targetPath)
		with utils.create (self.targetPath) as aFile:
			aFile.write (targetCode)
			
			if utils.commandArgs.map:
				aFile.write (self.prettyMap.mapRef)
		
		# Join and save source maps
		if utils.commandArgs.map:
			utils.log (False, 'Saving single-level sourcemap in: {}\n', self.prettyMap.mapPath)
			self.prettyMap.concatenate ([module.modMap for module in self.allModules], self.moduleCaptionSkip)
			self.prettyMap.save ()
		
		# Minify
		if not utils.commandArgs.nomin:
			utils.log (True, 'Saving minified result in: {}\n', self.miniTargetPath)
			minify.run (self.targetPath, self.miniTargetPath, self.shrinkMap.mapPath if utils.commandArgs.map 
			else None)
			if utils.commandArgs.map:
				utils.log (False, 'Saving multi-level sourcemap in: {}\n', self.miniMap.mapPath)
				self.shrinkMap.load ()
				self.prettyMap.cascade (self.shrinkMap, self.miniMap)
				self.miniMap.save ()
				
				with open (self.miniTargetPath, 'a') as miniFile:
					miniFile.write (self.miniMap.mapRef)
					
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
		
		# Set sourcemap
		if utils.commandArgs.map:
			self.modMap = sourcemaps.SourceMap (
				self.metadata.targetDir,
				'{}.mod.js'.format (self.metadata.name),
				self.metadata.extraSubdir
			)
		
		if self.metadata.dirty ():
			self.parse ()
			if utils.commandArgs.check:
				try:
					static_check.run (self.metadata.sourcePath, self.parseTree)
				except Exception as exception:
					utils.log (True, 'Checking: {}\n\tInternal error in static checker, remainder of module skipped\n', self.metadata.sourcePath)
					
			if utils.commandArgs.tree:
				self.dumpTree ()
					
			self.generateJavascriptAndMap ()
			self.extractPropertiesFromJavascript ()
		else:
			self.loadJavascript ()
			self.extractPropertiesFromJavascript ()
			
			if utils.commandArgs.map:
				self.modMap.loadOrFake (self.metadata.sourcePath, self.nrOfTargetLines)
			
	def getModuleCaption (self):
		return self.program.rawModuleCaption.format (self.metadata.sourcePath) if utils.commandArgs.anno else ''			
				
	def parse (self):
		try:
			utils.log (False, 'Parsing module: {}\n', self.metadata.sourcePath)
			
			with open (self.metadata.sourcePath) as sourceFile:
				self.sourceCode = utils.extraLines + sourceFile.read ()
				
			self.parseTree = ast.parse (self.sourceCode)
		except SyntaxError as syntaxError:
			utils.enhanceException (
				syntaxError,
				moduleName = self.metadata.name,
				lineNr = syntaxError.lineno,
				message = (
					'{} <SYNTAX FAULT] {}'.format (
						syntaxError.text [:syntaxError.offset].lstrip (),
						syntaxError.text [syntaxError.offset:].rstrip ()
					)
					if syntaxError.text else
					syntaxError.args [0]
				)
			)
		
	def dumpTree (self):
		utils.log (False, 'Dumping syntax tree for module: {}\n', self.metadata.sourcePath)

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
		
		with utils.create (self.metadata.treePath) as treeFile:
			treeFile.write (self.textTree)
			
	def loadJavascript (self):
		utils.log (False, 'Loading precompiled module: {}\n', self.metadata.targetPath)
		
		with open (self.metadata.targetPath) as aFile:
			self.targetCode = aFile.read ()
			
	def generateJavascriptAndMap (self):
		utils.log (False, 'Generating code for module: {}\n', self.metadata.targetPath)
		
		generator = Generator (self)
		
		if utils.commandArgs.map or generator.allowDmap:	# Generation of source map and / or prefix map required
			instrumentedTargetLines = ''.join (generator.targetFragments) .split ('\n')	
						
			# Split instrumentedTargetLines in (bare) targetLines and sourceLineNrs, skipping empty statements
			targetLines = []
			self.sourceLineNrs = []
				
			for targetLine in instrumentedTargetLines:
				sourceLineNrString = targetLine [-sourcemaps.lineNrLength : ]
				sourceLineNr = int ('1' + sourceLineNrString) - sourcemaps.maxNrOfSourceLinesPerModule
				
				targetLine = targetLine [ : -sourcemaps.lineNrLength]
				
				# Only append non-emptpy statements and their number info
				if targetLine.strip () != ';':
					if generator.allowDmap:
						targetLine = '/* {} */ {}'.format (sourceLineNrString, targetLine)
				
					targetLines.append (targetLine)
					self.sourceLineNrs.append (sourceLineNr)
					
			# Generate per module sourcemap and copy sourcefile
			if utils.commandArgs.map:
				utils.log (False, 'Generating source map for module: {}\n', self.metadata.sourcePath)				
				self.modMap.generate (self.metadata.sourcePath, self.sourceLineNrs)
				self.modMap.save ()
		else:	# No maps needed, shortcut for speed
			targetLines = [line for line in  ''.join (generator.targetFragments) .split ('\n') if line.strip () != ';']		
		
		# Join and save module code
		self.targetCode = '\n'.join (targetLines)
		with utils.create (self.metadata.targetPath) as aFile:
			aFile.write (self.targetCode)
		
	def extractPropertiesFromJavascript (self):
		def purgeLineNrs (clause):
			if utils.commandArgs.anno:
				return re.sub ('/\* {} \*/'.format (sourcemaps.lineNrLength * '\d'), '', clause)
			else:
				return clause	
	
		utils.log (False, 'Extracting module properties from: {}\n', self.metadata.targetPath)
				
		useClause = purgeLineNrs (self.targetCode [self.targetCode.rfind ('<use>') : self.targetCode.rfind ('</use>')])
		self.use = sorted (set ([
			word
			for word in useClause.replace ('__pragma__', ' ') .replace ('(', ' ') .replace (')', ' ') .replace ('\'', ' ') .replace ('+', ' ') .split ()
			if not word.startswith ('<')
		]))
		for moduleName in self.use:
			self.program.provide (moduleName)
		
		allClause = purgeLineNrs (self.targetCode [self.targetCode.rfind ('<all>') : self.targetCode.rfind ('</all>')])
		self.all = sorted (set ([
			word [1 : ]
			for word in allClause.replace ('__all__', ' ') .replace ('=', ' ') .split ()
			if word.startswith ('.')
		]))
		
		if utils.commandArgs.map:
			self.nrOfTargetLines = self.targetCode.count ('\n') + 1
		
class Scope:
	def __init__ (self, node):
		self.node = node
		self.nonlocals = set ()
	
class Generator (ast.NodeVisitor):
# Terms like parent, child, ancestor and descendant refer to the parse tree here, not to inheritance
	
	def __init__ (self, module):	
		self.module = module
		
		self.targetFragments = []		
		self.indentLevel = 0
		self.scopes = []
		self.use = set ()
		self.all = set ()
		self.importHeads = set ()
		self.lineNr = 1
		self.lineNrString = ''

		self.aliasers = [self.getAliaser (*alias) for alias in (
# START predef_aliases
			('arguments', 'py_arguments'),	('js_arguments', 'arguments'),
			('del', 'py_del'),				('js_del', 'del'),
			('js_from', 'from'),
			('items', 'py_items'),			('js_items', 'items'),
			('keys', 'py_keys'),			('js_keys', 'keys'),
			('name', 'py_name'),			('js_name', 'name'),
			('pop', 'py_pop'),				('js_pop', 'pop'),
			('replace', 'py_replace'),		('js_replace', 'replace'),
			('sort', 'py_sort'),			('js_sort', 'sort'),
			('switch', 'py_switch'),		('split', 'py_split'),
			('js_split', 'split')
# END predef_aliases
		)]
		
		self.tempIndices = {}
		self.skippedTemps = set ()
		self.stubsName = 'org.{}.stubs.'.format (__base__.__envir__.transpiler_name)
		
		self.nameConsts = {
			None: 'null',
			True: 'true',
			False: 'false'
		}
		
		self.operators = {
			ast.Invert: ('~', 100),
			ast.UAdd: ('+', 100),
			ast.USub: ('-', 100),
			ast.Pow: (None, 110),		# Dealt with separately
			ast.Mult: ('*', 90),
			ast.MatMult: (None,	90),	# Dealt with separately
			ast.Div: ('/', 90),
			ast.FloorDiv: (None, 90),	# Dealt with separately
			ast.Mod: ('%', 90), 
			ast.Add: ('+', 80),
			ast.Sub: ('-', 80),
			ast.LShift: ('<<', 70),
            ast.RShift: ('>>', 70),
			ast.BitAnd: ('&', 60),
			ast.BitXor: ('^', 50),
			ast.BitOr: ('|', 40),
			ast.Eq: ('==', 30),
			ast.NotEq: ('!=', 30),
			ast.Lt: ('<', 30),
			ast.LtE: ('<=', 30),
			ast.Gt: ('>', 30),
			ast.GtE: ('>=', 30),
			ast.Is: ('===', 30),		# Not really, but closest for now
			ast.IsNot: ('!==', 30),		# Not really, but closest for now
			ast.In:	(None, 30),			# Dealt with separately
			ast.NotIn: (None, 30),		# Dealt with separately
			ast.Not: ('!', 20), 
			ast.And: ('&&', 10),
			ast.Or: ('||', 0)
		}
		
		self.allowKeywordArgs = utils.commandArgs.kwargs
		self.allowOperatorOverloading = utils.commandArgs.opov
		self.allowConversionToIterable = utils.commandArgs.iconv
		self.allowDmap = utils.commandArgs.anno and not self.module.metadata.sourcePath.endswith ('.js')
		self.memoizeCalls = utils.commandArgs.fcall
		self.codeGeneration = True
		self.stripTuple = False		# For speed, tuples are translated to bare JavaScript arrays if they're just indices
		
		try:
			self.visit (module.parseTree)
			self.targetFragments.append (self.lineNrString)	# Last target fragment doesn't have a '\n' to replace in the emit method

		except Exception as exception:
			utils.enhanceException (exception, moduleName = self.module.metadata.name, lineNr = self.lineNr)
			
		if self.tempIndices:
			raise utils.Error (
				message = '\n\tTemporary variables leak in code generator: {}'.format (self.tempIndices)
			)
			
	def visitSubExpr (self, node, child):
		def getPriority (exprNode):
			if type (exprNode) in (ast.BinOp, ast.BoolOp):
				return self.operators [type (exprNode.op)][1]
			elif type (exprNode) == ast.Compare:
				return self.operators [type (exprNode.ops [0])][1]	# All ops have same priority
			else:
				return 1000000	# No need for parenthesis
				
		if getPriority (child) <= getPriority (node):
			self.emit ('(')
			self.visit (child)
			self.emit (')')
		else:
			self.visit (child)
			
	def getAliaser (self, pyFragment, jsFragment):
		return (pyFragment, re.compile ('''
			(^{0}$)|			# Whole word
			(.+__{0}__.+)|		# Truly contains __<pyFragment>__ (Truly, so spare e.g. __name__)
			(^{0}__)|			# Starts with <pyFragment>__
			(__{0}$)|			# Ends with __<pyFragment>
			((?<=\.){0}__)|		# Starts with '.<pyFragment>__'
			(__{0}(?=\.))		# Ends with '__<pyFragment>.'
		'''.format (pyFragment), re.VERBOSE), jsFragment)
			
	def filterId (self, qualifiedId):
		for aliaser in self.aliasers:
			qualifiedId = re.sub (aliaser [1], aliaser [2], qualifiedId)
		return qualifiedId
		
	def tabs (self, indentLevel = None):
		if indentLevel == None:
			indentLevel = self.indentLevel
		return indentLevel * '\t'
		
	def emit (self, fragment, *formatter):
		if (	# At the start of a new line
			not self.targetFragments or
			(self.targetFragments and self.targetFragments [-1] .endswith ('\n'))
		):
			self.targetFragments.append (self.tabs ())
			
		fragment = fragment [:-1] .replace ('\n', '\n' + self.tabs ()) + fragment [-1]
		self.targetFragments.append (fragment.format (*formatter) .replace ('\n', self.lineNrString + '\n'))
		
	def indent (self):
		self.indentLevel += 1
		
	def dedent (self):
		self.indentLevel -= 1
		
	def inscope (self, node):
		self.scopes.append (Scope (node))
		
	def descope (self):
		self.scopes.pop ()
		
	def getscope (self, nodeType = None):
		if nodeType:
			for scope in reversed (self.scopes):
				if type (scope.node) == nodeType:
					return scope
		else:
			return self.scopes [-1]
			
	def emitComma (self, index, blank = True):
		if index:
			self.emit (', ' if blank else ',')
			
	def adaptLineNrString (self, node):
		if utils.commandArgs.map or self.allowDmap:
			if hasattr (node, 'lineno'):
				lineNr = node.lineno
			else:
				lineNr = self.lineNr
				
			self.lineNrString = str (sourcemaps.maxNrOfSourceLinesPerModule + lineNr) [1 : ]
		else:
			return ''
		
	def emitBody (self, body):
		for stmt in body:
			self.visit (stmt)
			self.emit (';\n')
				
	def nextTemp (self, name):
		if name in self.tempIndices:
			self.tempIndices [name] += 1
		else:
			self.tempIndices [name] = 0
		return self.getTemp (name)
		
	def skipTemp (self, name):
		self.skippedTemps.add (self.nextTemp (name))
		
	def skippedTemp (self, name):
		return self.getTemp (name) in self.skippedTemps
		
	def getTemp (self, name):
		if name in self.tempIndices:
			return '__{}{}__'.format (name, self.tempIndices [name])
		else:
			return None
	
	def prevTemp (self, name):
		if self.getTemp (name) in self.skippedTemps:
			self.skippedTemps.remove (self.getTemp (name))
			
		self.tempIndices [name] -= 1
		if self.tempIndices [name] < 0:
			del self.tempIndices [name]
			
	def useModule (self, name):
		result = self.module.program.provide (name)	# Must be done first because it can generate a healthy exception
		self.use.add (name)							# Must not be done if the healthy exception occurs
		return result
		
	def isCall (self, node, name):
		return type (node) == ast.Call and type (node.func) == ast.Name and node.func.id == name
		
	def getPragmaKindFromExpr (self, node):
		return (
			node.value.args [0] .s
			if type (node) == ast.Expr and self.isCall (node.value, '__pragma__') else
			None
		)
		
	def visit (self, node):	
		try:
			self.lineNr = node.lineno
		except:
			pass
			
		pragmaKind = self.getPragmaKindFromExpr (node)
		
		if pragmaKind == 'skip':
			self.codeGeneration = False
		elif pragmaKind == 'noskip':
			self.codeGeneration = True
		
		if self.codeGeneration:
			ast.NodeVisitor.visit (self, node)
		
	def visit_arg (self, node):
		self.emit (self.filterId (node.arg))
		
	def visit_arguments (self, node):	# Visited for def's, not for calls
		self.emit ('(')
		
		for index, arg in enumerate (node.args):
			self.emitComma (index)
			self.visit (arg)
				
		# If there's a vararg or a kwarg, no formal parameter is emitted for it, it's just retrieved in the body
		# so def f (a, b=3, *x, c, d=4, **y, e, f = 5) generates function f (a, b, c, d, e, f), since x and y are never passed in positionally
			
		self.emit (') {{\n')
		
		self.indent ()	# Start of function body, the end is not in visit_arguments
		
		# Defaults for positional args (before *), only if not passed normally before this point
		# They can also be passed in as keyword args
		# If so, the keywords are filled in starting with the last positional arg
		# So after a keyword positional arg cannot follow a non-keyword positional arg
		# The kwargdict may be the last of the actual params
		# It should not initialize a formal param, so it's overwritten by the default as well.
		for arg, expr in reversed (list (zip (reversed (node.args), reversed (node.defaults)))):
			if expr:
				self.emit ('if (typeof {0} == \'undefined\' || ({0} != null && {0} .__class__ == __kwargdict__)) {{;\n', self.filterId (arg.arg))
				self.indent ()
				self.emit ('var {} = ', self.filterId (arg.arg))
				self.visit (expr)
				self.emit (';\n')
				self.dedent ()
				self.emit ('}};\n')
			
		# Defaults for kwonly args (after *), unconditionally, since they will be passed only after this point
		for arg, expr in zip (node.kwonlyargs, node.kw_defaults):
			if expr:
				self.emit ('var {} = ', self.filterId (arg.arg))
				self.visit (expr)
				self.emit (';\n')		
				
		if self.allowKeywordArgs:
			self.emit ('if (arguments.length) {{\n')
			self.indent ()
		
			# Store index of last actual param 
			self.emit ('var {} = arguments.length - 1;\n', self.nextTemp ('ilastarg'))
		
			# Any calltime keyword args are passed in a JavaScript-only object of type __kwargdict__
			# If it's there, copy the __kwargdict__ into local var __allkwargs__
			# And lower __ilastarg__ by 1, since the last calltime arg wasn't a normal (Python) one
			# It's only known at call time if there are keyword arguments, unless there are no arguments at all, so allways have to generate this code
			self.emit ('if (arguments [{0}] && arguments [{0}].__class__ == __kwargdict__) {{\n', self.getTemp ('ilastarg'))
			self.indent ()
			self.emit ('var {} = arguments [{}--];\n', self.nextTemp ('allkwargs'), self.getTemp ('ilastarg'))
			
			# If there is a **kwargs arg, make a local to hold its calltime contents
			if node.kwarg:
				self.emit ('var {} = {{}};\n', self.filterId (node.kwarg.arg))
				
			# __kwargdict__ may contain deftime defined keyword args, but also keyword args that are absorbed by **kwargs
			self.emit ('for (var {} in {}) {{\n', self.nextTemp ('attrib'), self.getTemp ('allkwargs'))
			self.indent ()
			
			# We'll make the distinction between normal keyword args and **kwargs keyword args in a switch
			if node.args + node.kwonlyargs or node.kwarg:
				self.emit ('switch ({}) {{\n', self.getTemp ('attrib'))
				self.indent ()
							
				# First generate a case for each normal keyword arg, generating a local for it
				for arg in node.args + node.kwonlyargs:
					self.emit ('case \'{0}\': var {0} = {1} [{2}]; break;\n', self.filterId (arg.arg), self.getTemp ('allkwargs'), self.getTemp ('attrib'))
									
				# Then put the rest into the **kwargs local
				if node.kwarg:
					self.emit ('default: {0} [{1}] = {2} [{1}];\n', self.filterId (node.kwarg.arg), self.getTemp ('attrib'), self.getTemp ('allkwargs'))
									
				self.dedent ()
				self.emit ('}}\n')	# switch..
			
			self.prevTemp ('allkwargs')
			self.prevTemp ('attrib')
			
			self.dedent ()
			self.emit ('}}\n')	# for (__attrib__..
			
			# Take out the kwargdict marker, to prevent it from being passed in to another call, leading to confusion there
			if node.kwarg:
				self.emit ('{}.__class__ = null;\n', self.filterId (node.kwarg.arg))
			
			self.dedent ()
			self.emit ('}}\n')	# if (arguments [{0}]..		

			# If there's a vararg, assign an array containing the remainder of the actual non keyword only params, except for the __kwargdict__
			if node.vararg:
				# Slice starts at end of formal positional params, ends with last actual param, all actual keyword args are taken out into the __kwargdict__
				self.emit (
					'var {} = tuple ([].slice.apply (arguments).slice ({}, {} + 1));\n',
					self.filterId (node.vararg.arg),
					len (node.args),
					self.getTemp ('ilastarg')
				)
				
			self.prevTemp ('ilastarg')
			
			self.dedent ()
			self.emit ('}}\n')	# if (arguments.length..
		else:
			if node.vararg:	# See above
				self.emit (
					'var {} = tuple ([].slice.apply (arguments).slice ({}));\n',
					self.filterId (node.vararg.arg),
					len (node.args),
				)
				
	def visit_Assign (self, node):
		self.adaptLineNrString (node)
	
		targetLeafs = (ast.Attribute, ast.Subscript, ast.Name)
		
		def assignTarget (target, value, pathIndices = []):
			def emitPathIndices ():
				if pathIndices:
					self.emit (' ')
					for pathIndex in pathIndices:
						self.emit ('[{}]'.format (pathIndex))
				else:	# Most frequent and simple case, only one atomary LHS
					pass
					
			if type (target) == ast.Subscript:				# Only non-overloaded LHS index can be left to visit_Subscript
				if type (target.slice) == ast.Index:		# Always overloaded
					if type (target.slice.value) == ast.Tuple:
						self.visit (target.value)
						self.emit ('.__setitem__ (')			# Free function tries .__setitem__ (overload) and [] (native)
						self.stripTuple = True
						self.visit (target.slice.value)
						self.emit (', ')
						self.visit (value)
						emitPathIndices ()
						self.emit (')')					
					elif self.allowOperatorOverloading:		# Possibly overloaded LHS index dealth with here, is special case
						self.emit ('__setitem__ (')			# Free function tries .__setitem__ (overload) and [] (native)
						self.visit (target.value)
						self.emit (', ')
						self.visit (target.slice.value)
						self.emit (', ')
						self.visit (value)
						emitPathIndices ()
						self.emit (')')
					else:									# Non-overloaded LHS index just dealth with by visit_Subscript
						self.visit (target)					# which is called indirectly here
						self.emit (' = ')
						self.visit (value)
						emitPathIndices ()						
				elif type (target.slice) == ast.Slice:
					if self.allowOperatorOverloading:
						self.emit ('__setslice__ (')		# Free function tries .__setitem__ (overload) and .__setslice__ (native)
						self.visit (target.value)		
						self.emit (', ')
					else:
						self.visit (target.value)
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
				elif type (target.slice) == ast.ExtSlice:	# Always overloaded
					self.visit (target.value)		
					self.emit ('.__setitem__ (')			# Method, since extended slice access is always overloaded
					self.emit ('[')
					for index, dim in enumerate (target.slice.dims):
						self.emitComma (index)
						self.visit (dim)
					self.emit (']')
					self.emit (', ')
					self.visit (value)
					self.emit (')')
			else:
				if isPropertyAssign and not target.id == self.getTemp ('left'):
					self.emit ('Object.defineProperty ({}, \'{}\', '.format (self.getscope () .node.name, target.id))
					self.visit (value)
					emitPathIndices ()
					self.emit (');')
				else:
					if type (target) == ast.Name:
						if type (self.getscope () .node) == ast.ClassDef and target.id != self.getTemp ('left'):
							self.emit ('{}.'.format (self.getscope () .node.name))	# The target is an attribute
						elif target.id in self.getscope () .nonlocals:
							pass
						else:
							self.emit ('var ')
							
					self.visit (target)
					self.emit (' = ')
					self.visit (value)
					emitPathIndices ()

		# Tuple assignment LHS tree walker
		# The target (LHS) guides the walk, so it determines the source indices
		# However if a target leaf is an LHS slice,
		# the actual assignment will involve iterating through an extra index level,
		# as [1, 2][1:1] = [2, 3] should give [1, 2, 3, 4] rather than [1, [2, 3], 4]
		# This extra target level is walked in the slice
		def walkTarget (expr, pathIndices):
			if type (expr) in targetLeafs:			# It's an LValue, matching an RHS leaf source
				self.emit (';\n')
				
				# Create and visit RHS node on the fly, to benefit from assignTarget
				assignTarget (expr, ast.Name (id = self.getTemp ('left'), ctx = ast.Load), pathIndices)
			else:									# It's a sequence
				pathIndices.append (None)			# Add indexing level for that sequence
				for index, elt in enumerate (expr.elts):
					pathIndices [-1] = index
					walkTarget (elt, pathIndices)	# Walk deeper until finally pathIndices is used in emitting an RHS leaf
				pathIndices.pop ()					# Remove the indexing level since we're done with that sequence
				
		def getIsPropertyAssign (value):
			if self.isCall (value, 'property'):
				return True
			else:
				try:	# Assume it's a tuple or a list of properties (and so recursively)
					return getIsPropertyAssign (value.elts [0])
					
				except:	# At this point it wasn't a property and also not a tuple or a list of properties
					return False

		isPropertyAssign = type (self.getscope () .node) == ast.ClassDef and getIsPropertyAssign (node.value)
		# In transpiling to efficient JavaScript, we need a special, simplified case for properties
		# In JavaScript generating '=' for properties won't do, it has to be 'Object.defineProperty'
		# We can't look out for property installation at runtime, that would make all assignments slow
		# So we introduce the restriction that an assignment involves no properties at all or only properties
		# Also these properties have to use the 'property' function 'literally'
		# With these restrictions we can recognize property installation at compile time
				
		if len (node.targets) == 1 and type (node.targets [0]) in targetLeafs:
			# Fast shortcut for the most frequent and simple case
			assignTarget (node.targets [0], node.value)			
		else:
			# Multiple RHS or tuple assignment, we need __tmp__, create assignment node on the fly and visit it
			self.visit (ast.Assign ([ast.Name (id = self.nextTemp ('left'), ctx = ast.Store)], node.value))
			
			for expr in node.targets:
				walkTarget (expr, [])
				
			self.prevTemp ('left')			
			
	def visit_Attribute (self, node):
		self.visit (node.value)
		self.emit ('.{}', self.filterId (node.attr))
		
	def visit_AugAssign (self, node):
		if type (node.target) == ast.Subscript and (
				self.allowOperatorOverloading or
				type (node.target.slice) != ast.Index or
				type (node.target.slice.value) == ast.Tuple
		):	# LHS is a call to __getitem__ or __getslice__, so generating <operator>= won't work
			self.visit (ast.Assign ([node.target], ast.BinOp (node.target, node.op, node.value)))
		else:	
			self.visit (node.target)		# No need to emit var first, it has to exist already
			
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
					
			self.emit (' {}= ', self.operators [type (node.op)][0])
			self.visit (node.value)
		
	def visit_BinOp (self, node):
		if type (node.op) == ast.FloorDiv:
			self.emit ('Math.floor (')
			self.visit (node.left)
			self.emit (' / ')
			self.visit (node.right)
			self.emit (')')
		elif type (node.op) in (ast.MatMult, ast.Pow) or (self.allowOperatorOverloading and type (node.op) in (ast.Mult, ast.Div, ast.Add, ast.Sub)):
			self.emit ('{} ('.format (self.filterId (
				'Math.pow' if type (node.op) == ast.Pow else
				'__matmul__' if type (node.op) == ast.MatMult else
				'__mul__' if type (node.op) == ast.Mult else
				'__div__' if type (node.op) == ast.Div else
				'__add__' if type (node.op) == ast.Add else
				'__sub__' # if type (node.op) == ast.Sub else
			)))
			self.visit (node.left)
			self.emit (', ')
			self.visit (node.right)
			self.emit (')')						
		else:
			self.visitSubExpr (node, node.left)
			self.emit (' {} '.format (self.operators [type (node.op)][0]))			
			self.visitSubExpr (node, node.right)
			
	def visit_BoolOp (self, node):
		for index, value in enumerate (node.values):
			if index:
				self.emit (' {} '.format (self.operators [type (node.op)][0]))
			self.visitSubExpr (node, value)	
	
	def visit_Break (self, node):
		if not self.skippedTemp ('break'):
			self.emit ('{} = true;\n', self.getTemp ('break'))
		self.emit ('break')
	
	def visit_Call (self, node):
		self.adaptLineNrString (node)
	
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
					self.emit ('{}: ', self.filterId (keyword.arg))
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
			
		def include (fileName):
			searchedIncludePaths = []
			for searchDir in self.module.program.moduleSearchDirs:
				filePath = '{}/{}'.format (searchDir, fileName)
				if os.path.isfile (filePath):
					return open (filePath) .read ()
				else:
					searchedIncludePaths.append (filePath)
			else:
				raise utils.Error (
					moduleName = self.module.metadata.name,
					lineNr = self.lineNr,
					message = '\n\tAttempt to include file: {}\n\tCan\'t find any of:\n\t\t{}\n'.format (
						node.args [0], '\n\t\t'. join (searchedIncludePaths)
					)
				)
				
		if type (node.func) == ast.Name:
			if node.func.id == 'property':
				self.emit ('{0}.call ({1}, {1}.{2}'.format (node.func.id, self.getscope (ast.ClassDef) .node.name, node.args [0].id))
				if len (node.args) > 1:
					self.emit (', {}.{}'.format (self.getscope (ast.ClassDef) .node.name, node.args [1].id))
				self.emit (')')
				return
			elif node.func.id == '__pragma__':
				if node.args [0] .s == 'alias':
					self.aliasers.insert (0, self.getAliaser (node.args [1] .s, node.args [2].s))
				elif node.args [0] .s == 'noalias':
					if len (node.args) == 1:
						self.aliasers = []
					else:
						for index in reversed (range (len (self.aliasers))):
							if self.aliasers [index][0] == node.args [1] .s:
								self.aliasers.pop (index)
				elif node.args [0] .s == 'noanno':
					self.allowDmap = False
				elif node.args [0] .s == 'fcall':
					self.memoizeCalls = True
				elif node.args [0] .s == 'nofcall':
					self.memoizeCalls = False
				elif node.args [0] .s == 'iconv':		# Automatic conversion to iterable supported
					self.allowConversionToIterable = True
				elif node.args [0] .s == 'noiconv':		# Automatic conversion to iterable not supported
					self.allowConversionToIterable = False
				elif node.args [0] .s == 'js':			# Include JavaScript code literally in the output
					code = node.args [1] .s.format (* [
						eval (
							compile (
								ast.Expression (arg),	# Code to compile (can be AST or source)
								'<string>',				# Not read from a file
								'eval'					# Code is an expression
							),
							{},
							{'__include__': include}
						)
						for arg in node.args [2:]
					])
					for line in code.split ('\n'):
						self.emit ('{}\n', line)
				elif node.args [0] .s == 'kwargs':		# Start emitting kwargs code for FunctionDef's
					self.allowKeywordArgs = True
				elif node.args [0] .s == 'nokwargs':	# Stop emitting kwargs code for FunctionDef's
					self.allowKeywordArgs = False
				elif node.args [0] .s == 'opov':		# Overloading of a small sane subset of operators allowed
					self.allowOperatorOverloading = True
				elif node.args [0] .s == 'noopov':		# Operloading of a small sane subset of operators disallowed
					self.allowOperatorOverloading = False
				elif node.args [0] .s in ('skip', 'noskip'):
					pass						# Easier dealth with on statement / expression level in self.visit
				else:
					raise utils.Error (
						moduleName = self.module.metadata.name,
						lineNr = self.lineNr,
						message = 'Unknown pragma: {}'.format (
							node.args [0] .s if type (node.args [0]) == ast.Str else node.args [0]
						)
					)
				return
			elif node.func.id == '__new__':
				self.emit ('new ')
				self.visit (node.args [0])
				return
					
		if self.allowOperatorOverloading and not (type (node.func) == ast.Name and node.func.id == '__call__'):	# Add __call__ node on the fly and visit it
			self.visit (ast.Call (
				func = ast.Name (id = '__call__', ctx = node.func.ctx), args = [node.func] + node.args, keywords = node.keywords)
			)
			return	# The newly created node was visited by a recursive call to visit_Call. This replaces the current visit. 
				
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
		self.adaptLineNrString (node)
		
		if type (self.getscope () .node) == ast.Module:
			self.all.add (node.name)

		self.emit ('var {0} = __class__ (\'{0}\', [', self.filterId (node.name))
		if node.bases:
			for index, expr in enumerate (node.bases):
				try:
					self.emitComma (index)
					self.visit_Name (expr)
				except Exception as exception:
					utils.enhanceException (moduleName = self.module.metadata.name, lineNr = self.lineNr, message = 'Invalid base class')
		else:
			self.emit ('object')
		self.emit ('], {{')
		self.inscope (node)			
		
		self.indent ()
		classVarAssigns = []
		index = 0
		for stmt in node.body:
			if type (stmt) == ast.FunctionDef:
				self.emitComma (index, False)
				self.visit (stmt)
				index += 1
			elif type (stmt) == ast.Assign:
				classVarAssigns.append (stmt)	# Has to be done after the class because tuple assignment requires the use of an algorithm
			elif self.getPragmaKindFromExpr (stmt):
				self.visit (stmt)
		self.dedent ()
				
		self.emit ('\n}})')

		for index, classVarAssign in enumerate (classVarAssigns):
			self.emit (';\n')
			self.visit (classVarAssign)

		self.descope ()	# No earlier, class vars need it
		
	def visit_Compare (self, node):
		if len (node.comparators) > 1:
			self.emit ('(')
			
		left = node.left
		for index, (operand, right) in enumerate (zip (node.ops, node.comparators)):
			if index:
				self.emit (' && ')
				
			if type (operand) in (ast.In, ast.NotIn):
				self.emit ('{}__in__ (', '!' if type (operand) == ast.NotIn else '')
				self.visitSubExpr (node, left)
				self.emit (', ')
				self.visitSubExpr (node, right)
				self.emit (')')
			else:						
				self.visitSubExpr (node, left)
				self.emit (' {0} '.format (self.operators [type (operand)][0]))
				self.visitSubExpr (node, right)
				
			left = right
			
		if len (node.comparators) > 1:
			self.emit(')')
			
	def visit_Continue (self, node):
		self.emit ('continue')
	
	def visit_Delete (self, node):	# Currently dict element only, rest can be done with empty slice assignment
		for expr in node.targets:
			self.emit ('delete ')
			self.visit (expr)
			self.emit (';\n')
	
	def visit_Dict (self, node):
		if not utils.commandArgs.jskeys:
			for key in node.keys:
				if not type (key) in (ast.Str, ast.Num):
					self.emit ('dict ([')
					for index, (key, value) in enumerate (zip (node.keys, node.values)):
						self.emitComma (index)
						self.emit ('[')
						self.visit (key)	# In a JavaScrip list, name is evaluated as variable or function call to produce a key
						self.emit (', ')
						self.visit (value)
						self.emit (']')
					self.emit ('])')
					return
					
		self.emit ('dict ({{')
		for index, (key, value) in enumerate (zip (node.keys, node.values)):
			self.emitComma (index)
			self.visit (key)	# In a JavaScript object literal name isn't evaluated but literally taken to be a key ('virtual' quotes added) 
			self.emit (': ')
			self.visit (value)
		self.emit ('}})')
		
	def visit_DictComp (self, node):
		self.visit_ListComp (node, isDict = True)
			
	def visit_Expr (self, node):
		self.visit (node.value)
				
	def visit_For (self, node):
		self.adaptLineNrString (node)
		
		if node.orelse:
			self.emit ('var {} = false;\n', self.nextTemp ('break'))
		else:
			self.skipTemp ('break')
			
		optimize = (	# Special case optimization: iterating through range with constant step
			type (node.target) == ast.Name and	# Since 'var' is emitted, target must not yet exist, so e.g. not be element of array
			self.isCall (node.iter, 'range') and (
				len (node.iter.args) < 3 or
				type (node.iter.args [2]) == ast.Num or (
					type (node.iter.args [2]) == ast.UnaryOp and
					type (node.iter.args [2] .operand) == ast.Num
				)
			)
		)
		
		if optimize:
			step = (
					1
				if len (node.iter.args) <= 2 else
					node.iter.args [2] .n
				if type (node.iter.args [2]) == ast.Num else
					node.iter.args [2] .operand .n
				if type (node.iter.args [2] .op) == ast.UAdd else
					-node.iter.args [2] .operand .n
			)
			
			self.emit ('for (var ')
			self.visit (node.target)
			self.emit (' = ')
			self.visit (node.iter.args [0] if len (node.iter.args) > 1 else ast.Num (0))
			self.emit ('; ')
			self.visit (node.target)
			self.emit (' < ' if step > 0 else ' > ')
			self.visit (node.iter.args [1] if len (node.iter.args) > 1 else node.iter.args [0])
			self.emit ('; ')
			self.visit (node.target)
			if step == 1:
				self.emit ('++')
			elif step == -1:
				self.emit ('--')
			elif step >= 0:
				self.emit ( ' += {}', step)
			else:
				self.emit ( ' -= {}', -step)
			self.emit (') {{\n')
			
			self.indent ()
		else:
			self.emit ('var {} = ', self.nextTemp ('iter'))
			self.visit (node.iter)
			self.emit (';\n')
			
			if self.allowConversionToIterable:
				self.emit ('if (type ({}) == dict) {{\n', self.getTemp ('iter'))
				self.indent ()
				self.emit ('{0} = {0}.{1} ();\n', self.getTemp ('iter'), self.filterId ('keys'))
				self.dedent ()
				self.emit ('}}\n')
		
			self.emit ('for (var {0} = 0; {0} < {1}.length; {0}++) {{\n', self.nextTemp ('index'), self.getTemp ('iter'))
			self.indent ()
		
			# Create and visit Assign node on the fly to benefit from tupple assignment
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

		if not optimize:
			self.prevTemp ('index')
			self.prevTemp ('iter')
			
		if node.orelse:
			self.adaptLineNrString (node.orelse)
				
			self.emit ('if (!{}) {{\n', self.getTemp ('break'))
			self.prevTemp ('break')
			
			self.indent ()
			self.emitBody (node.orelse)
			self.dedent ()
			
			self.emit ('}}\n')
		else:
			self.prevTemp ('break')
						
	def visit_FunctionDef (self, node):
		def emitScopedBody ():
			self.inscope (node)
			self.emitBody (node.body)
			self.dedent ()
			self.descope ()
			
		if not node.name == '__pragma__':	# Don't generate code for the dummy pragma definition starting the extraLines in utils
											# Pragma should never be defined, except once directly in JavaScript to support __pragma__ ('<all>')
											# The rest of its use is only at compile time at compile time			
			if type (self.getscope () .node) in (ast.Module, ast.FunctionDef):	# Global or function scope, so it's no method
				if type (self.getscope () .node) == ast.Module:
					self.all.add (node.name)
					
				self.adaptLineNrString (node)
				self.emit ('var {} = function ', self.filterId (node.name))
				self.visit (node.args)
				emitScopedBody ()
				self.emit ('}}')
			else:															# Class scope, so it's a method and needs the currying mechanism
				self.emit ('\n')
				self.adaptLineNrString (node)
				self.emit ('get {} () {{return __get__ (this, function ', self.filterId (node.name))	
				self.visit (node.args)
				emitScopedBody ()
				self.emit ('}}')
				
				if self.memoizeCalls:
					self.emit (', \'{}\'', node.name)	# Name will be used as attribute name to add bound function to instance
					
				self.emit (');}}')
				
	def visit_Global (self, node):
		raise utils.Error (
			moduleName = self.module.metadata.name,
			lineNr = self.lineNr,
			message = 'Keyword \'global\' not supported, use \'nonlocal\' instead, or make variable attribute of \'window\'\n'
		)
		
	def visit_If (self, node):
		self.adaptLineNrString (node)
		
		self.emit ('if (')
		self.visit (node.test)
		self.emit (') {{\n')
		
		self.indent ()
		self.emitBody (node.body)
		self.dedent ()
		
		self.emit ('}}\n')
		
		if node.orelse:
			self.adaptLineNrString (node.orelse)
				
			self.emit ('else {{\n')
			self.indent ()
			self.emitBody (node.orelse)
			self.dedent ()
			self.emit ('}}\n')
		
	def visit_IfExp (self, node):
		self.emit ('(')
		self.visit (node.test)
		self.emit (' ? ')
		self.visit (node.body)
		self.emit (' : ')
		self.visit (node.orelse)
		self.emit (')')
		
	def visit_Import (self, node):	# Import .. can only import modules
		self.adaptLineNrString (node)
		
		names = [alias for alias in node.names if not alias.name.startswith (self.stubsName)]
		
		if not names:
			return
		
		for index, alias in enumerate (names):
			try:
				self.useModule (alias.name)
			except Exception as exception:
				utils.enhanceException (exception, moduleName = self.module.metadata.name, lineNr = self.lineNr, message = 'Can\'t import module \'{}\''.format (alias.name))
			
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
		self.adaptLineNrString (node)

		if node.module.startswith (self.stubsName):
			return
				
		try:			
			# N.B. It's ok to call a modules __init__ multiple times, see __core__.mod.js
			for index, alias in enumerate (node.names):
				if alias.name == '*':											# * Never refers to modules, only to entities in modules
					if len (node.names) > 1:
						raise Error (moduleName = module.metadata.name, lineNr = node.lineno, message = 'Can\'t import module \'{}\''.format (alias.name))
						
					module = self.useModule (node.module)

					for index, name in enumerate (module.all):				
						self.emit ('var {0} = __init__ (__world__.{1}).{0}', self.filterId (name), self.filterId (node.module))
						if index < len (module.all) - 1:
							self.emit (';\n')
				else:
					try:														# Try if alias.name denotes a module
						self.useModule ('{}.{}'.format (node.module, alias.name))
												
						if alias.asname:
							self.emit ('var {} = __init__ (__world__.{}.{})', self.filterId (alias.asname), self.filterId (node.module), self.filterId (alias.name))
						else:
							self.emit ('var {0} = __init__ (__world__.{1}.{0})', self.filterId (alias.name), self.filterId (node.module))						
					except:														# If it doesn't it denotes an entity inside a module
						self.useModule (node.module)
						
						if alias.asname:
							self.emit ('var {} = __init__ (__world__.{}).{}', self.filterId (alias.asname), self.filterId (node.module), self.filterId (alias.name))
						else:
							self.emit ('var {0} = __init__ (__world__.{1}).{0}', self.filterId (alias.name), self.filterId (node.module))						
					if index < len (node.names) - 1:
						self.emit (';\n')
		except Exception as exception:
			utils.enhanceException (exception, lineNr = self.lineNr, message = 'Can\'t import from module \'{}\''.format (node.module))
			
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
		
	def visit_ListComp (self, node, isSet = False, isDict = False):
		elts = []
		bodies = [[]]
		
		# Create and visit For node on the fly to benefit from tupple assignment
		# The For node creates an Assign node on the fly, to get this done
		def nestLoops (generators):
			for comprehension in generators:
				target = comprehension.target
				iter = comprehension.iter
				
				# Make room for body of this for
				bodies.append ([])
				# Append this for to previous body
				bodies [-2].append (ast.For (target, iter, bodies [-1], []))
				
				for expr in comprehension.ifs:
					test = expr
					
					# Make room for body of this if
					bodies.append ([])
					# Append this if to previous body
					bodies [-2].append (ast.If (test, bodies [-1], []))
					
			bodies [-1].append (
				# Nodes to generate __accu<i>__.append (<elt>)
				ast.Call (
					ast.Attribute (
						ast.Name (
							self.getTemp ('accu'),
							ast.Load),
						'append',
						ast.Load
					),
					[ast.List (elts = [node.key, node.value], ctx = ast.Load) if isDict else node.elt],
					[]
				)
			)
			
			self.visit (
				bodies [0][0]
			)

		self.emit ('function () {{\n')
		self.inscope (ast.FunctionDef ())
		self.indent ()
		self.emit ('var {} = [];\n', self.nextTemp ('accu'))
		nestLoops (node.generators [:])	# Leave original in intact, just for neatness
		self.emit (
			'return {}{}{};\n',
			'set (' if isSet else 'dict (' if isDict else '',
			self.getTemp ('accu'),
			')' if isSet or isDict else ''		
		)
		self.prevTemp ('accu')
		self.dedent ()
		self.descope ()
		self.emit ('}} ()')
		
	def visit_Module (self, node):
		self.adaptLineNrString (node)
						
		self.inscope (node)
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
			
		if self.use:
			self.use = sorted (self.use)
			self.emit ('__pragma__ (\'<use>\' +\n')	# Only the last occurence of <use> and </use> are special.
			self.indent ()
			for name in self.use:
				self.emit ('\'{}\' +\n', name)
			self.dedent ()
			self.emit ('\'</use>\')\n')
		
		if self.all:
			self.all = sorted (self.all)
			self.emit ('__pragma__ (\'<all>\')\n')	# Only the last occurence of <all> and </all> are special.
			self.indent ()
			for name in self.all:
				self.emit ('__all__.{0} = {0};\n', self.filterId (name))
			self.dedent ()
			self.emit ('__pragma__ (\'</all>\')\n')
		
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
			'{}var {} = {{}};{}\n'.format (self.tabs (importHeadsLevel), self.filterId (head), self.lineNrString)
			for head in sorted (self.importHeads)
		]))
		self.descope ()
		
	def visit_Name (self, node):	
		if type (node.ctx) == ast.Store:
			if type (self.getscope () .node) == ast.Module:
				self.all.add (node.id)
				
		self.emit (self.filterId (node.id))
		
	def visit_NameConstant (self, node):
		self.emit (self.nameConsts [node.value])
		
	def visit_Nonlocal (self, node):
		self.getscope (ast.FunctionDef) .nonlocals.update (node.names)

	def visit_Num (self, node):
		self.emit ('{}', node.n)
		
	def visit_Pass (self, node):
		self.adaptLineNrString (node)
			
		self.emit ('// pass')
		
	def visit_Raise (self, node):
		self.adaptLineNrString (node)
			
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
		self.adaptLineNrString (node)
			
		self.emit ('return ')
		if node.value:
			self.visit (node.value)
		
	def visit_Set (self, node):
		self.emit ('new set ([')
		for index, elt in enumerate (node.elts):
			self.emitComma (index)
			self.visit (elt)
		self.emit ('])')
		
	def visit_SetComp (self, node):
		self.visit_ListComp (node, isSet = True)
				
	def visit_Slice (self, node):	# Only visited for dims as part of ExtSlice
		self.emit ('tuple ([')

		if node.lower == None:
			self.emit ('0')
		else:
			self.visit (node.lower)
			
		self.emit (', ')
		
		if node.upper == None:
			self.emit ('0')
		else:
			self.visit (node.upper)
			
		self.emit (', ')
		
		if node.step == None:
			self.emit ('1')
		else:
			self.visit (node.step)
		
		self.emit ('])')
		
	def visit_Str (self, node):
		self.emit ('{}', repr (node.s))
		
	# Visited for RHS index, non-overloaded LHS index, RHS slice and RHS extended slice
	# LHS slice and overloaded LHS index are dealth with directy in visit_Assign, since the RHS is needed for them also
	def visit_Subscript (self, node):
		if type (node.slice) == ast.Index:
			if type (node.slice.value) == ast.Tuple:	# Always overloaded, it must be an RHS index
				self.visit (node.value)
				self.emit ('.__getitem__ (')
				self.stripTuple = True
				self.visit (node.slice.value)
				self.emit (')')
			elif self.allowOperatorOverloading:			# It must be an RHS index
				self.emit ('__getitem__ (')				# Free function tries .__getitem__ (overload) and [] (native)
				self.visit (node.value)
				self.emit (', ')
				self.visit (node.slice.value)
				self.emit (')')
			else:										# It may be an LHS or RHS index 
				self.visit (node.value)
				self.emit (' [')
				self.visit (node.slice.value)
				self.emit (']')
		elif type (node.slice) == ast.Slice:
			if self.allowOperatorOverloading:
				self.emit ('__getslice__ (')			# Free function, tries .__getitem__ (overload) and .__getslice__ (native)
				self.visit (node.value)				
				self.emit (', ')
			else:
				self.visit (node.value)
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
			
			if node.slice.step == None:
				self.emit ('1')
			else:
				self.visit (node.slice.step)
				
			self.emit (')')
		elif type (node.slice) == ast.ExtSlice:			# Always overloaded
			self.visit (node.value)
			self.emit ('.__getitem__ (')				# Method, since extended slice access is always overloaded
			self.emit ('[')
			for index, dim in enumerate (node.slice.dims):
				self.emitComma (index)
				self.visit (dim)
			self.emit (']')
			self.emit (')')
					
	def visit_Try (self, node):
		self.adaptLineNrString (node)
			
		self.emit ('try {{\n')
		self.indent ()	
		self.emitBody (node.body)
		self.dedent ()
		self.emit ('}}\n')
		
		self.emit ('catch (__except__) {{\n')
		self.indent ()
		for index, excepthandler in enumerate (node.handlers):
			if excepthandler.type:	# One 'if' and possible several 'else if' clauses
				if index:
					self.emit ('else ')
				self.emit ('if (isinstance (__except__, ')
				self.visit (excepthandler.type)
				self.emit (')) {{\n')
			else:					# Nothing caught yet
				if index:
					self.emit ('else {{\n')
			
			if excepthandler.type or index:
				self.indent ()
				
			if excepthandler.name:
				self.emit ('var {} = __except__;\n', excepthandler.name)				
			self.emitBody (excepthandler.body)

			if excepthandler.type or index:
				self.dedent ()	
				self.emit ('}}\n')
				
		self.dedent ()
		self.emit ('}}\n')
		
		if node.finalbody:
			self.emit ('finally {{')
			self.emitBody (node.finalbody)
			self.emit ('}}\n')
		
	def visit_Tuple (self, node):
		keepTuple = not self.stripTuple		# Tuples used as indices are stripped for speed
		self.stripTuple = False				# Only strip first tuple encountered
		
		if keepTuple:
			self.emit ('tuple (')
			
		self.emit ('[')
		for index, elt in enumerate (node.elts):
			self.emitComma (index)
			self.visit (elt)
			
		self.emit (']')
		
		if keepTuple:
			self.emit (')')
			
	def visit_UnaryOp (self, node):
		if self.allowOperatorOverloading and type (node.op) == ast.USub:
			self.emit ('{} ('.format (self.filterId ('__neg__' )))
			self.visit (node.operand)
			self.emit (')')
		else:
			self.emit (self.operators [type (node.op)][0])			
			self.visitSubExpr (node, node.operand)
		
	def visit_While (self, node):
		self.adaptLineNrString (node)
			
		if node.orelse:
			self.emit ('var {} = false;\n', self.nextTemp ('break'))
		else:
			self.skipTemp ('break')
		
		self.emit ('while (')
		self.visit (node.test)
		self.emit (') {{\n')
		
		self.indent ()	
		self.emitBody (node.body)
		self.dedent ()
		
		self.emit ('}}\n')
		
		if node.orelse:
			self.adaptLineNrString (node.orelse)

			self.emit ('if (!{}) {{\n', self.getTemp ('break'))
			self.prevTemp ('break')
			
			self.indent ()
			self.emitBody (node.orelse)
			self.dedent ()
			
			self.emit ('}}\n')
		else:
			self.prevTemp ('break')
		
	def visit_With (self, node):
		self.adaptLineNrString (node)
			
		for withitem in node.items:
			self.visit (withitem.optional_vars)
			self.emit (' = ')
			self.visit (withitem.context_expr)
			self.emit (';\n')
			
		self.emitBody (node.body)
			
		for withitem in node.items:
			self.visit (withitem.optional_vars)
			self.emit ('.close ()')
			