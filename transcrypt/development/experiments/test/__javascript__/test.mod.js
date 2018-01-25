	(function () {
		var __name__ = '__main__';
		var A = __class__ ('A', [object], {
			__module__: __name__,
			get __init__ () {return __get__ (this, function (self, x) {
				self.x = x;
			});},
			f: function (param) {
				var self = this;
				return self.x * param;
			},
			get g () {return __get__ (this, function (self, param) {
				return self.x * param;
			});}
		});
		var a = A (2);
		var a2 = A (3);
		print (a.f (4), a2.f (5));
		var B = __class__ ('B', [A], {
			__module__: __name__,
		});
		var b = B (4);
		var b2 = B (5);
		print (b.f (6), b2.f (7));
		__pragma__ ('<all>')
			__all__.A = A;
			__all__.B = B;
			__all__.__name__ = __name__;
			__all__.a = a;
			__all__.a2 = a2;
			__all__.b = b;
			__all__.b2 = b2;
		__pragma__ ('</all>')
	}) ();
