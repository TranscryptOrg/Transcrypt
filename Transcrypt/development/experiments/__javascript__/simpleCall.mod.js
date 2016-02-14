	(function () {
		var A = __class__ ('A', [object], {
			get __init__ () {return __get__ (this, function (self, x) {
				self.x = x;
			}, '__init__');},
			get f () {return __get__ (this, function (self) {
				console.log (self);
			}, 'f');}
		});
		var B = __class__ ('B', [A], {
		});
		var a1 = B (3);
		var a2 = B (4);
		a1.f ();
		a2.f ();
		a1.f ();
		a2.f ();
		__pragma__ ('<all>')
			__all__.A = A;
			__all__.B = B;
			__all__.a1 = a1;
			__all__.a2 = a2;
		__pragma__ ('</all>')
	}) ();
