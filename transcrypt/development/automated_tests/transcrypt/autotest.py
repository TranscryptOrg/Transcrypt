from org.transcrypt.stubs.browser import __pragma__
import org.transcrypt.autotester

import arguments
import attribs_by_name
import builtin_super
import byte_arrays
import callable_test
import classes
import complex_numbers
import conditional_expressions
import control_structures
import dashed_numbers
import data_classes
import data_structures
import decorators
import dict_comprehensions
import dictionaries
import div_issues
import div_pulls
import docstrings
import exceptions
import executable_comments
import extended_slices
import fstrings
import general_functions
import globals_function
import indices_and_slices
import iterators_and_generators
import lambda_functions
import list_comprehensions
import local_classes
import metaclasses
import method_and_class_decorators
import module_builtin
import module_cmath

if __pragma__ ('defined', 'undefined'):
    import module_collections

import module_copy
import module_datetime
import module_itertools
import module_math
import module_unicodedata
import modules
import nonlocals
import operator_overloading
import properties
import proxies
import reprtest
import set_comprehensions
import simple_and_augmented_assignment

if __pragma__ ('defined', '__sform__'):
    import string_format

import truthyness
import tuple_assignment
import transducers

autoTester = org.transcrypt.autotester.AutoTester ()
autoTester.run (arguments, 'arguments')
autoTester.run (attribs_by_name, 'attribs_by_name')
autoTester.run (builtin_super, 'builtin_super')
autoTester.run (byte_arrays, 'byte_arrays')
autoTester.run (callable_test, 'callable')
autoTester.run (classes, 'classes')
autoTester.run (complex_numbers, 'complex_numbers')
autoTester.run (conditional_expressions, 'conditional_expressions')
autoTester.run (control_structures, 'control_structures')
autoTester.run (dashed_numbers, 'dashed_numbers')
autoTester.run (data_classes, 'data_classes')
autoTester.run (data_structures, 'data_structures')
autoTester.run (decorators, 'decorators')
autoTester.run (dict_comprehensions, 'dict_comprehensions')
autoTester.run (dictionaries, 'dictionaries')
autoTester.run (div_issues, 'div_issues')
autoTester.run (div_pulls, 'div_pulls')
autoTester.run (docstrings, 'docstrings')
autoTester.run (exceptions, 'exceptions')
autoTester.run (executable_comments, 'executable_comments')
autoTester.run (extended_slices, 'extended_slices')
autoTester.run (fstrings, 'fstrings')
autoTester.run (general_functions, 'general_functions')
autoTester.run (globals_function, 'globals_function')
autoTester.run (indices_and_slices, 'indices_and_slices')
autoTester.run (iterators_and_generators, 'iterators_and_generators') 
autoTester.run (lambda_functions, 'lambda_functions')
autoTester.run (list_comprehensions, 'list_comprehensions')
autoTester.run (local_classes, 'local_classes')
autoTester.run (metaclasses, 'metaclasses')
autoTester.run (method_and_class_decorators, 'method_and_class_decorators')
autoTester.run (module_builtin, 'module_builtin')
autoTester.run (module_cmath, 'module_cmath')

if __pragma__ ('defined', 'undefined'):
    autoTester.run (module_collections, 'module_collections')

autoTester.run (module_copy, 'module_copy')
autoTester.run (module_datetime, 'module_datetime')
autoTester.run (module_itertools, 'module_itertools')
autoTester.run (module_math, 'module_math')
autoTester.run (module_unicodedata, 'module_unicodedata')
autoTester.run (modules, 'modules')
autoTester.run (nonlocals, 'nonlocals')
autoTester.run (operator_overloading, 'operator_overloading')
autoTester.run (properties, 'properties')
autoTester.run (reprtest, 'repr_str')
autoTester.run (proxies, 'proxies')
autoTester.run (set_comprehensions, 'set_comprehensions')
autoTester.run (simple_and_augmented_assignment, 'simple_and_augmented_assignment')

if __pragma__ ('defined', '__sform__'):
    autoTester.run (string_format, 'string_format')
 
autoTester.run (truthyness, 'truthyness')
autoTester.run (tuple_assignment, 'tuple_assignment')
autoTester.run (transducers, 'transducers')

autoTester.done ()
