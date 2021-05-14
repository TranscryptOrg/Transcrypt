// Transcrypt'ed from Python, 2021-05-14 15:00:24
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get Functor () {return Functor;}, set Functor (value) {Functor = value;}, get Matrix () {return Matrix;}, set Matrix (value) {Matrix = value;}, get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get f () {return f;}, set f (value) {f = value;}, get g () {return g;}, set g (value) {g = value;}, get run () {return run;}, set run (value) {run = value;}});
var __name__ = 'operator_overloading';
export var Matrix =  __class__ ('Matrix', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, nRows, nCols, elements) {
		if (typeof elements == 'undefined' || (elements != null && elements.hasOwnProperty ("__kwargtrans__"))) {;
			var elements = [];
		};
		self.nRows = nRows;
		self.nCols = nCols;
		if (len (elements)) {
			self._ = elements;
		}
		else {
			self._ = (function () {
				var __accu0__ = [];
				for (var row = 0; row < nRows; row++) {
					__accu0__.append ((function () {
						var __accu1__ = [];
						for (var col = 0; col < nCols; col++) {
							__accu1__.append (0);
						}
						return __accu1__;
					}) ());
				}
				return __accu0__;
			}) ();
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
	});},
	get __floordiv__ () {return __get__ (this, function (self, other) {
		return 'Overloading __floordiv__ has no meaning for matrices';
	});},
	get __truediv__ () {return __get__ (this, function (self, other) {
		return 'Overloading __truediv__ has no meaning for matrices';
	});}
});
export var Functor =  __class__ ('Functor', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, factor) {
		self.factor = factor;
	});},
	get __call__ () {return __get__ (this, function (self, x, y) {
		if (typeof y == 'undefined' || (y != null && y.hasOwnProperty ("__kwargtrans__"))) {;
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
		return tuple ([self.factor * x, self.factor * y, (function () {
			var __accu0__ = [];
			for (var arg of args) {
				__accu0__.append (self.factor * arg);
			}
			return __accu0__;
		}) (), self.factor * m, self.factor * n]);
	});}
});
export var f = Functor (10);
export var g = function (x, y) {
	if (typeof y == 'undefined' || (y != null && y.hasOwnProperty ("__kwargtrans__"))) {;
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
export var run = function (autoTester) {
	var m0 = Matrix (3, 3, [[1, 2, 3], [4, 5, 6], [7, 8, 10]]);
	var m1 = Matrix (3, 3, [[10, 20, 30], [40, 50, 60], [70, 80, 90]]);
	var m4 = Matrix (3, 3, [[1, 1, 2], [2, 2, 3], [3, 3, -(5)]]);
	var m5 = Matrix (3, 3, [[1, 1, 2], [2, 2, 3], [3, 3, -(5)]]);
	var x = 3;
	var y = (x * 4) * x;
	var fast = 2 * 3;
	fast++;
	__setitem__ (__getitem__ (m1, 1), 2, __getitem__ (__getitem__ (m0, 1), 2));
	var slow = __add__ (2, 3);
	var m2 = __add__ (__mul__ (m0, m1), __mul__ (m1, __add__ (m0, m1)));
	var m3 = __mul__ (__mul__ (2, __add__ (__mul__ (__mul__ (__mul__ (2, m0), 3), m1), __mul__ (m2, 4))), 2);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __getitem__ (__getitem__ (m0, 1), 1), __getitem__ (__getitem__ (m0, 1), 2), __getitem__ (__getitem__ (m1, 1), 1), __getitem__ (__getitem__ (m1, 1), 2));
	}) ();
	var m1 = __call__ (__iadd__, null, m1, m0);
	var m2 = __call__ (__imul__, null, m2, m1);
	var m5 = __call__ (__imatmul__, null, m5, m4);
	var m6 = __matmul__ (m0, m1);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __truediv__ (m0, m1));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __floordiv__ (m0, m1));
	}) ();
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
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (f, null, 3, 4, 30, 40, __kwargtrans__ ({m: 300, n: 400, p: 3000, q: 4000})));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (g, null, 3, 4, 30, 40, __kwargtrans__ ({m: 300, n: 400, p: 3000, q: 4000})));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __eq__ (__call__ (set, null, tuple ([1, 2, 3])), __call__ (set, null, tuple ([3, 2, 1]))));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __ne__ (__call__ (set, null, tuple ([1, 2, 3])), __call__ (set, null, tuple ([3, 2, 1]))));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __eq__ (__call__ (set, null, tuple ([1, 3])), __call__ (set, null, tuple ([3, 2, 1]))));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __ne__ (__call__ (set, null, tuple ([1, 3])), __call__ (set, null, tuple ([3, 2, 1]))));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __lt__ (__call__ (set, null, tuple ([1, 2])), __call__ (set, null, tuple ([3, 2, 1]))));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __le__ (__call__ (set, null, tuple ([1, 2, 3])), __call__ (set, null, tuple ([3, 2, 1]))));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __gt__ (__call__ (set, null, tuple ([1, 2, 3])), __call__ (set, null, tuple ([2, 1]))));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __ge__ (__call__ (set, null, tuple ([1, 2, 3])), __call__ (set, null, tuple ([3, 2, 1]))));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __eq__ (tuple ([1, 2, 3]), tuple ([1, 2, 3])));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __eq__ ([1, 2, 3], [1, 2, 3]));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __ne__ (tuple ([1, 2, 3]), tuple ([1, 2, 3])));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __ne__ ([1, 2, 3], [1, 2, 3]));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __eq__ (tuple ([2, 1, 3]), tuple ([1, 2, 3])));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __eq__ ([2, 1, 3], [1, 2, 3]));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __ne__ (tuple ([2, 1, 3]), tuple ([1, 2, 3])));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __ne__ ([2, 1, 3], [1, 2, 3]));
	}) ();
	var Bitwise = __class__ ('Bitwise', [object], {
		__module__: __name__,
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
	__lshift__ (bitwise, []);
	__lshift__ ([], bitwise);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __lshift__ (32, 2));
	}) ();
	__rshift__ (bitwise, []);
	__rshift__ ([], bitwise);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __rshift__ (32, 2));
	}) ();
	__or__ (bitwise, []);
	__or__ ([], bitwise);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __or__ (1, 4));
	}) ();
	__xor__ (bitwise, []);
	__xor__ ([], bitwise);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __xor__ (11, 13));
	}) ();
	__and__ (bitwise, []);
	__and__ ([], bitwise);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __and__ (12, 20));
	}) ();
	var a = 32;
	var a = __call__ (__ilshift__, null, a, 2);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, a);
	}) ();
	autoTester.check (32 << 2);
	autoTester.check (32 >> 2);
	autoTester.check (1 | 4);
	autoTester.check (11 ^ 13);
	autoTester.check (12 & 20);
	var a = 32;
	a <<= 2;
	autoTester.check (a);
	var A = __class__ ('A', [object], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self) {
			self.b = dict ({});
		});}
	});
	var a = A ();
	a.b ['c'] = 'd';
	__setitem__ (a.b, 'c', __call__ (__iadd__, null, __getitem__ (a.b, 'c'), 'e'));
	autoTester.check (a.b ['c']);
};

//# sourceMappingURL=operator_overloading.map