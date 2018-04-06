// Transcrypt'ed from Python, 2018-04-05 23:19:51
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, complex, __conj__, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var __name__ = 'module_itertools';
import {count, cycle, repeat, accumulate, chain, compress, dropwhile, filterfalse, groupby, islice, starmap, takewhile, tee, product, permutations, combinations, combinations_with_replacement} from './itertools.js';
export {count, cycle, repeat, accumulate, chain, compress, dropwhile, filterfalse, groupby, islice, starmap, takewhile, tee, product, permutations, combinations, combinations_with_replacement};
import {pow} from './math.js';
export {pow};
export var fibonacci = function* () {
	var __left0__ = tuple ([0, 1]);
	var a = __left0__ [0];
	var b = __left0__ [1];
	for (var i = 0; i < 10; i++) {
		yield a;
		var __left0__ = tuple ([b, a + b]);
		var a = __left0__ [0];
		var b = __left0__ [1];
	}
};
export var squares = (function () {
	var __accu0__ = [];
	for (var i = 0; i < 10; i++) {
		__accu0__.append (i * i);
	}
	return __accu0__;
}) ();
export var chars = 'thequickbrownfoxjumpsoverthelazydog';
export var run = function (autoTester) {
	autoTester.check ('islice count', list (islice (count (10, 2), 4, 40, 3)));
	autoTester.check ('islice cycle', list (islice (cycle (fibonacci ()), 15)));
	autoTester.check ('repeat', list (repeat (3.14, 15)));
	autoTester.check ('islice repeat', list (islice (repeat (2.74), 15)));
	autoTester.check ('accumulate', list (accumulate (range (5))));
	var add = function (total, element) {
		return total + element;
	};
	autoTester.check ('accumulate', list (accumulate (list (['alamak', 'mirach', 'sirrah']), add)));
	autoTester.check ('chain', list (chain (fibonacci (), squares, chars)));
	autoTester.check ('chain.from_iterable', list (chain.from_iterable (list (['ape', 'node', 'mice', 'vim', 'sus', 'jet']))));
	var selectors = list ([true, true, false, true, false, false, true, true, false, true]);
	autoTester.check ('compress', list (compress ((function () {
		var __accu0__ = [];
		for (var [index, py_selector] of enumerate (selectors)) {
			__accu0__.append ('{}{}'.format ((py_selector ? 'take' : 'leave'), index));
		}
		return __accu0__;
	}) (), selectors)));
	autoTester.check ('dropwhile', list (dropwhile ((function __lambda__ (x) {
		return x < 5;
	}), list ([1, 4, 6, 4, 1]))));
	autoTester.check ('filterfalse', list (filterfalse ((function __lambda__ (x) {
		return __mod__ (x, 2);
	}), range (10))));
	var things = list ([tuple (['animal', 'bear']), tuple (['animal', 'duck']), tuple (['plant', 'cactus']), tuple (['vehicle', 'speed boat']), tuple (['vehicle', 'school bus'])]);
	for (var [key, group] of groupby (things, (function __lambda__ (x) {
		return x [0];
	}))) {
		for (var thing of group) {
			autoTester.check ('A {} is a {}.'.format (thing [1], key));
		}
		autoTester.check (' ');
	}
	autoTester.check ('islice', list (islice (list ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 2, 9, 2)));
	autoTester.check ('starmap', (function () {
		var __accu0__ = [];
		for (var x of starmap (pow, list ([tuple ([2, 5]), tuple ([3, 2]), tuple ([10, 3])]))) {
			__accu0__.append (int (x));
		}
		return __accu0__;
	}) ());
	autoTester.check ('takewhile', list (takewhile ((function __lambda__ (x) {
		return x < 5;
	}), list ([1, 4, 6, 4, 1]))));
	var __left0__ = tee (islice (count (), 5));
	var i1 = __left0__ [0];
	var i2 = __left0__ [1];
	autoTester.check ('tee', list (i1), list (i1), list (i2));
	autoTester.check ('product', list (product ('ABCD', 'xy')), list (product (range (2), __kwargtrans__ ({repeat: 3}))));
	autoTester.check ('permutations', list (permutations ('ABCD')), list (permutations ('ABCD', 2)));
	autoTester.check ('combinations', list (combinations ('ABCD', 2)), list (combinations (list ([1, 2, 3, 4, 5]), 3)), list (combinations (islice (count (), 6), 4)));
	autoTester.check ('combinations_with_replacement', list (combinations_with_replacement ('ABCD', 2)), list (combinations_with_replacement (list ([1, 2, 3, 4, 5]), 3)), list (combinations_with_replacement (islice (count (), 6), 4)));
};

//# sourceMappingURL=module_itertools.map