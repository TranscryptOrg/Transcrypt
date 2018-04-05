# Mersenne-Twister random number algorithm

import math

_array = [0 for i in range (624)]
_index = 0
_bitmask1 = (2 ** 32) - 1
_bitmask2 = 2 ** 31
_bitmask3 = (2 ** 31) - 1

def _fill_array():
    global _array
    for i in range (624):
        y = (_array [i] & _bitmask2) + (_array [(i + 1) % 624] & _bitmask3)
        _array [i] = _array [(i + 397) % 624] ^ (y >> 1)
        if y % 2 != 0:
            _array[i] ^= 2567483615
            
def _random_integer ():
    global _index
    global _array
    if _index == 0:
        _fill_array ()
    y = _array [_index]
    y ^= y >> 11
    y ^= (y << 7) & 2636928640
    y ^= (y << 15) & 4022730752
    y ^= y >> 18

    _index = (_index + 1) % 624
    return y

def seed (x = int (_bitmask3 * Math.random ())):
    global _array
    global _bitmask1
    _array [0] = x
    for i in  range (1, 624):
        _array [i] = ((1812433253 * _array [i - 1]) ^ ((_array [i - 1] >> 30) + i)) & _bitmask1

def randint (a, b):
    return a + _random_integer () % (b - a + 1)

def choice (seq):
    return seq [randint (0, len (seq) - 1)]

def random ():
    return _random_integer () / _bitmask3

def shuffle (x):    # Fisher-Yates unbiased shuffle
    for i in range (len (x) - 1, 0, -1):
        j = math.floor (random () * (i + 1))
        temp = x [i]
        x [i] = x [j]
        x [j] = temp
    
seed ()
