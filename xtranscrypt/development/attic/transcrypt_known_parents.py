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
# See the QQuickLicence for details.
#
# The QQuickLicense can be accessed at: http://www.geatec.com/qqLicence.html

import sys
import ast
import textwrap
			
class Compiler:
	def __init__ (self):
		self.moduleDict = {}
		self.symbolTable = {}
		self.fragments = {}

	def compile (self, fileName):
		self.fileName = fileName
		self.parse (self.fileName [:-3])
		self.dump ()
		self.generate ()
		
	def parse (self, rootModuleName):
		self.rootModuleName = rootModuleName
		Module (self, self.rootModuleName) .parse ()
		
	def dump (self):
		for key in sorted (self.moduleDict):
			self.moduleDict [key].dump ()
						
	def generate (self):
		self.targetFragments = []
		for key in sorted (self.moduleDict):
			self.moduleDict [key] .generate ()
			self.targetFragments += self.moduleDict [key] .targetFragments
			
		self.target = ''.join (self.targetFragments) + '\n'
		with open ('{}.js'.format (self.rootModuleName), 'w') as targetFile:
			targetFile.write (self.target)
			
class Module:
	def __init__ (self, compiler, moduleName):
		self.compiler = compiler
		self.moduleName = moduleName
		self.compiler.moduleDict [self.moduleName] = self
		self.parseTree = None
		
	def parse (self):
		if not self.parseTree:
			self.fileName = '{0}.py'.format (self.moduleName)
			with open (self.fileName) as file:
				self.sourceCode = file.read ()
			self.parseTree = ast.parse (self.sourceCode)
		
	def dump (self):
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
		self.tree = ''.join (self.treeFragments) [1:]
		with open ('{0}.{1}'.format (self.moduleName, 'tree'), 'w') as treeFile:
			treeFile.write (self.tree)

	def generate (self):
		self.targetFragments = []
		GeneratingVisitor (self)
	
class GeneratingVisitor (ast.NodeVisitor):
	# N.B. Terms like parent, child, ancestor and descendant refer to the parse tree here, not to inheritance

	def __init__ (self, module):
		self.module = module
		self.indentLevel = 0
		self.setParents (module.parseTree)
		self.visit (module.parseTree)
		
	def setParents (self, node):	# Let parse tree nodes know their parents
		for childNode in ast.iter_child_nodes (node):
			childNode.parent = node
			self.setParents (childNode)
			
	def getLineNr (self, node):		# Get line number from nearest ancestor that has one
		while not hasattr (node, 'lineno'):
			node = node.parent
		return node.lineno

	def generate (self, fragment, *formatter):
		if self.module.targetFragments and self.module.targetFragments [-1] .endswith ('\n'):
			self.module.targetFragments.append (self.indentLevel * '\t')
		self.module.targetFragments.append (fragment.format (*formatter))

	def indent (self):
		self.indentLevel += 1
		
	def dedent (self):
		self.indentLevel -= 1
		
	def reportError (self, node, text, *formatter):
		print ('Module \'{}\', line {}, error: {}'.format (self.module.moduleName, self.getLineNr (node), text.format (*formatter)))
		
	def visit_alias (self, node):	# Descendant of Import and ImportFrom
		try:
			self.module.parse (node.name)
		except:
			raise Exception (node.name)
			
	def visit_arg (self, node):
		self.generate (node.arg)
	
	def visit_arguments (self, node):
		for index, arg in enumerate (node.args):
			if index:
				self.generate (', ')
			self.visit (arg)
	
	def visit_ClassDef (self, node):
		self.generate ('{}.{} = function () {{\n', self.module.moduleName, node.name)
		self.indent ()
		self.generate ('this.__bases__ = [')
		
		for index, expr in enumerate (node.bases):
			try:
				if index:
					self.generate (', ')
				self.visit_Name (expr)
			except Exception as exception:
				self.reportError (node, 'Invalid base class \'{}\'', exception)
		
		self.generate (']\n')
		
		for stmt in node.body:
			self.visit (stmt)
		
		self.dedent ()
		self.generate ('}}\n')

	def visit_FunctionDef (self, node):
		self.generate ('this.{} = function (', node.name)
		self.visit (node.args)
		self.generate (') {{\n')
		self.indent ()

		for stmt in node.body:
			self.visit (stmt)		

		self.dedent ()
		self.generate ('}}\n')
						
	def visit_Import (self, node):
		for alias in node.names:
			try:
				self.visit (alias)
			except Exception as exception:
				self.reportError (node, 'Can\'t import module \'{}\'', exception)
				
	def visit_Module (self, node):
		self.generate ('{} = object ()\n', self.module.moduleName)
		self.generic_visit (node)
		
	def visit_Name (self, node):
		self.generate (node.id)
		
			
#	def visit_Expr (self, node):
#		self.generic_visit (node)
			

compiler = Compiler ()
compiler.compile (sys.argv [1])

