// Transcrypt'ed from Python, 2021-05-14 15:00:23
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get A () {return A;}, set A (value) {A = value;}, get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get a () {return a;}, set a (value) {a = value;}, get run () {return run;}, set run (value) {run = value;}});
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
	var l = [1, 2, 3];
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

//# sourceMappingURL=simple_and_augmented_assignment.map