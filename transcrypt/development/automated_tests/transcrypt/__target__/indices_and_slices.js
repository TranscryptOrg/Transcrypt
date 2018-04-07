// Transcrypt'ed from Python, 2018-04-07 16:09:31
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, complex, __conj__, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var __name__ = 'indices_and_slices';
export var run = function (autoTester) {
	var all = range (32);
	autoTester.check (all);
	autoTester.check (all.__getslice__ (8, 24, 1));
	autoTester.check (all.__getslice__ (8, 24, 2));
	var aList = list ([3, 4, 7, 8]);
	autoTester.check (aList);
	aList.__setslice__ (4, 4, null, list ([9, 10]));
	autoTester.check (aList);
	aList.__setslice__ (2, 2, null, list ([5, 6]));
	autoTester.check (aList);
	aList.__setslice__ (0, 0, null, list ([1, 2]));
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
export {};

//# sourceMappingURL=indices_and_slices.map