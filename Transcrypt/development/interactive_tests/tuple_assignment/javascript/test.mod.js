	(function () {
		var p = 1;
		;
		var p = 2;
		;
		var x = [888, 1];
		;
		var Y = __class__ ('Y', [object], {
			get __init__ () {return __get__ (this, function (self) {
				self.z = 3;
				;
			});}
		});
		var y12 = Y ();
		;
		var __tmp__ = [[77, 22, [1, 2, 3]], [33, 44]];
		x [1]  = __tmp__ [0][0];
		var b = __tmp__ [0][1];
		y12.z = __tmp__ [0][2];
		var c = __tmp__ [1][0];
		var d = __tmp__ [1][1];
		;
		print (x, b, y12.z, c, d);
		var __tmp__ = [1, 2];
		var a = __tmp__ [0];
		var b = __tmp__ [1];
		;
		print (a, b);
		var __tmp__ = [[[1, 2], [3, 4]], [5, 6]];
		var p = __tmp__ [0][0][0];
		var q = __tmp__ [0][0][1];
		var r = __tmp__ [0][1][0];
		var s = __tmp__ [0][1][1];
		var t = __tmp__ [1][0];
		var u = __tmp__ [1][1];
		;
		print (p, q, r, s, t, u);
		//<all>
		__all__.Y = Y;
		__all__.a = a;
		__all__.b = b;
		__all__.c = c;
		__all__.d = d;
		__all__.p = p;
		__all__.q = q;
		__all__.r = r;
		__all__.s = s;
		__all__.t = t;
		__all__.u = u;
		__all__.x = x;
		__all__.y12 = y12;
		//</all>
	}) ();
