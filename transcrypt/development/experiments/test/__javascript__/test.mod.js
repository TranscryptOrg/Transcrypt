	(function () {
		var __name__ = '__main__';
		var a = list ([1, 2, 3]);
		var b = list ([4, 5, 6]);
		print (a + b);
		__call__ (print, null, __add__ (a, b));
		print (a + b);
		__pragma__ ('<all>')
			__all__.__name__ = __name__;
			__all__.a = a;
			__all__.b = b;
		__pragma__ ('</all>')
	}) ();
