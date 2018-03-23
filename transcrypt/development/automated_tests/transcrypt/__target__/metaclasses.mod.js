import {__envir__, __nest__, __init__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, complex, __conj__, __Terminal__, __terminal__, print} from './org.transcrypt.__runtime__.mod.js';
var __name__ = 'metaclasses';
export var UppercaserMeta =  __class__ ('UppercaserMeta', [py_metatype], {
	__module__: __name__,
	get __new__ () {return __get__ (this, function (meta, py_name, bases, attribs) {
		var upperAttribs = {};
		for (var attribKey in attribs) {
			upperAttribs [(attribKey.startswith ('__') ? attribKey : attribKey.upper ())] = attribs [attribKey];
		}
		return py_metatype.__new__ (meta, py_name, bases, upperAttribs);
	});}
});
export var Uppercaser =  __class__ ('Uppercaser', [object], {
	__module__: __name__,
}, UppercaserMeta);
export var Animal =  __class__ ('Animal', [Uppercaser], {
	__module__: __name__,
	Thoughts: __class__ ('Thoughts', [object], {
		__module__: __name__,
		quantity: 7
	}),
	color: 'Brown',
	state: 'Moving',
	get move () {return __get__ (this, function (self) {
		return 'Move';
	});}
});
export var Plant =  __class__ ('Plant', [Uppercaser], {
	__module__: __name__,
	Thoughts: __class__ ('Thoughts', [object], {
		__module__: __name__,
		quantity: 6
	}),
	color: 'Green',
	state: 'Growing',
	get grow () {return __get__ (this, function (self) {
		return 'Grow';
	});}
});
export var Stone =  __class__ ('Stone', [object], {
	__module__: __name__,
	Thoughts: __class__ ('Thoughts', [object], {
		__module__: __name__,
		quantity: 5
	}),
	color: 'Gray',
	get be () {return __get__ (this, function (self) {
		return 'Being';
	});}
});
export var run = function (autoTester) {
	var animal = Animal ();
	autoTester.check (animal.THOUGHTS.quantity, Animal.COLOR, animal.COLOR, animal.MOVE ());
	var plant = Plant ();
	autoTester.check (plant.THOUGHTS.quantity, Plant.COLOR, plant.COLOR, plant.GROW ());
	var stone = Stone ();
	autoTester.check (stone.Thoughts.quantity, Stone.color, stone.color, stone.be ());
};