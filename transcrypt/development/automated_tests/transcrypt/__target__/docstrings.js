// Transcrypt'ed from Python, 2018-04-07 16:09:31
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, complex, __conj__, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var __name__ = 'docstrings';
export var __doc__ = 'Just a module\nto test docstrings';
export var run = function (autoTester) {
	var f = function (p) {
		autoTester.check (p);
	} .__setdoc__ ('Just a function\n        called f');
	var C = __class__ ('C', [object], {
		__module__: __name__,
		get g () {return __get__ (this, function (self, q) {
			autoTester.check (q);
		} .__setdoc__ ('Just a method\n            called g'));}
	}) .__setdoc__ ('Just a class\n        called C');
	autoTester.check (__doc__);
	autoTester.check ();
	autoTester.check (f.__doc__);
	autoTester.check ();
	autoTester.check (C.__doc__);
	autoTester.check ();
	autoTester.check (C.g.__doc__);
	autoTester.check ();
	f ('Doc');
	C ().g ('strings');
};
export {};

//# sourceMappingURL=docstrings.map