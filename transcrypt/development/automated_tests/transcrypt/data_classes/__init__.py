from dataclasses import dataclass
from typing import ClassVar

def getQ ():
    return 1002

@dataclass
class A:
    m = 101010
    n: int = 202020

@dataclass
class B (A):
    p: int = 1001
    q: int = 1002
    
@dataclass (order = True)
class C (B):
    @dataclass
    class CC (B):
        k: int = 40
        l: float = 55.5
        j = 60
    x: ClassVar = 10
    y: int = 20
    yy: int = 22
    z: int = 30
    zz: int = 33
    t: ClassVar = 40
    g = 100000
    h = 100001
    i = 100002
    
    def getV (self):
        return 3
        
    def setV (self, value):
        pass
    
    v = property (getV, setV)

    def getW (self):
        return 4
        
    def setW (self, value):
        pass
    
    w: int = property (getW, setW)

    def f (self, p, autoTester):
        self.a = p
        self.b = 2000
        autoTester.check (self.x, self.y, self.a)
        return f'something(a: {self.a}, b: {self.b})'


@dataclass (order = True)        
class D:        
    _p: int = 3

    def setP (self, value):
        pass
        #self._p = value

    def getP (self):
        return 20
        #return self._p
        
    p: int = property (getP, setP)
    
def run (autoTester):
    c = C (y = 200, zz = 330)
    cc = C (y = 10200)
    c.f (123, autoTester)
    c.t = 400
    cc.f (456, autoTester)
    cc.t = 4000
    
    for obj in c, cc:
        autoTester.check (obj.x, obj.y, obj.yy, obj.z, obj.zz, obj.t, obj.a, obj.b)
        
    autoTester.check (repr (c))
    autoTester.check (repr (cc)) 
    
    #__pragma__ ('opov')
    
    autoTester.check (c == cc)
    autoTester.check (c != cc)
    
    autoTester.check (c < cc)
    autoTester.check (c > cc)  #
    autoTester.check (c <= cc) #
    autoTester.check (c >= cc)
    
    autoTester.check (c == c)
    autoTester.check (c != c)
    autoTester.check (c < c)
    autoTester.check (c > c)
    autoTester.check (c <= c)
    autoTester.check (c >= c)

    d3 = D ()
    d1 = D ()
    d2 = D ()
    
    autoTester.check (repr (d1))

    autoTester.check (d3, d1, d3 > d1)
    autoTester.check (d2, d1, d2 > d1)
    autoTester.check (d3, d2, d3 > d2) 

    ccc = C.CC ()
    autoTester.check (ccc.n, ccc.p, ccc.q, ccc.k, ccc.l)
    