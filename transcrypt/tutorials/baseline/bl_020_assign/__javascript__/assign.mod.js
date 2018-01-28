	(function () {
		var __name__ = '__main__';
		var boy_name = 'John';
		var girl_name = 'Mary';
		var both = (boy_name + ' and ') + girl_name;
		print (both);
		print ('one', 'two', 'three');
		var x = 7;
		var y = 8;
		var z = 10 * (x * y + 44);
		print (x, y, z);
		print (1, '+', 1, '=', 1 + 1);
		__pragma__ ('<all>')
			__all__.__name__ = __name__;
			__all__.both = both;
			__all__.boy_name = boy_name;
			__all__.girl_name = girl_name;
			__all__.x = x;
			__all__.y = y;
			__all__.z = z;
		__pragma__ ('</all>')
	}) ();
