	__nest__ (
		__all__,
		'controls', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var clamp = __init__ (__world__.utils).clamp;
					var Keyboard = __class__ ('Keyboard', [object], {
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
					var ControlAxis = __class__ ('ControlAxis', [object], {
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
					__pragma__ ('<use>' +
						'utils' +
					'</use>')
					__pragma__ ('<all>')
						__all__.ControlAxis = ControlAxis;
						__all__.Keyboard = Keyboard;
						__all__.clamp = clamp;
					__pragma__ ('</all>')
				}
			}
		}
	);
