def run (autoTester):
    squares = [i * i for i in range (10) if i % 2]
    autoTester.check (squares)
    
    tuples = [
        (x, y, z)
        for x in (100, 200, 300, 400, 500, 600, 700)
            for y in (10, 20, 30, 40, 50, 60, 70) if 20 < y  < 60
                for z in (1, 2, 3, 4, 5, 6, 7) if 200 < x < 600 if 2 < z < 6
    ]
    autoTester.check (tuples)
    
    tricky = [(2 * x, 3 * y) for x, y in ((10, 11), (20, 21))]
    autoTester.check (tricky)
    
    nested = [2 * x for x in [x * x for x in range (3)]]
    autoTester.check (nested)
    
    a = 100
    x = 5
    scopeTest = [x + a for x in range (5)]
    autoTester.check (x)
    autoTester.check (scopeTest)
