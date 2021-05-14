// Transcrypt'ed from Python, 2021-05-14 15:01:26
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get A () {return A;}, set A (value) {A = value;}, get B () {return B;}, set B (value) {B = value;}, get C () {return C;}, set C (value) {C = value;}, get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get run () {return run;}, set run (value) {run = value;}});
var __name__ = 'arguments';
export var A =  __class__ ('A', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, x, y) {
		if (typeof x == 'undefined' || (x != null && x.hasOwnProperty ("__kwargtrans__"))) {;
			var x = 123;
		};
		if (typeof y == 'undefined' || (y != null && y.hasOwnProperty ("__kwargtrans__"))) {;
			var y = 456;
		};
		var n = 456;
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
		self.x = x;
		self.y = y;
		self.args = args;
		self.m = m;
		self.n = n;
		self.kwargs = kwargs;
		self.extra = 'hello';
	});},
	get f () {return __get__ (this, function (self, autoTester) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'autoTester': var autoTester = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		autoTester.check (self.x, self.y, self.args, self.m, self.n, self.kwargs, self.extra);
	});}
});
export var B =  __class__ ('B', [A], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, x, y) {
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
		A.__init__ (self, y, x, ...args, __kwargtrans__ (__mergekwargtrans__ ({m: n, n: m}, kwargs)));
	});}
});
export var C =  __class__ ('C', [object], {
	__module__: __name__,
	get tricky () {return __get__ (this, function (self) {
		var args = tuple ([].slice.apply (arguments).slice (1));
		return args;
	});}
});
export var run = function (autoTester) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'autoTester': var autoTester = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var f = function (x, y) {
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
		autoTester.check ('#203', kwargs.__class__.__name__);
		autoTester.check ('#203', sorted (kwargs.py_keys ()));
		var f2 = function (x, y) {
			if (typeof y == 'undefined' || (y != null && y.hasOwnProperty ("__kwargtrans__"))) {;
				var y = -(3);
			};
			var m = -(4);
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
			autoTester.check (x, y, args, m, n, kwargs);
		};
		f2 (11, 22, 1010, 2020, __kwargtrans__ ({m: 100100, n: 200200, p: 10001000, q: 20002000}));
		autoTester.check (x, y, args, m, n, kwargs);
	};
	f (1, 2, 10, 20, __kwargtrans__ ({m: 100, n: 200, p: 1000, q: 2000}));
	var b = B (3, 4, 30, 40, __kwargtrans__ ({m: 300, n: 400, p: 3000, q: 4000}));
	b.f (autoTester);
	var g = function () {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (0, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		autoTester.check (args, kwargs);
	};
	g (...tuple ([1, 2, 3]), __kwargtrans__ (dict ({'p': 'aP', 'q': 'aQ', 'r': 'anR'})));
	(function __lambda__ (x, y) {
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
		return autoTester.check (x, y, args, m, n, kwargs);
	}) (1, 2, 8, 16, __kwargtrans__ ({m: 128, n: 256.3, p: 1024.3, q: 2048.3}));
	autoTester.check (C ().tricky (...range (4)));
	autoTester.check ('{}-{}'.format (1, 3, 5, 7, 9));
	autoTester.check ('{}-{}'.format (...range (4)));
};

//# sourceMappingURL=arguments.map