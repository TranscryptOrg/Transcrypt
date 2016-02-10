import builtins

from org.transcrypt.__base__ import __envir__
from org.transcrypt import utils

# Complete __envir__ for the stub mode
__envir__.executorName = 'python'

# Set main to commandArgs.source rather than transcrypt
class __main__:
	__file__ = utils.commandArgs.source

# Browser root singleton
class window:
	class console:
		def log (*args):
			builtins.print ('console.log :\t', *args)

	def alert (anObject):
		input ('window.alert:\t {}\t(Press [ENTER] to continue)'.format (anObject))

# Add attributes of window to global namespace as is done in a browser
for attributeName in window.__dict__:
	vars () [attributeName] = window.__dict__ [attributeName]

# Make print on the desktop add 'console.log' prefix, to distinguish from alert	
def print (*args):
	console.log (*args)

# Define repr for autotester
# N.B. When using sets or dicts, use elemens or keys of one type, in sort order
def repr (any):
	def getNumAlphaKey (key):
		if type (key) == str:
			return key
		else:
			return str (1e10 + key)
			
	if type (any) == dict:	
		return '{' + ', '.join ([
			'{}: {}'.format (builtins.repr (key), builtins.repr (any [key]))
			for index, key in enumerate (sorted (any, key = getNumAlphaKey))
		]) + '}'
	elif type (any) == set:
		if any:
			return '{' + ', '.join ([str (item) for item in sorted (list (any))]) + '}'
		else:
			return builtins.repr (any)
	elif type (any) == range:
		return builtins.repr (list (any))
	else:
		return builtins.repr (any)
	
def __pragma__ (*args):	# Ignore all pragma's when running CPython
	pass
	