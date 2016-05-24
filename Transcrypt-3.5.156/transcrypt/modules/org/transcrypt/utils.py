import os
import sys
import argparse
import inspect

debug = False

class CommandArgs:		
	def parse (self):
		self.argParser = argparse.ArgumentParser ()
		
		self.argParser.add_argument ('source', nargs='?', help = ".py file containing source code of main module")
		self.argParser.add_argument ('-a', '--anno', help = "annotate target files that were compiled from Python with source file names and source line numbers", action = 'store_true')
		self.argParser.add_argument ('-b', '--build', help = "rebuild all target files from scratch", action = 'store_true')
		self.argParser.add_argument ('-c', '--check', help = "perform static check as part of compilation", action = 'store_true')
		self.argParser.add_argument ('-d', '--dmap', help = "dump human readable source map", action = 'store_true')
		self.argParser.add_argument ('-f', '--fcall', help = "enable fastcall mechanism by default. You can also use __pragma__ ('fcal') and __pragma__ (\'nofcall\')", action = 'store_true')
		self.argParser.add_argument ('-i', '--iconv', help = "enable automatic conversion to iterable by default. DISADVISED, since it will result in a type check for each for-loop. Preferable use __pragma__ ('iconv') and __pragma__ (\'noiconv\') to enable automatic conversion locally", action = 'store_true')
		self.argParser.add_argument ('-j', '--jskeys', help = "interpret {key: 'value'} as {'key': 'value'} and forbid {key (): 'value'}, as JavaScript does. DISADVISED, since it's less flexible than the Python interpretation. Use {'key': 'value'} explicitly if you want literal keys", action = 'store_true')		
		self.argParser.add_argument ('-k', '--kwargs', help = "enable keyword arguments by default. In general this is DISADVISED, use __pragma__ ('kwargs') and __pragma__('nokwargs') locally instead to prevent bloated code", action = 'store_true')
		self.argParser.add_argument ('-l', '--license', help = "show license", action = 'store_true')
		self.argParser.add_argument ('-m', '--map', help = "generate source map", action = 'store_true')
		self.argParser.add_argument ('-n', '--nomin', help = "no minification", action = 'store_true')
		self.argParser.add_argument ('-o', '--opov', help = "enable operator overloading by default. In general this is DISADVISED, use __pragma__ ('opov') and __pragma__('noopov') locally instead to prevent slow code", action = 'store_true')
		self.argParser.add_argument ('-p', '--parent', nargs='?', help = "object that will hold module, default is window. Use -p .none to generate orphan module, e.g. for use in node.js. Use -p .user to generate module that has to be explicitly initialized by calling <modulename> (), e.g. after the full page has loaded")
		self.argParser.add_argument ('-r', '--run', help = "run source file rather than compiling it", action = 'store_true')
		self.argParser.add_argument ('-t', '--tree', help = "dump syntax tree", action = 'store_true')
		self.argParser.add_argument ('-v', '--verbose', help = "show all messages", action = 'store_true')
		
		self.__dict__.update (self.argParser.parse_args () .__dict__)
		
		if not (self.license or self.source):
			log (True,  self.argParser.format_usage () .capitalize ())
			sys.exit (1)

		global extraLines
		extraLines = [
			# Make identifier __pragma__ known to static checker
			# It was only known in JavaScript from __core__.mod.js, which the checker doesn't see
			# __pragma__ ('<all>') in JavaScript requires it to remain a function, as it was in the core
			# It can't be skipped, since it has to precede __pragma__ ('skip'), to make the checker accept that
			'def __pragma__ (): pass',
		
			# Make __include__ known to the static checker
			'__pragma__ (\'skip\')',			
			'__new__ = __include__ = 0',	
			'__pragma__ (\'noskip\')',
			''
		] if commandArgs.check else []
		global nrOfExtraLines
		nrOfExtraLines = max (len (extraLines) - 1, 0)	# Last line only serves to force linefeed
		extraLines = '\n'.join (extraLines)
				
commandArgs = CommandArgs ()
	
def create (path):
	os.makedirs (os.path.dirname (path), exist_ok = True)
	return open (path, 'w')
	
def formatted (*args):	# args [0] is string, args [1 : ] are format params
	try:
		return str (args [0]) .format (*args [1 : ])
	except IndexError:	# Tuple index out of range in format tuple
		return ' '.join (args)
				
def log (always, *args):
	if always or commandArgs.verbose:
		print (formatted (*args), end = '')
				
class Error (Exception):
	def __init__ (self, moduleName = '', lineNr = 0, message = ''):
		self.moduleName = moduleName
		self.lineNr = lineNr - nrOfExtraLines
		self.message = message	

	# First one encountered counts, for all fields, because it's closest to the error
	# One error at a time, just like Python, clear and simpole
	
	def set (self, moduleName = '', lineNr = 0, message = ''):
		if not self.moduleName:
			self.moduleName = moduleName
			
		if not self.lineNr:
			self.lineNr = lineNr - nrOfExtraLines
			
		if not self.message:
			self.message = message
			
	def __str__ (self):
		return 'Error in {}'.format (
			': '.join (
				[', '.join (
					['program {}'.format (commandArgs.source)] +
					(['module {}'.format (self.moduleName)] if self.moduleName else []) +
					(['line {}'.format (self.lineNr)] if self.lineNr else [])
				)] +
				[self.message] if self.message else []
			)
		)
		
def enhanceException (exception, **kwargs):
	if isinstance (exception, Error):
		exception.set (**kwargs)
		result = exception
	else:
		result = Error (**kwargs)
	
	if debug:
		print ('''
	Exception of class {0} enhanced at:
		file: {1}
		function: {3}
		line: {2}
		context: {4}
		kwargs: {5}
		result: {6}
	'''.format (exception.__class__, *inspect.stack () [1][1:-1], kwargs, result))

	raise result
