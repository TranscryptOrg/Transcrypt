from itertools import *
from math import pow

def fibonacci():
	a, b = 0, 1
	for i in range (10):
		yield a
		a, b = b, a + b

squares = [i * i for i in range (10)]

chars = 'thequickbrownfoxjumpsoverthelazydog'
		
def run (autoTester):
	autoTester.check ('islice count', list (islice (count (10, 2), 4, 40, 3)))
	autoTester.check ('islice cycle', list (islice (cycle (fibonacci ()), 15)))
	autoTester.check ('repeat', list (repeat (3.14, 15)))
	autoTester.check ('islice repeat', list (islice (repeat (2.74), 15)))
	autoTester.check ('accumulate', list (accumulate (range (5))))

	def add (total, element):
		return total + element
	
	autoTester.check ('accumulate', list (accumulate (['alamak', 'mirach', 'sirrah'], add)))
	
	autoTester.check ('chain', list (chain (fibonacci (), squares, chars)))
	autoTester.check ('chain.from_iterable', list (chain.from_iterable (['ape', 'node', 'mice', 'vim', 'sus', 'jet'])))
	
	selectors = [True, True, False, True, False, False, True, True, False, True]
	
	autoTester.check ('compress', list (compress (
		['{}{}'.format (('take' if selector else 'leave'), index) for index, selector in enumerate (selectors)],
		selectors
	)))
	
	autoTester.check ('dropwhile', list (dropwhile (lambda x: x < 5, [1, 4, 6, 4, 1])))
	autoTester.check ('filterfalse', list (filterfalse (lambda x: x % 2, range (10))))
	
	things = [('animal', 'bear'), ('animal', 'duck'), ('plant', 'cactus'), ('vehicle', 'speed boat'), ('vehicle', 'school bus')]

	for key, group in groupby (things, lambda x: x [0]):
		for thing in group:
			autoTester.check ('A {} is a {}.' .format (thing[1], key))
		autoTester.check (' ')
		
	autoTester.check ('islice', list (islice ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2, 9, 2)))
		
	autoTester.check ('starmap', [int (x) for x in starmap (pow, [(2, 5), (3, 2), (10, 3)])])
	autoTester.check ('takewhile', list (takewhile (lambda x: x < 5, [1, 4, 6, 4, 1])))
	
	i1, i2 = tee (islice (count (), 5))
	autoTester.check ('tee', list (i1), list (i1), list (i2))
	
	autoTester.check ('product', list (product ('ABCD', 'xy')), list (product (range (2), repeat = 3)))

	autoTester.check ('permutations', list (permutations ('ABCD')), list (permutations ('ABCD', 2)))
	
	autoTester.check ('combinations',
		list (combinations ('ABCD', 2)),
		list (combinations ([1, 2, 3, 4, 5], 3)),
		list (combinations (islice (count (), 6), 4))
	)
	
	autoTester.check ('combinations_with_replacement',
		list (combinations_with_replacement ('ABCD', 2)),
		list (combinations_with_replacement ([1, 2, 3, 4, 5], 3)),
		list (combinations_with_replacement (islice (count (), 6), 4))
	)
	