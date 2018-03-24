import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, complex, __conj__, __Terminal__, __terminal__, print} from './org.transcrypt.__runtime__.mod.js';
var __name__ = 'control_structures';
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
	var vehicles = list (['bike', 'train', 'boat', 'car', 'plane', 'bus']);
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
			while (index < len (vehicles) && vehicles [index] != 'bus') {
				autoTester.check (index, vehicles [index]);
				if (doBreak && vehicles [index] == 'car') {
					autoTester.check ('breakWhile');
					__break2__ = true;
					break;
				}
				if (doContinue && vehicles [index] == 'car') {
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
};