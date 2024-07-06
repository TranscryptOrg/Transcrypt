import copy

def run (autoTester):
    a = {'a': 1, 'b': 2, 'c': 3}
    b = copy.copy(a)
    c = [[1,2,3],[4,5,6]]
    d = copy.copy(c)
    e = copy.deepcopy(c)

    autoTester.check ('copy')
    autoTester.check (b)
    autoTester.check (a)
    a['b'] = 9
    autoTester.check (a)
    autoTester.check (b)

    autoTester.check ('deepcopy')
    autoTester.check (d)
    autoTester.check (e)
    c[1][1] = 9
    autoTester.check (c)
    autoTester.check (d)
    autoTester.check (e)
