Project goal is to build a Python to Javascript transpiler with the following characteristics

- Allows for classical OO programming with *multiple inheritance*
- Simple relation between Python source and generated JavaScript code for easy debugging
- Seamless integration with the universe of high-quality JavaScript libraries
- Hierarchical URL based module system to prevent conflicts
- Compact downloads

Transcrypt already properly handles

- Multiple inheritance
- Recursive tuple assignment
- LHS and RHS slices, basic and extended
- Multi-loop and nested list comprehensions
- Assignment of bound function pointers

But it is still incomplete, although rapidly growing. If you need something now, use PyJs, Py2Js, RapydScript, Brython, Flexx, PyPyJs or any similar excellent projects.

What's new
==========

- Basic and extended slices, both LHS (pfff...) and RHS + testlet for those, docs adapted
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

Documentation
=============

Rather than duplicate info here, you're invited to read the growing *DOCS WITH CODE EXAMPLES* at http://sterlicht.alwaysdata.net/transcrypt.org/docs/html/

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

Miscellaneous
=============

- The Transcrypt website is under construction at http://www.transcrypt.org

Other packages you might like
=============================

- Multi-module Python source code obfuscator: https://pypi.python.org/pypi/Opy
- PLC simulator with Arduino code generation: https://pypi.python.org/pypi/SimPyLC
- A lightweight Python course taking beginners seriously (under construction): https://pypi.python.org/pypi/LightOn
- Event driven evaluation nodes: https://pypi.python.org/pypi/Eden
