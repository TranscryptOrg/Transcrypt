	(function () {
		var random = {};
		var __name__ = '__main__';
		__nest__ (random, '', __init__ (__world__.random));
		var a = random.randint (1, 10);
		var b = random.randint (1, 10);
		var answer = 1;
		print ('Type 0 to quit');
		print ();
		while (answer > 0) {
			var answer = float (input ('How much is {} x {}? '.format (a, b)));
			if (answer == a * b) {
				print ('Right');
				print ();
				var a = random.randint (1, 10);
				var b = random.randint (1, 10);
			}
			else if (answer > 0) {
				print ('Wrong, try again...');
			}
		}
		__pragma__ ('<use>' +
			'random' +
		'</use>')
		__pragma__ ('<all>')
			__all__.__name__ = __name__;
			__all__.a = a;
			__all__.answer = answer;
			__all__.b = b;
		__pragma__ ('</all>')
	}) ();
