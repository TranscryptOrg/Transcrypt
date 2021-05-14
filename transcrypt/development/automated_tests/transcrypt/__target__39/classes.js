// Transcrypt'ed from Python, 2021-05-14 15:01:26
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get run () {return run;}, set run (value) {run = value;}});
var __name__ = 'classes';
export var run = function (autoTester) {
	autoTester.check ('<br>General<br>');
	var A = __class__ ('A', [object], {
		__module__: __name__,
		p: 123,
		get __init__ () {return __get__ (this, function (self, x) {
			self.x = x;
			autoTester.check (self.p);
		});},
		get show () {return __get__ (this, function (self, label) {
			autoTester.check ('A.show', label, self.x);
		});},
		get show2 () {return __get__ (this, function (self, label) {
			autoTester.check ('A.show2', label, self.x);
		});}
	});
	var B = __class__ ('B', [object], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self, y) {
			autoTester.check ('In B constructor');
			self.y = y;
			autoTester.check (self.p);
		});},
		get show () {return __get__ (this, function (self, label) {
			autoTester.check ('B.show', label, self.y);
		});}
	});
	var __left0__ = tuple ([456, 789]);
	B.p = __left0__ [0];
	B.q = __left0__ [1];
	var C = __class__ ('C', [A, B], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self, x, y) {
			autoTester.check ('In C constructor');
			A.__init__ (self, x);
			B.__init__ (self, y);
		});},
		get show () {return __get__ (this, function (self, label) {
			A.show (self, label);
			B.show (self, label);
			autoTester.check ('C.show', label, self.x, self.y);
		});}
	});
	var a = A (1001);
	a.show ('america');
	autoTester.check (A.p);
	autoTester.check (a.p);
	var b = B (2002);
	b.show ('russia');
	autoTester.check (B.p);
	autoTester.check (b.p);
	autoTester.check (b.q);
	autoTester.check (A.p);
	autoTester.check (a.p);
	var c = C (3003, 4004);
	c.show ('netherlands');
	autoTester.check (C.p);
	autoTester.check (c.p);
	autoTester.check (c.q);
	c.show2 ('amsterdam');
	A.show2 (c, 'rotterdam');
	var show3 = c.show;
	show3 ('copy');
	autoTester.check (hasattr (a, 'x'));
	autoTester.check (hasattr (a, 'y'));
	autoTester.check (hasattr (a, 'p'));
	autoTester.check (hasattr (a, 'q'));
	autoTester.check ('<br><br>Augmented isinstance and issubclass<br>');
	var simpleTypes = tuple ([dict, list, A, B, C, bool, str, float, int, object]);
	var tupleTypes = tuple ([tuple ([dict, list]), tuple ([bool, int]), tuple ([bool, A]), tuple ([C, B]), tuple ([B, object])]);
	for (var [i, types] of enumerate (tuple ([simpleTypes, tupleTypes]))) {
		for (var [j, aType] of enumerate (types)) {
			for (var [k, anObject] of enumerate (tuple ([dict ({'a': 1}), [], a, C, c, C, b, true, 'a', 1, 1.2]))) {
				autoTester.check (i, j, k, isinstance (anObject, aType));
				if (types == simpleTypes) {
					autoTester.check (i, j, k, isinstance (anObject, simpleTypes));
				}
			}
		}
	}
	for (var [i, types] of enumerate (tuple ([simpleTypes, tupleTypes]))) {
		for (var [j, aType] of enumerate (types)) {
			for (var [k, aClass] of enumerate (tuple ([dict, list, A, C, B, bool, str, int, float]))) {
				autoTester.check (i + 2, j, k, issubclass (aClass, aType));
				if (types == simpleTypes) {
					autoTester.check (i + 2, j, k, issubclass (aClass, simpleTypes));
				}
			}
		}
	}
	autoTester.check ('<br><br>Method resolution order<br>');
	var mro = function (aClass, result) {
		if (typeof result == 'undefined' || (result != null && result.hasOwnProperty ("__kwargtrans__"))) {;
			var result = null;
		};
		var last = 0;
		if (result === null) {
			var result = [aClass];
			var last = 1;
		}
		for (var aBase of aClass.__bases__) {
			if (!(__in__ (aBase, result)) && aBase != object) {
				result.append (aBase);
				mro (aBase, result);
			}
		}
		if (last && __in__ (object, aClass.__bases__)) {
			aRoot.append (object);
		}
		return result;
	};
	autoTester.check ((function () {
		var __accu0__ = [];
		for (var aClass of mro (C)) {
			__accu0__.append (aClass.__name__);
		}
		return __accu0__;
	}) ());
};

//# sourceMappingURL=classes.map