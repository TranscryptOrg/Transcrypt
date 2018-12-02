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

    # childmod package (__init__.py file)
    with Test('import childmod') as test:
        import childmod
        test.result = childmod.childmod_func(test.random_num)

    with Test('import childmod as alias_childmod') as test:
        import childmod as alias_childmod
        test.result = alias_childmod.childmod_func(test.random_num)

    with Test('from childmod import childmod_func') as test:
        from childmod import childmod_func
        test.result = childmod_func(test.random_num)

    with Test('from childmod import childmod_func as alias_childmod_func') as test:
        from childmod import childmod_func as alias_childmod_func
        test.result = alias_childmod_func(test.random_num)

    # childmod.child (subdir module)
    with Test('import childmod.child') as test:
        import childmod.child
        test.result = childmod.child.child_func(test.random_num)

    with Test('alias_child.child_func') as test:
        import childmod.child as alias_child
        test.result = alias_child.child_func(test.random_num)

    with Test('from childmod.child import child_func') as test:
        from childmod.child import child_func
        test.result = child_func(test.random_num)

    with Test('from childmod.child import child_func as alias_child_func') as test:
        from childmod.child import child_func as alias_child_func
        test.result = alias_child_func(test.random_num)

    # the following are disabled right now because a deep __target__ layout is needed in Transcrypt first.
    # # childmod.childjs (subdir JS file)
    # with Test('import childmod.childjs') as test:
    #     import childmod.childjs
    #     test.result = childmod.childjs.childjs_func(test.random_num)

    # with Test('import childmod.childjs as alias_childjs') as test:
    #     import childmod.childjs as alias_childjs
    #     test.result = alias_childjs.childjs_func(test.random_num)

    # with Test('from childmod.childjs import childjs_func') as test:
    #     from childmod.childjs import childjs_func
    #     test.result = childjs_func(test.random_num)

    # with Test('from childmod.childjs import childjs_func as alias_childjs_func') as test:
    #     from childmod.childjs import childjs_func as alias_childjs_func
    #     test.result = alias_childjs_func(test.random_num)

    # childmod.grandchildmod (subdir/subdir module)
    with Test('import childmod.grandchildmod') as test:
        import childmod.grandchildmod
        test.result = childmod.grandchildmod.grandchildmod_func(test.random_num)

    with Test('import childmod.grandchildmod as alias_grandchildmod') as test:
        import childmod.grandchildmod as alias_grandchildmod
        test.result = alias_grandchildmod.grandchildmod_func(test.random_num)

    with Test('from childmod.grandchildmod.grandchild import grandchild_func') as test:
        from childmod.grandchildmod.grandchild import grandchild_func
        test.result = grandchild_func(test.random_num)

    with Test('from childmod.grandchildmod.grandchild import grandchild_func as alias_grandchild_func') as test:
        from childmod.grandchildmod.grandchild import grandchild_func as alias_grandchild_func
        test.result = alias_grandchild_func(test.random_num)
