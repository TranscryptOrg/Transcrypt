// Transcrypt'ed from Python, 2018-04-05 23:20:30
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
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