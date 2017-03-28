	__nest__ (
		__all__,
		'list_comprehensions', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var squares = function () {
							var __accu0__ = [];
							for (var i = 0; i < 10; i++) {
								if (__mod__ (i, 2)) {
									__accu0__.append (i * i);
								}
							}
							return __accu0__;
						} ();
						autoTester.check (squares);
						var tuples = function () {
							var __accu0__ = [];
							for (var x of tuple ([100, 200, 300, 400, 500, 600, 700])) {
								for (var y of tuple ([10, 20, 30, 40, 50, 60, 70])) {
									if ((20 < y && y < 60)) {
										for (var z of tuple ([1, 2, 3, 4, 5, 6, 7])) {
											if ((200 < x && x < 600)) {
												if ((2 < z && z < 6)) {
													__accu0__.append (tuple ([x, y, z]));
												}
											}
										}
									}
								}
							}
							return __accu0__;
						} ();
						autoTester.check (tuples);
						var tricky = function () {
							var __accu0__ = [];
							for (var [x, y] of tuple ([tuple ([10, 11]), tuple ([20, 21])])) {
								__accu0__.append (tuple ([2 * x, 3 * y]));
							}
							return __accu0__;
						} ();
						autoTester.check (tricky);
						var nested = function () {
							var __accu0__ = [];
							for (var x of function () {
								var __accu1__ = [];
								for (var x = 0; x < 3; x++) {
									__accu1__.append (x * x);
								}
								return __accu1__;
							} ()) {
								__accu0__.append (2 * x);
							}
							return __accu0__;
						} ();
						autoTester.check (nested);
						var a = 100;
						var x = 5;
						var scopeTest = function () {
							var __accu0__ = [];
							for (var x = 0; x < 5; x++) {
								__accu0__.append (x + a);
							}
							return __accu0__;
						} ();
						autoTester.check (x);
						autoTester.check (scopeTest);
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
