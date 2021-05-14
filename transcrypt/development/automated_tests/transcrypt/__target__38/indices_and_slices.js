// Transcrypt'ed from Python, 2021-05-14 15:00:25
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get run () {return run;}, set run (value) {run = value;}});
var __name__ = 'indices_and_slices';
export var run = function (autoTester) {
	var all = range (32);
	autoTester.check (all);
	autoTester.check (all.__getslice__ (8, 24, 1));
	autoTester.check (all.__getslice__ (8, 24, 2));
	var aList = [3, 4, 7, 8];
	autoTester.check (aList);
	aList.__setslice__ (4, 4, null, [9, 10]);
	autoTester.check (aList);
	aList.__setslice__ (2, 2, null, [5, 6]);
	autoTester.check (aList);
	aList.__setslice__ (0, 0, null, [1, 2]);
	autoTester.check (aList);
	aList.__setslice__ (0, null, 2, (function () {
		var __accu0__ = [];
		for (var x = 0; x < 10; x++) {
			if (__mod__ (x, 2)) {
				__accu0__.append (x + 0.001);
			}
		}
		return __accu0__;
	}) ());
	autoTester.check (aList);
};

//# sourceMappingURL=indices_and_slices.map