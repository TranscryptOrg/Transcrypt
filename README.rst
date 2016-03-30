Transcrypt is a tool to precompile a fairly extensive subset of Python into compact, readable Javascript. It has the following characteristics:

- Allows for classical OO programming with *multiple inheritance* using pure Python syntax, parsed by CPython's native parser
- Seamless integration with the universe of high-quality web-oriented JavaScript libraries, rather than the desktop-oriented Python ones
- Hierarchical URL based module system to prevent name conflicts
- Simple relation between Python source and generated JavaScript code for easy debugging
- Compact downloads, kB's rather than MB's
- Lightning fast JavaScript code, using memoization (call caching) to optionally bypass the prototype lookup chain
- Operator overloading can be switched on and off locally to facilitate use for numerical math that's both readable and efficient

Request to early adopters
=========================

As you may have already discovered, Transcrypt is lean, fast, generates highly readable JavaScript, covers most of Python, including multiple inheritance, properties, tuple assignment, \*\*kwargs, \*args and selective operator overloading, and it cooperates seamlessly with any JavaScript library.
The first version is 3.5, not for marketing reasons, but to make clear what is the matching version of CPython.

While work on Transcrypt will continue, what's most important now for Transcrypt to become a permanent, well-maintained asset for the programmer community is mindshare!
This can only be achieved with your help.
Do you think it deserves a lasting place under the sun?
Do you want it to be at your disposal, evolve and have an active community to answer your questions?
Then let the world know it exists!
Do you know someone who can blog about it?
Please ask that person to do so...
Want to show your discovery to your colleagues, classmates or friends?
Go ahead... 

For me this is about having pleasure in ones job. I've enjoyed laying the groundwork for Transcrypt. And I hope many will enjoy using it.

Jacques de Hooge, Rotterdam, Netherlands

.. figure:: http://www.transcrypt.org/illustrations/logo_white_small.png
	:alt: Logo
	
	**Transcription once used to be manual labour**
	
Documentation with code examples and forum
==========================================

Take a look at the documentation with code examples at the Transcrypt website: http://www.transcrypt.org .
Some people have contacted me personally with 'howto' questions and feature requests. While that's quite alright, if you want others to benefit from the answers, use the forum: http://transcrypt.boards.net .

Status
======

Transcrypt is in Beta now.
This means that the core is considered feature complete for the first release and has been rather well tested, although omissions and bugs may still surface.
It can be safely said that at this moment Transcrypt is already an attractive alternative for writing JavaScript code in a professional setting.
The Beta status will be maintained for some time to allow for feedback and ironning out the last wrinkles.
Bugs can be reported as GitHub issues at: https://github.com/JdeH/Transcrypt .

What's new
==========

- Overloaded unary minus added
- On static checker internal error: report and skip checks for that module
- Bug in 'break' handling fixed
- Optional -s (--parent) command line option to facilitate compilation for e.g. node.js
- "Saving..." message now shows result location
- Fix for string.replace bug
- Bugfix release: debug switch set to False
- Tuple stripping optimization added for simple indices
- For loops optimized for contiguous ranges
- Code formatting of __pragma__ ('js') improved
- Extended slices tested on Linux
- Extended slices completed (pfff...), autotest added, not yet tested on Linux
- Module search for Transcrypt -r and Transcrypt [-b] now both use same sys.path contents
- Setup.py adapted to Linux' case sensitivity
- Unload preloaded org module, since it may be shadowed by a Trancrypt-specific one
- Package name changed to lowercase
- Extended slices added to support Numscrypt, not yet finished
- Tuple representation made more compact
- Slices return list rather than array
- Methods insert and pop added to list
- Python pass statement now translates to /\* pass \*/
- Superfluous semicolons removed when in compiling with static check switch
- nonlocal implemented + testcase.
- Missing com.fabricjs module added.
- Fix for missing getsitepackages () of virtualenv, tested.
- Fix for missing global and nonlocal, only partially tested.
- Core is feature complete for first release.
- Status moved to Beta.

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
