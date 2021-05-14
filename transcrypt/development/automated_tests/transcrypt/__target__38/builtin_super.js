// Transcrypt'ed from Python, 2021-05-14 15:00:26
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get run () {return run;}, set run (value) {run = value;}});
var __name__ = 'builtin_super';
export var run = function (autoTester) {
	var show = function () {
		var args = tuple ([].slice.apply (arguments).slice (0));
		autoTester.check (...args);
	};
	var R = __class__ ('R', [object], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self, a, b) {
			self.a = a;
			self.b = b;
		});}
	});
	var A = __class__ ('A', [R], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self, a, b, c) {
			__super__ (A, '__init__') (self, a, b);
			self.c = c;
		});},
		get f () {return __get__ (this, function (self, x, y) {
			show ('A.f:', x, y, self.a, self.b, self.c);
		});},
		get g () {return __get__ (this, function (self, x, y) {
			show ('A.g:', x, y);
		});}
	});
	var B = __class__ ('B', [R], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self, a, b, d) {
			__super__ (B, '__init__') (self, a, b);
			self.d = d;
		});},
		get f () {return __get__ (this, function (self, x, y) {
			show ('B.f:', x, y, self.a, self.b, self.d);
		});},
		get h () {return __get__ (this, function (self, x, y) {
			show ('A.h:', x, y, self.a, self.b, self.d);
		});}
	});
	var C = __class__ ('C', [A], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self, a, b, c) {
			__super__ (C, '__init__') (self, a, b, c);
		});},
		get f () {return __get__ (this, function (self, x, y) {
			__super__ (C, 'f') (self, x, y);
			show ('C.f:', x, y, self.a, self.b, self.c);
		});}
	});
	var D = __class__ ('D', [B], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self, a, b, d) {
			__super__ (D, '__init__') (self, a, b, d);
		});},
		get f () {return __get__ (this, function (self, x, y) {
			__super__ (D, 'f') (self, x, y);
			show ('D.f:', x, y, self.a, self.b, self.d);
		});}
	});
	var E = __class__ ('E', [C, D], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self, a, b, c, d) {
			R.__init__ (self, a, b);
			self.c = c;
			self.d = d;
		});},
		get f () {return __get__ (this, function (self, x, y) {
			C.f (self, x, y);
			D.f (self, x, y);
			show ('E.f:', x, y, self.a, self.b, self.c, self.d);
		});},
		get g () {return __get__ (this, function (self, x, y) {
			__super__ (E, 'g') (self, x, y);
			show ('E.g:', x, y, self.a, self.b, self.c, self.d);
		});},
		get h () {return __get__ (this, function (self, x, y) {
			__super__ (E, 'h') (self, x, y);
			show ('E.h:', x, y, self.a, self.b, self.c, self.d);
		});}
	});
	var rr = R (100, 200);
	show ('--1--');
	var a = A (101, 201, 301);
	a.f (711, 811);
	a.g (721, 821);
	show ('--2--');
	var b = B (102, 202, 302);
	b.f (712, 812);
	b.h (732, 832);
	show ('--3--');
	var c = C (103, 203, 303);
	c.f (713, 813);
	c.g (723, 823);
	show ('--4--');
	var d = D (104, 204, 304);
	d.f (714, 814);
	d.h (734, 834);
	show ('--5--');
	var e = E (105, 205, 305, 405);
	e.f (715, 815);
	e.g (725, 825);
	e.h (735, 835);
};

//# sourceMappingURL=builtin_super.map