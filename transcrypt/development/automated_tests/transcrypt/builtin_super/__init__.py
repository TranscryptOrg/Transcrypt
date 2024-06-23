def run (autoTester):
    def show (*args):
        autoTester.check (*args)
        # print (*args) # Leave in for debugging purposes

    class R:
        def __init__ (self, a, b):
            self.a = a
            self.b = b
            
    class A (R):
        def __init__ (self, a, b, c):
            super () .__init__ (a, b)
            self.c = c

        def f (self, x, y):
            show ('A.f:', x, y, self.a, self.b, self.c)
            
        def g (self, x, y):
            show ('A.g:', x, y)
            
    class B (R):
        def __init__ (self, a, b, d):
            super () .__init__ (a, b)
            self.d = d

        def f (self, x, y):
            show ('B.f:', x, y, self.a, self.b, self.d)
            
        def h (self, x, y):
            show ('A.h:', x, y, self.a, self.b, self.d)

    class C (A):
        def __init__ (self, a, b, c):
            super () .__init__ (a, b, c)
        
        def f (self, x, y):
            super () .f (x, y)
            show ('C.f:', x, y, self.a, self.b, self.c)
            
    class D (B):
        def __init__ (self, a, b, d):
            super () .__init__ (a, b, d)
        
        def f (self, x, y):
            super () .f (x, y)
            show ('D.f:', x, y, self.a, self.b, self.d)
            
    # Diamond inheritance, use super () only to call exactly one target method via unique path.
    # In case of multiple target methods or multiple paths, don't use super (), but refer to ancestor classes explicitly instead
    class E (C, D):        
        def __init__ (self, a, b, c, d):
            R.__init__ (self, a, b) # Inherited via multiple legs of a diamond, so call explicitly
            self.c = c              # Could also have used C.__init__, but symmetry preferred
            self.d = d              # Don't use both C.__init__ and D.__init__, since R.__init__ will be called by both
                                    # That's harmless here, but not always

        def f (self, x, y):
            C.f (self, x, y)        # Ambiguous part of diamond, don't use super ()
            D.f (self, x, y)        # Ambiguous part of diamond, don't use super ()
            show ('E.f:', x, y, self.a, self.b, self.c, self.d)
            
        def g (self, x, y):
            super () .g (x, y)      # Unique, using super () is OK
            show ('E.g:', x, y, self.a, self.b, self.c, self.d)
            
        def h (self, x, y):
            super () .h (x, y)      # Unique, using super () is OK
            show ('E.h:', x, y, self.a, self.b, self.c, self.d)
           
    rr = R (100, 200)

    show ('--1--')

    a = A (101, 201, 301)
    a.f (711, 811)
    a.g (721, 821)

    show ('--2--')

    b = B (102, 202, 302)
    b.f (712, 812)
    b.h (732, 832)

    show ('--3--')

    c = C (103, 203, 303)
    c.f (713, 813)
    c.g (723, 823)

    show ('--4--')

    d = D (104, 204, 304)
    d.f (714, 814)
    d.h (734, 834)

    show ('--5--')

    e = E (105, 205, 305, 405)
    e.f (715, 815)
    e.g (725, 825)
    e.h (735, 835)
