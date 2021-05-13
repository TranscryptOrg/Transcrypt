#2

class A:
    def __init__ (self, x):
        self.x = x
                
    __pragma__ ('jscall')

    def f (self, param):
        return self.x * param
        
    __pragma__ ('nojscall')
    
    def g (self, param):
        return self.x * param

a = A (2)
a2 = A (3)

print (a.f (4), a2.f (5))

class B (A):
    pass
    
b = B (4)
b2 = B (5)

print (b.f (6), b2.f (7))

# Will print
# 8 15
# 24 35

