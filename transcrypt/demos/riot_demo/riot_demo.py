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

# try some inheritance...
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
        # alternative to super:
        RiotTag.__init__(self, tag, opts)
        # uncomment next line and chrome will stop:
        # debugger
        self.pp('tag init', 'adding 2 lv')
        # mutating the lv object:
        self.lv.extend([{'name': 'n1'}, {'name': 'n2'}])


    def update(self):
        self.pp('update handler in the custom tag, calling super')
        RiotTag.update(self)

