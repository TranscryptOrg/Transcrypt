	__nest__ (
		__all__,
		'turtle', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var abs = function (vec2D) {
						return Math.sqrt (vec2D [0] * vec2D [0] + vec2D [1] * vec2D [1]);
					};
					var _ns = 'http://www.w3.org/2000/svg';
					var _svg = document.createElementNS (_ns, 'svg');
					document.body.appendChild (_svg);
					var _width = 0;
					var _height = 0;
					var _offset = 0;
					var rightSize = function (self) {
						_width = window.innerWidth;
						_height = window.innerHeight;
						_offset = list ([Math.floor (_width / 2), Math.floor (_height / 2)]);
						_svg.setAttribute ('width', _width);
						_svg.setAttribute ('height', _height);
					};
					window.onresize = rightSize;
					rightSize ();
					var Turtle = __class__ ('Turtle', [object], {
						get __init__ () {return __get__ (this, function (self) {
							self.reset ();
						});},
						get reset () {return __get__ (this, function (self) {
							self.clear ();
							self.pensize (1);
							self.color ('black');
							self._heading = Math.PI / 2;
							self.home ();
							self.down ();
						});},
						get clear () {return __get__ (this, function (self) {
							self._path = list ([]);
						});},
						get done () {return __get__ (this, function (self) {
							var path = document.createElementNS (_ns, 'path');
							path.setAttribute ('stroke', (self._pencolor == null ? 'none' : self._pencolor));
							path.setAttribute ('fill', (self._fillcolor == null ? 'none' : self._fillcolor));
							path.setAttribute ('fill-rule', 'evenodd');
							path.setAttribute ('d', self._path);
							_svg.appendChild (path);
						});},
						get pensize () {return __get__ (this, function (self, width) {
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
							self._pencolor = pencolor;
							self._fillcolor = fillcolor;
						});},
						get home () {return __get__ (this, function (self) {
							self.goto (0, 0);
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
							self._path.append ('{} {} {}'.format ('M', self._position [0] + _offset [0], self._position [1] + _offset [1]));
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
						get forward () {return __get__ (this, function (self, length) {
							var delta = list ([Math.sin (self._heading), Math.cos (self._heading)]);
							self._position [0] += length * delta [0];
							self._position [1] += length * delta [1];
							self._path.append ('{} {} {}'.format ((self._down ? 'L' : 'M'), self._position [0] + _offset [0], self._position [1] + _offset [1]));
						});},
						get back () {return __get__ (this, function (self, length) {
							self.forward (-(length));
						});},
						get left () {return __get__ (this, function (self, angle) {
							self._heading = (self._heading + (Math.PI * angle) / 180) % (2 * Math.PI);
						});},
						get right () {return __get__ (this, function (self, angle) {
							self.left (-(angle));
						});},
						get begin_fill () {return __get__ (this, function (self) {
							// pass;
						});},
						get end_fill () {return __get__ (this, function (self) {
							// pass;
						});}
					});
					var _defaultTurtle = Turtle ();
					var reset = function () {
						_defaultTurtle.reset ();
					};
					var clear = function () {
						_defaultTurtle.clear ();
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
						_defaultTurtle.back (lenght);
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
						__all__._defaultTurtle = _defaultTurtle;
						__all__._height = _height;
						__all__._ns = _ns;
						__all__._offset = _offset;
						__all__._svg = _svg;
						__all__._width = _width;
						__all__.abs = abs;
						__all__.back = back;
						__all__.begin_fill = begin_fill;
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
						__all__.rightSize = rightSize;
						__all__.up = up;
					__pragma__ ('</all>')
				}
			}
		}
	);
