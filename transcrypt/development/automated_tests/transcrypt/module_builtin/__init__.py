# coding: utf-8

from org.transcrypt.stubs.browser import __envir__

def canonizeString (aString):
    if __envir__.executor_name == 'transcrypt':
        return aString.replace ('\t', '\\t') .replace ('\n', '\\n')
    else:
        return aString

def canonizeStringList (stringList):
    return [canonizeString (aString) for aString in stringList]

def run (autoTester):
    autoTester.check ('min', min (-1.1, -1, -3))
    autoTester.check ('max', max (-1.1, -1, -3))
    autoTester.check ('abs', abs (-1), abs (1), abs (0), abs (-0.1), abs (0.1))
    autoTester.check ('ord', ord ('a'), ord ('e´'[0]))  # This is the 2 codepoint version
    
    autoTester.check ('round',
        round (4.006),
        round (4.006, 2),
        round (4060, -2),
        
        round (-4.006),
        round (-4.006, 2),
        round (-4060, -2),
        
        round (1/2.),
        round (1/2., 1),
        round (1/2, 1),
        round (1/3., 2),
        
        round (-1/2.),
        round (-1/2., 1),
        round (-1/2, 1),
        round (-1/3., 2),
    
        round (0.5),
        round (0.51),
        round (1.5),
        round (1.51),
        round (1.51),
        round (2.5),
        round (2.59),
        round (3.5),
        round (3.59),
        
        round (-0.5),
        round (-0.51),
        round (-1.5),
        round (-1.51),
        round (-1.51),
        round (-2.5),
        round (-2.59),
        round (-3.5),
        round (-3.59)
    )
    
    strings = [
        'der des dem den die der den die das des dem das',
        'an auf hinter ueber    neben vor   zwischen',
        '''
            durch
            fuer
            ohne
            um
            bis
            gegen
            entlang
        ''',
        'eins,zwei,drie,vier,fuenf,sechs,sieben'
    ]
    
    autoTester.check ('<br><br>split')
    for aString in strings:
        autoTester.check (
            canonizeString (aString),
            canonizeStringList (aString.split ()),
            canonizeStringList (aString.split (' ')),
            canonizeStringList (aString.split (' ', 4)),
            canonizeStringList (aString.split ('\t')),
            canonizeStringList (aString.split ('\t', 4)),
            canonizeStringList (aString.split ('\n')),
            canonizeStringList (aString.split ('\n', 4)),
            canonizeStringList (aString.split (',')),
            canonizeStringList (aString.split (',', 4)),
            '<br>'
        )
        
    autoTester.check ('<br>rsplit')
    for aString in strings:
        autoTester.check (
            canonizeString (aString),
            canonizeStringList (aString.rsplit ()),
            canonizeStringList (aString.rsplit (' ')),
            canonizeStringList (aString.rsplit (' ', 4)),
            canonizeStringList (aString.rsplit ('\t')),
            canonizeStringList (aString.rsplit ('\t', 4)),
            canonizeStringList (aString.rsplit ('\n')),
            canonizeStringList (aString.rsplit ('\n', 4)),
            canonizeStringList (aString.rsplit (',')),
            canonizeStringList (aString.rsplit (',', 4)),
            '<br>'
        )
        