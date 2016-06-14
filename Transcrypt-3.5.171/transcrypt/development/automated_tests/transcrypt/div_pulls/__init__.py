def run (autoTester):	
	autoTester.check ('Pull 56')
	s = 'abcdefghij'
	autoTester.check (s [2:3])
	autoTester.check (s [:3])
	autoTester.check (s [2:])
	autoTester.check (s [::2])
	
	autoTester.check ('Pull 59')
	autoTester.check (list (filter (lambda x: x % 2 == 0, range (10))))
	autoTester.check (list (map (lambda x: x*x, range (0, 31, 3))))
