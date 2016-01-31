class A:
	p = 1234
	def getX (self):
		return self._x

	def setX (self, value):
		self._x = value
		
	def getY (self):
		return self._y

	def setY (self, value):
		self._y = value
		
	def getY2 (self):
		return self._y

	def setY2 (self, value):
		self._y = value
		
	x, y, y2 = property (getX, setX), property (getY, setY), property (getY2, setY2)
	
A.q = 5678
	
def run (autoTester):
	a1 = A ()
	a2 = A ()

	a1.x = 5
	a1.y = 6
	
	a2.x = 7
	a2.y = 8

	autoTester.check (a1.x, a1.y, a1.y2, a2.x, a2.y, a2.y2, a1.p, a2.p, a1.q, a2.q)
