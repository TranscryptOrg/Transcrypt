"use strict";
import {__nest__, __init__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __Envir__, __envir__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, complex, __conj__, __Terminal__, __terminal__, print} from './org.transcrypt.__runtime__.mod.js';
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
	var v = list ([null]);
	test.check (repr (v));
	test.check (str (v));
	var v = list ([null, null]);
	test.check (repr (v));
	test.check (str (v));
	var v = list ([null, 1.02]);
	test.check (repr (v));
	test.check (str (v));
	var v = list ([1, 3.000234]);
	test.check (repr (v));
	test.check (str (v));
	var v = list ([1, 2, 3]);
	test.check (repr (v));
	test.check (str (v));
	var v = list ([1.04, 2.03, 3.005]);
	test.check (repr (v));
	test.check (str (v));
	var v = list (['asdf', 2.00009, '1234']);
	test.check (repr (v));
	test.check (str (v));
	var v = set (list ([1, 2, 3]));
	test.check (repr (v));
	test.check (str (v));
	var v = set (list ([]));
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
	var d = dict ({'didi': list ([true, false, true])});
	test.check (repr (d));
	test.check (str (d));
	var d = dict ({'bibi': list ([1, 2, 3])});
	test.check (repr (d));
	test.check (str (d));
	var d = dict ({'gigi': list (['Asdf', 'qwer', 'rewer'])});
	test.check (repr (d));
	test.check (str (d));
	var d = dict ({'hihi': tuple (['esdf', 'qwer', 'rewer'])});
	test.check (repr (d));
	test.check (str (d));
	var d = dict ({'jiji': list ([null, null, null])});
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
	var t1 = Test1 (list ([1, 2, 3]));
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
	test.check (repr (list ([t1, t2, 3])));
	var d = dict ({'irew': t1});
	test.check (repr (d));
	test.check (str (d));
	var d = dict ({'irew': list ([t1, t2, t3])});
	test.check (repr (d));
	test.check (str (d));
	var t4 = Test4 ('qwer');
	test.check (repr (t4));
	test.check (str (t4));
};