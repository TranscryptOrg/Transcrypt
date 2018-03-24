import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, complex, __conj__, __Terminal__, __terminal__, print} from './org.transcrypt.__runtime__.mod.js';
var __name__ = 'local_classes';
export var run = function (autoTester) {
	var A = __class__ ('A', [object], {
		__module__: __name__,
		B: __class__ ('B', [object], {
			__module__: __name__,
			C: __class__ ('C', [object], {
				__module__: __name__,
				get __init__ () {return __get__ (this, function (self, x) {
					self.x = x;
				});},
				get tell () {return __get__ (this, function (self) {
					autoTester.check (self.x);
					autoTester.check (self.e);
				});},
				e: 3
			}),
			get __init__ () {return __get__ (this, function (self, x) {
				self.x = x;
			});},
			get tell () {return __get__ (this, function (self) {
				autoTester.check (self.x);
				autoTester.check (self.d);
			});},
			d: 2
		}),
		c: 1,
		get __init__ () {return __get__ (this, function (self, x) {
			self.x = x;
		});},
		get tell () {return __get__ (this, function (self) {
			autoTester.check (self.x);
			autoTester.check (self.c);
		});}
	});
	var f = function (x) {
		var G = __class__ ('G', [object], {
			__module__: __name__,
			H: __class__ ('H', [object], {
				__module__: __name__,
				get __init__ () {return __get__ (this, function (self, x) {
					self.x = x;
				});},
				get tell () {return __get__ (this, function (self) {
					autoTester.check (self.x);
					autoTester.check (self.i);
				});},
				i: 5
			}),
			get __init__ () {return __get__ (this, function (self, x) {
				self.x = x;
			});},
			get tell () {return __get__ (this, function (self) {
				autoTester.check (self.x);
			});},
			k: 4
		});
		var g = G (6);
		g.tell ();
		autoTester.check (g.k);
		var h = G.H (7);
		h.tell ();
		autoTester.check (h.i);
		var P = __class__ ('P', [A.B], {
			__module__: __name__,
		});
		var p = P (7);
		p.tell ();
		autoTester.check (p.d);
	};
	var a = A (8);
	var b = a.B (9);
	var c = b.C (10);
	a.tell ();
	b.tell ();
	c.tell ();
	autoTester.check (a.c);
	autoTester.check (b.d);
	f (7);
};