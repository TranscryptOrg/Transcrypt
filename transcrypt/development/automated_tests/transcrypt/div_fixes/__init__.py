from div_fixes.issue55 import *

def run (autoTester):
	autoTester.check ('Issue 40')
	autoTester.check (65 / (5 * 2))

	autoTester.check ('Issue 24')
	switch = False
	autoTester.check (switch)
	
	autoTester.check ('Issue 37')
	autoTester.check (15 // 7)
	
	autoTester.check ('Issue 27')
	autoTester.check (['zero', 'one', 'two', 'three', 'four'] .index ('three'))
	
	autoTester.check ('Issue 36')
	# Workaround for Python closures capturing variables rather than values
	# An extra enclosing scope is created to remember the value of the variable
	results = []
	for i in range (10):
		# results.append (lambda: i)				# Works nowhere
		# results.append (lambda j = i: j)			# Works only in Python
		results.append ((lambda j: lambda: j) (i))	# Works in Python and Trancrypt
	autoTester.check ([result () for result in results])		

	autoTester.check ('Issue 50')
	autoTester.check ((240 + 30 - 1) // 30 * 30)
	
	autoTester.check ('Issue 51')
	a = 1
	b = 1
	autoTester.check (a, b, {a, b} == {1, 2})
	
	autoTester.check ('Issue 52')
	switch, case, default = 'switch', 'case', 'default'
	autoTester.check (switch, case, default)
	
	autoTester.check ('Issue 54')
	aDict = {1: 11, 2: 22, 3: 33}
	autoTester.check (aDict)
	aDict.clear ()
	autoTester.check (aDict)
	
	autoTester.check ('Issue 55')
	autoTester.check (f1 (), p, q, r, anA, aB, y)
	