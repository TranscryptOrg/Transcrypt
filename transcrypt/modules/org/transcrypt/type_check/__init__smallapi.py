import sys
import os
import subprocess
import traceback

mypyPath = '{}/mypy'.format (os.path.dirname (os.path.abspath (__file__)) .replace ('\\', '/'))
sys.path.append (mypyPath)

from mypy import api
from org.transcrypt import utils

def run (sourcePath):
    try:
        utils.log (True, 'Performing static type validation on application: {}\n', sourcePath)
        
        for line in api.run (sourcePath):
            utils.log (True, line)

        utils.log (True, '\n')
        
    except Exception as exception:
        print (traceback.format_exc ())
        utils.log (False, traceback.format_exc ())
        raise exception
        