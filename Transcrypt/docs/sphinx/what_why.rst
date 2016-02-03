Transcrypt: what and why
========================

What is Transcrypt
------------------

Transcrypt is a tool to compile a fairly extensive subset of Python into compact, readable JavaScript. It has the following characteristics:

1. It's lightweight, in accordance Pareto’s rule adapted for IT: 99% of the result can be achieved with 1% of the effort.
2. It offers the semantic essence of Python along with the clean, highly readable syntax that the language is famous for
3. It cooperates flawlessly with the JavaScript universe of web-oriented libraries
4. It translates Python into highly readable, easy to debug JavaScript

In two words: it's *lean* and *mean*.

Language preferences, a subjective account
------------------------------------------

Language preferences are largely subjective. For some developers, JavaScript is the language of choice. They are right. For others it's Python. They're equally right. It just fits the way of thinking of many. The word 'pythonic' says it all: Programming in Python can be a joy. And, apart from being its own reward, taking joy in one's work enhances quality like no other incentive.

At the basis of Transcrypt lies the following shopping list:

- Python syntax
- Small downloads
- No barriers to the JavaScript / JQuery / DOM world
- Dynamic typing
- 'Classic' object orientation including multiple inheritance
- Static transpilation
- Lambda’s
- Named parameters
- Lists, dicts and sets
- List comprehensions
- Nested tuple assignment
- Assignment of bound functions

At the advent of Transcrypt there were many Python to JavaScript transpiler projects around, some of them quite mature. Neither of them fitted the above shopping list. Either the downloads were too large, or some of must have features were missing. To some, the shopping list may seem weird. Multiple inheritance? The whole Java world is doing without it. Exactly. And that's one of the reasons why a large category of developers shunned Java from the start. To them multiple inheritance has proven a powerful tool ever since it was introduced in C++.

So if it's all that subjective, why should *you* use it?. Well, *only if and when you like it*. That's all. In IT everything grows until it becomes unusable. One of the main goals of Transcrypt is to keep things simple, preventing it from disolution into an ocean of feature creep and conflicting demands. At its core it will stay lean and mean. For the rest: it's open. There's a hierarchical module system included right from the start, featuring Java-esque URL based unique package names. So, once the core of Transcrypt has stabilized, you're invited to help its ecosystem grow.

The ecosystem: different batteries
----------------------------------

To be effective, a programming language needs libraries. Python is famous for its 'batteries included' claim: Almost any library you can think of has been written for Python, and is available from a central location: https://pypi.python.org . But Python's batteries are desktop c.q. server batteries. And Transcrypt is for the web client world. So it needs different batteries. There's a virtually unlimited supply of free high quality JavaScript libraries for web applications. The web is dominated by designers and while programmers may loathe their way of thinking, they sure have created beautiful things. The set of available JQuery components alone beats almost anything available for the desktop from an aesthetic point of view. Rather than attempting to set up a parallel universe for Transcrypt, the only sensible thing to do is to embrace the JavaScript ecosystem to the max. There may be thin 'pythonic' wrappers around JavaScript libraries, but even this is not needed. JavaScript libraries can be used from Transcrypt without restrictions or complications.

There's a category of libraries c.q. applications that are probably developed easier in Transcrypt than in JavaScript. Transcrypt's niche are non-trivial web applications where, apart from looks, things like structure, overview, simplicity, explicitness and regularity start to count. This is where Python shines and Transcrypt with it. The preferred way to make Transcrypt libraries and applications avaible to the world is PyPi, Transcrypt being a Python flavour.

Code structure
--------------

In the JavaScript world, components are gathered from everywhere on the web during a page load, and small fragments of code may be anywhere in a web page. Transcrypt takes a different approach. The concept of a static webpage is secundary and may even be absent. Typically there's one and only one Transcrypt application attachted to a certain URL or page. This application has it's own namespace and may feature many entrypoints or callbacks attached to DOM components. Although traditional web pages can be made without restrictions using Transcrypt, the focus is on complex stateful web applications rather than on static pages interspersed with code fragments. Typically such a web application will rely on the server to store and retrieve data and program state. Although at some point 'pythonic' libraries may come into existence to facilitate this, direct use of JavaScript AJAX or e.g. of a JQuery AJAX wrapper, will do the job fine.

Debuggability
-------------

In order to debug a transpiled web app, it helps a lot if there's a simple correspondence between the Python source code and the generated JavaScript. In Transcrypt this is the case, as is illustrated by the following code fragments:

+--------------------------------------------+--------------------------------------------+
|    .. literalinclude:: ../code/classes.py  |    .. literalinclude:: ../code/classes.js  |
|        :tab-width: 4                       |        :tab-width: 4                       |
|        :caption: classes.py                |        :caption: classes.js                |
+--------------------------------------------+--------------------------------------------+