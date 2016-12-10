from math import *

def _check(nr, autoTester):
    # we just compare the first 15 digits of floats due to precision deviations
    # in browser and CPython:
    if isinstance(nr, float):
        nr = str(nr)[:15]
    autoTester.check(nr)


def run (autoTester):
    check = lambda nr: _check(nr, autoTester)
    check (pi)
    check (e)
    
    check (exp (3))
    check (int (expm1 (5)))
    
    check (log (0.2))
    check (round (log (1024, 2)))
    check (log1p (5))
    check (int (log2 (257)))
    check (int (log10 (1001)))
    
    check (pow (3, 4.5))
    check (sqrt (25.1))
    
    check (sin (10))
    check (cos (10))
    check (tan (10))

    check (asin (0.5))
    check (acos (0.5))
    check (atan (0.5))
    check (atan2 (1, 2))
    
    check (int (hypot (3, 4.1)))
    
    check (degrees (pi/2.1))
    check (radians (90))
    
    check (sinh (1))
    check (cosh (1))
    check (tan (1))
    
    check (asinh (70))
    check (acosh (70))
    check (atan (70))
    
    check (floor (3.5))
    check (ceil (3.5))
    check (trunc (3.5))
    
    check (isnan (3))
    check (isnan (nan))
    
    
