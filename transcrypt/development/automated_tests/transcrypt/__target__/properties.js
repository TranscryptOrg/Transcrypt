// Transcrypt'ed from Python, 2018-04-05 23:19:52
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, complex, __conj__, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
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
Object.defineProperty (A, 'x', __left0__ [0]);;
Object.defineProperty (A, 'y', __left0__ [1]);;
Object.defineProperty (A, 'y2', __left0__ [2]);;
Object.defineProperty (A, 't', property.call (A, A.getT, A.setT));;
Object.defineProperty (A, 'u', property.call (A, A.getU, A.setU));;
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
Object.defineProperty (B, 'z', property.call (B, B.getZ, B.setZ));;

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
Object.defineProperty (C, 'w', property.call (C, C.getW, C.setW));;
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