// Transcrypt'ed from Python, 2021-05-14 15:00:25
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get run () {return run;}, set run (value) {run = value;}});
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

//# sourceMappingURL=local_classes.map