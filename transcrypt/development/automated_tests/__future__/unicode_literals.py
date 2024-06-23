from __future__ import unicode_literals

def run(test):
    test.check('Hello, world!')
    test.check(u'Hello, world!')
    # TODO: byte strings are not supported?
    # test.check(b'Hello, world!')
