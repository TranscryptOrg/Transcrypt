__pragma__ ('skip')
document = Math = setInterval = clearInterval = 0
__pragma__ ('noskip')

_debug = False

def abs (vec2D):
	return Math.sqrt (vec2D [0] * vec2D [0] + vec2D [1] * vec2D [1])

_ns = 'http://www.w3.org/2000/svg'
_svg = document.createElementNS (_ns, 'svg')

_defaultElement = document.getElementById ('__turtlegraph__')
if not _defaultElement:
	_defaultElement = document.body
_defaultElement.appendChild (_svg)

_width = None
_height = None
_offset = None

def _rightSize (self):
	nonlocal _width
	nonlocal _height
	nonlocal _offset
	
	_width = _defaultElement.offsetWidth
	_height = _defaultElement.offsetHeight
	_offset = [_width // 2, _height // 2]
	
	_svg.setAttribute ('width', _width)
	_svg.setAttribute ('height', _height)
	
window.onresize = _rightSize

_rightSize ()

def bgcolor (color):
	nonlocal _defaultElement

	_bgcolor = color
	_defaultElement.style.backgroundColor = _bgcolor

bgcolor ('white')
	
def setDefaultElement (element):
	nonlocal _defaultElement

	_defaultElement.removeChild (_svg)
	_defaultElement = element
	element.appendChild (_svg)
	
	_rightSize ()
	bgcolor ('white')

_allTurtles = []
	
class Turtle:
	def __init__ (self):
		_allTurtles.append (self)
		self._paths = []
		self.reset ()
		
	def reset (self):
		self._heading = Math.PI / 2
		self.pensize (1)
		self.color ('black', 'black')
		self.down ()
		self._track = []	# Need to make track explicitly because:
		self.home ()		# 	Makes a position but needs a track to put in in
		self.clear ()		# 	Makes a track but needs a position to initialize it with
		
	def clear (self):
		for path in self._paths:
			_svg.removeChild (path)
		self._paths = []
		
		self._track = []
		self._moveto (self._position)
		
	def _flush (self):
		if _debug:
			print ('Flush:', self._track)
	
		if len (self._track) > 1:
			path = document.createElementNS (_ns, 'path')
			path.setAttribute ('d', ' '.join (self._track))
			path.setAttribute ('stroke', self._pencolor if self._pencolor != None else 'none')
			path.setAttribute ('stroke-width', self._pensize)
			path.setAttribute ('fill', self._fillcolor if self._fill and self._fillcolor != None else 'none')			
			path.setAttribute ('fill-rule', 'evenodd')
			_svg.appendChild (path)
			self._paths.append (path)
				
			self._track = []
			self._moveto (self._position)	# _track should start with a move command
		
	def done (self):
		self._flush ()
		
	def pensize (self, width):
		self._flush ()
		if width == None:
			return self._pensize
		else:
			self._pensize = width
	
	def color (self, pencolor, fillcolor = None):
		self._flush ()
		self._pencolor = pencolor
		
		if fillcolor != None:
			self._fillcolor = fillcolor
	
	def goto (self, x, y = None):
		if y == None:
			self._position = x
		else:
			self._position = [x, y]
			
		self._track.append ('{} {} {}'.format (
			'L' if self._down else 'M',
			self._position [0] + _offset [0],
			self._position [1] + _offset [1])
		)
		
	def _moveto (self, x, y = None):
		wasdown = self.isdown ()
		self.up ()
		self.goto (x, y)
		if wasdown:
			self.down ()
			
	def home (self):
		self._moveto (0, 0)
		
	def position (self):
		return self._position [:]
		
	def pos (self):
		return self.position ()
		
	def distance (self, x, y = None):
		if y == None:
			other = x
		else:
			other = [x, y]
			
		dX = other [0] - self._position [0]
		dY = other [1] - self._position [1]
		
		return Math.sqrt (dX * dX + dY * dY)
			
	def up (self):
		self._down = False
		
	def down (self):
		self._down = True
		
	def isdown (self):
		return self._down
		
	def _predict (self, length):
		delta = [Math.sin (self._heading), Math.cos (self._heading)]
		return [self._position [0] + length * delta [0], self._position [1] + length * delta [1]]
		
	def forward (self, length):
		self._position = self._predict (length)
		
		self._track.append ('{} {} {}'.format (
			'L' if self._down else 'M',
			self._position [0] + _offset [0],
			self._position [1] + _offset [1])
		)
		
	def back (self, length):
		self.forward (-length)
		
	def circle (self, radius):
		self.left (90)
		opposite = self._predict (2 * (radius + 1) + 1)
		self.right (90)
	
		self._track.append ('{} {} {} {} {} {} {} {}'.format (
			'A',
			radius,
			radius,
			0,
			1,
			0,
			opposite [0] + _offset [0],
			opposite [1] + _offset [1]
		))
		
		self._track.append ('{} {} {} {} {} {} {} {}'.format (
			'A',
			radius,
			radius,
			0,
			1,
			0,
			self._position [0] + _offset [0],
			self._position [1] + _offset [1]
		))
		
	def left (self, angle):
		self._heading = (self._heading + Math.PI * angle / 180) % (2 * Math.PI)
			
	def right (self, angle): 
		self.left (-angle)
		
	def begin_fill (self):
		self._flush ()
		self._fill = True
	
	def end_fill (self):
		self._flush ()
		self._fill = False
		
	def speed (speed = None):
		pass
		
_defaultTurtle = Turtle ()
_timer = None
	
def reset ():
	nonlocal _timer, _allTurtles
	if _timer:
		clearTimeout (_timer)
	bgcolor ('white')
	for turtle in _allTurtles:
		turtle.reset ()
		turtle.done ()
		
def clear ():
	nonlocal _allTurtles
	for turtle in _allTurtles:
		turtle.clear ()
		
def ontimer (fun, t = 0):
	nonlocal _timer
	_timer = setTimeout (fun, t)

def done ():							_defaultTurtle.done ()
def pensize (width):					_defaultTurtle.pensize (width)
def color (pencolor, fillcolor = None):	_defaultTurtle.color (pencolor, fillcolor)
def home ():							_defaultTurtle.home ()
def goto (x, y = None):					_defaultTurtle.goto (x, y)
def position ():						return _defaultTurtle.position ()
def pos ():								return _defaultTurtle.pos ()
def distance (x, y = None):				return _defaultTurtle.distance (x, y)
def up ():								_defaultTurtle.up ()
def down ():							_defaultTurtle.down ()
def forward (length):					_defaultTurtle.forward (length)
def back (length):						_defaultTurtle.back (length)
def circle (radius):					_defaultTurtle.circle (radius)
def left (angle):						_defaultTurtle.left (angle)
def right (angle):						_defaultTurtle.right (angle)
def begin_fill ():						_defaultTurtle.begin_fill ()
def end_fill ():						_defaultTurtle.end_fill ()
def speed (speed):						_defaultTurtle.speed (speed)
