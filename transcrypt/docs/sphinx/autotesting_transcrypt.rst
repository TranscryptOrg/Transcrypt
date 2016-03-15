Autotesting Transcrypt code
===========================

Why it's needed
---------------

An simple autotest feature has been added to Transcrypt right from the start for the following reasons:

1. Any programming language compiler has to be reliable, since a large investment in code may come to depend upon it. Languages and libraries should be able to evolve without regression bugs being introduced. In a rich language many constructs are possible which all should be tested with each new release. This can only be done if testing is automated.

2. Since Transcrypt compiles not all of Python but a fairly extensive subset, it has to be rigorously clear what can be compiled and what not. The sourcecode of a set of automated tests can be an effective means of laying down what is possible in the language. Whereas code examples and documents may lag back or deviate from reality, test code has to cover the essential features of the language and is, by nature, constantly exercised to match the latest status of the language.

How it works
------------

When code is being tested, a reference is needed of what is considered to be correct. With Transcrypt that reference is CPython. Autotesting Transcrypt code is simple and boils down to the following.

1. Along with developing production code, a growing set of *testlets* is developed. A testlet is a small module testing a certain feature or group of features. It repeatedly calls method *org.transcrypt.autotester.AutoTester.check (self, \*args)* to build a well defined sequence of output data.
2. A series of testlets are imported into an application called an *autotest*.
3. The autotest is first run from the command line: *python transcrypt -r autotest.py*. This will generate files *autotest.html* (using prettyfied code) and *autotest.min.html* (using minified code) in the working directory, both containing the *reference data sequence* produced by CPython, in an HTML DIV.
4. After that, the autotest is compiled to JavaScript: *python transcryp -b autotest.py*. This will generate files *autotest.js* and *autotest.min.js* in the corresponding JavaScript directory.
5. Click on *autotest.html* or *autotest.min.html* to load the autotest into the browser and run *autotest.js* or *autotest.min.js* respectively. This will generate the *test data sequence*, now using the Transcrypt runtime.
6. After this, the test data sequence is automatically compared to the reference data sequence that was part of the html, and an error report is shown in the browser.

An example of two testlets combined into the 'hello' autotest, that is part of the distribution:

+----------------------------------------------------------------------------+----------------------------------------------------------------------------+----------------------------------------------------------------------------+		
|    .. literalinclude:: ../../development/automated_tests/hello/autotest.py |    .. literalinclude:: ../../development/automated_tests/hello/testlet0.py |    .. literalinclude:: ../../development/automated_tests/hello/testlet1.py | 
|        :tab-width: 4                                                       |         :tab-width: 4                                                      |        :tab-width: 4                                                       |
|        :caption: autotest.py                                               |         :caption: testlet0.py                                              |        :caption: testlet1.py                                               |
+----------------------------------------------------------------------------+----------------------------------------------------------------------------+----------------------------------------------------------------------------+

Output of the 'hello' autotest with a deliberate error:

.. figure:: ../images/autotest_hello.png
	:alt: Output of 'hello autotest' 
