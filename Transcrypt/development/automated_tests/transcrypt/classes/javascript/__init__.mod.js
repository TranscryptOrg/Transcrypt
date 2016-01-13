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
							});},
							get show () {return __get__ (this, function (self, label) {
								autoTester.store ('A.show', label, self.x);
							});}
						});
						var B = __class__ ('B', [object], {
							get __init__ () {return __get__ (this, function (self, y) {
								autoTester.store ('In B constructor');
								self.y = y;
							});},
							get show () {return __get__ (this, function (self, label) {
								autoTester.store ('B.show', label, self.y);
							});}
						});
						var C = __class__ ('C', [A, B], {
							get __init__ () {return __get__ (this, function (self, x, y) {
								autoTester.store ('In C constructor');
								A.__init__ (self, x);
								B.__init__ (self, y);
							});},
							get show () {return __get__ (this, function (self, label) {
								A.show (self, label);
								B.show (self, label);
								autoTester.store ('C.show', label, self.x, self.y);
							});}
						});
						var a = A (1001);
						a.show ('america');
						var b = B (2002);
						b.show ('russia');
						var c = C (3003, 4004);
						c.show ('netherlands');
						var show2 = c.show;
						show2 ('copy');
					};
					//<all>
					__all__.run = run;
					//</all>
				}
			}
		}
	);
