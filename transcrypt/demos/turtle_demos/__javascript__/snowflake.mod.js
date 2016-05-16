	(function () {
		var Turtle = __init__ (__world__.turtle).Turtle;
		var _defaultTurtle = __init__ (__world__.turtle)._defaultTurtle;
		var _height = __init__ (__world__.turtle)._height;
		var _ns = __init__ (__world__.turtle)._ns;
		var _offset = __init__ (__world__.turtle)._offset;
		var _svg = __init__ (__world__.turtle)._svg;
		var _width = __init__ (__world__.turtle)._width;
		var abs = __init__ (__world__.turtle).abs;
		var back = __init__ (__world__.turtle).back;
		var begin_fill = __init__ (__world__.turtle).begin_fill;
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
		var rightSize = __init__ (__world__.turtle).rightSize;
		var up = __init__ (__world__.turtle).up;
		var josh = Turtle ();
		var draw = function (length) {
			if (length > 9) {
				draw (length / 3);
				josh.left (60);
				draw (length / 3);
				josh.right (120);
				draw (length / 3);
				josh.left (60);
				draw (length / 3);
			}
			else {
				josh.forward (length);
			}
		};
		var length = 150;
		josh.up ();
		josh.forward (length / 2);
		josh.left (90);
		josh.forward (length / 4);
		josh.right (90);
		josh.down ();
		for (var i = 0; i < 3; i++) {
			josh.right (120);
			draw (length);
		}
		josh.done ();
		__pragma__ ('<use>' +
			'turtle' +
		'</use>')
		__pragma__ ('<all>')
			__all__.draw = draw;
			__all__.i = i;
			__all__.josh = josh;
			__all__.length = length;
		__pragma__ ('</all>')
	}) ();
