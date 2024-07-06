from org.transcrypt.stubs.browser import __pragma__, __new__, __envir__, __symbols__

from div_issues.issue55 import *        # Names not exported from package's __init__.py, no output, only compilation check
from div_issues.issue387 import run387  # Support __module__ and __qualname__ for introspection (only __module__ done and
                                        # __name__ set to '__main__ for main module'
from div_issues.issue559 import run559  # Imported names not reexported form the __init__.py of a module

import re
                           
def run (autoTester):
    autoTester.check ('Issue 24')   # Non keyword switch generates javascript SyntaxError
    switch = False
    autoTester.check (switch)
    
    autoTester.check ('Issue 27')   # Python list.index () not translated correctly
    autoTester.check (['zero', 'one', 'two', 'three', 'four'] .index ('three'))
    
    autoTester.check ('Issue 36')   # Bug in compiling lambda default argument values
    # Workaround for Python closures capturing variables rather than values
    # An extra enclosing scope is created to remember the value of the variable
    results = []
    for i in range (10):
        # results.append (lambda: i)                # Works nowhere
        # results.append (lambda j = i: j)          # Works only in Python
        results.append ((lambda j: lambda: j) (i))  # Works in Python and Transcrypt
    autoTester.check ([result () for result in results])        

    autoTester.check ('Issue 37')   # Python integer division not translated correctly
    autoTester.check (15 // 7)
    
    autoTester.check ('Issue 40')   # Python parentheses dropped during translation
    autoTester.check (65 / (5 * 2))

    autoTester.check ('Issue 50')   # Wrong answer with parentheses moved during translation
    autoTester.check ((240 + 30 - 1) // 30 * 30)
    
    autoTester.check ('Issue 51')   # Wrong answer with set() compare
    a = 1
    b = 1
    autoTester.check (a, b, {a, b} == {1, 2})
    
    autoTester.check ('Issue 52')   # Non keyword 'default' generates javascript SyntaxError
    switch, case, default = 'switch', 'case', 'default'
    autoTester.check (switch, case, default)
    
    autoTester.check ('Issue 54')   # Type dict missing clear(), setdefault()
    aDict = {1: 11, 2: 22, 3: 33}
    autoTester.check (aDict)
    aDict.clear ()
    autoTester.check (aDict)
    
    autoTester.check ('Issue 60')   # Python bool() not translated
    three = 3
    one = three & 1
    seven = three | 4
    eight = one << 3
    four = eight >> 1
    aTrue = bool (three & one)
    aFalse = bool (three & four)
    autoTester.check (3, three, 1, one, 7, seven, 8, eight, 4, four, True, aTrue, False, aFalse)
    
    autoTester.check ('Issue 65')   # Adding two lists with + not supported
    __pragma__ ('opov')
    aList = [4, 5, 6]
    autoTester.check ([1, 2, 3,] + aList + [4, 5, 6])
    autoTester.check (3 * [1, 2, 3])
    autoTester.check ([1, 2, 3] * 3)
    aString = 'Crocodile'
    autoTester.check ('Tiger' + aString + 'Elephant')
    autoTester.check (3 * aString)
    autoTester.check (aString * 3)
    __pragma__ ('noopov')
    
    autoTester.check ('Issue 76')   # Python //= not translated correctly
    initially17 = 17
    autoTester.check (initially17)
    initially17 //= 2
    autoTester.check (initially17)
    initially17 //= 2
    autoTester.check (initially17)
    
    autoTester.check ('Issue 112')  # When using -e6, iterating TypedArrays or other non-list Iterables doesn't work
    try:
        if __envir__.executor_name == __envir__.transpiler_name: # CPython doesn't know Int8Array
            x = __new__ (Int8Array (2))
        else:
            x = [None, None]
        
        x [0] = 3
        x [1] = 2
        for i in x:
            autoTester.check (i)
        
        y = 3
        for j in y:
            autoTester.check (j)
            
    except: # No 'Exception' can be used behind this, since this is a JavaScript exception, and no subclass of Exception. ??? How desirable is this behaviour?
        pass
        # autoTester.check ('Detected iterating over non-iterable') # Minifier masks this exception, so we'll have to pass
        
    autoTester.check ('Issue 122')  # Problem with yield (or rather with slicing beyond list end)
    
    def chunks (aList, chunkLength):
        for index in range (0, len (aList), chunkLength):
            yield aList [index : index + chunkLength]

    for chunk in chunks ([chr (index + 97) for index in range (26)], 10):
        autoTester.check (chunk)

    autoTester.check ('Issue 123')  # Python % shouldn't behave like JS %
    autoTester.check (10 % 3, 10 % -3, -10 % 3, -10 % -3, 10 % 10, 10 % -10, -10 % 10, -10 % -10)
    
    autoTester.check ('Issue 125')  # Strings not iterable
    abc = 'abc'
    
    for index in abc:
        autoTester.check (abc)
        
    autoTester.check ('Issue 127')  # Can't use the key 'keys' in a dict
    autoTester.check ({"include_docs": "true", "keys": ["key1", "key2"], "limit": 50})
    
    autoTester.check ('Issue 134')  # Operator %= translated incorrectly
    x0, x1, x2, x3, x4, x5 = 5, 12, -5, -5, 0, 0
    x0 %= 10; x1 %= 5; x2 %= 2; x3 %= -3; x4 %= 1; x5 %= -1000 
    autoTester.check (x0, x1, x2, x3, x4)
    
    autoTester.check ('Issue 136')  # Method dict.get(key[, default]) not implemented
    aDict = {'a': 'ape', 'b': 'banana'}
    autoTester.check (aDict.get ('a', 'noApe'), aDict.get ('b'), aDict.get ('c', 'noCarot'), aDict.get ('d'))
    
    autoTester.check ('Issue 144')
    __pragma__('opov')
    aList = [x for x in [1, 2, 3]]
    autoTester.check (aList)
    __pragma__('noopov')    
    
    autoTester.check ('<br><br>Issue 145<br>')  # List sorting incorrect in case of multiple columns
    
    class SortTest:
        def __init__ (self):
            self.alphabet = 'abcdefghijklmnopqrstuvwxyz'
            self.nChars = 10
            self.nCols = 10
            self.nRows = 30
            
            self.pseudoRandom = 0
            
            def randomWord ():
                word = ''
                for iChar in range (self.nChars):
                    self.pseudoRandom = (81212 * self.pseudoRandom + 28411) % 134456
#                   self.pseudoRandom = (1234 * self.pseudoRandom + 57) % 137           # Deliberately short period
                    word += self.alphabet [self.pseudoRandom % 26]
                return word 
        
            self.rows = [[randomWord () for iCol in range (self.nCols)] for iRow in range (self.nRows)]
                
        def sort (self):
            for iCol in reversed (range (self.nCols)):
                self.rows.sort (key = lambda row: row [iCol])
            
    sortTest = SortTest ()
    
    autoTester.check ('<br>Unsorted:<br>')
    for row in sortTest.rows:
        autoTester.check ('{}<br>'.format (','.join ([word for word in row])))
        
    sortTest.sort ()
    
    autoTester.check ('<br>Sorted:<br>')
    for row in sortTest.rows:
        autoTester.check ('{}<br>'.format (','.join ([word for word in row])))
        
    autoTester.check ('<br><br>Issue 148<br>')  # Allow key a.o. key 'items' in dict
    
    aDict = {
        'items': [4, 5, 6]
    }

    for aKey, aValue in aDict.items ():
        autoTester.check ('{}: {}'.format (aKey, aValue))   
        
    autoTester.check ('<br><br>Issue 169<br>')  # Add support for float('inf') and float('-inf')
    
    autoTester.check (int (1 / float ('inf')), int (1 / float ('-inf')))
    
    autoTester.check ('<br><br>Issue 178<br>')  # List Comprehensions / Operator Precedence Bug
    
    bitmaps = [
        (2 , ''),
        (4 , ''),
        (8, 'i'),
        (16, 'm'),
        (32, 'y'),
        (64, 'u'),
        (128, 'g')
    ]
    
    for flags in (122, 233, 11, 55, 79, 201, 23, 111, 200, 100, 50, 25, 12, 6):
        autoTester.check  (''.join ([x [1] for x in bitmaps if (x [0] & flags) > 0]))
        
    def issue256 ():
        autoTester.check ('Issue 256')

        class C:
            def __init__ (self, value):
                self.value = value

        def f1 (value):  # Generate parens after return
            return (C (value) .value or 'second') .capitalize () == 'First'
            
        def f2 (value):  # Generate parens after return
            return (C (value) .value or 'second') .capitalize () == 'Second'
            
        def f3 (value):  # Generate NO parens after return
            return C (value) .value or 'second'
            
        def f4 (value):  # Generate NO parens after return
            return (C (value) .value or 'second')
                
        autoTester.check (f1 ('first'))
        autoTester.check (f1 (''))
        autoTester.check (f2 ('first'))
        autoTester.check (f2 (''))
        autoTester.check (f3 ('first'))
        autoTester.check (f4 (''))
        
    issue256 ()
    
    autoTester.check ('Issue 274')
    a = 3
    del a
    autoTester.check ('Still alive')

    autoTester.check ('Issue 276')  # Partial, other part tested in testlet 'operator_overloading'
    a = 2
    b = a ** 3
    a **= 4
    autoTester.check (a, b)
        
    autoTester.check ('Issue 277')
    new = 3
    autoTester.check (new)
    
    autoTester.check ('Issue 279')
    class A:
        TypeError = 111
        js_TypeError = 222
    autoTester.check (A.TypeError, A.js_TypeError)  # ... Generated code should use py_TypeError and TypeError respectively    
    autoTester.check ('Still alive')
    
    autoTester.check ('Issue 301')
    def filter_word (word0, word1):
        if len (word0) != len (word1):
            return False
        for char0, char1 in zip (word0, word1):
            if char0 != '_' and char0 != char1:
                return False
        return True
    autoTester.check (filter_word ('bee', 'beer'))
    autoTester.check (filter_word ('wine', 'wine'))
    autoTester.check (filter_word ('win_', 'wind'))
    autoTester.check (filter_word ('_in_', 'kind'))
    autoTester.check (filter_word ('min_', 'kind'))

    autoTester.check ('Issue 314')
    try:
        autoTester.check (int (float (123)))
    except:
        autoTester.check ('a')
        
    try:
        autoTester.check (float (12.3))
    except:
        autoTester.check ('b')
        
    try:
        autoTester.check (int (float ('123')))
    except:
        autoTester.check ('c')
        
    try:
        autoTester.check (int (float (' 123')))
    except:
        autoTester.check ('d')
                        
    try:
        autoTester.check (float (''))
    except:
        autoTester.check ('e')
        
    try:
        autoTester.check (float (' '))
    except:
        autoTester.check ('f')
    try:
        autoTester.check (float ('drie'))
    except:
        autoTester.check ('g')
        
    autoTester.check ('Issue 316')
    
    autoTester.check (list (filter (None, [[1, 2], [3], [], [4, 5], [6]])))
    autoTester.check (list (filter (lambda l: len (l) >= 2, [[1, 2], [3], [], [4, 5], [6]])))
    
    autoTester.check ('Issue 317')

    mylist = []
    try:
        mylist.remove ('value')
    except ValueError as exception:
        autoTester.check (exception.__class__.__name__)
        
    autoTester.check ('Issue 331')
    
    autoTester.check (max (-5, 4, 1, 2, -3, 2))
    autoTester.check (max ([-5, 4, 1, 2, -3, 2]))
    autoTester.check (max ((5, 6, 2, -2, -4)))

    autoTester.check (min (-5, 4, 1, 2, -3, 2))
    autoTester.check (min ([-5, 4, 1, 2, -3, 2]))
    autoTester.check (min ((5, 6, 2, -2, -4)))
    
    autoTester.check ('issue 356')
    
    try:
        raise TypeError("How are you?")
    except TypeError as exception:
        autoTester.check (exception)
        
    autoTester.check ('Issue 369')
    
    class Vector:
        def __init__ (self, *values):
            self.values = values

        def __iter__ (self):
            for item in self.values:
                yield item

        def __add__(self, other):
            return Vector (* (x + y for x, y in zip (self, other)))
            
        def __str__ (self):
            return str (list (self.values))
        
    #__pragma__ ('opov')

    autoTester.check (str (Vector (1,2,3) + Vector (3,4,5)))

    #__pragma__ ('noopov')

    
    autoTester.check ('Issue 387')
    run387 (autoTester)
    
    autoTester.check ('Issue 391')
    autoTester.check (int (False))
    autoTester.check (int (True))
    autoTester.check (int (1 == 2))
    autoTester.check (int (1 != 2))
    
    autoTester.check ('Issue 392')

    class Example:

        d = {'A': 1, 'B': 2}
        rec = re.compile ('(?P<decimal>\d+)', re.ASCII)

        def run(self):
            match = self.rec.match ('42')
            if not match:
                print('ERROR: RE does not match')
            e = match.groupdict ()
            autoTester.check ("before: self.d=", self.d)
            autoTester.check ("before: e=", e)
            self.d.update (e)
            autoTester.check ("after: self.d=", self.d)


    example = Example ()
    example.run ()
    
    autoTester.check ('Issue 398')
    # This used to give extra comma's so invalid syntax (no check calls needed)
    
    class Test398 (object):
        #__pragma__ ('skip')
        def method1 (self):
            pass

        def method2 (self):
            pass
        #__pragma__ ('noskip')
        pass
        
    test398 = Test398 ()
        
    autoTester.check ('Issue 399')
    
    __pragma__ ('keycheck')
    try:
        surpressWarning = {'a':5}['a']
        surpressWarning = {'a':5}['b']
        autoTester.check ('no problem')
    except KeyError:
        autoTester.check ('not found')    
    
    autoTester.check ('Issue 413')
    __pragma__ ('nokeycheck')
    
    class Foo:
        def __len__ (self):
            return 3
        
        def __getitem__ (self, i):
            if i >= 3:
                raise IndexError
            return 'This is item ' + str (i)

    foo = Foo ()

    #__pragma__ ('opov')
    autoTester.check ('Attempt 1:')
    for i in foo:
        autoTester.check (i)

    autoTester.check ('Attempt 2:')
    for i in range (len (foo)):
        autoTester.check (foo [i])
    #__pragma__('noopov')
    
    autoTester.check ('Issue 414')
    
    class Foo:
        pass

    foo = Foo ()
    foo.bar = 'baz'
    foo.name = 'hello'
    foo.default = 'world'

    autoTester.check ([x for x in dir (foo) if not x.startswith ('__')])

    #__pragma__('kwargs')
    def foo (*args, **kwargs):
        default = kwargs.get ('default', 'bar')
        return default

    autoTester.check (foo())
    autoTester.check (foo(default = 'Hello World'))
    
    autoTester.check ('Issue 460')
    
    s460 = 'car'
    l460 = [11, 22, 33]
    t460 = (4, 5, 6)
    d460 = {-1: 'mmminusOne', 'b': 'bbbike'}
    
    #__pragma__ ('opov')
    
    l460 [0] = 1
    l460 [-2] = 2
    l460 [-1] = 3
    
    d460 [-1] = 'minusOne'
    d460 ['b'] = 'bike'
    
    autoTester.check (s460 [0], s460 [1], s460 [2], s460 [-1], s460 [-2], s460 [-3])
    autoTester.check (l460 [0], l460 [1], l460 [2], l460 [-1], l460 [-2], l460 [-3])
    autoTester.check (t460 [0], t460 [1], t460 [2], t460 [-1], t460 [-2], t460 [-3])
    autoTester.check (d460 [-1], d460 ['b'])
    
    autoTester.check (s460 [0], s460 [1], s460 [2], s460 [-1], s460 [-2], s460 [-3])
    autoTester.check (l460 [0], l460 [1], l460 [2], l460 [-1], l460 [-2], l460 [-3])
    autoTester.check (t460 [0], t460 [1], t460 [2], t460 [-1], t460 [-2], t460 [-3])
    autoTester.check (d460 [-1], d460 ['b'])

    #__pragma__ ('noopov')

    #__pragma__ ('keycheck')
    
    try:
        autoTester.check (d460 [-1], d460 ['c'])
    except:
        autoTester.check (111)
    try:
        autoTester.check (d460 [-2], d460 ['b'])
    except:
        autoTester.check (222)
        
    #__pragma__ ('nokeycheck')
    
    a = [1, 2, 3]
    b = [4, 5, 6]
    c = '1,2,34,5,6'

    if __envir__.executor_name == __envir__.transpiler_name:
        autoTester.check (a + b)
        autoTester.check (a + b)    #__:opov
        autoTester.check (a + b)
    else:
        autoTester.check (c)
        autoTester.check (a + b)    #__:opov
        autoTester.check (c)

    #__pragma__ ('opov')
        
    if __envir__.executor_name == __envir__.transpiler_name:
        autoTester.check (a + b)    #__:noopov
        autoTester.check (a + b)
        autoTester.check (a + b)    #__:noopov
    else:
        autoTester.check (c)        #__:noopov
        autoTester.check (a + b)
        autoTester.check (c)        #__:noopov

    #__pragma__ ('noopov')
    
    autoTester.check ('Issue 494')  # {None} in formatted string gets converted to {}
    
    # Worked, should still work
    a = 1
    autoTester.check (f'a={a}')

    # Failed, should now work
    a = None
    autoTester.check (f'a={a}')
    
    autoTester.check ('Issue 515')  # Method format() is failing to replace the replacement fields if the value is None
    
    autoTester.check('a: {}; b: {}'.format(None, 1))
    autoTester.check('a: {}; b: {}'.format(1, None))
    autoTester.check('a: {0}; b: {1}'.format(1, None))
    autoTester.check('a: {0}; b: {1}'.format(1, []))
    autoTester.check('a: {}; b: {}'.format(1, []))
    autoTester.check('a: {0}; b: {1}'.format(1, {}))
    autoTester.check('a: {}; b: {}'.format(1, {}))
    autoTester.check('a: {0}; b: {1}'.format(1, 0))
    autoTester.check('a: {}; b: {}'.format(1, 0))
    
    autoTester.check ('Issue 559')  # Reexport everything imported, e.g. by the __init__.py of a module
    run559 (autoTester)
    