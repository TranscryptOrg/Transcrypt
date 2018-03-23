import {__envir__, __nest__, __init__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, complex, __conj__, __Terminal__, __terminal__, print} from './org.transcrypt.__runtime__.mod.js';
var __name__ = 'simple_and_augmented_assignment';
export var A =  __class__ ('A', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.i = 0;
	});},
	get f () {return __get__ (this, function (self) {
		return self.i;
	});}
});
export var a = A ();
export var run = function (autoTester) {
	var x = 3;
	var y = 5;
	var z = x + y;
	autoTester.check (z);
	var l = list ([1, 2, 3]);
	l [1] = l [2];
	autoTester.check (l);
	x++;
	autoTester.check (x);
	x++;
	autoTester.check (x);
	x++;
	autoTester.check (x);
	y--;
	autoTester.check (y);
	y--;
	autoTester.check (y);
	y--;
	autoTester.check (y);
	x += -(3);
	autoTester.check (x);
	x += 6;
	autoTester.check (x);
	y -= 3;
	autoTester.check (y);
	l [1] += l [1];
	autoTester.check (l);
	x += y;
	y += x;
	autoTester.check (x, y);
	var f = a.f;
	a.i++;
	autoTester.check (f ());
	a.i += 10;
	autoTester.check (f ());
	a.i += a.i;
	autoTester.check (f ());
};