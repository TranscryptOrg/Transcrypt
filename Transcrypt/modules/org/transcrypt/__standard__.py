# This module is avaible solely in the Transcrypt environment
# It is included after the __builtin__ module, since it uses its facilities
# In Transcrypt, __standard__ is available inline, it isn't nested and cannot be imported in the normal way

__pragma__ ('skip')
copy = 0
__pragma__ ('noskip')

from org.transcrypt.stubs.browser import __pragma__

__pragma__ ('nokwargs')
__pragma__ ('noalias', 'sort')

class Exception:
	def __init__ (self, *args):
		self.args = args
		
	def __repr__ (self):
		if len (self.args):
			return '{}{}'.format (self.__class__.__name__, repr (tuple (self.args)))
		else:
			return '???'
			
	def __str__ (self):
		if len (self.args) > 1:
			return str (tuple (self.args))
		elif len (self.args):
			return str (self.args [0])
		else:
			return '???'
			
class ValueError (Exception):
	pass
			
__pragma__ ('kwargs')
			
def __sort__ (iterable, key = None, reverse = False):	# Used by py_sort, can deal with kwargs
	if key:
		iterable.sort (lambda a, b: key (a) > key (b))	# JavaScript sort
	else:
		iterable.sort ()								# JavaScript sort
		
	if reverse:
		iterable.reverse ()
		
def sorted (iterable, key = None, reverse = False):
	if type (iterable) == dict:
		result = copy (iterable.keys ()) 
	else:		
		result = copy (iterable)
		
	__sort__ (result, key, reverse)
	return result