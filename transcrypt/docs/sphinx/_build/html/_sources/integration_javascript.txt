Seamless interoperation with the DOM
====================================

Practical example: a simple, responsive website using no HTML or CSS at all
---------------------------------------------------------------------------

To many programmers, using 'static' HTML and CSS feels like being locked up in a closet.
As an alternative, responsiveness can simply be programmed using Transcrypt, as can be seen on `this site written in Transcrypt <http://www.wiskundeles.com>`_.
Note that it features sourcemaps.
The site adapts to diverse screen formats, device types and landscape vs. portrait mode.

SVG example: Turtle graphics
----------------------------

*Turtle graphics* are a way to teach computer programming to children, invented by Seymour Papert in the 1960's.
Lines are drawn as 'track' of a walking turtle, that can move ahead and turn.
Children use turtle graphics intuitively by imagining what they would do if they were the turtle.
This leads to a *recipe of motion*, indeed an *algorithm*, which is the basis of imperative (as opposed to e.g. declarative) programming.

*SVG* or *Scalable Vector Graphics* are a way to display high quality graphs, e.g. in the browser.
SVG, as opposed to e.g. the HTML Canvas, bypasses the pixel paradigm and works with floating point coordinates directly.
As a consequence, SVG plots can be zoomed without becoming ragged or 'pixelated'.

When looking under the hood of SVG, there's an amazing correspondence between the primitives in an SVG *path* and the primitives of turtle graphics.
So both from an aestethical and from a conceptual point of view, turtle graphics and SVG form a happy mariage.

Turtle graphics in Transcrypt do not require the use of any graphics libraries. Below are two turtle graphics examples and the source code of Transcrypt's *turtle* module, which is quite compact. As can be seen from the code integration between Transcrypt and JavaScript is trivial.

.. literalinclude:: ../../demos/turtle_demos/star.py
	:tab-width: 4
	:caption: Drawing a alternatingly floodfilled star
	
`Click here to view the resulting zoomable star <http://www.transcrypt.org/live/demos/turtle_demos/star.html>`_.
	
.. literalinclude:: ../../demos/turtle_demos/snowflake.py
	:tab-width: 4
	:caption: Drawing the contours of a snowflake

`Click here to view the resulting zoomable snowflake <http://www.transcrypt.org/live/demos/turtle_demos/snowflake.html>`_.
	
.. literalinclude:: ../../modules/turtle/__init__.py
	:tab-width: 4
	:caption: Transcrypt's turtle graphics module sits directly on top of SVG, no libraries needed, so a very compact download
	
Remark: In a later stage animation may be added. As a further step, for complicated fractals, transparent server side compilation of a relatively simple algorithm would allow on-line editing combined with fast client side rendering of high-resolution graphics.


Mixed examples
==============

Three ways of integration with JavaScript libraries
---------------------------------------------------

There are three ways to integrate Transcrypt applications with existing JavaScript libraries.

1. The simplest way is to use the library as is, without any encapsulation. In this way all symbols of that library will be in the global namespace. While many JavaScript programmers don't seem to mind that, many Python programmers do.

2. Another way is to encapsulate the JavaScript library as a whole in a Transcrypt module. In the distibution this is done for the *fabric* module, that encapsulates *fabric.js*. In this way the global namespace stays clean.

3. The third way is to write a complete Pythonic API for the JavaScript library. This is overkill in most cases and makes it harder to keep up with new versions of the library. Note that Transcrypt was desiged to make seamless cooperation between Transcrypt and JavaScript libraries possible without 

In the Pong example below, approach 2 is choosen to encapsulate the fabric.js graphics library. In most cases this approach strikes a good balance between effort and yield. As can be seen below, the effort involved is minimal.

.. _code_encaps_fabric:

.. literalinclude:: ../../modules/com/fabricjs/__init__.py
	:tab-width: 4
	:caption: The encapsulation layer for fabric.js
	
Note that __pragma__ ('js', <skeletoncode>, includes = [<file1>, <file2>, ..]) is used to achieve the encapsulation. It replaces the {} by the respective contents of the files. The *fabric* module is part of the download. Note that not all facilities were included in customizing fabric.js. You can drop-in replace the *fabric.js* in the __javascript__ subdirectory by another customized version without changing anything. Preferably download a development version, since that enables easy debugging. Transcryp will minify it for you on the fly.

Example: Pong
-------------

In using the fabric.js JavaScript library this example, the only thing differing from plain JavaScipt is that *new <constructor>* is replaced by *__new__ (<constructor>)*.

.. _code_pong:

+----------------------------------------------+-----------------------------------------------------------------+
| .. literalinclude:: ../../demos/pong/pong.py | .. literalinclude:: ../../demos/pong/__javascript__/pong.mod.js |
|    :tab-width: 4                             |    :tab-width: 4                                                |
|    :caption: pong.py                         |    :caption: pong.mod.js                                        |
+----------------------------------------------+-----------------------------------------------------------------+

Joined minification
-------------------

Minification is currently performed by the Google closure compiler, that's also part of the distribution. Rather than separately minifying libraries, the application is minified as a whole. In principle this enables a smaller total download size. Currently closures ADVANCED_OPTIMIZATIONS switch breaks the working *strict* code, however, so the SIMPLE_OPTIMIZATIONS switch is used by default.

As can be seen from the listings, *pong.mod.js* without libraries is only slightly longer than *pong.py* without libraries. The difference mainly comes from the expensive keyword arguments mechanism that is activated for the *reset* function, using *__pragma__ ('kargs')* and *__pragma__ ('nokwargs')*. The minified version is about half this size. The Transcrypt runtime itself in minified form is about 9kB. So the bulk of the total size of the minified file, 148kB comes from *fabric.js*. From this example it becomes clear that Transcrypt is extremely lightweight.

Example: jQuery
---------------

In contrast to the use of the *fabric.js* library in the Pong example, *jQuery* hasn't been encapsulated at all. It's just downloaded on the fly from a content delivery network and used as-is. Instead of the *$* (that is not a valid Python identifier), an *S* is used as :ref:`alias <pragma_alias>`. This might have been any character sequence.

+------------------------------------------------------------+-------------------------------------------------------------------------------+
| .. literalinclude:: ../../demos/jquery_demo/jquery_demo.py | .. literalinclude:: ../../demos/jquery_demo/__javascript__/jquery_demo.mod.js |
|    :tab-width: 4                                           |    :tab-width: 4                                                              |
|    :caption: jquery_demo.py                                |    :caption: jquery_demo.mod.js                                               |
+------------------------------------------------------------+-------------------------------------------------------------------------------+

Example: iOS web app with native look and feel
----------------------------------------------

You can write full screen iOS web apps in Transcrypt with native look and feel. As example here's an app simulating 6 dice. While this example is kept very simple, you can in fact make apps of arbitrary complexity, with fast and beautiful graphics using any JS graphics library, e.g. multiplayer games working over the Internet. If you add the app to your homescreen it will be cached, so no Internet connection is needed to use it. Web apps for iOS can obtain and use location information from the user.

.. figure:: ../images/ios_app.png
	:height: 500px
	:alt: A simple dice web app for iOS

.. figure:: ../images/ios_app_icon.png
	:height: 500px
	:alt: The prepacked dice icon on the homescreen

You can install this app on your iPhone from http://www.transcrypt.org/live/transcrypt/demos/ios_app/ios_app.html .

+----------------------------------------------------+
| .. literalinclude:: ../../demos/ios_app/ios_app.py |
|    :tab-width: 4                                   |
|    :caption: ios_app.py                            |
+----------------------------------------------------+

+------------------------------------------------------+
| .. literalinclude:: ../../demos/ios_app/ios_app.html |
|    :tab-width: 4                                     |
|    :caption: ios_app.html                            |
+------------------------------------------------------+

+--------------------------------------------------------+
| .. literalinclude:: ../../demos/ios_app/cache.manifest |
|    :tab-width: 4                                       |
|    :caption: cache.manifest                            |
+--------------------------------------------------------+

N.B.1 Cache manifests have to be served with mime type *text/cache-manifest*.

N.B.2 For native behaviour, e.g. no visible address bar, the app must indeed be added to the home screen of your iOS device.

Example: D3.js
--------------

The *D3.js* graphics library offers animation by data driven DOM manipulation. It combines well with class based object oriented programming as supported by Trancrypt, leading to applications that are easy to understand and maintain.

+--------------------------------------------------------+---------------------------------------------------------------------------+
| .. literalinclude:: ../../demos/d3js_demo/d3js_demo.py | .. literalinclude:: ../../demos/d3js_demo/__javascript__/d3js_demo.mod.js |
|    :tab-width: 4                                       |    :tab-width: 4                                                          |
|    :caption: d3js_demo.py                              |    :caption: d3js_demo.mod.js                                             |
+--------------------------------------------------------+---------------------------------------------------------------------------+

Example: React
--------------

*React* is a JavaScript library for easy creation of interactive UI's. Changes to the UI are made by fast manipulation of a light-weight virtual DOM. The real DOM, which is much slower to manipulate, is then compared with the altered virtual DOM and updated efficiently in a minimum number of steps. This way of working leads to good performance, at the same time keeping a straightforward structure of application UI code, since the complexities of optimizing DOM updates are left to the React library. React is unintrusive and mixes well with Transcrypt, allowing creation of extensive web applications that combine maintainability with speed. This example once again clearly illustrates the philosophy behind Transcrypt: rather than confining you to a "parallel" universe that could never keep up, Transcrypt offers you direct access to the ever expanding universe of innovative JavaScript libraries.

+----------------------------------------------------------+-----------------------------------------------------------------------------+
| .. literalinclude:: ../../demos/react_demo/react_demo.py | .. literalinclude:: ../../demos/react_demo/__javascript__/react_demo.mod.js |
|    :tab-width: 4                                         |    :tab-width: 4                                                            |
|    :caption: react_demo.py                               |    :caption: react_demo.mod.js                                              |
+----------------------------------------------------------+-----------------------------------------------------------------------------+

Example: Riot
-------------

*Riot* is a UI framework that combines the use of custom tags and a virtual DOM, much like the one in React. Custom tags look like ordinary HTML tags, but whereas HTML tags only define structure, Riot tags define structure, style and behaviour. Custom tags are compiled to JavaScript by a compiler that comes with Riot. With these custom tags as reusable components, web pages can be built. Riot itself is tiny, and the virtual DOM allows for fast adaptation of page content.

+----------------------------------------------------------+
| .. literalinclude:: ../../demos/riot_demo/riot_demo.html |
|    :tab-width: 4                                         |
|    :caption: riot_demo.html                              |
+----------------------------------------------------------+

+-----------------------------------------------------------+----------------------------------------------------------+
| .. literalinclude:: ../../demos/riot_demo/tags/sample.tag | .. literalinclude:: ../../demos/riot_demo/tags/sample.js |
|    :tab-width: 4                                          |    :tab-width: 4                                         |
|    :caption: sample.tag, a classic Riot tag               |    :caption: sample.js, compiled by Riot                 |
+-----------------------------------------------------------+----------------------------------------------------------+

+-----------------------------------------------------------------+--------------------------------------------------------------------------+
| .. literalinclude:: ../../demos/riot_demo/riot_tag.py           | .. literalinclude:: ../../demos/riot_demo/__javascript__/riot_tag.mod.js |
|    :tab-width: 4                                                |    :tab-width: 4                                                         |
|    :caption: riot_tag.py, baseclass of all Transcrypt Riot tags |    :caption: riot_tag.mod.js, compiled by Transcrypt                     |
+-----------------------------------------------------------------+--------------------------------------------------------------------------+

+----------------------------------------------------------------+---------------------------------------------------------------------------+
| .. literalinclude:: ../../demos/riot_demo/riot_demo.py         | .. literalinclude:: ../../demos/riot_demo/__javascript__/riot_demo.mod.js |
|    :tab-width: 4                                               |    :tab-width: 4                                                          |
|    :caption: riot_demo.py, a derived Transcrypt Riot tag class |    :caption: riot_demo.mod.js, compiled by Transcrypt                     |
+----------------------------------------------------------------+---------------------------------------------------------------------------+

Example: Using input and print in a DOM __terminal__ element in your browser
----------------------------------------------------------------------------

Without special measures, Transcrypt's *print* function prints to the debugging console. However if there's an element with id *__terminal__* in your DOM tree, the *print* function prints to this element. Moreover, the *input* function also prints its prompt message to the terminal element. Input is collected using a dialog box and echoed to the terminal element.

This means that you can write applications with blocking I/O, rather than event driven behaviour, e.g. for simple activities or, since they are intuitively easy to comprehend, for educational purposes.

+------------------------------------------------------------------+
| .. literalinclude:: ../../demos/terminal_demo/terminal_demo.html |
|    :tab-width: 4                                                 |
|    :caption: terminal_demo.html                                  |
+------------------------------------------------------------------+

+----------------------------------------------------------------+
| .. literalinclude:: ../../demos/terminal_demo/terminal_demo.py |
|    :tab-width: 4                                               |
|    :caption: terminal_demo.py                                  |
+----------------------------------------------------------------+
