# This module emulates some browser functionality when running on the desktop using CPython

import builtins
import tokenize
import os

from org.transcrypt import utils

# Get environment from runtime and correct executor to be interpreter

pathOfThisFile = os.path.dirname(os.path.abspath(__file__))
with tokenize.open (f'{pathOfThisFile}/../__runtime__.py') as runtimeFile:
    runtimeLines = runtimeFile.read () .split ('\n')
environmentLines = []
passing = False
for runtimeLine in runtimeLines:
    if runtimeLine.startswith ('__pragma__ (\'run\')'):
        passing = True
    elif runtimeLine.startswith ('__pragma__ (\'norun\')'):
        break;  # Currently only one janus section allowed, to avoid having to parse the whole runtime file.
    else:
        if passing:
            environmentLines.append (runtimeLine)
exec ('\n'.join (environmentLines))
__envir__.executor_name = __envir__.interpreter_name

# Set main to commandArgs.source rather than transcrypt
class __main__:
    __file__ = utils.commandArgs.source
    
# Browser root singleton
class window:
    class console:
        def log (*args):
            builtins.print ('console.log :\t', *args)
            
        def dir (arg):
            builtins.print ('console.dir :\t', arg, '\tof type\t', type (arg))

    def alert (anObject):
        input ('window.alert:\t {}\t(Press [ENTER] to continue)'.format (anObject))

# Add attributes of window to global namespace as is done in a browser
for attributeName in window.__dict__:
    vars () [attributeName] = window.__dict__ [attributeName]

# Make print on the desktop add 'console.log' prefix, to distinguish from alert 
def print (*args):
    console.log (*args)

# Ignore all pragma's when running CPython, since we can't control CPython's operation in a simple way
def __pragma__ (*args):
    pass
    
def __new__ (constructedObject):
    return constructedObject
    
__symbols__ = []
def __set_stubsymbols__ (symbols):
    global __symbols__
    __symbols__ = symbols
    