// Transcrypt'ed from Python, 2021-05-14 15:01:26
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get run () {return run;}, set run (value) {run = value;}});
var __name__ = 'complex_numbers';
export var run = function (autoTester) {
	var x = 567;
	var y = -(3);
	var z = 5 * x + 2 * y;
	autoTester.check (__conj__ (x).real, __conj__ (x).imag);
	autoTester.check (x, y, z);
	var a = __add__ (234, complex (0, 3.0));
	var b = __sub__ (4, complex (0, 5.0));
	var c = __call__ (complex, null, __neg__ (6), 7);
	var d = 1;
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, a, b, c);
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (__conj__, null, d).real, __call__ (__conj__, null, d).imag);
	}) ();
	var t = __add__ (__sub__ (__mul__ (6, x), __mul__ (3, y)), 7);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, t);
	}) ();
	var d = __mul__ (2, a);
	var e = __mul__ (x, b);
	var f = __add__ (__add__ (z, d), e);
	var g = __truediv__ (a, b);
	var h = __sub__ (a, b);
	var i = __sub__ (x, c);
	var j = __sub__ (a, x);
	var k = __add__ (b, y);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, d, e, f, __call__ (round, null, g.real, 2), __call__ (round, null, g.imag, 2), h, i, j, k);
	}) ();
};

//# sourceMappingURL=complex_numbers.map