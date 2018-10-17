# __pragma__ ('alias', 'specific_module_a', 'specific-module-a')
# __pragma__ ('alias', 'S', '$')

# __pragma__ ('alias', 'test_modules_b', 'test-modules-b')
# __pragma__ ('alias', 'specific_module_b', 'specific-module-b')

# x__pragma__ ('alias', 'specific_submodule_c', 'specific-submodule-c')

from test_modules_a.__specific_module_a import a__S__Function
from test_modules_b__.__specific_module_b import bFunction as theBFunction
from test_modules_c.specific_module_c import *

def aPrint (any):
    document.getElementById ('__terminal__') .innerHTML += str (any)

def run (autoTester):
    the__S__Variable = 3
    aPrint (the__S__Variable)

    a__S__Function (aPrint)
    theBFunction (aPrint)
    test_modules_c.specific_module_c.specific_submodule_c.c__S__Function (aPrint)
    