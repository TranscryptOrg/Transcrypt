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
								if (i % 2) {
									__accu0__.append (i * i);
								}
							}
							return __accu0__;
						} ();
						autoTester.check (squares);
						var tuples = function () {
							var __accu0__ = [];
							var __iter0__ = tuple ([100, 200, 300, 400, 500, 600, 700]);
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var x = __iter0__ [__index0__];
								var __iter1__ = tuple ([10, 20, 30, 40, 50, 60, 70]);
								for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
									var y = __iter1__ [__index1__];
									if ((20 < y && y < 60)) {
										var __iter2__ = tuple ([1, 2, 3, 4, 5, 6, 7]);
										for (var __index2__ = 0; __index2__ < __iter2__.length; __index2__++) {
											var z = __iter2__ [__index2__];
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
							var __iter0__ = tuple ([tuple ([10, 11]), tuple ([20, 21])]);
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var __left0__ = __iter0__ [__index0__];
								var x = __left0__ [0];
								var y = __left0__ [1];
								__accu0__.append (tuple ([2 * x, 3 * y]));
							}
							return __accu0__;
						} ();
						autoTester.check (tricky);
						var nested = function () {
							var __accu0__ = [];
							var __iter0__ = function () {
								var __accu1__ = [];
								for (var x = 0; x < 3; x++) {
									__accu1__.append (x * x);
								}
								return __accu1__;
							} ();
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var x = __iter0__ [__index0__];
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
