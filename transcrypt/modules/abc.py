# noqa


class ABCMeta:
    """Stub allowing us to do ``class MyClass(metaclass=ABCMeta)``."""

    def __new__(cls, name, bases, dct):  # noqa
        return type.__new__(cls, name, bases, dct)
