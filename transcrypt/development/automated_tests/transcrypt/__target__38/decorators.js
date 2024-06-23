// Transcrypt'ed from Python, 2021-05-14 15:00:25
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get run () {return run;}, set run (value) {run = value;}});
var __name__ = 'decorators';
export var run = function (autoTester) {
	var repeat3 = function (bareFunc) {
		var innerFunc = function () {
			var kwargs = dict ();
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
						}
					}
					delete kwargs.__kwargtrans__;
				}
				var args = tuple ([].slice.apply (arguments).slice (0, __ilastarg0__ + 1));
			}
			else {
				var args = tuple ();
			}
			autoTester.check ('BEGIN repeat3');
			for (var i = 0; i < 3; i++) {
				bareFunc (...args, __kwargtrans__ (kwargs));
			}
			autoTester.check ('END repeat3');
		};
		return innerFunc;
	};
	var repeatN = function (n) {
		var repeat = function (bareFunc) {
			var innerFunc = function () {
				var kwargs = dict ();
				if (arguments.length) {
					var __ilastarg0__ = arguments.length - 1;
					if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
						var __allkwargs0__ = arguments [__ilastarg0__--];
						for (var __attrib0__ in __allkwargs0__) {
							switch (__attrib0__) {
								default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
							}
						}
						delete kwargs.__kwargtrans__;
					}
					var args = tuple ([].slice.apply (arguments).slice (0, __ilastarg0__ + 1));
				}
				else {
					var args = tuple ();
				}
				autoTester.check ('BEGIN repeatN ({})'.format (n));
				for (var i = 0; i < n; i++) {
					bareFunc (...args, __kwargtrans__ (kwargs));
				}
				autoTester.check ('END repeatN ({})'.format (n));
			};
			return innerFunc;
		};
		return repeat;
	};
	var Repeater = __class__ ('Repeater', [object], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self, n) {
			self.n = n;
		});},
		get __call__ () {return __get__ (this, function (self, bareFunc) {
			var innerFunc = function () {
				var kwargs = dict ();
				if (arguments.length) {
					var __ilastarg0__ = arguments.length - 1;
					if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
						var __allkwargs0__ = arguments [__ilastarg0__--];
						for (var __attrib0__ in __allkwargs0__) {
							switch (__attrib0__) {
								default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
							}
						}
						delete kwargs.__kwargtrans__;
					}
					var args = tuple ([].slice.apply (arguments).slice (0, __ilastarg0__ + 1));
				}
				else {
					var args = tuple ();
				}
				autoTester.check ('BEGIN repeat3');
				for (var i = 0; i < self.n; i++) {
					bareFunc (...args, __kwargtrans__ (kwargs));
				}
				autoTester.check ('END repeat3');
			};
			return innerFunc;
		});}
	});
	var funcNoArg = repeatN (4) (repeat3 (function () {
		autoTester.check ('spam');
	}));
	funcNoArg ();
	autoTester.check ();
	var funcArg = repeat3 (repeatN (2) (function (a) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'a': var a = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		autoTester.check ('eggs', a);
	}));
	funcArg (3);
	autoTester.check ();
	funcArg (__kwargtrans__ ({a: 4}));
	autoTester.check ();
	var funcNoArg2 = __call__ (__call__ (Repeater, null, 3), null, function () {
		(function () {
			var __accu0__ = autoTester;
			return __call__ (__accu0__.check, __accu0__, 'toast');
		}) ();
	});
	funcNoArg2 ();
	autoTester.check ();
	var funcArg2 = __call__ (__call__ (Repeater, null, 5), null, function (a) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'a': var a = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		(function () {
			var __accu0__ = autoTester;
			return __call__ (__accu0__.check, __accu0__, 'jam', a);
		}) ();
	});
	funcArg2 (3);
	autoTester.check ();
	funcArg2 (__kwargtrans__ ({a: 4}));
	autoTester.check ();
	var py_next = function (bareFunc) {
		var innerFunc = function (value) {
			return bareFunc (value + 1);
		};
		return innerFunc;
	};
	var Number = py_next ( __class__ ('Number', [object], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self, value) {
			self.value = value;
		});}
	}));
	autoTester.check ('two', Number (1).value);
	var Test = __class__ ('Test', [object], {
		__module__: __name__,
		get f () {return __getcm__ (this, function (cls, x, y) {
			autoTester.check (cls.__name__, x, y);
		});},
		get g () {return __get__ (this, function (self, x, y) {
			autoTester.check (self.__class__.__name__, x, y);
		});}
	});
	var test = Test ();
	test.f (1, 2);
	test.g (3, 4);
};

//# sourceMappingURL=decorators.map