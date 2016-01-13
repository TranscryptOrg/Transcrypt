	(function () {
		var testmod = {};
		var testmod2 = {};
		__nest__ (testmod, '', __init__ (__world__.testmod));
		__nest__ (testmod2, '', __init__ (__world__.testmod2));
		__nest__ (testmod2, 'testmod21', __init__ (__world__.testmod2.testmod21));
		console.log ('test');
		testmod.f ();
		testmod2.f ();
		testmod2.testmod21.f ();
		var A = __class__ ('A', [object], {
			get __init__ () {return __get__ (this, function (self, x) {
				self.x = x;
			});},
			get show () {return __get__ (this, function (self, label) {
				print ('A.show', label, self.x);
			});}
		});
		var B = __class__ ('B', [object], {
			get __init__ () {return __get__ (this, function (self, y) {
				alert ('In B constructor');
				self.y = y;
			});},
			get show () {return __get__ (this, function (self, label) {
				print ('B.show', label, self.y);
			});}
		});
		var C = __class__ ('C', [A, B], {
			get __init__ () {return __get__ (this, function (self, x, y) {
				alert ('In C constructor');
				A.__init__ (self, x);
				B.__init__ (self, y);
				self.show ('constructor');
			});},
			get show () {return __get__ (this, function (self, label) {
				B.show (self, label);
				print ('C.show', label, self.x, self.y);
			});},
			get test () {return __get__ (this, function (self, a, b, c) {
				print (a, b, c);
			});}
		});
		var a = A (1001);
		a.show ('america');
		var b = B (2002);
		b.show ('russia');
		var c = C (3003, 4004);
		c.show ('netherlands');
		c.test (1111, 2222, 3333);
		var show2 = c.show;
		show2 ('copy');
		var f = function (a, b) {
			print (a, b);
		};
		f (10, 20);
		print (1, 2, 3, 4);
		print (5, 6, 7, 8);
		console.log ('terminated');
		//<all>
		__all__.A = A;
		__all__.B = B;
		__all__.C = C;
		__all__.a = a;
		__all__.b = b;
		__all__.c = c;
		__all__.f = f;
		__all__.show2 = show2;
		//</all>
	}) ();
