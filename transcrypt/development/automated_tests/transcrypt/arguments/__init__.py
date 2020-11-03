from org.transcrypt.stubs.browser import __pragma__

__pragma__ ('kwargs')

class A:
    def __init__ (self, x = 123, y = 456, *args, m, n = 456, **kwargs):
        self.x = x
        self.y = y
        self.args = args
        self.m = m
        self.n = n
        self.kwargs = kwargs
        self.extra = 'hello'

    def f (self, autoTester):
        autoTester.check (self.x, self.y, self.args, self.m, self.n, self.kwargs, self.extra)
        
class B (A):
    def __init__ (self, x, y = -1, *args, m = -2, n, **kwargs):
        A.__init__ (self, y, x, *args, m = n, n = m, **kwargs)
        
class C:
    __pragma__ ('nokwargs')
    def tricky (self, *args):
        return args
    __pragma__ ('kwargs')
    
def run (autoTester):
    def f (x, y = -1, *args, m = -2, n, **kwargs):
        # BEGIN issue 203, kwargs turned into real dict
        autoTester.check ('#203', kwargs.__class__.__name__)
        autoTester.check ('#203', sorted (kwargs.keys ()))
        # END issue 203
    
        def f2 (x, y = -3, *args, m = -4, n, **kwargs):
            autoTester.check (x, y, args, m, n, kwargs)
        f2 (11, 22, 1010, 2020, m = 100100, n = 200200, p = 10001000, q = 20002000)
        autoTester.check (x, y, args, m, n, kwargs)
        
    f (1, 2, 10, 20, m = 100, n = 200, p = 1000, q = 2000)
    
    b = B (3, 4, 30, 40, m = 300, n = 400, p = 3000, q = 4000)
    b.f (autoTester)
    
    def g (*args, **kwargs):
        autoTester.check (args, kwargs)
        
    g (*(1, 2, 3), **{'p': 'aP', 'q': 'aQ', 'r': 'anR'})
    
    (lambda x, y = -1, *args, m = -2, n, **kwargs: autoTester.check (x, y, args, m, n, kwargs)) (1, 2, 8, 16, m = 128, n = 256.3, p = 1024.3, q = 2048.3)
    
    autoTester.check (C () .tricky (* range (4)))
    autoTester.check ('{}-{}'.format (1, 3, 5, 7, 9))
    autoTester.check ('{}-{}'.format (* range (4)))
