import tpackage


def run(test):
    test.check(type(tpackage.peer2.func).__name__)
    test.check(type(tpackage.func1).__name__)
