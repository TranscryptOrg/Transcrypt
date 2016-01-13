from org.transcrypt.stubs.browser import *

aList = [1, 2, 3, 'sun', 'moon', 'stars']
print (aList)
print (aList [2:4:1])
print (aList [:])
print (aList [2:])
print (len (aList))
aList.append ('milkyway')
print (aList)
aList.extend (['m1', 'm31'])
print (aList)

anotherList = list (('a', 'b', 'c'))
print (anotherList)

aDict = {1: 'plant', 'animal': 2}
print (aDict)
print (aDict [1], aDict ['animal'])

aTuple = (1, 2, 3, 4, 5)
print (aTuple)
print (len (aTuple))

anotherTuple = (1,)
print (anotherTuple)

aSet = {1, 2, 2, 3}
console.log (aSet)
print (len (aSet))

anotherSet = set ((4, 5, 5, 6))
console.log (anotherSet)

emptySet = set ()
console.log (emptySet)
print (len (emptySet))

