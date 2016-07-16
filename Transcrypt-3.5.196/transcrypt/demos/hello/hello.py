from itertools import chain

class SolarSystem:
	planets = [chain (planet, (index + 1,)) for index, planet in enumerate ((
		('Mercury', 'hot', 2240),
		('Venus', 'sulphurous', 6052),
		('Earth', 'fertile', 6378),
		('Mars', 'reddish', 3397),
		('Jupiter', 'stormy', 71492),
		('Saturn', 'ringed', 60268),
		('Uranus', 'cold', 25559),
		('Neptune', 'very cold', 24766)	
	))]
	
	lines = (
		'{} is a {} planet',
		'The radius of {} is {} km',
		'{} is planet nr. {} counting from the sun'
	)
	
	def __init__ (self):
		self.lineIndex = 0
	
	def greet (self):
		self.planet = self.planets [int (Math.random () * len (self.planets))]
		document.getElementById ('greet') .innerHTML = 'Hello {}'.format (self.planet [0])
		self.explain ()
		
	def explain (self):
		document.getElementById ('explain').innerHTML = (
			self.lines [self.lineIndex] .format (self.planet [0], self.planet [self.lineIndex + 1])
		)
		self.lineIndex = (self.lineIndex + 1) % 3
		
solarSystem = SolarSystem ()
