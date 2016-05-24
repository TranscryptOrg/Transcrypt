import org.transcrypt.autotester

import arguments
import classes
import conditional_expressions
import control_structures
import data_structures
import dict_comprehensions
import dictionaries
import div_fixes
import exceptions
import extended_slices
import general_functions
import indices_and_slices
import lambda_functions
import list_comprehensions
import modules
import math_module
import nonlocals
import operator_overloading
import properties
import set_comprehensions
import simple_and_augmented_assignment
import tuple_assignment

autoTester = org.transcrypt.autotester.AutoTester ()

autoTester.run (arguments, 'arguments')
autoTester.run (classes, 'classes')
autoTester.run (conditional_expressions, 'conditional_expressions')
autoTester.run (control_structures, 'control_structures')
autoTester.run (data_structures, 'data_structures')
autoTester.run (dict_comprehensions, 'dict_comprehensions')
autoTester.run (dictionaries, 'dictionaries')
autoTester.run (div_fixes, 'div_fixes')
autoTester.run (exceptions, 'exceptions')
autoTester.run (extended_slices, 'extended_slices')
autoTester.run (general_functions, 'general_functions')
autoTester.run (indices_and_slices, 'indices_and_slices')
autoTester.run (lambda_functions, 'lambda_functions')
autoTester.run (list_comprehensions, 'list_comprehensions')
autoTester.run (modules, 'modules')
autoTester.run (math_module, 'math_module')
autoTester.run (nonlocals, 'nonlocals')
autoTester.run (operator_overloading, 'operator_overloading')
autoTester.run (properties, 'properties')
autoTester.run (set_comprehensions, 'set_comprehensions')
autoTester.run (simple_and_augmented_assignment, 'simple_and_augmented_assignment')
autoTester.run (tuple_assignment, 'tuple_assignemt')

autoTester.done ()
