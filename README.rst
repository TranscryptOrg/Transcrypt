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

Status
======

Release 4 (version 3.5.161):

- Almost all of the math module and most important part of random module added
- Most important part of turtle module added. Uses SVG, see editable examples at: http://www.transcrypt.org/live/turtle_site/turtle_site.html
- Multi-level sourcemaps, annotated target code, virtualenv installation.
- Automated tests of functionality of compiled code OK.
- Manual tests of sourcemaps and random module OK.
- Further tests and feedback very welcome.
- Sourcemaps were tested on Chrome under Windows and Linux, but seem to work on Firefox under Linux as well.

What's new
==========

- "Mondrian" turtle demo added
- Other modules not exporting their imports anymore (fell over during previous fix)
- A module's __init__ now exports all of its imports to importers of that module
- Added clear method to dict + testcase
- Fixed error in set compare + testcase
- Fixed class def bug: inheriting from qualified ('dotted') classname, and fixed - Fixed class def bug: inheriting from qualified ('dotted') classname, and fixed broken error report on this
- Aliases added: case translates to py_case, default translates to py_default (switch already translated to py_switch)
- Readme adapted
- Fixes for wrong evaluation order when using // (issue 50) and for error in set and array compare (issue 51)
- Bug in random module fixed
- Bug in Linux compilation path fixed
- Python random module added, only most important functionality: *seed, randint, choice, random*
- Python math module added, almost all functionality
- Live on-line SVG based turtle graphics added to website + demo's
- Turtle graphics improved and expanded
- SVG based turtle graphics module added
- Multiple module initialization bug fixed
- Alias py_name (in JS) for name (in Python) added
- Installation procedure changed to benefit from virtualenv
- Optional annotation of target code with source file names and source line numbers
- Multi-level sourcemaps: Python source level debugging of both formatted and minified JavaScript code
- Source code included in map rather than separate as was the case earlier
- Switched from sectored V3 sourcemaps to monolithic V3 sourcemaps since they seem more mature and accepted

Known restrictions
==================

- No standard libs, use or encapsulate the JavaScript ones, that's part of the concept. Some may be ported though.
- Not all methods of builtin types are there by default. This results from a deliberate choice to keep Transcrypt lean. Such things can be distributed in separate libs.
- No eval and exec of Python code. This is again part of the concept. Transcrypt code is compiled, optimized and minified in advance to warant fast page loads.
- No threading of any kind. Will probably stay that way as long as JavaScript doesn't properly support that.
- No iterator, generator, xrange stuff. Maybe in the future if a broadly installed version of JavaScript suppports it.

Known bugs
==========

- None

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
