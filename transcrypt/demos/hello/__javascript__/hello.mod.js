	(function () {
		var chain = __init__ (__world__.itertools).chain;
		var SolarSystem = __class__ ('SolarSystem', [object], {
			get __init__ () {return __get__ (this, function (self) {
				self.lineIndex = 0;
			});},
			get greet () {return __get__ (this, function (self) {
				self.planet = self.planets [int (Math.random () * len (self.planets))];
				document.getElementById ('greet').innerHTML = 'Hello {}'.format (self.planet [0]);
				self.explain ();
			});},
			get explain () {return __get__ (this, function (self) {
				document.getElementById ('explain').innerHTML = self.lines [self.lineIndex].format (self.planet [0], self.planet [self.lineIndex + 1]);
				self.lineIndex = (self.lineIndex + 1) % 3;
			});}
		});
		SolarSystem.planets = function () {
			var __accu0__ = [];
			var __iter0__ = enumerate (tuple ([tuple (['Mercury', 'hot', 2240]), tuple (['Venus', 'sulphurous', 6052]), tuple (['Earth', 'fertile', 6378]), tuple (['Mars', 'reddish', 3397]), tuple (['Jupiter', 'stormy', 71492]), tuple (['Saturn', 'ringed', 60268]), tuple (['Uranus', 'cold', 25559]), tuple (['Neptune', 'very cold', 24766])]));
			for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
				var __left0__ = __iter0__ [__index0__];
				var index = __left0__ [0];
				var planet = __left0__ [1];
				__accu0__.append (chain (planet, tuple ([index + 1])));
			}
			return __accu0__;
		} ();
		SolarSystem.lines = tuple (['{} is a {} planet', 'The radius of {} is {} km', '{} is planet nr. {} counting from the sun']);
		var solarSystem = SolarSystem ();
		__pragma__ ('<use>' +
			'itertools' +
		'</use>')
		__pragma__ ('<all>')
			__all__.SolarSystem = SolarSystem;
			__all__.solarSystem = solarSystem;
		__pragma__ ('</all>')
	}) ();
