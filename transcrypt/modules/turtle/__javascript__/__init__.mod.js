	__nest__ (
		__all__,
		'turtle', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var _debug = false;
					var abs = function (vec2D) {
						return Math.sqrt (vec2D [0] * vec2D [0] + vec2D [1] * vec2D [1]);
					};
					var _ns = 'http://www.w3.org/2000/svg';
					var _svg = document.createElementNS (_ns, 'svg');
					var _defaultElement = document.body;
					_defaultElement.appendChild (_svg);
					var _width = null;
					var _height = null;
					var _offset = null;
					var _rightSize = function (self) {
						_width = _defaultElement.offsetWidth;
						_height = _defaultElement.offsetHeight;
						_offset = list ([Math.floor (_width / 2), Math.floor (_height / 2)]);
						_svg.setAttribute ('width', _width);
						_svg.setAttribute ('height', _height);
					};
					window.onresize = _rightSize;
					_rightSize ();
					var bgcolor = function (color) {
						var _bgcolor = color;
						_defaultElement.style.backgroundColor = _bgcolor;
					};
					bgcolor ('white');
					var setDefaultElement = function (element) {
						_defaultElement.removeChild (_svg);
						_defaultElement = element;
						element.appendChild (_svg);
						_rightSize ();
						bgcolor ('white');
					};
					var _allTurtles = list ([]);
					var Turtle = __class__ ('Turtle', [object], {
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
							self.clear ();
						});},
						get clear () {return __get__ (this, function (self) {
							var __iter0__ = self._paths;
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var path = __iter0__ [__index0__];
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
							if (typeof fillcolor == 'undefined' || (fillcolor != null && fillcolor .__class__ == __kwargdict__)) {;
								var fillcolor = null;
							};
							self._flush ();
							self._pencolor = pencolor;
							if (fillcolor != null) {
								self._fillcolor = fillcolor;
							}
						});},
						get goto () {return __get__ (this, function (self, x, y) {
							if (typeof y == 'undefined' || (y != null && y .__class__ == __kwargdict__)) {;
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
							if (typeof y == 'undefined' || (y != null && y .__class__ == __kwargdict__)) {;
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
							if (typeof y == 'undefined' || (y != null && y .__class__ == __kwargdict__)) {;
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
							self._heading = (self._heading + (Math.PI * angle) / 180) % (2 * Math.PI);
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
						});}
					});
					var _defaultTurtle = Turtle ();
					var reset = function () {
						bgcolor ('white');
						var __iter0__ = _allTurtles;
						for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
							var turtle = __iter0__ [__index0__];
							turtle.reset ();
							turtle.done ();
						}
					};
					var clear = function () {
						var __iter0__ = _allTurtles;
						for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
							var turtle = __iter0__ [__index0__];
							turtle.clear ();
						}
					};
					var done = function () {
						_defaultTurtle.done ();
					};
					var pensize = function (width) {
						_defaultTurtle.pensize (width);
					};
					var color = function (pencolor, fillcolor) {
						if (typeof fillcolor == 'undefined' || (fillcolor != null && fillcolor .__class__ == __kwargdict__)) {;
							var fillcolor = null;
						};
						_defaultTurtle.color (pencolor, fillcolor);
					};
					var home = function () {
						_defaultTurtle.home ();
					};
					var goto = function (x, y) {
						if (typeof y == 'undefined' || (y != null && y .__class__ == __kwargdict__)) {;
							var y = null;
						};
						_defaultTurtle.goto (x, y);
					};
					var position = function () {
						return _defaultTurtle.position ();
					};
					var pos = function () {
						return _defaultTurtle.pos ();
					};
					var distance = function (x, y) {
						if (typeof y == 'undefined' || (y != null && y .__class__ == __kwargdict__)) {;
							var y = null;
						};
						return _defaultTurtle.distance (x, y);
					};
					var up = function () {
						_defaultTurtle.up ();
					};
					var down = function () {
						_defaultTurtle.down ();
					};
					var forward = function (length) {
						_defaultTurtle.forward (length);
					};
					var back = function (length) {
						_defaultTurtle.back (length);
					};
					var circle = function (radius) {
						_defaultTurtle.circle (radius);
					};
					var left = function (angle) {
						_defaultTurtle.left (angle);
					};
					var right = function (angle) {
						_defaultTurtle.right (angle);
					};
					var begin_fill = function () {
						_defaultTurtle.begin_fill ();
					};
					var end_fill = function () {
						_defaultTurtle.end_fill ();
					};
					__pragma__ ('<all>')
						__all__.Turtle = Turtle;
						__all__._allTurtles = _allTurtles;
						__all__._debug = _debug;
						__all__._defaultElement = _defaultElement;
						__all__._defaultTurtle = _defaultTurtle;
						__all__._height = _height;
						__all__._ns = _ns;
						__all__._offset = _offset;
						__all__._rightSize = _rightSize;
						__all__._svg = _svg;
						__all__._width = _width;
						__all__.abs = abs;
						__all__.back = back;
						__all__.begin_fill = begin_fill;
						__all__.bgcolor = bgcolor;
						__all__.circle = circle;
						__all__.clear = clear;
						__all__.color = color;
						__all__.distance = distance;
						__all__.done = done;
						__all__.down = down;
						__all__.end_fill = end_fill;
						__all__.forward = forward;
						__all__.goto = goto;
						__all__.home = home;
						__all__.left = left;
						__all__.pensize = pensize;
						__all__.pos = pos;
						__all__.position = position;
						__all__.reset = reset;
						__all__.right = right;
						__all__.setDefaultElement = setDefaultElement;
						__all__.up = up;
					__pragma__ ('</all>')
				}
			}
		}
	);
