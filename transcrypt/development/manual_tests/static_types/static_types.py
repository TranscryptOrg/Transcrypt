# from org.transcrypt.stubs.browser import __pragma__

from typing import Iterator #, List, Dict, ClassVar

import mod1
import mod2

testVar: int = 3.5

def fib (n: int) -> Iterator [int]:
    a, b = 0, 1
    while a < n:
        # yield a
        a, b = b, a + b
        
    return 3
        
def add (a: int, b: int) -> None:
    return a + b
    
class A:
    def __init__ (self) -> None:
        pass
    
    def test (self) -> None:
        return 'test'
        
'''
__pragma__ ('ifdef', '__undefined__')   # Needed because Transcrypt imports are compile time
if '__undefined__' in __symbols__:      # Needed because CPython doesn't understand pragmas

    # Variable annotations

    aList: List [int] = []

    aString: str    # Note: no initial value!

    class aClass:
        aClassVar: ClassVar [Dict [str, int]] = {}
        
    aList = [1.1, 2.2]
    aString = 1000
    aClass.aClassVar = {'aString', 3.14}

__pragma__ ('endif')
'''