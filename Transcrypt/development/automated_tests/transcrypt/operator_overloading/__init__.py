from org.transcrypt.stubs.browser import __pragma__

class Matrix:
	def __init__ (self, nRows, nCols, elements = []):
		self.nRows = nRows
		self.nCols = nCols
		
		if len (elements):
			self._ = elements
		else:
			self._ = [[0 for col in range (nCols)] for row in range (nRows)]
		
	def __mul__ (self, other):
		if type (other) == Matrix:
			result = Matrix (self.nRows, other.nCols)
			for iTargetRow in range (result.nRows):
				for iTargetCol in range (result.nCols):
					for iTerm in range (self.nCols):
						result._ [iTargetRow][iTargetCol] += self._ [iTargetRow][iTerm] * other._ [iTerm][iTargetCol]
			return result
		else:	# other is a scalar
			return self.__rmul__ (other)
				
	def __rmul__ (self, scalar):	# Only called if left operand is scalar, all other cases will call __mul__
		result = Matrix (self.nRows, self.nCols)
		for iRow in range (self.nRows):
			for iCol in range (self.nCols):	
				result._ [iRow][iCol] = scalar * self._ [iRow][iCol]
		return result
	
	def __add__ (self, other):
		result = Matrix (self.nRows, self.nCols)
		for iRow in range (self.nRows):
			for iCol in range (self.nCols):
				result._ [iRow][iCol] = self._ [iRow][iCol] + other._ [iRow][iCol]
		return result
		
	def __getitem__ (self, index):
		return self._ [index]

	def __setitem__ (self, index, value):
		self.elements_ [index] = value
		
	def __repr__ (self):
		return repr (self._)
		
def run (autoTester):
	m0 = Matrix (3, 3, [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 10]
	])
	
	m1 = Matrix (3, 3, [
		[10, 20, 30],
		[40, 50, 60],
		[70, 80, 90]
	])
	
	x = 3
	y = x * 4 * x
	fast = 2 * 3
	
	__pragma__ ('opov')
	
	slow = 2 + 3
	m2 = m0 * m1  + m1 * (m0 + m1)
	m3 = 2 * (2 * m0 * 3 * m1 + m2 * 4) * 2
	
	__pragma__ ('noopov')
	
	fast2 = 16 * y + 1
	
	autoTester.check (m0, m1)
	autoTester.check (x, y)
	autoTester.check (m2)
	autoTester.check (m3)
	autoTester.check (fast, slow, fast2)
