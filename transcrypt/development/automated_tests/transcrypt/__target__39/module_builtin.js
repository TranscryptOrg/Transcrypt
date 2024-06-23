// Transcrypt'ed from Python, 2021-05-14 15:01:25
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get canonizeString () {return canonizeString;}, set canonizeString (value) {canonizeString = value;}, get canonizeStringList () {return canonizeStringList;}, set canonizeStringList (value) {canonizeStringList = value;}, get run () {return run;}, set run (value) {run = value;}});
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
	autoTester.check ('ord', ord ('a'), ord ());
	autoTester.check ('round', round (4.006), round (4.006, 2), round (4060, -(2)), round (-(4.006)), round (-(4.006), 2), round (-(4060), -(2)), round (1 / 2.0), round (1 / 2.0, 1), round (1 / 2, 1), round (1 / 3.0, 2), round (-(1) / 2.0), round (-(1) / 2.0, 1), round (-(1) / 2, 1), round (-(1) / 3.0, 2), round (0.5), round (0.51), round (1.5), round (1.51), round (1.51), round (2.5), round (2.59), round (3.5), round (3.59), round (-(0.5)), round (-(0.51)), round (-(1.5)), round (-(1.51)), round (-(1.51)), round (-(2.5)), round (-(2.59)), round (-(3.5)), round (-(3.59)));
	var strings = ['der des dem den die der den die das des dem das', 'an auf hinter ueber    neben vor   zwischen', '\n            durch\n            fuer\n            ohne\n            um\n            bis\n            gegen\n            entlang\n        ', 'eins,zwei,drie,vier,fuenf,sechs,sieben'];
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

//# sourceMappingURL=module_builtin.map