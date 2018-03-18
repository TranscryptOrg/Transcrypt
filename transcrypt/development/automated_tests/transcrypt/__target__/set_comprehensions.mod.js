"use strict";
import {__nest__, __init__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __Envir__, __envir__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, complex, __conj__, __Terminal__, __terminal__, print} from './org.transcrypt.__runtime__.mod.js';
var __name__ = 'set_comprehensions';
export var run = function (autoTester) {
	var even = (function () {
		var __accu0__ = [];
		for (var i of list ([0, 9, 1, 7, 2, 8, 3, 6, 4, 5])) {
			__accu0__.append (2 * i);
		}
		return set (__accu0__);
	}) ();
	autoTester.check (even);
	var odd = (function () {
		var __accu0__ = [];
		for (var i of list ([5, 6, 7, 8, 9, 4, 3, 1, 2, 0])) {
			__accu0__.append (2 * i + 1);
		}
		return set (__accu0__);
	}) ();
	autoTester.check (odd);
	even.add (12);
	even.add (12);
	autoTester.check (even);
	even.discard (12);
	even.discard (12);
	autoTester.check (even);
	var uni = even.union (odd);
	autoTester.check (uni);
	autoTester.check (odd.isdisjoint (even));
	autoTester.check (uni.isdisjoint (even));
	autoTester.check (even.issuperset (uni));
	autoTester.check (uni.issuperset (even));
	autoTester.check (even.issubset (uni));
	autoTester.check (uni.issubset (even));
	var first = new set ([4, 1, 0, 5, 3, 2, 6]);
	autoTester.check (first);
	var second = new set ([3, 5, 6, 9, 4, 7, 8]);
	autoTester.check (second);
	var inter = first.intersection (second);
	autoTester.check (inter);
	var diff = first.difference (second);
	autoTester.check (diff);
	var symDiff = first.symmetric_difference (second);
	autoTester.check (symDiff);
	var aSet = new set ([200, 4, 5, 100]);
	aSet.py_update (first, symDiff, second);
	autoTester.check (aSet);
};