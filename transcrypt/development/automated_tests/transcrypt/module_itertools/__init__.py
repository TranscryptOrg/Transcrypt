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
		
	autoTester.check ('starmap', [int (x) for x in starmap (pow, [(2, 5), (3, 2), (10, 3)])])
	