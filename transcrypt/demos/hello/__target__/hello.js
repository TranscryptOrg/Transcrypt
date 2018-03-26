/* 000001 */ // Transcrypt'ed from Python, 2018-03-26 19:26:55
/* 000001 */ import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, round, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print} from './org.transcrypt.__runtime__.js';
/* 000001 */ var __name__ = '__main__';
/* 000001 */ import {chain} from './itertools.js';
/* 000003 */ 
/* 000003 */ export var SolarSystem =  __class__ ('SolarSystem', [object], {
/* 000003 */ 	__module__: __name__,
/* 000003 */ 	planets: (function () {
/* 000003 */ 		var __accu0__ = [];
/* 000004 */ 		for (var [index, planet] of enumerate (tuple ([tuple (['Mercury', 'hot', 2240]), tuple (['Venus', 'sulphurous', 6052]), tuple (['Earth', 'fertile', 6378]), tuple (['Mars', 'reddish', 3397]), tuple (['Jupiter', 'stormy', 71492]), tuple (['Saturn', 'ringed', 60268]), tuple (['Uranus', 'cold', 25559]), tuple (['Neptune', 'very cold', 24766])]))) {
/* 000004 */ 			__accu0__.append (list (chain (planet, tuple ([index + 1]))));
/* 000004 */ 		}
/* 000004 */ 		return __accu0__;
/* 000004 */ 	}) (),
/* 000015 */ 	lines: tuple (['{} is a {} planet', 'The radius of {} is {} km', '{} is planet nr. {} counting from the sun']),
/* 000021 */ 	get __init__ () {return __get__ (this, function (self) {
/* 000022 */ 		self.lineIndex = 0;
/* 000022 */ 	});},
/* 000024 */ 	get greet () {return __get__ (this, function (self) {
/* 000025 */ 		self.planet = self.planets [int (Math.random () * len (self.planets))];
/* 000026 */ 		document.getElementById ('greet').innerHTML = 'Hello {}'.format (self.planet [0]);
/* 000027 */ 		self.explain ();
/* 000027 */ 	});},
/* 000029 */ 	get explain () {return __get__ (this, function (self) {
/* 000031 */ 		document.getElementById ('explain').innerHTML = self.lines [self.lineIndex].format (self.planet [0], self.planet [self.lineIndex + 1]);
/* 000033 */ 		self.lineIndex = __mod__ (self.lineIndex + 1, 3);
/* 000033 */ 	});}
/* 000033 */ });
/* 000035 */ export var solarSystem = SolarSystem ();
/* 000035 */ 