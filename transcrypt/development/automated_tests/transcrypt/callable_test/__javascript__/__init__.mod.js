	__nest__ (
		__all__,
		'callable_test', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (test) {
						var func = function (a, b) {
							return a * b;
						};
						test.check (func (3, 4));
						test.check (callable (func));
						for (var a of tuple ([true, false])) {
							test.check (callable (a));
						}
						var a = 1;
						test.check (callable (a));
						var a = 2.3;
						test.check (callable (a));
						var a = 'asdf';
						test.check (callable (a));
						var a = list ([]);
						test.check (callable (a));
						var a = list ([1, 2, 3, 3]);
						test.check (callable (a));
						var a = list (['asdf', 'qwer', 'zxcv']);
						test.check (callable (a));
						var a = dict ({'asdf': 1, 'qwer': 2});
						test.check (callable (a));
						var a = set (list ([1, 2]));
						test.check (callable (a));
						var CallObj = __class__ ('CallObj', [object], {
							get __init__ () {return __get__ (this, function (self, r) {
								self._r = r;
							});},
							get __call__ () {return __get__ (this, function (self) {
								return self._r;
							});}
						});
						__call__ (test.check, test, __call__ (callable, null, CallObj));
						var obj = __call__ (CallObj, null, 2);
						__call__ (test.check, test, __call__ (obj, null));
						__call__ (test.check, test, __call__ (callable, null, obj));
						__call__ (test.check, test, __call__ (callable, null, obj._r));
						var NonCallObj = __class__ ('NonCallObj', [object], {
							get __init__ () {return __get__ (this, function (self, b) {
								self._b = b;
							});},
							get func () {return __get__ (this, function (self) {
								return self._b;
							});}
						});
						__call__ (test.check, test, __call__ (callable, null, NonCallObj));
						var obj2 = __call__ (NonCallObj, null, 2);
						__call__ (test.check, test, __call__ (callable, null, obj2));
						__call__ (test.check, test, __call__ (callable, null, obj2._b));
						__call__ (test.check, test, __call__ (callable, null, obj2.func));
						var NonOpovNonCallObj = __class__ ('NonOpovNonCallObj', [object], {
							get __init__ () {return __get__ (this, function (self, c) {
								self._c = c;
							});},
							get other () {return __get__ (this, function (self, b) {
								return self._c * b;
							});},
							get _getC () {return __get__ (this, function (self) {
								return self._c;
							});},
							get _setC () {return __get__ (this, function (self, val) {
								self._c = val;
							});}
						});
						Object.defineProperty (NonOpovNonCallObj, 'C', property.call (NonOpovNonCallObj, NonOpovNonCallObj._getC, NonOpovNonCallObj._setC));;
						var obj = NonOpovNonCallObj (4);
						test.check (callable (obj));
						test.check (callable (obj.other));
						test.check (callable (obj._c));
						test.check (callable (obj.C));
						var exc = Exception ('asdf');
						test.check (callable (exc));
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
