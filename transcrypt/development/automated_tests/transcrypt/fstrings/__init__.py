import math

def run (autoTester):
    aDict = {'one': 1}
    aSet = {'rose'}
    anArray = ['hundred', 100, 'pi', 3.14, 'e', 2.74, 'dozen', 12]
    anInt = 144
    aFloat = 3.14
    
    autoTester.check (aDict)
    autoTester.check (str (aDict))
    autoTester.check (repr (aDict))
    autoTester.check ('aDictionary: ({}, {})' .format (aDict, aDict ["one"]))
    autoTester.check (f'aDictionary: ({aDict}, {aDict ["one"]})')
    autoTester.check (f'aSet: ({aSet}, {"rose" in aSet})')
    autoTester.check (f'anArray ({anArray}, {anArray [1:4]}, {anArray [5]})')
    autoTester.check (f'anInt ({anInt}, {int (math.sqrt (anInt))})')
    autoTester.check (f'aFloat ({aFloat}, {round (math.sin (aFloat + 2.74), 2)})')
    