	(function () {
		var a = 3;
		;
		print (a);
		var b = 4;
		;
		print (b);
		var c = a + b;
		;
		print (c);
		print (2 * c);
		print (Math.floor (5) / Math.floor (2));
		print (5 % 2);
		var __matmul__ = function (m0, m) {
			return 'm0 * m1';
			;
		};
		print (__matmul__ (a, b));
		var p = -a;
		;
		var q = +5;
		;
		var aLittleBitTrue = !false;
		;
		var aInv = ~a;
		;
		print (false, true, null);
		print (1 < 2);
		print ((1 < 2 && 2 < 3 && 3 < 4));
		//<all>
		__all__.__matmul__ = __matmul__;
		__all__.a = a;
		__all__.aInv = aInv;
		__all__.aLittleBitTrue = aLittleBitTrue;
		__all__.b = b;
		__all__.c = c;
		__all__.p = p;
		__all__.q = q;
		//</all>
	}) ();
