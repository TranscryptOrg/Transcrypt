def run (autoTester):
	aList = [1, 2, 3, 'sun', 'moon', 'stars']
	autoTester.store (aList)
	autoTester.store (aList [2:4:1])
	autoTester.store (aList [:])
	autoTester.store (aList [2:])
	autoTester.store (len (aList))
	aList.append ('milkyway')
	autoTester.store (aList)
	aList.extend (['m1', 'm31'])
	autoTester.store (aList)

	anotherList = list (('a', 'b', 'c'))
	autoTester.store (anotherList)

	aDict = {1: 'plant', 'animal': 2}
	autoTester.store (aDict)
	autoTester.store (aDict [1], aDict ['animal'])

	aTuple = (1, 2, 3, 4, 5)
	autoTester.store(aTuple)
	autoTester.store (len (aTuple))

	anotherTuple = (1,)
	autoTester.store (anotherTuple)

	aSet = {1, 2, 2, 3}
	autoTester.store	(aSet)
	autoTester.store (len (aSet))

	anotherSet = set ((4, 5, 5, 6))
	autoTester.store (anotherSet)

	emptySet = set ()
	autoTester.store (emptySet)
	autoTester.store (len (emptySet))
