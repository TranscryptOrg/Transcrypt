from org.transcrypt.stubs.browser import __pragma__

def run (autoTester):
    class CodedStore:
        def __init__ (self):
            try:
                __pragma__ ('js', '{}', 'self ["__dict__"] = {}')
            except:
                pass

        def __setattr__ (self, name, message):
            self.__dict__ ['_' + name] = 'coded_' + message

        def __getattr__ (self, name):
            return 'decoded_' + self.__dict__ ['_' + name]
            
        def peek (self, name):
            return self.__dict__ ['_' + name]
            
    s = CodedStore ()

    s.john = 'brown'
    s.mary = 'white'

    autoTester.check (s.peek ('john'))
    autoTester.check (s.peek ('mary'))

    autoTester.check (s.john)
    autoTester.check (s.mary)
    
    '''
    The code above produces the following output:
        'coded_brown'
        'coded_white'
        'decoded_coded_brown'
        'decoded_coded_white'
    '''

    class A:
        def __init__ (self):
            self.p = 1
            self.q = 2
            
    class B (A):
        def __getattr__ (self, name):
            return 'Faked {}'.format (name)
            
    class C (A):
        def __setattr__ (self, name, value):
            autoTester.check ('Set faked {}'.format (name))
            
            A.__setattr__ (self, name, value)
            # Needed for CPython, inherited from class 'object'
            # Transcrypt doesn't need it, if there's no __setattrib__ it will just use self [name] = value
    
    class D (B, C):
        pass
        
    a = A ()
    b = B ()
    c = C ()
    d = D ()
    
    autoTester.check (a.p, a.q)
    a.p = 3
    autoTester.check (a.p, a.q)
    
    autoTester.check (b.p, b.q, b.r, b.s)
    b.p = 4
    b.r = 5
    autoTester.check (b.p, b.q, b.r, b.s)
    
    autoTester.check (c.p, c.q)
    c.p = 6
    c.q = 7
    autoTester.check (c.p, c.q)

    autoTester.check (d.p, d.q, d.r, d.s)
    d.p = 8
    d.q = 9
    d.r = 10
    d.s = 11
    autoTester.check (d.p, d.q, d.r, d.s)  

    # Issue 587, code as utilized by pjbonestro

    autoTester.check ("Issue 587")

    class Element():
        def __init__(self):
            self.message = "Goodbye"

        def sayBye(self):
            autoTester.check (self.message)

    class Wrapper():
        def __init__ (self, element):
            self.element = element

        def __setattr__ (self, name, value):
            """ set attribute on element if it already has the attribute """
            if name != "element" and hasattr(self.element, name):
                setattr(self.element, name, value)
            else:
                self.__dict__[name] = value

        def __getattr__ (self, name):
            """ get attribute from element if this object doesn't have the attribute """
            result = getattr(self.element, name)
            # if result is a function, bind self.element to it
            if hasattr(result, 'call') and hasattr(result, 'bind'):
                result = result.bind(self.element)
            return result

        def sayHello(self):
            autoTester.check("Hello")
            return self


    e = Element()
    w = Wrapper(e)

    #
    # Usage
    #

    e.sayBye()
    w.sayBye() # call functions on e, using w

    # and method chaining should work:
    w.sayHello().sayBye()  
    
    w.message = "Bye" # set attributes on e, using w
    
    e.sayBye()
    w.sayBye() # call functions on e, using w

    # and method chaining should work:
    w.sayHello().sayBye()  
    
    autoTester.check ("End issue 587")

    # End of issue 587
    
