# Also contains small enhancements

'This is a single line docstring'
class A:
    '''
    This
    is 
    a 
    multiline
    docstring
    '''
    def __init__ (self, x):
        'This is a single line comment'
        self.x = x
        '''
        This
        is 
        a 
        multiline
        docstring
        '''
    'This is a single line docstring'
'''
This
is 
a 
multiline
docstring
'''

a = A (5.5)

def run (autoTester):   
    autoTester.check ('Pull 56')
    s = 'abcdefghij'
    autoTester.check (s [2:3])
    autoTester.check (s [:3])
    autoTester.check (s [2:])
    autoTester.check (s [::2])
    
    autoTester.check ('Pull 59')
    autoTester.check (list (filter (lambda x: x % 2 == 0, range (10))))
    autoTester.check (list (map (lambda x: x*x, range (0, 31, 3))))
    
    