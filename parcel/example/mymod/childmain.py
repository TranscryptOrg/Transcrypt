def main():
    # # mymod.child
    # grp = 10
    # import mymod.child
    # mymod.child.child_func(grp + 1)
    # import mymod.child as alias_child
    # alias_child.child_func(grp + 2)
    # from mymod.child import child_func
    # child_func(grp + 3)
    # from mymod.child import child_func as alias_child_func
    # alias_child_func(grp + 4)

    # .child
    grp = 20
    from .child import child_func
    child_func(grp + 3)
    from .child import child_func as alias_child_func
    alias_child_func(grp + 4)
