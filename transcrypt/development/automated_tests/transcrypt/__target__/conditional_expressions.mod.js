import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, complex, __conj__, __Terminal__, __terminal__, print} from './org.transcrypt.__runtime__.mod.js';
var __name__ = 'conditional_expressions';
export var f = function (x, b) {
	return (b ? x * x : x + x);
};
export var run = function (autoTester) {
	var bools = tuple ([false, true]);
	for (var a of bools) {
		for (var b of bools) {
			autoTester.check (f ((a ? 10 : 100), b));
		}
	}
	for (var p of bools) {
		for (var q of bools) {
			for (var r of bools) {
				autoTester.check ((p ? 'a' : (q ? 'b' : (r ? 'c' : 'd'))));
				var a = (r ? (q ? (p ? 'e' : 'f') : 'g') : 'h');
				var b = (p ? 'i' : (q ? 'j' : (r ? 'k' : 'l')));
				var c = ((q ? p : r) ? 'm' : 'n');
				var d = ((p < q && q <= r) ? 'o' : 'p');
				autoTester.check (a, b, c, d);
			}
		}
	}
	var odd = (function () {
		var __accu0__ = [];
		for (var x = 0; x < 10; x++) {
			__accu0__.append ((__mod__ (x, 2) ? x : x + 1));
		}
		return __accu0__;
	}) ();
	var noDuplicates = set (odd);
	autoTester.check (odd, noDuplicates);
};