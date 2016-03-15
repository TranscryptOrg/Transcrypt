	__nest__ (
		__all__,
		'dict_comprehensions', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var original = dict ({'Isaac': 'Newton', 'Albert': 'Einstein', 'Paul': 'Dirac'});
						autoTester.check (original);
						var inverted = function () {
							var __accu0__ = [];
							var __iter0__ = original;
							if (type (__iter0__) == dict) {
								__iter0__ = __iter0__.py_keys ();
							}
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var key = __iter0__ [__index0__];
								__accu0__.append (list ([original [key], key]));
							}
							return dict (__accu0__);
						} ();
						autoTester.check (inverted);
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
