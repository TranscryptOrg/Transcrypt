def run (autoTester):		
	class A:
		class B:
			def __init__ (self, x):
				self.x = x
				
			def tell (self):
				autoTester.check (self.x)
				autoTester.check (self.d)
				
			d = 1
				
		c = 2

		def __init__ (self, x):
			self.x = x
			
		def tell (self):
			autoTester.check (self.x)
			autoTester.check (self.c)
			
	def f (x):
		class G:
			def __init__ (self, x):
				self.x = x
				
			def tell (self):
				autoTester.check (self.x)
				
			h = 3
			
		g = G (4)
		g.tell ()
		autoTester.check (g.h)
		
		class P (A.B):
			pass
			
		p = P (5)
		p.tell ()
		autoTester.check (p.d)
				
	a = A (5)
	b = a.B (6)

	a.tell ()
	b.tell ()

	autoTester.check (a.c)
	autoTester.check (b.d)

	f (7)
