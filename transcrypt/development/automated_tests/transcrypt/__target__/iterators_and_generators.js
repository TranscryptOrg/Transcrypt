// Transcrypt'ed from Python, 2018-04-07 16:09:30
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, complex, __conj__, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
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
		for (var a of list ([10, 20, 30])) {
			__accu0__.append ((a * a) * a);
		}
		return py_iter (__accu0__);
	}) ();
	var iterables = list ([Iterable (7), exhaustableGenerator (5), (function () {
		var __accu0__ = [];
		for (var i = 0; i < 5; i++) {
			__accu0__.append (i * 3);
		}
		return __accu0__;
	}) (), exhaustableGenExp]);
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
	var vals = list ([1, 2, 3]);
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
export {};

//# sourceMappingURL=iterators_and_generators.map