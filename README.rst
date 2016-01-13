This project started out as a mere hobby, acting on an impulse.
But I guess it's becoming a bit serious now.

Project goal is to build a Python to Javascript transpiler that:

- Allows for "classic" OO programming for the web with minimal overhead, using a small, but relevant subset of Python
- Offers acces to the JavaScript rather than the Python ecosystem: different batteries

If you need something now, use PyJs, Py2Js, RapydScript, Brython, Flexx, PyPyJs or any similar excellent projects.
Note that there's not any guarantee that Transcrypt will ever be nearly as proficient as any of these.

What's new
==========

- Some datastructures and members
- Some work done on zip, enumerate and stuff like that
- Some operators
- Recursive tuple assignment (pfff...)
- Manual tests added in interactive_tests  subdir
- A simple start made with an autotest/regressiontest feature. This will REALLY be needed! But Transcrypt first needs to be able to support it...
- VERY VERY BASIC transpiler, transpiling only a minute, completely unusable subset of Python. Try the basic test if you like to experiment.

Philosphy
=========

I've embarked on this project since I have my own personal wish list. I was writing a web application. Having done so before many times using JavaScript directly, I decided I wanted Python. It just fits my way of thinking, that's all. Furthermore I noticed that in practice I rely mostly on a limited set of features of the language.
To be productive with Python on the web, I need at least the following:

- Python syntax
- Dynamic typing
- Small downloads
- Multiple inheritance
- Static transpilation
- Lambda's
- Assignment of bound methods to variables
- Recursive tuple assignment
- List comprehensions
- Named parameters
- No barriers to the JavaScript / JQuery / DOM world (web rather than desktop "batteries")
- Java-like URL-based hierarchical module naming convention, should this ever really grow
- Pareto's rule adapted for IT: 99% of the result can be achieved with 1% of the effort

So I surveyed the existing projects. While they were clever and mature, none of them seemed to fit my list. Either the downloads were bulky, or I had to do without some features from my list.
So I decided that there was room for another project.
Initially I had some doubts about the feasibility, but with the first tests these doubts are almost completely gone.
Multiple inheritance, assignment of bound functions and hierachical modules are already a fact.
This is only a VERY VERY VERY VERY VERY TINY beginning.
But at this moment I see no reason why it couldn't be built out.

Of course in an ideal world I'd like real Python running natively in the browser. But I am afraid that's just not going to happen. In the web world the "moving mass" of JavaScript is just too big. Initiatives like asm.js only illustrate this situation. So I decided to acknowledge reality: JavaScript rules by the numbers and anything viable will have to deal with that fact. The first and foremost goal of anyone writing a browser is efficient execution and debugging of everyday down to earth lowest common denominator JavaScript. Transcrypt had to be a 'light-weight wrapper' around that.

And wouldn't JavaScript itself eventually evolve into something Pythonesque? While there are certainly trends in that direction, the problem is that it has backward compatibility to deal with. And it's designed by a group, rather than having a BDFL. My father, who was in IT in the 50's of the previous century, used to say that a camel is a horse designed by a committee.

One of the strong points of Python is the plethora of libraries available for it. But at this point the JavaScript world can compete: The number of JavaScript libraries is virtually unlimited and, to my experience, the quality is high. So rather than shoehorning many Python libraries into Transcrypt I decided that this should be the border of the territory. While certain Python libraries may become available, there's a world of JavaScript stuff out there. The 'light-weight wrapper' philosophy extends to the libraries: In some cases it will be worth-while giving a JavaScript library a Python wrapper. But in many cases the best thing is probably just to use them natively. So one very important design goal of Transcrypt is to blend gracefully with native JavaScript libraries, something that I expect to be much easier to do for a thin wrapper than e.g. for a full blown Python compiling to asm.js.

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

And the rest:

- No idea

Other packages you might like
=============================

- Multi-module Python source code obfuscator: https://pypi.python.org/pypi/Opy
- PLC simulator with Arduino code generation: https://pypi.python.org/pypi/SimPyLC
- A lightweight Python course taking beginners seriously (under construction): https://pypi.python.org/pypi/LightOn
- Event driven evaluation nodes: https://pypi.python.org/pypi/Eden

