from org.transcrypt.stubs.browser import __pragma__

__pragma__ ('iconv')    # Convert dict to key list without using keys () method

def run (autoTester):
    original = {'Isaac': 'Newton', 'Albert': 'Einstein', 'Paul': 'Dirac'}
    autoTester.check (original)

    inverted = {original [key]: key for key in original}
    autoTester.check (inverted)
