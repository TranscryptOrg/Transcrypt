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
						});},
						get getY2 () {return __get__ (this, function (self) {
							return self._y;
						});},
						get setY2 () {return __get__ (this, function (self, value) {
							self._y = value;
						});}
					});
					A.p = 1234;
					var __left0__ = tuple (list ([property.call (A, A.getX, A.setX), property.call (A, A.getY, A.setY), property.call (A, A.getY2, A.setY2)]));
					A.x = __left0__[0];
					A.y = __left0__[1];
					A.y2 = __left0__[2];
					A.q = 5678;
					var run = function (autoTester) {
						var a1 = A ();
						var a2 = A ();
						a1.x = 5;
						a1.y = 6;
						a2.x = 7;
						a2.y = 8;
						autoTester.check (a1.x, a1.y, a1.y2, a2.x, a2.y, a2.y2, a1.p, a2.p, a1.q, a2.q);
					};
					__pragma__ ('<all>')
					__all__.A = A;
					__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
