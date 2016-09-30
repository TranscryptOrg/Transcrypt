# This module is avaible solely in the Transcrypt environment
# It is included after the __builtin__ module, since it uses its facilities
# In Transcrypt, __standard__ is available inline, it isn't nested and cannot be imported in the normal way

__pragma__ ('skip')
copy = Math = __typeof__ = __repr__ = document = console = window = 0
__pragma__ ('noskip')

__pragma__ ('nokwargs')
__pragma__ ('noalias', 'sort')

class Exception:
	__pragma__ ('kwargs')
	def __init__ (self, *args, **kwargs):
		self.__args__ = args
		try:
			self.stack = kwargs.error.stack	# Integrate with JavaScript Error object
		except:
			self.stack = 'No stack trace available'
	__pragma__ ('nokwargs')
		
	def __repr__ (self):
		if len (self.__args__):
			return '{}{}'.format (self.__class__.__name__, repr (tuple (self.__args__)))
		else:
			return '{}()'.format (self.__class__.__name__)
			
	def __str__ (self):
		if len (self.__args__) > 1:
			return str (tuple (self.__args__))
		elif len (self.__args__):
			return str (self.__args__ [0])
		else:
			return ''
		
class IterableError (Exception):
	def __init__ (self, error):
		Exception.__init__ (self, 'Can\'t iterate over non-iterable', error = error)
			
class StopIteration (Exception):
	def __init__ (self, error):
		Exception.__init__ (self, 'Iterator exhausted', error = error)
		
class ValueError (Exception,):
	def __init__ (self, error):
		Exception.__init__ (self, 'Erroneous value', error = error)
	
class KeyError (Exception,):
	def __init__ (self, error):
		Exception.__init__ (self, 'Invalid key', error = error)
	
class AssertionError (Exception):
	def __init__ (self, message, error):
		if message:
			Exception.__init__ (self, message, error = error)
		else:
			Exception.__init__ (self, error = error)
	
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
	
__pragma__ ('ifdef', '__complex__')
class complex:
	def __init__ (self, real, imag = None):
		if imag == None:
			if type (real) == complex:
				self.real = real.real
				self.imag = real.imag
			else:
				self.real = real
				self.imag = 0
		else:
			self.real = real
			self.imag = imag
			
	def __neg__ (self):
		return complex (-self.real, -self.imag)
		
	def __exp__ (self):
		modulus = Math.exp (self.real)
		return complex (modulus * Math.cos (self.imag), modulus * Math.sin (self.imag))
	
	def __log__ (self):
		return complex (Math.log (Math.sqrt (self.real * self.real + self.imag * self.imag)), Math.atan2 (self.imag, self.real))
		
	def __pow__ (self, other):	# a ** b = exp (b log a)
		return (self.__log__ () .__mul__ (other)) .__exp__ ()
		
	def __rpow__ (self, real):	# real ** comp -> comp.__rpow__ (real)
		return self.__mul__ (Math.log (real)) .__exp__ ()
		
	def __mul__ (self, other):
		if __typeof__ (other) is 'number':
			return complex (self.real * other, self.imag * other)
		else:
			return complex (self.real * other.real - self.imag * other.imag, self.real * other.imag + self.imag * other.real)
		
	def __rmul__ (self, real):	# real + comp -> comp.__rmul__ (real)
		return complex (self.real * real, self.imag * real)
		
	def __div__ (self, other):
		if __typeof__ (other) is 'number':
			return complex (self.real / other, self.imag / other)
		else:
			denom = other.real * other.real + other.imag * other.imag
			return complex (
				(self.real * other.real + self.imag * other.imag) / denom,
				(self.imag * other.real - self.real * other.imag) / denom
			)
		
	def __rdiv__ (self, real):	# real / comp -> comp.__rdiv__ (real)
		denom = self.real * self.real
		return complex (
			(real * self.real) / denom,
			(real * self.imag) / denom
		)
		
	def __add__ (self, other):
		if __typeof__ (other) is 'number':
			return complex (self.real + other, self.imag)
		else:	# Assume other is complex
			return complex (self.real + other.real, self.imag + other.imag)
		
	def __radd__ (self, real):	# real + comp -> comp.__radd__ (real)
		return complex (self.real + real, self.imag)
		
	def __sub__ (self, other):
		if __typeof__ (other) is 'number':
			return complex (self.real - other, self.imag)
		else:
			return complex (self.real - other.real, self.imag - other.imag)
		
	def __rsub__ (self, real):	# real - comp -> comp.__rsub__ (real)
		return complex (real - self.real, -self.imag)
		
	def __repr__ (self):
		return '({}{}{}j)'.format (self.real, '+' if self.imag >= 0 else '', self.imag)
			
	def __str__ (self):
		return __repr__ (self) [1 : -1]
		
__pragma__ ('endif')

class __Terminal__:
	def __init__ (self):
		try:
			self.element = document.getElementById ('__terminal__')
		except:	# node.js
			self.element = None
		if self.element:
			self.buffer = ''
			self.element.style.overflowX = 'auto'
			self.element.style.boxSizing = 'border-box'
			self.element.style.padding = '5px'
			self.element.innerHTML = '_'
		
	__pragma__ ('kwargs')
		
	def print (self, *args, sep = ' ', end = '\n'):
		def printAsync ():
			if self.element:
				self.buffer = '{}{}{}'.format (self.buffer, sep.join ([str (arg) for arg in args]), end) [-4096 : ]	
				self.element.innerHTML = self.buffer.replace ('\n', '<br>')
				self.element.scrollTop = self.element.scrollHeight
			else:
				console.log (sep.join ([str (arg) for arg in args]))
		setTimeout (printAsync, 5)
		
	def input (self, question):
		self.print ('{}_'.format (question), end = '')
		try:
			answer = window.prompt (question)
		except:
			answer = ''
			console.log ('Error: Blocking input not yet implemented outside browser')
		if hasattr (self, 'buffer'):
			self.buffer = self.buffer [:-1]	# Cut of the underscore
		self.print (answer)
		return answer
		
	__pragma__ ('nokwargs')
	
__terminal__ = __Terminal__ ()
