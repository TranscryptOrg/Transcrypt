	__nest__ (
		__all__,
		'set_comprehensions', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var even = function () {
							var __accu0__ = [];
							var __iter0__ = list ([0, 9, 1, 7, 2, 8, 3, 6, 4, 5]);
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var i = __iter0__ [__index0__];
								__accu0__.append (2 * i);
							}
							return set (__accu0__);
						} ();
						autoTester.check (even);
						var odd = function () {
							var __accu0__ = [];
							var __iter0__ = list ([5, 6, 7, 8, 9, 4, 3, 1, 2, 0]);
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var i = __iter0__ [__index0__];
								__accu0__.append (2 * i + 1);
							}
							return set (__accu0__);
						} ();
						autoTester.check (odd);
						even.add (12);
						even.add (12);
						autoTester.check (even);
						even.discard (12);
						even.discard (12);
						autoTester.check (even);
						var uni = even.union (odd);
						autoTester.check (uni);
						autoTester.check (odd.isdisjoint (even));
						autoTester.check (uni.isdisjoint (even));
						autoTester.check (even.issuperset (uni));
						autoTester.check (uni.issuperset (even));
						autoTester.check (even.issubset (uni));
						autoTester.check (uni.issubset (even));
						var first = new set ([4, 1, 0, 5, 3, 2, 6]);
						autoTester.check (first);
						var second = new set ([3, 5, 6, 9, 4, 7, 8]);
						autoTester.check (second);
						var inter = first.intersection (second);
						autoTester.check (inter);
						var diff = first.difference (second);
						autoTester.check (diff);
						var symDiff = first.symmetric_difference (second);
						autoTester.check (symDiff);
						var aSet = new set ([200, 4, 5, 100]);
						aSet.update (first, symDiff, second);
						autoTester.check (aSet);
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
