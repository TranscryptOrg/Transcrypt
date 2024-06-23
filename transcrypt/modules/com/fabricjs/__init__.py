__pragma__ ('noanno')

fabric = __pragma__ ('js',
    '''
(function () {{
    var exports = {{}};
    {}  // Puts fabric in exports and in global window
    delete window.fabric;
    return exports;
}}) () .fabric;
    ''',
    __include__ ('com/fabricjs/fabric_downloaded.js')
)
