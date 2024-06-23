// Transcrypt'ed from Python, 2021-05-14 15:00:23
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get run () {return run;}, set run (value) {run = value;}});
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

//# sourceMappingURL=tuple_assignment.map