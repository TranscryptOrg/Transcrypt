def run (autoTester):       
    class A:
        class B:
            class C:
                def __init__ (self, x):
                    self.x = x
                    
                def tell (self):
                    autoTester.check (self.x)
                    autoTester.check (self.e)
                    
                # Limitation: no destructuring assignment inside nested classes
                e = 3
                
            def __init__ (self, x):
                self.x = x
                
            def tell (self):
                autoTester.check (self.x)
                autoTester.check (self.d)
                
            d = 2
                
        c = 1

        def __init__ (self, x):
            self.x = x
            
        def tell (self):
            autoTester.check (self.x)
            autoTester.check (self.c)
            
    def f (x):
        class G:
            class H:
                def __init__ (self, x):
                    self.x = x
                    
                def tell (self):
                    autoTester.check (self.x)
                    autoTester.check (self.i)
                    
                i = 5
        
            def __init__ (self, x):
                self.x = x
                
            def tell (self):
                autoTester.check (self.x)
                
            k = 4
            
        g = G (6)
        g.tell ()
        autoTester.check (g.k)
        
        h = G.H (7)
        h.tell ()
        autoTester.check (h.i)
        
        class P (A.B):
            pass
            
        p = P (7)
        p.tell ()
        autoTester.check (p.d)
                
    a = A (8)
    b = a.B (9)
    c = b.C (10)

    a.tell ()
    b.tell ()
    c.tell ()

    autoTester.check (a.c)
    autoTester.check (b.d)

    f (7)
