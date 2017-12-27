from org.transcrypt.stubs.browser import __pragma__
__pragma__ ('iconv')

# Dictionaries are translated to JavaScript objects,
# to achieve JSON-compatible syntax for JavaScript library object initialisation.
# Keys that may denote a number are interpreted as such in Transcrypt.
# All other keys are interpreted as strings.

def run (autoTester):
    tel = {'guido': 4127, 'jack': 4098}
    autoTester.check (len (tel))
    tel ['sape'] = 4139

    autoTester.check (tel)
    autoTester.check (tel ['jack'])

    del tel ['sape']
    tel ['irv'] = 4127
    autoTester.check (tel)

    autoTester.check (sorted (list (tel.keys ())), False)
    autoTester.check (sorted (tel.keys ()))

    autoTester.check ('guido' in tel)
    autoTester.check ('jack' not in tel)

    autoTester.check (dict ([('guido', 4127), ('jack', 4098), ('sape', 4139)]))
    autoTester.check (
        autoTester.expectException( lambda: dict(1) )
    )
    autoTester.check (
        autoTester.expectException( lambda: dict(134.34) )
    )
    autoTester.check (
        autoTester.expectException( lambda: dict('asdf') )
    )
    autoTester.check (
        autoTester.expectException( lambda: dict(['1234', 1]) )
    )

    autoTester.check( dict ([]))
    autoTester.check (dict ({}))
    autoTester.check (dict ({'asdf': 1, 'qwer': 2}) )

    # check dict copy, Issue # 221
    b = {'a' : 2.01, 'b': -3.3}
    d = dict (b)
    autoTester.check (d)
    b = {'a' : 2, 'b': [1,2,3]}
    d = dict (b)
    autoTester.check (d)
    b = {'a' : None, 'b': set([1,2,3])}
    d = dict (b)
    autoTester.check (d)
    b = {'a' : {'c': 2}, 'b': (1,2)}
    d = dict (b)
    autoTester.check (d)
    autoTester.check (d['a']['c'])
    autoTester.check (d.get('a').get('c'))
    autoTester.check (b.get('a').get('c'))
    d['a']['c'] = 3
    autoTester.check (d.get('a').get('c'))
    autoTester.check (b.get('a').get('c'))

    knights = {'robin': 'the brave', 'gallahad': 'the pure'}

    for k, v in sorted (knights.items ()):
        autoTester.check (k, v)

    if 'gallahad' in knights:
        autoTester.check ('gallahad is a knight') 

    for k in sorted (knights):
        autoTester.check (k)
        
    knight = {'rudolph': 'the righteous'}
    for k in knight:    # Autotest automatic conversion with one knight, since sort order of dict undefined
        autoTester.check (k)
        
    tel = {'guido': 123}
    tel.update({'edsger': 42})
    autoTester.check (tel.setdefault ('linus', 456))
    autoTester.check (tel ['linus'])
    autoTester.check (tel.setdefault ('guido', 789))
    autoTester.check (tel.pop ('guido', 1))
    autoTester.check (tel.pop ('guido', 1))
    autoTester.check (tel.pop ('edsger', 2))
    autoTester.check (tel.pop ('foo', 'bar'))
    autoTester.check (tel.pop ('foo', None))

    # Check compound keys (issue 281)
    
    d = {}
    d ['a'] = 3777
    d [(1, 2)] = 4777
    autoTester.check (d ['a'], d [(1, 2)])

    __pragma__ ('opov')
    d = {}
    d ['a'] = 3777
    d [(1, 2)] = 4777
    autoTester.check (d ['a'], d [(1, 2)])
    __pragma__ ('noopov')
    
    # Check exceptions
    knights = {'robin': 'the brave', 'gallahad': 'the pure'}
    autoTester.check (
        autoTester.expectException ( lambda: knights.pop("batman") )
    )
    autoTester.check (
        autoTester.expectException ( lambda: knights.pop("batman", None) )
    )
    autoTester.check (
        autoTester.expectException ( lambda: knights.pop("batman", "the gullible") )
    )
