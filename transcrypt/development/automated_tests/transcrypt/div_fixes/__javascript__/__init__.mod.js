	__nest__ (
		__all__,
		'div_fixes', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						autoTester.check (65 / (5 * 2));
						var py_switch = false;
						autoTester.check (py_switch);
						autoTester.check (Math.floor (15 / 7));
						autoTester.check (list (['zero', 'one', 'two', 'three', 'four']).index ('three'));
						var results = list ([]);
						for (var i = 0; i < 10; i++) {
							results.append ((function __lambda__ (j) {
								return (function __lambda__ () {
									return j;});}) (i));
						}
						autoTester.check (function () {
							var __accu0__ = [];
							var __iter0__ = results;
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var result = __iter0__ [__index0__];
								__accu0__.append (result ());
							}
							return __accu0__;
						} ());
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
