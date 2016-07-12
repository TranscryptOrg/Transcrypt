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
__date__ = "$Date: 2016-07-11 02:17:51 +0100 $"

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
    node_name = '<no node>'
    opts = None
    def __init__(self, tag, opts):
        # opts into the python instance, why not:
        self.opts = opts
        self._setup_tag(tag)

    def _setup_tag(self, tag):
        # keeping mutual refs
        tag.py_obj = self
        self.riot_tag = tag
        # making the event system call self's methods:
        __pragma__('js', '{}', '''
        var evs = ['before-mount', 'update', 'mount', 'unmount']
        evs.forEach(function(k, i, evs) {
            var k1 = k.replace('-', '_')
            tag.on(k, function () {self[k1](this)})
        })''')

    def pp(self, *msg):
        print (self.node_name, msg)

    def _lifecycle_ev(self, mode):
        if self.debug:
            self.pp(mode + 'ing')
    # overwrite these for your specific one:
    def update      (self, tag): self._lifecycle_ev('update')
    def mount       (self, tag): self._lifecycle_ev('mount')
    def unmount     (self, tag): self._lifecycle_ev('unmount')

    def before_mount(self, tag):
        self._lifecycle_ev('before-mount')
        return self.bind_vars(tag)

    def bind_vars(self, tag):
        self.node_name = tag.root.nodeName
        self.debug and self.pp('binding vars')
        # binding self's functions into the tag instance
        # binding writable properties to everything else (e.g. ints, strs...)
        __pragma__('js', '{}', '''
        tag._immutables = []
        var nobind = [ 'update', 'mount', 'before_mount', 'unmount']
        for (var k in self) if (k.indexOf('_') != 0 && nobind.indexOf(k) ==-1){
            var v = self[k]
            typeof v === 'function' ? tag[k] = self[k] :
                                      tag._immutables.push(k)
            }
        var i = tag._immutables, py = self
        i.forEach(function(k, j, i) {
            Object.defineProperty(tag, k, {
                get: function()  { return self[k]},
                set: function(v) { self[k] = v }
            })
        })
        ''')
