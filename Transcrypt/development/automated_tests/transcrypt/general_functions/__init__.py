from org.transcrypt.stubs.browser import sort

def run (autoTester):
	a = [1, 5, 3, 2, -1]
	b = ['sun', 'earth', 'moon']
	
	autoTester.check (sorted (a))
	autoTester.check (sorted (b))
		
	sort (a)
	autoTester.check (a)
	
	sort (b)
	autoTester.check (b)

	autoTester.check (sorted (a, reverse = True))
	autoTester.check (sorted (b, reverse = True))
	
	sort (a, reverse = True)
	autoTester.check (a)
	
	sort (b, reverse = True)
	autoTester.check (b)
	
	sort (b, key = lambda x: len (x)) 
	autoTester.check (b)

	sort (b, key = lambda x: len (x), reverse = True) 
	autoTester.check (b)
