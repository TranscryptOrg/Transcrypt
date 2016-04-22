	__nest__ (
		__all__,
		'lambda_functions', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var z = 1000;
						autoTester.check ((function __lambda__ (x, y) {
							return (x + y) + z;}) (111, 222));
						var f = function (list0, list1, aFunc) {
							return function () {
								var __accu0__ = [];
								var __iter0__ = zip (list0, list1);
								for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
									var elem = __iter0__ [__index0__];
									__accu0__.append (aFunc.apply (null, elem));
								}
								return __accu0__;
							} ();
						};
						var x = f (range (10), range (0, 100, 10), (function __lambda__ (x, y) {
							return (x + y) + z;}));
						autoTester.check (x);
						autoTester.check (f (range (10, 20), range (100, 200, 10), (function __lambda__ (x, y) {
							return x * y + 100 * z;})));
						autoTester.check (f (range (10, 20), range (100, 200, 10), (function __lambda__ () {
							var args = tuple ([].slice.apply (arguments).slice (0));
							return args [0] * args [1] + 100 * z;})));
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
