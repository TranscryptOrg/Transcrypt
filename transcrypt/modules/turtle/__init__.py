def abs (vec2D):
	return Math.sqrt (vec2D [0] * vec2D [0] + vec2D [1] * vec2D [1])

_ns = 'http://www.w3.org/2000/svg'
_svg = document.createElementNS (_ns, 'svg')
document.body.appendChild (_svg)

_width = 0
_height = 0
_offset = 0
		
def rightSize (self):
	nonlocal _width
	nonlocal _height
	nonlocal _offset
	
	_width = window.innerWidth
	_height = window.innerHeight
	_offset = [_width // 2, _height // 2]
	
	_svg.setAttribute ('width', _width)
	_svg.setAttribute ('height', _height)
	
window.onresize = rightSize
rightSize ()
	
class Turtle:
	def __init__ (self):
		self.reset ()
		
	def reset (self):
		self.clear ()	
		self.pensize (1)
		self.color ('black')
		self._heading = Math.PI / 2
		self.home ()
		self.down ()
		
	def clear (self):
		self._path = []
		
	def done (self):
		path = document.createElementNS (_ns, 'path')
		path.setAttribute ('stroke', 'none' if self._pencolor == None else self._pencolor)
		path.setAttribute ('fill', 'none' if self._fillcolor == None else self._fillcolor)			
		path.setAttribute ('fill-rule', 'evenodd')
			
		path.setAttribute ('d', self._path)
		_svg.appendChild (path)
		
	def pensize (self, width):
		if width == None:
			return self._pensize
		else:
			self._pensize = width
	
	def color (self, pencolor, fillcolor = None):
		self._pencolor = pencolor
		self._fillcolor = fillcolor
	
	def home (self):
		self.goto (0, 0)
	
	def goto (self, x, y = None):
		if y == None:
			self._position = x
		else:
			self._position = [x, y]
			
		self._path.append ('{} {} {}'.format ('M', self._position [0] + _offset [0], self._position [1] + _offset [1]))
			
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
		
	def forward (self, length):
		delta = [Math.sin (self._heading), Math.cos (self._heading)]			

		self._position [0] += length * delta [0]
		self._position [1] += length * delta [1]
		
		self._path.append ('{} {} {}'.format ('L' if self._down else 'M', self._position [0] + _offset [0], self._position [1] + _offset [1]))
		
	def back (self, length):
		self.forward (-length)
		
	def left (self, angle):
		self._heading = (self._heading + Math.PI * angle / 180) % (2 * Math.PI)
			
	def right (self, angle): 
		self.left (-angle)
		
	def begin_fill (self):
		pass
	
	def end_fill (self):
		pass
		
_defaultTurtle = Turtle ()
	
def reset ():							_defaultTurtle.reset ()
def clear ():							_defaultTurtle.clear ()
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
def back (length):						_defaultTurtle.back (lenght)
def left (angle):						_defaultTurtle.left (angle)
def right (angle):						_defaultTurtle.right (angle)
def begin_fill ():						_defaultTurtle.begin_fill ()
def end_fill ():						_defaultTurtle.end_fill ()
