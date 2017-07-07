	(function () {
		while (true) {
			var py_name = input ('Whats your name? (leave blank to quit)');
			if (py_name == '') {
				break;
			}
			print ('Hi', py_name, 'I am your computer.');
			var age = float (input ('How old are you? '));
			if (age < 18) {
				print ('Sorry', py_name, ',', age, 'is to young to drive a car in the Netherlands.');
			}
			else {
				print ('OK', py_name, ',', age, 'is old enough to drive a car in the Netherlands.');
			}
			print ();
		}
		__pragma__ ('<all>')
			__all__.age = age;
			__all__.py_name = py_name;
		__pragma__ ('</all>')
	}) ();
