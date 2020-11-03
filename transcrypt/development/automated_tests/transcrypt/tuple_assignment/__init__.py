def run (autoTester):
    ((a, b), santa, [c, d], e) = ((1, 2), 'santa-claus', {3, 4}, 5)
    autoTester.check (a, b, c, d, e, santa)
    
    for i, x in enumerate ((0.5, 1.5, 2.5, 3.5)):
        autoTester.check (i, x)
    
    e, pi = 3.14, 2.74
    e, pi = pi, e
    autoTester.check (e, pi)
    
    def f ():
        return [(i, 2 * i) for i in range (7000, 10000, 1000)]
        
    def g ():
        return f
        
    [k, l], [m, n], (o, p) = g () ()
    
    autoTester.check (k, l, m, n, o, p)
