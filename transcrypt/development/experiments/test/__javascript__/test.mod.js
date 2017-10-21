	(function () {
		console.log ('PRE');
		var a = int (false);
		console.log ('POST', a);
		__pragma__ ('<all>')
			__all__.a = a;
		__pragma__ ('</all>')
	}) ();
