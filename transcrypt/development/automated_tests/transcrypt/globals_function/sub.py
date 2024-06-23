#  __pragma__ ('xglobs')

xxa = 'subXxa'
xxb = 'subXxb'
xxp = None
xxq = None
xxr = None
xxs = None

for name in ('xxp', 'xxq'):
    globals () [name] = 'sub{}'.format (name.capitalize ())

def f ():
    for name in ('xxr', 'xxs'):
        globals () [name] = 'sub{}'.format (name.capitalize ())
        
def run (autoTester):
    f ()
    autoTester.check ('Check sub 1', xxa, xxb)    
    autoTester.check ('Check sub 2', * [globals () [name] for name in ('xxa', 'xxb', 'xxp', 'xxq', 'xxr', 'xxs')])
    autoTester.check ('Check sub 3', * sorted ([value for key, value in globals () .items () if key.startswith ('xx')]))

    