	(function () {
		var __name__ = '__main__';
		var nameElement = document.getElementById ('name');
		var greetingElement = document.getElementById ('greeting');
		var ageElement = document.getElementById ('age');
		var messageElement = document.getElementById ('message');
		var greet = function () {
			greetingElement.innerHTML = 'Hi {}, I am your computer'.format (nameElement.value);
		};
		var tell = function () {
			var age = float (ageElement.value);
			if (age < 12) {
				messageElement.innerHTML = 'Sorry, {} is to young to smoke sigars'.format (age);
			}
			else if (age < 16) {
				messageElement.innerHTML = 'If you are {} you do not have a drivers licence yet'.format (age);
			}
			else if (age < 30) {
				messageElement.innerHTML = 'At {} you may already have children'.format (age);
			}
			else {
				messageElement.innerHTML = 'At {} you will probably already have some working experience'.format (age);
			}
		};
		__pragma__ ('<all>')
			__all__.__name__ = __name__;
			__all__.ageElement = ageElement;
			__all__.greet = greet;
			__all__.greetingElement = greetingElement;
			__all__.messageElement = messageElement;
			__all__.nameElement = nameElement;
			__all__.tell = tell;
		__pragma__ ('</all>')
	}) ();
