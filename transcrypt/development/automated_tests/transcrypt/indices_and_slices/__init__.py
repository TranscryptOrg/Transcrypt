from org.transcrypt.stubs.browser import __pragma__
from copy import copy

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

    allLists = [[], ['a', 'b', 'c', 'd', 'e', 'f', 'g'], ['a', 'b', 'c', 'd'], 'abcdefg', 'abc']
    for aList in allLists:
        autoTester.check(aList)
        autoTester.check(aList[:])
        autoTester.check(aList[None:None])
        autoTester.check(aList[::])
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
        autoTester.check(aList[-9:9:-1])
        autoTester.check('zero step slice', autoTester.expectException(lambda: print(aList[::0])))


    sample_list = ['a', 'b', 'c', 'd', 'e', 'f', 'g']

    autoTester.check("old:", sample_list)
    new1 = sample_list.copy()
    autoTester.check("new1:", new1)
    new2 = sample_list[:]
    autoTester.check("new2:", new2)
    new3 = list(sample_list)
    autoTester.check("new3:", new3)
    # new4 = [*sample_list]  # Does not work properly
    # autoTester.check("new4:", new4)
    new1[1] = 'x'
    new2[2] = 'y'
    new3[3] = 'z'
    autoTester.check("updated:", sample_list, new1, new2, new3)

    aList = copy(sample_list)
    aList[1:3] = ['x', 'y', 'z']
    autoTester.check(aList)

    aList = copy(sample_list)
    aList[1:1] = ['x', 'y', 'z']
    autoTester.check(aList)

    aList = copy(sample_list)
    aList[:] = ['x', 'y', 'z']
    autoTester.check(aList)

    aList = copy(sample_list)
    aList[1:5] = ['x', 'y', 'z']
    autoTester.check(aList)

    aList = copy(sample_list)
    aList[1:5] = 'xyz'
    autoTester.check(aList)

    aList = copy(sample_list)
    aList[0:5:2] = ['x', 'y', 'z']
    autoTester.check(aList)

    aList = copy(sample_list)
    def aTest1(test_list):
        test_list[1:5:2] = ['x', 'y', 'z']  # ValueError: attempt to assign sequence of size 3 to extended slice of size 2
    autoTester.check('Invalid slice assignment', autoTester.expectException(lambda: aTest1(aList)))

    aList = copy(sample_list)
    aList[5:2:-1] = ['x', 'y', 'z']
    autoTester.check(aList)

    aList = copy(sample_list)
    aList[5:0:-2] = ['x', 'y', 'z']
    autoTester.check(aList)

    aList = copy(sample_list)
    aList[1:5] = []
    autoTester.check(aList)

    aList = copy(sample_list)
    aList[1:5:1] = []
    autoTester.check(aList)

    aList = copy(sample_list)
    def aTest3(test_list):
        test_list[5:1:-1] = []  # ValueError: attempt to assign sequence of size 0 to extended slice of size 4
    autoTester.check('Invalid slice assignment', autoTester.expectException(lambda: aTest3(aList)))

    aList = copy(sample_list)
    def aTest4(test_list):
        test_list[5:1:-1] = ['x', 'y', 'z']  # ValueError: attempt to assign sequence of size 3 to extended slice of size 4
    autoTester.check('Invalid slice assignment', autoTester.expectException(lambda: aTest4(aList)))

    aList = copy(sample_list)
    aList[1:5:-1] = []
    autoTester.check(aList)

    aList = copy(sample_list)
    def aTest2(test_list):
        test_list[0:5:-1] = ['x', 'y', 'z']  # ValueError: attempt to assign sequence of size 3 to extended slice of size 0
    autoTester.check('Invalid slice assignment', autoTester.expectException(lambda: aTest2(aList)))

    aList = copy(sample_list)
    aList[0:7:3] = ['x', 'y', 'z']
    autoTester.check(aList)

    aList = copy(sample_list)
    def aTest5(test_list):
        test_list[1:7:3] = ['x', 'y', 'z']  # ValueError: attempt to assign sequence of size 3 to extended slice of size 2
    autoTester.check('Invalid slice assignment', autoTester.expectException(lambda: aTest5(aList)))

    aList = copy(sample_list)
    def aTest6(test_list):
        test_list[7:0:-3] = ['x', 'y', 'z']  # ValueError: attempt to assign sequence of size 3 to extended slice of size 2
    autoTester.check('Invalid slice assignment', autoTester.expectException(lambda: aTest6(aList)))

    aList = copy(sample_list)
    aList[7:0:-3] = ['x', 'y']
    autoTester.check(aList)

    aList = copy(sample_list)
    def aTest7(test_list):
        test_list[7:0:0] = ['x', 'y', 'z']  # ValueError: slice step cannot be zero
    autoTester.check('zero step slice', autoTester.expectException(lambda: aTest7(aList)))

    aList = ['a', 'b', 'c']
    aList.remove('b')
    autoTester.check(aList)
    aList.remove('a')
    autoTester.check(aList)
    autoTester.check('not in list', autoTester.expectException(lambda: aList.remove('d')))
    autoTester.check(aList)
    aList.remove('c')
    autoTester.check(aList)
    autoTester.check('not in list', autoTester.expectException(lambda: aList.remove('c')))
    autoTester.check(aList)

    aList = ['a', 'b', 'c', 'd', 'e', 'f']
    aList.pop(2)
    autoTester.check(aList)
    aList.pop(0)
    autoTester.check(aList)
    aList.pop(-3)
    autoTester.check(aList)
    aList.pop(-1)
    autoTester.check(aList)
    autoTester.check('out of range', autoTester.expectException(lambda: aList.pop(-3)))
    autoTester.check('out of range', autoTester.expectException(lambda: aList.pop(3)))
    aList.pop()
    autoTester.check(aList)
    aList.pop()
    autoTester.check(aList)
    autoTester.check('empty list', autoTester.expectException(lambda: aList.pop()))

    # Check pop of empty list (issue 854)
    autoTester.check('empty list', autoTester.expectException(lambda: aList.pop(-1)))
    autoTester.check('empty list', autoTester.expectException(lambda: aList.pop(0)))
    autoTester.check('empty list', autoTester.expectException(lambda: aList.pop(1)))

    # Check for invalid list index (issue 637)
    allLists = [['a', 'b', 'c'], 'abc']
    for aList in allLists:
        __pragma__('opov')
        autoTester.check('valid index', autoTester.expectException(lambda: aList[1]))
        autoTester.check(aList[1])
        autoTester.check('valid index', autoTester.expectException(lambda: aList[-2]))
        autoTester.check(aList[-2])
        autoTester.check('invalid index', autoTester.expectException(lambda: aList[3]))
        autoTester.check('invalid index', autoTester.expectException(lambda: aList[-4]))
        __pragma__('noopov')
        autoTester.check(aList[1])
        # autoTester.check('invalid index', autoTester.expectException(lambda: aList[-4]))  # test differs from CPython without opov

