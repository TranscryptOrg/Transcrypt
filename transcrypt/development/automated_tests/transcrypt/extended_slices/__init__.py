from org.transcrypt.stubs.browser import *
from org.transcrypt.stubs.browser import __pragma__, __envir__

def indices (key):
    if __envir__.executor_name == __envir__.transpiler_name:
        return tuple (key) if type (key) == list else key
    else:
        try:
            return key.indices (1000000000)
        except:
            try:
                return tuple ([indices (subkey) for subkey in key])
            except:
                return key

class Test:
    def __init__ (self, autoTester):
        self.autoTester = autoTester

    def __getitem__ (self, key):
        self.autoTester.check ('getitem (', indices (key), ')')
        return 1234567
        
    def __setitem__ (self, key, value):
        self.autoTester.check ('setitem (', indices (key), ')', value)

def run (autoTester):
    a = b = c = d = e = f = g = h = i = j = k = l = Test (autoTester)

    __pragma__ ('opov')
            
    a [1:2:3, 4:5:6] = b [7:8:9]
    c [1:2:3] = d [4:5:6, 7:8:9]
    e [1, 1:2:3, 3] = f [4, 4:5:6, 6]
    g [1, 2, 3] = h [1, 2, 3]
    i [1] = j [1]
    k [1:2:3] = l [1:2:3]
