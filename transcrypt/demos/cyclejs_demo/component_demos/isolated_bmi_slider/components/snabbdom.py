'''
this is just to allow `from snabbdom import div, input, ...`
'''

div = CycleDOM.div
input = CycleDOM.input
span = CycleDOM.span

#!!! TODO: The globals () function can be made suitable to deal with this kind of transits.
# Retrospecively it can define exportable global names that aren't in allOwnNames initially and add them there.
# They will be treated like any global, including exporting them.
# Although this example isn't a very urgent usecase, this improvement enables globals () to really define globals,
# rather then only use them, which is desirable in its own right, and matches CPython.
