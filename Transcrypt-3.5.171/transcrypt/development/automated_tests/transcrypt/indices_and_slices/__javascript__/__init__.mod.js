	__nest__ (
		__all__,
		'indices_and_slices', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var all = range (32);
						autoTester.check (all);
						autoTester.check (all.__getslice__ (8, 24, 1));
						autoTester.check (all.__getslice__ (8, 24, 2));
						var aList = list ([3, 4, 7, 8]);
						autoTester.check (aList);
						aList.__setslice__ (4, 4, null, list ([9, 10]));
						autoTester.check (aList);
						aList.__setslice__ (2, 2, null, list ([5, 6]));
						autoTester.check (aList);
						aList.__setslice__ (0, 0, null, list ([1, 2]));
						autoTester.check (aList);
						aList.__setslice__ (0, null, 2, function () {
							var __accu0__ = [];
							for (var x = 0; x < 10; x++) {
								if (x % 2) {
									__accu0__.append (x + 0.001);
								}
							}
							return __accu0__;
						} ());
						autoTester.check (aList);
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
