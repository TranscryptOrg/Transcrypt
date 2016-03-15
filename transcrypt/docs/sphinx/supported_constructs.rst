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

Classes: multiple inheritance and assignment of bound functions
---------------------------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/classes/__init__.py
	:tab-width: 4
	:caption: Testlet: classes

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

Dict comprehensions
-------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/dict_comprehensions/__init__.py
	:tab-width: 4
	:caption: Testlet: dict_comprehensions

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

General functions: sort and sorted
----------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/general_functions/__init__.py
	:tab-width: 4
	:caption: Testlet: general_functions

Hierarchical modules: both local to the project and global url-based
--------------------------------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/modules/__init__.py
	:tab-width: 4
	:caption: Testlet: modules

Indices and slices: LHS, RHS, basic and extended
------------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/indices_and_slices/__init__.py
	:tab-width: 4
	:caption: Testlet: indices_and_slices

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

Operator overloading
--------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/operator_overloading/__init__.py
	:tab-width: 4
	:caption: Testlet: operator_overloading
		
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
		
Tuple assignment: recursive and in for-headers using enumerate
--------------------------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/tuple_assignment/__init__.py
	:tab-width: 4
	:caption: Testlet: tuple_assignment
