def run (autoTester):
	# Issue 40
	autoTester.check (65 / (5 * 2))

	# Issue 24
	switch = False
	autoTester.check (switch)
	
	# Issue 37
	autoTester.check (15 // 7)
	
	# Issue 27
	autoTester.check (['zero', 'one', 'two', 'three', 'four'] .index ('three'))
	