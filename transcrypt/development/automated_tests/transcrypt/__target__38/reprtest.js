// Transcrypt'ed from Python, 2021-05-14 15:00:23
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get run () {return run;}, set run (value) {run = value;}});
var __name__ = 'reprtest';
export var run = function (test) {
	var v = 1;
	test.check (repr (v));
	test.check (str (v));
	var v = 'asdf';
	test.check (repr (v));
	test.check (str (v));
	var v = true;
	test.check (repr (v));
	test.check (str (v));
	var v = false;
	test.check (repr (v));
	test.check (str (v));
	var v = 1.2;
	test.check (repr (v));
	test.check (str (v));
	var v = -(31.2);
	test.check (repr (v));
	test.check (str (v));
	var v = 6.3e-11;
	test.check (repr (v));
	test.check (str (v));
	var v = 2.4e+38;
	test.check (repr (v));
	test.check (str (v));
	var v = -(3.4e-22);
	test.check (repr (v));
	test.check (str (v));
	var v = -(8.9e+33);
	test.check (repr (v));
	test.check (str (v));
	var v = null;
	test.check (repr (v));
	test.check (str (v));
	var v = [null];
	test.check (repr (v));
	test.check (str (v));
	var v = [null, null];
	test.check (repr (v));
	test.check (str (v));
	var v = [null, 1.02];
	test.check (repr (v));
	test.check (str (v));
	var v = [1, 3.000234];
	test.check (repr (v));
	test.check (str (v));
	var v = [1, 2, 3];
	test.check (repr (v));
	test.check (str (v));
	var v = [1.04, 2.03, 3.005];
	test.check (repr (v));
	test.check (str (v));
	var v = ['asdf', 2.00009, '1234'];
	test.check (repr (v));
	test.check (str (v));
	var v = set ([1, 2, 3]);
	test.check (repr (v));
	test.check (str (v));
	var v = set ([]);
	test.check (repr (v));
	test.check (str (v));
	var v = tuple ([1, 2]);
	test.check (repr (v));
	test.check (str (v));
	var v = tuple ([3.4, 4.4]);
	test.check (repr (v));
	test.check (str (v));
	var v = tuple ([null, 5.32]);
	test.check (repr (v));
	test.check (str (v));
	var v = dict ({});
	test.check (repr (v));
	test.check (str (v));
	var v = dict ({'a': 1});
	test.check (repr (v));
	test.check (str (v));
	var d = dict ({'asdf': 3.4});
	test.check (repr (d));
	test.check (str (d));
	var d = dict ({'qwer': 'qwerqwer qwerqwer'});
	test.check (repr (d));
	test.check (str (d));
	var d = dict ({'a9342': null});
	test.check (repr (d));
	test.check (str (d));
	var d = dict ({'nfdns': true});
	test.check (repr (d));
	test.check (str (d));
	var d = dict ({'alel;e;': false});
	test.check (repr (d));
	test.check (str (d));
	var d = dict ({'didi': [true, false, true]});
	test.check (repr (d));
	test.check (str (d));
	var d = dict ({'bibi': [1, 2, 3]});
	test.check (repr (d));
	test.check (str (d));
	var d = dict ({'gigi': ['Asdf', 'qwer', 'rewer']});
	test.check (repr (d));
	test.check (str (d));
	var d = dict ({'hihi': tuple (['esdf', 'qwer', 'rewer'])});
	test.check (repr (d));
	test.check (str (d));
	var d = dict ({'jiji': [null, null, null]});
	test.check (repr (d));
	test.check (str (d));
	var d = dict ({'jiji': tuple ([1.3, 3.4])});
	test.check (repr (d));
	test.check (str (d));
	var d = dict ({'jiji': dict ({'c': 4})});
	test.check (repr (d));
	test.check (str (d));
	var Test1 = __class__ ('Test1', [object], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self, val) {
			self._val = val;
		});},
		get __str__ () {return __get__ (this, function (self) {
			return '[Test1 {}]'.format (self._val);
		});},
		get __repr__ () {return __get__ (this, function (self) {
			return str (self);
		});}
	});
	var Test2 = __class__ ('Test2', [object], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self, val) {
			self._val = val;
		});},
		get __repr__ () {return __get__ (this, function (self) {
			return '[Test2 {},{}]'.format (self._val, self._val * 2);
		});},
		get __str__ () {return __get__ (this, function (self) {
			return repr (self);
		});}
	});
	var Test3 = __class__ ('Test3', [Test2], {
		__module__: __name__,
		get __str__ () {return __get__ (this, function (self) {
			return '[Test3 {}]'.format (self._val);
		});}
	});
	var Test4 = __class__ ('Test4', [object], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self, val) {
			self._val = val;
		});},
		get __repr__ () {return __get__ (this, function (self) {
			return '[Test4 {}]'.format (self._val);
		});}
	});
	var t1 = Test1 (2);
	test.check (repr (t1));
	test.check (str (t1));
	var t1 = Test1 (4.5);
	test.check (repr (t1));
	test.check (str (t1));
	var t1 = Test1 ('blarg');
	test.check (repr (t1));
	test.check (str (t1));
	var t1 = Test1 ([1, 2, 3]);
	test.check (repr (t1));
	test.check (str (t1));
	var t2 = Test2 (3);
	test.check (repr (t2));
	test.check (str (t2));
	var t2 = Test2 (7.6);
	test.check (repr (t2));
	test.check (str (t2));
	var t2 = Test2 (-(8.9));
	test.check (repr (t2));
	test.check (str (t2));
	var t3 = Test3 (8);
	test.check (repr (t3));
	test.check (str (t3));
	var t3 = Test3 (3.4);
	test.check (repr (t3));
	test.check (str (t3));
	test.check (repr ([t1, t2, 3]));
	var d = dict ({'irew': t1});
	test.check (repr (d));
	test.check (str (d));
	var d = dict ({'irew': [t1, t2, t3]});
	test.check (repr (d));
	test.check (str (d));
	var t4 = Test4 ('qwer');
	test.check (repr (t4));
	test.check (str (t4));
};

//# sourceMappingURL=reprtest.map