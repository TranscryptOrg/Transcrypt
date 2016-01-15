import org.transcrypt.autotester

import classes
import datastructures
import list_comprehensions
import modules
import tuple_assignment

autoTester = org.transcrypt.autotester.AutoTester ()

autoTester.run (classes, 'classes')
autoTester.run (datastructures, 'datastructures')
autoTester.run (list_comprehensions, 'list_comprehensions')
autoTester.run (modules, 'modules')
autoTester.run (tuple_assignment, 'tuple_assignemt')

autoTester.done ()
