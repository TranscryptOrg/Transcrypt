from globals_function import sub

xxa = 'mainXxa'
xxb = 'mainXxb'

for name in ('xxp', 'xxq'):
    globals () [name] = 'main{}'.format (name.capitalize ())    
    
def f ():
    for name in ('xxr', 'xxs'):
        globals () [name] = 'main{}'.format (name.capitalize ())
        
def run (autoTester):
    f ()                 # All vars of main added
    sub.run (autoTester) # Shouldn't override vars of main
    
    autoTester.check ('Check main 1', xxa, xxb)
    autoTester.check ('Check main 2', * [globals () [name] for name in ('xxa', 'xxb', 'xxp', 'xxq', 'xxr', 'xxs')])
    autoTester.check ('Check main 3', sub.xxa, sub.xxb, sub.xxp, sub.xxq, sub.xxr, sub.xxs)
    autoTester.check ('Check main 4', * sorted ([value for key, value in globals () .items () if key.startswith ('xx')]))
    
    