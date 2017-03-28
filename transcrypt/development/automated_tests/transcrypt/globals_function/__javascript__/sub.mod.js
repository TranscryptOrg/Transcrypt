	__nest__ (
		__all__,
		'globals_function.sub', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var xxa = 'subXxa';
					var xxb = 'subXxb';
					for (var py_name of tuple (['xxp', 'xxq'])) {
						__globals__ (__all__) [py_name] = 'sub{}'.format (py_name.capitalize ());
					}
					var f = function () {
						for (var py_name of tuple (['xxr', 'xxs'])) {
							__globals__ (__all__) [py_name] = 'sub{}'.format (py_name.capitalize ());
						}
					};
					var run = function (autoTester) {
						f ();
						autoTester.check ('Check sub 1', xxa, xxb);
						autoTester.check ('Check sub 2', ...function () {
							var __accu0__ = [];
							for (var py_name of tuple (['xxa', 'xxb', 'xxp', 'xxq', 'xxr', 'xxs'])) {
								__accu0__.append (__globals__ (__all__) [py_name]);
							}
							return __accu0__;
						} ());
						autoTester.check ('Check sub 3', ...sorted (function () {
							var __accu0__ = [];
							for (var [key, value] of __globals__ (__all__).py_items ()) {
								if (key.startswith ('xx')) {
									__accu0__.append (value);
								}
							}
							return __accu0__;
						} ()));
					};
					__pragma__ ('<all>')
						__all__.f = f;
						__all__.py_name = py_name;
						__all__.run = run;
						__all__.xxa = xxa;
						__all__.xxb = xxb;
					__pragma__ ('</all>')
				}
			}
		}
	);
