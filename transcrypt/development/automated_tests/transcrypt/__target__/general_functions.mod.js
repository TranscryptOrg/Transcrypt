import {__envir__, __nest__, __init__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, complex, __conj__, __Terminal__, __terminal__, print} from './org.transcrypt.__runtime__.mod.js';
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
};