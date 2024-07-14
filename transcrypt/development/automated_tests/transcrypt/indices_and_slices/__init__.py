def run (autoTester):
    # Right hand side slices
    all = range (32)
    autoTester.check (all)
    
    autoTester.check (all [8 : 24])
    autoTester.check (all [8 : 24 : 2]) 
    
    # Left hand side slices
    aList = [3, 4, 7, 8]
    autoTester.check (aList)
    
    aList [4 : 4] = [9, 10]
    autoTester.check (aList)
    
    aList [2 : 2] = [5, 6]
    autoTester.check (aList)
    
    aList [0 : 0] = [1, 2]
    autoTester.check (aList)
    
    aList [ : : 2] = [x + 0.001 for x in range (10) if x % 2]
    autoTester.check (aList)

    aList = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
    autoTester.check(aList)
    autoTester.check(aList[:])
    autoTester.check(aList[::-1])
    autoTester.check(aList[-1:-8:-1])
    autoTester.check(aList[::2])
    autoTester.check(aList[::-2])
    autoTester.check(aList[:4:1])
    autoTester.check(aList[:4:-1])
    autoTester.check(aList[4:])
    autoTester.check(aList[4::])
    autoTester.check(aList[4::1])
    autoTester.check(aList[4::-1])
    autoTester.check(aList[1:4])
    autoTester.check(aList[1:4:1])
    autoTester.check(aList[1:4:2])
    autoTester.check(aList[1:4:-2])
    autoTester.check(aList[4:1:-2])
    autoTester.check(aList[4:1])
    autoTester.check(aList[-1:-4])
    autoTester.check(aList[-4:-1])
    autoTester.check(aList[-4:-1:2])
    autoTester.check(aList[-4:-1:-2])
    autoTester.check(aList[9:-9:1])
    autoTester.check(aList[-9:9:1])
    autoTester.check(aList[9:-9:-1])
    autoTester.check(aList[-9:9:-1])

