def run (autoTester):
	aList = [1, 2, 3, 'moon', 'stars']
	autoTester.check (aList)
	aList.insert (3, 'sun')
	autoTester.check (aList)
	autoTester.check (aList [2:4:1])
	autoTester.check (aList [:])
	autoTester.check (aList [2:])
	autoTester.check (len (aList))
	aList.append ('milkyway')
	autoTester.check (aList)
	aList.extend (['m1', 'm31'])
	autoTester.check (aList)

	anotherList = list (('a', 'b', 'c'))
	autoTester.check (anotherList)
	autoTester.check ('b' in anotherList)
	autoTester.check ('d' in anotherList)
	
	aDict = {1: 'plant', 'animal': 2}
	autoTester.check (aDict)
	autoTester.check (aDict [1], aDict ['animal'])
	
	def p ():
		return 3
		
	q = 4
	
	autoTester.check ({p (): 'three', q: 'four'})
	
	aTuple = (1, 2, 3, 4, 5)
	autoTester.check(aTuple)
	autoTester.check (len (aTuple))

	anotherTuple = (1,)
	autoTester.check (anotherTuple)

	aSet = {1, 2, 2, 3}
	autoTester.check	(aSet)
	autoTester.check (len (aSet))
	autoTester.check (2 in aSet)
	autoTester.check (4 in aSet)

	anotherSet = set ((4, 5, 5, 6))
	autoTester.check (anotherSet)

	emptySet = set ()
	autoTester.check (emptySet)
	autoTester.check (len (emptySet))
	
	aString = 'c_cis_d_dis_e_f_fis_g_gis_a_ais_b_c'
	autoTester.check ('cis' in aString)
	autoTester.check ('g' in aString)
	autoTester.check ('bes'  in aString)
	autoTester.check ('z' in aString)
	