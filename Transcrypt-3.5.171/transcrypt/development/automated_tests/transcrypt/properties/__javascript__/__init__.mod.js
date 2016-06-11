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
							self._y = 1000 + value;
						});},
						get getY2 () {return __get__ (this, function (self) {
							return self._y;
						});},
						get setY2 () {return __get__ (this, function (self, value) {
							self._y = value;
						});},
						get getT () {return __get__ (this, function (self) {
							return self._t;
						});},
						get setT () {return __get__ (this, function (self, value) {
							self._t = value;
						});},
						get getU () {return __get__ (this, function (self) {
							return self._u + 10000;
						});},
						get setU () {return __get__ (this, function (self, value) {
							self._u = value - 5000;
						});}
					});
					A.p = 1234;
					var __left0__ = tuple ([property.call (A, A.getX, A.setX), property.call (A, A.getY, A.setY), property.call (A, A.getY2, A.setY2)]);
					Object.defineProperty (A, 'x', __left0__ [0]);;
					Object.defineProperty (A, 'y', __left0__ [1]);;
					Object.defineProperty (A, 'y2', __left0__ [2]);;
					Object.defineProperty (A, 't', property.call (A, A.getT, A.setT));;
					Object.defineProperty (A, 'u', property.call (A, A.getU, A.setU));;
					A.q = 5678;
					var B = __class__ ('B', [object], {
						get getZ () {return __get__ (this, function (self) {
							return self.z_;
						});},
						get setZ () {return __get__ (this, function (self, value) {
							self.z_ = value;
						});}
					});
					Object.defineProperty (B, 'z', property.call (B, B.getZ, B.setZ));;
					var C = __class__ ('C', [object], {
						get __init__ () {return __get__ (this, function (self) {
							self.offset = 1234;
						});},
						get getW () {return __get__ (this, function (self) {
							return self.w_ + self.offset;
						});},
						get setW () {return __get__ (this, function (self, value) {
							self.w_ = value - self.offset;
						});}
					});
					Object.defineProperty (C, 'w', property.call (C, C.getW, C.setW));;
					var run = function (autoTester) {
						var a1 = A ();
						var a2 = A ();
						a1.y2 = 1000;
						a2.y2 = 2000;
						a1.x = 5;
						a1.y = 6;
						a2.x = 7;
						a2.y = 8;
						a1.t = 77;
						a1.u = 88;
						autoTester.check (a1.x, a1.y, a1.y2);
						autoTester.check (a2.x, a2.y, a2.y2);
						autoTester.check (a1.p, a2.p, a1.q, a2.q);
						autoTester.check (a1.t, a1.u);
						var b = B ();
						var c = C ();
						b.z = 100100;
						c.z = 200200;
						c.w = 300300;
						autoTester.check (a1.x, b.z, c.z, c.w);
						c.w = 400400;
						c.z = 500500;
						b.z = 600600;
						autoTester.check (a1.x, b.z, c.z, c.w);
					};
					__pragma__ ('<all>')
						__all__.A = A;
						__all__.B = B;
						__all__.C = C;
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
