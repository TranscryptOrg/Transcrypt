import {__envir__, __nest__, __init__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, complex, __conj__, __Terminal__, __terminal__, print} from './org.transcrypt.__runtime__.mod.js';
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