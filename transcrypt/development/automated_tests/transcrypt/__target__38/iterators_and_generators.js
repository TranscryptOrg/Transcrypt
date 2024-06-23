// Transcrypt'ed from Python, 2021-05-14 15:00:25
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get Iterable () {return Iterable;}, set Iterable (value) {Iterable = value;}, get Iterator () {return Iterator;}, set Iterator (value) {Iterator = value;}, get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get exhaustableGenerator () {return exhaustableGenerator;}, set exhaustableGenerator (value) {exhaustableGenerator = value;}, get run () {return run;}, set run (value) {run = value;}});
var __name__ = 'iterators_and_generators';
export var Iterable =  __class__ ('Iterable', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, i) {
		self.aList = range (0, 50, i);
	});},
	get __iter__ () {return __get__ (this, function (self) {
		return Iterator (self);
	});},
	[Symbol.iterator] () {return this.__iter__ ()}
});
export var Iterator =  __class__ ('Iterator', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, iterable) {
		self.iterable = iterable;
		self.index = -(1);
	});},
	get __next__ () {return __get__ (this, function (self) {
		self.index++;
		if (self.index > 5) {
			var __except0__ = StopIteration ();
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return self.iterable.aList [self.index];
	});},
	next: __jsUsePyNext__,
	get __iter__ () {return __get__ (this, function (self) {
		return self;
	});},
	[Symbol.iterator] () {return this.__iter__ ()}
});
export var exhaustableGenerator = function* (i) {
	for (var i = 0; i < 5; i++) {
		yield 2 * i;
	}
	};
export var run = function (autoTester) {
	var exhaustableGenExp = (function () {
		var __accu0__ = [];
		for (var a of [10, 20, 30]) {
			__accu0__.append ((a * a) * a);
		}
		return py_iter (__accu0__);
	}) ();
	var iterables = [Iterable (7), exhaustableGenerator (5), (function () {
		var __accu0__ = [];
		for (var i = 0; i < 5; i++) {
			__accu0__.append (i * 3);
		}
		return __accu0__;
	}) (), exhaustableGenExp];
	for (var iterable of iterables) {
		autoTester.check ('[1]');
		var iterator = py_iter (iterable);
		try {
			while (true) {
				autoTester.check (py_next (iterator));
			}
		}
		catch (__except0__) {
			if (isinstance (__except0__, Exception)) {
				var exception = __except0__;
				autoTester.check (exception.__class__.__name__);
			}
			else {
				throw __except0__;
			}
		}
		autoTester.check ('[2]');
		var iterator = py_iter (iterable);
		try {
			while (true) {
				autoTester.check (py_next (iterator));
			}
		}
		catch (__except0__) {
			if (isinstance (__except0__, Exception)) {
				var exception = __except0__;
				autoTester.check (exception.__class__.__name__);
			}
			else {
				throw __except0__;
			}
		}
	}
	for (var iterable of iterables) {
		autoTester.check ('[3]');
		for (var n of iterable) {
			autoTester.check (n);
		}
		autoTester.check ('[4]');
		for (var n of iterable) {
			autoTester.check (n);
		}
	}
	var a = 0;
	var vals = [1, 2, 3];
	var ret = py_iter (vals);
	for (var m of ret) {
		a += m;
	}
	autoTester.check (a);
	var test0 = function* () {
		var r = 0;
		while (true) {
			var r = r + (yield r);
		}
		};
	var gen0 = test0 ();
	py_next (gen0);
	autoTester.check ((function () {return gen0.next (1).value}) ());
	autoTester.check ((function () {return gen0.next (2).value}) ());
	var test1 = function* () {
		var r = 0;
		while (true) {
			var r = (yield r) + r;
		}
		};
	var gen1 = test1 ();
	py_next (gen1);
	autoTester.check ((function () {return gen1.next (3).value}) ());
	autoTester.check ((function () {return gen1.next (4).value}) ());
	var subGenerator = function* () {
		yield 27;
		yield 37;
		yield 47};
	var mainGenerator = function* () {
		yield 17;
		yield* subGenerator ();
		yield 57};
	autoTester.check (...(function () {
		var __accu0__ = [];
		for (var i of mainGenerator ()) {
			__accu0__.append (i);
		}
		return __accu0__;
	}) ());
	var subCoroutine = function* () {
		autoTester.check (38);
		yield;
		autoTester.check (48);
		yield;
		autoTester.check (58);
		yield;
		autoTester.check (68)};
	var mainCoroutine = function* () {
		autoTester.check (18);
		yield;
		autoTester.check (28);
		yield* subCoroutine ();
		autoTester.check (78);
		yield;
		autoTester.check (88)};
	var m = mainCoroutine ();
	for (var i = 0; i < 5; i++) {
		(function () {return m.next (null).value}) ();
	}
};

//# sourceMappingURL=iterators_and_generators.map