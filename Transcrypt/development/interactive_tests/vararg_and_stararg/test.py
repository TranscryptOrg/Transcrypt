def f (a, b, *args):
	print (a, b, args)
	
f (1, 2, 3, 4, 5)

def g (a, b, c):
	print (a, b, c)
	
g (6, *(7, 8))

class X:
	def __init__ (self):
		self.pi = 3.14
		self.e = 2.74
		
	def h (self, h, i, j, k, l):
		print (self.pi, h, i, j, k, l, self.e)
		
x = X ()

x.h (*[1, 2], 3, *[4, 5])

