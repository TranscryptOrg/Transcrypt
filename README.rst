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

Release 7 (version 3.5.213):

This release features

- Parameterless and parametrized function and class decorators
- Transcrypt's 'in' operator expanded to work on JavaScript objects as well, for better integration of Python dicts and JavaScript objects, especially literals
- Else clause for exceptions added
- Complex numbers
- The cmath library has been added in preparation of expansion of NumScrypt, a.o. with (I)FFT and in general in making Transcrypt suitable for interactively demonstrating low volume scientific and technical computations in the browser.
- Documentation and autotest expanded accordingly
- Several bugs fixed

Thanks to anyone who contributed!

Jacques de Hooge

What's new in the latest commits
================================

- Release 7
- Module cmath added + autotest
- Else-clause for exceptions added
- Complex numbers added + autotest (no cmath module yet)
- Transcrypt's 'in' operator now also works on objects for better integration of Python dicts and JavaScript objects, especially literals
- Class decorators added + autotest
- Function decorators with parameters + autotest
- Parameterless function decorators + autotest
- Release 6
- Docs updated
- Local classes added + autotest
- Dict method pop added, setdefault fixed + autotest for both
- Time module added + autotest + shipment test
- String split and rsplit fixed
- Export all imports
- Added: any, all, assert
- Readme adapted
- Workaround for console.log.apply removed
- Several small fixes
- Itertools now functionally complete, except for zip_longest. First breed of autotests added for it. Some func's still relies on seq's rather than iter's.
- Added: __pragma__ ('ifndef'), __pragma__ ('else')
- Doc's updated, empty your browser cache and read about the newest facilities on-line
- Shipment test expanded with es6 compilation
- Conditional compilation pragma's added to facilitate optional es6 autotesting
- Generators, yield and es6 compilation added + testcases, while retaining es5 compatible minified output
- Compilation for node.js fixed
- Blending between Python and JavaScript exceptions
- Swallowing of unrecognized exceptions fixed
- Iterator protocol supported

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
