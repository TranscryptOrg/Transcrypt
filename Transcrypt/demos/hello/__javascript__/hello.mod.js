	(function () {
		var SolarSystem = __class__ ('SolarSystem', [object], {
			get __init__ () {return __get__ (this, function (self) {
				self.planetIndex = 3;
				self.explainDistance = true;
			});},
			get greet () {return __get__ (this, function (self) {
				self.planetIndex = int (Math.random () * len (self.planets));
				document.getElementById ('greet').innerHTML = 'Hello {}'.format (self.planets [self.planetIndex]);
			});},
			get explain () {return __get__ (this, function (self) {
				document.getElementById ('explain').innerHTML = (self.explainDistance ? '{} is planet nr. {} counting from the sun'.format (self.planets [self.planetIndex], self.planetIndex + 1) : '{} is a {} planet'.format (self.planets [self.planetIndex], self.kind [self.planetIndex]));
				self.explainDistance = !self.explainDistance;
			});}
		});
		SolarSystem.planets = list (['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']);
		SolarSystem.kind = list (['hot', 'sulphurous', 'fertile', 'reddish', 'stormy', 'ringed', 'cold', 'very cold']);
		var solarSystem = SolarSystem ();
		__pragma__ ('<all>')
		__all__.SolarSystem = SolarSystem;
		__all__.solarSystem = solarSystem;
		__pragma__ ('</all>')
	}) ();
