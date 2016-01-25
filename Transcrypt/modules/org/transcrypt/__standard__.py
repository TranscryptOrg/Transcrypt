# This module is avaible solely in the Transcrypt environment
# It is included after the __builtin__ module, since it uses its facilities
# In Transcrypt, __standard__ is available inline, it isn't nested and cannot be imported in the normal way

from org.transcrypt.stubs.browser import __pragma__

__pragma__ ('nokwargs')

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
			
__pragma__ ('kwargs')
			
def sort (iterable, key = None, reverse = False):
	if key:
		iterable.sort (lambda a, b: key (a) > key (b))
	else:
		iterable.sort ()

	if reverse:
		iterable.reverse ()
		
def sorted (iterable, key = None, reverse = False):
	result = copy (iterable)
	sort (result, key, reverse)
	return result