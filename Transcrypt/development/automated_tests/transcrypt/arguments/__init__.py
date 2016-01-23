class A:
	def __init__ (self, x = 123, y = 456, *args, m, n = 456, **kwargs):
		self.x = x
		self.y = y
		self.args = args
		self.m = m
		self.n = n
		self.kwargs = kwargs
		self.extra = 'hello'

	def f (self, autoTester):
		autoTester.check (self.x, self.y, self.args, self.m, self.n, self.kwargs, self.extra)
		
class B (A):
	def __init__ (self, x, y = -1, *args, m = -2, n, **kwargs):
		A.__init__ (self, y, x, *args, m = n, n = m, **kwargs)	
	
def run (autoTester):
	def f (x, y = -1, *args, m = -2, n, **kwargs):
		autoTester.check (x, y, args, m, n, kwargs)
		
	f (1, 2, 10, 20, m = 100, n = 200, p = 1000, q = 2000)
	
	b = B (3, 4, 30, 40, m = 300, n = 400, p = 3000, q = 4000)
	b.f (autoTester)
	
	def g (*args, **kwargs):
		autoTester.check (args, kwargs)
		
	g (*(1, 2, 3), **{'p': 'aP', 'q': 'aQ', 'r': 'anR'})
