// Transcrypt'ed from Python, 2021-05-14 15:00:23
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get run () {return run;}, set run (value) {run = value;}});
var __name__ = 'set_comprehensions';
export var run = function (autoTester) {
	var even = (function () {
		var __accu0__ = [];
		for (var i of [0, 9, 1, 7, 2, 8, 3, 6, 4, 5]) {
			__accu0__.append (2 * i);
		}
		return set (__accu0__);
	}) ();
	autoTester.check (even);
	var odd = (function () {
		var __accu0__ = [];
		for (var i of [5, 6, 7, 8, 9, 4, 3, 1, 2, 0]) {
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

//# sourceMappingURL=set_comprehensions.map