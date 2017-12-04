class C:
    def f (self):
        def g ():
            pass
        return 0
        
c = C ()
c.f ()
