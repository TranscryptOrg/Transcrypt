The main differences with CPython
=================================

Differences due to the compiled, rather than interpreted nature of Transcrypt
-----------------------------------------------------------------------------

- Since Transcrypt is precompiled on the development machine, Python's exec and eval are not supported, but JavaScript's eval is.
- C++ style conditional compilation is supported through :ref:`pragmas <pragma_ifdef>`.
- Conditional import of modules is done by using conditional compilation rather than conditional statements.
- Source level debugging in the browser is available through the use of sourcemaps.
- Running a compiled Transcrypt program doesn't require a Python or Transcrypt interpreter. It only requires the runtime, which is about 40 kB.

Differences due to the 'lean and mean' design goal
--------------------------------------------------

- Facilities like operator overloading, automatic truth value conversion and named parameters can be switched on and off locally using pragmas, to keep the generated code small.
- Interpreting negative indices as offsets from the end of a list or string requires operator overloading to be switched on.
- String formatting is done through the *format* method or through f-strings, as this is considered most flexible. Using % for formatting isn't supported.
- Some methods of container types like list, set and dict, that duplicate functionality of other methods, have been left out of the core libraries. If needed they can be supplied in separate libraries.
- Metaclasses only support overloading the __new__ method, covering 90% of the use cases.
- Currently the  \*, /, //, +, -, @, [], (), ==, !=, <, <=, >, >=, \*\*, << and >> operators can be overloaded, both forward and reverse where appropriate, covering almost all use cases.
- The 'with' statement can currently only be used for file-like objects.

Differences due to interoperability with JavaScript and JavaScript libraries
----------------------------------------------------------------------------

- Python objects, functions and methods and their JavaScript counterparts can in general be mixed freely without special syntax.
- To be able to use JSON-like syntax in configuring JavaScript libraries, Transcrypt dicts are in fact JavaScript objects. Attribute keys that may denote a number are interpreted as such, all others are interpreted as strings.
- Any amount of literal JavaScript can be included in-line or from a separate file using :ref:`\_\_pragma\_\_ ('js', ..., ...) <pragma_js>`.
- The *print* function can be used to print to a DOM element or to the browser console.
- The methods *console.dir* and *console.log* are also available when programming for the browser, as are in fact all JavaScript facilities, including the complete DOM-manipulation API.
- Certain identifiers are reserved in JavaScript. In most cases they still can be used in Transcrypt, since they are aliased to other identifiers. Identifiers and directory keys starting with *py\_* are to be avoided, since many of them have special meaning in Transcrypt. It would have been possible to make clashes even more rare, by using e.g. @ and \_\_ in but this would have made the JavaScript code harder to read. Note that you can define a local alias yourself if you still want to use a reserved identifier.
- The name *type* cannot be used as an ordinary identifier.
- You can use *require* to load JavaScript modules on the fly and access them just as you would from JavaScript.

Differences due to running Transcrypt applications in the browser, rather than on the desktop
---------------------------------------------------------------------------------------------

- Transcrypt doesn't directly support the use of libraries written in C or C++ since, without special measures like compiling to asm.js, C and C++ don't run in the browser.
- The browser programming model is event driven, so Transcrypt programs are also event driven, as are their JavaScript counterparts.
- Just like JavaScript, Transcrypt running in the browser cannot write to an ordinary disk file, due to security limitations. However, just like JavaScript, it can store and retrieve data using JSON and Ajax.

