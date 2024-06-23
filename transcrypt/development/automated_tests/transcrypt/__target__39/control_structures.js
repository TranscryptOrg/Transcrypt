// Transcrypt'ed from Python, 2021-05-14 15:01:26
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get ContextManagerExample () {return ContextManagerExample;}, set ContextManagerExample (value) {ContextManagerExample = value;}, get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get run () {return run;}, set run (value) {run = value;}});
var __name__ = 'control_structures';
export var ContextManagerExample =  __class__ ('ContextManagerExample', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.counter = 0;
	});},
	get __enter__ () {return __get__ (this, function (self) {
		self.counter++;
		return self;
	});},
	get __exit__ () {return __get__ (this, function (self) {
		var args = tuple ([].slice.apply (arguments).slice (1));
		self.counter += 99;
	});}
});
export var run = function (autoTester) {
	for (var index = 0; index < 10; index++) {
		autoTester.check (index);
	}
	for (var index = 8; index < 16; index++) {
		autoTester.check (index);
	}
	for (var index = 8; index < 16; index += 2) {
		autoTester.check (index);
	}
	for (var index = 10; index > 0; index--) {
		autoTester.check (index);
	}
	for (var index = 16; index > 8; index -= 2) {
		autoTester.check (index);
	}
	for (var animal of tuple (['cat', 'dog', 'turtle', 'goldfish'])) {
		autoTester.check (animal);
	}
	for (var [index, square] of enumerate ((function () {
		var __accu0__ = [];
		for (var x = 0; x < 10; x++) {
			if (__mod__ (x, 2)) {
				__accu0__.append (x * x);
			}
		}
		return __accu0__;
	}) ())) {
		for (var y of tuple ([1, 2, 3])) {
			for (var z of tuple ([10, 20, 30])) {
				autoTester.check (square + y, z);
			}
		}
	}
	var vehicles = ['bike', 'train', 'boat', 'car', 'plane', 'bus'];
	for (var doBreak of tuple ([false, true])) {
		for (var doContinue of tuple ([false, true])) {
			var __break2__ = false;
			for (var index = 0; index < 10; index++) {
				var __break3__ = false;
				for (var index2 = 0; index2 < 100; index2 += 10) {
					if (doBreak && index2 == 50) {
						autoTester.check ('break2');
						__break3__ = true;
						break;
					}
					if (doContinue && index2 == 50) {
						autoTester.check ('continue2');
						continue;
					}
				}
				if (!__break3__) {
					autoTester.check ('noBreak2');
				}
				if (doBreak && index == 5) {
					autoTester.check ('break');
					__break2__ = true;
					break;
				}
				if (doContinue && index == 5) {
					autoTester.check ('continue');
					continue;
				}
			}
			if (!__break2__) {
				autoTester.check ('noBreak');
			}
			var index = 0;
			var __break2__ = false;
			while (index < len (vehicles) &&  != 'bus') {
				autoTester.check (index, );
				if (doBreak &&  == 'car') {
					autoTester.check ('breakWhile');
					__break2__ = true;
					break;
				}
				if (doContinue &&  == 'car') {
					autoTester.check ('continueWhile');
					index++;
					continue;
				}
				index++;
			}
			if (!__break2__) {
				autoTester.check ('noBreakWhile');
			}
		}
		for (var vehicle of vehicles) {
			if (vehicle == 'bike') {
				autoTester.check ('netherlands');
			}
			else if (vehicle == 'car') {
				autoTester.check ('america');
			}
			else if (vehicle == 'boat') {
				autoTester.check ('oceania');
			}
			else {
				autoTester.check ('anywhere');
			}
		}
	}
	var externalCounter1 = 0;
	var contextManagerExample1 = ContextManagerExample ();
	try {
		contextManagerExample1.__enter__ ();
		externalCounter1++;
		contextManagerExample1.__exit__ ();
	}
	catch (__except0__) {
		if (! (contextManagerExample1.__exit__ (__except0__.name, __except0__, __except0__.stack))) {
			throw __except0__;
		}
	}
	autoTester.check ('ctx1', contextManagerExample1.counter, externalCounter1);
	var externalCounter2 = 0;
	var contextManagerExample2 = ContextManagerExample ();
	try {
		contextManagerExample2.__enter__ ();
		externalCounter2++;
		contextManagerExample2.counter += 100;
		var externalCounter3 = 0;
		var contextManagerExample3 = ContextManagerExample ();
		try {
			contextManagerExample3.__enter__ ();
			externalCounter3++;
			contextManagerExample2.counter += 100;
			externalCounter3 += 2;
			contextManagerExample3.counter += 200;
			contextManagerExample3.__exit__ ();
		}
		catch (__except0__) {
			if (! (contextManagerExample3.__exit__ (__except0__.name, __except0__, __except0__.stack))) {
				throw __except0__;
			}
		}
		autoTester.check ('ctx3', contextManagerExample3.counter, externalCounter3);
		externalCounter2 += 2;
		contextManagerExample2.counter += 200;
		contextManagerExample2.__exit__ ();
	}
	catch (__except0__) {
		if (! (contextManagerExample2.__exit__ (__except0__.name, __except0__, __except0__.stack))) {
			throw __except0__;
		}
	}
	autoTester.check ('ctx2', contextManagerExample2.counter, externalCounter2);
	try {
		var externalCounter4 = 0;
		var contextManagerExample4 = ContextManagerExample ();
		try {
			contextManagerExample4.__enter__ ();
			externalCounter4++;
			contextManagerExample4.counter += 100;
			var externalCounter5 = 0;
			var contextManagerExample5 = ContextManagerExample ();
			try {
				contextManagerExample5.__enter__ ();
				externalCounter5++;
				contextManagerExample5.counter += 100;
				var __except0__ = Exception ();
				__except0__.__cause__ = null;
				throw __except0__;
				externalCounter5 += 2;
				contextManagerExample5.counter += 200;
				contextManagerExample5.__exit__ ();
			}
			catch (__except0__) {
				if (! (contextManagerExample5.__exit__ (__except0__.name, __except0__, __except0__.stack))) {
					throw __except0__;
				}
			}
			externalCounter4 += 2;
			contextManagerExample4.counter += 200;
			contextManagerExample4.__exit__ ();
		}
		catch (__except0__) {
			if (! (contextManagerExample4.__exit__ (__except0__.name, __except0__, __except0__.stack))) {
				throw __except0__;
			}
		}
	}
	catch (__except0__) {
		if (isinstance (__except0__, Exception)) {
			var exception = __except0__;
			autoTester.check ('ctx6', exception);
		}
		else {
			throw __except0__;
		}
	}
	finally {
		autoTester.check ('ctx5', contextManagerExample5.counter, externalCounter5);
		autoTester.check ('ctx4', contextManagerExample4.counter, externalCounter4);
	}
	var iterationCount = 0;
	var contextManagerExample5 = ContextManagerExample ();
	try {
		contextManagerExample5.__enter__ ();
		var contextManagerExample6 = ContextManagerExample ();
		try {
			contextManagerExample6.__enter__ ();
			iterationCount++;
			contextManagerExample6.__exit__ ();
		}
		catch (__except0__) {
			if (! (contextManagerExample6.__exit__ (__except0__.name, __except0__, __except0__.stack))) {
				throw __except0__;
			}
		}
		contextManagerExample5.__exit__ ();
	}
	catch (__except0__) {
		if (! (contextManagerExample5.__exit__ (__except0__.name, __except0__, __except0__.stack))) {
			throw __except0__;
		}
	}
	autoTester.check ('ctx7', iterationCount, contextManagerExample5.counter, contextManagerExample6.counter);
	var iterationCount = 0;
	var __withid0__ = ContextManagerExample ();
	try {
		__withid0__.__enter__ ();
		var __withid1__ = ContextManagerExample ();
		try {
			__withid1__.__enter__ ();
			var __withid2__ = ContextManagerExample ();
			try {
				__withid2__.__enter__ ();
				var __withid3__ = ContextManagerExample ();
				try {
					__withid3__.__enter__ ();
					var __withid4__ = ContextManagerExample ();
					try {
						__withid4__.__enter__ ();
						iterationCount++;
						__withid4__.__exit__ ();
					}
					catch (__except0__) {
						if (! (__withid4__.__exit__ (__except0__.name, __except0__, __except0__.stack))) {
							throw __except0__;
						}
					}
					__withid3__.__exit__ ();
				}
				catch (__except0__) {
					if (! (__withid3__.__exit__ (__except0__.name, __except0__, __except0__.stack))) {
						throw __except0__;
					}
				}
				__withid2__.__exit__ ();
			}
			catch (__except0__) {
				if (! (__withid2__.__exit__ (__except0__.name, __except0__, __except0__.stack))) {
					throw __except0__;
				}
			}
			__withid1__.__exit__ ();
		}
		catch (__except0__) {
			if (! (__withid1__.__exit__ (__except0__.name, __except0__, __except0__.stack))) {
				throw __except0__;
			}
		}
		__withid0__.__exit__ ();
	}
	catch (__except0__) {
		if (! (__withid0__.__exit__ (__except0__.name, __except0__, __except0__.stack))) {
			throw __except0__;
		}
	}
	autoTester.check ('ctx8', iterationCount);
};

//# sourceMappingURL=control_structures.map