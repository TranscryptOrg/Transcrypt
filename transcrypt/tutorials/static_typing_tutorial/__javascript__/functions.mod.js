	__nest__ (
		__all__,
		'functions', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var f = function (l) {
						return 3.5;
					};
					var a = 3;
					var a = f (list ([list ([1, 2.2, 3]), list ([4.4, 5.5, 6.6])]));
					var g = function* (n) {
						for (var i = 0; i < n; i++) {
							yield i * i;
						}
					};
					var __iterable0__ = g (10);
					for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
						var b = __iterable0__ [__index0__];
						var c = b;
					}
					var c = 5.5;
					var h = function (i, f, c) {
						if (typeof i == 'undefined' || (i != null && i .__class__ == __kwargdict__)) {;
							var i = 0;
						};
						if (typeof f == 'undefined' || (f != null && f .__class__ == __kwargdict__)) {;
							var f = 0;
						};
						if (typeof c == 'undefined' || (c != null && c .__class__ == __kwargdict__)) {;
							var c = 0;
						};
						return tuple ([i, f, c]);
					};
					var d = h (1, 1.0);
					var d = h (__kwargdict__ ({c: 'something'}));
					var ff = function (anF) {
						return anF ('nonsense');
					};
					var e = 1;
					var e = ff (f);
					__pragma__ ('<use>' +
						'typing' +
					'</use>')
					__pragma__ ('<all>')
						__all__.a = a;
						__all__.b = b;
						__all__.c = c;
						__all__.d = d;
						__all__.e = e;
						__all__.f = f;
						__all__.ff = ff;
						__all__.g = g;
						__all__.h = h;
					__pragma__ ('</all>')
				}
			}
		}
	);
