from org.transcrypt.stubs.browser import *
from org.transcrypt.stubs.browser import __pragma__

__pragma__ ('opov')

class Test:
	def __getitem__ (self, index):
		print ('getitem (', index, ')')
		
	def __setitem__ (self, index, value):
		print ('setitem (', index, ')', value)
		
	def __getslice__ (self, start, stop, step):
		print ('getslice (', start, stop, step, ')')
	
	def __setslice__ (self, start, stop, step, value):
		print ('setslice (', start, stop, step, ')', value)

a = b = c = d = e = f = g = h = i = j = k = l = Test ()
		
a [1:2:3, 4:5:6] = b [7:8:9]
c [1:2:3] = d [4:5:6, 7:8:9]
e [1, 1:2:3, 3] = f [4, 4:5:6, 6]
g [1, 2, 3] = h [1, 2, 3]
i [1] = j [1]
k [1:2:3] = l [1:2:3]
