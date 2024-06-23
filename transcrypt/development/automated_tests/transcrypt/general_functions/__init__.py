from org.transcrypt.stubs.browser import __pragma__

class A:
    foo='bar'
    def __init__ (self):
        self.foo2 = 'bar2'

class B (A):
    foo3='bar3'
    def __init__ (self):
        self.foo4 = 'bar4'
        
class C:
    def __len__ (self):
        return 42

def run (autoTester):
    autoTester.check ('len')

    strings = ['hello', ',', 'world', '!']
    instances = [C()]
    collections = [
        [], [1], [1, 2],
        tuple(), (1,), (1, 2),
        {}, {1: 1}, {1: 1, 2: 2}
    ]

    for string in strings:
        autoTester.check (len (string))

    for instance in instances:
        autoTester.check (len (instance))

    for collection in collections:
        autoTester.check (len (collection))

    autoTester.check ('sort and sorted<br>')
    a = [1, 5, 3, 2, -1]
    b = ['sun', 'earth', 'moon']
    
    autoTester.check (sorted (a))
    autoTester.check (sorted (b))
    
    a.sort ()
    autoTester.check (a)
    
    b.sort ()
    autoTester.check (b)

    autoTester.check (sorted (a, reverse = True))
    autoTester.check (sorted (b, reverse = True))
    
    a.sort (reverse = True)
    autoTester.check (a)
    
    b.sort (reverse = True)
    autoTester.check (b)
    
    b.sort (key = lambda x: len (x)) 
    autoTester.check (b)

    b.sort (key = lambda x: len (x), reverse = True) 
    autoTester.check (b)

    autoTester.check ('<br><br>dir<br>')
    autoTester.check ([entry for entry in dir (A) if not entry.startswith ('__')])
    autoTester.check ([entry for entry in dir (A()) if not entry.startswith ('__')])
    autoTester.check ([entry for entry in dir (B) if not entry.startswith ('__')])
    autoTester.check ([entry for entry in dir (B()) if not entry.startswith ('__')])

    autoTester.check ('<br><br>any, all, sum<br>')
    list1 = ['ape', 'node', 'mice']
    list2 = ['vim', '', 'jet']
    list3 = ['', '', '']
    list4 = [[1, 2], [1], []]   # Truthyness into play
    autoTester.check (list1, any (list1), all (list1))
    autoTester.check (list2, any (list2), all (list2))
    autoTester.check (list3, any (list3), all (list3))
    autoTester.check (list4, any (list4), all (list4))
    
    autoTester.check (sum (range (5)))
      
    def generator1 ():
        for i in range (5):
            yield i;
            
    def generator2 ():
        for i in range (5):
            if i % 2:
                yield 0
            else:
                yield i;
                
    def generator3 ():
        for i in range (5):
            yield 0;
                
        autoTester.check (generator1 (), any (generator1 ()), all (generator1 ()))
        autoTester.check (generator2 (), any (generator2 ()), all (generator2 ()))
        autoTester.check (generator3 (), any (generator3 ()), all (generator3 ()))
        
        autoTester.check (sum (generator1 ()))
    __pragma__ ('endif')
