// Transcrypt'ed from Python, 2021-05-14 15:01:26
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get run () {return run;}, set run (value) {run = value;}});
var __name__ = 'dictionaries';
export var run = function (autoTester) {
	var tel = dict ({'guido': 4127, 'jack': 4098});
	autoTester.check (len (tel));
	autoTester.check (tel);
	autoTester.check ();
	delete ;
	autoTester.check (tel);
	autoTester.check (sorted (list (tel.py_keys ())), false);
	autoTester.check (sorted (tel.py_keys ()));
	autoTester.check (__in__ ('guido', tel));
	autoTester.check (!__in__ ('jack', tel));
	autoTester.check (dict ([tuple (['guido', 4127]), tuple (['jack', 4098]), tuple (['sape', 4139])]));
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
		return dict (['1234', 1]);
	})));
	autoTester.check (dict ([]));
	autoTester.check (dict (dict ({})));
	autoTester.check (dict (dict ({'asdf': 1, 'qwer': 2})));
	var b = dict ({'a': 2.01, 'b': -(3.3)});
	var d = dict (b);
	autoTester.check (d);
	var b = dict ({'a': 2, 'b': [1, 2, 3]});
	var d = dict (b);
	autoTester.check (d);
	var b = dict ({'a': null, 'b': set ([1, 2, 3])});
	var d = dict (b);
	autoTester.check (d);
	var b = dict ({'a': dict ({'c': 2}), 'b': tuple ([1, 2])});
	var d = dict (b);
	autoTester.check (d);
	autoTester.check ();
	autoTester.check (d.py_get ('a').py_get ('c'));
	autoTester.check (b.py_get ('a').py_get ('c'));
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
	autoTester.check ();
	autoTester.check (tel.py_setdefault ('guido', 789));
	autoTester.check (tel.py_pop ('guido', 1));
	autoTester.check (tel.py_pop ('guido', 1));
	autoTester.check (tel.py_pop ('edsger', 2));
	autoTester.check (tel.py_pop ('foo', 'bar'));
	autoTester.check (tel.py_pop ('foo', null));
	var d = dict ({});
	autoTester.check (, );
	var d = dict ({});
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, , );
	}) ();
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

//# sourceMappingURL=dictionaries.map