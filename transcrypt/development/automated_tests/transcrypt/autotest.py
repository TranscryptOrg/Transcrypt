from org.transcrypt.stubs.browser import __pragma__
import org.transcrypt.autotester

import built_ins
import arguments
import attribs_by_name
import classes
import conditional_expressions
import control_structures
import data_structures
import dict_comprehensions
import dictionaries
import div_fixes
import div_pulls
import exceptions
import extended_slices
import general_functions
import indices_and_slices

__pragma__ ('ifdef', 'e6')	# Needed because Transcrypt imports are compile time
if 'e6' in __symbols__:	# Needed because CPython doesn't understand pragma's
	import iterators_and_generators
__pragma__ ('endif')

import lambda_functions
import list_comprehensions

__pragma__ ('ifdef', 'e6')
if 'e6' in __symbols__:
	import module_itertools
__pragma__ ('endif')

import module_math
import modules
import nonlocals
import operator_overloading
import properties
import set_comprehensions
import simple_and_augmented_assignment
import truthyness
import tuple_assignment

autoTester = org.transcrypt.autotester.AutoTester ()

autoTester.run (built_ins, 'builtins')
autoTester.run (arguments, 'arguments')
autoTester.run (attribs_by_name, 'attribs_by_name')
autoTester.run (classes, 'classes')
autoTester.run (conditional_expressions, 'conditional_expressions')
autoTester.run (control_structures, 'control_structures')
autoTester.run (data_structures, 'data_structures')
autoTester.run (dict_comprehensions, 'dict_comprehensions')
autoTester.run (dictionaries, 'dictionaries')
autoTester.run (div_fixes, 'div_fixes')
autoTester.run (div_pulls, 'div_pulls')
autoTester.run (exceptions, 'exceptions')
autoTester.run (extended_slices, 'extended_slices')
autoTester.run (general_functions, 'general_functions')
autoTester.run (indices_and_slices, 'indices_and_slices')

__pragma__ ('ifdef', 'e6')
if 'e6' in __symbols__:
	autoTester.run (iterators_and_generators, 'iterators_and_generators')
__pragma__ ('endif')
	
autoTester.run (lambda_functions, 'lambda_functions')
autoTester.run (list_comprehensions, 'list_comprehensions')

__pragma__ ('ifdef', 'e6')
if 'e6' in __symbols__:
	autoTester.run (module_itertools, 'module_itertools')
__pragma__ ('endif')
	
autoTester.run (module_math, 'module_math')
autoTester.run (modules, 'modules')
autoTester.run (nonlocals, 'nonlocals')
autoTester.run (operator_overloading, 'operator_overloading')
autoTester.run (properties, 'properties')
autoTester.run (set_comprehensions, 'set_comprehensions')
autoTester.run (simple_and_augmented_assignment, 'simple_and_augmented_assignment')
autoTester.run (truthyness, 'truthyness')
autoTester.run (tuple_assignment, 'tuple_assignemt')

autoTester.done ()
