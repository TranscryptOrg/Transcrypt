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
