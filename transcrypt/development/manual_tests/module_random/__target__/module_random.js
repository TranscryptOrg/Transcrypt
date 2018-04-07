// Transcrypt'ed from Python, 2018-04-07 19:09:16
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __globals__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __merge__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setProperty__, __setitem__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {_array, _index, _bitmask1, _bitmask2, _bitmask3, _fill_array, _random_integer, seed, randint, choice, random, shuffle} from './random.js';
var __name__ = '__main__';
export var result = '';
export var output = function (any) {
	result += any + '<br>\n';
};
for (var fixedSeed of tuple ([false, true])) {
	if (fixedSeed) {
		seed (3);
	}
	else {
		seed ();
	}
	output ('------ {} ------'.format ((fixedSeed ? 'fixed seed' : 'auto seed')));
	output ('--- randint ---');
	for (var i = 0; i < 20; i++) {
		output (randint (10, 20));
	}
	output ('<br>\n--- choice ---');
	for (var i = 0; i < 20; i++) {
		output (choice (list ([1, 2, 3, 4, 5])));
	}
	output ('<br>\n--- random ---');
	for (var i = 0; i < 20; i++) {
		output (random ());
	}
	output ('<br>\n--- shuffle ---');
	var aList = list ([0, 1, 2, 3, 4, 5, 6]);
	output (aList);
	for (var i = 0; i < 7; i++) {
		shuffle (aList);
		output (aList);
	}
	output ('<br>\n');
}
document.getElementById ('output').innerHTML = result;

//# sourceMappingURL=module_random.map