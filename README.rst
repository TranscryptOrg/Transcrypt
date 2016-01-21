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

Take a look at the growing documentation with code examples at the Transcrypt website: http://www.transcrypt.org/

Status
======

Transcrypt is still incomplete. If you need something now, use PyJs, Py2Js, RapydScript, Brython, Flexx, PyPyJs or any similar excellent projects. However the development of Transcrypt is going much faster than anticipated. Automated back-to-back regression testing with CPython has proven of key value. If new features are added, establishing that nothing has fallen over is a matter of seconds.

What's new
==========

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

Readability
===========

As can be seen below, there's a simple parallel between the Python and the JavaScript code.
So it should be easy to debug.
Also, code can be tested from the command prompt using stubs.

.. figure:: http://www.transcrypt.org/illustrations/class_compare.png
	:alt: Screenshot of Python versus JavaScript code
	
	**Classic OO with multiple inheritance in JavaScript**

Where it's heading
==================

What should be in eventually to call this project a success:

- Functions incl. lambda's, classes, multiple inheritance, dynamic typing, tuples, lists incl. comprehensions, dicts, sets, modules

What will never be in:

- Eval, exec

Other packages you might like
=============================

- Multi-module Python source code obfuscator: https://pypi.python.org/pypi/Opy
- PLC simulator with Arduino code generation: https://pypi.python.org/pypi/SimPyLC
- A lightweight Python course taking beginners seriously (under construction): https://pypi.python.org/pypi/LightOn
- Event driven evaluation nodes: https://pypi.python.org/pypi/Eden
