// Transcrypt'ed from Python, 2021-05-14 15:01:25
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get A () {return A;}, set A (value) {A = value;}, get B () {return B;}, set B (value) {B = value;}, get C () {return C;}, set C (value) {C = value;}, get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get run () {return run;}, set run (value) {run = value;}});
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
	var strings = ['hello', ',', 'world', '!'];
	var instances = [C ()];
	var collections = [[], [1], [1, 2], tuple (), tuple ([1]), tuple ([1, 2]), dict ({}), dict ({1: 1}), dict ({1: 1, 2: 2})];
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
	var a = [1, 5, 3, 2, -(1)];
	var b = ['sun', 'earth', 'moon'];
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
	var list1 = ['ape', 'node', 'mice'];
	var list2 = ['vim', '', 'jet'];
	var list3 = ['', '', ''];
	var list4 = [[1, 2], [1], []];
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

//# sourceMappingURL=general_functions.map