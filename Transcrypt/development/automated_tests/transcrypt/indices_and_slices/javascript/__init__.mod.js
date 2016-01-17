	__nest__ (
		__all__,
		'indices_and_slices', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var all = range (32);
						autoTester.store (all);
						autoTester.store (all.slice (8, 24));
						autoTester.store (all.__getslice__ (8, 24, 2));
						var aList = [3, 4, 7, 8];
						autoTester.store (aList);
						aList.__setslice__ (4, 4, null, [9, 10]);
						autoTester.store (aList);
						aList.__setslice__ (2, 2, null, [5, 6]);
						autoTester.store (aList);
						aList.__setslice__ (0, 0, null, [1, 2]);
						autoTester.store (aList);
						aList.__setslice__ (0, null, 2, function () {
							var __accu0__ = [];
							var __iter0__ = range (10);
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var x = __iter0__ [__index0__];
								if (x % 2) {
									__accu0__ .push (x + 0.001);
								}
							}
							return __accu0__;
						} ());
						autoTester.store (aList);
					};
					//<all>
					__all__.run = run;
					//</all>
				}
			}
		}
	);
