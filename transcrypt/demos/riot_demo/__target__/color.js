// Transcrypt'ed from Python, 2018-08-28 20:48:13
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = 'color';
export var msgs = list ([]);
export var styles = list ([]);
export var debug = 0;
export var _recurse = function (col, g) {
	var s = tuple ([].slice.apply (arguments).slice (2));
	var __left0__ = g;
	var msgs = __left0__ [0];
	var styles = __left0__ [1];
	var hsl = __left0__ [2];
	var lu = tuple ([tuple (['color', 0]), tuple (['background-color', 1])]);
	var hsl = hsl [col];
	var hsl = list ([hsl.__getslice__ (0, 3, 1), list ([hsl [0], hsl [1], hsl [3]])]);
	var css = ';'.join ((function () {
		var __accu0__ = [];
		for (var [i, j] of lu) {
			__accu0__.append (str (i) + ': hsl({}, {}%, {}%)'.format (...hsl [j]));
		}
		return __accu0__;
	}) ());
	for (var i of s) {
		if (debug) {
			styles.append (col);
		}
		else {
			styles.append (css);
		}
		msgs.append ('%c');
		try {
			i (g);
		}
		catch (__except0__) {
			msgs.py_pop ();
			msgs.append ('%c{}'.format (i));
		}
	}
};
export var hsl = dict ({'red': list ([0, 100, 90, 50]), 'orange': list ([39, 100, 85, 50]), 'yellow': list ([60, 100, 35, 50]), 'green': list ([120, 100, 60, 25]), 'blue': list ([240, 100, 90, 50]), 'purple': list ([300, 100, 85, 25]), 'black': list ([0, 0, 80, 0]), 'gray': list ([237, 8, 80, 50])});
export var _col = function (col) {
	return (function __lambda__ () {
		var parts = tuple ([].slice.apply (arguments).slice (0));
		return (function __lambda__ (g) {
			return _recurse (col, g, ...parts);
		});
	});
};
export var colors = dict ({});
for (var col of hsl.py_keys ()) {
	colors [col] = _col (col);
}
export var cprint = function () {
	var s = tuple ([].slice.apply (arguments).slice (0));
	var __left0__ = tuple ([list ([]), list ([])]);
	var msgs = __left0__ [0];
	var styles = __left0__ [1];
	for (var i of s) {
		i (tuple ([msgs, styles, hsl]));
	}
	if (debug) {
		for (var i = 0; i < len (msgs); i++) {
			print (msgs [i], '-> ', styles [i]);
		}
	}
	else {
		var msg = ''.join (msgs);
		var st = '", "'.join (styles);
		var st = ''.join (tuple (['console.log("', msg, ('", "' + st) + '")']));
		eval(st)
	}
};

//# sourceMappingURL=color.map