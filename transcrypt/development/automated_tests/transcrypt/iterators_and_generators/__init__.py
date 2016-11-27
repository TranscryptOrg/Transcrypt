from org.transcrypt.stubs.browser import __pragma__

class Iterable:
    def __init__ (self, i):
        self.aList = range (0, 50, i)

    def __iter__ (self):
        return Iterator (self) 
        
class Iterator:
    def __init__ (self, iterable):
        self.iterable = iterable
        self.index = -1
        
    def __next__ (self):    # Should be auto-wrapped in a next (self) by the compiler 
        self.index += 1
        
        if self.index > 5:
            raise StopIteration ()
            
        return self.iterable.aList [self.index]
            
    def __iter__ (self):
        return self
        
def exhaustableGenerator (i):
    for i in range (5):
        yield 2 * i

def run (autoTester):
    exhaustableGenExp = (a * a * a for a in [10, 20, 30])   # Currently still converted to iterator on list comprehension, must also be iterable
    # So becomes py_iter (aList).
    # List already has an __iter__ which it will return, it's a __PyIterator__
    # To that __PyIterator__, that will already have a __next__, py_iter first adds a next
    # So exhaustableGenExp is an iterator with a next and a __next__
    # If we call iter on that, py_iter is calle again py_iter, on an object with a next and a next __next__
    # For this reason py_iter needs a recursion prevention check

    iterables = [Iterable (7), exhaustableGenerator (5), [i * 3 for i in range (5)], exhaustableGenExp]

    for iterable in iterables:  
        autoTester.check ('[1]')
        iterator = iter (iterable)
        try:
            while True:
                autoTester.check (next (iterator))
        except Exception as exception:
            autoTester.check (exception.__class__.__name__)

        autoTester.check ('[2]')
        iterator = iter (iterable)
        try:
            while True:
                autoTester.check (next (iterator))
        except Exception as exception:
            autoTester.check (exception.__class__.__name__)
            
    for iterable in iterables:
        autoTester.check ('[3]')
        for n in iterable:
            autoTester.check (n)
            
        autoTester.check ('[4]')
        for n in iterable:
            autoTester.check (n)
            
    # BEGIN issue 196: for loop over iter (), runs OK but needs JavaScript 6. This should be clearly in the docs.
            
    a = 0
    vals = [1,2,3]
    ret = iter (vals)
    for m in ret:
        a += m
    autoTester.check (a)
     
    # END issue 196
                
    # BEGIN 1st example with 'send'
        
    __pragma__ ('gsend')

    def test0 ():
        r = 0
        while True:
            r = r + (yield r)

    gen0 = test0()
    next (gen0)
    autoTester.check (gen0.send (1))
    autoTester.check (gen0.send (2))

    def test1 ():
        r = 0
        while True:
            r = (yield r) + r

    gen1 = test1()
    next (gen1)
    autoTester.check (gen1.send (3))
    autoTester.check (gen1.send (4))
    
    # END 1st example with 'send'
    
    def subGenerator ():
        yield 27
        yield 37
        yield 47
    
    
    def mainGenerator ():
        yield 17
        yield from subGenerator ()
        yield 57
        
    autoTester.check (* [i for i in mainGenerator ()])
    
    def subCoroutine ():
        autoTester.check (38)
        yield
        autoTester.check (48)
        yield
        autoTester.check (58)
        yield
        autoTester.check (68)
    
    
    def mainCoroutine ():
        autoTester.check (18)
        yield
        autoTester.check (28)
        yield from subCoroutine ()
        autoTester.check (78)
        yield
        autoTester.check (88)
        
    m = mainCoroutine ()
    for i in range (5):
        m.send (None)
        