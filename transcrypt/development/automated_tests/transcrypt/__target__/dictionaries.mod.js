import {__envir__, __nest__, __init__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, complex, __conj__, __Terminal__, __terminal__, print} from './org.transcrypt.__runtime__.mod.js';
var __name__ = 'dictionaries';
export var run = function (autoTester) {
	var tel = dict ({'guido': 4127, 'jack': 4098});
	autoTester.check (len (tel));
	tel ['sape'] = 4139;
	autoTester.check (tel);
	autoTester.check (tel ['jack']);
	delete tel ['sape'];
	tel ['irv'] = 4127;
	autoTester.check (tel);
	autoTester.check (sorted (list (tel.py_keys ())), false);
	autoTester.check (sorted (tel.py_keys ()));
	autoTester.check (__in__ ('guido', tel));
	autoTester.check (!__in__ ('jack', tel));
	autoTester.check (dict (list ([tuple (['guido', 4127]), tuple (['jack', 4098]), tuple (['sape', 4139])])));
	autoTester.check (autoTester.expectException ((function __lambda__ () {
		return dict (1);
	})));
	autoTester.check (autoTester.expectException ((function __lambda__ () {
		return dict (134.34);
	})));
	autoTester.check (autoTester.expectException ((function __lambda__ () {
		return dict ('asdf');
	})));
	autoTester.check (autoTester.expectException ((function __lambda__ () {
		return dict (list (['1234', 1]));
	})));
	autoTester.check (dict (list ([])));
	autoTester.check (dict (dict ({})));
	autoTester.check (dict (dict ({'asdf': 1, 'qwer': 2})));
	var b = dict ({'a': 2.01, 'b': -(3.3)});
	var d = dict (b);
	autoTester.check (d);
	var b = dict ({'a': 2, 'b': list ([1, 2, 3])});
	var d = dict (b);
	autoTester.check (d);
	var b = dict ({'a': null, 'b': set (list ([1, 2, 3]))});
	var d = dict (b);
	autoTester.check (d);
	var b = dict ({'a': dict ({'c': 2}), 'b': tuple ([1, 2])});
	var d = dict (b);
	autoTester.check (d);
	autoTester.check (d ['a'] ['c']);
	autoTester.check (d.py_get ('a').py_get ('c'));
	autoTester.check (b.py_get ('a').py_get ('c'));
	d ['a'] ['c'] = 3;
	autoTester.check (d.py_get ('a').py_get ('c'));
	autoTester.check (b.py_get ('a').py_get ('c'));
	var knights = dict ({'robin': 'the brave', 'gallahad': 'the pure'});
	for (var [k, v] of __i__ (sorted (knights.py_items ()))) {
		autoTester.check (k, v);
	}
	if (__in__ ('gallahad', knights)) {
		autoTester.check ('gallahad is a knight');
	}
	for (var k of __i__ (sorted (knights))) {
		autoTester.check (k);
	}
	var knight = dict ({'rudolph': 'the righteous'});
	for (var k of __i__ (knight)) {
		autoTester.check (k);
	}
	var tel = dict ({'guido': 123});
	tel.py_update (dict ({'edsger': 42}));
	autoTester.check (tel.py_setdefault ('linus', 456));
	autoTester.check (tel ['linus']);
	autoTester.check (tel.py_setdefault ('guido', 789));
	autoTester.check (tel.py_pop ('guido', 1));
	autoTester.check (tel.py_pop ('guido', 1));
	autoTester.check (tel.py_pop ('edsger', 2));
	autoTester.check (tel.py_pop ('foo', 'bar'));
	autoTester.check (tel.py_pop ('foo', null));
	var d = dict ({});
	d ['a'] = 3777;
	d.__setitem__ ([1, 2], 4777);
	autoTester.check (d ['a'], d.__getitem__ ([1, 2]));
	var d = dict ({});
	__setitem__ (d, 'a', 3777);
	d.__setitem__ ([1, 2], 4777);
	__call__ (autoTester.check, autoTester, __getitem__ (d, 'a'), d.__getitem__ ([1, 2]));
	var knights = dict ({'robin': 'the brave', 'gallahad': 'the pure'});
	autoTester.check (autoTester.expectException ((function __lambda__ () {
		return knights.py_pop ('batman');
	})));
	autoTester.check (autoTester.expectException ((function __lambda__ () {
		return knights.py_pop ('batman', null);
	})));
	autoTester.check (autoTester.expectException ((function __lambda__ () {
		return knights.py_pop ('batman', 'the gullible');
	})));
};