import modules.mod1.mod11.mod111
import modules.mod3
import modules.mod1.mod11.mod112
import modules.mod1
import modules.mod1.mod11
import modules.mod2
import modules.mod2.mod21
import modules.mod2.mod22

import modules.mod1.mod11.mod111 as aliasMod111
import modules.mod1 as aMod1

from modules.mod1.mod11 import mod111, mod112

from modules.mod2 import mod21 as aMod21, mod22 as aMod22

from modules.mod3 import *

from modules.mod1.mod11.mod111 import A

a = modules.mod1.mod11.mod111.A (12345)
pi = modules.mod1.pi
f = modules.mod2.f

def run (autoTester):
    # Import without 'as'
    autoTester.check ('modules')
    autoTester.check (a.f ())
    autoTester.check (modules.mod1.mod11.mod112.f ())
    autoTester.check (modules.mod1.mod11.e)
    autoTester.check (pi)
    autoTester.check (f (102030))
    autoTester.check (modules.mod2.mod21.f ())
    B = modules.mod2.mod22.B
    b = B ()
    autoTester.check (b.x)
    autoTester.check (modules.mod3.x)
    
    # Import with 'as'
    a2 = aliasMod111.A (6789101112)
    autoTester.check (a2.f ())
    autoTester.check (aMod1.pi)
    
    # From ... import without 'as'
    a3 = mod111.A (100.001)
    autoTester.check (a3.f ())
    autoTester.check (mod112.f ())
    
    # From ... import with 'as'
    autoTester.check (aMod21.f ())
    autoTester.check (aMod22.B () .x)
    
    # From ... import *
    autoTester.check (mod3Hundred)
    autoTester.check (mod3GetTwoHundred ())
    autoTester.check (A (123.321) .f ())

    from modules import mod4
    # From ... import within function, with circular import
    autoTester.check(mod4.mod4Add2FromMod5(449))
