	(function () {
		var Turtle = __init__ (__world__.turtle).Turtle;
		var _allTurtles = __init__ (__world__.turtle)._allTurtles;
		var _debug = __init__ (__world__.turtle)._debug;
		var _defaultElement = __init__ (__world__.turtle)._defaultElement;
		var _defaultTurtle = __init__ (__world__.turtle)._defaultTurtle;
		var _height = __init__ (__world__.turtle)._height;
		var _ns = __init__ (__world__.turtle)._ns;
		var _offset = __init__ (__world__.turtle)._offset;
		var _rightSize = __init__ (__world__.turtle)._rightSize;
		var _svg = __init__ (__world__.turtle)._svg;
		var _timer = __init__ (__world__.turtle)._timer;
		var _width = __init__ (__world__.turtle)._width;
		var abs = __init__ (__world__.turtle).abs;
		var back = __init__ (__world__.turtle).back;
		var begin_fill = __init__ (__world__.turtle).begin_fill;
		var bgcolor = __init__ (__world__.turtle).bgcolor;
		var circle = __init__ (__world__.turtle).circle;
		var clear = __init__ (__world__.turtle).clear;
		var color = __init__ (__world__.turtle).color;
		var distance = __init__ (__world__.turtle).distance;
		var done = __init__ (__world__.turtle).done;
		var down = __init__ (__world__.turtle).down;
		var end_fill = __init__ (__world__.turtle).end_fill;
		var forward = __init__ (__world__.turtle).forward;
		var goto = __init__ (__world__.turtle).goto;
		var home = __init__ (__world__.turtle).home;
		var left = __init__ (__world__.turtle).left;
		var ontimer = __init__ (__world__.turtle).ontimer;
		var pensize = __init__ (__world__.turtle).pensize;
		var pos = __init__ (__world__.turtle).pos;
		var position = __init__ (__world__.turtle).position;
		var reset = __init__ (__world__.turtle).reset;
		var right = __init__ (__world__.turtle).right;
		var setDefaultElement = __init__ (__world__.turtle).setDefaultElement;
		var up = __init__ (__world__.turtle).up;
		var _array = __init__ (__world__.random)._array;
		var _bitmask1 = __init__ (__world__.random)._bitmask1;
		var _bitmask2 = __init__ (__world__.random)._bitmask2;
		var _bitmask3 = __init__ (__world__.random)._bitmask3;
		var _fill_array = __init__ (__world__.random)._fill_array;
		var _index = __init__ (__world__.random)._index;
		var _random_integer = __init__ (__world__.random)._random_integer;
		var choice = __init__ (__world__.random).choice;
		var randint = __init__ (__world__.random).randint;
		var random = __init__ (__world__.random).random;
		var seed = __init__ (__world__.random).seed;
		var colors = tuple (['gray', 'green', 'red', 'white', 'blue', 'yellow']);
		var delta = 8;
		var threshold = 100;
		color ('black', 'black');
		var maybe = function (bias) {
			if (typeof bias == 'undefined' || (bias != null && bias .__class__ == __kwargdict__)) {;
				var bias = null;
			};
			return choice ((bias != null ? list ([false, true, bias, bias]) : list ([false, true])));
		};
		var between = function (a, b) {
			return a + (0.2 + 0.3 * random ()) * (b - a);
		};
		var recentColors = list (['black', 'black']);
		var originalColor = function () {
			while (true) {
				var result = choice (colors);
				if (!(__in__ (result, recentColors))) {
					recentColors = list ([result, recentColors [0]]);
					return result;
				}
			}
		};
		var rect = function (xMin, yMin, xMax, yMax) {
			var __iter0__ = tuple (['black', originalColor ()]);
			for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
				var aColor = __iter0__ [__index0__];
				color (aColor, aColor);
				up ();
				goto (xMin, yMin);
				down ();
				begin_fill ();
				goto (xMax, yMin);
				goto (xMax, yMax);
				goto (xMin, yMax);
				goto (xMin, yMin);
				end_fill ();
				xMin += delta;
				yMin += delta;
				xMax -= delta;
				yMax -= delta;
			}
		};
		var draw = function (xMin, yMin, xMax, yMax) {
			if (xMax - xMin > threshold && yMax - yMin > threshold) {
				if (maybe (xMax - xMin > yMax - yMin)) {
					var xMid = between (xMin, xMax);
					if (maybe ()) {
						draw (xMin, yMin, xMid, yMax);
						rect (xMid, yMin, xMax, yMax);
					}
					else {
						rect (xMin, yMin, xMid, yMax);
						draw (xMid, yMin, xMax, yMax);
					}
				}
				else {
					var yMid = between (yMin, yMax);
					if (maybe ()) {
						draw (xMin, yMin, xMax, yMid);
						rect (xMin, yMid, xMax, yMax);
					}
					else {
						rect (xMin, yMin, xMax, yMid);
						draw (xMin, yMid, xMax, yMax);
					}
				}
			}
			else {
				rect (xMin, yMin, xMax, yMax);
				done ();
			}
		};
		ontimer ((function __lambda__ () {
			return draw (-(250), -(300), 250, 300);}), 800);
		__pragma__ ('<use>' +
			'random' +
			'turtle' +
		'</use>')
		__pragma__ ('<all>')
			__all__.between = between;
			__all__.colors = colors;
			__all__.delta = delta;
			__all__.draw = draw;
			__all__.maybe = maybe;
			__all__.originalColor = originalColor;
			__all__.recentColors = recentColors;
			__all__.rect = rect;
			__all__.threshold = threshold;
		__pragma__ ('</all>')
	}) ();
