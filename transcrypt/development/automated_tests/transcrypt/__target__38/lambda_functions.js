// Transcrypt'ed from Python, 2021-05-14 15:00:25
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get run () {return run;}, set run (value) {run = value;}});
var __name__ = 'lambda_functions';
export var run = function (autoTester) {
	var z = 1000;
	autoTester.check ((function __lambda__ (x, y) {
		return (x + y) + z;
	}) (111, 222));
	var f = function (list0, list1, aFunc) {
		return (function () {
			var __accu0__ = [];
			for (var elem of zip (list0, list1)) {
				__accu0__.append (aFunc (...elem));
			}
			return __accu0__;
		}) ();
	};
	var x = f (range (10), range (0, 100, 10), (function __lambda__ (x, y) {
		return (x + y) + z;
	}));
	autoTester.check (x);
	autoTester.check (f (range (10, 20), range (100, 200, 10), (function __lambda__ (x, y) {
		return x * y + 100 * z;
	})));
	autoTester.check (f (range (10, 20), range (100, 200, 10), (function __lambda__ () {
		var args = tuple ([].slice.apply (arguments).slice (0));
		return args [0] * args [1] + 100 * z;
	})));
};

//# sourceMappingURL=lambda_functions.map