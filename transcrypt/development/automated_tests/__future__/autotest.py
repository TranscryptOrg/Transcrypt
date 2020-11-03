import sys

try:
    sys.path.append ('.')
except:
    pass

import division
import generators
import nested_scopes
import print_function
import unicode_literals
# import with_statement

from org.transcrypt.autotester import AutoTester

atester = AutoTester()

atester.run(division, 'division')
atester.run(generators, 'generators')
atester.run(nested_scopes, 'nested_scope')
atester.run(print_function, 'print_function')
atester.run(unicode_literals, 'unicode_literals')
# atester.run(with_statement, 'with_statement')

atester.done()
