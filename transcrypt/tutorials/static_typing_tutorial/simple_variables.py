from typing import *
from math import *

nr_of_persons = 100			# nr_of_persons gets type int
nr_of_persons *= 0.5		# wrong, float is no specialization of int
nr_of_persons = 10.5		# wrong, float is no specialization of int
	                        
weight = 65.5				# weight gets type float
weight *= 0.5				# right, weight is a float
weight = 65					# right, int is specialization of float
weight = 64.5				# right, weight is still a float
	                        
sum = '3' + 4				# wrong, strings and ints cannot be added  
diff = 2 - 3.5				# right, dif will be a float
diff = '5'					# wrong, strings is no specializatoin of float
	                        
quot = 5 / 2				# quot gets type float
quot2 = 5 // 2				# quot2 gets type int
count = 10					# count gets type int
count = quot				# wrong, float is no specialization of int
count = quot2				# right, quot2 is an int
	                        
a_max = max (3.5, 4)		# validator only uses types, not values, assumes that a_max may become a float
a_max = 3.5					# right, a_max is a float
	                        
a_max2 = max (3, 4)			# validator knows a_max becomes an int
a_max2 = 3.5				# wrong, float is no specialization of int
	                        
a_sin = 0					# a_sin gets type int, should have used 0.0 rather than 0
a_sin = sin (0)				# wrong, any sin is a float hence no specialization of int
	                        
a_round = round (3.5, 0)	# a_round gets type float, since the round function with second param gives a float
an_int = int (a_round)		# an_int gets type int
	                        
a_round = 4.5				# right, a_round is a float
an_int = 4.5				# wrong, float isn't a specializatoin of int
	                        
a_complex = 3.3j			# a_complex gets type complex
a_complex = 2.2				# right, float is specialization of complex
	                        
a_float = 2.2				# a_float gets type float
a_float = 3.3j				# wrong, complex is no specialization of real
