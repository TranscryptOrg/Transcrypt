from typing import Iterator

import mod1
import mod2

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

