// Transcrypt'ed from Python, 2021-05-14 15:01:25
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get Animal () {return Animal;}, set Animal (value) {Animal = value;}, get Plant () {return Plant;}, set Plant (value) {Plant = value;}, get Stone () {return Stone;}, set Stone (value) {Stone = value;}, get Uppercaser () {return Uppercaser;}, set Uppercaser (value) {Uppercaser = value;}, get UppercaserMeta () {return UppercaserMeta;}, set UppercaserMeta (value) {UppercaserMeta = value;}, get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get run () {return run;}, set run (value) {run = value;}});
var __name__ = 'metaclasses';
export var UppercaserMeta =  __class__ ('UppercaserMeta', [py_metatype], {
	__module__: __name__,
	get __new__ () {return __get__ (this, function (meta, py_name, bases, attribs) {
		var upperAttribs = {};
		for (var attribKey in attribs) {
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

//# sourceMappingURL=metaclasses.map