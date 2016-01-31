	__nest__ (
		__all__,
		'properties', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var A = __class__ ('A', [object], {
						get getX () {return __get__ (this, function (self) {
							return self._x;
						});},
						get setX () {return __get__ (this, function (self, value) {
							self._x = value;
						});},
						get getY () {return __get__ (this, function (self) {
							return self._y;
						});},
						get setY () {return __get__ (this, function (self, value) {
							self._y = value;
						});}
					});
					A.p = 123;
					A.q = 456;
					var run = function (autoTester) {
						var a1 = A ();
						var a2 = A ();
						a1.x = 5;
						a1.y = 6;
						a2.x = 7;
						a2.y = 8;
						autoTester.check (a1.x, a1.y, a2.x, a2.y, a1.p, a2.p, a1.q, a2.q);
					};
					__pragma__ ('<all>')
					__all__.A = A;
					__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
