	__nest__ (
		__all__,
		'globals_function', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var sub = __init__ (__world__.globals_function.sub);
					var xxa = 'mainXxa';
					var xxb = 'mainXxb';
					for (var py_name of tuple (['xxp', 'xxq'])) {
						__globals__ (__all__) [py_name] = 'main{}'.format (py_name.capitalize ());
					}
					var f = function () {
						for (var py_name of tuple (['xxr', 'xxs'])) {
							__globals__ (__all__) [py_name] = 'main{}'.format (py_name.capitalize ());
						}
					};
					var run = function (autoTester) {
						f ();
						sub.run (autoTester);
						autoTester.check ('Check main 1', xxa, xxb);
						autoTester.check ('Check main 2', ...function () {
							var __accu0__ = [];
							for (var py_name of tuple (['xxa', 'xxb', 'xxp', 'xxq', 'xxr', 'xxs'])) {
								__accu0__.append (__globals__ (__all__) [py_name]);
							}
							return __accu0__;
						} ());
						autoTester.check ('Check main 3', sub.xxa, sub.xxb, sub.xxp, sub.xxq, sub.xxr, sub.xxs);
						autoTester.check ('Check main 4', ...sorted (function () {
							var __accu0__ = [];
							for (var [key, value] of __globals__ (__all__).py_items ()) {
								if (key.startswith ('xx')) {
									__accu0__.append (value);
								}
							}
							return __accu0__;
						} ()));
					};
					__pragma__ ('<use>' +
						'globals_function.sub' +
					'</use>')
					__pragma__ ('<all>')
						__all__.f = f;
						__all__.py_name = py_name;
						__all__.run = run;
						__all__.sub = sub;
						__all__.xxa = xxa;
						__all__.xxb = xxb;
					__pragma__ ('</all>')
				}
			}
		}
	);
