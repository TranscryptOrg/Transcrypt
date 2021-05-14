// Transcrypt'ed from Python, 2021-05-14 15:00:24
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get acos () {return acos;}, set acos (value) {acos = value;}, get acosh () {return acosh;}, set acosh (value) {acosh = value;}, get asin () {return asin;}, set asin (value) {asin = value;}, get asinh () {return asinh;}, set asinh (value) {asinh = value;}, get atan () {return atan;}, set atan (value) {atan = value;}, get atan2 () {return atan2;}, set atan2 (value) {atan2 = value;}, get atanh () {return atanh;}, set atanh (value) {atanh = value;}, get ceil () {return ceil;}, set ceil (value) {ceil = value;}, get cos () {return cos;}, set cos (value) {cos = value;}, get cosh () {return cosh;}, set cosh (value) {cosh = value;}, get degrees () {return degrees;}, set degrees (value) {degrees = value;}, get e () {return e;}, set e (value) {e = value;}, get exp () {return exp;}, set exp (value) {exp = value;}, get expm1 () {return expm1;}, set expm1 (value) {expm1 = value;}, get floor () {return floor;}, set floor (value) {floor = value;}, get hypot () {return hypot;}, set hypot (value) {hypot = value;}, get inf () {return inf;}, set inf (value) {inf = value;}, get isnan () {return isnan;}, set isnan (value) {isnan = value;}, get log () {return log;}, set log (value) {log = value;}, get log10 () {return log10;}, set log10 (value) {log10 = value;}, get log1p () {return log1p;}, set log1p (value) {log1p = value;}, get log2 () {return log2;}, set log2 (value) {log2 = value;}, get modf () {return modf;}, set modf (value) {modf = value;}, get nan () {return nan;}, set nan (value) {nan = value;}, get pi () {return pi;}, set pi (value) {pi = value;}, get pow () {return pow;}, set pow (value) {pow = value;}, get radians () {return radians;}, set radians (value) {radians = value;}, get sin () {return sin;}, set sin (value) {sin = value;}, get sinh () {return sinh;}, set sinh (value) {sinh = value;}, get sqrt () {return sqrt;}, set sqrt (value) {sqrt = value;}, get tan () {return tan;}, set tan (value) {tan = value;}, get tanh () {return tanh;}, set tanh (value) {tanh = value;}, get trunc () {return trunc;}, set trunc (value) {trunc = value;}});
var __name__ = 'math';
export var pi = Math.PI;
export var e = Math.E;
export var exp = Math.exp;
export var expm1 = function (x) {
	return Math.exp (x) - 1;
};
export var log = function (x, base) {
	return (base === undefined ? Math.log (x) : Math.log (x) / Math.log (base));
};
export var log1p = function (x) {
	return Math.log (x + 1);
};
export var log2 = function (x) {
	return Math.log (x) / Math.LN2;
};
export var log10 = function (x) {
	return Math.log (x) / Math.LN10;
};
export var pow = Math.pow;
export var sqrt = Math.sqrt;
export var sin = Math.sin;
export var cos = Math.cos;
export var tan = Math.tan;
export var asin = Math.asin;
export var acos = Math.acos;
export var atan = Math.atan;
export var atan2 = Math.atan2;
export var hypot = Math.hypot;
export var degrees = function (x) {
	return (x * 180) / Math.PI;
};
export var radians = function (x) {
	return (x * Math.PI) / 180;
};
export var sinh = Math.sinh;
export var cosh = Math.cosh;
export var tanh = Math.tanh;
export var asinh = Math.asinh;
export var acosh = Math.acosh;
export var atanh = Math.atanh;
export var floor = Math.floor;
export var ceil = Math.ceil;
export var trunc = Math.trunc;
export var isnan = isNaN;
export var inf = Infinity;
export var nan = NaN;
export var modf = function (n) {
	var sign = (n >= 0 ? 1 : -(1));
	var __left0__ = divmod (abs (n), 1);
	var f = __left0__ [0];
	var mod = __left0__ [1];
	return tuple ([mod * sign, f * sign]);
};

//# sourceMappingURL=math.map