	__nest__ (
		__all__,
		'control_structures', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						for (var index = 0; index < 10; index++) {
							autoTester.check (index);
						}
						for (var index = 8; index < 16; index++) {
							autoTester.check (index);
						}
						for (var index = 8; index < 16; index += 2) {
							autoTester.check (index);
						}
						for (var index = 10; index > 0; index--) {
							autoTester.check (index);
						}
						for (var index = 16; index > 8; index -= 2) {
							autoTester.check (index);
						}
						var __iter0__ = tuple (['cat', 'dog', 'turtle', 'goldfish']);
						for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
							var animal = __iter0__ [__index0__];
							autoTester.check (animal);
						}
						var __iter0__ = enumerate (function () {
							var __accu0__ = [];
							for (var x = 0; x < 10; x++) {
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
							var __iter1__ = tuple ([1, 2, 3]);
							for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
								var y = __iter1__ [__index1__];
								var __iter2__ = tuple ([10, 20, 30]);
								for (var __index2__ = 0; __index2__ < __iter2__.length; __index2__++) {
									var z = __iter2__ [__index2__];
									autoTester.check (square + y, z);
								}
							}
						}
						var vehicles = list (['bike', 'train', 'boat', 'car', 'plane', 'bus']);
						var __iter0__ = tuple ([false, true]);
						for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
							var doBreak = __iter0__ [__index0__];
							var __iter1__ = tuple ([false, true]);
							for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
								var doContinue = __iter1__ [__index1__];
								var __break2__ = false;
								for (var index = 0; index < 10; index++) {
									var __break3__ = false;
									for (var index2 = 0; index2 < 100; index2 += 10) {
										if (doBreak && index2 == 50) {
											autoTester.check ('break2');
											__break3__ = true;
											break;
										}
										if (doContinue && index2 == 50) {
											autoTester.check ('continue2');
											continue;
										}
									}
									if (!__break3__) {
										autoTester.check ('noBreak2');
									}
									if (doBreak && index == 5) {
										autoTester.check ('break');
										__break2__ = true;
										break;
									}
									if (doContinue && index == 5) {
										autoTester.check ('continue');
										continue;
									}
								}
								if (!__break2__) {
									autoTester.check ('noBreak');
								}
								var index = 0;
								var __break2__ = false;
								while (index < len (vehicles) && vehicles [index] != 'bus') {
									autoTester.check (index, vehicles [index]);
									if (doBreak && vehicles [index] == 'car') {
										autoTester.check ('breakWhile');
										__break2__ = true;
										break;
									}
									if (doContinue && vehicles [index] == 'car') {
										autoTester.check ('continueWhile');
										index++;
										continue;
									}
									index++;
								}
								if (!__break2__) {
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
