class A:
	def __init__ (self):
		self.i = 0
		
	def f (self):
		return self.i

a = A ()
		
def run (autoTester):
	x = 3
	y = 5
	z = x + y
	autoTester.check (z)
	
	l = [1, 2, 3]
	l [1] = l [2]
	autoTester.check (l)
	
	# Should generate x++
	x += 1
	autoTester.check (x)
	x += +1
	autoTester.check (x)
	x -= -1
	autoTester.check (x)
	
	# Should generate y--
	y -= 1
	autoTester.check (y)
	y -= +1
	autoTester.check (y)
	y += -1
	autoTester.check (y)
	
	x += -3
	autoTester.check (x)
	
	x += 6
	autoTester.check (x)
	
	y -= 3
	autoTester.check (y)
	
	l [1] += l [1]
	autoTester.check (l)
	
	x += y
	y += x
	
	autoTester.check (x, y)
	
	f = a.f
	
	a.i += 1
	autoTester.check (f ())
	
	a.i += 10
	autoTester.check (f ())
	
	a.i += a.i
	autoTester.check (f ())
