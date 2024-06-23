// Transcrypt'ed from Python, 2021-05-14 15:00:25
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {ClassVar} from './typing.js';
import {dataclass} from './dataclasses.js';
export {dataclass, ClassVar};
var __all__ = dict ({get A () {return A;}, set A (value) {A = value;}, get B () {return B;}, set B (value) {B = value;}, get C () {return C;}, set C (value) {C = value;}, get D () {return D;}, set D (value) {D = value;}, get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get getQ () {return getQ;}, set getQ (value) {getQ = value;}, get run () {return run;}, set run (value) {run = value;}});
var __name__ = 'data_classes';
export var getQ = function () {
	return 1002;
};
export var A =  __class__ ('A', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		let names = self.__initfields__.values ();
		for (let arg of args) {
		    self [names.next () .value] = arg;
		}
		for (let name of kwargs.py_keys ()) {
		    self [name] = kwargs [name];
		}
	});},
	get __repr__ () {return __get__ (this, function (self) {
		let names = self.__reprfields__.values ();
		let fields = [];
		for (let name of names) {{
		    fields.push (name + '=' + repr (self [name]));
		}}
		return  self.__name__ + '(' + ', '.join (fields) + ')'
	});},
	get __eq__ () {return __get__ (this, function (self, other) {
		let names = self.__comparefields__.values ();
		let selfFields = [];
		let otherFields = [];
		for (let name of names) {
		    selfFields.push (self [name]);
		    otherFields.push (other [name]);
		}
		return list (selfFields).__eq__(list (otherFields));
	});},
	get __ne__ () {return __get__ (this, function (self, other) {
		let names = self.__comparefields__.values ();
		let selfFields = [];
		let otherFields = [];
		for (let name of names) {
		    selfFields.push (self [name]);
		    otherFields.push (other [name]);
		}
		return list (selfFields).__ne__(list (otherFields));
	});},
	get __lt__ () {return __get__ (this, function (self, other) {
		let names = self.__comparefields__.values ();
		let selfFields = [];
		let otherFields = [];
		for (let name of names) {
		    selfFields.push (self [name]);
		    otherFields.push (other [name]);
		}
		return list (selfFields).__lt__(list (otherFields));
	});},
	get __le__ () {return __get__ (this, function (self, other) {
		let names = self.__comparefields__.values ();
		let selfFields = [];
		let otherFields = [];
		for (let name of names) {
		    selfFields.push (self [name]);
		    otherFields.push (other [name]);
		}
		return list (selfFields).__le__(list (otherFields));
	});},
	get __gt__ () {return __get__ (this, function (self, other) {
		let names = self.__comparefields__.values ();
		let selfFields = [];
		let otherFields = [];
		for (let name of names) {
		    selfFields.push (self [name]);
		    otherFields.push (other [name]);
		}
		return list (selfFields).__gt__(list (otherFields));
	});},
	get __ge__ () {return __get__ (this, function (self, other) {
		let names = self.__comparefields__.values ();
		let selfFields = [];
		let otherFields = [];
		for (let name of names) {
		    selfFields.push (self [name]);
		    otherFields.push (other [name]);
		}
		return list (selfFields).__ge__(list (otherFields));
	});},
	m: 101010,
	n: 202020
})
for (let aClass of A.__bases__) {
	__mergefields__ (A, aClass);
};
__mergefields__ (A, {__reprfields__: new Set (['n']), __comparefields__: new Set (['n']), __initfields__: new Set (['n'])});
export var B =  __class__ ('B', [A], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		let names = self.__initfields__.values ();
		for (let arg of args) {
		    self [names.next () .value] = arg;
		}
		for (let name of kwargs.py_keys ()) {
		    self [name] = kwargs [name];
		}
	});},
	get __repr__ () {return __get__ (this, function (self) {
		let names = self.__reprfields__.values ();
		let fields = [];
		for (let name of names) {{
		    fields.push (name + '=' + repr (self [name]));
		}}
		return  self.__name__ + '(' + ', '.join (fields) + ')'
	});},
	get __eq__ () {return __get__ (this, function (self, other) {
		let names = self.__comparefields__.values ();
		let selfFields = [];
		let otherFields = [];
		for (let name of names) {
		    selfFields.push (self [name]);
		    otherFields.push (other [name]);
		}
		return list (selfFields).__eq__(list (otherFields));
	});},
	get __ne__ () {return __get__ (this, function (self, other) {
		let names = self.__comparefields__.values ();
		let selfFields = [];
		let otherFields = [];
		for (let name of names) {
		    selfFields.push (self [name]);
		    otherFields.push (other [name]);
		}
		return list (selfFields).__ne__(list (otherFields));
	});},
	get __lt__ () {return __get__ (this, function (self, other) {
		let names = self.__comparefields__.values ();
		let selfFields = [];
		let otherFields = [];
		for (let name of names) {
		    selfFields.push (self [name]);
		    otherFields.push (other [name]);
		}
		return list (selfFields).__lt__(list (otherFields));
	});},
	get __le__ () {return __get__ (this, function (self, other) {
		let names = self.__comparefields__.values ();
		let selfFields = [];
		let otherFields = [];
		for (let name of names) {
		    selfFields.push (self [name]);
		    otherFields.push (other [name]);
		}
		return list (selfFields).__le__(list (otherFields));
	});},
	get __gt__ () {return __get__ (this, function (self, other) {
		let names = self.__comparefields__.values ();
		let selfFields = [];
		let otherFields = [];
		for (let name of names) {
		    selfFields.push (self [name]);
		    otherFields.push (other [name]);
		}
		return list (selfFields).__gt__(list (otherFields));
	});},
	get __ge__ () {return __get__ (this, function (self, other) {
		let names = self.__comparefields__.values ();
		let selfFields = [];
		let otherFields = [];
		for (let name of names) {
		    selfFields.push (self [name]);
		    otherFields.push (other [name]);
		}
		return list (selfFields).__ge__(list (otherFields));
	});},
	p: 1001,
	q: 1002
})
for (let aClass of B.__bases__) {
	__mergefields__ (B, aClass);
};
__mergefields__ (B, {__reprfields__: new Set (['p', 'q']), __comparefields__: new Set (['p', 'q']), __initfields__: new Set (['p', 'q'])});
export var C =  __class__ ('C', [B], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		let names = self.__initfields__.values ();
		for (let arg of args) {
		    self [names.next () .value] = arg;
		}
		for (let name of kwargs.py_keys ()) {
		    self [name] = kwargs [name];
		}
	});},
	get __repr__ () {return __get__ (this, function (self) {
		let names = self.__reprfields__.values ();
		let fields = [];
		for (let name of names) {{
		    fields.push (name + '=' + repr (self [name]));
		}}
		return  self.__name__ + '(' + ', '.join (fields) + ')'
	});},
	get __eq__ () {return __get__ (this, function (self, other) {
		let names = self.__comparefields__.values ();
		let selfFields = [];
		let otherFields = [];
		for (let name of names) {
		    selfFields.push (self [name]);
		    otherFields.push (other [name]);
		}
		return list (selfFields).__eq__(list (otherFields));
	});},
	get __ne__ () {return __get__ (this, function (self, other) {
		let names = self.__comparefields__.values ();
		let selfFields = [];
		let otherFields = [];
		for (let name of names) {
		    selfFields.push (self [name]);
		    otherFields.push (other [name]);
		}
		return list (selfFields).__ne__(list (otherFields));
	});},
	get __lt__ () {return __get__ (this, function (self, other) {
		let names = self.__comparefields__.values ();
		let selfFields = [];
		let otherFields = [];
		for (let name of names) {
		    selfFields.push (self [name]);
		    otherFields.push (other [name]);
		}
		return list (selfFields).__lt__(list (otherFields));
	});},
	get __le__ () {return __get__ (this, function (self, other) {
		let names = self.__comparefields__.values ();
		let selfFields = [];
		let otherFields = [];
		for (let name of names) {
		    selfFields.push (self [name]);
		    otherFields.push (other [name]);
		}
		return list (selfFields).__le__(list (otherFields));
	});},
	get __gt__ () {return __get__ (this, function (self, other) {
		let names = self.__comparefields__.values ();
		let selfFields = [];
		let otherFields = [];
		for (let name of names) {
		    selfFields.push (self [name]);
		    otherFields.push (other [name]);
		}
		return list (selfFields).__gt__(list (otherFields));
	});},
	get __ge__ () {return __get__ (this, function (self, other) {
		let names = self.__comparefields__.values ();
		let selfFields = [];
		let otherFields = [];
		for (let name of names) {
		    selfFields.push (self [name]);
		    otherFields.push (other [name]);
		}
		return list (selfFields).__ge__(list (otherFields));
	});},
	CC: __class__ ('CC', [B], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self) {
			var kwargs = dict ();
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'self': var self = __allkwargs0__ [__attrib0__]; break;
							default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
						}
					}
					delete kwargs.__kwargtrans__;
				}
				var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
			}
			else {
				var args = tuple ();
			}
			let names = self.__initfields__.values ();
			for (let arg of args) {
			    self [names.next () .value] = arg;
			}
			for (let name of kwargs.py_keys ()) {
			    self [name] = kwargs [name];
			}
		});},
		get __repr__ () {return __get__ (this, function (self) {
			let names = self.__reprfields__.values ();
			let fields = [];
			for (let name of names) {{
			    fields.push (name + '=' + repr (self [name]));
			}}
			return  self.__name__ + '(' + ', '.join (fields) + ')'
		});},
		get __eq__ () {return __get__ (this, function (self, other) {
			let names = self.__comparefields__.values ();
			let selfFields = [];
			let otherFields = [];
			for (let name of names) {
			    selfFields.push (self [name]);
			    otherFields.push (other [name]);
			}
			return list (selfFields).__eq__(list (otherFields));
		});},
		get __ne__ () {return __get__ (this, function (self, other) {
			let names = self.__comparefields__.values ();
			let selfFields = [];
			let otherFields = [];
			for (let name of names) {
			    selfFields.push (self [name]);
			    otherFields.push (other [name]);
			}
			return list (selfFields).__ne__(list (otherFields));
		});},
		get __lt__ () {return __get__ (this, function (self, other) {
			let names = self.__comparefields__.values ();
			let selfFields = [];
			let otherFields = [];
			for (let name of names) {
			    selfFields.push (self [name]);
			    otherFields.push (other [name]);
			}
			return list (selfFields).__lt__(list (otherFields));
		});},
		get __le__ () {return __get__ (this, function (self, other) {
			let names = self.__comparefields__.values ();
			let selfFields = [];
			let otherFields = [];
			for (let name of names) {
			    selfFields.push (self [name]);
			    otherFields.push (other [name]);
			}
			return list (selfFields).__le__(list (otherFields));
		});},
		get __gt__ () {return __get__ (this, function (self, other) {
			let names = self.__comparefields__.values ();
			let selfFields = [];
			let otherFields = [];
			for (let name of names) {
			    selfFields.push (self [name]);
			    otherFields.push (other [name]);
			}
			return list (selfFields).__gt__(list (otherFields));
		});},
		get __ge__ () {return __get__ (this, function (self, other) {
			let names = self.__comparefields__.values ();
			let selfFields = [];
			let otherFields = [];
			for (let name of names) {
			    selfFields.push (self [name]);
			    otherFields.push (other [name]);
			}
			return list (selfFields).__ge__(list (otherFields));
		});},
		k: 40,
		l: 55.5,
		j: 60
	}),
	x: 10,
	y: 20,
	yy: 22,
	z: 30,
	zz: 33,
	t: 40,
	g: 100000,
	h: 100001,
	i: 100002,
	get getV () {return __get__ (this, function (self) {
		return 3;
	});},
	get setV () {return __get__ (this, function (self, value) {
		// pass;
	});},
	get getW () {return __get__ (this, function (self) {
		return 4;
	});},
	get setW () {return __get__ (this, function (self, value) {
		// pass;
	});},
	get f () {return __get__ (this, function (self, p, autoTester) {
		self.a = p;
		self.b = 2000;
		autoTester.check (self.x, self.y, self.a);
		return 'something(a: {}, b: {})'.format (self.a, self.b);
	});}
});
Object.defineProperty (C, 'v', property.call (C, C.getV, C.setV));
Object.defineProperty (C, 'w', property.call (C, C.getW, C.setW))
for (let aClass of C.CC.__bases__) {
	__mergefields__ (C.CC, aClass);
};
__mergefields__ (C.CC, {__reprfields__: new Set (['k', 'l']), __comparefields__: new Set (['k', 'l']), __initfields__: new Set (['k', 'l'])})
for (let aClass of C.__bases__) {
	__mergefields__ (C, aClass);
};
__mergefields__ (C, {__reprfields__: new Set (['y', 'yy', 'z', 'zz', 'w']), __comparefields__: new Set (['y', 'yy', 'z', 'zz', 'w']), __initfields__: new Set (['y', 'yy', 'z', 'zz'])});
export var D =  __class__ ('D', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		let names = self.__initfields__.values ();
		for (let arg of args) {
		    self [names.next () .value] = arg;
		}
		for (let name of kwargs.py_keys ()) {
		    self [name] = kwargs [name];
		}
	});},
	get __repr__ () {return __get__ (this, function (self) {
		let names = self.__reprfields__.values ();
		let fields = [];
		for (let name of names) {{
		    fields.push (name + '=' + repr (self [name]));
		}}
		return  self.__name__ + '(' + ', '.join (fields) + ')'
	});},
	get __eq__ () {return __get__ (this, function (self, other) {
		let names = self.__comparefields__.values ();
		let selfFields = [];
		let otherFields = [];
		for (let name of names) {
		    selfFields.push (self [name]);
		    otherFields.push (other [name]);
		}
		return list (selfFields).__eq__(list (otherFields));
	});},
	get __ne__ () {return __get__ (this, function (self, other) {
		let names = self.__comparefields__.values ();
		let selfFields = [];
		let otherFields = [];
		for (let name of names) {
		    selfFields.push (self [name]);
		    otherFields.push (other [name]);
		}
		return list (selfFields).__ne__(list (otherFields));
	});},
	get __lt__ () {return __get__ (this, function (self, other) {
		let names = self.__comparefields__.values ();
		let selfFields = [];
		let otherFields = [];
		for (let name of names) {
		    selfFields.push (self [name]);
		    otherFields.push (other [name]);
		}
		return list (selfFields).__lt__(list (otherFields));
	});},
	get __le__ () {return __get__ (this, function (self, other) {
		let names = self.__comparefields__.values ();
		let selfFields = [];
		let otherFields = [];
		for (let name of names) {
		    selfFields.push (self [name]);
		    otherFields.push (other [name]);
		}
		return list (selfFields).__le__(list (otherFields));
	});},
	get __gt__ () {return __get__ (this, function (self, other) {
		let names = self.__comparefields__.values ();
		let selfFields = [];
		let otherFields = [];
		for (let name of names) {
		    selfFields.push (self [name]);
		    otherFields.push (other [name]);
		}
		return list (selfFields).__gt__(list (otherFields));
	});},
	get __ge__ () {return __get__ (this, function (self, other) {
		let names = self.__comparefields__.values ();
		let selfFields = [];
		let otherFields = [];
		for (let name of names) {
		    selfFields.push (self [name]);
		    otherFields.push (other [name]);
		}
		return list (selfFields).__ge__(list (otherFields));
	});},
	_p: 3,
	get setP () {return __get__ (this, function (self, value) {
		// pass;
	});},
	get getP () {return __get__ (this, function (self) {
		return 20;
	});}
});
Object.defineProperty (D, 'p', property.call (D, D.getP, D.setP))
for (let aClass of D.__bases__) {
	__mergefields__ (D, aClass);
};
__mergefields__ (D, {__reprfields__: new Set (['_p', 'p']), __comparefields__: new Set (['_p', 'p']), __initfields__: new Set (['_p'])});
export var run = function (autoTester) {
	var c = C (__kwargtrans__ ({y: 200, zz: 330}));
	var cc = C (__kwargtrans__ ({y: 10200}));
	c.f (123, autoTester);
	c.t = 400;
	cc.f (456, autoTester);
	cc.t = 4000;
	for (var obj of tuple ([c, cc])) {
		autoTester.check (obj.x, obj.y, obj.yy, obj.z, obj.zz, obj.t, obj.a, obj.b);
	}
	autoTester.check (repr (c));
	autoTester.check (repr (cc));
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __eq__ (c, cc));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __ne__ (c, cc));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __lt__ (c, cc));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __gt__ (c, cc));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __le__ (c, cc));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __ge__ (c, cc));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __eq__ (c, c));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __ne__ (c, c));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __lt__ (c, c));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __gt__ (c, c));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __le__ (c, c));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __ge__ (c, c));
	}) ();
	var d3 = __call__ (D, null);
	var d1 = __call__ (D, null);
	var d2 = __call__ (D, null);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (repr, null, d1));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, d3, d1, __gt__ (d3, d1));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, d2, d1, __gt__ (d2, d1));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, d3, d2, __gt__ (d3, d2));
	}) ();
	var ccc = (function () {
		var __accu0__ = C;
		return __call__ (__accu0__.CC, __accu0__);
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, ccc.n, ccc.p, ccc.q, ccc.k, ccc.l);
	}) ();
};

//# sourceMappingURL=data_classes.map