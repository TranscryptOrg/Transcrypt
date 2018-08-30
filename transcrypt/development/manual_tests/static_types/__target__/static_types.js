// Transcrypt'ed from Python, 2018-08-28 20:48:00
var mod1 = {};
var mod2 = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as __module_mod2__ from './mod2.js';
__nest__ (mod2, '', __module_mod2__);
import * as __module_mod1__ from './mod1.js';
__nest__ (mod1, '', __module_mod1__);
import {Iterator} from './typing.js';
var __name__ = '__main__';
var testVar = 3.5;
export var fib = function (n) {
	var __left0__ = tuple ([0, 1]);
	var a = __left0__ [0];
	var b = __left0__ [1];
	while (a < n) {
		var __left0__ = tuple ([b, a + b]);
		var a = __left0__ [0];
		var b = __left0__ [1];
	}
	return 3;
};
export var add = function (a, b) {
	return a + b;
};
export var A =  __class__ ('A', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		// pass;
	});},
	get test () {return __get__ (this, function (self) {
		return 'test';
	});}
});

//# sourceMappingURL=static_types.map