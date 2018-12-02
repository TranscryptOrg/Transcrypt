from ..testcontext import Test
from ..constants import ONE_HUNDRED


def other_func():
    '''Main function of the program (called from ../index2.js)'''
    with Test('testing other file in a subdirectory') as test:
        test.result = test.random_num + ONE_HUNDRED
