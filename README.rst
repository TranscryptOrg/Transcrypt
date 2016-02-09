Transcrypt is a tool to precompile a fairly extensive subset of Python into compact, readable Javascript. It has the following characteristics:

- Allows for classical OO programming with *multiple inheritance*
- Seamless integration with the universe of high-quality web-oriented JavaScript libraries, rather than the desktop-oriented Python ones
- Hierarchical URL based module system to prevent name conflicts
- Simple relation between Python source and generated JavaScript code for easy debugging
- Compact downloads, kB's rather than MB's

Request to early adopters
=========================

Transcrypt is in Alpha now!
As you may have already discovered, it is lean, fast, generates higly readable JavaScript, covers most of Python, including stuff like multiple inheritance, properties, tuple assignment, \*\*kwargs and \*args, and it cooperates seamlessly with any JavaScript library.
The first version will be 3.5, not for marketing reasons, but to make clear what is the matching version of CPython.

While work on Transcrypt will continue, what's most important now for Transcrypt to become a permanent, well-maintained asset for the programmer community is mindshare!
This can only be achieved with your help.
Do you think it deserves a lasting place under the sun?
Do you want it to be at your disposal, evolve and have an active community to answer your questions?
Then let the world know it exists!

Do you know someone who can blog about it?
Please ask that person to do so...
Want to show your discovery to your colleagues, classmates or friends?
Go ahead... For me this is about having pleasure in ones job. I've enjoyed laying the groundwork for Transcrypt. And I hope many will enjoy using it.

Jacques de Hooge, Rotterdam, Netherlands

.. figure:: http://www.transcrypt.org/illustrations/logo_white_small.png
	:alt: Logo
	
	**Transcription once used to be manual labour**
	
Documentation with code examples and forum
==========================================

Take a look at the growing documentation with code examples at the Transcrypt website: http://www.transcrypt.org
Some people have contacted me personally with 'howto' questions and feature requests. While that's quite alright, if you want others to benefit from the answers, use the forum: http://transcrypt.boards.net

Status
======

- The fabric.js library has been encapsulated as a Transcrypt module. Seamless JavaScript integration is a fact now.
- Working Pong example added to http://www.transcrypt.org and to the distribution.
- ALL THE PLANNED FEATURES ARE NOW AVAILABLE. Those were: functions incl. lambda's, classes, multiple inheritance, dynamic typing, tuples, lists incl. comprehensions, properties, dicts, sets, modules. But there's a lot more (see docs). Development of Transcrypt has gone much faster than anticipated. Automated back-to-back regression testing with CPython has proven of key value. If new features are added, establishing that nothing has fallen over is a matter of seconds. This will allow Transcrypt to keep up with developments in the future. While Transcrypt still alpha, it's almost ready to occupy its niche between PyJs, Py2Js, RapydScript, Brython, Flexx, PyPyJs or any similar excellent projects.

What's new
==========

- Twitter account opened for notification of new versions (see http://www.transcrypt.org)
- Documentation improved on several points.
- Everything tested under Linux as well.
- Linux support added. Installation and behaviour under Windows and Linux is identical.
- Several bugs fixed, e.g. <aString>.format (*args)
- Simple jQuery example added
- __pragma__ ('alias', ...) added, e.g. to generate $ from S or jq
- __pragma__ ('js', ...) improved
- Css files etc. for docu included
- Error reporting improved, module import bug fixed (-b was needed first)
- Docs improved, 'hello' example added showing HTML - JavaScript - Python cooperation in a nutshell
- Early adopter request added
- Properties, including tuple assignment: x, y, z = property (getX, setY), property (getY, setY), property (getZ, setZ)
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

Known restrictions
==================

- No standard libs, use or encapsulate the JS ones, that's part of the concept. Some may be ported though.
- Not all methods of builtin types are there by default. This is deliberately to keep Transcrypt lean. Such things can be distributed in separate libs.
- No set or dict comprehensions yet. Should be easy but low priority.
- No eval and exec (will stay that way, with minor exceptions)
- No threading of any kind. Will probably stay that way as long as JS doesn't properly support that.
- No operator overloading. May be added, but low priority
- _name doesn't mean private in any way
- No iterator, generator, xrange stuff. Maybe in the future if JS becomes better at that kind of things

Known bugs
==========

- Syntax error reporting broken, other error reporting confusing. PRIORITY: HIGH

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
