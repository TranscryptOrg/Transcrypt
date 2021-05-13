from __future__ import with_statement

class SimpleWith:
    def __enter__(self):
        return 42

    def __exit__(self, type, value, traceback):
        pass

def run(test):
    with SimpleWith() as sw:
        pass

    test.check('ok')
