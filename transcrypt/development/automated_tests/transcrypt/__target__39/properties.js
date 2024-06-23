// Transcrypt'ed from Python, 2021-05-14 15:01:24
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get A () {return A;}, set A (value) {A = value;}, get B () {return B;}, set B (value) {B = value;}, get C () {return C;}, set C (value) {C = value;}, get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get run () {return run;}, set run (value) {run = value;}});
var __name__ = 'properties';
export var A =  __class__ ('A', [object], {
	__module__: __name__,
	p: 1234,
	get getX () {return __get__ (this, function (self) {
		return self._x;
	});},
	get setX () {return __get__ (this, function (self, value) {
		self._x = value;
	});},
	get getY () {return __get__ (this, function (self) {
		return self._y;
	});},
	get setY () {return __get__ (this, function (self, value) {
		self._y = 1000 + value;
	});},
	get getY2 () {return __get__ (this, function (self) {
		return self._y;
	});},
	get setY2 () {return __get__ (this, function (self, value) {
		self._y = value;
	});},
	get getT () {return __get__ (this, function (self) {
		return self._t;
	});},
	get setT () {return __get__ (this, function (self, value) {
		self._t = value;
	});},
	get getU () {return __get__ (this, function (self) {
		return self._u + 10000;
	});},
	get setU () {return __get__ (this, function (self, value) {
		self._u = value - 5000;
	});}
});
var __left0__ = tuple ([property.call (A, A.getX, A.setX), property.call (A, A.getY, A.setY), property.call (A, A.getY2, A.setY2)]);
Object.defineProperty (A, 'x', __left0__ [0]);
Object.defineProperty (A, 'y', __left0__ [1]);
Object.defineProperty (A, 'y2', __left0__ [2]);
Object.defineProperty (A, 't', property.call (A, A.getT, A.setT));
Object.defineProperty (A, 'u', property.call (A, A.getU, A.setU));
A.q = 5678;
export var B =  __class__ ('B', [object], {
	__module__: __name__,
	get getZ () {return __get__ (this, function (self) {
		return self.z_;
	});},
	get setZ () {return __get__ (this, function (self, value) {
		self.z_ = value;
	});}
});
Object.defineProperty (B, 'z', property.call (B, B.getZ, B.setZ));
export var C =  __class__ ('C', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.offset = 1234;
	});},
	get getW () {return __get__ (this, function (self) {
		return self.w_ + self.offset;
	});},
	get setW () {return __get__ (this, function (self, value) {
		self.w_ = value - self.offset;
	});}
});
Object.defineProperty (C, 'w', property.call (C, C.getW, C.setW));
export var run = function (autoTester) {
	var a1 = A ();
	var a2 = A ();
	a1.y2 = 1000;
	a2.y2 = 2000;
	a1.x = 5;
	a1.y = 6;
	a2.x = 7;
	a2.y = 8;
	a1.t = 77;
	a1.u = 88;
	autoTester.check (a1.x, a1.y, a1.y2);
	autoTester.check (a2.x, a2.y, a2.y2);
	autoTester.check (a1.p, a2.p, a1.q, a2.q);
	autoTester.check (a1.t, a1.u);
	var b = B ();
	var c = C ();
	b.z = 100100;
	c.z = 200200;
	c.w = 300300;
	autoTester.check (a1.x, b.z, c.z, c.w);
	c.w = 400400;
	c.z = 500500;
	b.z = 600600;
	autoTester.check (a1.x, b.z, c.z, c.w);
};

//# sourceMappingURL=properties.map