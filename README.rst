.. figure:: http://www.transcrypt.org/illustrations/ruler_banner2.png
	:alt: Logo
	:target: http://www.transcrypt.org
	
Python in the browser: http://www.transcrypt.org
================================================
	
- Pure Python 3.5 syntax, using Python's native parser
- Precompiled into highly readable JavaScript for speed, downloads kB's rather than MB's
- Multiple inheritance, optional operator overloading, metaclasses, properties, class and function decorators, hierarchical modules etc.
- Seamless integration with the universe of high-quality web-oriented JavaScript libraries, rather than the desktop-oriented Python ones
- Generates readable JavaScript that resembles the Python source line by line
- Debug from Python sourcecode, through integrated sourcemaps
- Lightning fast JavaScript 5 and 6 code: call caching, for-loop optimization, in-line JavaScript etc.
- Integrated static typechecking and minification at the tip of a command line switch
- Also runs on top of node.js
- Extensive documentation with many code examples
- Apache 2.0 license
- Pip-install and go!

Latest release: Athens
======================

Thanks to everyone who contributed!

What's new in the latest commits
================================

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

Known restrictions
==================

- Only a very limited selection of standard libs have been chosen for inclusion in the Transcrypt distribution. Use or encapsulate the JavaScript ones, that's part of the concept. Some additional standard libs may be ported in the future though.
- A few methods of builtin types are currently left out, especially when they (almost) duplicate functionality of other methods. Also method decorators (as opposed to function decorators and class decorators) are not supported, with the exception of @classmethod. This results from a deliberate choice to keep Transcrypt lean and simple.
- No eval and exec of Python code. This is again part of the concept. Transcrypt code is compiled, optimized and minified in advance to warant fast page loads. In this respect its design goal is fundamentally different from tools that compile on the fly in the browser. Transcrypt is targeted towards building professional, extensive, real world web applications that load and run as fast as their JavaScript counterparts, but offers Pythonically clean, modular structure and maintainability.
- No threading of any kind. Will probably stay that way as long as JavaScript doesn't properly support that.

Known bugs
==========

None

Readability
===========

As can be seen below, there's a simple parallel between the Python and the JavaScript code.
So it should be easy to debug.
Also, code can be tested from the command prompt using stubs.

.. figure:: http://www.transcrypt.org/illustrations/class_compare.png
	:alt: Screenshot of Python versus JavaScript code
	
	**Classic OO with multiple inheritance in JavaScript**

Other packages you might like
=============================

- Multi-module Python source code obfuscator: https://pypi.python.org/pypi/Opy
- PLC simulator with Arduino code generation: https://pypi.python.org/pypi/SimPyLC
- A lightweight Python course taking beginners seriously (under construction): https://pypi.python.org/pypi/LightOn
- Event driven evaluation nodes: https://pypi.python.org/pypi/Eden
- Numscrypt (under construction, very early stage), experimental port of a microscopic part of NumPy to Transcrypt, using JavaScript typed arrays: https://pypi.python.org/pypi/Numscrypt
