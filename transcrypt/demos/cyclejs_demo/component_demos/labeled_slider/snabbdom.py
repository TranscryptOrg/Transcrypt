'''
this is just to allow `from snabbdom import div, input, ...`
'''

''' Transcrypt 3.6 legacy
for key in 'makeDOMDriver', 'div', 'h', 'input', 'span':
    __all__[key] = getattr(CycleDOM, key)
'''

"""
__pragma__ ('js', '{}', '''
export {makeDOMDriver, div, h, input, span}
''')
"""

