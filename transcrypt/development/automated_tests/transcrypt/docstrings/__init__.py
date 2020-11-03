'''Just a module
to test docstrings'''
'''Not visible'''

from org.transcrypt.stubs.browser import __pragma__
__pragma__ ('docat')

def run (autoTester):
    def f (p):
        '''Just a function
        called f'''
        '''Not visible'''
        autoTester.check (p) 

    class C:
        '''Just a class
        called C'''
        '''Not visible'''
        def g (self, q):
            '''Just a method
            called g'''
            '''Not visible'''
            autoTester.check (q)
        
    autoTester.check (__doc__)
    autoTester.check ()

    autoTester.check (f.__doc__)
    autoTester.check ()

    autoTester.check (C.__doc__)
    autoTester.check ()

    autoTester.check (C.g.__doc__)
    autoTester.check ()

    f ('Doc')
    C () .g ('strings')
