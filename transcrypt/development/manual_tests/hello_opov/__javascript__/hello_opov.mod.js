	(function () {
		var main = function () {
			print ('Hello opov');
		};
		main ();
		__pragma__ ('<all>')
			__all__.main = main;
		__pragma__ ('</all>')
	}) ();
