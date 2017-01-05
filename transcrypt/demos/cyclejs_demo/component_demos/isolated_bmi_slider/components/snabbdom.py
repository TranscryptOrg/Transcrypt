'''
this is just to allow `from snabbdom import div, input, ...`
'''

for key in 'makeDOMDriver', 'div', 'h', 'input', 'span', 'h2':
    __all__[key] = getattr(CycleDOM, key)


