class SolarSystem:
	planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']
	kind = ['hot', 'sulphurous', 'fertile', 'reddish', 'stormy', 'ringed', 'cold', 'very cold']
	
	def __init__ (self):
		self.planetIndex = 3
		self.explainDistance = True
	
	def greet (self):
		self.planetIndex = int (Math.random () * len (self.planets))
		document.getElementById ('greet').innerHTML = 'Hello {}'.format (
			self.planets [self.planetIndex]
		)
		
	def explain (self):
		document.getElementById ('explain').innerHTML = (
			'{} is planet nr. {} counting from the sun'.format (
				self.planets [self.planetIndex], self.planetIndex + 1
			)
			if self.explainDistance else
			'{} is a {} planet'.format (
				self.planets [self.planetIndex], self.kind [self.planetIndex]
			)
		)
		self.explainDistance = not self.explainDistance
		
solarSystem = SolarSystem ()

