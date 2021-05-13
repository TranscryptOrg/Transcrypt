from typing import *
from math import *

nrOfPersons = 100           # nr_of_persons gets type int
nrOfPersons *= 0.5          # wrong, float is no specialization of int
nrOfPersons = 10.5          # wrong, float is no specialization of int
                            
weight = 65.5               # weight gets type float
weight *= 0.5               # right, weight is a float
weight = 65                 # right, int is specialization of float
weight = 64.5               # right, weight is still a float
                            
sum = '3' + 4               # wrong, strings and ints cannot be added  
diff = 2 - 3.5              # right, dif will be a float
diff = '5'                  # wrong, strings is no specializatoin of float
                            
quot = 5 / 2                # quot gets type float
quot2 = 5 // 2              # quot2 gets type int
count = 10                  # count gets type int
count = quot                # wrong, float is no specialization of int
count = quot2               # right, quot2 is an int
                            
aMax = max (3.5, 4)        # validator only uses types, not values, assumes that a_max may become a float
aMax = 3.5                  # right, a_max is a float
                            
aMax2 = max (3, 4)          # validator knows a_max becomes an int
aMax2 = 3.5                 # wrong, float is no specialization of int
                            
aSin = 0                    # aSin gets type int, should have used 0.0 rather than 0
aSin = sin (0)              # wrong, any sin is a float hence no specialization of int
                            
aRound = round (3.5, 0)     # aRound gets type float, since the round function with second param gives a float
anInt = int (aRound)        # anInt gets type int
                            
aRound = 4.5                # right, a_round is a float
anInt = 4.5                 # wrong, float isn't a specialization of int
                            
aComplex = 3.3j             # aComplex gets type complex
aComplex = 2.2              # right, float is specialization of complex
                            
aFloat = 2.2                # aFloat gets type float
aFloat = 3.3j               # wrong, complex is no specialization of real

anInt2 = 3                  # int
anInt2 = 3.5                # wrong, float

aFloat2: float = 4          # right, float, int is specialization or float
aFloat2 = 4.5               # right, float

anInt3: int = 5.5           # wrong, int, float is no specialization of int

