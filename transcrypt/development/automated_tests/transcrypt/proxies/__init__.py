from org.transcrypt.stubs.browser import __pragma__

def run (autoTester):
    class A:
        def __init__ (self):
            self.p = 1
            self.q = 2
            
    class B (A):
        def __getattr__ (self, name):
            return 'Faked {}'.format (name)
            
    class C (A):
        def __setattr__ (self, name, value):
            autoTester.check ('Set faked {}'.format (name))
            
            A.__setattr__ (self, name, value)
            # Needed for CPython, inherited from class 'object'
            # Transcrypt doesn't need it, if there's no __setattrib__ it will just use self [name] = value
    
    class D (B, C):
        pass
        
    a = A ()
    b = B ()
    c = C ()
    d = D ()
    
    autoTester.check (a.p, a.q)
    a.p = 3
    autoTester.check (a.p, a.q)
    
    autoTester.check (b.p, b.q, b.r, b.s)
    b.p = 4
    b.r = 5
    autoTester.check (b.p, b.q, b.r, b.s)
    
    autoTester.check (c.p, c.q)
    c.p = 6
    c.q = 7
    autoTester.check (c.p, c.q)

    autoTester.check (d.p, d.q, d.r, d.s)
    d.p = 8
    d.q = 9
    d.r = 10
    d.s = 11
    autoTester.check (d.p, d.q, d.r, d.s)   
