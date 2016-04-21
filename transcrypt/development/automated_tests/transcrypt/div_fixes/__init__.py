def run (autoTester):
	# Issue 40
	autoTester.check (65 / (5 * 2))

	# Issue 24
	switch = False
	autoTester.check (switch)
	