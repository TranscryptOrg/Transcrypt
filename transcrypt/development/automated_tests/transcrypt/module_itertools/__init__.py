from itertools import *

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
		autoTester.check ('chain', list (chain (fibonacci (), squares, chars)))
		