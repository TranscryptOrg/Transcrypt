from org.transcrypt.stubs.browser import __pragma__

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
	
	autoTester.check ('Issue 60')
	three = 3
	one = three & 1
	seven = three | 4
	eight = one << 3
	four = eight >> 1
	aTrue = bool (three & one)
	aFalse = bool (three & four)
	autoTester.check (3, three, 1, one, 7, seven, 8, eight, 4, four, True, aTrue, False, aFalse)
	
	autoTester.check ('Issue 65')
	__pragma__ ('opov')
	aList = [4, 5, 6]
	autoTester.check ([1, 2, 3,] + aList + [4, 5, 6])
	autoTester.check (3 * [1, 2, 3])
	autoTester.check ([1, 2, 3] * 3)
	aString = 'Crocodile'
	autoTester.check ('Tiger' + aString + 'Elephant')
	autoTester.check (3 * aString)
	autoTester.check (aString * 3)
	__pragma__ ('noopov')
	