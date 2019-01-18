from org.transcrypt.stubs.browser import __pragma__

def run (autoTester):

    # __pragma__ ('ecom') # ===================================================================

    # --- Executed only by Transcrypt ---
    '''?
    for i in range (10):
        autoTester.check (i)
    ?'''

    # --- Executed only by CPython ---
    # __pragma__ ('skip')
    for i in range (10):
        autoTester.check (i)
    # __pragma__ ('noskip')

    # --- Executed only by Transcrypt ---
    #?autoTester.check (100)

    # --- Executed only by CPython ---
    autoTester.check (100) #__: skip
        
    #__pragma__ ('noecom') # ===================================================================


    # --- Executed by none ---
    '''?
    for i in range (10, 20):
        autoTester.check (i)
    ?'''

    # --- Executed by none ---
    #?autoTester.check (200)

    __pragma__ ('ecom') # ===================================================================


    # --- Executed only by Transcrypt ---
    '''?
    for i in range (20, 30):
        autoTester.check (i)
    ?'''

    # --- Executed only by CPython ---
    # __pragma__ ('skip')
    for i in range (20, 30):
        autoTester.check (i)
    # __pragma__ ('noskip')

    # --- Executed only by Transcrypt ---
    #?autoTester.check (300)

    # --- Executed only by CPython ---
    autoTester.check (300) #__: skip

    __pragma__ ('noecom') # ===================================================================

    # --- Executed by none ---
    '''?
    for i in range (30, 40):
        autoTester.check (i)
    ?'''

    # --- Executed by none ---
    #?autoTester.check (400)
