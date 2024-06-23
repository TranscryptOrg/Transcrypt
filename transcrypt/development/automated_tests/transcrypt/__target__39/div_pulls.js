// Transcrypt'ed from Python, 2021-05-14 15:01:25
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as pull575 from './div_pulls.pull575_reexport_modules.js';
export {pull575};
var __all__ = dict ({get A () {return A;}, set A (value) {A = value;}, get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get a () {return a;}, set a (value) {a = value;}, get run () {return run;}, set run (value) {run = value;}});
var __name__ = 'div_pulls';
export var A =  __class__ ('A', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, x) {
		self.x = x;
	});}
});
export var a = A (5.5);
export var run = function (autoTester) {
	autoTester.check ('Pull 56');
	var s = 'abcdefghij';
	autoTester.check (s.__getslice__ (2, 3, 1));
	autoTester.check (s.__getslice__ (0, 3, 1));
	autoTester.check (s.__getslice__ (2, null, 1));
	autoTester.check (s.__getslice__ (0, null, 2));
	autoTester.check ('Pull 59');
	autoTester.check (list (filter ((function __lambda__ (x) {
		return __mod__ (x, 2) == 0;
	}), range (10))));
	autoTester.check (list (map ((function __lambda__ (x) {
		return x * x;
	}), range (0, 31, 3))));
	autoTester.check ('Pull 561');
	var brackets = function (word) {
		autoTester.check ('sideeffect');
		return ('[' + word) + ']';
	};
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, (function () {
			var __accu1__ = __call__ (brackets, null, 'anything');
			return __call__ (__accu1__.lower, __accu1__);
		}) ());
	}) ();
	pull575.run (autoTester);
};

//# sourceMappingURL=div_pulls.map