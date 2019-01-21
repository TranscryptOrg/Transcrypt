from testcontext import Test

def main():
    '''Main function of the program (called from index.js)'''
    # sibling module
    with Test('import sibling') as test:
        import sibling
        test.result = sibling.sibling_func(test.random_num)

    with Test('import sibling as alias_sibling') as test:
        import sibling as alias_sibling
        test.result = alias_sibling.sibling_func(test.random_num)

    with Test('from sibling import sibling_func') as test:
        from sibling import sibling_func
        test.result = sibling_func(test.random_num)

    with Test('from sibling import sibling_func as alias_sibling_func') as test:
        from sibling import sibling_func as alias_sibling_func
        test.result = alias_sibling_func(test.random_num)

    # sibling2 module (using sibling2 because `import * from sibling` would overrride sibling_func above)
    with Test('from sibling2 import *') as test:
        from sibling2 import *
        test.result = sibling2_func(test.random_num)

    # siblingjs.js (Javascript file import)
    with Test('import siblingjs') as test:
        import siblingjs
        test.result = siblingjs.siblingjs_func(test.random_num)

    with Test('import siblingjs as alias_siblingjs') as test:
        import siblingjs as alias_siblingjs
        test.result = alias_siblingjs.siblingjs_func(test.random_num)

    with Test('from siblingjs import siblingjs_func') as test:
        from siblingjs import siblingjs_func
        test.result = siblingjs_func(test.random_num)

    with Test('from siblingjs import siblingjs_func as alias_siblingjs_func') as test:
        from siblingjs import siblingjs_func as alias_siblingjs_func
        test.result = alias_siblingjs_func(test.random_num)

    # mymod package (__init__.py file)
    with Test('import mymod') as test:
        import mymod
        test.result = mymod.mymod_func(test.random_num)

    with Test('import mymod as alias_mymod') as test:
        import mymod as alias_mymod
        test.result = alias_mymod.mymod_func(test.random_num)

    with Test('from mymod import mymod_func') as test:
        from mymod import mymod_func
        test.result = mymod_func(test.random_num)

    with Test('from mymod import mymod_func as alias_mymod_func') as test:
        from mymod import mymod_func as alias_mymod_func
        test.result = alias_mymod_func(test.random_num)

    # mymod.child (subdir module)
    with Test('import mymod.child') as test:
        import mymod.child
        test.result = mymod.child.child_func(test.random_num)

    with Test('alias_child.child_func') as test:
        import mymod.child as alias_child
        test.result = alias_child.child_func(test.random_num)

    with Test('from mymod.child import child_func') as test:
        from mymod.child import child_func
        test.result = child_func(test.random_num)

    with Test('from mymod.child import child_func as alias_child_func') as test:
        from mymod.child import child_func as alias_child_func
        test.result = alias_child_func(test.random_num)

    with Test('import mymod.grandchildmod') as test:
        import mymod.grandchildmod
        test.result = mymod.grandchildmod.grandchildmod_func(test.random_num)

    with Test('import mymod.grandchildmod as alias_grandchildmod') as test:
        import mymod.grandchildmod as alias_grandchildmod
        test.result = alias_grandchildmod.grandchildmod_func(test.random_num)

    with Test('from mymod.grandchildmod.grandchild import grandchild_func') as test:
        from mymod.grandchildmod.grandchild import grandchild_func
        test.result = grandchild_func(test.random_num)

    with Test('from mymod.grandchildmod.grandchild import grandchild_func as alias_grandchild_func') as test:
        from mymod.grandchildmod.grandchild import grandchild_func as alias_grandchild_func
        test.result = alias_grandchild_func(test.random_num)
