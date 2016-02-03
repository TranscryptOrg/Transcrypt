Special facilities
==================

Transcrypt has some special facilities. To be able to use them on the desktop as well, import them from *org.transcrypt.stubs.browser*. 

__pragma__ ('kwargs') and __pragma__ ('nokwargs')
-------------------------------------------------
While it's possible to compile with the -k switch, allowing keyword arguments in all flavors supported by Python 3.5, this disadvised, as it leads to bloated code. It is better to use the 'kwargs' and 'nokwargs' pragmas, to enable this feature only at definition (as opposed to calling) of functions that require it. You'll find an example of how to use these pragma's in the :ref:`arguments autotest <autotest_arguments>`. You can see them on whole modules or any part thereof. Note that at due to the dynamic nature of Python, use of keyword arguments at call time cannot be predicted at definition time. When running with CPython from the command prompt using the browser stubs, these pragma's are ignored.

console.log and window.alert
----------------------------
These functions are available of course in the browser, but also from the command prompt, since they are emulated in *org.transcrypt.stubs.browser*
