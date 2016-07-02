# This module is avaible solely in the Transcrypt environment
# It is included after the __builtin__ module, since it uses its facilities
# In Transcrypt, __standard__ is available inline, it isn't nested and cannot be imported in the normal way

__pragma__ ('skip')
copy = 0
__pragma__ ('noskip')

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


__pragma__ ('nokwargs')

def map (func, iterable):
	return [func (item) for item in iterable]


def filter (func, iterable):
	return [item for item in iterable if func (item)]
	
class __Terminal__:
	def __init__ (self):
		try:
			self.element = document.getElementById ('__terminal__')
		except:	# node.js
			self.element = None
		if self.element:
			self.buffer = ''
			self.element.style.overflowX = 'auto'
			self.element.style.padding = '5px'
			self.element.innerHTML = '_'
		
	__pragma__ ('kwargs')
		
	def print (self, *args, sep = ' ', end = '\n'):
		if self.element:
			self.buffer = '{}{}{}'.format (self.buffer, sep.join ([str (arg) for arg in args]), end) [-4096 : ]	
			self.element.innerHTML = self.buffer.replace ('\n', '<br>')
			self.element.scrollTop = self.element.scrollHeight
		else:
			console.log (sep.join (args))
		
	def input (self, question):
		self.print ('{}_'.format (question), end = '')
		try:
			answer = window.prompt (question)
		except:
			console.log ('Error: Blocking input not yet implemented outside browser')
		self.buffer = self.buffer [:-1]
		self.print (answer)
		return answer
		
	__pragma__ ('nokwargs')
	
__terminal__ = __Terminal__ ()
