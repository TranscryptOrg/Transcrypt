The philosophy behind Transcrypt and its impact on design decisions
===================================================================

Transcrypt's primary target audience
------------------------------------

Transcrypt is written for internet developers who:

- Prefer Python over JavaScript for the development of complex, yet maintainable web software with minimal lifecycle costs
- Need their software to be every bit as fast and compact ast the native JavaScript counterparts
- Want unrestricted use of any JavaScript library or platform

In this primary target audience there are at least two groups to be distinguished and a third group on the border.

Seasoned Python developers
~~~~~~~~~~~~~~~~~~~~~~~~~~

They may be using Python on the server-side (e.g. Django) or in developing computational applications (NumPy, SciPy), or in fact in any area of computing.
These 'pythonistas' value what they've got: A clean, concise, powerful language, able to tackle any IT problem, especially in combination with C++.
When faced with JavaScript in the browser, they experience a frustrating loss of productivity, being bogged down in an organically grown mix of HTML, CSS and JavaScript.

For them the news is that they have more viable options:

Is HTML ok? They can use it. Do they find it restrictive? They can manipulate the underlying object model directly in Python.
Is CSS ok for them? No urge to change then. Do they find it utterly confusing, inconsequent, repetitive and static? They can access the underlying style attributes dynamically in Python.
Is JavaScript ok for them? If it ain't broke, don't fix it. Did they already experience that for larger applications the overall structure tends to become messy? They can switch to Python, keeping full access to any JavaScript library.

Recently legitimate worries have surfaced about the JavaScript world becoming more an more fragmented. Transcrypt is not about fragmentation but about unification. It doesn't introduce a new language. It makes a mainstream server side language available for development of client side code, without sacrificing performance, compactness or compatibility.

Seasoned JavaScript developers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

They may have been using JavaScript for a long time and have accepted its quirks as a fact of life. If it's their first language they will probably not perceive any of its drawbacks as restrictive. But even in that case a part of them will eventually explore other languages, look back and clearly see its limitations.

All the talk of speed in JavaScript suddenly becomes irrelevant in the light of using C++ for computation-intensive algorithms. And all the talk about prototypes in fact being superior to class based object orientation suddenly seems to lack substance when real, non-textbook programming experience is gained in a truly class based language rather than one eventually acquiring the keyword 'class' to cover its prototyping guts.

If these developers are confronted with the need to develop a new, large, complex web application, they may think about software lifecycle costs and decide that it would be best to develop the client side in Python, provided that execution- and page-load performance is fully maintained.

Other developers
~~~~~~~~~~~~~~~~

In this group will be experienced developers who are familiar with C++, C, C#, Java or any other language. But it also includes students of any kind, being serious about a professional IT carreer, but not yet there.

Programming for the web may be new to them, and rather than following the lowest common denominator, they may just as well enter this new world the proper way, respecting the constitution of software design: modularity, thin interfaces, learning to balance loose coupling against internal cohesion.

The fact that it took so long to introduce something simple like a decent module mechanism into JavaScript is a telltale sign of severe underdevelopment in this area. In the vast pool of JavaScript developers there are many that are highly skilled and resourceful, and they have successfully circumvented this restriction by using functions as modules, keeping their local variables and functions alive artificially. But a language having modularisation so low on its priority list, is a less than ideal starting point for acquiring good manners in web application design.


How to best serve this target audience
--------------------------------------

The main point, as with any design, is the willingness to let go of dogmaticism in favor of a good balance.
Starting out from the fact that Transcypt should be 100% CPython compatible would be very clear and unambigous, and in that sense attractive.
However with current technology it's also completely off-limits for any viable real world development, directly competing with JavaScript in the area of speed and compactness.
Users of web applications don't care about technology.
If they have to wait for more than two seconds for a page to load, many of them zap.
If the rest have to wait for more that half a minute, they conclude its time for a browser restart, a modem reset, or a new access provider.

And developers don't care about purism. They cannot afford to paint themselves into a corner but need direct access to the full spectrum of JavaScript libraries and frameworks. Application development is hard enough without extra restrictions posed by your development tools.

It's completely agreed that having native CPython in the browser would be great.
But having JavaScript in between, even as asm.js, unfortunately makes it impractical.

It's completely agreed that many Python developers would like all of their familiar libraries to be avaible.
But the fact that most of them are written in C, makes it equally impractical, since they would run at snail speed.
Apart from that, for viable web development, unimpeded access to JavaScript libraries is far more important.

One alternative is to wait from the browser manufacturers to support descents to pure, true assembler, or at least C or C++.
Given the fact that Java was kicked out because of security concerns, it is unlikely that a language without array boundary checks would be allowed in.
And if such checks were added it would be rather slow, though not unuseable per se.

If ever a fast, compact, browser-native CPython implementation gets developed, with seamless access to the huge investment represented by existing JavaScript libraries, converting from Transcrypt to it will be a snap compared to conversion from JavaScript. So actually Transcrypt, because of its proximity to CPython, is very future-proof, whereas all types of 'better JavaScript' or propietary languages are not. What matters to Transcrypt developers is not Transcrypt's future, but Python's future, which is bright without restriction.

Transcrypt strikes a careful balance between completely implementing CPython including this last 10% which will cause 90% of the bloat on one hand, and being too much restricted by JavaScript's shortcomings without necessity on the other. This balance e.g. means that Python's 'eval' and 'exec' (not to be confused with JavaScript's) are out, and multiple inheritance and selective operator overloading are in.
It means that Transcrypt's and JavaScript's type system are unified, compact, fast and interoperable, rather than stricktly separated, bulky, slow and requiring conversion.

**In short: Transcrypt serves its target audience by allowing them to develop fast, compact, future-proof web applications on clients and servers in one stable, well-established language, running on any platform, minimizing lifecycle costs. Not as a promise, but now.**

Specific design choices made for Transcrypt and their underlying motivation
---------------------------------------------------------------------------

Why is Transcrypt written in Python and not in JavaScript
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Transcrypt departs from the Python side of things. It is not JavaScript approaching the Python world, but Python approaching the JavaScript world. What enabled this approach, is that the notion of compiling it on the fly in the browser was rejected from the start. While this would have enabled things like 'exec' and 'eval' and would have made the compilation process fully transparent, compiling a piece of interpreted code on the fly will always stand in the way of performance. And any compromise on that was judged to be lethal for acceptation of Transcrypt as a being serious win-win alternative for JavaScript in a world where download size and page-load speed are crucial factors.

Syntactically speaking, Python isn't as simple as it may seem. Using indentation to indicate blocks has a profoundly positive effect upon the readability of the language, but also creates parsing anomalies. The flexibility with regard to formal and actual function parameters makes parsing even more complex. Developing Transcrypt in Python makes available the original, rock-solid Python parser to do the job fast and concise. And since Transcrypt and Python use the same parser, Python can never syntactically develop into a direction that Transcrypt couldn't follow. To JavaScript developers having '__new__ ()' instead of 'new' may well indeed be new, to Python developers it's just another function call. Given the turmoil created by getting rid of Python's 'print' statement in favour of 'print ()' it wouldn't be wise to introduce another unnecessary syntactic anomaly. Even a __pragma__ syntactically (but not semantically) is just another function call. This approach also facilitates reuse of the exsting concise documentation on Python's syntax. Transcrypt syntax == Python syntax. Period.

And then there's the matter of distribution. Transcrypt is just another Python application, available from PyPi like any other, requiring Python like any other. And its library modules can be distributed via PiPy or any of its successors. It is very well possible to write 'pure Python modules' that run both under CPython and Transcrypt. But the importance of this is, apart from some fundamental modules, limited. For use in the browser, the enormous amount of 'actually existing' JavaScript libraries are far more interesting. And they can be loaded the JavaScript way, either on the fly from a content distribution network, or via 'require'.

Finally there's the efficiency of development of Transcypt itself. Transcrypt was written because programming in Python was very much preferred over programming in JavaScript. So why on earth then would JavaScript be preferred over Python in writing it...

Why does Transcrypt blend Python datatypes with JavaScript datatypes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The answer can be short: Compactness, speed and interoperability on the library front. Being able e.g. to interpret {'color': 'red', 'size': 'medium'} both as a JavaScript object and as a Python dictionary save lots of conversions, library encapsulation layers and counterintuitive restrictions. It minize code size and maximizes speed of data exchange between JavaScript and Python. Crucial to making it work is the identifier aliasing mechanism. It facilitates carefree use of Python keywords and identifiers, solving any name clashes with their JavaScript counterparts, now and in the future. It doesn't matter that both Python and JavaScript have a 'strip' method for strings that do different things. Using 'strip' in Python will translate to 'py_strip' and JavaScript's native 'strip' method can be used from Python under the name 'js_strip'.

Why are certain Python constructions supported as a local (or global) option rather than by default
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Efficiency is the reason. While it seems very sophisticated to globally support operator overloading by default, replacing x = 2 * (3 + 4) by x = __mul__ (__add__ (3, 4)) in a program full of such expressions, possibly in inner loops, would have a disastrous impact on both performance and readability of the generated JavaScript code. And readability of the generated code is a must. Transcrypt should not be a magical toolbox, close your eyes, trust us and here's the rabbit. The way it works should be fully transparent, including quality and correctness of the generated JavaScript code. On the other hand, who would like to write v4 = add (multiply (add (v1, v2)), v3) rather than v4 = M (v1 + v2) + v3 in a program consisting of many lines of vector math.

In general compiler facilities that may have a negative impact on performance if applied in the wrong places can be switched on and off locally. The reason they sometimes also are available as a global option is educational use. If straightforward pythonic code matters more than performance, which is the case in an educational situation, setting all switches to maximize CPython compliance may be a good idea, especially if the generated JavaScript code is taken for granted as are assembly instructions with a C compiler.

Why were the \_\_pragma\_\_'s added
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Several special facilities were needed that don't play a role in CPython: local compilation options, setting identifier aliases, e.g. replacing jq or S by $ to be able to bridge the gap with JQuery, conditional compilation of code fragments like imports, who, by nature of compilation rather than interpretation, are done compile time rather than runtime hence won't obey normal 'if' statements, etc.. For all those special facilities special keywords could have been devised. It would make such special facilities hard to recognize and keyword-hungry. Using \_\_pragma\_\_ in these cases provides a simple clue to what's going on, both for developers and for the compiler. In the C/C++ world pragma's serve a comparable purpose. They are, as the word suggest, pragmatic solutions to practical problems. Pragmatism is good. But it should be insulated and carefully managed. A special keyword helps with that.


