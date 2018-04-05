// Transcrypt'ed from Python, 2018-04-05 23:13:40
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var mod1 = {};
var mod2 = {};
var __name__ = '__main__';
import {Iterator} from './typing.js';
import * as __module_mod1__ from './mod1.js';
__nest__ (mod1, '', __module_mod1__);
import * as __module_mod2__ from './mod2.js';
__nest__ (mod2, '', __module_mod2__);
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