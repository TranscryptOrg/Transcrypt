def run (autoTester):
	a = [1, 5, 3, 2, -1]
	b = ['sun', 'earth', 'moon']
	
	autoTester.check (sorted (a))
	autoTester.check (sorted (b))
	
	a.sort ()
	autoTester.check (a)
	
	b.sort ()
	autoTester.check (b)

	autoTester.check (sorted (a, reverse = True))
	autoTester.check (sorted (b, reverse = True))
	
	a.sort (reverse = True)
	autoTester.check (a)
	
	b.sort (reverse = True)
	autoTester.check (b)
	
	b.sort (key = lambda x: len (x)) 
	autoTester.check (b)

	b.sort (key = lambda x: len (x), reverse = True) 
	autoTester.check (b)
