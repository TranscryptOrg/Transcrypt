import div_issues.issue559.mylib as mylib

'''
There are two ways to make a module re-export everything imported:

1. Name it __init__.py
2. Compile the whole application that it's part of, with the -xr / --xreex switch

In this case, mylib deliberately has been given the role of the module with the reexporting __init__.py,
although this file has the same name and does the same thing.
'''

def run559 (autoTester):
    mylib.mylibHello (autoTester)
    cl = mylib.mylibClass (autoTester)
    cl.checkSymbols ()
    
    