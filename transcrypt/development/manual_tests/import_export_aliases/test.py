# __pragma__ ('alias', 'specific_module_a', 'specific-module-a')
# __pragma__ ('alias', 'S', '$')
# __pragma__ ('alias', 'test_modules_b', 'test-modules-b')
# __pragma__ ('alias', 'specific_module_b', 'specific-module-b')

from test_modules_a.__specific_module_a import the__S__Function
from test_modules_b__.__specific_module_b import theBFunction as aBFunction

the__S__Variable = 3
print (the__S__Variable)

the__S__Function (print)
aBFunction (print)
