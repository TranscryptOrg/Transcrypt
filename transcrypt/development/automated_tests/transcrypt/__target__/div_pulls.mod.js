"use strict";
import {__nest__, __init__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __Envir__, __envir__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, complex, __conj__, __Terminal__, __terminal__, print} from './org.transcrypt.__runtime__.mod.js';
var __name__ = 'div_pulls';
export var A =  __class__ ('A', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, x) {
		self.x = x;
	});}
});
export var a = A (5.5);
export var run = function (autoTester) {
	autoTester.check ('Pull 56');
	var s = 'abcdefghij';
	autoTester.check (s.__getslice__ (2, 3, 1));
	autoTester.check (s.__getslice__ (0, 3, 1));
	autoTester.check (s.__getslice__ (2, null, 1));
	autoTester.check (s.__getslice__ (0, null, 2));
	autoTester.check ('Pull 59');
	autoTester.check (list (filter ((function __lambda__ (x) {
		return __mod__ (x, 2) == 0;
	}), range (10))));
	autoTester.check (list (map ((function __lambda__ (x) {
		return x * x;
	}), range (0, 31, 3))));
};