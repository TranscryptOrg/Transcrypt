from dataclasses import dataclass
from typing import ClassVar

@dataclass (order = True)
class C:
    x: ClassVar = 10
    y: int = 20
    yy: int = 22
    z: int = 30
    zz: int = 33
    t: ClassVar = 40

    def f (self, p, autoTester):
        self.a = p
        self.b = 2000
        autoTester.check (self.x, self.y, self.a)
        return f'something(a: {self.a}, b: {self.b})'

def run (autoTester):
    c = C (y = 200, zz = 330)
    cc = C (y = 10200)
    c.f (123, autoTester)
    c.t = 400
    cc.f (456, autoTester)
    cc.t = 4000
    
    for obj in c, cc:
        autoTester.check (obj.x, obj.y, obj.yy, obj.z, obj.zz, obj.t, obj.a, obj.b)
        
    autoTester.check (c.__repr__ ())
    autoTester.check (cc.__repr__ ()) 
    
    #__pragma__ ('opov')
    
    autoTester.check (c == cc)
    autoTester.check (c != cc)
    
    autoTester.check (c < cc)
    autoTester.check (c > cc)
    autoTester.check (c <= cc)
    autoTester.check (c >= cc)
    
    autoTester.check (c == c)
    autoTester.check (c != c)
    autoTester.check (c < c)
    autoTester.check (c > c)
    autoTester.check (c <= c)
    autoTester.check (c >= c)
    