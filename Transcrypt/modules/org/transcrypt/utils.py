import os
import argparse

debug = False

class CommandArgs:		
	def parse (self):
		self.argParser = argparse.ArgumentParser ()
		self.argParser.add_argument ('source', nargs='?', help = '.py file containing source code of main module')
		self.argParser.add_argument ('-k', '--kwargs', help = 'enable keyword arguments by default. DISADVISED. Use __pragma__ (\'kwargs\') and __pragma__(\'kwargoff\') instead to prevent bloat', action = 'store_true')
		self.argParser.add_argument ('-b', '--build', help = 'rebuild all target files from scratch', action = 'store_true')
		self.argParser.add_argument ('-l', '--license', help = 'show license', action = 'store_true')
		self.argParser.add_argument ('-r', '--run', help = 'run source file rather than compiling it', action = 'store_true')
		self.argParser.add_argument ('-v', '--verbose', help = 'show all messages', action = 'store_true')
		
		self.__dict__.update (self.argParser.parse_args () .__dict__)
		
		if not (self.license or self.source):
			self.argParser.print_usage ()
			exit (1)
		
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
		self.lineNr = lineNr
		self.message = message		

	# First one encountered counts, for all fields, because it's closest to the error
	# One error at a time, just like Python, clear and simpole
	
	def set (self, moduleName = '', lineNr = 0, message = ''):
		if not self.moduleName:
			self.moduleName = moduleName
			
		if not self.lineNr:
			self.lineNr = lineNr
			
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
		raise exception
	else:
		raise Error (**kwargs)
		