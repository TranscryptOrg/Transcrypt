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
    autoTester.check ('min',
                      min (-1.1, -1, -3),
                      min ([-1.1, -1, -3]),
                      min ((-1.1, -1, -3)),
                      min ('abc', 'ABC', 'xyz', 'XYZ'),
                      min ('abc', 'ABC', 'xyz', 'XYZ', key=lambda v: v[1]),
                      min (['abc', 'ABC', 'xyz', 'XYZ']),
                      min([5,6,7,8,9],[1,2,3,4],key=len),
                      min([[5,6,7,8,9],[1,2,3,4]],default=[1,1,1],key=len),
                      min ([], default='zzz'),
                      )

    autoTester.check ('max',
                      max (-1.1, -1, -3),
                      max ([-1.1, -1, -3]),
                      max ((-1.1, -1, -3)),
                      max ('abc', 'ABC', 'xyz', 'XYZ'),
                      max ('abc', 'ABC', 'xyz', 'XYZ', key=lambda v: v[1]),
                      max (['abc', 'ABC', 'xyz', 'XYZ']),
                      max([5,6,7,8,9],[1,2,3,4],key=len),
                      max([[5,6,7,8,9],[1,2,3,4]],default=[1,1,1],key=len),
                      max ([], default='zzz'),
                      )
    # autoTester.check ('max', autoTester.expectException(lambda: max () ))
    # autoTester.check ('max', autoTester.expectException(lambda: max (1,2,3,4, default=5) ))
    # autoTester.check ('max', autoTester.expectException(lambda: max (default=5)))
    # autoTester.check ('max', autoTester.expectException(lambda: max ([])))
    # autoTester.check ('max', autoTester.expectException(lambda: max([5,6,7,8,9],[1,2,3,4],default=[1,1,1],key=len) ))
    # autoTester.check ('max', autoTester.expectException(lambda: max ([4, 5, 'xyz', 'XYZ']) ))

    autoTester.check ('abs', abs (-1), abs (1), abs (0), abs (-0.1), abs (0.1))

    autoTester.check ('ord', ord ('a'), ord ('e´'[0]))  # This is the 2 codepoint version
    autoTester.check ('chr', chr (97), chr (122), chr (65), chr (90))  # a z A Z

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

    autoTester.check("isalpha",
                     "".isalpha(),
                     "123".isalpha(),
                     "abc".isalpha(),
                     "abc123".isalpha(),
                     )

    enumerate_list = ['a', 'b', 'c', 'd', 'e']
    # JS does not have tuples so coerce  to list of lists
    autoTester.check("enumerate",
        [list(item) for item in enumerate(enumerate_list)],
        [list(item) for item in enumerate(enumerate_list, 1)],
        [list(item) for item in enumerate(enumerate_list, start=2)]
    )

    replace_test = "abcabcabcabc"
    autoTester.check("replace",
        replace_test.replace("c", "x"),
        replace_test.replace("c", "x", -1),
        replace_test.replace("c", "x", 0),
        replace_test.replace("c", "x", 1),
        replace_test.replace("c", "x", 2),
        replace_test.replace("c", "x", 10),
    )

    autoTester.check("bin-oct-hex",
        bin(42),
        oct(42),
        hex(42),
        bin(0),
        oct(0),
        hex(0),
        bin(-42),
        oct(-42),
        hex(-42),
    )

    string_test = "abcdefghijkl"
    autoTester.check("startswith",
        string_test.startswith(""),
        string_test.startswith("abcd"),
        string_test.startswith("efgh"),
        string_test.startswith("efgh", 2),
        string_test.startswith("efgh", 4),
        string_test.startswith("abcd", 0, 3),
        string_test.startswith("abcd", 0, 5),
        string_test.startswith("efgh", 4, -2),
        string_test.startswith("efgh", 4, -6),
        string_test.startswith(("abc",)),
        string_test.startswith(("abc", "de", "gh")),
        string_test.startswith(("abc", "de", "gh"), 2),
        string_test.startswith(("abc", "de", "gh"), 3),
        string_test.startswith(("abc", "defgh"), 3, 9),
        string_test.startswith(("abc", "defgh"), 3, 6),
    )

    autoTester.check("endswith",
        string_test.endswith(""),
        string_test.endswith("ijkl"),
        string_test.endswith("efgh"),
        string_test.endswith("efgh", 2),
        string_test.endswith("abcd", 0, 3),
        string_test.endswith("abcd", 0, 4),
        string_test.endswith("efgh", 4, -2),
        string_test.endswith("efgh", 4, -4),
        string_test.endswith(("ijkl",)),
        string_test.endswith(("abc", "de", "gh")),
        string_test.endswith(("abc", "de", "gh"), 3, -4),
        string_test.endswith(("abc", "de", "gh"), -6, -4),
        string_test.endswith(("abc", "defgh"), -3, 8),
        string_test.endswith(("abc", "defgh"), -9, 8),
    )
