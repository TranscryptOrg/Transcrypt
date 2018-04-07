// Transcrypt'ed from Python, 2018-04-07 19:09:37
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __globals__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __merge__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setProperty__, __setitem__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {clamp} from './utils.js';
var __name__ = 'controls';

export var Keyboard =  __class__ ('Keyboard', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.keyboard = dict ({0: false});
		self.handlers = dict ({});
	});},
	get key_down () {return __get__ (this, function (self, key) {
		self.keyboard [key.key] = true;
	});},
	get key_up () {return __get__ (this, function (self, key) {
		self.keyboard [key.key] = false;
	});},
	get py_get () {return __get__ (this, function (self, key) {
		return self.keyboard.py_get (key, false);
	});},
	get get_axis () {return __get__ (this, function (self, key) {
		return self.handlers [key].value;
	});},
	get add_handler () {return __get__ (this, function (self, py_name, handler) {
		self.handlers [py_name] = handler;
	});},
	get py_update () {return __get__ (this, function (self, interval) {
		for (var [_, eachhandler] of self.handlers.py_items ()) {
			eachhandler.py_update (self, interval);
		}
	});},
	get py_clear () {return __get__ (this, function (self, axis) {
		self.handlers.py_get (axis).value = 0;
	});}
});

export var ControlAxis =  __class__ ('ControlAxis', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, positive_key, negative_key, attack, decay, deadzone) {
		if (typeof attack == 'undefined' || (attack != null && attack .hasOwnProperty ("__kwargtrans__"))) {;
			var attack = 1;
		};
		if (typeof decay == 'undefined' || (decay != null && decay .hasOwnProperty ("__kwargtrans__"))) {;
			var decay = 0;
		};
		if (typeof deadzone == 'undefined' || (deadzone != null && deadzone .hasOwnProperty ("__kwargtrans__"))) {;
			var deadzone = 0.02;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'positive_key': var positive_key = __allkwargs0__ [__attrib0__]; break;
						case 'negative_key': var negative_key = __allkwargs0__ [__attrib0__]; break;
						case 'attack': var attack = __allkwargs0__ [__attrib0__]; break;
						case 'decay': var decay = __allkwargs0__ [__attrib0__]; break;
						case 'deadzone': var deadzone = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self.positive = positive_key;
		self.negative = negative_key;
		self.attack = attack;
		self.decay = decay;
		self.deadzone = deadzone;
		self.value = 0;
	});},
	get py_update () {return __get__ (this, function (self, keyboard, interval) {
		self.value -= (interval * self.decay) * self.value;
		var dz = abs (self.value) < self.deadzone;
		if (keyboard.py_get (self.positive)) {
			var dz = false;
			self.value += interval * self.attack;
		}
		if (keyboard.py_get (self.negative)) {
			var dz = false;
			self.value -= interval * self.attack;
		}
		if (dz) {
			self.value = 0;
		}
		else {
			self.value = clamp (self.value, -(1), 1);
		}
	});}
});

//# sourceMappingURL=controls.map