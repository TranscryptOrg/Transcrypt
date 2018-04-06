// Transcrypt'ed from Python, 2018-04-05 23:19:52
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, complex, __conj__, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var __name__ = 'proxies';
export var run = function (autoTester) {
	var CodedStore = __class__ ('CodedStore', [object], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self) {
			try {
				self ["__dict__"] = {}
			}
			catch (__except0__) {
				// pass;
			}
		});},
		get __setattr__ () {return __get__ (this, function (self, py_name, message) {
			self.__dict__ ['_' + py_name] = 'coded_' + message;
		});},
		get __getattr__ () {return __get__ (this, function (self, py_name) {
			return 'decoded_' + self.__dict__ ['_' + py_name];
		});},
		get peek () {return __get__ (this, function (self, py_name) {
			return self.__dict__ ['_' + py_name];
		});}
	});
	var s = CodedStore ();
	s.john = 'brown';
	s.mary = 'white';
	autoTester.check (s.peek ('john'));
	autoTester.check (s.peek ('mary'));
	autoTester.check (s.john);
	autoTester.check (s.mary);
	var A = __class__ ('A', [object], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self) {
			self.p = 1;
			self.q = 2;
		});}
	});
	var B = __class__ ('B', [A], {
		__module__: __name__,
		get __getattr__ () {return __get__ (this, function (self, py_name) {
			return 'Faked {}'.format (py_name);
		});}
	});
	var C = __class__ ('C', [A], {
		__module__: __name__,
		get __setattr__ () {return __get__ (this, function (self, py_name, value) {
			autoTester.check ('Set faked {}'.format (py_name));
			A.__setattr__ (self, py_name, value);
		});}
	});
	var D = __class__ ('D', [B, C], {
		__module__: __name__,
	});
	var a = A ();
	var b = B ();
	var c = C ();
	var d = D ();
	autoTester.check (a.p, a.q);
	a.p = 3;
	autoTester.check (a.p, a.q);
	autoTester.check (b.p, b.q, b.r, b.s);
	b.p = 4;
	b.r = 5;
	autoTester.check (b.p, b.q, b.r, b.s);
	autoTester.check (c.p, c.q);
	c.p = 6;
	c.q = 7;
	autoTester.check (c.p, c.q);
	autoTester.check (d.p, d.q, d.r, d.s);
	d.p = 8;
	d.q = 9;
	d.r = 10;
	d.s = 11;
	autoTester.check (d.p, d.q, d.r, d.s);
};

//# sourceMappingURL=proxies.map