from random import *

result = ''

def output (any):
	result += any + '<br>\n'

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

output (['T', 'a' in tolerant])
output (['T', 'f' in tolerant])
output (['T', 'b' in tolerant])
output (['T', 'g' in tolerant])
output (['F', 'h' in tolerant])

document.getElementById ('output') .innerHTML = result
