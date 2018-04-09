// Transcrypt'ed from Python, 2018-04-09 10:23:46
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __globals__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __merge__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setProperty__, __setitem__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
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
export {};

//# sourceMappingURL=dictionaries.map