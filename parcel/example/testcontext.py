# importing random lib here implicitly tests import of standard modules
import random
from .constants import ONE_HUNDRED


########################################################
### Simple test class for running tests in contexts.
### (without doing a full testing framework)

class Test(object):
    def __init__(self, title):
        self.title = title
        self.random_num = random.randint(1, 100)
        self.result = 0

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, exc_tb):
        # runtime error
        if (exc_value):
            console.warn('Fail: {}  { exception raised }'.format(self.title))
            return None # raises the exception

        # check the result
        expected_value = self.random_num + ONE_HUNDRED
        if (expected_value == self.result):
            console.log('Pass: {}  { {} == {} }'.format(self.title, expected_value, self.result))
        else:
            console.warn('Fail: {}  { {} == {} }'.format(self.title, expected_value, self.result))
            console.error('Function did not return correct value. Expected {}, but got {}'.format(expected_value, self.result))
