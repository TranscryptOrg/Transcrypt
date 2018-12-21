from ..testcontext import Test
from ..constants import ONE_HUNDRED


def main():
    '''Main function of the program (called from ../index2.js)'''
    with Test('main py file in a subdirectory') as test:
        test.result = test.random_num + ONE_HUNDRED
