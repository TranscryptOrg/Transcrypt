
def run(test):
    """ Test the repr and string implementations
    """

    v = 1
    test.check( repr(v) )
    test.check( str(v) )
    v = "asdf"
    test.check( repr(v) )
    test.check( str(v) )
    v = True
    test.check( repr(v) )
    test.check( str(v) )
    v = False
    test.check( repr(v) )
    test.check( str(v) )
    v = 1.2
    test.check( repr(v) )
    test.check( str(v) )
    v = -31.2
    test.check( repr(v) )
    test.check( str(v) )
    v = 63e-12
    test.check( repr(v) )
    test.check( str(v) )
    v = 24e37
    test.check( repr(v) )
    test.check( str(v) )
    v = -34e-23
    test.check( repr(v) )
    test.check( str(v) )
    v = -89e32
    test.check( repr(v) )
    test.check( str(v) )
    v = None
    test.check( repr(v) )
    test.check( str(v) )
    v = [None]
    test.check( repr(v) )
    test.check( str(v) )
    v = [None, None]
    test.check( repr(v) )
    test.check( str(v) )
    v = [None, 1.02]
    test.check( repr(v) )
    test.check( str(v) )
    v = [1,3.000234]
    test.check( repr(v) )
    test.check( str(v) )
    v = [1,2,3]
    test.check( repr(v) )
    test.check( str(v) )
    v = [1.04, 2.03, 3.005]
    test.check( repr(v) )
    test.check( str(v) )
    v = ["asdf", 2.00009, "1234"]
    test.check( repr(v) )
    test.check( str(v) )
    v = set([1,2,3])
    test.check( repr(v) )
    test.check( str(v) )
    v = set([])
    test.check( repr(v) )
    test.check( str(v) )
    v = (1,2)
    test.check( repr(v) )
    test.check( str(v) )
    v = (3.4, 4.4)
    test.check( repr(v) )
    test.check( str(v) )
    v = (None, 5.32)
    test.check( repr(v) )
    test.check( str(v) )
    v = {}
    test.check( repr(v) )
    test.check( str(v) )
    v = { "a": 1 }
    test.check( repr(v) )
    test.check( str(v) )

    # @note - in python the dictionary key
    #     ordering is not specified. So the following tests
    #     cannot be reliably completed when there are more than
    #     one key in a dict - so this test coverage was skipped for now.

    d = { "asdf": 3.4 }
    test.check( repr( d ) )
    test.check( str( d ) )
    d = { "qwer": "qwerqwer qwerqwer" }
    test.check( repr( d ) )
    test.check( str( d ) )
    d = { "a9342" : None }
    test.check( repr( d ) )
    test.check( str( d ) )
    d = { "nfdns" : True }
    test.check( repr( d ) )
    test.check( str( d ) )
    d = { "alel;e;" : False }
    test.check( repr( d ) )
    test.check( str( d ) )
    d = { "didi" : [True,False,True] }
    test.check( repr( d ) )
    test.check( str( d ) )
    d = { "bibi" : [1,2,3] }
    test.check( repr( d ) )
    test.check( str( d ) )
    d = { "gigi" : ["Asdf","qwer","rewer"] }
    test.check( repr( d ) )
    test.check( str( d ) )
    d = { "hihi" : ("esdf","qwer","rewer") }
    test.check( repr( d ) )
    test.check( str( d ) )
    d = { "jiji" : [None, None, None] }
    test.check( repr( d ) )
    test.check( str( d ) )
    d = { "jiji" : (1.3, 3.4) }
    test.check( repr( d ) )
    test.check( str( d ) )

    d = { "jiji" : { "c" : 4 } }
    test.check( repr( d ) )
    test.check( str( d ) )

    class Test1(object):
        def __init__(self, val):
            self._val = val

        def __str__(self):
            return("[Test1 {}]".format(self._val))

        def __repr__(self):
            return(str(self))

    class Test2(object):
        def __init__(self, val):
            self._val = val

        def __repr__(self):
            return("[Test2 {},{}]".format(self._val, self._val*2))

        def __str__(self):
            return( repr(self) )

    class Test3(Test2):
        def __str__(self):
            return("[Test3 {}]".format(self._val))

    class Test4(object):
        def __init__(self, val):
            self._val = val

        def __repr__(self):
            return("[Test4 {}]".format(self._val))


    t1 = Test1(2)
    test.check( repr(t1) )
    test.check( str(t1) )
    t1 = Test1(4.5)
    test.check( repr(t1) )
    test.check( str(t1) )
    t1 = Test1("blarg")
    test.check( repr(t1) )
    test.check( str(t1) )
    t1 = Test1([1,2,3])
    test.check( repr(t1) )
    test.check( str(t1) )

    t2 = Test2(3)
    test.check( repr(t2) )
    test.check( str(t2) )
    t2 = Test2(7.6)
    test.check( repr(t2) )
    test.check( str(t2) )
    t2 = Test2(-8.9)
    test.check( repr(t2) )
    test.check( str(t2) )

    t3 = Test3(8)
    test.check( repr(t3) )
    test.check( str(t3) )

    t3 = Test3(3.4)
    test.check( repr(t3) )
    test.check( str(t3) )

    test.check( repr( [t1,t2,3] ) )

    d = { "irew" : t1 }
    test.check( repr( d ) )
    test.check( str( d ) )
    d = { "irew" : [t1,t2,t3] }
    test.check( repr( d ) )
    test.check( str( d ) )

    t4 = Test4("qwer")
    test.check( repr(t4) )
    test.check( str(t4) )
