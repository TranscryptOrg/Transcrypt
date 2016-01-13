from org.transcrypt.stubs.browser import *

import testmod
import testmod2
import testmod2.testmod21

console.log ('test')

testmod.f ()
testmod2.f ()
testmod2.testmod21.f ()

class A:
	def __init__ (self, x):
		self.x = x

	def show (self, label):
		print ('A.show', label, self.x)
	
class B:
	def __init__ (self, y):
		alert ('In B constructor')
		self.y = y
		
	def show (self, label):
		print ('B.show', label, self.y)
		
class C (A, B):
	def __init__ (self, x, y):
		alert ('In C constructor')
		A.__init__ (self, x)
		B.__init__ (self, y)
		self.show ('constructor')
		
	def show (self, label):
		B.show (self, label)
		print ('C.show', label, self.x, self.y)
		
	def test (self, a, b, c):
		print (a, b, c)
	
a = A (1001)
a.show ('america')

b = B (2002)
b.show ('russia')

c = C (3003, 4004)
c.show ('netherlands')

c.test (1111, 2222, 3333)

show2 = c.show
show2 ('copy')

def f (a, b):
	print (a, b)
	
f (10, 20)

print (1, 2, 3, 4)
print (5, 6, 7, 8)

console.log ('terminated')
