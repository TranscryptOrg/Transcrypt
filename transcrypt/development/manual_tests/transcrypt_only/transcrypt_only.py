from random import *

result = ''

def output (*any):
	for item in any:
		result += item
		result += ' '
	result += '<br>\n'

output ('Issue 96')	

class Tolerant:
	a = 3
	
	@classmethod
	def f (cls):
		pass
		
	def __init__ (self):
		self.b = 4
		
	def g (self):
		pass
		
tolerant = Tolerant ()

output ('T', 'a' in tolerant)
output ('T', 'f' in tolerant)
output ('T', 'b' in tolerant)
output ('T', 'g' in tolerant)
output ('F', 'h' in tolerant)

output ('<br>Issue 102')
__pragma__ ('js', '{}', '''
		function Example () {};
		Example.prototype.foo = function () {output (this, arguments);};

		var example = new Example();
		example.foo(1, 2, 3);
		// Works as expected:
		// Object {  } Arguments { , 5 more… }
		
''')

args = [1, 2, 3]
example = __new__ (Example ())
example.foo (1, 2, 3)	# Correct for JavaScript 5 and up
example.foo (*args) 	# For JavaScript < 6 this is transcribed to example.foo.call (null, args), "foo" context is lost

__pragma__ ('ifdef', '__esv6__')
output ('[object Object] rather than null in previous line')
__pragma__ ('else')
output ('null rather than [object Object] in previous line')
__pragma__ ('endif')

document.getElementById ('output') .innerHTML = result

