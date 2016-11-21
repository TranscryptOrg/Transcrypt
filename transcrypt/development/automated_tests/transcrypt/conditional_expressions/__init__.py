def f (x, b):
    return x * x if b else x + x

def run (autoTester):
    bools = (False, True)
    for a in bools:
        for b in bools:
            autoTester.check (f (10 if a else 100, b))
            
    for p in bools:
        for q in bools:
            for r in bools:
                autoTester.check ('a' if p else 'b' if q else 'c' if r else 'd')
                
                a = ((('e' if p else 'f') if q else 'g') if r else 'h')
                b = ('i' if p else ('j' if q else ('k' if r else 'l')))
                c = 'm' if (p if q else r) else 'n'
                d = 'o' if p < q <= r else 'p'
                autoTester.check (a, b, c, d)
                
    odd = [x if x % 2 else x + 1 for x in range (10)]
    noDuplicates = set (odd)
    autoTester.check (odd, noDuplicates)
    