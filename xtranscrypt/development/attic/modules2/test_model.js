"use strict"

test = function () {	
	var A = transcrypt.__class__ ('A', [transcrypt.object], {
		__init__: function (self, x) {
			self.x = x;
		}
	});

	var B = transcrypt.__class__ ('B', [transcrypt.object], {
		__init__: function (self, y) { 
			self.y = y;
		},
		show: function (self, label) {
			alert.call (null, 'In B constructor')
			transcrypt.show.call (null, 'B.show', label, self.y);
		}	
	});

	// Call to class creator function, will copy methods and static attributes
	var C = transcrypt.__class__ ('C', [A, B], {
		__init__: function (self, x, y) {
			alert.call (null, 'In C constructor')
			A.__init__.call (null, self, x);	// Always use call
			B.__init__.call (null, self, y);	// so works for functors
			transcrypt.__call__ (self, 'show', 'first', {});
		},
		show: function (self, label) {
			test.B.show.call (null, self, label);
			transcrypt.show.call (null, 'C.show', label, self.x, self.y);
		}
	});

	a = A.call (null, 1);
	b = B.call (null, 2);
	c = C.call (null, 3, 4);

	transcrypt.__call__ (c, 'show', ['second'], {});
	show2 = function (label) {transcrypt.__call__ (c, 'show', [label], {});};
	show2 ('third');

	transcrypt.print.call (null, 1, 2, 3, 4)
	transcrypt.print.call (null, 5, 6, 7, 8)

	alert.call (null, 'terminated')
	
	return {
		A :  A,
		B :  B,
		C :  C,
		a :  a,
		b :  b,
		c :  c,
		show2 :  show2
	};
	
	// Bound functors should be made member of the class
	// SSS: Instance attributes cannot be bound
} ();