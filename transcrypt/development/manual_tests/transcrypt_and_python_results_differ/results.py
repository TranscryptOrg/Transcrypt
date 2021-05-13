'''
Test to find out if we can determine correctly wether we are in the Transcrypt/JavaScript or the CPython environment
'''

from org.transcrypt.stubs.browser import __envir__, __pragma__

if __envir__.executor_name == __envir__.transpiler_name:
    document.getElementById ('output') .innerHTML = 'Using Transcrypt'
    
__pragma__ ('skip')
print ('Using CPython')
__pragma__ ('noskip')
