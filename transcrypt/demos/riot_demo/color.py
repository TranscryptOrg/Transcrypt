# Producing a linear chain of style defs from a nested declaration of
# color funcs
msgs   = []
styles = []

debug = 0
def _recurse(col, g, *s):
    msgs, styles, hsl = g
    lu = (('color', 0), ('background-color', 1))
    hsl = hsl[col]
    hsl = [hsl[:3], [hsl[0], hsl[1], hsl[3]]]
    css = ';'.join(
        [str(i) + ': hsl({}, {}%, {}%)'.format(*hsl[j]) for i, j in lu])
    for i in s:
        if debug:
            styles.append(col)
        else:
            styles.append(css)

        # empty string which we are replacing with value below, if not color
        # function follows
        msgs.append('%c')
        try:
            # can be another color function.. (triggering the recursion)
            i(g)
        except:
            # ... or normal output - in the current color
            msgs.pop() # TODO: msgs[-1] = ... instead pop() + append
            msgs.append('%c{}'.format(i))

# offering public, maybe of use. turned in _recurse into [fg, bg]
# like red=[[0, 100, 90],[0, 100, 50]]
hsl = {'red'     : [  0, 100, 90, 50],
       'orange'  : [ 39, 100, 85, 50],
       'yellow'  : [ 60, 100, 35, 50],
       'green'   : [120, 100, 60, 25],
       'blue'    : [240, 100, 90, 50],
       'purple'  : [300, 100, 85, 25],
       'black'   : [  0,   0, 80,  0],
       'gray'    : [237,   8, 80, 50],
       }

# generating the actual color functions, for each color:
# right now we only now the color, later msgs and styles buffers:
def _col(col): return lambda *parts: lambda g: _recurse(col, g, *parts)

# TODO globals() not yet, so will import this in the clients:
colors = {}
# TODO .keys() currently necessary, should be easy to fix:
for col in hsl.keys():
    colors[col] = _col(col)

def cprint(*s):
    msgs, styles = [], []
    for i in s:
        i((msgs, styles, hsl))
    if debug:
        for i in range(len(msgs)):
            print (msgs[i], '-> ', styles[i])
    else:
        msg = ''.join(msgs)
        # FIXME this *crazy* eval is required since console.apply
        # is patched in Transcrypt
        st = '", "'.join(styles)
        st = ''.join(("console.log(\"", msg, '", "' + st + '")'))
        __pragma__('js', '{}', 'eval(st)')

# TODO if __name__ == '__main__' not works, could be cool for quicktests on the
# server
#     B, R, G = colors['blue'], colors['red'], colors['green']
#     cprint(B('b1', 'b2', 'b3', R('r1', G('g2'), G('ga', 'gb'), 'r2'), 'b2'))

