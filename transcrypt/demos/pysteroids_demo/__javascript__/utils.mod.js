	__nest__ (
		__all__,
		'utils', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var three = __init__ (__world__.org.threejs);
					var pad_wrap = function (min, max, val) {
						if (val < min) {
							return max;
						}
						if (val > max) {
							return min;
						}
						return val;
					};
					var XWRAP = 0;
					var XNWRAP = 0;
					var YWRAP = 0;
					var YNWRAP = 0;
					var set_limits = function (x, y) {
						XWRAP = int (x);
						XNWRAP = -(1) * XWRAP;
						YWRAP = int (y);
						YNWRAP = -(1) * YWRAP;
					};
					var wrap = function (obj) {
						var __left0__ = tuple ([obj.position.x, obj.position.y, obj.position.z]);
						var x = __left0__ [0];
						var y = __left0__ [1];
						var z = __left0__ [2];
						var x = pad_wrap (XNWRAP, XWRAP, x);
						var y = pad_wrap (YNWRAP, YWRAP, y);
						obj.position.set (x, y, z);
					};
					var clamp = function (val, low, high) {
						return max (min (val, high), low);
					};
					var sign = function (val) {
						if (val > 0) {
							return 1;
						}
						if (val < 0) {
							return -(1);
						}
						return 0;
					};
					var now = function () {
						var d = new Date;
						return d.getTime () / 1000.0;
					};
					var set_element = function (id, value) {
						document.getElementById (id).innerHTML = value;
					};
					var AABB = __class__ ('AABB', [object], {
						get __init__ () {return __get__ (this, function (self, width, height, center) {
							self.hw = width / 2.0;
							self.hh = width / 2.0;
							self.position = center;
						});},
						get contains () {return __get__ (this, function (self, item) {
							var x = self.position.x;
							var y = self.position.y;
							var h = self.hh;
							var w = self.hw;
							return item.x > x - w && item.x < x + w && item.y > y - h && item.y < y + h;
						});},
						get py_update () {return __get__ (this, function (self, pos) {
							self.position = pos;
						});}
					});
					var FPSCounter = __class__ ('FPSCounter', [object], {
						get __init__ () {return __get__ (this, function (self, hud_element) {
							self.frames = list ([0.1]);
							for (var n = 0; n < 99; n++) {
								self.frames.append (0.1);
							}
							self.next_frame = 0;
							self.average = 0;
							self.visible = true;
							self.element = hud_element;
						});},
						get py_update () {return __get__ (this, function (self, t) {
							self.frames [self.next_frame] = t;
							self.next_frame++;
							if (self.next_frame > 99) {
								self.next_frame = 0;
							}
							var sum = (function __lambda__ (a, b) {
								return a + b;
							});
							var total = 0;
							for (var n = 0; n < 100; n++) {
								total += self.frames [n];
							}
							self.average = total * 10;
							if (self.visible) {
								self.element.innerHTML = '{} fps'.format (int (1000 / self.average));
							}
						});}
					});
					var advance = function (cr, value) {
						(function () {return cr.next (value).value}) ();
					};
					var coroutine = function (loop, callback) {
						var callback_fn = (callback !== null ? callback : (function __lambda__ (a) {
							return a;
						}));
						var coroutine_generator = function* () {
							var alive = true;
							var result = null;
							while (alive) {
								var next_value = yield;
								var __left0__ = loop (next_value);
								var alive = __left0__ [0];
								var result = __left0__ [1];
								yield result;
							}
							yield callback_fn (result);
						};
						var cr = coroutine_generator ();
						cr.advance = (function __lambda__ (a) {
							return advance (cr, a);
						});
						return cr;
					};
					var timer = function (duration, loop, callback) {
						var expires_at = now () + duration;
						var loop_fn = (loop !== null ? loop : (function __lambda__ (a) {
							return tuple ([true, a]);
						}));
						var callback_fn = (callback !== null ? callback : (function __lambda__ (a) {
							return a;
						}));
						var timer_coroutine = function* () {
							var alive = true;
							var result = null;
							while (alive) {
								var next_value = yield;
								var __left0__ = loop_fn (next_value);
								var alive = __left0__ [0];
								var result = __left0__ [1];
								var alive = alive && now () < expires_at;
								yield result;
							}
							yield callback_fn (result);
						};
						var tc = timer_coroutine ();
						tc.advance = (function __lambda__ (a) {
							return advance (tc, a);
						});
						return tc;
					};
					__pragma__ ('<use>' +
						'org.threejs' +
					'</use>')
					__pragma__ ('<all>')
						__all__.AABB = AABB;
						__all__.FPSCounter = FPSCounter;
						__all__.XNWRAP = XNWRAP;
						__all__.XWRAP = XWRAP;
						__all__.YNWRAP = YNWRAP;
						__all__.YWRAP = YWRAP;
						__all__.advance = advance;
						__all__.clamp = clamp;
						__all__.coroutine = coroutine;
						__all__.now = now;
						__all__.pad_wrap = pad_wrap;
						__all__.set_element = set_element;
						__all__.set_limits = set_limits;
						__all__.sign = sign;
						__all__.three = three;
						__all__.timer = timer;
						__all__.wrap = wrap;
					__pragma__ ('</all>')
				}
			}
		}
	);
