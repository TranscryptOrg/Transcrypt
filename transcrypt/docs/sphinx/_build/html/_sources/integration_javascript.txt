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
