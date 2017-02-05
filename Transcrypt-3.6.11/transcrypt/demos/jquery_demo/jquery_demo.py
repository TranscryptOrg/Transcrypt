__pragma__ ('alias', 'S', '$')

def start ():
    def changeColors ():
        for div in S__divs:
            S (div) .css ({
                'color': 'rgb({},{},{})'.format (* [int (256 * Math.random ()) for i in range (3)]),
            })

    S__divs = S ('div')
    changeColors ()
    window.setInterval (changeColors, 500)
