class C:
    def __init__ (self, s):
        self.s = s
        
    def f (self):
        console.log (self.s, 'world')

c = C ('hellooooo')    
c.f ()

g = c.f

g ()


