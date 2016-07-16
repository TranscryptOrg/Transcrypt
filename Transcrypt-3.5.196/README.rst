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

Release 5 (version 3.5.196):

Thanks to everyone that has contributed ideas, bug reports and code examples. Without your cooperation this release would not be have been possible. Your work is much appreciated.

This release features iterators, generators and JavaScript 6 code generation for some crucial facilities, e.g. iterator-controlled for-loops and yield. Even if JavaScript 6 code is generated, the minifier will turn it into JavaScript 5 code, so it will run on most browsers.

The Python exception mechanism now blends with the JavaScript exception mechanism.
Almost all of the 'math' module and a small but essential path of the 'random' module have been added.

Also in this release is a simple example of how to make an iPhone/iPad web app. This is a full screen app that is freely distributed via the Internet and available off-line, represented by an icon on the home screen. It also runs in any PC browser.

Some simple facilities have been added to emulate blocking I/O in the browser using 'print' and 'input', obtaining input via JavaScript's 'prompt' dialog. This makes it possible to use Transcrypt for textbook examples in a learning environment, in combination with use of the the 'turtle' module already present.

Transcrypt is primarily a tool for professional production of web applications, retaining a clear structure and, by that, maintainability and flexibility. To that end, blending seamlessly with any JavaScript library, but also with node.js, remains a primary goal. It is possible to write large applications in Transcrypt that are every bit as fast as their JavaScript counterparts.

Still, explicitly drawing educational institutions into the game is not without reason. While suitable for large, professional projects, Python is also currently the nr. 1 language used in teaching kids and students to program. Being able to program for the browser in Python is very attractive for a generation where the Internet is a basic fact of life. The fact that Transcrypt also has excellent space and time efficiency makes it possible to 'grow' from education into professional application.

I am very curious about even the most modest uses of Transcrypt in this area. You can always mail me your experiences or ask questions, request features etc. I teach programming myself at the Hogeschool Rotterdam but also to kids, and I consider this an important inroad to future innovative power.

C-preprocessor-like conditional compilation was added using __pragma__ ('ifdef', ) and __pragma__ ('endif'). This facilitates optionally including autotestcode for JavaScript 6 but can also be used for production code.

The -s switch makes it possible to define symbols that can be used for conditional compilation but also for other purposes. The symbols are available at runtime in __main__.__symbols__.

Many bug fixes were applied as suggested by the issues contributed by several people.

Jacques de Hooge

What's new in the latest commits
================================

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
- A few methods of builtin types are currently left out, especially when they (almost) duplicate functionality of other methods. This results from a deliberate choice to keep Transcrypt lean.
- No eval and exec of Python code. This is again part of the concept. Transcrypt code is compiled, optimized and minified in advance to warant fast page loads. In this respect its design goal is fundamentally different from tools that compile on the fly in the browser. Transcrypt is targeted towards building professional, extensive, real world web applications that load and run as fast as their JavaScript counterparts, but offers Pythonically clean, modular structure and maintainability.
- No threading of any kind. Will probably stay that way as long as JavaScript doesn't properly support that.

Known bugs
==========

- //= operator not yet implemented.

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
