def run (autoTester):
    autoTester.check ('<br>General<br>')

    class A:
        p = 123
        def __init__ (self, x):
            self.x = x
            autoTester.check (self.p)

        def show (self, label):
            autoTester.check ('A.show', label, self.x)
            
        def show2 (self, label):
            autoTester.check ('A.show2', label, self.x)
        
    class B:
        p, q = 456, 789
        def __init__ (self, y):
            autoTester.check ('In B constructor')
            self.y = y
            autoTester.check (self.p)
            
        def show (self, label):
            autoTester.check ('B.show', label, self.y)
            
    class C (A, B):
        def __init__ (self, x, y):
            autoTester.check ('In C constructor')
            A.__init__ (self, x)
            B.__init__ (self, y)
            
        def show (self, label):
            A.show (self, label)
            B.show (self, label)
            autoTester.check ('C.show', label, self.x, self.y)
        
    a = A (1001)
    a.show ('america')
    autoTester.check (A.p)
    autoTester.check (a.p)

    b = B (2002)
    b.show ('russia')
    autoTester.check (B.p)
    autoTester.check (b.p)
    autoTester.check (b.q)

    autoTester.check (A.p)
    autoTester.check (a.p)

    c = C (3003, 4004)
    c.show ('netherlands')
    autoTester.check (C.p)
    autoTester.check (c.p)
    autoTester.check (c.q)

    c.show2 ('amsterdam')
    A.show2 (c, 'rotterdam')

    show3 = c.show
    show3 ('copy')
    
    autoTester.check (hasattr (a, 'x'))
    autoTester.check (hasattr (a, 'y'))
    autoTester.check (hasattr (a, 'p'))
    autoTester.check (hasattr (a, 'q'))
    
    autoTester.check ('<br><br>Augmented isinstance and issubclass<br>')
    # Augmented meaning: compatible with native JavaScript types
        
    simpleTypes = (dict, list, A, B, C, bool, str, float, int, object)
    tupleTypes = ((dict, list), (bool, int), (bool, A), (C, B), (B, object))
    for i, types in enumerate ((simpleTypes, tupleTypes)):
        for j, aType in enumerate (types):
            for k, anObject in enumerate (({'a': 1}, [], a, C, c, C, b, True, 'a', 1, 1.2)):
                autoTester.check (i, j, k, isinstance (anObject, aType))
                if types == simpleTypes:
                    autoTester.check (i, j, k, isinstance (anObject, simpleTypes))

    for i, types in enumerate ((simpleTypes, tupleTypes)):
        for j, aType in enumerate (types):
            for k, aClass in enumerate ((dict, list, A, C, B, bool, str, int, float)):
                autoTester.check (i + 2, j, k, issubclass (aClass, aType))
                if types == simpleTypes:
                    autoTester.check (i + 2, j, k, issubclass (aClass, simpleTypes))
                    
    autoTester.check ('<br><br>Method resolution order<br>')
    
    def mro (aClass, result = None):
        ''' Recursively assemble method resolution order from all base classes'''
        last = 0
        if result is None:
            result = [aClass]
            last = 1
        for aBase in aClass.__bases__:
            if not aBase in result and aBase != object:
                result.append (aBase)
                mro (aBase, result)
        if last and object in aClass.__bases__:
            aRoot.append (object)
        return result
        
    autoTester.check ([aClass.__name__ for aClass in mro (C)])
    