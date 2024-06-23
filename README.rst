.. figure:: https://www.transcrypt.org/illustrations/ruler_banner2.png
    :alt: Logo
    :target: https://www.transcrypt.org
        
Python in the browser, precompiled for speed: https://www.transcrypt.org
=========================================================================

- Precompiled into highly readable, efficient JavaScript, downloads kB's rather than MB's
- Multiple inheritance, optional operator overloading, metaclasses, async/await, properties, decorators, hierarchical modules etc.
- Seamless integration with the universe of high-quality web-oriented JavaScript libraries, rather than the desktop-oriented Python ones
- Pure Python 3.9 syntax, using Python's native parser
- Debug directly from Python sourcecode, through integrated sourcemaps
- Generates JavaScript for humans, resembling the Python source line by line, optionally annotated with source line numbers
- Lightning fast JavaScript 6 code: call caching, for-loop optimization, in-line JavaScript etc.
- Integrated static type checking and minification at the tip of a command line switch
- Also runs on top of node.js
- Extensive documentation with many code examples
- Apache 2.0 license
- Pip-install and go!

Latest stable release: Berlin
=============================

`>>> GET STARTED! <https://www.transcrypt.org/#hello>`__
========================================================

Thanks to everyone who contributed!

Readability
===========

As can be seen below, there's a simple parallel between the Python and the JavaScript code.
In combination with the use of sourcemaps, this enables efficient debugging.
Also, code can be tested from the command prompt using stubs.

.. figure:: https://www.transcrypt.org/illustrations/class_compare.png
    :alt: Screenshot of Python versus JavaScript code
    
    **Classic OO with multiple inheritance in JavaScript**

Main differences with CPython
=============================

- Web batteries: Seamless access to any existing JavaScript library has been favored over inclusion of many Python libraries in the distribution. There are some exceptions to this rule, e.g. math, cmath, random, itertools, re, time, datetime and turtle, and some more may follow, but in general the accent is on libraries that are relevant in the browser.
- No eval and exec of Python code. This is again part of the concept. Transcrypt code is compiled, optimized and minified in advance to warant fast page loads. In this respect its design goal is fundamentally different from tools that compile on the fly in the browser. Transcrypt is targeted towards building professional, extensive, real world web applications that load and run as fast as their JavaScript counterparts, but offers Pythonically clean, modular structure and maintainability.

License
=======

Copyright 2014 - 2023 Jacques de Hooge, GEATEC engineering, www.geatec.com

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

How to contribute
=================

Transcrypt started out as a personal repo, owned by Jacques de Hooge.
As the project caught on and the number of people contributing issues, ideas and code grew,
the repo was transferred to the QQuick organisation, to be able to form a developer team on GitHub.
Then more recently, to insure its continued development, the GitHub repo has been moved to `TranscryptOrg <https://github.com/TranscryptOrg>`_, where Transcrypt and related projects can be more centrally located.

There was also a clear message in this: Transcrypt isn't owned by anyone in particular.
It is the collective property of everyone using it or contributing to it.
At the same time the need was felt to keep a very firm grip on code quality, especially of the core.

Everything under ../transcrypt/modules/org/transcrypt plus the file ../transcrypt/\_\_main\_\_.py is considered to be part of Transcrypt's core.
A major design goal is to keep the core small and fast. This means that some CPython facilities were deliberately left out or simplified.
Core development is still mainly done by Jacques, but with the input of many great ideas submitted as issues.
If you want to improve something in the core, this is best initiated by first opening an issue for it.
Opening a pull request directly can lead to disappointment, although all effort is made to take good ideas seriously.

All other parts of Transcrypt are referred to as periphery.
While a good quality pull request for the periphery stands a reasonable chance of being accepted,
still it is wise to start an issue beforehand, allowing coordination and preventing waste of effort.

A special place is taken by implementing standard libraries. While Transcrypt mostly relies on browser-centric JavaScript libraries,
availability of a limited number of standard libraries will help acceptance by Python programmers. So you're most welcome to make a contribution here.
The design goal again is: better 90% complete, fast, small, and reliable, than 100% complete, slow, bulky and buggy.
If you contribute a library, please also contribute an autotest (see docs) and some documentation for it.
The supported platforms are Windows and Linux (and, with that, OSX).

While being open and respectful to any good ideas, the final say as to what gets in and what doesn't, is with Jacques.
So this is a dictatorial rather than a democratic project.
Being a sailer himself, Jacques values the notion of having one captain on a ship.
The captain doesn't own the ship, but he serves the passengers by consulting with the crew and plotting one stable course.

Another possibility to contribute libraries to Transcrypt is by submitting them as separate packages to PyPi.
In that case be sure to add the keyword Transcrypt to allow people to find your package.
Making your package pip-installable will also help it to catch on.
Contributing packages via PyPi of course means total freedom for the developer.

Deployment testing
========================
The full set of testlets is described in the documentation and comes with the distribution.
Each release is preceded by at least the following tests:

- The automated back to back test described above, not only on Linux but also on Windows and, in case of relevant issues, on OSX.
- Automated compilation of the manual tests, human exercising of the resulting applications and a visual check of the results.
- Automated compilation of the demo's, human exercising of the resulting applications and a visual check of the results.
- A documentation build, followed by a visual sample check.

What's new in the latest commits
================================

- Code generator adapted to Python 3.9 parser
- Updated README and packaging configuration

Known bugs in latest commits
============================

None

Other packages you might like
=============================

- Numscrypt - port of a microscopic part of NumPy to Transcrypt, using JavaScript typed arrays: https://github.com/QQuick/Numscrypt
- SimPyLC - PLC simulator with Arduino code generation: https://github.com/QQuick/SimPyLC
