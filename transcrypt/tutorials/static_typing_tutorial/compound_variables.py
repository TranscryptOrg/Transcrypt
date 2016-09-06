from typing import *

a = [1, 2, 3]					# list of ints
a = [11.0, 12, 13.0]			# wrong, list of ints and floats
a = (4, 5, 6)					# wrong, tuple of ints rather than list of ints
a = {4, 5, 6}					# wrong, set of ints rather than list of ints
a = [7, 8, 9, 10, 11]			# right, list ints
								
b = [1.0, 2, 3]					# list of ints and floats
b = [1, 2.0, 3.0]				# right, list of ints and floats
b = [1.0, 2.0, 'three']			# wrong, list of ints, floats and strings
								
c = [1.1, 2.2, 3.3]				# list of floats
c = [1, 2, 3]					# right, list of integers, which are specializations of floats
c = [4, 5.5, 6]					# right, list of integers and floats, which are specializations of integers
								
d = (1, 2)						# tuple of 2 ints
d = (3, 4, 5)					# wrong, tuple of 3 ints
								
e = [] # type: List [int]		# list of ints, explicitly typed since it is empty
e = [1, 2.5]					# wrong, float is no specialization of int
e = [3, 4, 5]					# right, list of ints
								
f = [[1]]						# list of lists of ints
f = [[1, 2], [3, 4]]			# right, list of list of ints 
f = [[1.5, 2.5], [3.5, 4.5]]	# wrong, float is no specialization of int
