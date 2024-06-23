// Transcrypt'ed from Python, 2021-05-14 15:00:23
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get run () {return run;}, set run (value) {run = value;}});
var __name__ = 'truthyness';
export var run = function (autoTester) {
	autoTester.check (len (dict ({1: 2})));
	autoTester.check ('Select nonemtpy container, if any<br>');
	autoTester.check (__t__ (0) || tuple ([1, 2, 3]));
	autoTester.check (__t__ (tuple ([])) || tuple ([1, 2, 3]));
	autoTester.check (__t__ (tuple ([])) || tuple ([]));
	autoTester.check (__t__ (-__t__ ((1))) || __t__ (0) || tuple ([1, 2, 3]));
	autoTester.check (__t__ (tuple ([])) || __t__ (0) || tuple ([1, 2, 3]));
	autoTester.check (__t__ (tuple ([])) || __t__ (tuple ([])) || tuple ([1, 2, 3]));
	autoTester.check (__t__ (tuple ([])) || __t__ (tuple ([])) || tuple ([]));
	autoTester.check (__t__ ([0]) || [1, 2, 3]);
	autoTester.check (__t__ ([]) || [1, 2, 3]);
	autoTester.check (__t__ ([]) || []);
	autoTester.check (__t__ ([-__t__ ((1))]) || __t__ ([0]) || [1, 2, 3]);
	autoTester.check (__t__ ([]) || __t__ ([0]) || [1, 2, 3]);
	autoTester.check (__t__ ([]) || __t__ ([]) || [1, 2, 3]);
	autoTester.check (__t__ ([]) || __t__ ([]) || []);
	autoTester.check (__t__ (new set ([0])) || new set ([1, 2, 3, 4]));
	autoTester.check (__t__ (set ()) || new set ([1, 2, 3, 4]));
	autoTester.check (__t__ (set ()) || set ());
	autoTester.check (__t__ (new set ([-__t__ ((1))])) || __t__ (new set ([0])) || new set ([1, 2, 3, 5]));
	autoTester.check (__t__ (set ()) || __t__ (new set ([0])) || new set ([1, 2, 3, 6]));
	autoTester.check (__t__ (set ()) || __t__ (set ()) || new set ([1, 2, 3, 7]));
	autoTester.check (__t__ (set ()) || __t__ (set ()) || set ());
	autoTester.check (__t__ (dict ({0: 10})) || dict ({1: 11, 2: 12, 3: 13}));
	autoTester.check (__t__ (dict ({})) || new set ([1, 2, 3, 8]));
	autoTester.check (__t__ (dict ({})) || dict ({}));
	autoTester.check (__t__ (dict ([[-__t__ ((1)), -__t__ ((11))]])) || __t__ (dict ({0: 10})) || dict ({1: 11, 2: 12, 3: 13}));
	autoTester.check (__t__ (dict ({})) || __t__ (dict ({0: 10})) || dict ({1: 11, 2: 12, 3: 13}));
	autoTester.check (__t__ (dict ({})) || __t__ (dict ({})) || dict ({1: 11, 2: 12, 3: 13}));
	autoTester.check (__t__ (dict ({})) || __t__ (dict ({})) || dict ({}));
	autoTester.check ('<br><br>');
	autoTester.check ('Boolean evaluations');
	for (var expression of tuple (['<br> -- falsy -- <br>', tuple ([]), [], set (), dict ({}), 0, '', 3 > 5, false, '<br> -- truthy -- <br>', tuple ([1, 2, 3]), [1, 2, 3], new set ([1, 2, 3]), dict ({'a': 1, 'b': 2, 'c': 3}), 3, 'hello', 5 > 3, true])) {
		if (__t__ (__in__ (expression, tuple (['<br> -- falsy -- <br>', '<br> -- truthy -- <br>'])))) {
			autoTester.check (expression);
		}
		else {
			autoTester.check (expression, ' . . . ');
			autoTester.check ('operators');
			autoTester.check (!__t__ ((!__t__ ((expression)))));
			autoTester.check (!__t__ ((!__t__ ((__t__ (true) && expression)))));
			autoTester.check (!__t__ ((!__t__ ((__t__ (false) || expression)))));
			autoTester.check (!__t__ ((!__t__ ((__t__ (expression) && true)))));
			autoTester.check (!__t__ ((!__t__ ((__t__ (expression) && false)))));
			autoTester.check ('if');
			if (__t__ (expression)) {
				autoTester.check (true);
			}
			else {
				autoTester.check (false);
			}
			if (__t__ (__t__ (expression) || expression)) {
				autoTester.check (true);
			}
			else {
				autoTester.check (false);
			}
			if (__t__ (false)) {
				autoTester.check ('if');
			}
			else if (__t__ (expression)) {
				autoTester.check ('elif');
			}
			else {
				autoTester.check ('else');
			}
			autoTester.check ('while');
			while (__t__ (expression)) {
				autoTester.check (true);
				break;
			}
			autoTester.check ('condex');
			autoTester.check ((__t__ (expression) ? true : false));
		}
	}
	if (__t__ (0.0)) {
		autoTester.check ('0.0');
	}
	else if (__t__ (0.1)) {
		autoTester.check ('0.1');
	}
	else {
		autoTester.check ("Shouldn't be here...");
	}
	var A = __class__ ('A', [object], {
		__module__: __name__,
	});
	var B = __class__ ('B', [object], {
		__module__: __name__,
		get __bool__ () {return __get__ (this, function (self) {
			return false;
		});}
	});
	var C = __class__ ('C', [object], {
		__module__: __name__,
		get __bool__ () {return __get__ (this, function (self) {
			return true;
		});},
		get __len__ () {return __get__ (this, function (self) {
			return 0;
		});}
	});
	var D = __class__ ('D', [object], {
		__module__: __name__,
		get __len__ () {return __get__ (this, function (self) {
			return 0;
		});}
	});
	var E = __class__ ('E', [object], {
		__module__: __name__,
		get __len__ () {return __get__ (this, function (self) {
			return 1;
		});}
	});
	autoTester.check ('instances of custom classes');
	autoTester.check (!__t__ ((!__t__ ((A ())))));
	autoTester.check (!__t__ ((!__t__ ((B ())))));
	autoTester.check (!__t__ ((!__t__ ((C ())))));
	autoTester.check (!__t__ ((!__t__ ((D ())))));
	autoTester.check (!__t__ ((!__t__ ((E ())))));
};

//# sourceMappingURL=truthyness.map