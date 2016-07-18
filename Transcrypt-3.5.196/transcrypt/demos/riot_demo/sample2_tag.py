# an example user tag, using RiotTag

from riot_tag import RiotTag

class P(RiotTag):
    debug = 1
    # never do mutables on class level. this is just to check if transpiler
    # creates the same behaviour - and it does, a second tag instance gets
    # the same lv object:
    lv = [{'name': 'n0'}]
    # immuatble on class level. does a second instance start at 1?
    # answer: yes, perfect:
    counter = 1

    template = ''' <div><h1>Riot Transcrypt Tag Instance {label}</h1>
                         <div>INNER</div></div> '''
    def count_up(self):
        self.counter = self.counter + 1
        self.pp('counter:', self.counter, 'len lv:', len(self.lv), 'adding one lv' )
        self.lv.append({'name': 'n' + self.counter})
        return self.counter

# try some inheritence...
class Sample2(P):
    # ... and change the state at every update, just for fun:
    template = P.template.replace('INNER', '''
    <div>
    <h5 each="{lv}">name: {name} - counter: {count_up()}</h5>
    </div>
    ''')

    # no scoped styles currently
    style = '''sample2 h5 {color: green}'''


    def __init__(self, tag, opts):
        self.label = opts.label.capitalize()  # this rocks so much.
<<<<<<< HEAD:Transcrypt-3.5.196/transcrypt/demos/riot_demo/sample2_tag.py
        # super does not seem to work yet (?)
		# JdeH: No, ideed, but you can call parent class ctor like: <ParentClassName>.__init__ (self, <otherParams>)
        self._setup_tag(tag)
=======
        # alternative to super:
        RiotTag.__init__(self, tag, opts)
>>>>>>> b5e9a118d3581b9b396f614aa519e10b3340e1e7:transcrypt/demos/riot_demo/sample2_tag.py
        # uncomment next line and chrome will stop:
        # debugger
        self.pp('tag init', 'adding 2 lv')
        # mutating the lv object:
        self.lv.extend([{'name': 'n1'}, {'name': 'n2'}])


    def update(self):
        self.pp('update handler in the custom tag, calling super')
        RiotTag.update(self)

