// Transcrypt'ed from Python, 2021-05-14 15:00:25
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as sub from './globals_function.sub.js';
export {sub};
var __all__ = dict ({get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get f () {return f;}, set f (value) {f = value;}, get name () {return name;}, set name (value) {name = value;}, get run () {return run;}, set run (value) {run = value;}, get xxa () {return xxa;}, set xxa (value) {xxa = value;}, get xxb () {return xxb;}, set xxb (value) {xxb = value;}, get xxp () {return xxp;}, set xxp (value) {xxp = value;}, get xxq () {return xxq;}, set xxq (value) {xxq = value;}, get xxr () {return xxr;}, set xxr (value) {xxr = value;}, get xxs () {return xxs;}, set xxs (value) {xxs = value;}});
var __name__ = 'globals_function';
export var xxa = 'mainXxa';
export var xxb = 'mainXxb';
export var xxp = null;
export var xxq = null;
export var xxr = null;
export var xxs = null;
for (var py_name of tuple (['xxp', 'xxq'])) {
	__all__ [py_name] = 'main{}'.format (py_name.capitalize ());
}
export var f = function () {
	for (var py_name of tuple (['xxr', 'xxs'])) {
		__all__ [py_name] = 'main{}'.format (py_name.capitalize ());
	}
};
export var run = function (autoTester) {
	f ();
	sub.run (autoTester);
	autoTester.check ('Check main 1', xxa, xxb);
	autoTester.check ('Check main 2', ...(function () {
		var __accu0__ = [];
		for (var py_name of tuple (['xxa', 'xxb', 'xxp', 'xxq', 'xxr', 'xxs'])) {
			__accu0__.append (__all__ [py_name]);
		}
		return __accu0__;
	}) ());
	autoTester.check ('Check main 3', sub.xxa, sub.xxb, sub.xxp, sub.xxq, sub.xxr, sub.xxs);
	autoTester.check ('Check main 4', ...sorted ((function () {
		var __accu0__ = [];
		for (var [key, value] of __all__.py_items ()) {
			if (key.startswith ('xx')) {
				__accu0__.append (value);
			}
		}
		return __accu0__;
	}) ()));
};

//# sourceMappingURL=globals_function.map