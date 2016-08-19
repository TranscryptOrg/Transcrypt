from math import *

def run (autoTester):
	autoTester.check (pi)
	autoTester.check (e)
	
	autoTester.check (exp (3))
	autoTester.check (int (expm1 (5)))
	
	autoTester.check (log (0.2))
	autoTester.check (round (log (1024, 2)))
	autoTester.check (log1p (5))
	autoTester.check (int (log2 (257)))
	autoTester.check (int (log10 (1001)))
	
	autoTester.check (pow (3, 4.5))
	autoTester.check (sqrt (25.1))
	
	autoTester.check (sin (10))
	autoTester.check (cos (10))
	autoTester.check (tan (10))

	autoTester.check (asin (0.5))
	autoTester.check (acos (0.5))
	autoTester.check (atan (0.5))
	autoTester.check (atan2 (1, 2))
	
	autoTester.check (int (hypot (3, 4.1)))
	
	autoTester.check (degrees (pi/2.1))
	autoTester.check (radians (90))
	
	autoTester.check (sinh (1))
	autoTester.check (cosh (1))
	autoTester.check (tan (1))
	
	autoTester.check (asinh (70))
	autoTester.check (acosh (70))
	autoTester.check (atan (70))
	
	autoTester.check (floor (3.5))
	autoTester.check (ceil (3.5))
	autoTester.check (trunc (3.5))
	