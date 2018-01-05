	(function () {
		var __name__ = '__main__';
		var a = 1;
		autoTester.check (__conj__ (a));
		__pragma__ ('<all>')
			__all__.__name__ = __name__;
			__all__.a = a;
		__pragma__ ('</all>')
	}) ();
