// Transcrypt'ed from Python, 2021-05-14 15:00:25
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get Test () {return Test;}, set Test (value) {Test = value;}, get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get indices () {return indices;}, set indices (value) {indices = value;}, get run () {return run;}, set run (value) {run = value;}});
var __name__ = 'extended_slices';
export var indices = function (key) {
	if (__envir__.executor_name == __envir__.transpiler_name) {
		return (py_typeof (key) == list ? tuple (key) : key);
	}
	else {
		try {
			return key.indices (1000000000);
		}
		catch (__except0__) {
			try {
				return tuple ((function () {
					var __accu0__ = [];
					for (var subkey of key) {
						__accu0__.append (indices (subkey));
					}
					return __accu0__;
				}) ());
			}
			catch (__except1__) {
				return key;
			}
		}
	}
};
export var Test =  __class__ ('Test', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, autoTester) {
		self.autoTester = autoTester;
	});},
	get __getitem__ () {return __get__ (this, function (self, key) {
		self.autoTester.check ('getitem (', indices (key), ')');
		return 1234567;
	});},
	get __setitem__ () {return __get__ (this, function (self, key, value) {
		self.autoTester.check ('setitem (', indices (key), ')', value);
	});}
});
export var run = function (autoTester) {
	var __left0__ = Test (autoTester);
	var a = __left0__;
	var b = __left0__;
	var c = __left0__;
	var d = __left0__;
	var e = __left0__;
	var f = __left0__;
	var g = __left0__;
	var h = __left0__;
	var i = __left0__;
	var j = __left0__;
	var k = __left0__;
	var l = __left0__;
	a.__setitem__ ([tuple ([1, 2, 3]), tuple ([4, 5, 6])], __getslice__ (b, 7, 8, 9));
	__setslice__ (c, 1, 2, 3, d.__getitem__ ([tuple ([4, 5, 6]), tuple ([7, 8, 9])]));
	e.__setitem__ ([1, tuple ([1, 2, 3]), 3], f.__getitem__ ([4, tuple ([4, 5, 6]), 6]));
	g.__setitem__ ([1, 2, 3], h.__getitem__ ([1, 2, 3]));
	__setitem__ (i, 1, __getitem__ (j, 1));
	__setslice__ (k, 1, 2, 3, __getslice__ (l, 1, 2, 3));
};

//# sourceMappingURL=extended_slices.map