def run (autoTester):	
	autoTester.check ('Pull 56')
	s = 'abcdefghij'
	autoTester.check (s [2:3])
	autoTester.check (s [:3])
	autoTester.check (s [2:])
	autoTester.check (s [::2])
	