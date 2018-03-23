import {__envir__, __nest__, __init__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, complex, __conj__, __Terminal__, __terminal__, print} from './org.transcrypt.__runtime__.mod.js';
var __name__ = 'module_builtin';
export var canonizeString = function (aString) {
	if (__envir__.executor_name == 'transcrypt') {
		return aString.py_replace ('\t', '\\t').py_replace ('\n', '\\n');
	}
	else {
		return aString;
	}
};
export var canonizeStringList = function (stringList) {
	return (function () {
		var __accu0__ = [];
		for (var aString of stringList) {
			__accu0__.append (canonizeString (aString));
		}
		return __accu0__;
	}) ();
};
export var run = function (autoTester) {
	autoTester.check ('min', min (-(1.1), -(1), -(3)));
	autoTester.check ('max', max (-(1.1), -(1), -(3)));
	autoTester.check ('abs', abs (-(1)), abs (1), abs (0), abs (-(0.1)), abs (0.1));
	autoTester.check ('ord', ord ('a'), ord ('e´' [0]));
	autoTester.check ('round', round (4.006), round (4.006, 2), round (4060, -(2)), round (-(4.006)), round (-(4.006), 2), round (-(4060), -(2)), round (1 / 2.0), round (1 / 2.0, 1), round (1 / 2, 1), round (1 / 3.0, 2), round (-(1) / 2.0), round (-(1) / 2.0, 1), round (-(1) / 2, 1), round (-(1) / 3.0, 2), round (0.5), round (0.51), round (1.5), round (1.51), round (1.51), round (2.5), round (2.59), round (3.5), round (3.59), round (-(0.5)), round (-(0.51)), round (-(1.5)), round (-(1.51)), round (-(1.51)), round (-(2.5)), round (-(2.59)), round (-(3.5)), round (-(3.59)));
	var strings = list (['der des dem den die der den die das des dem das', 'an auf hinter ueber    neben vor   zwischen', '\n            durch\n            fuer\n            ohne\n            um\n            bis\n            gegen\n            entlang\n        ', 'eins,zwei,drie,vier,fuenf,sechs,sieben']);
	autoTester.check ('<br><br>split');
	for (var aString of strings) {
		autoTester.check (canonizeString (aString), canonizeStringList (aString.py_split ()), canonizeStringList (aString.py_split (' ')), canonizeStringList (aString.py_split (' ', 4)), canonizeStringList (aString.py_split ('\t')), canonizeStringList (aString.py_split ('\t', 4)), canonizeStringList (aString.py_split ('\n')), canonizeStringList (aString.py_split ('\n', 4)), canonizeStringList (aString.py_split (',')), canonizeStringList (aString.py_split (',', 4)), '<br>');
	}
	autoTester.check ('<br>rsplit');
	for (var aString of strings) {
		autoTester.check (canonizeString (aString), canonizeStringList (aString.rsplit ()), canonizeStringList (aString.rsplit (' ')), canonizeStringList (aString.rsplit (' ', 4)), canonizeStringList (aString.rsplit ('\t')), canonizeStringList (aString.rsplit ('\t', 4)), canonizeStringList (aString.rsplit ('\n')), canonizeStringList (aString.rsplit ('\n', 4)), canonizeStringList (aString.rsplit (',')), canonizeStringList (aString.rsplit (',', 4)), '<br>');
	}
	autoTester.check (''.isalpha ());
	autoTester.check ('123'.isalpha ());
	autoTester.check ('abc'.isalpha ());
	autoTester.check ('abc123'.isalpha ());
};