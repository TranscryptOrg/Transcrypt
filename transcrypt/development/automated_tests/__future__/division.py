from __future__ import division

def _check(x, test):
    # Floats have different precision/representation in js and python
    # Limit precision to 15 digits and convert to int if float is int
    # See transcrypt/module_math for similar function

    # 42.0 is 42
    if x == int(x):
        x = int(x)

    # 15 first digits
    if isinstance(x, float):
        x = str(x)[:15]

    test.check(x)

def run(test):
    check = lambda x: _check(x, test)

    for i in range(1, 10):
        check(42 / i)
        check(i / 42)

        check(42 // i)
        check(i // 42)
