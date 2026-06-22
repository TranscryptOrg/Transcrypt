def isclass(object):
    """Return true if the object is a class."""
    return hasattr(object, '__metaclass__') and not hasattr(object, '__class__')


def _searchbases(cls, accum):
    # Simulate the "classic class" search order.
    if cls in accum:
        return
    accum.append(cls)
    for base in cls.__bases__:
        _searchbases(base, accum)


def getmro(cls):
    "Return tuple of base classes (including cls) in method resolution order."
    result = []
    _searchbases(cls, result)
    return tuple(result)
