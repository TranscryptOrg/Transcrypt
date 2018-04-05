// Transcrypt'ed from Python, 2018-04-05 23:14:06
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var __name__ = 'utils';
import * as three from './org.threejs.js';
export var pad_wrap = function (min, max, val) {
	if (val < min) {
		return max;
	}
	if (val > max) {
		return min;
	}
	return val;
};
export var XWRAP = 0;
export var XNWRAP = 0;
export var YWRAP = 0;
export var YNWRAP = 0;
export var set_limits = function (x, y) {
	XWRAP = int (x);
	XNWRAP = -(1) * XWRAP;
	YWRAP = int (y);
	YNWRAP = -(1) * YWRAP;
};
export var wrap = function (obj) {
	var __left0__ = tuple ([obj.position.x, obj.position.y, obj.position.z]);
	var x = __left0__ [0];
	var y = __left0__ [1];
	var z = __left0__ [2];
	var x = pad_wrap (XNWRAP, XWRAP, x);
	var y = pad_wrap (YNWRAP, YWRAP, y);
	obj.position.set (x, y, z);
};
export var clamp = function (val, low, high) {
	return max (min (val, high), low);
};
export var sign = function (val) {
	if (val > 0) {
		return 1;
	}
	if (val < 0) {
		return -(1);
	}
	return 0;
};
export var now = function () {
	var d = new Date;
	return d.getTime () / 1000.0;
};
export var set_element = function (id, value) {
	document.getElementById (id).innerHTML = value;
};

export var AABB =  __class__ ('AABB', [object], {
	__module__: __name__,
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

export var FPSCounter =  __class__ ('FPSCounter', [object], {
	__module__: __name__,
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
export var advance = function (cr, value) {
	(function () {return cr.next (value).value}) ();
};
export var coroutine = function (loop, callback) {
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
export var timer = function (duration, loop, callback) {
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

//# sourceMappingURL=utils.map