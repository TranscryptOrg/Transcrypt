def run (autoTester):
	class A:
		def __init__ (self, x):
			self.x = x

		def show (self, label):
			autoTester.check ('A.show', label, self.x)
		
	class B:
		def __init__ (self, y):
			autoTester.check ('In B constructor')
			self.y = y
			
		def show (self, label):
			autoTester.check ('B.show', label, self.y)
			
	class C (A, B):
		def __init__ (self, x, y):
			autoTester.check ('In C constructor')
			A.__init__ (self, x)
			B.__init__ (self, y)
			
		def show (self, label):
			A.show (self, label)
			B.show (self, label)
			autoTester.check ('C.show', label, self.x, self.y)
		
	a = A (1001)
	a.show ('america')

	b = B (2002)
	b.show ('russia')

	c = C (3003, 4004)
	c.show ('netherlands')

	show2 = c.show
	show2 ('copy')
