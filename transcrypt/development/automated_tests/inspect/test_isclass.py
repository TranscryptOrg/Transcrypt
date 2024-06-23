import inspect

class SimpleClass:
    pass

def simple_function():
    pass

def run(test):
    test.check(inspect.isclass(42))
    test.check(inspect.isclass(42.0))
    test.check(inspect.isclass('foo'))

    simple_class = SimpleClass()
    test.check(inspect.isclass(SimpleClass))
    test.check(inspect.isclass(simple_class))
    test.check(inspect.isclass(SimpleClass()))

    test.check(inspect.isclass(simple_function))
    test.check(inspect.isclass(simple_function()))
