import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, complex, __conj__, __Terminal__, __terminal__, print} from './org.transcrypt.__runtime__.mod.js';
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