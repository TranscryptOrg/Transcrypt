// ============ Source: D:/activ_tosh/geatec/transcrypt/transcrypt/demos/hello/hello.py ============

/* 000001 */ 	(function () {
/* 000001 */ 		var chain = __init__ (__world__.itertools).chain;
/* 000003 */ 		var SolarSystem = __class__ ('SolarSystem', [object], {
/* 000021 */ 			get __init__ () {return __get__ (this, function (self) {
/* 000022 */ 				self.lineIndex = 0;
/* 000022 */ 			});},
/* 000024 */ 			get greet () {return __get__ (this, function (self) {
/* 000025 */ 				self.planet = self.planets [int (Math.random () * len (self.planets))];
/* 000026 */ 				document.getElementById ('greet').innerHTML = 'Hello {}'.format (self.planet [0]);
/* 000027 */ 				self.explain ();
/* 000027 */ 			});},
/* 000029 */ 			get explain () {return __get__ (this, function (self) {
/* 000031 */ 				document.getElementById ('explain').innerHTML = self.lines [self.lineIndex].format (self.planet [0], self.planet [self.lineIndex + 1]);
/* 000033 */ 				self.lineIndex = (self.lineIndex + 1) % 3;
/* 000033 */ 			});}
/* 000033 */ 		});
/* 000004 */ 		SolarSystem.planets = function () {
/* 000004 */ 			var __accu0__ = [];
/* 000004 */ 			var __iter0__ = enumerate (tuple ([tuple (['Mercury', 'hot', 2240]), tuple (['Venus', 'sulphurous', 6052]), tuple (['Earth', 'fertile', 6378]), tuple (['Mars', 'reddish', 3397]), tuple (['Jupiter', 'stormy', 71492]), tuple (['Saturn', 'ringed', 60268]), tuple (['Uranus', 'cold', 25559]), tuple (['Neptune', 'very cold', 24766])]));
/* 000004 */ 			for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
/* 000012 */ 				var __left0__ = __iter0__ [__index0__];
/* 000012 */ 				var index = __left0__ [0];
/* 000012 */ 				var planet = __left0__ [1];
/* 000004 */ 				__accu0__.append (chain (planet, tuple ([index + 1])));
/* 000004 */ 			}
/* 000004 */ 			return __accu0__;
/* 000004 */ 		} ();
/* 000015 */ 		SolarSystem.lines = tuple (['{} is a {} planet', 'The radius of {} is {} km', '{} is planet nr. {} counting from the sun']);
/* 000035 */ 		var solarSystem = SolarSystem ();
/* 000035 */ 		__pragma__ ('<use>' +
/* 000035 */ 			'itertools' +
/* 000035 */ 		'</use>')
/* 000035 */ 		__pragma__ ('<all>')
/* 000035 */ 			__all__.SolarSystem = SolarSystem;
/* 000035 */ 			__all__.solarSystem = solarSystem;
/* 000035 */ 		__pragma__ ('</all>')
/* 000035 */ 	}) ();
/* 000035 */ 	return __all__;
