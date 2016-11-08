	__nest__ (
		__all__,
		'module_builtin', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var canonizeString = function (aString) {
						if (__envir__.executor_name == 'transcrypt') {
							return aString.py_replace ('\t', '\\t').py_replace ('\n', '\\n');
						}
						else {
							return aString;
						}
					};
					var canonizeStringList = function (stringList) {
						return function () {
							var __accu0__ = [];
							var __iterable0__ = stringList;
							for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
								var aString = __iterable0__ [__index0__];
								__accu0__.append (canonizeString (aString));
							}
							return __accu0__;
						} ();
					};
					var run = function (autoTester) {
						autoTester.check ('min', min (-(1.1), -(1), -(3)));
						autoTester.check ('max', max (-(1.1), -(1), -(3)));
						autoTester.check ('abs', abs (-(1)), abs (1), abs (0), abs (-(0.1)), abs (0.1));
						autoTester.check ('ord', ord ('a'), ord ('e´' [0]));
						autoTester.check ('round', round (4.006), round (4.006, 2), round (4060, -(2)), round (-(4.006)), round (-(4.006), 2), round (-(4060), -(2)), round (1 / 2.0), round (1 / 2.0, 1), round (1 / 2, 1), round (1 / 3.0, 2), round (-(1) / 2.0), round (-(1) / 2.0, 1), round (-(1) / 2, 1), round (-(1) / 3.0, 2), round (0.5), round (0.51), round (1.5), round (1.51), round (1.51), round (2.5), round (2.59), round (3.5), round (3.59), round (-(0.5)), round (-(0.51)), round (-(1.5)), round (-(1.51)), round (-(1.51)), round (-(2.5)), round (-(2.59)), round (-(3.5)), round (-(3.59)));
						var strings = list (['der des dem den die der den die das des dem das', 'an auf\thinter ueber\tneben vor\tzwischen', '\n\t\t\tdurch\n\t\t\tfuer\n\t\t\tohne\n\t\t\tum\n\t\t\tbis\n\t\t\tgegen\n\t\t\tentlang\n\t\t', 'eins,zwei,drie,vier,fuenf,sechs,sieben']);
						autoTester.check ('<br><br>split');
						var __iterable0__ = strings;
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
							var aString = __iterable0__ [__index0__];
							autoTester.check (canonizeString (aString), canonizeStringList (aString.py_split ()), canonizeStringList (aString.py_split (' ')), canonizeStringList (aString.py_split (' ', 4)), canonizeStringList (aString.py_split ('\t')), canonizeStringList (aString.py_split ('\t', 4)), canonizeStringList (aString.py_split ('\n')), canonizeStringList (aString.py_split ('\n', 4)), canonizeStringList (aString.py_split (',')), canonizeStringList (aString.py_split (',', 4)), '<br>');
						}
						autoTester.check ('<br>rsplit');
						var __iterable0__ = strings;
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
							var aString = __iterable0__ [__index0__];
							autoTester.check (canonizeString (aString), canonizeStringList (aString.rsplit ()), canonizeStringList (aString.rsplit (' ')), canonizeStringList (aString.rsplit (' ', 4)), canonizeStringList (aString.rsplit ('\t')), canonizeStringList (aString.rsplit ('\t', 4)), canonizeStringList (aString.rsplit ('\n')), canonizeStringList (aString.rsplit ('\n', 4)), canonizeStringList (aString.rsplit (',')), canonizeStringList (aString.rsplit (',', 4)), '<br>');
						}
					};
					__pragma__ ('<all>')
						__all__.canonizeString = canonizeString;
						__all__.canonizeStringList = canonizeStringList;
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
