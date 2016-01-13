	(function () {
		var f = function (a, b) {
			var args = [] .slice.apply (arguments) .slice (2);
			print (a, b, args);
		};
		f (1, 2, 3, 4, 5);
		var g = function (a, b, c) {
			print (a, b, c);
		};
		g.apply (null, [6].concat ([7, 8]));
		var X = __class__ ('X', [object], {
			get __init__ () {return __get__ (this, function (self) {
				self.pi = 3.14;
				self.e = 2.74;
			});},
			get h () {return __get__ (this, function (self, h, i, j, k, l) {
				print (self.pi, h, i, j, k, l, self.e);
			});}
		});
		var x = X ();
		x.h.apply (null, [1, 2].concat ([3]).concat ([4, 5]));
		//<all>
		__all__.X = X;
		__all__.f = f;
		__all__.g = g;
		__all__.x = x;
		//</all>
	}) ();
