# Parent Class for a Transcrypt Riot Tag
#
# This binds the namespace of a riot tag at before-mount event 100% to that of
# the a transcrypt instance, except members which begin with an underscore, those
# are private to the transcrypt object.
#
# The 4 riot lifecycle events are bound to overwritable python functions.
#
# Immutables (strings, ints, ...) are bound to property functions within the tag,
# so the templates work, based on state in the transcrypt tag.
# State can be changed in the riot tag as well but take care to not create new
# references - you won't find them in the Transcrypt tag.
#
#
# Best Practices:
#  - mutate state only in the transcrypt tag.
#  - declare all variables so they are bound into the riot tag
#  - IF you declare new variables to be used in templates, run
#    self.bind_vars(self.riot_tag)
# TODO: docstring format not accepted by the transpiler, strange.

__author__ = "Gunther Klessinger, gk@axiros.com, Germany"

# just a minihack to get some colors, mainly to test lamdas and imports:
from color import colors, cprint as col_print
c = colors
M, I, L, R, B = c['purple'], c['orange'], c['gray'], c['red'], c['black']

lifecycle_ev = ['before-mount', 'mount', 'update', 'unmount']

cur_tag_col = 0
class RiotTag:
    """
    taking care for extending the riot tag obj with
    functions and immutable(!) properties of derivations of us
    See counter.
    """
    debug = None
    # placeholders:
    template = '<h1>it worx</h1>'
    style = ''
    node_name = 'unmounted'
    opts = None
    def __init__(self, tag, opts):
        # opts into the python instance, why not:
        self.opts = opts
        self._setup_tag(tag)
        # giving ourselves a unique color:
        global cur_tag_col # working (!)
        cur_tag_col = (cur_tag_col + 1) % len(colors)
        # TODO values() on a dict
        self.my_col = colors.items()[cur_tag_col][1]

    def _setup_tag(self, tag):
        # keeping mutual refs
        tag.py_obj = self
        self.riot_tag = tag
        # making the event system call self's methods:
        handlers = {}
        for ev in lifecycle_ev:
            f = getattr(self, ev.replace('-', '_'))
            if f:
                # this.on('mount', function() {...}):
                # whats nicer?
                tag.on(ev, f)

    def pp(self, *msg):
        # color flash in the console. one color per tag instance.
        col_print(
            #B(self.riot_tag._riot_id),
            L('<', self.my_col(self.node_name, self.my_col), '/> '),
            M(' '.join([s for s in msg])))

    def _lifecycle_ev(self, mode):
        if self.debug:
            self.pp(mode + 'ing')

    # overwrite these for your specific one:
    def update (self): self._lifecycle_ev('update')
    def mount  (self): self._lifecycle_ev('mount')
    def unmount(self): self._lifecycle_ev('unmount')

    def before_mount(self):
        self._lifecycle_ev('before-mount')
        return self.bind_vars()

    def bind_vars(self):
        tag = self.riot_tag
        self.node_name = tag.root.nodeName.lower()
        self.debug and self.pp('binding vars')
        # binding self's functions into the tag instance
        # binding writable properties to everything else (e.g. ints, strs...)
        tag._immutables = im = []
        lc = lifecycle_ev
        for k in dir(self):
            # private or lifecycle function? don't bind:
            if k[0] == '_' or k in lifecycle_ev or k == 'before_mount':
                continue
            v = getattr(self, k)
            # these I can't write in python. Lets use JS then.
            # TODO there should be, maybe some mocking facility for code
            # testing w/o a js runtime:
            __pragma__('js', '{}', '''
                  typeof v === "function" || typeof v === "object" ?
                  tag[k] = self[k] : tag._immutables.push(k)''')

        __pragma__('js', '{}', '''
        var i = tag._immutables, py = self
        i.forEach(function(k, j, i) {
            Object.defineProperty(tag, k, {
                get: function()  { return self[k]},
                set: function(v) { self[k] = v }
            })
        })''')

