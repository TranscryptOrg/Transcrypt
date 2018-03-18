"use strict";
import {__nest__, __init__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __Envir__, __envir__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, complex, __conj__, __Terminal__, __terminal__, print} from './org.transcrypt.__runtime__.mod.js';
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
	autoTester.check (__t__ (list ([0])) || list ([1, 2, 3]));
	autoTester.check (__t__ (list ([])) || list ([1, 2, 3]));
	autoTester.check (__t__ (list ([])) || list ([]));
	autoTester.check (__t__ (list ([-__t__ ((1))])) || __t__ (list ([0])) || list ([1, 2, 3]));
	autoTester.check (__t__ (list ([])) || __t__ (list ([0])) || list ([1, 2, 3]));
	autoTester.check (__t__ (list ([])) || __t__ (list ([])) || list ([1, 2, 3]));
	autoTester.check (__t__ (list ([])) || __t__ (list ([])) || list ([]));
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
	for (var expression of tuple (['<br> -- falsy -- <br>', tuple ([]), list ([]), set (), dict ({}), 0, '', 3 > 5, false, '<br> -- truthy -- <br>', tuple ([1, 2, 3]), list ([1, 2, 3]), new set ([1, 2, 3]), dict ({'a': 1, 'b': 2, 'c': 3}), 3, 'hello', 5 > 3, true])) {
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