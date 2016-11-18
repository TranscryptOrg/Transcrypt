.. figure:: http://www.transcrypt.org/illustrations/ruler_banner2.png
	:alt: Logo
	:target: http://www.transcrypt.org
	
Python in the browser, precompiled for speed: http://www.transcrypt.org
=======================================================================

- Precompiled into highly readable, efficient JavaScript, downloads kB's rather than MB's
- Multiple inheritance, optional operator overloading, metaclasses, properties, class and function decorators, hierarchical modules etc.
- Seamless integration with the universe of high-quality web-oriented JavaScript libraries, rather than the desktop-oriented Python ones
- Pure Python 3.5 syntax, using Python's native parser
- Debug directly from Python sourcecode, through integrated sourcemaps
- Generates JavaScript for humans, resembling the Python source line by line, optionally annotated with source line numbers
- Lightning fast JavaScript 5 and 6 code: call caching, for-loop optimization, in-line JavaScript etc.
- Integrated static typechecking and minification at the tip of a command line switch
- Also runs on top of node.js
- Extensive documentation with many code examples
- Apache 2.0 license
- Pip-install and go!

Latest stable release: Athens
=============================

To obtain the latest stable release including all updates, install it from PyPi as described in the `documentation 
<http://sterlicht.alwaysdata.net/transcrypt.org/docs/html/>`_.

Thanks to everyone who contributed!

Readability
===========

As can be seen below, there's a simple parallel between the Python and the JavaScript code.
In combination with the use of sourcemaps, this enables efficient debugging.
Also, code can be tested from the command prompt using stubs.

.. figure:: http://www.transcrypt.org/illustrations/class_compare.png
	:alt: Screenshot of Python versus JavaScript code
	
	**Classic OO with multiple inheritance in JavaScript**

Main differences with CPython
=============================

- Web batteries: Seamless access to any existing JavaScript library has been favored over inclusion of many Python libraries in the distribution. There are some exceptions to this rule, e.g. math, cmath, random, itertools, time and turtle, and some more may follow, but in general the accent is on libraries that are relevant in the browser.
- A few methods of builtin types are currently left out, especially when they (almost) duplicate functionality of other methods. Also method decorators (as opposed to function decorators and class decorators) are not supported, with the exception of @classmethod. This results from a deliberate choice to keep Transcrypt lean and fast.
- No eval and exec of Python code. This is again part of the concept. Transcrypt code is compiled, optimized and minified in advance to warant fast page loads. In this respect its design goal is fundamentally different from tools that compile on the fly in the browser. Transcrypt is targeted towards building professional, extensive, real world web applications that load and run as fast as their JavaScript counterparts, but offers Pythonically clean, modular structure and maintainability.

Information for contributors
============================

How to contribute
-----------------

Transcrypt started out as a personal repo, owned by Jacques de Hooge.
As the project caught on and the number of people contributing issues, ideas and code grew,
the repo was transferred to the QQuick organisation, to be able to form a developer team on GitHub.

There was also a clear message in this: Transcrypt isn't owned by anyone in particular.
It is the collective property of everyone using it or contributing to it.
At the same time the need was felt to keep a very firm grip on code quality, especially of the core.

Everything under ../transcrypt/modules/org/transcrypt plus the file ../transcrypt/\_\_main\_\_.py is considered to be part of Transcrypt's core.
A major design goal is to keep the core small and fast. This means that some CPython facilities were deliberately left out or simplified.
Core development is still mainly done by Jacques, but with the input of many great ideas submitted as issues.
If you want to improve something in the core, this is best initiated by first opening an issue for it.
Opening a pull request directly can lead to disappointment, although all effort is made to take good ideas seriously.

All other parts of Transcrypt are referred to as periphery.
While a good quality pull request for the periphery stands a reasonable chance of being accepted,
still it is wise to start an issue beforehand, allowing coordination and preventing waste of effort.

A special place is taken by implementing standard libraries. While Transcrypt mostly relies on browser-centric JavaScript libraries,
availability of a limited number of standard libraries will help acceptance by Python programmers. So you're most welcome to make a contribution here.
The design goal again is: better 90% complete, fast, small, and reliable, than 100% complete, slow, bulky and buggy.
If you contribute a library, please also contribute an autotest (see docs) and some documentation for it.
The supported platforms are Windows and Linux (and, with that, OsX).

While being open and respectful to any good ideas, the final say as to what gets in and what doesn't, is with Jacques.
So this is a dictatorial rather than a democratic project.
Being a sailer himself, Jacques values the notion of having one captain on a ship.
The captain doesn't own the ship, but he serves the passengers by consulting with the crew and plotting one stable course.

Another possibility to contribute libraries to Transcrypt is by submitting them as separate packages to PyPi.
In that case be sure to add the keyword Transcrypt to allow people to find your package.
Making your package pip-installable will also help it to catch on.
Contributing packages via PyPi of course means total freedom for the developer.

Development build status
------------------------

.. image:: https://travis-ci.org/QQuick/Transcrypt.svg?branch=master
    :target: https://travis-ci.org/QQuick/Transcrypt

The icon above shows the outcome of the continous integration test that is done on Linux after each commit.
The test consists of running a set of testlets, systematically covering all facilities of Transcrypt. Each testlet performs an automated back to back test against CPython.

The full set of testlets is described in the documentation and comes with the distribution.
Since the branching model has been deliberately kept simple, continuous integration may be transiently broken.
In that case you can use the latest passing version, that you'll find by clicking on the icon above and then on 'Build History'.

Each release, on the other hand, is preceded by at least the following tests:

- The automated back to back test described above, not only on Linux but also on Windows and, in case of relevant issues, on OsX.
- Automated compilation of the manual tests, human exercising of the resulting applications and a visual check of the results.
- Automated compilation of the demo's, human exercising of the resulting applications and a visual check of the results.
- A documentation build, followed by a visual sample check.

What's new in the latest commits
--------------------------------

- Emulation of sync console I/O for educational purposes, text only
- Autotest output now in tabular form for easy comparison, incl. source line nrs
- Fix for issue #178: List Comprehensions / Operator Precedence Bug
- Div. enhancements and fixes for CI tests
- Enhancement for issue #139: 'yield from' now supported. EXPERIMENTAL
- Enhancement for issue #89 and #149: __getattr__ and __setattr__ are now supported, requiring the -e 6 switch. Testlet 'proxies' added.
- New aliases added to prevent name clashes. The orignal name can always be reached by prepending js_. So e.g. if you need 'clear' in JS, use 'js_clear' in Python. A complete list of aliases is in the docs. Any alias can be undefined to maintain backward compatibility, e.g __pragma__ ('noalias', 'clear').
- Enhancement for issue #169: Add support for float('inf') and float('-inf')
- Python 3.6 numbers with dashes added
- Python 3.6 fstrings added 
- Travis CI test for the exceptions testlet repaired
- Initial version of chapter 'Differences with CPython' added to docs
- Travis CI activated
- Procedural improvement for issue #160: Sphinx _build dir should be Git ignored (since it obscures code diffs)
- Enhancement for issue #143: 'isinstance' deserves more compat
- Enhancement for issue #149: Transpile docstrings on demand
- Fix for issue #151: Problem with __include__ and special character inside js
- Enhancement for issue #150: The 'in' operator (was O (n), is now O (1))
- Enhancement for issue #147: str function should return string primitive, not 'new String ()'
- Fix for issue #145: List sorting (fails due to erroneous compare operator)
- Fix for issue #144: List comprehensions and opov (don't go well together, missing 'this' pointer)
- Fix for issue #138: Parse error using 'yield' in expression, 'send' missing (see testlet iterators_and_generators) and the discussion at the issue.
- Fix for issue #140: commandline --help / -h switch broken
- Enhancement for issue #128: metaclasses (only __new__ overridable) + test case / doc example
- Enhancement for issue #136: dict.get not implemented
- Fix for issue #134: %= operator translated incorrectly
- Enhancement for issue #130: Add pragma to optionally handle % the JS way
- Fix for issue #127: Can't use key 'keys' in a dict 
- Enhancement issue #113: Use for ... of pervasively for js6 + autotest  
- Fix for issue #125: strings not iterable (js6 only) + autotest
- Release 12
- Local classes now arbitrarily nestable, issue #120
- Operator % has now Python rather than JS behaviour, issue #123 + autotest
- Slicing bug fixed (stop beyond list end), issue #122 + autotest

.. figure:: http://www.transcrypt.org/illustrations/plotly_demo.png
	:alt: Plotly demo
	
	**Plotly demo**

- Plotly.js demo added: lim (Numscrypt -> Maturity) Transcrypt + Numscrypt + Plotly = Live Science Demos in the Browser with native JS performance, all Plotly.js plot types are supported
- __pragma__ ('jskeys'/'nojskeys') added make Plotly.js code match Plotly.js docs for convenience, locally voiding the need for quotes around dir keys
- 'Star us on GitHub' command line option added
- Fix for 'unexpected indent' when rebuilding
- Fix for accidentally deleting current path from sys.path in some installations
- Fix for 'cannot import __symbols__' bug when using -r with autotest.
- Exception hierarchy improved, all Transcrypt runtime exceptions now derive from Exception
- Non-standard attribute 'stack' added to Exception to obtain stack trace in de-facto JavaScript compatible way
- Attempt to iterate over non-iterable now results in exception (only when using -e 6 switch) (see issue #112))
- Iterating over TypedArrays and other non-list iterables fixed (only needed for when using -e 6 switch) (see issue #112)
- Release 9
- Truthyness of instances of custom classes fixed (see issue #110)
- Source map generation bug fixed (see issue #104)
- Optional static type validation using mypy (experimental)
- Small doc improvements
- Some more fixes for Numscrypt
- Fix to enable Numscrypt development
- \*args now also can be used in calling pure javascript methods (see issue #102)
- Pragma's else and elif fixed for use in .py rather than .js files

Other packages you might like
=============================

- Multi-module Python source code obfuscator: https://pypi.python.org/pypi/Opy
- PLC simulator with Arduino code generation: https://pypi.python.org/pypi/SimPyLC
- A lightweight Python course taking beginners seriously (under construction): https://pypi.python.org/pypi/LightOn
- Event driven evaluation nodes: https://pypi.python.org/pypi/Eden
- Numscrypt (under construction, very early stage), experimental port of a microscopic part of NumPy to Transcrypt, using JavaScript typed arrays: https://pypi.python.org/pypi/Numscrypt
