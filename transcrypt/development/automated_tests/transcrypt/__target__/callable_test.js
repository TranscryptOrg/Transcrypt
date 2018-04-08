// Transcrypt'ed from Python, 2018-04-08 11:00:05
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __globals__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __merge__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setProperty__, __setitem__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = 'callable_test';
export var run = function (test) {
	var func = function (a, b) {
		return a * b;
	};
	test.check (func (3, 4));
	test.check (callable (func));
	for (var a of tuple ([true, false])) {
		test.check (callable (a));
	}
	var a = 1;
	test.check (callable (a));
	var a = 2.3;
	test.check (callable (a));
	var a = 'asdf';
	test.check (callable (a));
	var a = list ([]);
	test.check (callable (a));
	var a = list ([1, 2, 3, 3]);
	test.check (callable (a));
	var a = list (['asdf', 'qwer', 'zxcv']);
	test.check (callable (a));
	var a = dict ({'asdf': 1, 'qwer': 2});
	test.check (callable (a));
	var a = set (list ([1, 2]));
	test.check (callable (a));
	var CallObj = __class__ ('CallObj', [object], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self, r) {
			self._r = r;
		});},
		get __call__ () {return __get__ (this, function (self) {
			return self._r;
		});}
	});
	__call__ (test.check, test, __call__ (callable, null, CallObj));
	var obj = __call__ (CallObj, null, 2);
	__call__ (test.check, test, __call__ (obj, null));
	__call__ (test.check, test, __call__ (callable, null, obj));
	__call__ (test.check, test, __call__ (callable, null, obj._r));
	var NonCallObj = __class__ ('NonCallObj', [object], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self, b) {
			self._b = b;
		});},
		get func () {return __get__ (this, function (self) {
			return self._b;
		});}
	});
	__call__ (test.check, test, __call__ (callable, null, NonCallObj));
	var obj2 = __call__ (NonCallObj, null, 2);
	__call__ (test.check, test, __call__ (callable, null, obj2));
	__call__ (test.check, test, __call__ (callable, null, obj2._b));
	__call__ (test.check, test, __call__ (callable, null, obj2.func));
	var NonOpovNonCallObj = __class__ ('NonOpovNonCallObj', [object], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self, c) {
			self._c = c;
		});},
		get other () {return __get__ (this, function (self, b) {
			return self._c * b;
		});},
		get _getC () {return __get__ (this, function (self) {
			return self._c;
		});},
		get _setC () {return __get__ (this, function (self, val) {
			self._c = val;
		});}
	});
	Object.defineProperty (NonOpovNonCallObj, 'C', property.call (NonOpovNonCallObj, NonOpovNonCallObj._getC, NonOpovNonCallObj._setC));;
	var obj = NonOpovNonCallObj (4);
	test.check (callable (obj));
	test.check (callable (obj.other));
	test.check (callable (obj._c));
	test.check (callable (obj.C));
	var exc = Exception ('asdf');
	test.check (callable (exc));
};
export {};

//# sourceMappingURL=callable_test.map