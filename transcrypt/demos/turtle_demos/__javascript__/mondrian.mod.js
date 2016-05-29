	(function () {
		var random = {};
		var turtle_graphics =  __init__ (__world__.turtle);
		__nest__ (random, '', __init__ (__world__.random));
		var Bounds = __class__ ('Bounds', [object], {
			get __init__ () {return __get__ (this, function (self, x, y, width, height) {
				self.x = x;
				self.y = y;
				self.width = width;
				self.height = height;
			});}
		});
		var BORDER_COLOR = 'black';
		var BORDER_WIDTH = 10;
		var MINIMUM_DIVISIBLE_PORTION = 0.2;
		var COLORS = tuple (['white', 'white', 'red', 'white', 'blue', 'yellow']);
		var PICTURE_BOUNDS = Bounds (__kwargdict__ ({x: -(250), y: -(300), width: 500, height: 600}));
		var fill_rectangle = function (turtle, bounds, color) {
			if (typeof color == 'undefined' || (color != null && color .__class__ == __kwargdict__)) {;
				var color = BORDER_COLOR;
			};
			' Fill a rectangle with the border color (by default) and then fill the center with a bright color ';
			turtle.up ();
			turtle.goto (bounds.x, bounds.y);
			turtle.color (color);
			turtle.down ();
			turtle.begin_fill ();
			for (var _ = 0; _ < 2; _++) {
				turtle.forward (bounds.width);
				turtle.left (90);
				turtle.forward (bounds.height);
				turtle.left (90);
			}
			turtle.end_fill ();
			turtle.up ();
			if (color == BORDER_COLOR) {
				fill_rectangle (turtle, Bounds (bounds.x + BORDER_WIDTH, bounds.y + BORDER_WIDTH, bounds.width - BORDER_WIDTH * 2, bounds.height - BORDER_WIDTH * 2), random.choice (COLORS));
			}
		};
		var mondrian = function (piet, bounds) {
			' Divide, fill and divide & fill some more.  Intuitively and recursively ';
			if (bounds.width < bounds.height) {
				var random_dimension = random.randint (Math.floor (bounds.height / 5), Math.floor ((2 * bounds.height) / 3));
				var bounds_yin = Bounds (bounds.x, bounds.y + random_dimension, bounds.width, bounds.height - random_dimension);
				var bounds_yang = Bounds (bounds.x, bounds.y, bounds.width, random_dimension);
				if (bounds_yin.height > bounds_yang.height) {
					var __left0__ = tuple ([bounds_yang, bounds_yin]);
					var bounds_paint = __left0__ [0];
					var bounds_divide = __left0__ [1];
				}
				else {
					var __left0__ = tuple ([bounds_yin, bounds_yang]);
					var bounds_paint = __left0__ [0];
					var bounds_divide = __left0__ [1];
				}
				print (111, bounds_paint);
				fill_rectangle (piet, bounds_paint);
				if (bounds_divide.height < MINIMUM_DIVISIBLE_PORTION * PICTURE_BOUNDS.height) {
					fill_rectangle (piet, bounds_divide);
				}
				else {
					// pass;
				}
			}
			else {
				var random_dimension = random.randint (Math.floor (bounds.width / 5), Math.floor ((2 * bounds.width) / 3));
				var bounds_yin = Bounds (bounds.x, bounds.y, random_dimension, bounds.height);
				var bounds_yang = Bounds (bounds.x + random_dimension, bounds.y, bounds.width - random_dimension, bounds.height);
				if (bounds_yin.width > bounds_yang.width) {
					var __left0__ = tuple ([bounds_yang, bounds_yin]);
					var bounds_paint = __left0__ [0];
					var bounds_divide = __left0__ [1];
				}
				else {
					var __left0__ = tuple ([bounds_yin, bounds_yang]);
					var bounds_paint = __left0__ [0];
					var bounds_divide = __left0__ [1];
				}
				print (222, bounds_paint);
				fill_rectangle (piet, bounds_paint);
				if (bounds_divide.width < MINIMUM_DIVISIBLE_PORTION * PICTURE_BOUNDS.width) {
					fill_rectangle (piet, bounds_divide);
				}
				else {
					// pass;
				}
			}
		};
		var paint_canvas = function (dummy_x, dummy_y) {
			if (typeof dummy_x == 'undefined' || (dummy_x != null && dummy_x .__class__ == __kwargdict__)) {;
				var dummy_x = 0;
			};
			if (typeof dummy_y == 'undefined' || (dummy_y != null && dummy_y .__class__ == __kwargdict__)) {;
				var dummy_y = 0;
			};
			' Runs the program and can be used as an event handler ';
			mondrian (turtle_graphics, PICTURE_BOUNDS);
		};
		paint_canvas ();
		__pragma__ ('<use>' +
			'random' +
			'turtle' +
		'</use>')
		__pragma__ ('<all>')
			__all__.BORDER_COLOR = BORDER_COLOR;
			__all__.BORDER_WIDTH = BORDER_WIDTH;
			__all__.Bounds = Bounds;
			__all__.COLORS = COLORS;
			__all__.MINIMUM_DIVISIBLE_PORTION = MINIMUM_DIVISIBLE_PORTION;
			__all__.PICTURE_BOUNDS = PICTURE_BOUNDS;
			__all__.fill_rectangle = fill_rectangle;
			__all__.mondrian = mondrian;
			__all__.paint_canvas = paint_canvas;
		__pragma__ ('</all>')
	}) ();
