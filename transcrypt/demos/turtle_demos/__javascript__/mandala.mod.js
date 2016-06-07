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
		var pensize = __init__ (__world__.turtle).pensize;
		var pos = __init__ (__world__.turtle).pos;
		var position = __init__ (__world__.turtle).position;
		var reset = __init__ (__world__.turtle).reset;
		var right = __init__ (__world__.turtle).right;
		var setDefaultElement = __init__ (__world__.turtle).setDefaultElement;
		var up = __init__ (__world__.turtle).up;
		bgcolor ('black');
		var __iter0__ = tuple ([tuple (['green', 1, 82, 40, -(6)]), tuple (['red', 1, 84, 40, -(6)]), tuple (['white', 2, 98, 50, -(5)]), tuple (['yellow', 2, 70, 50, -(5)]), tuple (['blue', 2, 97, 70, -(5)]), tuple (['orange', 2, 87, 40, -(17)]), tuple (['pink', 3, 102, 60, -(17)])]);
		for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
			var __left0__ = __iter0__ [__index0__];
			var a_color = __left0__ [0];
			var a_pensize = __left0__ [1];
			var start_radius = __left0__ [2];
			var stop_radius = __left0__ [3];
			var radius_step = __left0__ [4];
			pensize (a_pensize);
			color (a_color);
			for (var angle_index = 0; angle_index < 10; angle_index++) {
				var __iter1__ = range (start_radius, stop_radius, radius_step);
				for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
					var radius = __iter1__ [__index1__];
					circle (radius);
				}
				right (36);
			}
		}
		done ();
		__pragma__ ('<use>' +
			'turtle' +
		'</use>')
		__pragma__ ('<all>')
			__all__.a_color = a_color;
			__all__.a_pensize = a_pensize;
			__all__.angle_index = angle_index;
			__all__.radius = radius;
			__all__.radius_step = radius_step;
			__all__.start_radius = start_radius;
			__all__.stop_radius = stop_radius;
		__pragma__ ('</all>')
	}) ();
