from __future__ import nested_scopes

def run(test):

    def foo():
        x = 42

        def bar():
            test.check(x)

        bar()

    foo()
    
