	(function () {
		var __name__ = '__main__';
		var py_name = input ('Hi, what is your name? ');
		print ('Hello', py_name, 'I am your computer.');
		var age = float (input ('How old are you? '));
		if (age < 12) {
			print ('Sorry', age, 'is to young to smoke sigars');
		}
		else if (age < 16) {
			print ('If you are', age, 'you do not have a drivers licence yet');
		}
		else if (age < 30) {
			print ('At', age, 'you may already have children');
		}
		else {
			print ('At', age, 'you will probably already have some working experience');
		}
		print ('Reload web page to run again...');
		__pragma__ ('<all>')
			__all__.__name__ = __name__;
			__all__.age = age;
			__all__.py_name = py_name;
		__pragma__ ('</all>')
	}) ();
