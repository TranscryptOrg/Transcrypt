def run (autoTester):
    b = b'bike'
    s = bytes ('shop', 'utf8')
    e = b''
    bb = bytearray ([0, 1, 2, 3, 4])
    bc = bytes ((5, 6, 7, 8, 9))

    # __pragma__ ('opov')
    bps = b + b'pump' + s
    bps3 = 3 * bps + b'\0'
    aBps3 = bps * 3 + b'\0'
    l = [1, 2, 3] + [4, 5, 6]
    # __pragma__ ('noopov')

    def formatCheck (aBytes):
        autoTester.check ([int (aByte) for aByte in aBytes])
    
    formatCheck (b)
    formatCheck (s)
    formatCheck (e)
    formatCheck (bb)
    formatCheck (bc)
    formatCheck (bps)
    formatCheck (bps3)
    formatCheck (aBps3)

    # __pragma__ ('opov')
    formatCheck (bb + bc)
    formatCheck (bytearray ('ding', 'utf8') + b'dang' + bytes ('dong', 'utf8'))
    # __pragma__ ('noopov')

    formatCheck (l)