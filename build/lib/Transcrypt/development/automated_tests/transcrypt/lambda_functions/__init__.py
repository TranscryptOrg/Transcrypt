def run (autoTester):
	z = 1000
	autoTester.check ((lambda x, y: x + y + z) (111, 222))

	def f (list0, list1, aFunc):
		return [aFunc (*elem) for elem in zip (list0, list1)]

	x = f (range (10), range (0, 100, 10), lambda x, y: x + y + z)
	autoTester.check (x)
	
	autoTester.check (f (range (10, 20), range (100, 200, 10), lambda x, y: x * y + 100 * z))
	autoTester.check (f (range (10, 20), range (100, 200, 10), lambda *args: args [0] * args [1] + 100 * z))
