	__nest__ (
		__all__,
		'operator_overloading', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var Matrix = __class__ ('Matrix', [object], {
						get __init__ () {return __get__ (this, function (self, nRows, nCols, elements) {
							if (typeof elements == 'undefined' || (elements != null && elements .hasOwnProperty ("__kwargtrans__"))) {;
								var elements = list ([]);
							};
							self.nRows = nRows;
							self.nCols = nCols;
							if (len (elements)) {
								self._ = elements;
							}
							else {
								self._ = function () {
									var __accu0__ = [];
									for (var row = 0; row < nRows; row++) {
										__accu0__.append (function () {
											var __accu1__ = [];
											for (var col = 0; col < nCols; col++) {
												__accu1__.append (0);
											}
											return __accu1__;
										} ());
									}
									return __accu0__;
								} ();
							}
						});},
						get __matmul__ () {return __get__ (this, function (self, other) {
							var result = Matrix (self.nRows, other.nCols);
							for (var iTargetRow = 0; iTargetRow < result.nRows; iTargetRow++) {
								for (var iTargetCol = 0; iTargetCol < result.nCols; iTargetCol++) {
									for (var iTerm = 0; iTerm < self.nCols; iTerm++) {
										result._ [iTargetRow] [iTargetCol] += self._ [iTargetRow] [iTerm] * other._ [iTerm] [iTargetCol];
									}
								}
							}
							return result;
						});},
						get __imatmul__ () {return __get__ (this, function (self, other) {
							return self.__matmul__ (other);
						});},
						get __mul__ () {return __get__ (this, function (self, other) {
							if (py_typeof (other) == Matrix) {
								var result = Matrix (self.nRows, self.nCols);
								for (var iRow = 0; iRow < self.nRows; iRow++) {
									for (var iCol = 0; iCol < self.nCols; iCol++) {
										result._ [iRow] [iCol] = self._ [iRow] [iCol] * other._ [iRow] [iCol];
									}
								}
								return result;
							}
							else {
								return self.__rmul__ (other);
							}
						});},
						get __rmul__ () {return __get__ (this, function (self, scalar) {
							var result = Matrix (self.nRows, self.nCols);
							for (var iRow = 0; iRow < self.nRows; iRow++) {
								for (var iCol = 0; iCol < self.nCols; iCol++) {
									result._ [iRow] [iCol] = scalar * self._ [iRow] [iCol];
								}
							}
							return result;
						});},
						get __imul__ () {return __get__ (this, function (self, other) {
							return self.__mul__ (other);
						});},
						get __add__ () {return __get__ (this, function (self, other) {
							var result = Matrix (self.nRows, self.nCols);
							for (var iRow = 0; iRow < self.nRows; iRow++) {
								for (var iCol = 0; iCol < self.nCols; iCol++) {
									result._ [iRow] [iCol] = self._ [iRow] [iCol] + other._ [iRow] [iCol];
								}
							}
							return result;
						});},
						get __getitem__ () {return __get__ (this, function (self, index) {
							return self._ [index];
						});},
						get __setitem__ () {return __get__ (this, function (self, index, value) {
							self._ [index] = value;
						});},
						get __repr__ () {return __get__ (this, function (self) {
							return repr (self._);
						});}
					});
					var Functor = __class__ ('Functor', [object], {
						get __init__ () {return __get__ (this, function (self, factor) {
							self.factor = factor;
						});},
						get __call__ () {return __get__ (this, function (self, x, y) {
							if (typeof y == 'undefined' || (y != null && y .hasOwnProperty ("__kwargtrans__"))) {;
								var y = -(1);
							};
							var m = -(2);
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'x': var x = __allkwargs0__ [__attrib0__]; break;
											case 'y': var y = __allkwargs0__ [__attrib0__]; break;
											case 'm': var m = __allkwargs0__ [__attrib0__]; break;
											case 'n': var n = __allkwargs0__ [__attrib0__]; break;
											default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
										}
									}
									delete kwargs.__kwargtrans__;
								}
								var args = tuple ([].slice.apply (arguments).slice (3, __ilastarg0__ + 1));
							}
							else {
								var args = tuple ();
							}
							return tuple ([self.factor * x, self.factor * y, function () {
								var __accu0__ = [];
								for (var arg of args) {
									__accu0__.append (self.factor * arg);
								}
								return __accu0__;
							} (), self.factor * m, self.factor * n]);
						});}
					});
					var f = Functor (10);
					var g = function (x, y) {
						if (typeof y == 'undefined' || (y != null && y .hasOwnProperty ("__kwargtrans__"))) {;
							var y = -(1);
						};
						var m = -(2);
						var kwargs = dict ();
						if (arguments.length) {
							var __ilastarg0__ = arguments.length - 1;
							if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
								var __allkwargs0__ = arguments [__ilastarg0__--];
								for (var __attrib0__ in __allkwargs0__) {
									switch (__attrib0__) {
										case 'x': var x = __allkwargs0__ [__attrib0__]; break;
										case 'y': var y = __allkwargs0__ [__attrib0__]; break;
										case 'm': var m = __allkwargs0__ [__attrib0__]; break;
										case 'n': var n = __allkwargs0__ [__attrib0__]; break;
										default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
									}
								}
								delete kwargs.__kwargtrans__;
							}
							var args = tuple ([].slice.apply (arguments).slice (2, __ilastarg0__ + 1));
						}
						else {
							var args = tuple ();
						}
						return tuple ([x, y, args, m, n]);
					};
					var run = function (autoTester) {
						var m0 = Matrix (3, 3, list ([list ([1, 2, 3]), list ([4, 5, 6]), list ([7, 8, 10])]));
						var m1 = Matrix (3, 3, list ([list ([10, 20, 30]), list ([40, 50, 60]), list ([70, 80, 90])]));
						var m4 = Matrix (3, 3, list ([list ([1, 1, 2]), list ([2, 2, 3]), list ([3, 3, -(5)])]));
						var m5 = Matrix (3, 3, list ([list ([1, 1, 2]), list ([2, 2, 3]), list ([3, 3, -(5)])]));
						var x = 3;
						var y = (x * 4) * x;
						var fast = 2 * 3;
						fast++;
						__setitem__ (__getitem__ (m1, 1), 2, __getitem__ (__getitem__ (m0, 1), 2));
						var slow = __add__ (2, 3);
						var m2 = __add__ (__mul__ (m0, m1), __mul__ (m1, __add__ (m0, m1)));
						var m3 = __mul__ (__mul__ (2, __add__ (__mul__ (__mul__ (__mul__ (2, m0), 3), m1), __mul__ (m2, 4))), 2);
						__call__ (autoTester.check, autoTester, __getitem__ (__getitem__ (m0, 1), 1), __getitem__ (__getitem__ (m0, 1), 2), __getitem__ (__getitem__ (m1, 1), 1), __getitem__ (__getitem__ (m1, 1), 2));
						var m1 = __call__ (__iadd__, null, m1, m0);
						var m2 = __call__ (__imul__, null, m2, m1);
						var m5 = __call__ (__imatmul__, null, m5, m4);
						var m6 = __matmul__ (m0, m1);
						var fast2 = 16 * y + 1;
						fast *= 2;
						autoTester.check (m0, m1);
						autoTester.check (x, y);
						autoTester.check (m2);
						autoTester.check (m3);
						autoTester.check (m5);
						autoTester.check (m6);
						autoTester.check (fast, slow, fast2);
						var x = 'marker';
						__call__ (autoTester.check, autoTester, __call__ (f, null, 3, 4, 30, 40, __kwargtrans__ ({m: 300, n: 400, p: 3000, q: 4000})));
						__call__ (autoTester.check, autoTester, __call__ (g, null, 3, 4, 30, 40, __kwargtrans__ ({m: 300, n: 400, p: 3000, q: 4000})));
						__call__ (autoTester.check, autoTester, __eq__ (__call__ (set, null, tuple ([1, 2, 3])), __call__ (set, null, tuple ([3, 2, 1]))));
						__call__ (autoTester.check, autoTester, __ne__ (__call__ (set, null, tuple ([1, 2, 3])), __call__ (set, null, tuple ([3, 2, 1]))));
						__call__ (autoTester.check, autoTester, __eq__ (__call__ (set, null, tuple ([1, 3])), __call__ (set, null, tuple ([3, 2, 1]))));
						__call__ (autoTester.check, autoTester, __ne__ (__call__ (set, null, tuple ([1, 3])), __call__ (set, null, tuple ([3, 2, 1]))));
						__call__ (autoTester.check, autoTester, __lt__ (__call__ (set, null, tuple ([1, 2])), __call__ (set, null, tuple ([3, 2, 1]))));
						__call__ (autoTester.check, autoTester, __le__ (__call__ (set, null, tuple ([1, 2, 3])), __call__ (set, null, tuple ([3, 2, 1]))));
						__call__ (autoTester.check, autoTester, __gt__ (__call__ (set, null, tuple ([1, 2, 3])), __call__ (set, null, tuple ([2, 1]))));
						__call__ (autoTester.check, autoTester, __ge__ (__call__ (set, null, tuple ([1, 2, 3])), __call__ (set, null, tuple ([3, 2, 1]))));
						__call__ (autoTester.check, autoTester, __eq__ (tuple ([1, 2, 3]), tuple ([1, 2, 3])));
						__call__ (autoTester.check, autoTester, __eq__ (list ([1, 2, 3]), list ([1, 2, 3])));
						__call__ (autoTester.check, autoTester, __ne__ (tuple ([1, 2, 3]), tuple ([1, 2, 3])));
						__call__ (autoTester.check, autoTester, __ne__ (list ([1, 2, 3]), list ([1, 2, 3])));
						__call__ (autoTester.check, autoTester, __eq__ (tuple ([2, 1, 3]), tuple ([1, 2, 3])));
						__call__ (autoTester.check, autoTester, __eq__ (list ([2, 1, 3]), list ([1, 2, 3])));
						__call__ (autoTester.check, autoTester, __ne__ (tuple ([2, 1, 3]), tuple ([1, 2, 3])));
						__call__ (autoTester.check, autoTester, __ne__ (list ([2, 1, 3]), list ([1, 2, 3])));
						var Bitwise = __class__ ('Bitwise', [object], {
							get __lshift__ () {return __get__ (this, function (self, other) {
								autoTester.check ('lshift');
							});},
							get __rlshift__ () {return __get__ (this, function (self, other) {
								autoTester.check ('rlshift');
							});},
							get __rshift__ () {return __get__ (this, function (self, other) {
								autoTester.check ('rshift');
							});},
							get __rrshift__ () {return __get__ (this, function (self, other) {
								autoTester.check ('rrshift');
							});},
							get __or__ () {return __get__ (this, function (self, other) {
								autoTester.check ('or');
							});},
							get __ror__ () {return __get__ (this, function (self, other) {
								autoTester.check ('ror');
							});},
							get __xor__ () {return __get__ (this, function (self, other) {
								autoTester.check ('xor');
							});},
							get __rxor__ () {return __get__ (this, function (self, other) {
								autoTester.check ('rxor');
							});},
							get __and__ () {return __get__ (this, function (self, other) {
								autoTester.check ('and');
							});},
							get __rand__ () {return __get__ (this, function (self, other) {
								autoTester.check ('rand');
							});}
						});
						var bitwise = Bitwise ();
						__lshift__ (bitwise, list ([]));
						__lshift__ (list ([]), bitwise);
						__call__ (autoTester.check, autoTester, __lshift__ (32, 2));
						__rshift__ (bitwise, list ([]));
						__rshift__ (list ([]), bitwise);
						__call__ (autoTester.check, autoTester, __rshift__ (32, 2));
						__or__ (bitwise, list ([]));
						__or__ (list ([]), bitwise);
						__call__ (autoTester.check, autoTester, __or__ (1, 4));
						__xor__ (bitwise, list ([]));
						__xor__ (list ([]), bitwise);
						__call__ (autoTester.check, autoTester, __xor__ (11, 13));
						__and__ (bitwise, list ([]));
						__and__ (list ([]), bitwise);
						__call__ (autoTester.check, autoTester, __and__ (12, 20));
						var a = 32;
						var a = __call__ (__ilshift__, null, a, 2);
						__call__ (autoTester.check, autoTester, a);
						autoTester.check (32 << 2);
						autoTester.check (32 >> 2);
						autoTester.check (1 | 4);
						autoTester.check (11 ^ 13);
						autoTester.check (12 & 20);
						var a = 32;
						a <<= 2;
						autoTester.check (a);
						var A = __class__ ('A', [object], {
							get __init__ () {return __get__ (this, function (self) {
								self.b = dict ({});
							});}
						});
						var a = A ();
						a.b ['c'] = 'd';
						__setitem__ (a.b, 'c', __call__ (__iadd__, null, __getitem__ (a.b, 'c'), 'e'));
						autoTester.check (a.b ['c']);
					};
					__pragma__ ('<all>')
						__all__.Functor = Functor;
						__all__.Matrix = Matrix;
						__all__.f = f;
						__all__.g = g;
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
