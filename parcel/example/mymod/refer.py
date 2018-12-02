# example of an imported file from a subdir that imports other files
from ..constants import MY_NAME

def refer_func(val):
    print('mymod/refer.py:', val, MY_NAME)
