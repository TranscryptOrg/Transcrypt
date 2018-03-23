import {__envir__, __nest__, __init__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, complex, __conj__, __Terminal__, __terminal__, print} from './org.transcrypt.__runtime__.mod.js';
var __name__ = 'tuple_assignment';
export var run = function (autoTester) {
	var __left0__ = tuple ([tuple ([1, 2]), 'santa-claus', new set ([3, 4]), 5]);
	var a = __left0__ [0][0];
	var b = __left0__ [0][1];
	var santa = __left0__ [1];
	var c = __left0__ [2][0];
	var d = __left0__ [2][1];
	var e = __left0__ [3];
	autoTester.check (a, b, c, d, e, santa);
	for (var [i, x] of enumerate (tuple ([0.5, 1.5, 2.5, 3.5]))) {
		autoTester.check (i, x);
	}
	var __left0__ = tuple ([3.14, 2.74]);
	var e = __left0__ [0];
	var pi = __left0__ [1];
	var __left0__ = tuple ([pi, e]);
	var e = __left0__ [0];
	var pi = __left0__ [1];
	autoTester.check (e, pi);
	var f = function () {
		return (function () {
			var __accu0__ = [];
			for (var i = 7000; i < 10000; i += 1000) {
				__accu0__.append (tuple ([i, 2 * i]));
			}
			return __accu0__;
		}) ();
	};
	var g = function () {
		return f;
	};
	var __left0__ = g () ();
	var k = __left0__ [0][0];
	var l = __left0__ [0][1];
	var m = __left0__ [1][0];
	var n = __left0__ [1][1];
	var o = __left0__ [2][0];
	var p = __left0__ [2][1];
	autoTester.check (k, l, m, n, o, p);
};