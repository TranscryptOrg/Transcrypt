class A:
	p = 1234
	def getX (self):
		return self._x

	def setX (self, value):
		self._x = value
			
	def getY (self):
		return self._y

	def setY (self, value):
		self._y = 1000 + value	# Weird but should be possible
		
	def getY2 (self):
		return self._y

	def setY2 (self, value):
		self._y = value
		
	def getT	(self):
		return self._t

	def setT (self, value):
		self._t = value
		
	def getU (self):
		return self._u + 10000

	def setU (self, value):
		self._u = value - 5000
			
	x, y, y2 = property (getX, setX), property (getY, setY), property (getY2, setY2)
	t = property (getT, setT)
	u = property (getU, setU)
	
A.q = 5678

class B:
	def getZ (self):
		return self.z_
	
	def setZ (self, value):
		self.z_ = value
		
	z = property (getZ, setZ)
	
class C:
	def __init__ (self):
		self.offset = 1234

	def getW (self):
		return self.w_ + self.offset
		
	def setW (self, value):
		self.w_ = value - self.offset
		
	w = property (getW, setW)
	
def run (autoTester):
	a1 = A ()
	a2 = A ()

	a1.y2 = 1000
	a2.y2 = 2000
	
	a1.x = 5
	a1.y = 6
	
	a2.x = 7
	a2.y = 8

	a1.t = 77
	a1.u = 88
		
	autoTester.check (a1.x, a1.y, a1.y2)
	autoTester.check (a2.x, a2.y, a2.y2)
	autoTester.check (a1.p, a2.p, a1.q, a2.q)
	
	autoTester.check (a1.t, a1.u)
	
	b = B ()
	c = C ()
	
	b.z = 100100
	c.z = 200200
	c.w = 300300
	
	autoTester.check (a1.x, b.z, c.z, c.w)
	
	c.w = 400400
	c.z = 500500
	b.z = 600600
	
	autoTester.check (a1.x, b.z, c.z, c.w)
