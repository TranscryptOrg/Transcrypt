# -*- coding: UTF-8 -*-

from unicodedata import normalize


def run(autoTester):
    autoTester.check('NFC:')

    # test ç and C+◌̧
    autoTester.check(normalize('NFC', 'c' + '\u0327'))
    autoTester.check(normalize('NFC', '\u00e7'))
    autoTester.check((normalize('NFC', 'c' + '\u0327') == normalize('NFC', '\u00e7')) == True)

    # test q+◌̇+◌̣ and q+◌̣+◌̇
    autoTester.check(normalize('NFC', 'q\u0307\u0323'))
    autoTester.check(normalize('NFC', 'q\u0323\u0307'))
    autoTester.check((normalize('NFC', 'q\u0323\u0307') == normalize('NFC', 'q\u0307\u0323')) == True)

    # test 가 and ᄀ+ᅡ
    autoTester.check(normalize('NFC', '가'))
    autoTester.check(normalize('NFC', 'ᄀ' + 'ᅡ'))
    autoTester.check((normalize('NFC', '가') == normalize('NFC', 'ᄀ' + 'ᅡ')) == True)

    # test Ω
    autoTester.check(normalize('NFC', 'Ω'))


    autoTester.check('NFD:')

    # test ç and C+◌̧
    autoTester.check(normalize('NFD', 'c' + '\u0327'))
    autoTester.check(normalize('NFD', '\u00e7'))
    autoTester.check((normalize('NFD', 'c' + '\u0327') == normalize('NFD', '\u00e7')) == True)

    # test q+◌̇+◌̣ and q+◌̣+◌̇
    autoTester.check(normalize('NFD', 'q\u0307\u0323'))
    autoTester.check(normalize('NFD', 'q\u0323\u0307'))
    autoTester.check((normalize('NFD', 'q\u0323\u0307') == normalize('NFD', 'q\u0307\u0323')) == True)

    # test 가 and ᄀ+ᅡ
    autoTester.check(normalize('NFD', '가'))
    autoTester.check(normalize('NFD', 'ᄀ' + 'ᅡ'))
    autoTester.check((normalize('NFD', '가') == normalize('NFD', 'ᄀ' + 'ᅡ')) == True)

    # test Ω
    autoTester.check(normalize('NFD', 'Ω'))
