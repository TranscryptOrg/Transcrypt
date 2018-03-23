export var __all__ = {get f () {return f;}, set f (value) {f = value;}, get name () {return name;}, set name (value) {name = value;}, get run () {return run;}, set run (value) {run = value;}, get xxa () {return xxa;}, set xxa (value) {xxa = value;}, get xxb () {return xxb;}, set xxb (value) {xxb = value;}, get xxp () {return xxp;}, set xxp (value) {xxp = value;}, get xxq () {return xxq;}, set xxq (value) {xxq = value;}, get xxr () {return xxr;}, set xxr (value) {xxr = value;}, get xxs () {return xxs;}, set xxs (value) {xxs = value;}};
import {__envir__, __nest__, __init__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, complex, __conj__, __Terminal__, __terminal__, print} from './org.transcrypt.__runtime__.mod.js';
var __name__ = 'globals_function';
import * as sub from './globals_function.sub.mod.js';
export {};
export var xxa = 'mainXxa';
export var xxb = 'mainXxb';
export var xxp = null;
export var xxq = null;
export var xxr = null;
export var xxs = null;
for (var py_name of tuple (['xxp', 'xxq'])) {
	__globals__ (__all__) [py_name] = 'main{}'.format (py_name.capitalize ());
}
export var f = function () {
	for (var py_name of tuple (['xxr', 'xxs'])) {
		__globals__ (__all__) [py_name] = 'main{}'.format (py_name.capitalize ());
	}
};
export var run = function (autoTester) {
	f ();
	sub.run (autoTester);
	autoTester.check ('Check main 1', xxa, xxb);
	autoTester.check ('Check main 2', ...(function () {
		var __accu0__ = [];
		for (var py_name of tuple (['xxa', 'xxb', 'xxp', 'xxq', 'xxr', 'xxs'])) {
			__accu0__.append (__globals__ (__all__) [py_name]);
		}
		return __accu0__;
	}) ());
	autoTester.check ('Check main 3', sub.xxa, sub.xxb, sub.xxp, sub.xxq, sub.xxr, sub.xxs);
	autoTester.check ('Check main 4', ...sorted ((function () {
		var __accu0__ = [];
		for (var [key, value] of __globals__ (__all__).py_items ()) {
			if (key.startswith ('xx')) {
				__accu0__.append (value);
			}
		}
		return __accu0__;
	}) ()));
};