// Transcrypt'ed from Python, 2018-04-05 23:13:13
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, complex, __conj__, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
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

//# sourceMappingURL=callable_test.map