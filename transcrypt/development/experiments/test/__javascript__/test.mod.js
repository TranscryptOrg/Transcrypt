	(function () {
		var __name__ = '__main__';
		var C = __class__ ('C', [object], {
			__module__: __name__,
			get __init__ () {return __get__ (this, function (self, s) {
				self.s = s;
			});},
			get f () {return __get__ (this, function (self) {
				console.log (self.s, 'world');
			});}
		});
		var c = C ('hellooooo');
		c.f ();
		var g = c.f;
		g ();
		__pragma__ ('<all>')
			__all__.C = C;
			__all__.__name__ = __name__;
			__all__.c = c;
			__all__.g = g;
		__pragma__ ('</all>')
	}) ();
