import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, complex, __conj__, __Terminal__, __terminal__, print} from './org.transcrypt.__runtime__.mod.js';
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