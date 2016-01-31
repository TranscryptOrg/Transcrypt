dragObject = None
dragOffset = [None, None]

class Canvas:
	width = 5000
	height = 3000
	def __init__ (self):
		self.objects = []
	
		self.div = document.createElement ('div')
		self.div.style.position = 'absolute'
		self.div.style.width = self.width
		self.div.style.height = self.height
		self.div.ondragover = self.dragOver
		self.div.ondrop = self.drop
		document.body.appendChild (self.div)
		
		self.dirty = False # Should be redundant
		self.downloadState ()
		
	def dragOver (self, e):
		e.dataTransfer.dropEffect = 'move'
		e.preventDefault ()
		
	def drop (self, e):
		if True or self.stateDownloaded:
			self.dirty = True
		
			nonlocal dragObject
			
			if dragObject:
				dragObject.x = e.x - dragOffset [0]
				dragObject.y = e.y - dragOffset [1]
				dragObject = None
			else:
				url = e.dataTransfer.getData ('text/plain')
				Image (url)
			
		e.preventDefault ()
		
	def getState (self):
		pass
		#return JSON.stringify ([anObject.getState () for anObject in self.objects])
		
	def setState (self, value):
		pass
		#self.objects = [Image (state ['url'], state ['x'], state ['y']) for state in JSON.parse (value)]
	
	def downloadState (self):	
		def ready (result):
			self.stateDownloaded = True
			self.dirty = False
			self.div.style.backgroundColor = '#7777ff'
			# aPrint ('download') #result.text)
			self.setState (result.text)

		self.stateDownloaded = False
		self.div.style.backgroundColor = '#ffffff'
			
		url = 'http://www.xyref.com/download_state'
		request = new XMLHttpRequest ()
		request.onreadystatechange = ready
		request.open ('GET', url, True)
		request.setRequestHeader ('content-type', 'application/json')
		request.send ()
		
	def uploadState (self):
		def ready (result):
			self.dirty = False
			aPrint ('upload') #result.text)
			
		if self.dirty:	
			url = 'http://www.xyref.com/upload_state'
			request = new XMLHttpRequest ()
			request.oncomplete = ready
			request.open ('POST', url, True)
			request.setRequestHeader ('content-type', 'application/json')
			request.send (self.getState ())	
			return True
		else:
			return False
		
canvas = Canvas ()	
window.downloadState = canvas.downloadState
window.uploadState = canvas.uploadState

class Image:
	normWidth = 100
	normHeight = 100
	def __init__ (self, url, x = 0, y = 0):	
		def load (e):
			alert (self.img.style)
			if self.img.width * self.img.height > self.normWidth * self.normHeight:
				if self.img.width > self.normWidth:
					self.img.style.width = self.normWidth
					self.img.style.height = 'auto'
					
				if self.img.height > self.normHeight:
					self.img.style.height = self.normHeight
					self.img.style.width = 'auto'
				
			aPrint ('Image loaded')
		
		canvas.objects.append (self)
		
		self.img = document.createElement ('img')
		self.img.xyrefObject = self
		self.img.onload = lambda: load ()
		self.img.src = url
		self.img.style.position = 'absolute'
		
		self.x = x
		self.y = y
					
		self.img.draggable = True
		self.img.onmouseover = self.mouseOver
		self.img.ondragstart = self.dragStart
		self.img.oncontextmenu = self.contextMenu
		document.body.appendChild (self.img)

	def mouseOver (self, e):
		e.target.style.cursor = 'pointer'

	def dragStart (self, e):
		nonlocal dragOffset
		dragObject = e.target.xyrefObject
		dragOffset = [e.x - dragObject.x, e.y - dragObject.y]
		e.dataTransfer.effectAllowed = 'move'
		
	def contextMenu (self, e):
		canvas.objects.remove (self)
		document.body.removeChild (self.img)
		e.preventDefault ()
		
	def getX (self):
		return int (self.img.left)
		
	def setX (self, value):
		self.img.style.left = value
	
	x = property (getX, setX)
	
	def getY (self):
		return int (self.img.top)
	
	def setY (self, value):
		self.img.style.top = value
		
	y = property (getY, setY)
	
	def getUrl (self):
		return self.img.src
	
	def setUrl (self, value):
		self.img.src = value
		
	url = property (getUrl, setUrl)
	
	def getState (self):
		return {'url': self.url, 'x': self.x, 'y': self.y}
		
	def setState (self, value):
		self.url = value ['url']
		self.x = value ['x']
		self.y = value ['y']
		return self

