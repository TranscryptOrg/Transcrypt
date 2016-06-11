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


Integration with JavaScript libraries
=====================================

Three ways of integration
-------------------------

There are three ways to integrate Transcrypt applications with existing JavaScript libraries.

1. The simplest way is to use the library as is, without any encapsulation. In this way all symbols of that library will be in the global namespace. While many JavaScript programmers don't seem to mind that, many Python programmers do.

2. Another way is to encapsulate the JavaScript library as a whole in a Transcrypt module. In the distibution this is done for the *fabric* module, that encapsulates *fabric.js*. In this way the global namespace stays clean.

3. The third way is to write a complete Pythonic API for the JavaScript library. This is overkill in most cases and makes it harder to keep up with new versions of the library. Note that Transcrypt was desiged to make seamless cooperation between Transcrypt and JavaScript libraries possible without 

In the Pong example below, approach 2 is choosen to encapsulate the fabric.js graphics library. In most cases this approach strikes a good balance between effort and yield. As can be seen below, the effort involved is minimal.

.. _code_encaps_fabric:

.. literalinclude:: ../../modules/com/fabricjs/__init__.py
	:tab-width: 4
	:caption: The encapsulation layer for fabric.js
	
Note that __pragma__ ('js', <skeletoncode>, includes = [<file1>, <file2>, ..]) is used to achieve the encapsulation. It replaces the {} by the respective contents of the files. The *fabric* module is part of the download. Note that not all facilities were included in customizing fabric.js. You can drop-in replaces the *fabric.js* in the __javascript__ subdirectory by another customized version without changing anything. Preferably download a development version, since that enables easy debugging. Transcryp will minify it for you on the fly.

Integration example: Pong
-------------------------

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

Integration example: jQuery
---------------------------

In contrast to the use of the *fabric.js* library in the Pong example, *jQuery* hasn't been encapsulated at all. It's just downloaded on the fly from a content delivery network and used as-is. Instead of the *$* (that is not a valid Python identifier), an *S* is used as :ref:`alias <pragma_alias>`. This might have been any character sequence.

+------------------------------------------------------------+-------------------------------------------------------------------------------+
| .. literalinclude:: ../../demos/jquery_demo/jquery_demo.py | .. literalinclude:: ../../demos/jquery_demo/__javascript__/jquery_demo.mod.js |
|    :tab-width: 4                                           |    :tab-width: 4                                                              |
|    :caption: jquery_demo.py                                |    :caption: jquery_demo.mod.js                                               |
+------------------------------------------------------------+-------------------------------------------------------------------------------+

Integration example: D3.js
--------------------------

The *D3.js* graphics library offers animation by data driven DOM manipulation. It combines well with class based object oriented programming as supported by Trancrypt, leading to applications that are easy to understand and maintain.

+--------------------------------------------------------+---------------------------------------------------------------------------+
| .. literalinclude:: ../../demos/d3js_demo/d3js_demo.py | .. literalinclude:: ../../demos/d3js_demo/__javascript__/d3js_demo.mod.js |
|    :tab-width: 4                                       |    :tab-width: 4                                                          |
|    :caption: d3js_demo.py                              |    :caption: d3js_demo.mod.js                                             |
+--------------------------------------------------------+---------------------------------------------------------------------------+
