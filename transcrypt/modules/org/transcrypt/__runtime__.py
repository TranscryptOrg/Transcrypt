# Transcrypt runtime module

#__pragma__ ('js', 'export var __envir__ = {{}};\n{}', __include__ ('org/transcrypt/__envir__.js'))
#__pragma__ ('js', '{}', __include__ ('org/transcrypt/__core__.js'))
#__pragma__ ('js', '{}', __include__ ('org/transcrypt/__builtin__.js'))

#__pragma__ ('skip')
Math = __typeof__ = __repr__ = document = console = window = 0
#__pragma__ ('noskip')
from copy import copy as _copy

#__pragma__ ('notconv')  # !!! tconv gives a problem with __terminal__, needs investigation
#__pragma__ ('nokwargs')
#__pragma__ ('noalias', 'sort')

class BaseException:
    pass

class Exception (BaseException):
    #__pragma__ ('kwargs')
    def __init__ (self, *args, **kwargs):
        self.__args__ = args
        if kwargs.error != None:
            self.stack = kwargs.error.stack # Integrate with JavaScript Error object
        elif Error:
            self.stack = (__new__(Error())).stack # Create our own stack if we aren't given one
        else:
            self.stack = 'No stack trace available'
    #__pragma__ ('nokwargs')
        
    def __repr__ (self):
        if len (self.__args__) > 1:
            return '{}{}'.format (self.__class__.__name__, repr (tuple (self.__args__)))
        elif len (self.__args__):
            return '{}({})'.format (self.__class__.__name__, repr (self.__args__ [0]))        
        else:
            return '{}()'.format (self.__class__.__name__)
            
    def __str__ (self):
        if len (self.__args__) > 1:
            return str (tuple (self.__args__))
        elif len (self.__args__):
            return str (self.__args__ [0])
        else:
            return ''
        
class IterableError (Exception):
    def __init__ (self, error):
        Exception.__init__ (self, 'Can\'t iterate over non-iterable', error = error)
            
class StopIteration (Exception):
    def __init__ (self, error):
        Exception.__init__ (self, 'Iterator exhausted', error = error)
        
class ValueError (Exception):
    def __init__ (self, message, error):
        Exception.__init__ (self, message, error = error)
    
class KeyError (Exception):
    def __init__ (self, message, error):
        Exception.__init__ (self, message, error = error)
    
class AssertionError (Exception):
    def __init__ (self, message, error):
        if message:
            Exception.__init__ (self, message, error = error)
        else:
            Exception.__init__ (self, error = error)

class NotImplementedError (Exception):
    def __init__(self, message, error):
        Exception.__init__(self, message, error = error)

class IndexError (Exception):
    def __init__(self, message, error):
        Exception.__init__(self, message, error = error)

class AttributeError (Exception):
    def __init__(self, message, error):
        Exception.__init__(self, message, error = error)

class TypeError (Exception):
    def __init__(self, message, error):
        Exception.__init__(self, message, error = error)

# Warnings Exceptions
# N.B. This is a limited subset of the warnings defined in
# the cpython implementation to keep things small for now.

class Warning (Exception):
    ''' Warning Base Class
    '''
    pass

class UserWarning (Warning):
    pass

class DeprecationWarning (Warning):
    pass

class RuntimeWarning (Warning):
    pass
    
#__pragma__ ('kwargs')

def _sort(iterable, key = None, reverse = False):                # Used by py_sort and sorted, can deal with kwargs
    # if len(iterable) == 0:
    #     return
    #
    # # Make sure iterable value types can be compared --> imperfect implementation not worth bloating the runtime?
    # num_types = ('int', 'float', 'bool')
    # t_first_val = type(iterable[0]).__name__
    # t = num_types if t_first_val in num_types else tuple([t_first_val])
    # for v in iterable:
    #     if type(v).__name__ not in t:
    #         raise TypeError(f"'<' not supported between instances of {type(iterable[0]).__name__} and {type(v).__name__}", None)

    if key:
        iterable.sort (lambda a, b: -1 if key (a) < key (b) else 1) # JavaScript sort, case '==' is irrelevant for sorting
    else:
        iterable.sort (lambda a, b: -1 if a < b else 1)             # JavaScript sort -  key needed to properly sort non-string values

    if reverse:
        iterable.reverse ()


def sorted(iterable, *, key=None, reverse=False):
    if type(iterable) == dict:
        result = _copy(iterable.keys())
    else:
        result = _copy(iterable)

    _sort(result, key, reverse)
    return result


# Used by py_sort
def __sort__(iterable, *, key=None, reverse=False):
    _sort(iterable, key, reverse)

#__pragma__ ('nokwargs')

def map(func, *iterables):
    return [func(*items) for items in zip(*iterables)]

def filter(func, iterable):
    if func == None:
        func = bool
    return [item for item in iterable if func (item)]
    
def divmod (n, d):
    return n // d, n % d
    
#__pragma__ ('ifdef', '__complex__')

class complex:
    def __init__ (self, real, imag = None):
        if imag == None:
            if type (real) == complex:
                self.real = real.real
                self.imag = real.imag
            else:
                self.real = real
                self.imag = 0
        else:
            self.real = real
            self.imag = imag
            
    def __neg__ (self):
        return complex (-self.real, -self.imag)
        
    def __exp__ (self):
        modulus = Math.exp (self.real)
        return complex (modulus * Math.cos (self.imag), modulus * Math.sin (self.imag))
    
    def __log__ (self):
        return complex (Math.log (Math.sqrt (self.real * self.real + self.imag * self.imag)), Math.atan2 (self.imag, self.real))
        
    def __pow__ (self, other):  # a ** b = exp (b log a)
        return (self.__log__ () .__mul__ (other)) .__exp__ ()
        
    def __rpow__ (self, real):  # real ** comp -> comp.__rpow__ (real)
        return self.__mul__ (Math.log (real)) .__exp__ ()
        
    def __mul__ (self, other):
        if __typeof__ (other) is 'number':
            return complex (self.real * other, self.imag * other)
        else:
            return complex (self.real * other.real - self.imag * other.imag, self.real * other.imag + self.imag * other.real)
        
    def __rmul__ (self, real):  # real + comp -> comp.__rmul__ (real)
        return complex (self.real * real, self.imag * real)
        
    def __div__ (self, other):
        if __typeof__ (other) is 'number':
            return complex (self.real / other, self.imag / other)
        else:
            denom = other.real * other.real + other.imag * other.imag
            return complex (
                (self.real * other.real + self.imag * other.imag) / denom,
                (self.imag * other.real - self.real * other.imag) / denom
            )
        
    def __rdiv__ (self, real):  # real / comp -> comp.__rdiv__ (real)
        denom = self.real * self.real
        return complex (
            (real * self.real) / denom,
            (real * self.imag) / denom
        )
        
    def __add__ (self, other):
        if __typeof__ (other) is 'number':
            return complex (self.real + other, self.imag)
        else:   # Assume other is complex
            return complex (self.real + other.real, self.imag + other.imag)
        
    def __radd__ (self, real):  # real + comp -> comp.__radd__ (real)
        return complex (self.real + real, self.imag)
        
    def __sub__ (self, other):
        if __typeof__ (other) is 'number':
            return complex (self.real - other, self.imag)
        else:
            return complex (self.real - other.real, self.imag - other.imag)
        
    def __rsub__ (self, real):  # real - comp -> comp.__rsub__ (real)
        return complex (real - self.real, -self.imag)
        
    def __repr__ (self):
        return '({}{}{}j)'.format (self.real, '+' if self.imag >= 0 else '', self.imag)
            
    def __str__ (self):
        return __repr__ (self) [1 : -1]
        
    def __eq__ (self, other):
        if __typeof__ (other) is 'number':
            return self.real == other
        else:
            return self.real == other.real and self.imag == other.imag
        
    def __ne__ (self, other):
        if __typeof__ (other) is 'number':
            return self.real != other
        else:
            return self.real != other.real or self.imag != other.imag
        
    def conjugate (self):
        return complex (self.real, -self.imag)
        
def __conj__ (aNumber):
    if isinstance (aNumber, complex):
        return complex (aNumber.real, -aNumber.imag)
    else:
        return complex (aNumber, 0)
        
#__pragma__ ('endif')

class __Terminal__:
    '''
    Printing to either the console or to html happens async, but is blocked by calling window.prompt.
    So while all input and print statements are encountered in normal order, the print's exit immediately without yet having actually printed
    This means the next input takes control, blocking actual printing and so on indefinitely
    The effect is that everything's only printed after all inputs are done
    To prevent that, what's needed is to only execute the next window.prompt after actual printing has been done
    Since we've no way to find out when that is, a timeout is used.
    '''

    def __init__ (self):
        self.buffer = ''
    
        try:
            self.element = document.getElementById ('__terminal__')
        except:
            self.element = None
            
        if self.element:
            self.element.style.overflowX = 'auto'
            self.element.style.boxSizing = 'border-box'
            self.element.style.padding = '5px'
            self.element.innerHTML = '_'
        
    #__pragma__ ('kwargs')
        
    def print (self, *args, sep = ' ', end = '\n'):
        self.buffer = '{}{}{}'.format (self.buffer, sep.join ([str (arg) for arg in args]), end) [-4096 : ] 
        
        if self.element:
            self.element.innerHTML = self.buffer.replace ('\n', '<br>') .replace (' ', '&nbsp')
            self.element.scrollTop = self.element.scrollHeight
        else:
            console.log (sep.join ([str (arg) for arg in args]))
        
    def input (self, question):
        self.print ('{}'.format (question), end = '')
        answer = window.prompt ('\n'.join (self.buffer.split ('\n') [-8:]))
        self.print (answer)
        return answer
        
    #__pragma__ ('nokwargs')
    
__terminal__ = __Terminal__ ()

print = __terminal__.print
input = __terminal__.input
