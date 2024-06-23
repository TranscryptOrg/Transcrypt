from org.transcrypt.stubs.browser import __pragma__

def run (autoTester):
    x = 567
    y = -3
    z = 5 * x + 2 * y
    autoTester.check (x.conjugate () .real, x.conjugate () .imag)
    autoTester.check (x, y, z)

    __pragma__ ('opov')
    
    a = 234 + 3j
    b = 4 - 5j
    c = complex (-6, 7)
    d = 1
    autoTester.check (a, b, c)
    autoTester.check (d.conjugate () .real, d.conjugate () .imag)
    
    t = 6 * x - 3 * y + 7   # Just to check, faster with 'noopov'
    autoTester.check (t)
    
    d = 2 * a
    e = x * b
    f = z + d + e
    g = a / b
    h = a - b
    i = x - c
    j = a - x
    k = b + y
    
    autoTester.check (d, e, f, round (g.real, 2), round (g.imag, 2), h, i, j, k)
    
    __pragma__ ('noopov')
    