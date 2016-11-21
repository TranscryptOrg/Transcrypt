def run (autoTester):
    test1 = 1
    test2 = 2
    
    def f ():
        test1 = 10
        
        nonlocal test2
        test2 = 20
        
        autoTester.check (test1, test2)
        
    f ()
    autoTester.check (test1, test2)     
