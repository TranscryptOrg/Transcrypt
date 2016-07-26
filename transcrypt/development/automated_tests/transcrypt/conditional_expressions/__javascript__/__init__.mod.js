	__nest__ (
		__all__,
		'conditional_expressions', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var f = function (x, b) {
						return (b ? x * x : x + x);
					};
					var run = function (autoTester) {
						var bools = tuple ([false, true]);
						var __iterable0__ = bools;
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
							var a = __iterable0__ [__index0__];
							var __iterable1__ = bools;
							for (var __index1__ = 0; __index1__ < __iterable1__.length; __index1__++) {
								var b = __iterable1__ [__index1__];
								autoTester.check (f ((a ? 10 : 100), b));
							}
						}
						var __iterable0__ = bools;
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
							var p = __iterable0__ [__index0__];
							var __iterable1__ = bools;
							for (var __index1__ = 0; __index1__ < __iterable1__.length; __index1__++) {
								var q = __iterable1__ [__index1__];
								var __iterable2__ = bools;
								for (var __index2__ = 0; __index2__ < __iterable2__.length; __index2__++) {
									var r = __iterable2__ [__index2__];
									autoTester.check ((p ? 'a' : (q ? 'b' : (r ? 'c' : 'd'))));
									var a = (r ? (q ? (p ? 'e' : 'f') : 'g') : 'h');
									var b = (p ? 'i' : (q ? 'j' : (r ? 'k' : 'l')));
									var c = ((q ? p : r) ? 'm' : 'n');
									var d = ((p < q && q <= r) ? 'o' : 'p');
									autoTester.check (a, b, c, d);
								}
							}
						}
						var odd = function () {
							var __accu0__ = [];
							for (var x = 0; x < 10; x++) {
								__accu0__.append ((x % 2 ? x : x + 1));
							}
							return __accu0__;
						} ();
						var noDuplicates = set (odd);
						autoTester.check (odd, noDuplicates);
					};
					__pragma__ ('<all>')
						__all__.f = f;
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
