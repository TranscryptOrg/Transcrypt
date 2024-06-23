// Transcrypt'ed from Python, 2021-05-14 15:00:24
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {pow} from './math.js';
import {accumulate, chain, combinations, combinations_with_replacement, compress, count, cycle, dropwhile, filterfalse, groupby, islice, permutations, product, repeat, starmap, takewhile, tee} from './itertools.js';
export {combinations, islice, tee, product, repeat, compress, accumulate, count, cycle, chain, dropwhile, takewhile, starmap, filterfalse, groupby, combinations_with_replacement, permutations, pow};
var __all__ = dict ({get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get chars () {return chars;}, set chars (value) {chars = value;}, get fibonacci () {return fibonacci;}, set fibonacci (value) {fibonacci = value;}, get run () {return run;}, set run (value) {run = value;}, get squares () {return squares;}, set squares (value) {squares = value;}});
var __name__ = 'module_itertools';
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
	autoTester.check ('accumulate', list (accumulate (['alamak', 'mirach', 'sirrah'], add)));
	autoTester.check ('chain', list (chain (fibonacci (), squares, chars)));
	autoTester.check ('chain.from_iterable', list (chain.from_iterable (['ape', 'node', 'mice', 'vim', 'sus', 'jet'])));
	var selectors = [true, true, false, true, false, false, true, true, false, true];
	autoTester.check ('compress', list (compress ((function () {
		var __accu0__ = [];
		for (var [index, py_selector] of enumerate (selectors)) {
			__accu0__.append ('{}{}'.format ((py_selector ? 'take' : 'leave'), index));
		}
		return __accu0__;
	}) (), selectors)));
	autoTester.check ('dropwhile', list (dropwhile ((function __lambda__ (x) {
		return x < 5;
	}), [1, 4, 6, 4, 1])));
	autoTester.check ('filterfalse', list (filterfalse ((function __lambda__ (x) {
		return __mod__ (x, 2);
	}), range (10))));
	var things = [tuple (['animal', 'bear']), tuple (['animal', 'duck']), tuple (['plant', 'cactus']), tuple (['vehicle', 'speed boat']), tuple (['vehicle', 'school bus'])];
	for (var [key, group] of groupby (things, (function __lambda__ (x) {
		return x [0];
	}))) {
		for (var thing of group) {
			autoTester.check ('A {} is a {}.'.format (thing [1], key));
		}
		autoTester.check (' ');
	}
	autoTester.check ('islice', list (islice ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2, 9, 2)));
	autoTester.check ('starmap', (function () {
		var __accu0__ = [];
		for (var x of starmap (pow, [tuple ([2, 5]), tuple ([3, 2]), tuple ([10, 3])])) {
			__accu0__.append (int (x));
		}
		return __accu0__;
	}) ());
	autoTester.check ('takewhile', list (takewhile ((function __lambda__ (x) {
		return x < 5;
	}), [1, 4, 6, 4, 1])));
	var __left0__ = tee (islice (count (), 5));
	var i1 = __left0__ [0];
	var i2 = __left0__ [1];
	autoTester.check ('tee', list (i1), list (i1), list (i2));
	autoTester.check ('product', list (product ('ABCD', 'xy')), list (product (range (2), __kwargtrans__ ({repeat: 3}))));
	autoTester.check ('permutations', list (permutations ('ABCD')), list (permutations ('ABCD', 2)));
	autoTester.check ('combinations', list (combinations ('ABCD', 2)), list (combinations ([1, 2, 3, 4, 5], 3)), list (combinations (islice (count (), 6), 4)));
	autoTester.check ('combinations_with_replacement', list (combinations_with_replacement ('ABCD', 2)), list (combinations_with_replacement ([1, 2, 3, 4, 5], 3)), list (combinations_with_replacement (islice (count (), 6), 4)));
};

//# sourceMappingURL=module_itertools.map