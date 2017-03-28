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
						for (var [i, types] of enumerate (tuple ([simpleTypes, tupleTypes]))) {
							for (var [j, aType] of enumerate (types)) {
								for (var [k, anObject] of enumerate (tuple ([dict ({'a': 1}), list ([]), a, C, c, C, b, true, 'a', 1, 1.2]))) {
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
							for (var aBase of aClass.__bases__) {
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
							for (var aClass of mro (C)) {
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
