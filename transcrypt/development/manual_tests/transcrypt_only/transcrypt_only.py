from random import *

result = ''

def output (*any):
    for item in any:
        result += str (item)
        result += ' '
    result += '<br>\n'

output ('Issue 96') # Proposal: Allow `in`, when container is an object

class Tolerant:
    a = 3
    
    @classmethod
    def f (cls):
        pass
        
    def __init__ (self):
        self.b = 4
        
    def g (self):
        pass
        
tolerant = Tolerant ()  # Unexpected *args and **kwargs behaviour

output ('T', 'a' in Tolerant)
output ('T', 'f' in Tolerant)
output ('F', 'b' in Tolerant)
output ('T', 'g' in Tolerant)
output ('F', 'h' in Tolerant)

output ('F', 'a' in tolerant)
output ('F', 'f' in tolerant)
output ('T', 'b' in tolerant)
output ('F', 'g' in tolerant)
output ('F', 'h' in tolerant)

output ('<br>Issue 102')
__pragma__ ('js', '{}', '''
        function Example () {};
        Example.prototype.foo = function () {output (this, arguments);};

        var example = new Example();
        example.foo(1, 2, 3);
        // Works as expected:
        // Object {  } Arguments { , 5 more… }
        
''')

args = [1, 2, 3]
example = __new__ (Example ())
example.foo (1, 2, 3)   # Correct for JavaScript 5 and up
example.foo (*args)     # For JavaScript < 6 this is transcribed to example.foo.call (null, args), "foo" context is lost

__pragma__ ('ifdef', '__esv6__')
output ('[object Object] rather than null in previous line')
__pragma__ ('else')
output ('None rather than [object Object] in previous line')
__pragma__ ('endif')

output ('<br>Issue 130')    # Add pragma to optionally handle % the JS way

x = -3 % 8

__pragma__ ('js', '{}', '''
    var y = -3 % 8
''')

__pragma__ ('jsmod')
z = -3 % 8 
__pragma__ ('nojsmod')

output (x, ' != ', y, '==', z)

document.getElementById ('output') .innerHTML = result
