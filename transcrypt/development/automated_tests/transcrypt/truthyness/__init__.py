from org.transcrypt.stubs.browser import __pragma__

__pragma__ ('tconv')

def run (autoTester):
    autoTester.check (len ({1:2}))

    autoTester.check ('Select nonemtpy container, if any<br>')

    autoTester.check ((0) or (1, 2, 3))
    autoTester.check (() or (1, 2, 3))
    autoTester.check (() or ())
    
    autoTester.check ((-1) or (0) or (1, 2, 3))
    autoTester.check (() or (0) or (1, 2, 3))
    autoTester.check (() or () or (1, 2, 3))
    autoTester.check (() or () or ())
    
    autoTester.check ([0] or [1, 2, 3])
    autoTester.check ([] or [1, 2, 3])
    autoTester.check ([] or [])
    
    autoTester.check ([-1] or [0] or [1, 2, 3])
    autoTester.check ([] or [0] or [1, 2, 3])
    autoTester.check ([] or [] or [1, 2, 3])
    autoTester.check ([] or [] or [])
    
    autoTester.check ({0} or {1, 2, 3, 4})
    autoTester.check (set () or {1, 2, 3, 4})
    autoTester.check (set () or set ())
    
    autoTester.check ({-1} or {0} or {1, 2, 3, 5})
    autoTester.check (set () or {0} or {1, 2, 3, 6})
    autoTester.check (set () or set () or {1, 2, 3, 7})
    autoTester.check (set () or set () or set ())
    
    autoTester.check ({0:10} or {1:11, 2:12, 3:13})
    autoTester.check ({} or {1, 2, 3, 8})
    autoTester.check ({} or {})
    
    autoTester.check ({-1:-11} or {0:10} or {1:11, 2:12, 3:13})
    autoTester.check ({} or {0:10} or {1:11, 2:12, 3:13})
    autoTester.check ({} or {} or {1:11, 2:12, 3:13})
    autoTester.check ({} or {} or {})
    
    autoTester.check ('<br><br>')
    autoTester.check ('Boolean evaluations')
    for expression in (
        '<br> -- falsy -- <br>',
        (),
        [],
        set (),
        {},
        0,
        '',
        3 > 5,
        False,
        '<br> -- truthy -- <br>',
        (1, 2, 3),
        [1, 2, 3],
        {1, 2, 3},
        {'a': 1, 'b': 2, 'c': 3},
        3,
        'hello',
        5 > 3,
        True
    ):
        if expression in ('<br> -- falsy -- <br>', '<br> -- truthy -- <br>'):
            autoTester.check (expression)
        else:
            autoTester.check (expression, ' . . . ')
            autoTester.check ('operators')
            autoTester.check (not not expression)
            autoTester.check (not not (True and expression))
            autoTester.check (not not (False or expression))
            autoTester.check (not not (expression and True))
            autoTester.check (not not (expression and False))
            
            autoTester.check ('if')
            if expression:
                autoTester.check (True)
            else:
                autoTester.check (False)
                
            if expression or expression:
                autoTester.check (True)
            else:
                autoTester.check (False)
                
            if False:
                autoTester.check ('if')
            elif expression:
                autoTester.check ('elif')
            else:
                autoTester.check ('else')
                
            autoTester.check ('while')
            while expression:
                autoTester.check (True)
                break
                
            autoTester.check ('condex')
            autoTester.check (True if expression else False)
            
    if (0.0):
        autoTester.check ('0.0')
    elif (0.1):
        autoTester.check ('0.1')
    else:
        autoTester.check ('Shouldn\'t be here...')
        
    class A:
        pass
        
    class B:
        def __bool__ ( self):
            return False

    class C:
        def __bool__ (self):
            return True

        def __len__ (self):
            return 0

    class D:
        def __len__ (self):
            return 0

    class E:
        def __len__ (self):
            return 1

    autoTester.check ('instances of custom classes')
    autoTester.check (not not A ())
    autoTester.check (not not B ())
    autoTester.check (not not C ())
    autoTester.check (not not D ())
    autoTester.check (not not E ())
    
