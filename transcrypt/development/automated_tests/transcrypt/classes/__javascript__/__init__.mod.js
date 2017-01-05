	__nest__ (
		__all__,
		'classes', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						autoTester.check ('<br>General<br>');
						var A = __class__ ('A', [object], {
							p: 123,
							get __init__ () {return __get__ (this, function (self, x) {
								self.x = x;
								autoTester.check (self.p);
							});},
							get show () {return __get__ (this, function (self, label) {
								autoTester.check ('A.show', label, self.x);
							});},
							get show2 () {return __get__ (this, function (self, label) {
								autoTester.check ('A.show2', label, self.x);
							});}
						});
						var B = __class__ ('B', [object], {
							get __init__ () {return __get__ (this, function (self, y) {
								autoTester.check ('In B constructor');
								self.y = y;
								autoTester.check (self.p);
							});},
							get show () {return __get__ (this, function (self, label) {
								autoTester.check ('B.show', label, self.y);
							});}
						});
						var __left0__ = tuple ([456, 789]);
						B.p = __left0__ [0];
						B.q = __left0__ [1];
						var C = __class__ ('C', [A, B], {
							get __init__ () {return __get__ (this, function (self, x, y) {
								autoTester.check ('In C constructor');
								A.__init__ (self, x);
								B.__init__ (self, y);
							});},
							get show () {return __get__ (this, function (self, label) {
								A.show (self, label);
								B.show (self, label);
								autoTester.check ('C.show', label, self.x, self.y);
							});}
						});
						var a = A (1001);
						a.show ('america');
						autoTester.check (A.p);
						autoTester.check (a.p);
						var b = B (2002);
						b.show ('russia');
						autoTester.check (B.p);
						autoTester.check (b.p);
						autoTester.check (b.q);
						autoTester.check (A.p);
						autoTester.check (a.p);
						var c = C (3003, 4004);
						c.show ('netherlands');
						autoTester.check (C.p);
						autoTester.check (c.p);
						autoTester.check (c.q);
						c.show2 ('amsterdam');
						A.show2 (c, 'rotterdam');
						var show3 = c.show;
						show3 ('copy');
						autoTester.check (hasattr (a, 'x'));
						autoTester.check (hasattr (a, 'y'));
						autoTester.check (hasattr (a, 'p'));
						autoTester.check (hasattr (a, 'q'));
						autoTester.check ('<br><br>Augmented isinstance<br>');
						var simpleTypes = tuple ([dict, list, A, B, C, bool, str, float, int]);
						var tupleTypes = tuple ([tuple ([dict, list]), tuple ([bool, int]), tuple ([bool, A]), tuple ([C, B])]);
						var __iterable0__ = enumerate (tuple ([simpleTypes, tupleTypes]));
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
							var __left0__ = __iterable0__ [__index0__];
							var i = __left0__ [0];
							var types = __left0__ [1];
							var __iterable1__ = enumerate (types);
							for (var __index1__ = 0; __index1__ < __iterable1__.length; __index1__++) {
								var __left0__ = __iterable1__ [__index1__];
								var j = __left0__ [0];
								var aType = __left0__ [1];
								var __iterable2__ = enumerate (tuple ([dict ({'a': 1}), list ([]), a, C, c, C, b, true, 'a', 1, 1.2]));
								for (var __index2__ = 0; __index2__ < __iterable2__.length; __index2__++) {
									var __left0__ = __iterable2__ [__index2__];
									var k = __left0__ [0];
									var anObject = __left0__ [1];
									autoTester.check (i, j, k, isinstance (anObject, aType));
									if (types == simpleTypes) {
										autoTester.check (i, j, k, isinstance (anObject, simpleTypes));
									}
								}
							}
						}
						autoTester.check ('<br><br>Method resolution order<br>');
						var mro = function (aClass, result) {
							if (typeof result == 'undefined' || (result != null && result .hasOwnProperty ("__kwargtrans__"))) {;
								var result = null;
							};
							var last = 0;
							if (result === null) {
								var result = list ([aClass]);
								var last = 1;
							}
							var __iterable0__ = aClass.__bases__;
							for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
								var aBase = __iterable0__ [__index0__];
								if (!(__in__ (aBase, result)) && aBase != object) {
									result.append (aBase);
									mro (aBase, result);
								}
							}
							if (last && __in__ (object, aClass.__bases__)) {
								aRoot.append (object);
							}
							return result;
						};
						autoTester.check (function () {
							var __accu0__ = [];
							var __iterable0__ = mro (C);
							for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
								var aClass = __iterable0__ [__index0__];
								__accu0__.append (aClass.__name__);
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
