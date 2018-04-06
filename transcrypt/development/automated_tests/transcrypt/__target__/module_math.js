// Transcrypt'ed from Python, 2018-04-05 23:19:52
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, complex, __conj__, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var __name__ = 'module_math';
import {pi, e, exp, expm1, log, log1p, log2, log10, pow, sqrt, sin, cos, tan, asin, acos, atan, atan2, hypot, degrees, radians, sinh, cosh, tanh, asinh, acosh, atanh, floor, ceil, trunc, isnan, inf, nan, modf} from './math.js';
export {pi, e, exp, expm1, log, log1p, log2, log10, pow, sqrt, sin, cos, tan, asin, acos, atan, atan2, hypot, degrees, radians, sinh, cosh, tanh, asinh, acosh, atanh, floor, ceil, trunc, isnan, inf, nan, modf};
export var _check = function (nr, autoTester) {
	if (isinstance (nr, float)) {
		var nr = str (nr).__getslice__ (0, 15, 1);
	}
	autoTester.check (nr);
};
export var run = function (autoTester) {
	var check = (function __lambda__ (nr) {
		return _check (nr, autoTester);
	});
	check (pi);
	check (e);
	check (exp (3));
	check (int (expm1 (5)));
	check (log (0.2));
	check (round (log (1024, 2)));
	check (log1p (5));
	check (int (log2 (257)));
	check (int (log10 (1001)));
	check (pow (3, 4.5));
	check (sqrt (25.1));
	check (sin (10));
	check (cos (10));
	check (tan (10));
	check (asin (0.5));
	check (acos (0.5));
	check (atan (0.5));
	check (atan2 (1, 2));
	check (int (hypot (3, 4.1)));
	check (degrees (pi / 2.1));
	check (radians (90));
	check (sinh (1));
	check (cosh (1));
	check (tan (1));
	check (asinh (70));
	check (acosh (70));
	check (atan (70));
	check (floor (3.5));
	check (ceil (3.5));
	check (trunc (3.5));
	check (isnan (3));
	check (isnan (nan));
};

//# sourceMappingURL=module_math.map