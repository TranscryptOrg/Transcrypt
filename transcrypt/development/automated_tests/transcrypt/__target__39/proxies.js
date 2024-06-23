// Transcrypt'ed from Python, 2021-05-14 15:01:24
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get run () {return run;}, set run (value) {run = value;}});
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
		});},
		get __getattr__ () {return __get__ (this, function (self, py_name) {
			return 'decoded_' + ;
		});},
		get peek () {return __get__ (this, function (self, py_name) {
			return ;
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
	autoTester.check ('Issue 587');
	var Element = __class__ ('Element', [object], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self) {
			self.message = 'Goodbye';
		});},
		get sayBye () {return __get__ (this, function (self) {
			autoTester.check (self.message);
		});}
	});
	var Wrapper = __class__ ('Wrapper', [object], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self, element) {
			self.element = element;
		});},
		get __setattr__ () {return __get__ (this, function (self, py_name, value) {
			if (py_name != 'element' && hasattr (self.element, py_name)) {
				setattr (self.element, py_name, value);
			}
			else {
			}
		});},
		get __getattr__ () {return __get__ (this, function (self, py_name) {
			var result = getattr (self.element, py_name);
			if (hasattr (result, 'call') && hasattr (result, 'bind')) {
				var result = result.bind (self.element);
			}
			return result;
		});},
		get sayHello () {return __get__ (this, function (self) {
			autoTester.check ('Hello');
			return self;
		});}
	});
	var e = Element ();
	var w = Wrapper (e);
	e.sayBye ();
	w.sayBye ();
	w.sayHello ().sayBye ();
	w.message = 'Bye';
	e.sayBye ();
	w.sayBye ();
	w.sayHello ().sayBye ();
	autoTester.check ('End issue 587');
};

//# sourceMappingURL=proxies.map