.. Transcrypt documentation master file, created by
   sphinx-quickstart on Sat Jan 09 20:57:48 2016.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Welcome to Transcrypt's documentation!
======================================

Contents:

.. toctree::
   :maxdepth: 2

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`

Transcrypt: what and why
========================

What is Transcrypt
------------------

Transcrypt is a tool to compile a fairly extensive subset of Python into compact, readable JavaScript. It has the following characteristics:

1. It's lightweight, in accordance Pareto’s rule adapted for IT: 99% of the result can be achieved with 1% of the effort.
2. It offers the semantic essence of Python along with the clean, highly readable syntax that the language is famous for
3. It cooperates flawlessly with the JavaScript universe of web-oriented libraries
4. It translates Python into highly readable, easy to debug JavaScript

In two words: it's *lean* and *mean*.

Language preferences, a subjective account
------------------------------------------

Language preferences are largely subjective. For some developers, JavaScript is the language of choice. They are right. For others it's Python. They're equally right. It just fits the way of thinking of many. The word 'pythonic' says it all: Programming in Python can be a joy. And, apart from being its own reward, taking joy in one's work enhances quality like no other incentive.

At the basis of Transcrypt lies the following shopping list:

- Python syntax
- Small downloads
- No barriers to the JavaScript / JQuery / DOM world
- Dynamic typing
- 'Classic' object orientation including multiple inheritance
- Static transpilation
- Lambda’s
- Named parameters
- Lists, dicts and sets
- List comprehensions
- Nested tuple assignment
- Assignment of bound functions

At the advent of Transcrypt there were many Python to JavaScript transpiler projects around, some of them quite mature. Neither of them fitted the above shopping list. Either the downloads were too large, or some of must have features were missing. To some, the shopping list may seem weird. Multiple inheritance? The whole Java world is doing without it. Exactly. And that's one of the reasons why a large category of developers shunned Java from the start. To them multiple inheritance has proven a powerful tool ever since it was introduced in C++.

So if it's all that subjective, why should *you* use it?. Well, *only if and when you like it*. That's all. In IT everything grows until it becomes unusable. One of the main goals of Transcrypt is to keep things simple, preventing it from disolution into an ocean of feature creep and conflicting demands. At its core it will stay lean and mean. For the rest: it's open. There's a hierarchical module system included right from the start, featuring Java-esque URL based unique package names. So, once the core of Transcrypt has stabilized, you're invited to help its ecosystem grow.

The ecosystem: different batteries
----------------------------------

To be effective, a programming language needs libraries. Python is famous for its 'batteries included' claim: Almost any library you can think of has been written for Python, and is available from a central location: https://pypi.python.org . But Python's batteries are desktop c.q. server batteries. And Transcrypt is for the web client world. So it needs different batteries. There's a virtually unlimited supply of free high quality JavaScript libraries for web applications. The web is dominated by designers and while programmers may loathe their way of thinking, they sure have created beautiful things. The set of available JQuery components alone beats almost anything available for the desktop from an aesthetic point of view. Rather than attempting to set up a parallel universe for Transcrypt, the only sensible thing to do is to embrace the JavaScript ecosystem to the max. There may be thin 'pythonic' wrappers around JavaScript libraries, but even this is not needed. JavaScript libraries can be used from Transcrypt without restrictions or complications.

There's a category of libraries c.q. applications that are probably developed easier in Transcrypt than in JavaScript. Transcrypt's niche are non-trivial web applications where, apart from looks, things like structure, overview, simplicity, explicitness and regularity start to count. This is where Python shines and Transcrypt with it. The preferred way to make Transcrypt libraries and applications avaible to the world is PyPi, Transcrypt being a Python flavour.

Code structure
--------------

In the JavaScript world, components are gathered from everywhere on the web during a page load, and small fragments of code may be anywhere in a web page. Transcrypt takes a different approach. The concept of a static webpage is secundary and may even be absent. Typically there's one and only one Transcrypt application attachted to a certain URL or page. This application has it's own namespace and may feature many entrypoints or callbacks attached to DOM components. Although traditional web pages can be made without restrictions using Transcrypt, the focus is on complex stateful web applications rather than on static pages interspersed with code fragments. Typically such a web application will rely on the server to store and retrieve data and program state. Although at some point 'pythonic' libraries may come into existence to facilitate this, direct use of JavaScript AJAX or e.g. of a JQuery AJAX wrapper, will do the job fine.

Debuggability
-------------

In order to debug a transpiled web app, it helps a lot if there's a simple correspondence between the Python source code and the generated JavaScript. In Transcrypt this is the case, as is illustrated by the following code fragments:

+--------------------------------------------+--------------------------------------------+
|    .. literalinclude:: ../code/classes.py  |    .. literalinclude:: ../code/classes.js  |
|        :tab-width: 4                       |        :tab-width: 4                       |
|        :caption: classes.py                |        :caption: classes.js                |
+--------------------------------------------+--------------------------------------------+

Autotesting Transcrypt code
===========================

Why it's needed
---------------

An simple autotest feature has been added to Transcrypt right from the start for the following reasons:

1. Any programming language compiler has to be reliable, since a large investment in code may come to depend upon it. Languages and libraries should be able to evolve without regression bugs being introduced. In a rich language many constructs are possible which all should be tested with each new release. This can only be done if testing is automated.

2. Since Transcrypt compiles not all of Python but a fairly extensive subset, it has to be rigorously clear what can be compiled and what not. The sourcecode of a set of automated tests can be an effective means of laying down what is possible in the language. Whereas code examples and documents may lag back or deviate from reality, test code has to cover the essential features of the language and is, by nature, constantly exercised to match the latest status of the language.

How it works
------------

When code is being tested, a reference is needed of what is considered to be correct. With Transcrypt that reference is CPython. Autotesting Transcrypt code is simple and boils down to the following.

1. Along with developing production code, a growing set of *testlets* is developed. A testlet is a small module testing a certain feature or group of features. It repeatedly calls method *org.transcrypt.autotester.AutoTester.check (self, \*args)* to build a well defined sequence of output data.
2. A series of testlets are imported into an application called an *autotest*.
3. The autotest is first run from the command line: *python transcrypt -r autotest.py*. This will generate files *autotest.html* (using prettyfied code) and *autotest.min.html* (using minified code) in the working directory, both containing the *reference data sequence* in a HTML DIV using CPython.
4. After that, the autotest is compiled to JavaScript: *python transcryp -b autotest.py*. This will generate files *autotest.js* and *autotest.min.js* in the corresponding JavaScript directory.
5. Click on *autotest.html* or *autotest.min.html* to load the autotest into the browser and run *autotest.js* or *autotest.min.js* respectively. This will generate the *test data sequence*, now using the Transcrypt runtime.
6. After this, the test data sequence is automatically compared to the reference data sequence that was part of the html, and an error report is shown in the browser.

An example of two testlets combined into the 'hello' autotest, that is part of the distribution:

+----------------------------------------------------------------------------+----------------------------------------------------------------------------+----------------------------------------------------------------------------+		
|    .. literalinclude:: ../../development/automated_tests/hello/autotest.py |    .. literalinclude:: ../../development/automated_tests/hello/testlet0.py |    .. literalinclude:: ../../development/automated_tests/hello/testlet1.py | 
|        :tab-width: 4                                                       |         :tab-width: 4                                                      |        :tab-width: 4                                                       |
|        :caption: autotest.py                                               |         :caption: testlet0.py                                              |        :caption: testlet1.py                                               |
+----------------------------------------------------------------------------+----------------------------------------------------------------------------+----------------------------------------------------------------------------+

Output of the 'hello' autotest with a deliberate error:

.. figure:: ../images/autotest_hello.png
	:alt: Output of 'hello autotest' 

What language constructs are currently supported
================================================

Transcrypt can handle a fast growing set of language constructs. Read through the autotest and demo suite to get an idea of what is currently supported.

.. literalinclude:: ../../development/automated_tests/transcrypt/autotest.py
	:tab-width: 4
	:caption: Autotest: Transcrypt demo suite

Classes, multiple inheritance and assignment of bound functions
---------------------------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/classes/__init__.py
	:tab-width: 4
	:caption: Testlet: classes

Conditional expressions, simple and nested
-------------------------------------------------------------------------------

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

Exceptions
----------

.. literalinclude:: ../../development/automated_tests/transcrypt/exceptions/__init__.py
	:tab-width: 4
	:caption: Testlet: exceptions

Indices and slices: LHS, RHS, basic and extended
------------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/indices_and_slices/__init__.py
	:tab-width: 4
	:caption: Testlet: indices_and_slices

Lambda functions with normal args and \*args
-------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/lambda_functions/__init__.py
	:tab-width: 4
	:caption: Testlet: lambda_functions

List comprehensions, multi-loop and nested with multiple if's
-------------------------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/list_comprehensions/__init__.py
	:tab-width: 4
	:caption: Testlet: list_comprehensions

Hierarchical modules, both local to the project and global url-based
--------------------------------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/modules/__init__.py
	:tab-width: 4
	:caption: Testlet: modules

Simple and augmented assignment
-------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/simple_and_augmented_assignment/__init__.py
	:tab-width: 4
	:caption: Testlet: simple_and_augmented_assignment
		
Tuple assignment, recursive and in for-headers using enumerate
--------------------------------------------------------------

.. literalinclude:: ../../development/automated_tests/transcrypt/tuple_assignment/__init__.py
	:tab-width: 4
	:caption: Testlet: tuple_assignment
