pi = Math.PI
e = Math.E

def phase (x):
    return 0 if __typeof__ (x) is 'number' else Math.atan2 (x.imag, x.real)
    
def polar (x):
    return (Math.abs (x), 0) if __typeof__ (x) is 'number' else (abs (x), phase (x))
    
def rect (r, phi):
    __pragma__ ('opov')
    return r * (Math.cos (phi) + 1.j * Math.sin (phi))
    __pragma__ ('noopov')
    
def exp (x):
    return complex (x, 0) .__exp__ () if __typeof__ (x) is 'number' else x.__exp__ ()
        
def log (x, base):
    return (
        complex (x, 0) .__log__ () if __typeof__ (x) is 'number' else x.__log__ ()
    ) if base is js_undefined else (
        __truediv__ (log (x), log (base))   # Recursive
    )
    
def log10 (x):
    return log (x, 10)
    
def sqrt (x):
    return exp (__mul__ (log (x), 0.5))
    
__pragma__ ('opov')

def sin (x):
    return -0.5j * (exp (1j * x) - exp (-1j * x))

def cos (x):
    return 0.5 * (exp (1j * x) + exp (-1j * x))

def tan (x):
    return -1j * (exp (1j * x) - exp (-1j * x)) / (exp (1j * x) + exp (-1j * x))

def asin (x):
    return -1j * log (1j * x + sqrt (1 - x * x))

def acos (x):
    return -1j * log (x + 1j * sqrt (1 - x * x))
    
def atan (x):
    return 0.5j * log ((1j + x) / (1j - x))

def sinh (x):
    return 0.5 * (exp (x) - exp (-x))

def cosh (x):
    return 0.5 * (exp (x) + exp (-x))

def tanh (x):
    return (exp (x) - exp (-x)) / (exp (x) + exp (-x))

def asinh (x):
    return log (x + sqrt (1 + x * x))

def acosh (x):
    return log (x + sqrt (-1 + x * x))
    
def atanh (x):
    return 0.5 * log ((1 + x) / (1 - x))

__pragma__ ('noopov')

def isinf (x):
    return x.real == js_Infinite or x.imag == js.Infinite

def isfinite (x):
    return not isinf (x)

def isnan (x):
    return js_isNaN (x.real) or js_isNaN (x.imag)
    