Transcrypt is a tool to precompile a fairly extensive subset of Python into compact, readable Javascript. It has the following characteristics:

- Allows for classical OO programming with *multiple inheritance* using pure Python syntax, parsed by CPython's native parser
- Seamless integration with the universe of high-quality web-oriented JavaScript libraries, rather than the desktop-oriented Python ones
- Hierarchical URL based module system to prevent name conflicts
- Simple relation between Python source and generated JavaScript code for easy debugging
- Multi-level sourcemaps and optional annotation of target code with source references
- Compact downloads, kB's rather than MB's
- Lightning fast JavaScript code, using memoization (call caching) to optionally bypass the prototype lookup chain
- Operator overloading can be switched on and off locally to facilitate use for numerical math that's both readable and efficient

.. figure:: http://www.transcrypt.org/illustrations/logo_white_small.png
	:alt: Logo
	
	**Transcription once used to be manual labour**
	
Documentation with code examples
================================

Take a look at the documentation with code examples at the Transcrypt website: http://www.transcrypt.org .

Status of latest release
========================

Release: Athens (PyPi v3.5.229, GitHub #12)

This release is mainly a bug fix release for Athens v3.5.222, which contains:

- Improved support for the new, redesigned core of Numscrypt. While Numscrypt is still in its infancy, its scope has been widened from merely educational to general use for computations in the browser. A number of optimizations have been put in place, resulting in performance comparable to pure JS numerical libraries. The difference is that Transcrypt (or rather Python), with its facilities for operator overloading, allows a much more concise and readable notation of numerical algorithms. Plans are to gradually build out Numscrypt with more functionality.
- Optional static type validation (experimental) using type annotations. Static type validation is activated simply by a command switch. Internally it relies on the mypy project. While this project is still in flux, the resulting productivity improvement is already impressive. Since static type validation is optional and cannot break your code, you can get 90% of the benefits from it rightnow without risk. Even only statically typing the interfaces between modules immediately pays off, especially when working with a team. Don't believe it, try it!
- Div. fixes.

Thanks to everyone who contributed!

Jacques de Hooge

What's new in the latest commits
================================

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
