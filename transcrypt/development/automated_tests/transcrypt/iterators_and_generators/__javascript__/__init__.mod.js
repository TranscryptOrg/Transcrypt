	__nest__ (
		__all__,
		'iterators_and_generators', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var Iterable = __class__ ('Iterable', [object], {
						get __init__ () {return __get__ (this, function (self, i) {
							self.aList = range (0, 50, i);
						});},
						get __iter__ () {return __get__ (this, function (self) {
							return Iterator (self);
						});},
						[Symbol.iterator] () {return this.__iter__ ()}
					});
					var Iterator = __class__ ('Iterator', [object], {
						get __init__ () {return __get__ (this, function (self, iterable) {
							self.iterable = iterable;
							self.index = -(1);
						});},
						get __next__ () {return __get__ (this, function (self) {
							self.index++;
							if (self.index > 5) {
								var __except0__ = StopIteration ();
								__except0__.__cause__ = null;
								throw __except0__;
							}
							return self.iterable.aList [self.index];
						});},
						next: __jsUsePyNext__,
						get __iter__ () {return __get__ (this, function (self) {
							return self;
						});},
						[Symbol.iterator] () {return this.__iter__ ()}
					});
					var exhaustableGenerator = function* (i) {
						for (var i = 0; i < 5; i++) {
							yield 2 * i;
						}
					};
					var run = function (autoTester) {
						var exhaustableGenExp = function () {
							var __accu0__ = [];
							for (var a of list ([10, 20, 30])) {
								__accu0__.append ((a * a) * a);
							}
							return py_iter (__accu0__);
						} ();
						var iterables = list ([Iterable (7), exhaustableGenerator (5), function () {
							var __accu0__ = [];
							for (var i = 0; i < 5; i++) {
								__accu0__.append (i * 3);
							}
							return __accu0__;
						} (), exhaustableGenExp]);
						for (var iterable of iterables) {
							autoTester.check ('[1]');
							var iterator = py_iter (iterable);
							try {
								while (true) {
									autoTester.check (py_next (iterator));
								}
							}
							catch (__except0__) {
								if (isinstance (__except0__, Exception)) {
									var exception = __except0__;
									autoTester.check (exception.__class__.__name__);
								}
								else {
									throw __except0__;
								}
							}
							autoTester.check ('[2]');
							var iterator = py_iter (iterable);
							try {
								while (true) {
									autoTester.check (py_next (iterator));
								}
							}
							catch (__except0__) {
								if (isinstance (__except0__, Exception)) {
									var exception = __except0__;
									autoTester.check (exception.__class__.__name__);
								}
								else {
									throw __except0__;
								}
							}
						}
						for (var iterable of iterables) {
							autoTester.check ('[3]');
							for (var n of iterable) {
								autoTester.check (n);
							}
							autoTester.check ('[4]');
							for (var n of iterable) {
								autoTester.check (n);
							}
						}
						var a = 0;
						var vals = list ([1, 2, 3]);
						var ret = py_iter (vals);
						for (var m of ret) {
							a += m;
						}
						autoTester.check (a);
						var test0 = function* () {
							var r = 0;
							while (true) {
								var r = r + (yield r);
							}
						};
						var gen0 = test0 ();
						py_next (gen0);
						autoTester.check ((function () {return gen0.next (1).value}) ());
						autoTester.check ((function () {return gen0.next (2).value}) ());
						var test1 = function* () {
							var r = 0;
							while (true) {
								var r = (yield r) + r;
							}
						};
						var gen1 = test1 ();
						py_next (gen1);
						autoTester.check ((function () {return gen1.next (3).value}) ());
						autoTester.check ((function () {return gen1.next (4).value}) ());
						var subGenerator = function* () {
							yield 27;
							yield 37;
							yield 47;
						};
						var mainGenerator = function* () {
							yield 17;
							yield* subGenerator ();
							yield 57;
						};
						autoTester.check (...function () {
							var __accu0__ = [];
							for (var i of mainGenerator ()) {
								__accu0__.append (i);
							}
							return __accu0__;
						} ());
						var subCoroutine = function* () {
							autoTester.check (38);
							yield;
							autoTester.check (48);
							yield;
							autoTester.check (58);
							yield;
							autoTester.check (68);
						};
						var mainCoroutine = function* () {
							autoTester.check (18);
							yield;
							autoTester.check (28);
							yield* subCoroutine ();
							autoTester.check (78);
							yield;
							autoTester.check (88);
						};
						var m = mainCoroutine ();
						for (var i = 0; i < 5; i++) {
							(function () {return m.next (null).value}) ();
						}
					};
					__pragma__ ('<all>')
						__all__.Iterable = Iterable;
						__all__.Iterator = Iterator;
						__all__.exhaustableGenerator = exhaustableGenerator;
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
