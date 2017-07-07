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
		var py_clear = __init__ (__world__.turtle).py_clear;
		var reset = __init__ (__world__.turtle).reset;
		var right = __init__ (__world__.turtle).right;
		var setDefaultElement = __init__ (__world__.turtle).setDefaultElement;
		var speed = __init__ (__world__.turtle).speed;
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
		speed (0);
		var colors = tuple (['gray', 'green', 'red', 'white', 'blue', 'yellow']);
		var delta = 8;
		var threshold = 100;
		color ('black', 'black');
		var maybe = function (bias) {
			if (typeof bias == 'undefined' || (bias != null && bias .hasOwnProperty ("__kwargtrans__"))) {;
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
				if (result == 'white' || !(__in__ (result, recentColors))) {
					recentColors = list ([result, recentColors [0]]);
					print (result, __kwargtrans__ ({end: ' '}));
					return result;
				}
			}
		};
		var rect = function (xMin, yMin, xMax, yMax) {
			for (var aColor of tuple (['black', originalColor ()])) {
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
			if (typeof xMin == 'undefined' || (xMin != null && xMin .hasOwnProperty ("__kwargtrans__"))) {;
				var xMin = -(250);
			};
			if (typeof yMin == 'undefined' || (yMin != null && yMin .hasOwnProperty ("__kwargtrans__"))) {;
				var yMin = -(300);
			};
			if (typeof xMax == 'undefined' || (xMax != null && xMax .hasOwnProperty ("__kwargtrans__"))) {;
				var xMax = 250;
			};
			if (typeof yMax == 'undefined' || (yMax != null && yMax .hasOwnProperty ("__kwargtrans__"))) {;
				var yMax = 300;
			};
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
				ontimer ((function __lambda__ () {
					return tuple ([print (), py_clear (), draw ()]);
				}), 2000);
			}
		};
		draw ();
		done ();
		__pragma__ ('<use>' +
			'random' +
			'turtle' +
		'</use>')
		__pragma__ ('<all>')
			__all__.Turtle = Turtle;
			__all__._allTurtles = _allTurtles;
			__all__._array = _array;
			__all__._bitmask1 = _bitmask1;
			__all__._bitmask2 = _bitmask2;
			__all__._bitmask3 = _bitmask3;
			__all__._debug = _debug;
			__all__._defaultElement = _defaultElement;
			__all__._defaultTurtle = _defaultTurtle;
			__all__._fill_array = _fill_array;
			__all__._height = _height;
			__all__._index = _index;
			__all__._ns = _ns;
			__all__._offset = _offset;
			__all__._random_integer = _random_integer;
			__all__._rightSize = _rightSize;
			__all__._svg = _svg;
			__all__._timer = _timer;
			__all__._width = _width;
			__all__.abs = abs;
			__all__.back = back;
			__all__.begin_fill = begin_fill;
			__all__.between = between;
			__all__.bgcolor = bgcolor;
			__all__.choice = choice;
			__all__.circle = circle;
			__all__.color = color;
			__all__.colors = colors;
			__all__.delta = delta;
			__all__.distance = distance;
			__all__.done = done;
			__all__.down = down;
			__all__.draw = draw;
			__all__.end_fill = end_fill;
			__all__.forward = forward;
			__all__.goto = goto;
			__all__.home = home;
			__all__.left = left;
			__all__.maybe = maybe;
			__all__.ontimer = ontimer;
			__all__.originalColor = originalColor;
			__all__.pensize = pensize;
			__all__.pos = pos;
			__all__.position = position;
			__all__.py_clear = py_clear;
			__all__.randint = randint;
			__all__.random = random;
			__all__.recentColors = recentColors;
			__all__.rect = rect;
			__all__.reset = reset;
			__all__.right = right;
			__all__.seed = seed;
			__all__.setDefaultElement = setDefaultElement;
			__all__.speed = speed;
			__all__.threshold = threshold;
			__all__.up = up;
		__pragma__ ('</all>')
	}) ();
