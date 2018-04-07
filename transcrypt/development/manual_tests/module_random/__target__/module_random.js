// Transcrypt'ed from Python, 2018-04-07 16:09:48
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
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