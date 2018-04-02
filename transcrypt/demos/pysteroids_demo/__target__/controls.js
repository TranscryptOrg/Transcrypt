// Transcrypt'ed from Python, 2018-04-02 16:09:08
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print} from './org.transcrypt.__runtime__.js';
var __name__ = 'controls';
import {clamp} from './utils.js';

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