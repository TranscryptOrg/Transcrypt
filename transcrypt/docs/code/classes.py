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
	
a = A (1001)
a.show ('america')

b = B (2002)
b.show ('russia')

c = C (3003, 4004)
c.show ('netherlands')

show2 = c.show
show2 ('copy')
