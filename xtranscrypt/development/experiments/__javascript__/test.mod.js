	(function () {
		var __iter0__ = range (3);
		if (type (__iter0__) == dict) {
			__iter0__ = __iter0__.py_keys ();
		}
		for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
			var i = __iter0__ [__index0__];
			print (i);
		}
		var d = dict ({0: 'zero', 1: 'one', 2: 'two'});
		var __iter0__ = d;
		if (type (__iter0__) == dict) {
			__iter0__ = __iter0__.py_keys ();
		}
		for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
			var i = __iter0__ [__index0__];
			print (i);
		}
		__pragma__ ('<all>')
			__all__.d = d;
			__all__.i = i;
		__pragma__ ('</all>')
	}) ();
