	__nest__ (
		__all__,
		'classes', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var A = __class__ ('A', [object], {
							get __init__ () {return __get__ (this, function (self, x) {
								self.x = x;
								autoTester.check (self.p);
							});},
							get show () {return __get__ (this, function (self, label) {
								autoTester.check ('A.show', label, self.x);
							});},
							get show2 () {return __get__ (this, function (self, label) {
								autoTester.check ('A.show2', label, self.x);
							});}
						});
						A.p = 123;
						var B = __class__ ('B', [object], {
							get __init__ () {return __get__ (this, function (self, y) {
								autoTester.check ('In B constructor');
								self.y = y;
								autoTester.check (self.p);
							});},
							get show () {return __get__ (this, function (self, label) {
								autoTester.check ('B.show', label, self.y);
							});}
						});
						var __left0__ = tuple ([456, 789]);
						B.p = __left0__ [0];
						B.q = __left0__ [1];
						var C = __class__ ('C', [A, B], {
							get __init__ () {return __get__ (this, function (self, x, y) {
								autoTester.check ('In C constructor');
								A.__init__ (self, x);
								B.__init__ (self, y);
							});},
							get show () {return __get__ (this, function (self, label) {
								A.show (self, label);
								B.show (self, label);
								autoTester.check ('C.show', label, self.x, self.y);
							});}
						});
						var a = A (1001);
						a.show ('america');
						autoTester.check (A.p);
						autoTester.check (a.p);
						var b = B (2002);
						b.show ('russia');
						autoTester.check (B.p);
						autoTester.check (b.p);
						autoTester.check (b.q);
						autoTester.check (A.p);
						autoTester.check (a.p);
						var c = C (3003, 4004);
						c.show ('netherlands');
						autoTester.check (C.p);
						autoTester.check (c.p);
						autoTester.check (c.q);
						c.show2 ('amsterdam');
						A.show2 (c, 'rotterdam');
						var show3 = c.show;
						show3 ('copy');
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
