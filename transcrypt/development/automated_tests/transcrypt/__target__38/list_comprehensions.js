// Transcrypt'ed from Python, 2021-05-14 15:00:25
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get run () {return run;}, set run (value) {run = value;}});
var __name__ = 'list_comprehensions';
export var run = function (autoTester) {
	var squares = (function () {
		var __accu0__ = [];
		for (var i = 0; i < 10; i++) {
			if (__mod__ (i, 2)) {
				__accu0__.append (i * i);
			}
		}
		return __accu0__;
	}) ();
	autoTester.check (squares);
	var tuples = (function () {
		var __accu0__ = [];
		for (var x of tuple ([100, 200, 300, 400, 500, 600, 700])) {
			for (var y of tuple ([10, 20, 30, 40, 50, 60, 70])) {
				if ((20 < y && y < 60)) {
					for (var z of tuple ([1, 2, 3, 4, 5, 6, 7])) {
						if ((200 < x && x < 600)) {
							if ((2 < z && z < 6)) {
								__accu0__.append (tuple ([x, y, z]));
							}
						}
					}
				}
			}
		}
		return __accu0__;
	}) ();
	autoTester.check (tuples);
	var tricky = (function () {
		var __accu0__ = [];
		for (var [x, y] of tuple ([tuple ([10, 11]), tuple ([20, 21])])) {
			__accu0__.append (tuple ([2 * x, 3 * y]));
		}
		return __accu0__;
	}) ();
	autoTester.check (tricky);
	var nested = (function () {
		var __accu0__ = [];
		for (var x of (function () {
			var __accu1__ = [];
			for (var x = 0; x < 3; x++) {
				__accu1__.append (x * x);
			}
			return __accu1__;
		}) ()) {
			__accu0__.append (2 * x);
		}
		return __accu0__;
	}) ();
	autoTester.check (nested);
	var a = 100;
	var x = 5;
	var scopeTest = (function () {
		var __accu0__ = [];
		for (var x = 0; x < 5; x++) {
			__accu0__.append (x + a);
		}
		return __accu0__;
	}) ();
	autoTester.check (x);
	autoTester.check (scopeTest);
};

//# sourceMappingURL=list_comprehensions.map