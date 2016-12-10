pi = Math.PI
e = Math.E

exp = Math.exp

def expm1 (x):      # IE workaround
    return Math.exp (x) - 1

def log (x, base):
    return Math.log (x) if base is js_undefined else Math.log (x) / Math.log (base)

def log1p (x):      # IE workaround
    return Math.log (x + 1)

def log2 (x):       # IE workaround
    return Math.log (x) / Math.LN2
    
def log10 (x):      # IE workaround
    return Math.log (x) / Math.LN10

pow = Math.pow
sqrt = Math.sqrt

sin = Math.sin
cos = Math.cos
tan = Math.tan

asin = Math.asin
acos = Math.acos
atan = Math.atan
atan2 = Math.atan2

hypot = Math.hypot
    
def degrees (x):
    return x * 180 / Math.PI
    
def radians (x):
    return x * Math.PI / 180
    
sinh = Math.sinh
cosh = Math.cosh
tanh = Math.tanh

asinh = Math.asinh
acosh = Math.acosh
atanh = Math.atanh

floor = Math.floor
ceil = Math.ceil
trunc = Math.trunc

isnan = js_isNaN

inf = js_Infinity
nan = js_NaN
