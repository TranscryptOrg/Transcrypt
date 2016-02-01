THE TRANSCRYPT FORUM IS NOW ONLINE, CLICK THE FORUM LINK AT http://www.transcrypt.org

.. figure:: http://www.transcrypt.org/illustrations/logo.png
	:alt: Logo

Transcrypt is a tool to precompile a fairly extensive subset of Python into compact, readable Javascript. It has the following characteristics:

- Allows for classical OO programming with *multiple inheritance*
- Seamless integration with the universe of high-quality web-oriented JavaScript libraries, rather than the desktop-oriented Python ones
- Hierarchical URL based module system to prevent name conflicts
- Simple relation between Python source and generated JavaScript code for easy debugging
- Compact downloads, kB's rather than MB's

.. figure:: http://www.transcrypt.org/illustrations/monk_transcribing.png
	:alt: Monk transcribing
	
	**Transcription once used to be manual labour**
	
Documentation with code examples
================================

Take a look at the growing documentation with code examples at the Transcrypt website: http://www.transcrypt.org

Status
======

- The fabric.js library has been encapsulated as a Transcrypt module! Seamless JavaScript integration is a fact now.
- Working Pong example added to www.transcrypt.org and to the distribution.
- ALL THE PLANNED FEATURES ARE NOW AVAILABLE. Those were: functions incl. lambda's, classes, multiple inheritance, dynamic typing, tuples, lists incl. comprehensions, dicts, sets, modules. But there's a lot more (see docs). What's mainly missing are some handy members of the string, list, dict and set classes. Also the interoperability with JavaScript has to be tested. If you need something now, use PyJs, Py2Js, RapydScript, Brython, Flexx, PyPyJs or any similar excellent projects. However the development of Transcrypt is has gone faster than anticipated. Automated back-to-back regression testing with CPython has proven of key value. If new features are added, establishing that nothing has fallen over is a matter of seconds.

What's new
==========

- Properties, inclusive tuple assignment: x, y, z = property (getX, setY), property (getY, setY), property (getZ, setZ)
- Forum online
- Docs adapted
- Pong example added
- Minification fixed
- List comprehension tuple assignment bug fixed (pfff ** 2)
- fabric.js graphis module added
- Many bug fixes
- Autotest output (active, using autotest.js) added to www.transcrypt.org
- __pragma__ ('kwargs') and __pragma__ ('nokwargs') added + -kwargs command line argument
- \*\*kwargs bug fixed
- \*args, \*\*kwargs, default values both def time and call time completed + testcase + docs
- \*args, \*\*kwargs, default values a la Python 3.5, partially finished + testcase + docs
- Lambda functions + testcase + docs
- Conditional expressions finished + testcase + docs
- Minification added using Google's closure compiler, included in distro and run automatically
- Exceptions added + autotest + docs
- Function inheritance bug fixed (ooops...)
- Autotest output example added to docs
- Docs adapted
- +=, -=, \*= etc., optimized towards ++ and --, autotest added
- For...else, while...else..., break, continue completed, autotest added
- Import ... as, from ... import and from ... import as ... added, autotest augmented
- Transcript.org website dressed up a little
- Basic and extended slices, both LHS (pfff...) and RHS, testlet for those, docs adapted
- Many string methods added
- Autotests added for listcomps and nested tuple assignment
- Autotester slightly improved
- Nested multi-loop list comprehensions
- Working autotester + first start of regression test set
- First start of documentation
- Some datastructures and members
- Some work done on zip, enumerate and stuff like that
- Some operators
- Recursive tuple assignment (pfff...)
- Manual tests added in interactive_tests  subdir
- A simple start made with an autotest/regressiontest feature. This will REALLY be needed! But Transcrypt first needs to be able to support it...
- Transpiler core

Known limitations
=================

- GENERALLY PRE-ALPHA, SO IN FLUX AND PROBABLY WITH SOME HOLES
- No standard libs, use or encapsulate the JS ones, that's part of the concept. Some may be ported though.
- Builtin library incomplete (e.g. methods of builtin types)
- No set or dict comprehensions yet. Should be easy but low priority.
- No eval and exec (will stay that way, with minor exceptions)
- No threading of any kind. Will probably stay that way as long as JS doesn't properly support that.
- No operator overloading. May be added for [] and (), but low priority
- _name doesn't mean private in any way
- No iterator, generator, xrange stuff. Maybe in the future if JS becomes better at that kind of things
- JavaScript interoperation undocumented and largely untested, will change, high priority
- No good elaborated example. As a first I'll try to make pong for the browser or something like that.

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
