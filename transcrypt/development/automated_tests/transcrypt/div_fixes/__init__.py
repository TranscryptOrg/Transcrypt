from org.transcrypt.stubs.browser import __pragma__, __new__, __envir__, __symbols__

from div_fixes.issue55 import *		# Names not exported from package's __init__.py

def run (autoTester):
	autoTester.check ('Issue 24')	# Non keyword switch generates javascript SyntaxError
	switch = False
	autoTester.check (switch)
	
	autoTester.check ('Issue 27')	# Python list.index () not translated correctly
	autoTester.check (['zero', 'one', 'two', 'three', 'four'] .index ('three'))
	
	autoTester.check ('Issue 36')	# Bug in compiling lambda default argument values
	# Workaround for Python closures capturing variables rather than values
	# An extra enclosing scope is created to remember the value of the variable
	results = []
	for i in range (10):
		# results.append (lambda: i)				# Works nowhere
		# results.append (lambda j = i: j)			# Works only in Python
		results.append ((lambda j: lambda: j) (i))	# Works in Python and Transcrypt
	autoTester.check ([result () for result in results])		

	autoTester.check ('Issue 37')	# Python integer division not translated correctly
	autoTester.check (15 // 7)
	
	autoTester.check ('Issue 40')	# Python parentheses dropped during translation
	autoTester.check (65 / (5 * 2))

	autoTester.check ('Issue 50')	# Wrong answer with parentheses moved during translation
	autoTester.check ((240 + 30 - 1) // 30 * 30)
	
	autoTester.check ('Issue 51')	# Wrong answer with set() compare
	a = 1
	b = 1
	autoTester.check (a, b, {a, b} == {1, 2})
	
	autoTester.check ('Issue 52')	# Non keyword 'default' generates javascript SyntaxError
	switch, case, default = 'switch', 'case', 'default'
	autoTester.check (switch, case, default)
	
	autoTester.check ('Issue 54')	# Type dict missing clear(), setdefault()
	aDict = {1: 11, 2: 22, 3: 33}
	autoTester.check (aDict)
	aDict.clear ()
	autoTester.check (aDict)
	
	autoTester.check ('Issue 60')	# Python bool() not translated
	three = 3
	one = three & 1
	seven = three | 4
	eight = one << 3
	four = eight >> 1
	aTrue = bool (three & one)
	aFalse = bool (three & four)
	autoTester.check (3, three, 1, one, 7, seven, 8, eight, 4, four, True, aTrue, False, aFalse)
	
	autoTester.check ('Issue 65')	# Adding two lists with + not supported
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
	
	autoTester.check ('Issue 76')	# Python //= not translated correctly
	initially17 = 17
	autoTester.check (initially17)
	initially17 //= 2
	autoTester.check (initially17)
	initially17 //= 2
	autoTester.check (initially17)
	
	autoTester.check ('Issue 112')	# When using -e6, iterating TypedArrays or other non-list Iterables doesn't work
	try:
		if __envir__.executor_name == __envir__.transpiler_name: # CPython doesn't know Int8Array
			x = __new__ (Int8Array (2))
		else:
			x = [None, None]
		
		x [0] = 3
		x [1] = 2
		for i in x:
			autoTester.check (i)
		
		# Since JavaScript 5 gives no exception for a loop over a non-iterable, following code must only be executed for JavaScript 6
		# Since Transcrypt doesn't get to see all modules loaded by CPython, __ifdef__ cannot be made to do its thing for all modules in an efficient way for CPython
		# But a normal 'if' will work
		if '__esv6__' in __symbols__:
			y = 3
			for j in y:
				autoTester.check (j)
			
	except:	# No 'Exception' can be used behind this, since this is a JavaScript exception, and no subclass of Exception. ??? How desirable is this behaviour?
		pass
		# autoTester.check ('Detected iterating over non-iterable')	# Minifier masks this exception, so we'll have to pass
		
	if '__esv6__' in __symbols__:	# "if" rather than "__pragma__ ('ifdef')" because CPython doesn't understand pragma's
		autoTester.check ('Issue 122')	# Problem with yield (or rather with slicing beyond list end)
		
		def chunks (aList, chunkLength):
			for index in range (0, len (aList), chunkLength):
				yield aList [index : index + chunkLength]

		for chunk in chunks ([chr (index + 97) for index in range (26)], 10):
			autoTester.check (chunk)

	autoTester.check ('Issue 123')	# Python % shouldn't behave like JS %
	autoTester.check (10 % 3, 10 % -3, -10 % 3, -10 % -3, 10 % 10, 10 % -10, -10 % 10, -10 % -10)
	
	autoTester.check ('Issue 125')	# Strings not iterable
	abc = 'abc'
	
	for index in abc:
		autoTester.check (abc)
		
	autoTester.check ('Issue 127')	# Can't use the key 'keys' in a dict
	autoTester.check ({"include_docs": "true", "keys": ["key1", "key2"], "limit": 50})
	
	autoTester.check ('Issue 134')	# Operator %= translated incorrectly
	x0, x1, x2, x3, x4, x5 = 5, 12, -5, -5, 0, 0
	x0 %= 10; x1 %= 5; x2 %= 2; x3 %= -3; x4 %= 1; x5 %= -1000 
	autoTester.check (x0, x1, x2, x3, x4)
	
	autoTester.check ('Issue 136')	# Method dict.get(key[, default]) not implemented
	aDict = {'a': 'ape', 'b': 'banana'}
	autoTester.check (aDict.get ('a', 'noApe'), aDict.get ('b'), aDict.get ('c', 'noCarot'), aDict.get ('d'))
	