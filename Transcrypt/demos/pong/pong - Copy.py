from org.transcrypt.canvas import Canvas
 
orthoWidth = 1000
orthoHeight = 750
fieldHeight = 650

class Attribute:	# Attribute in the gaming sense of the word, rather than of an object
	def __init__ (self, game):
		self.game = game					# Attribute knows game it's part of
		self.game.attributes.append (self)	# Game knows all its attributes
		self.install ()						# Put in place graphical representation of attribute
		self.reset ()						# Reset attribute to start position
					
	def reset (self):		# Restore starting positions or score, then commit to Pyglet
		self.commit ()		# Nothing to restore for the Attribute base class
				
	def predict (self):
		pass
				
	def interact (self):
		pass
		
	def commit (self):
		pass
	   
class Sprite (Attribute):	# Here, a sprite is an attribute that can move
	def __init__ (self, game, width, height):
		self.width = width
		self.height = height
		Attribute.__init__ (self, game)
		
	def install (self):		# The sprite holds a pygletSprite, that pyglet can display
		pass
		# image = pyglet.image.create (
			# self.width,
			# self.height,
			# pyglet.image.SolidColorImagePattern ((255, 255, 255, 255))  # RGBA
		# )
 
		# image.anchor_x = self.width // 2	  # Middle of image is reference point
		# image.anchor_y = self.height // 2
		
		# self.pygletSprite = pyglet.sprite.Sprite (image, 0, 0, batch = self.game.batch)
		
	def reset (self, vX = 0, vY = 0, x = orthoWidth // 2, y = fieldHeight // 2):
		self.vX = vX		# Speed
		self.vY = vY
		
		self.x = x			# Predicted position, can be commit, no bouncing initially
		self.y = y
		
		Attribute.reset (self)
		
	def predict (self):		# Predict position, do not yet commit, bouncing may alter it
		self.x += self.vX * self.game.deltaT
		self.y += self.vY * self.game.deltaT

	def commit (self):		# Update pygletSprite for asynch draw
		pass
		# self.pygletSprite.x = self.x
		# self.pygletSprite.y = self.y
		 
class Paddle (Sprite):
	margin = 30 # Distance of paddles from walls
	width = 10
	height = 100
	speed = 400 # / s
	
	def __init__ (self, game, index):
		self.index = index	# Paddle knows its player index, 0 == left, 1 == right
		Sprite.__init__ (self, game, self.width, self.height)
		
	def reset (self):		# Put paddle in rest position, dependent on player index
		Sprite.reset (
			self,
			x = orthoWidth - self.margin if self.index else self.margin,
			y = fieldHeight // 2
		)
		
	def predict (self): # Let paddle react on keys
		self.vY = 0
		
		# if self.index:  # Right player
			# if self.game.keymap [pyglet.window.key.K]:  # Letter K pressed
				# self.vY = self.speed
			# elif self.game.keymap [pyglet.window.key.M]:
				# self.vY = -self.speed
		# else:			  # Left player
			# if self.game.keymap [pyglet.window.key.A]:
				# self.vY = self.speed
			# elif self.game.keymap [pyglet.window.key.Z]:
				# self.vY = -self.speed
				
		Sprite.predict (self)	# Do not yet commit, paddle may bounce with walls

	def interact (self):		# Paddles and ball assumed infinitely thin
		# Paddle touches wall
		self.y = max (self.height / 2, min (self.y, fieldHeight - self.height / 2))
		
		# Paddle hits ball
		if (
			(self.y - self.height // 2) < self.game.ball.y < (self.y + self.height // 2)
			and (
				(self.index == 0 and self.game.ball.x < self.x) # On or behind left paddle
				or
				(self.index == 1 and self.game.ball.x > self.x) # On or behind right paddle
			)
		):
			self.game.ball.x = self.x				# Ball may have gone too far already
			self.game.ball.vX = -self.game.ball.vX	# Bounce on paddle
		
			speedUp = 1 + 0.5 * (1 - abs (self.game.ball.y - self.y) / (self.height // 2)) ** 2
			self.game.ball.vX *= speedUp			# Speed will increase more if paddle near centre
			self.game.ball.vY *= speedUp
			
		
class Ball (Sprite):
	side = 8
	speed = 300 # / s
	
	def __init__ (self, game):
		Sprite.__init__ (self, game, self.side, self.side)
 
	def reset (self):	# Launch according to service direction with random angle offset from horizontal
		angle =	 (
			self.game.serviceIndex * Math.PI	# Service direction
			+
			(1 if Math.random () > 0.5 else -1) * Math.random () * Math.atan (fieldHeight / orthoWidth)
		)
		
		Sprite.reset (
			self,
			vX = self.speed * Math.cos (angle),
			vY = self.speed * Math.sin (angle)
		)
		
	def predict (self):
		Sprite.predict (self)		# Integrate velocity to position

		if self.x < 0:				# If out on left side
			self.game.scored (1)	#	Right player scored
		elif self.x > orthoWidth:
			self.game.scored (0)
			
		if self.y > fieldHeight:	# If it hit top wall
			self.y = fieldHeight	#	It may have gone too far already
			self.vY = -self.vY		#	Bounce
		elif self.y < 0:
			self.y = 0
			self.vY = -self.vY

class Scoreboard (Attribute):
	nameShift = 75
	scoreShift = 25
			
	def install (self): # Graphical representation of scoreboard are four labels and a separator line
		# def defineLabel (text, x, y):
			# return pyglet.text.Label (
				# text,
				# font_name = 'Arial', font_size = 24,
				# x = x, y = y,
				# anchor_x = 'center', anchor_y = 'center',
				# batch = self.game.batch
			# )
	
		# defineLabel ('Player AZ', 1 * orthoWidth // 4, fieldHeight + self.nameShift)	  # Player name
		# defineLabel ('Player KM', 3 * orthoWidth // 4, fieldHeight + self.nameShift)
 
		# self.playerLabels = (
			# defineLabel ('000', 1 * orthoWidth // 4, fieldHeight + self.scoreShift),	  # Player score
			# defineLabel ('000', 3 * orthoWidth // 4, fieldHeight + self.scoreShift)
		# )
 
		self.game.canvas.line (0, fieldHeight, orthoWidth, fieldHeight)	# Line
		
	def increment (self, playerIndex):
		self.scores [playerIndex] += 1
	
	def reset (self):
		self.scores = [0, 0]
		Attribute.reset (self)	# Only does a commit here
		
	def commit (self):			# Committing labels is adapting their texts
		pass
		#for playerLabel, score in zip (self.playerLabels, self.scores):
		#	playerLabel.text = '{}'.format (score)			
 
class Game:
	def __init__ (self):
		# self.batch = pyglet.graphics.Batch ()	  # Graphical reprentations insert themselves for batch drawing

		self.deltaT = 0								# Elementary timestep of simulation
		self.serviceIndex = 1 if Math.random () > 0.5 else 0	# Index of player that has initial service
		self.pause = True							# Start game in paused state
		
		self.canvas = Canvas ('canvas', 0)
		self.canvas.setAutoResize (True)
		self.canvas.onWindowResiste
		self.canvas.lineWidth = 2
		self.canvas.clear ()
		self.canvas.fillText ('Hello world')		

		self.attributes = []						# All attributes will insert themselves here
		self.paddles = [Paddle (self, index) for index in range (2)]	# Pass game as parameter self
		self.ball = Ball (self)
		self.scoreboard = Scoreboard (self)
			 
		self.window.on_draw = self.draw						# Install draw callback, will be called asynch
		self.window.onWindowResize = self.resize			# Install resize callback, will be called if resized
		
		self.window.set_location (							# Middle of the screen that it happens to be on
			(self.window.screen.width - self.window.width) // 2,
			(self.window.screen.height - self.window.height) // 2
		)
		
		self.window.clear ()
		self.window.flip ()									# Copy drawing buffer to window
		self.window.set_visible (True)						# Show window once its contents are OK
		self.deltaT = 1/60.									# Set deltaT for physics updates (may differ from frame interval)
		window.setInterval (self.update, self.deltaT)		# Install update callback to be called 60 times per s
 
	def rect (self, x0, y0, x1, y1):
		self.context.rect (x0, y0, x1, y1)
		self.context.fillStyle = 'white'
		self.context.fill ()
 
	def update (self):								# Note that update and draw are not synchronized
		if False:
			pass
		# if self.pause:									  # If in paused state
			# if self.keymap [pyglet.window.key.SPACE]:		  #	  If SPACEBAR hit
				# self.pause = False						  #		  Start playing
			# elif self.keymap [pyglet.window.key.ENTER]:	  #	  Else if ENTER hit
				# self.scoreboard.reset ()					  #		  Reset score
			# elif self.keymap [pyglet.window.key.ESCAPE]:	  #	  Else if ESC hit
				# self.exit ()								  #		  End game
				
		else:												# Else, so if in active state
			for attribute in self.attributes:				#	Compute predicted values
				attribute.predict ()
				
			for attribute in self.attributes:				#	Correct values for bouncing and scoring
				attribute.interact ()
				
			for attribute in self.attributes:				#	Commit them to pyglet for display
				attribute.commit ()
			
	def scored (self, playerIndex):				# Player has scored
		self.scoreboard.increment (playerIndex) # Increment player's points
		self.serviceIndex = 1 - playerIndex		# Grant service to the unlucky player
		
		for paddle in self.paddles:				# Put paddles in rest position
			paddle.reset ()

		self.ball.reset ()						# Put ball in rest position
		self.pause = True						# Wait for next round
		
	def draw (self):
		self.window.clear ()
		self.batch.draw ()		# All attributes added their graphical representation to the batch
		
	def resize (self, width, height):
		self.canvas.scale (width / orthoWidth, height / orthoHeight)
		
game = Game ()	# Create and run game

