import sys
import os
import subprocess
import traceback

try:
    from mypy import api
except:
    print ('Could not find mypy')
    
from org.transcrypt import utils

def run (sourcePath):
    utils.log (True, 'Performing static type validation on application: {}\n', sourcePath)
    
    try:
        stdOutReport, stdErrReport, exitStatus = api.run ([
            sourcePath
        ])
    except Exception as exception:
        print (exception)
    
    if stdOutReport:
        utils.log (True, 'The following inconsistencies were found:\n')
        for stdOutLine in stdOutReport.split ('\n'):
            utils.log (True, '\t{}\n', stdOutLine)
            
    if stdErrReport:
        utils.log (True, 'Problems encountered during static type check\n')
        for stdErrLine in stdErrReport.split ('\n'):
            utils.log (True, '\t{}\n', stdErrLine)
                    
    utils.log (True, '\n')
        
    
        