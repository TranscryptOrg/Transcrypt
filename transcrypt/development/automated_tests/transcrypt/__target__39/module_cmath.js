// Transcrypt'ed from Python, 2021-05-14 15:01:25
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {acos, acosh, asin, asinh, atan, atanh, cos, cosh, e, exp, isfinite, isinf, isnan, log, log10, phase, pi, polar, rect, sin, sinh, sqrt, tan, tanh} from './cmath.js';
export {asinh, isfinite, sinh, polar, acosh, pi, asin, atan, cosh, isnan, rect, log, phase, sqrt, sin, cos, exp, e, isinf, atanh, tan, tanh, acos, log10};
var __all__ = dict ({get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get nDecs () {return nDecs;}, set nDecs (value) {nDecs = value;}, get run () {return run;}, set run (value) {run = value;}, get twoPi () {return twoPi;}, set twoPi (value) {twoPi = value;}});
var __name__ = 'module_cmath';
export var twoPi = 2 * pi;
export var nDecs = 5;
export var run = function (autoTester) {
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (phase, null, __add__ (1, complex (0, 1.0))));
	}) ();
	var aPolar = __call__ (polar, null, __add__ (3, complex (0, 5.0)));
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (round, null, , nDecs), );
	}) ();
	var aRect = __call__ (rect, null, ...aPolar);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (round, null, aRect.real), __call__ (round, null, aRect.imag));
	}) ();
	var anExp = __call__ (exp, null, __sub__ (__neg__ (2.2), complex (0, 3.3)));
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (round, null, anExp.real, nDecs), __call__ (round, null, anExp.imag, nDecs));
	}) ();
	var aLog = __call__ (log, null, anExp);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (round, null, aLog.real, nDecs), __call__ (round, null, aLog.imag, nDecs));
	}) ();
	var anExp10 = __pow__ (aLog, 10);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (round, null, anExp10.real, nDecs), __call__ (round, null, anExp10.imag, nDecs));
	}) ();
	var aLog10 = __call__ (log10, null, anExp10);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (round, null, aLog10.real, nDecs), __call__ (round, null, aLog10.imag, nDecs));
	}) ();
	var anExpRect = __pow__ (aLog, aRect);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (round, null, anExpRect.real, nDecs), __call__ (round, null, anExpRect.imag, nDecs));
	}) ();
	var aLogRect = __call__ (log, null, anExpRect, aRect);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (round, null, aLogRect.real, nDecs), __call__ (round, null, aLogRect.imag, nDecs));
	}) ();
	var aSqrt = __call__ (sqrt, null, complex (0, 1.0));
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (round, null, aSqrt.real, nDecs), __call__ (round, null, aSqrt.imag, nDecs));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (sqrt, null, 4));
	}) ();
	var anotherSqrt = __call__ (sqrt, null, __neg__ (4));
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (round, null, anotherSqrt.real), __call__ (round, null, anotherSqrt.imag));
	}) ();
	var anAsin = __call__ (asin, null, __add__ (1, complex (0, 2.0)));
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (round, null, anAsin.real, nDecs), __call__ (round, null, anAsin.imag, nDecs));
	}) ();
	var anAcos = __call__ (acos, null, __add__ (__neg__ (2), complex (0, 3.0)));
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (round, null, anAcos.real, nDecs), __call__ (round, null, anAcos.imag, nDecs));
	}) ();
	var anAtan = __call__ (atan, null, __sub__ (3, complex (0, 4.0)));
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (round, null, anAtan.real, nDecs), __call__ (round, null, anAtan.imag, nDecs));
	}) ();
	var aSin = __call__ (sin, null, anAsin);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (round, null, aSin.real), __call__ (round, null, aSin.imag));
	}) ();
	var aCos = __call__ (cos, null, anAcos);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (round, null, aCos.real), __call__ (round, null, aCos.imag));
	}) ();
	var aTan = __call__ (tan, null, anAtan);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (round, null, aTan.real), __call__ (round, null, aTan.imag));
	}) ();
	var anAsinh = __call__ (asinh, null, aCos);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (round, null, anAsinh.real, nDecs), __call__ (round, null, anAsinh.imag, nDecs));
	}) ();
	var anAcosh = __call__ (acosh, null, aSin);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (round, null, anAcosh.real, nDecs), __call__ (round, null, anAcosh.imag, nDecs));
	}) ();
	var anAtanh = __call__ (atanh, null, aTan);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (round, null, anAtanh.real, nDecs), __call__ (round, null, anAtanh.imag, nDecs));
	}) ();
	var aSinh = __call__ (sinh, null, anAsinh);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (round, null, aSinh.real), __call__ (round, null, aSinh.imag));
	}) ();
	var aCosh = __call__ (cosh, null, anAcosh);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (round, null, aCosh.real), __call__ (round, null, aCosh.imag));
	}) ();
	var aTanh = __call__ (tanh, null, anAtanh);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (round, null, aTanh.real), __call__ (round, null, aTanh.imag));
	}) ();
};

//# sourceMappingURL=module_cmath.map