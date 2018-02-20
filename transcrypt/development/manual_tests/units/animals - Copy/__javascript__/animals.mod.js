	(function () {
		var __name__ = '__main__';
		var Animal = __class__ ('Animal', [object], {
			__module__: __name__,
			animals: dict ({}),
			get py_get () {return __getcm__ (this, function (cls, py_name) {
				return self.animals [py_name];
			});},
			get __init__ () {return __get__ (this, function (self, py_name, food, sound) {
				self.animals [py_name] = self;
				self.py_name = py_name;
				self.fed = false;
			});},
			get speak () {return __get__ (this, function (text) {
				return '{} says: '.format (self.py_name) + text;
			});},
			get feed () {return __get__ (this, function (self) {
				document.getElementById (py_name).innerHTML = speak ((self.fed ? 'No thanks, I first want to greet you with {}!'.format (self.sound) : 'Thanks a lot, I am now eating {}!'.format (self.food)));
			});},
			get greet () {return __get__ (this, function (self) {
				document.getElementById (py_name).innerHTML = speak ((self.fed ? '{}, {}, {}!'.format (self.sound, self.sound, self.sound) : 'Sorry, I want to eat {} first!'.format (self.food)));
			});}
		});
		__pragma__ ('<all>')
			__all__.Animal = Animal;
			__all__.__name__ = __name__;
		__pragma__ ('</all>')
	}) ();
