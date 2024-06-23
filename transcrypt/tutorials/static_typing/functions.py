from typing import *

def f (l: List [List [int]]) -> float:
    return 3.5
    
a = 3
a = f ([[1, 2.2, 3], [4.4, 5.5, 6.6]])

def g (n: int) -> Iterator [int]:
    for i in range (n): 
        yield i * i
        
for b in g (10):
    c = b
    
c = 5.5

def h (i: int = 0, f: float = 0, c: complex = 0) -> Tuple [int, float, complex]:
    return (i, f, c)

d = h (1, 1.0)
d = h (c = 'something')

def ff (anF: Callable [[List [List [int]]], float]) -> float:
    return anF ('nonsense')

e = 1   
e = ff (f)
