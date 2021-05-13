from collections import OrderedDict


def run(autoTester):
    od = OrderedDict()
    od['a'] = 'A'
    od['c'] = 'C'
    od['d'] = 'D'
    od['e'] = 'E'

    autoTester.check(od)
    autoTester.check(isinstance(od, dict))
    autoTester.check(isinstance(od, OrderedDict))

    for i, (k, v) in enumerate(od.items()):
        autoTester.check(i, k, v)

    for i, v in enumerate(od.values()):
        autoTester.check(i, v)

    for i, k in enumerate(od.keys()):
        autoTester.check(i, k)

    autoTester.check('a' in od)

    autoTester.check(od['a'])

    od['c'] = 'C2'
    autoTester.check(od)

    for i, (k, v) in enumerate(od.items()):
        autoTester.check(i, k, v)

    od['b'] = 'B'
    autoTester.check(od)

    autoTester.check(od.popitem())
    autoTester.check(od)

    autoTester.check(od.popitem(False))
    autoTester.check(od)

    autoTester.check(od.pop('c'))
    autoTester.check(od)

    autoTester.check('c' in od)

    d = {'e': 'E', 'd': 'D', 'a': 'A'}

    od.update(d)  # update with only one additional key, because update in cpython is not ordered
    autoTester.check(od)

    del od['d']
    autoTester.check(od)

    od.clear()
    autoTester.check(od)

    # __pragma__('jsiter')
    obj = {'g': 'G', 'j': 'J', 'c': 'C'}
    # __pragma__('nojsiter')
    od2 = OrderedDict(obj)
    # autoTester.check(od2)  # cpython does not maintain order on creation
