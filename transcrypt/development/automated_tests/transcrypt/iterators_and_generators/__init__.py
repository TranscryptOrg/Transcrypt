class Iterable:
	def __init__ (self, i):
		self.aList = range (0, 50, i)

	def __iter__ (self):
		return Iterator (self) 
		
class Iterator:
	def __init__ (self, iterable):
		self.iterable = iterable
		self.index = -1
		
	def __next__ (self):	# Should be auto-wrapped in a next (self) by the compiler 
		self.index += 1
		
		if self.index > 5:
			raise StopIteration ()
			
		return self.iterable.aList [self.index]
		
	def __iter__ (self):
		return self
		
def generator (i):
    for i in range (5):
        yield 2 * i

def run (autoTester):
	exhaustableGenExp = (a * a * a for a in [10, 20, 30])	# Currently still converted to iterator on list comprehension	

	iterables = [Iterable (7), generator (5), [i * 3 for i in range (5)], exhaustableGenExp]

	for iterable in iterables:
		autoTester.check ('***')
		
		autoTester.check ('*')
		iterator = iter (iterable)
		try:
			while True:
				autoTester.check (next (iterator))
		except:
			pass
		
		autoTester.check ('*')
		for n in iterable:	# The exhaustableGenExp will be exhausted, since it is an iterator, not a list
			autoTester.check (n)
			