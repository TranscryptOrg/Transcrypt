// Transcrypt'ed from Python, 2018-04-05 23:19:50
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, complex, __conj__, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var __name__ = 'cmath';
export var pi = Math.PI;
export var e = Math.E;
export var phase = function (x) {
	return (typeof x === 'number' ? 0 : Math.atan2 (x.imag, x.real));
};
export var polar = function (x) {
	return (typeof x === 'number' ? tuple ([Math.abs (x), 0]) : tuple ([abs (x), phase (x)]));
};
export var rect = function (r, phi) {
	return __mul__ (r, __add__ (__call__ (Math.cos, Math, phi), __mul__ (complex (0, 1.0), __call__ (Math.sin, Math, phi))));
};
export var exp = function (x) {
	return (typeof x === 'number' ? complex (x, 0).__exp__ () : x.__exp__ ());
};
export var log = function (x, base) {
	return (base === undefined ? (typeof x === 'number' ? complex (x, 0).__log__ () : x.__log__ ()) : __truediv__ (log (x), log (base)));
};
export var log10 = function (x) {
	return log (x, 10);
};
export var sqrt = function (x) {
	return exp (__mul__ (log (x), 0.5));
};
export var sin = function (x) {
	return __mul__ (__neg__ (complex (0, 0.5)), __sub__ (__call__ (exp, null, __mul__ (complex (0, 1.0), x)), __call__ (exp, null, __mul__ (__neg__ (complex (0, 1.0)), x))));
};
export var cos = function (x) {
	return __mul__ (0.5, __add__ (__call__ (exp, null, __mul__ (complex (0, 1.0), x)), __call__ (exp, null, __mul__ (__neg__ (complex (0, 1.0)), x))));
};
export var tan = function (x) {
	return __truediv__ (__mul__ (__neg__ (complex (0, 1.0)), __sub__ (__call__ (exp, null, __mul__ (complex (0, 1.0), x)), __call__ (exp, null, __mul__ (__neg__ (complex (0, 1.0)), x)))), __add__ (__call__ (exp, null, __mul__ (complex (0, 1.0), x)), __call__ (exp, null, __mul__ (__neg__ (complex (0, 1.0)), x))));
};
export var asin = function (x) {
	return __mul__ (__neg__ (complex (0, 1.0)), __call__ (log, null, __add__ (__mul__ (complex (0, 1.0), x), __call__ (sqrt, null, __sub__ (1, __mul__ (x, x))))));
};
export var acos = function (x) {
	return __mul__ (__neg__ (complex (0, 1.0)), __call__ (log, null, __add__ (x, __mul__ (complex (0, 1.0), __call__ (sqrt, null, __sub__ (1, __mul__ (x, x)))))));
};
export var atan = function (x) {
	return __mul__ (complex (0, 0.5), __call__ (log, null, __truediv__ (__add__ (complex (0, 1.0), x), __sub__ (complex (0, 1.0), x))));
};
export var sinh = function (x) {
	return __mul__ (0.5, __sub__ (__call__ (exp, null, x), __call__ (exp, null, __neg__ (x))));
};
export var cosh = function (x) {
	return __mul__ (0.5, __add__ (__call__ (exp, null, x), __call__ (exp, null, __neg__ (x))));
};
export var tanh = function (x) {
	return __truediv__ (__sub__ (__call__ (exp, null, x), __call__ (exp, null, __neg__ (x))), __add__ (__call__ (exp, null, x), __call__ (exp, null, __neg__ (x))));
};
export var asinh = function (x) {
	return __call__ (log, null, __add__ (x, __call__ (sqrt, null, __add__ (1, __mul__ (x, x)))));
};
export var acosh = function (x) {
	return __call__ (log, null, __add__ (x, __call__ (sqrt, null, __add__ (__neg__ (1), __mul__ (x, x)))));
};
export var atanh = function (x) {
	return __mul__ (0.5, __call__ (log, null, __truediv__ (__add__ (1, x), __sub__ (1, x))));
};
export var isinf = function (x) {
	return x.real == js_Infinite || x.imag == js.Infinite;
};
export var isfinite = function (x) {
	return !(isinf (x));
};
export var isnan = function (x) {
	return isNaN (x.real) || isNaN (x.imag);
};

//# sourceMappingURL=cmath.map