	(function () {
		var f = function (i) {
			return 'xyz';
		};
		f ('abc');
		var g = function (i) {
			return 'xyz';
		};
		f ('abc');
		__pragma__ ('<all>')
			__all__.f = f;
			__all__.g = g;
		__pragma__ ('</all>')
	}) ();
