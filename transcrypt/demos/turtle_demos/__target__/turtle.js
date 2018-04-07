// Transcrypt'ed from Python, 2018-04-07 16:10:26
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var __name__ = 'turtle';
export var _debug = false;
export var _ns = 'http://www.w3.org/2000/svg';
export var _svg = document.createElementNS (_ns, 'svg');
export var _defaultElement = document.getElementById ('__turtlegraph__');
if (!(_defaultElement)) {
	var _defaultElement = document.body;
}
_defaultElement.appendChild (_svg);
export var _width = null;
export var _height = null;
export var _offset = null;
export var _rightSize = function (self) {
	_width = _defaultElement.offsetWidth;
	_height = _defaultElement.offsetHeight;
	_offset = list ([Math.floor (_width / 2), Math.floor (_height / 2)]);
	_svg.setAttribute ('width', _width);
	_svg.setAttribute ('height', _height);
};
window.onresize = _rightSize;
_rightSize ();
export var bgcolor = function (color) {
	var _bgcolor = color;
	_defaultElement.style.backgroundColor = _bgcolor;
};
bgcolor ('white');
export var setDefaultElement = function (element) {
	_defaultElement.removeChild (_svg);
	_defaultElement = element;
	element.appendChild (_svg);
	_rightSize ();
	bgcolor ('white');
};
export var _allTurtles = list ([]);

export var Turtle =  __class__ ('Turtle', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		_allTurtles.append (self);
		self._paths = list ([]);
		self.reset ();
	});},
	get reset () {return __get__ (this, function (self) {
		self._heading = Math.PI / 2;
		self.pensize (1);
		self.color ('black', 'black');
		self.down ();
		self._track = list ([]);
		self.home ();
		self.py_clear ();
	});},
	get py_clear () {return __get__ (this, function (self) {
		for (var path of self._paths) {
			_svg.removeChild (path);
		}
		self._paths = list ([]);
		self._track = list ([]);
		self._moveto (self._position);
	});},
	get _flush () {return __get__ (this, function (self) {
		if (_debug) {
			print ('Flush:', self._track);
		}
		if (len (self._track) > 1) {
			var path = document.createElementNS (_ns, 'path');
			path.setAttribute ('d', ' '.join (self._track));
			path.setAttribute ('stroke', (self._pencolor != null ? self._pencolor : 'none'));
			path.setAttribute ('stroke-width', self._pensize);
			path.setAttribute ('fill', (self._fill && self._fillcolor != null ? self._fillcolor : 'none'));
			path.setAttribute ('fill-rule', 'evenodd');
			_svg.appendChild (path);
			self._paths.append (path);
			self._track = list ([]);
			self._moveto (self._position);
		}
	});},
	get done () {return __get__ (this, function (self) {
		self._flush ();
	});},
	get pensize () {return __get__ (this, function (self, width) {
		self._flush ();
		if (width == null) {
			return self._pensize;
		}
		else {
			self._pensize = width;
		}
	});},
	get color () {return __get__ (this, function (self, pencolor, fillcolor) {
		if (typeof fillcolor == 'undefined' || (fillcolor != null && fillcolor .hasOwnProperty ("__kwargtrans__"))) {;
			var fillcolor = null;
		};
		self._flush ();
		self._pencolor = pencolor;
		if (fillcolor != null) {
			self._fillcolor = fillcolor;
		}
	});},
	get goto () {return __get__ (this, function (self, x, y) {
		if (typeof y == 'undefined' || (y != null && y .hasOwnProperty ("__kwargtrans__"))) {;
			var y = null;
		};
		if (y == null) {
			self._position = x;
		}
		else {
			self._position = list ([x, y]);
		}
		self._track.append ('{} {} {}'.format ((self._down ? 'L' : 'M'), self._position [0] + _offset [0], self._position [1] + _offset [1]));
	});},
	get _moveto () {return __get__ (this, function (self, x, y) {
		if (typeof y == 'undefined' || (y != null && y .hasOwnProperty ("__kwargtrans__"))) {;
			var y = null;
		};
		var wasdown = self.isdown ();
		self.up ();
		self.goto (x, y);
		if (wasdown) {
			self.down ();
		}
	});},
	get home () {return __get__ (this, function (self) {
		self._moveto (0, 0);
	});},
	get position () {return __get__ (this, function (self) {
		return self._position.__getslice__ (0, null, 1);
	});},
	get pos () {return __get__ (this, function (self) {
		return self.position ();
	});},
	get distance () {return __get__ (this, function (self, x, y) {
		if (typeof y == 'undefined' || (y != null && y .hasOwnProperty ("__kwargtrans__"))) {;
			var y = null;
		};
		if (y == null) {
			var other = x;
		}
		else {
			var other = list ([x, y]);
		}
		var dX = other [0] - self._position [0];
		var dY = other [1] - self._position [1];
		return Math.sqrt (dX * dX + dY * dY);
	});},
	get up () {return __get__ (this, function (self) {
		self._down = false;
	});},
	get down () {return __get__ (this, function (self) {
		self._down = true;
	});},
	get isdown () {return __get__ (this, function (self) {
		return self._down;
	});},
	get _predict () {return __get__ (this, function (self, length) {
		var delta = list ([Math.sin (self._heading), Math.cos (self._heading)]);
		return list ([self._position [0] + length * delta [0], self._position [1] + length * delta [1]]);
	});},
	get forward () {return __get__ (this, function (self, length) {
		self._position = self._predict (length);
		self._track.append ('{} {} {}'.format ((self._down ? 'L' : 'M'), self._position [0] + _offset [0], self._position [1] + _offset [1]));
	});},
	get back () {return __get__ (this, function (self, length) {
		self.forward (-(length));
	});},
	get circle () {return __get__ (this, function (self, radius) {
		self.left (90);
		var opposite = self._predict (2 * (radius + 1) + 1);
		self.right (90);
		self._track.append ('{} {} {} {} {} {} {} {}'.format ('A', radius, radius, 0, 1, 0, opposite [0] + _offset [0], opposite [1] + _offset [1]));
		self._track.append ('{} {} {} {} {} {} {} {}'.format ('A', radius, radius, 0, 1, 0, self._position [0] + _offset [0], self._position [1] + _offset [1]));
	});},
	get left () {return __get__ (this, function (self, angle) {
		self._heading = __mod__ (self._heading + (Math.PI * angle) / 180, 2 * Math.PI);
	});},
	get right () {return __get__ (this, function (self, angle) {
		self.left (-(angle));
	});},
	get begin_fill () {return __get__ (this, function (self) {
		self._flush ();
		self._fill = true;
	});},
	get end_fill () {return __get__ (this, function (self) {
		self._flush ();
		self._fill = false;
	});},
	get speed () {return __get__ (this, function (speed) {
		if (typeof speed == 'undefined' || (speed != null && speed .hasOwnProperty ("__kwargtrans__"))) {;
			var speed = null;
		};
		// pass;
	});}
});
export var _defaultTurtle = Turtle ();
export var _timer = null;
export var reset = function () {
	if (_timer) {
		clearTimeout (_timer);
	}
	bgcolor ('white');
	for (var turtle of _allTurtles) {
		turtle.reset ();
		turtle.done ();
	}
};
export var py_clear = function () {
	for (var turtle of _allTurtles) {
		turtle.py_clear ();
	}
};
export var ontimer = function (fun, t) {
	if (typeof t == 'undefined' || (t != null && t .hasOwnProperty ("__kwargtrans__"))) {;
		var t = 0;
	};
	_timer = setTimeout (fun, t);
};
export var done = function () {
	_defaultTurtle.done ();
};
export var pensize = function (width) {
	_defaultTurtle.pensize (width);
};
export var color = function (pencolor, fillcolor) {
	if (typeof fillcolor == 'undefined' || (fillcolor != null && fillcolor .hasOwnProperty ("__kwargtrans__"))) {;
		var fillcolor = null;
	};
	_defaultTurtle.color (pencolor, fillcolor);
};
export var home = function () {
	_defaultTurtle.home ();
};
export var goto = function (x, y) {
	if (typeof y == 'undefined' || (y != null && y .hasOwnProperty ("__kwargtrans__"))) {;
		var y = null;
	};
	_defaultTurtle.goto (x, y);
};
export var position = function () {
	return _defaultTurtle.position ();
};
export var pos = function () {
	return _defaultTurtle.pos ();
};
export var distance = function (x, y) {
	if (typeof y == 'undefined' || (y != null && y .hasOwnProperty ("__kwargtrans__"))) {;
		var y = null;
	};
	return _defaultTurtle.distance (x, y);
};
export var up = function () {
	_defaultTurtle.up ();
};
export var down = function () {
	_defaultTurtle.down ();
};
export var forward = function (length) {
	_defaultTurtle.forward (length);
};
export var back = function (length) {
	_defaultTurtle.back (length);
};
export var circle = function (radius) {
	_defaultTurtle.circle (radius);
};
export var left = function (angle) {
	_defaultTurtle.left (angle);
};
export var right = function (angle) {
	_defaultTurtle.right (angle);
};
export var begin_fill = function () {
	_defaultTurtle.begin_fill ();
};
export var end_fill = function () {
	_defaultTurtle.end_fill ();
};
export var speed = function (speed) {
	_defaultTurtle.speed (speed);
};
export {};

//# sourceMappingURL=turtle.map