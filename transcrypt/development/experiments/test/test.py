autoTester.check ('#392')

import re

class Example:

    d = {'A': 1, 'B': 2}
    rec = re.compile('(?P<decimal>\d+)', re.ASCII)

    def run(self):
        match = self.rec.match('42')
        if not match:
            print('ERROR: RE does not match')
        e = match.groupdict()
        autoTester.check ("before: self.d=", self.d)
        autoTester.check ("before: e=", e)
        self.d.update(e)
        autoTester.check ("after: self.d=", self.d)


example = Example()
example.run ()
