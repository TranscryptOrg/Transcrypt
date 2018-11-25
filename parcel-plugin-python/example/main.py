
def main():
    # sibling py (and sibling2 because import * would override sibling_func var)
    grp = 10
    import sibling
    sibling.sibling_func(grp + 1)
    import sibling as alias_sibling
    alias_sibling.sibling_func(grp + 2)
    from sibling import sibling_func
    sibling_func(grp + 3)
    from sibling import sibling_func as alias_sibling_func
    alias_sibling_func(grp + 4)

    # siblingjs js (and siblingjs2 because import * would override siblingjs_func var)
    grp = 20
    import siblingjs
    siblingjs.siblingjs_func(grp + 1)
    import siblingjs as alias_siblingjs
    alias_siblingjs.siblingjs_func(grp + 2)
    from siblingjs import siblingjs_func
    siblingjs_func(grp + 3)
    from siblingjs import siblingjs_func as alias_siblingjs_func
    alias_siblingjs_func(grp + 4)

    # mymod package
    grp = 30
    import mymod
    mymod.mymod_func(grp + 1)
    import mymod as alias_mymod
    alias_mymod.mymod_func(grp + 2)
    from mymod import mymod_func
    mymod_func(grp + 3)
    from mymod import mymod_func as alias_mymod_func
    alias_mymod_func(grp + 4)

    # mymod.child
    grp = 40
    import mymod.child
    mymod.child.child_func(grp + 1)
    import mymod.child as alias_child
    alias_child.child_func(grp + 2)
    from mymod.child import child_func
    child_func(grp + 3)
    from mymod.child import child_func as alias_child_func
    alias_child_func(grp + 4)

    # mymod.childjs
    grp = 50
    import mymod.childjs
    mymod.childjs.childjs_func(grp + 1)
    import mymod.childjs as alias_childjs
    alias_childjs.childjs_func(grp + 2)
    from mymod.childjs import childjs_func
    childjs_func(grp + 3)
    from mymod.childjs import childjs_func as alias_childjs_func
    alias_childjs_func(grp + 4)

    # mymod.grandchildmod
    grp = 60
    import mymod.grandchildmod
    mymod.grandchildmod.grandchildmod_func(grp + 1)
    import mymod.grandchildmod as alias_grandchildmod
    alias_grandchildmod.grandchildmod_func(grp + 2)
    from mymod.grandchildmod.grandchild import grandchild_func
    grandchild_func(grp + 3)
    from mymod.grandchildmod.grandchild import grandchild_func as alias_grandchild_func
    alias_grandchild_func(grp + 4)

    # mymod.refer
    grp = 70
    from mymod.refer import refer_func
    refer_func(grp + 1)
