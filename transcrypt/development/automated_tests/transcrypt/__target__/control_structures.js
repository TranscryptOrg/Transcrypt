// Transcrypt'ed from Python, 2018-04-07 19:09:00
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __globals__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __merge__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setProperty__, __setitem__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
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
export {};

//# sourceMappingURL=control_structures.map