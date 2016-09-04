Systematic code examples: a guided tour of Transcrypt
=====================================================


One ready-to-run code example is worth more than ten lengthy descriptions. The *autotest and demo suite*, that is part of the distribution, is a collection of sourcecode fragments called *testlets*. These testlets are used for automated regression testing of Transcrypt against CPython.
Since they systematically cover all language constructs, they are also very effective as a learning tool. The testlets are arranged alphabetically by subject.

.. literalinclude:: ../../development/automated_tests/transcrypt/autotest.py
	:tab-width: 4
	:caption: Autotest: Transcrypt autotest demo suite

.. _autotest_arguments:

Arguments: \*\*kwargs, \*args, defaults, at call and def time, also for lambda's
--------------------------------------------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/arguments/__init__.py
	:tab-width: 4
	:caption: Testlet: arguments

Accessing attributes by name: getattr, setattr, hasattr
-------------------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/attribs_by_name/__init__.py
	:tab-width: 4
	:caption: Testlet: attribs_by_name

Classes: multiple inheritance and assignment of bound functions
---------------------------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/classes/__init__.py
	:tab-width: 4
	:caption: Testlet: classes

Complex numbers: Python's builtin complex datatype
--------------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/complex_numbers/__init__.py
	:tab-width: 4
	:caption: Testlet: complex_numbers

Conditional expressions: simple and nested
------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/conditional_expressions/__init__.py
	:tab-width: 4
	:caption: Testlet: conditional_expressions

Control structures: for...else, while...else, if...elif...else, break, continue
-------------------------------------------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/control_structures/__init__.py
	:tab-width: 4
	:caption: Testlet: control_structures

Data structures: tuple, list, dict, set
---------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/data_structures/__init__.py
	:tab-width: 4
	:caption: Testlet: data_structures

Decorators: function and class, with and without parameters
-----------------------------------------------------------

Transcrypt supports decorators on methods and classes. A decorator itself can be a function or an object with an overloaded __call__ operator. Parameterized decorator factories are also supported. Decorators on methods are not supported, except trivially for @classmethod. Methods decorated with @classmethod can be called on an object as demonstrated in the code below, not on a class. All flavours of properties are fully supported, though directly and not through decorator syntax. Extensive use of properties is demonstrated in the :ref:`properties testlet <autotest_properties>`.

.. literalinclude:: ../../development/automated_tests/transcrypt/decorators/__init__.py
	:tab-width: 4
	:caption: Testlet: decorators

Dict comprehensions
-------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/dict_comprehensions/__init__.py
	:tab-width: 4
	:caption: Testlet: dict_comprehensions
	
Diverse fixes
-------------

.. literalinclude:: ../../development/automated_tests/transcrypt/div_fixes/__init__.py
	:tab-width: 4
	:caption: Testlet: div_fixes
	
Diverse pulls
-------------

.. literalinclude:: ../../development/automated_tests/transcrypt/div_pulls/__init__.py
	:tab-width: 4
	:caption: Testlet: div_pulls
	
Dictionaries: dict revisited
----------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/dictionaries/__init__.py
	:tab-width: 4
	:caption: Testlet: dictionaries

Exceptions: exception class hierarchy, finally
----------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/exceptions/__init__.py
	:tab-width: 4
	:caption: Testlet: exceptions

Extended slices: facilitating NumScrypt and such
------------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/extended_slices/__init__.py
	:tab-width: 4
	:caption: Testlet: extended_slices

General functions: sort and sorted
----------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/general_functions/__init__.py
	:tab-width: 4
	:caption: Testlet: general_functions

Indices and slices: LHS, RHS, basic and extended
------------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/indices_and_slices/__init__.py
	:tab-width: 4
	:caption: Testlet: indices_and_slices

Iterators and generators
------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/iterators_and_generators/__init__.py
	:tab-width: 4
	:caption: Testlet: iterators_and_generators

Lambda functions with all types of args
---------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/lambda_functions/__init__.py
	:tab-width: 4
	:caption: Testlet: lambda_functions

List comprehensions: multi-loop and nested with multiple if's
-------------------------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/list_comprehensions/__init__.py
	:tab-width: 4
	:caption: Testlet: list_comprehensions

Local classes: inside other classes and functions
-------------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/local_classes/__init__.py
	:tab-width: 4
	:caption: Testlet: local_classes

Module builtin: a small part of it demo'ed
------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/module_builtin/__init__.py
	:tab-width: 4
	:caption: Testlet: module_builtin

Module cmath: allmost all of Python's cmath module
--------------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/module_cmath/__init__.py
	:tab-width: 4
	:caption: Testlet: module_cmath

Module itertools: allmost all of Python's itertools module
----------------------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/module_itertools/__init__.py
	:tab-width: 4
	:caption: Testlet: module_itertools

Module math: allmost all of Python's math module
------------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/module_math/__init__.py
	:tab-width: 4
	:caption: Testlet: module_math

Module random: most important functions of Python's random module
-----------------------------------------------------------------

.. literalinclude:: ../../development/manual_tests/module_random/module_random.py
	:tab-width: 4
	:caption: Manual_test: module_random

Modules: hierarchical, both local to the project and global url-based
---------------------------------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/modules/__init__.py
	:tab-width: 4
	:caption: Testlet: modules

Nonlocals
---------

.. literalinclude:: ../../development/automated_tests/transcrypt/nonlocals/__init__.py
	:tab-width: 4
	:caption: Testlet: nonlocals

Operator overloading
--------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/operator_overloading/__init__.py
	:tab-width: 4
	:caption: Testlet: operator_overloading
	
.. _autotest_properties:
	
Properties
----------

.. literalinclude:: ../../development/automated_tests/transcrypt/properties/__init__.py
	:tab-width: 4
	:caption: Testlet: properties
		
Set comprehensions
------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/set_comprehensions/__init__.py
	:tab-width: 4
	:caption: Testlet: set_comprehensions

Simple and augmented assignment
-------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/simple_and_augmented_assignment/__init__.py
	:tab-width: 4
	:caption: Testlet: simple_and_augmented_assignment
		
Truthyness: optional Python-style evaluation of truthyness, falsyness and non-empty container selection
-------------------------------------------------------------------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/truthyness/__init__.py
	:tab-width: 4
	:caption: Testlet: truthyness
	
Tuple assignment: recursive and in for-headers using enumerate
--------------------------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/tuple_assignment/__init__.py
	:tab-width: 4
	:caption: Testlet: tuple_assignment
	