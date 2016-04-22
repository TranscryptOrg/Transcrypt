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
	
	# Issue 36, workaround for Python closures capturing variables rather than values
	# An extra enclosing scope is created to remember the value of the variable
	
	results = []

	for i in range (10):
		# results.append (lambda: i)				# Works nowhere
		# results.append (lambda j = i: j)			# Works only in Python
		results.append ((lambda j: lambda: j) (i))	# Works in Python and Trancrypt

	autoTester.check ([result () for result in results])