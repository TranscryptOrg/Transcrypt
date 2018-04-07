// Transcrypt'ed from Python, 2018-04-07 19:08:58
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __globals__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __merge__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setProperty__, __setitem__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = 'general_functions';

export var A =  __class__ ('A', [object], {
	__module__: __name__,
	foo: 'bar',
	get __init__ () {return __get__ (this, function (self) {
		self.foo2 = 'bar2';
	});}
});

export var B =  __class__ ('B', [A], {
	__module__: __name__,
	foo3: 'bar3',
	get __init__ () {return __get__ (this, function (self) {
		self.foo4 = 'bar4';
	});}
});

export var C =  __class__ ('C', [object], {
	__module__: __name__,
	get __len__ () {return __get__ (this, function (self) {
		return 42;
	});}
});
export var run = function (autoTester) {
	autoTester.check ('len');
	var strings = list (['hello', ',', 'world', '!']);
	var instances = list ([C ()]);
	var collections = list ([list ([]), list ([1]), list ([1, 2]), tuple (), tuple ([1]), tuple ([1, 2]), dict ({}), dict ({1: 1}), dict ({1: 1, 2: 2})]);
	for (var string of strings) {
		autoTester.check (len (string));
	}
	for (var instance of instances) {
		autoTester.check (len (instance));
	}
	for (var collection of collections) {
		autoTester.check (len (collection));
	}
	autoTester.check ('sort and sorted<br>');
	var a = list ([1, 5, 3, 2, -(1)]);
	var b = list (['sun', 'earth', 'moon']);
	autoTester.check (sorted (a));
	autoTester.check (sorted (b));
	a.py_sort ();
	autoTester.check (a);
	b.py_sort ();
	autoTester.check (b);
	autoTester.check (sorted (a, __kwargtrans__ ({reverse: true})));
	autoTester.check (sorted (b, __kwargtrans__ ({reverse: true})));
	a.py_sort (__kwargtrans__ ({reverse: true}));
	autoTester.check (a);
	b.py_sort (__kwargtrans__ ({reverse: true}));
	autoTester.check (b);
	b.py_sort (__kwargtrans__ ({key: (function __lambda__ (x) {
		return len (x);
	})}));
	autoTester.check (b);
	b.py_sort (__kwargtrans__ ({key: (function __lambda__ (x) {
		return len (x);
	}), reverse: true}));
	autoTester.check (b);
	autoTester.check ('<br><br>dir<br>');
	autoTester.check ((function () {
		var __accu0__ = [];
		for (var entry of dir (A)) {
			if (!(entry.startswith ('__'))) {
				__accu0__.append (entry);
			}
		}
		return __accu0__;
	}) ());
	autoTester.check ((function () {
		var __accu0__ = [];
		for (var entry of dir (A ())) {
			if (!(entry.startswith ('__'))) {
				__accu0__.append (entry);
			}
		}
		return __accu0__;
	}) ());
	autoTester.check ((function () {
		var __accu0__ = [];
		for (var entry of dir (B)) {
			if (!(entry.startswith ('__'))) {
				__accu0__.append (entry);
			}
		}
		return __accu0__;
	}) ());
	autoTester.check ((function () {
		var __accu0__ = [];
		for (var entry of dir (B ())) {
			if (!(entry.startswith ('__'))) {
				__accu0__.append (entry);
			}
		}
		return __accu0__;
	}) ());
	autoTester.check ('<br><br>any, all, sum<br>');
	var list1 = list (['ape', 'node', 'mice']);
	var list2 = list (['vim', '', 'jet']);
	var list3 = list (['', '', '']);
	var list4 = list ([list ([1, 2]), list ([1]), list ([])]);
	autoTester.check (list1, any (list1), all (list1));
	autoTester.check (list2, any (list2), all (list2));
	autoTester.check (list3, any (list3), all (list3));
	autoTester.check (list4, any (list4), all (list4));
	autoTester.check (sum (range (5)));
	var generator1 = function* () {
		for (var i = 0; i < 5; i++) {
			yield i;
		}
		};
	var generator2 = function* () {
		for (var i = 0; i < 5; i++) {
			if (__mod__ (i, 2)) {
				yield 0;
			}
			else {
				yield i;
			}
		}
		};
	var generator3 = function* () {
		for (var i = 0; i < 5; i++) {
			yield 0;
		}
		autoTester.check (generator1 (), any (generator1 ()), all (generator1 ()));
		autoTester.check (generator2 (), any (generator2 ()), all (generator2 ()));
		autoTester.check (generator3 (), any (generator3 ()), all (generator3 ()));
		autoTester.check (sum (generator1 ()))};
};
export {};

//# sourceMappingURL=general_functions.map