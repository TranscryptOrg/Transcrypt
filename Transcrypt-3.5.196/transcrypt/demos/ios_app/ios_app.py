import random

class Dice:
	def __init__ (self):
		document.body.addEventListener ('touchstart', lambda event: event.preventDefault ())
		document.body.addEventListener ('mousedown', lambda event: event.preventDefault ())
		document.body.style.margin = 0
		document.body.style.overflow = 'hidden';
	
		self.all = document.createElement ('div')
		self.all.style.color = 'white'
		self.all.style.backgroundColor = 'black'
		self.all.style.height = '100%'
		self.all.style.width = '100%'
		self.all.style.padding = 0
		self.all.style.margin = 0
		document.body.appendChild (self.all)
		
		self.dices = []
		
		for index in range (6):
			dice = document.createElement ('div')
			dice.normalColor = '#770000' if index < 3 else '#0000ff'
			dice.style.position = 'absolute'
			dice.style.backgroundColor = dice.normalColor
			dice.addEventListener ('touchstart', (lambda aDice: lambda: self.roll (aDice)) (dice))	# Returns inner lambda
			dice.addEventListener ('mousedown', (lambda aDice: lambda: self.roll (aDice)) (dice))
			self.dices.append (dice)
			self.all.appendChild (dice)
			
			dice.inner = document.createElement ('div')
			dice.inner.setAttribute ('unselectable', 'on')
			dice.inner.style.fontWeight = 'bold'
			dice.inner.style.textAlign = 'center'
			dice.inner.style.position = 'absolute'
			dice.inner.innerHTML = '?'
			dice.appendChild (dice.inner)
			
		self.banner = document.createElement ('div')
		self.banner.style.position = 'absolute'
		self.banner.style.cursor = 'pointer'
		self.banner.addEventListener ('touchstart', self.gotoTranscryptSite)
		self.banner.addEventListener ('mousedown', self.gotoTranscryptSite)
		self.banner.style.fontFamily = 'arial'
		self.banner.innerHTML = (
			'<span id="bannerLarge"><font color="777777">www.<b><i>' +
			'<font color="ff4422">T<font color="ffb000">r<font color="228822">a<font color="3366ff">n' +
			'<font color="ff4422">s<font color="ffb000">c<font color="228822">r<font color="3366ff">y<font color="ffb000">p<font color="228822">t' +
			'</i></b><font color="777777">.org<font size={}><font color="cccccc"></span>' +
			'<span id="bannerSmall"><i> Write your apps in Python for free!</i></span>'
		)
		self.all.appendChild (self.banner)

		self.bannerLarge = document.getElementById ('bannerLarge')
		self.bannerSmall = document.getElementById ('bannerSmall')
		
		self.audio = __new__ (Audio ('ios_app.mp3'))
		
		window.onresize = self.rightSize
		self.rightSize ()
		
	def gotoTranscryptSite (self):
		document.location.href = 'http://www.transcrypt.org'
		
	def roll (self, dice):
		frameIndex = 10

		self.audio.play ()
		
		def frame ():
			nonlocal frameIndex
			frameIndex -= 1
			
			dice.inner.innerHTML = random.randint (1, 6)

			if frameIndex:
				dice.style.color = random.choice (('red', 'green', 'blue', 'yellow'))
				setTimeout (frame, 100)
			else:
				dice.style.backgroundColor = dice.normalColor
				dice.style.color = 'white'
				
		frame ()
	
	def rightSize (self):
		self.pageWidth = window.innerWidth
		self.pageHeight = window.innerHeight
		portrait = self.pageHeight > self.pageWidth
		
		for index, dice in enumerate (self.dices):
			if self.pageHeight > self.pageWidth:	# Portrait
				dice.style.height = 0.3 * self.pageHeight
				dice.style.width = 0.4 * self.pageWidth
				dice.style.top = (0.03 + (index if index < 3 else index - 3) * 0.32) * self.pageHeight
				dice.style.left = (0.06 if index < 3 else 0.54) * self.pageWidth
				
				charBoxSide = 0.3 * self.pageHeight
				dice.inner.style.top = 0.15 * self.pageHeight - 0.6 * charBoxSide
				dice.inner.style.left = 0.2 * self.pageWidth - 0.5 * charBoxSide

				self.banner.style.top = 0.975 * self.pageHeight
				self.banner.style.left = 0.06 * self.pageWidth				
				self.bannerLarge.style.fontSize = 0.017 * self.pageHeight
				self.bannerSmall.style.fontSize = 0.014 * self.pageHeight
			else:									# Landscape
				dice.style.height = 0.4 * self.pageHeight
				dice.style.width = 0.3 * self.pageWidth
				dice.style.top = (0.06 if index < 3 else 0.54) * self.pageHeight
				dice.style.left = (0.03 + (index if index < 3 else index - 3) * 0.32) * self.pageWidth
				
				charBoxSide = 0.4 * self.pageHeight
				dice.inner.style.top = 0.2 * self.pageHeight - 0.6 * charBoxSide
				dice.inner.style.left = 0.15 * self.pageWidth - 0.5 * charBoxSide
				
				self.banner.style.top = 0.95 * self.pageHeight
				self.banner.style.left = 0.03 * self.pageWidth
				self.bannerLarge.style.fontSize = 0.015 * self.pageWidth
				self.bannerSmall.style.fontSize = 0.012 * self.pageWidth
				
			dice.inner.style.height = charBoxSide
			dice.inner.style.width = charBoxSide
			dice.inner.style.fontSize = charBoxSide
			
dice = Dice ()
