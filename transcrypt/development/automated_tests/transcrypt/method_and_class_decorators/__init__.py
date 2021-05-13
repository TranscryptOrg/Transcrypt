from org.transcrypt.stubs.browser import __pragma__

def run (autoTester):

    class adecorator:
        __pragma__('kwargs')
        def __init__(self, *args, **kwargs):
            self.args = args
            self.kwargs = kwargs
        __pragma__('nokwargs')

        def __call__(self, func):
            __pragma__('kwargs')
            def wrapper(*args, **kwargs):
                slf = args[0]

                # replace and store the attributes
                saved = {}
                for k, v in self.kwargs.items():
                    if hasattr(slf, k):
                        saved[k] = getattr(slf, k)
                        setattr(slf, k, v)

                # call the method
                ret = func(*args, **kwargs)

                # put things back
                for k, v in saved.items():
                    setattr(slf, k, v)

                return ret

            __pragma__('nokwargs')
            return wrapper

    def method_decorator(prefix):
        def inner_decorator(method):
            def wrapper(self, name):
                autoTester.check(name)
                return method(self, prefix + name)
            return wrapper
        return inner_decorator

    def method_decorator2(prefix):
        def inner_decorator(method):
            def wrapper(self, name):
                autoTester.check(name)
                return method(self, prefix + name)
            return wrapper
        return inner_decorator

    def multiplier(m):
        def inner_decorator(method):
            def wrapper(self, num):
                autoTester.check(num)
                n = method(self, num)
                return n * m
            return wrapper
        return inner_decorator

    def classmethod_decorator(method):

        def wrapper(cls, a, b):
            autoTester.check(cls.__name__, a, b)
            return method(cls, b, a)

        return wrapper

    def class_decorator(prefix):

        def wrapper(cls):
            autoTester.check(prefix + cls.__name__)
            return cls

        return wrapper

    @class_decorator('outer_')
    class MyClass:

        @class_decorator('inner_')
        class InnerClass:
            @method_decorator('inner_first_')
            @method_decorator2('inner_second_')
            def mymethod(self, name):
                autoTester.check(name)

            @classmethod
            @classmethod_decorator
            def myclassmethod(cls, a, b):
                autoTester.check(cls.__name__, a, b)
                return a + b

            @staticmethod
            def mystaticmethod(a, b):
                autoTester.check(a, b)
                return a + b

            @property
            def inner_property(self):
                return 'I am a property'

        def __init__(self):
            self.greetings = 'Hello'

        __pragma__('opov')
        @adecorator(greetings='Goodbye')
        def get_greetings(self):
            return self.greetings
        __pragma__('noopov')

        @method_decorator('first_')
        @method_decorator2('second_')
        def mymethod(self, name):
            autoTester.check(name)

        @multiplier(5)
        def number(self, num):
            return num

        @classmethod
        def myclassmethod(cls, a, b):
            autoTester.check(cls.__name__, a, b)
            return a + b

        @staticmethod
        def mystaticmethod(a, b):
            autoTester.check(a + b)
            return a + b

        @property
        def simple_property(self):
            return self.greetings

        @simple_property.setter
        def simple_property(self, value):
            self.greetings = value

        def run(self):
            inner_obj = self.InnerClass()
            inner_obj.mymethod('Dog')
            result1 = inner_obj.myclassmethod('param1', 'param2')
            result2 = self.InnerClass.myclassmethod('param1', 'param2')
            autoTester.check(result1 == result2)
            result1 = inner_obj.mystaticmethod('param1', 'param2')
            result2 = self.InnerClass.mystaticmethod('param1', 'param2')
            autoTester.check(result1 == result2)
            autoTester.check(inner_obj.inner_property)

    myobj = MyClass()
    myobj.mymethod('Cat')
    autoTester.check(myobj.greetings)
    autoTester.check(myobj.get_greetings())
    result1 = myobj.myclassmethod('param1', 'param2')
    result2 = MyClass.myclassmethod('param1', 'param2')
    autoTester.check(result1 == result2)
    result1 = myobj.mystaticmethod('param1', 'param2')
    result2 = MyClass.mystaticmethod('param1', 'param2')
    autoTester.check(result1 == result2)
    autoTester.check(myobj.number(3))
    autoTester.check(myobj.simple_property)
    myobj.simple_property = 'New value'
    autoTester.check(myobj.simple_property)
    autoTester.check(myobj.greetings == myobj.simple_property)
    myobj.run()
