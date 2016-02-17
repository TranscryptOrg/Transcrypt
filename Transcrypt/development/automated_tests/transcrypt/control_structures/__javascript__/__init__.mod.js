	__nest__ (
		__all__,
		'control_structures', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var __iter0__ = enumerate (function () {
							var __accu0__ = [];
							var __iter1__ = range (10);
							for (var __index0__ = 0; __index0__ < __iter1__.length; __index0__++) {
								var x = __iter1__ [__index0__];
								if (x % 2) {
									__accu0__.append (x * x);
								}
							}
							return __accu0__;
						} ());
						for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
							var __left0__ = __iter0__ [__index0__];
							var index = __left0__ [0];
							var square = __left0__ [1];
							var __iter1__ = range (1, 2, 3);
							for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
								var y = __iter1__ [__index1__];
								var __iter2__ = range (10, 20, 30);
								for (var __index2__ = 0; __index2__ < __iter2__.length; __index2__++) {
									var z = __iter2__ [__index2__];
									autoTester.check (square + y, z);
								}
							}
						}
						var vehicles = list (['bike', 'train', 'boat', 'car', 'plane', 'bus']);
						var __iter0__ = tuple (list ([false, true]));
						for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
							var doBreak = __iter0__ [__index0__];
							var __iter1__ = tuple (list ([false, true]));
							for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
								var doContinue = __iter1__ [__index1__];
								var __iter2__ = range (10);
								var __break0__ = false;
								for (var __index2__ = 0; __index2__ < __iter2__.length; __index2__++) {
									var index = __iter2__ [__index2__];
									var __iter3__ = range (0, 100, 10);
									var __break1__ = false;
									for (var __index3__ = 0; __index3__ < __iter3__.length; __index3__++) {
										var index2 = __iter3__ [__index3__];
										if (doBreak && index2 == 50) {
											autoTester.check ('break2');
											__break1__ = true;
											break;
										}
										if (doContinue && index2 == 50) {
											autoTester.check ('continue2');
											continue;
										}
									}
									if (!__break1__) {
										autoTester.check ('noBreak2');
									}
									if (doBreak && index == 5) {
										autoTester.check ('break');
										__break0__ = true;
										break;
									}
									if (doContinue && index == 5) {
										autoTester.check ('continue');
										continue;
									}
								}
								if (!__break0__) {
									autoTester.check ('noBreak');
								}
								var index = 0;
								var __break0__ = false;
								while (index < len (vehicles) && vehicles [index] != 'bus') {
									autoTester.check (index, vehicles [index]);
									if (doBreak && vehicles [index] == 'car') {
										autoTester.check ('breakWhile');
										__break0__ = true;
										break;
									}
									if (doContinue && vehicles [index] == 'car') {
										autoTester.check ('continueWhile');
										index++;
										continue;
									}
									index++;
								}
								if (!__break0__) {
									autoTester.check ('noBreakWhile');
								}
							}
							var __iter1__ = vehicles;
							for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
								var vehicle = __iter1__ [__index1__];
								if (vehicle == 'bike') {
									autoTester.check ('netherlands');
								}
								else {
									if (vehicle == 'car') {
										autoTester.check ('america');
									}
									else {
										if (vehicle == 'boat') {
											autoTester.check ('oceania');
										}
										else {
											autoTester.check ('anywhere');
										}
									}
								}
							}
						}
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
