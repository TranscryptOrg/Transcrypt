def run (autoTester):
	even = {2 * i for i in [0, 9, 1, 7, 2, 8, 3, 6, 4, 5]}
	autoTester.check (even)
	
	odd = {2 * i + 1 for i in [5, 6, 7, 8, 9, 4, 3, 1, 2, 0]}
	autoTester.check (odd)
	
	even.add (12)
	even.add (12)
	autoTester.check (even)
	
	even.discard (12)
	even.discard (12)
	autoTester.check (even)
	
	uni = even.union (odd)
	autoTester.check (uni)
	
	autoTester.check (odd.isdisjoint (even))
	autoTester.check (uni.isdisjoint (even))
		
	autoTester.check (even.issuperset (uni))
	autoTester.check (uni.issuperset (even))
	
	autoTester.check (even.issubset (uni))
	autoTester.check (uni.issubset (even))
	
	first = {4, 1, 0, 5, 3, 2, 6}
	autoTester.check (first)
	
	second = {3, 5, 6, 9, 4, 7, 8}
	autoTester.check (second)
	
	inter = first.intersection (second)
	autoTester.check (inter)
	
	diff = first.difference (second)
	autoTester.check (diff)
	
	symDiff = first.symmetric_difference (second)
	autoTester.check (symDiff)
	
	aSet = {200, 4, 5, 100}
	aSet.update (first, symDiff, second)
	autoTester.check (aSet)
	