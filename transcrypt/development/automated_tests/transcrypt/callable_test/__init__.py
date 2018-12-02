# Callable built-in method unit tests

from org.transcrypt.stubs.browser import __pragma__

def run(test):
    """
    """

    def func(a,b):
        return(a*b)

    test.check( func(3,4) )
    test.check( callable(func) )

    for a in (True, False):
        test.check( callable(a) )

    a = 1
    test.check( callable(a) )
    a = 2.3
    test.check( callable(a) )
    a = "asdf"
    test.check( callable(a) )

    a = []
    test.check( callable(a) )
    a = [1,2,3,3]
    test.check( callable(a) )
    a = ["asdf", "qwer", "zxcv"]
    test.check( callable(a) )

    a = {"asdf" : 1, "qwer": 2}
    test.check( callable(a) )

    a = set([1,2])
    test.check(callable(a))

    __pragma__('opov')

    class CallObj(object):
        def __init__(self, r):
            self._r = r

        def __call__(self):
            return(self._r)

    test.check( callable(CallObj) )

    obj = CallObj(2)
    test.check(obj())
    test.check( callable(obj) )
    test.check( callable(obj._r) )

    class NonCallObj(object):
        def __init__(self, b):
            self._b = b

        def func(self):
            return(self._b)

    test.check( callable(NonCallObj) )

    obj2 = NonCallObj(2)
    test.check( callable(obj2) )
    test.check( callable(obj2._b) )
    test.check( callable(obj2.func) )

    __pragma__('noopov')

    class NonOpovNonCallObj(object):
        """
        """
        def __init__(self, c):
            self._c = c

        def other(self, b):
            return(self._c * b)

        def _getC(self):
            return(self._c)
        def _setC(self, val):
            self._c = val

        C = property(_getC, _setC)

    obj = NonOpovNonCallObj(4)
    test.check( callable(obj) )
    test.check( callable(obj.other) )
    test.check( callable(obj._c) )
    test.check( callable(obj.C) )

    exc = Exception("asdf")
    test.check( callable(exc) )
