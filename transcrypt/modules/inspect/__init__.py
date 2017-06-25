def isclass(object):
    """Return true if the object is a class."""
    return hasattr(object, '__metaclass__') and not hasattr(object, '__class__')
