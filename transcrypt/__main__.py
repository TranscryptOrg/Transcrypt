# ====== Legal notices
#
# Copyright 2014, 2015, 2016 Jacques de Hooge, GEATEC engineering, www.geatec.com
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os
import sys
import traceback
import site
import atexit
import webbrowser

transpilerDir = os.path.dirname (os.path.abspath (__file__)) .replace ('\\', '/')   # Set of Transcrypt itself
modulesDir = '{}/modules'.format (transpilerDir)                                    # Set dir of Transcrypt-only modules

# Both CPython and Transcrypt will use dirs in sys.path as search roots for modules
# CPython will also search relatively from each module, Transcrypt only from the main module
# Use / rather than \ pervasively
sys.path = [item.replace ('\\', '/') for item in sys.path]

'''
# Leave out Transcrypt dir to prevent importing modules root if there's a module by that name
# This is needed for CPython and it won't hurt for Transcrypt 
try:
    sys.path.remove (transpilerDir)
except:
    pass
'''

# Unload org from a packages dir, if it happens to be there in the CPython installation
sys.modules.pop ('org', None)   

# Transcrypt needs to find modulesDir before CPython modules, so it will favor Transcrypt modules
transpilationDirs = [modulesDir] + sys.path

# The following imports are need by Transcryp itself, not by transpiled or executed user code
# The following imports will either reload the previously unloaded org or load org from different location
# CPython needs to find modulesDir after CPython modules, so it will favor CPython modules
sys.path.append (modulesDir)        
from org.transcrypt import __base__                 
from org.transcrypt import utils
from org.transcrypt import compiler

exitCodeNames = ('exitSuccess', 'exitCommandArgsError', 'exitNoLicense', 'exitSourceNotGiven', 'exitCannotRunSource', 'exitSpecificCompileError', 'exitGeneralCompileError')

for exitCode, exitCodeName in enumerate (exitCodeNames):
    vars () [exitCodeName] = exitCode

def main ():
    exitCode = exitCommandArgsError

    def exitHandler ():
        if exitCode == exitSuccess:
            utils.log (True, '\nReady\n')       
        else:
            utils.log (True, '\nAborted\n')
            
    atexit.register (exitHandler)
    
    def setExitCode (anExitCode):
        nonlocal exitCode
        exitCode = anExitCode
        return exitCode
    
    try:
        utils.log (True, '\n')
        licensePath = '{}/{}'.format (transpilerDir, 'license_reference.txt')   
        if not os.path.isfile (licensePath):
            utils.log (True, 'Error: missing license reference file\n')
            return setExitCode (exitNoLicense)
            
        utils.log (True, '{} (TM) Python to JavaScript Small Sane Subset Transpiler Version {}\n', __base__.__envir__.transpiler_name.capitalize (), __base__.__envir__.transpiler_version)
        utils.log (True, 'Copyright (C) Geatec Engineering. License: Apache 2.0\n\n')
        
        utils.commandArgs.parse ()
        
        if utils.commandArgs.license:
            with open (licensePath) as licenseFile:
                bar = 80 * '*'
                utils.log (True, '\n{}\n\n', bar)
                utils.log (True, '{}\n', licenseFile.read ())
                utils.log (True, '{}\n\n', bar)
                
        if utils.commandArgs.star:
            webbrowser.open ('https://github.com/qquick/Transcrypt')
            
        if not utils.commandArgs.source:
            return setExitCode (exitSourceNotGiven) # Should never be here, dealth with by command arg checks already
        
        # Prepend paths that are needed by transpiled or executed user code, since they have to be searched first
        # So user code favors Transcrypt modules over CPython modules
        extraDirs = utils.commandArgs.xpath.replace ('#', ' ') .split ('$') if utils.commandArgs.xpath else []
        
        sourcePath = utils.commandArgs.source.replace ('\\', '/')               # May be absolute or relative, in the latter case it may or may not specify a directory
        if '/' in sourcePath:                                                   # If directory specified
            sourceDir = sourcePath.rsplit ('/', 1)[0]                           #   Use it as source directory
        else:                                                                   # Else
            sourceDir = os.getcwd () .replace ('\\', '/')                       #   Use current working directory as source directory
            
        projectDirs = [sourceDir] + extraDirs
        
        sys.path [0 : 0] = projectDirs
        
        global transpilationDirs
        transpilationDirs [0 : 0] = projectDirs 
                       
        __symbols__ = utils.commandArgs.symbols.split ('$') if utils.commandArgs.symbols else []
        
        if utils.commandArgs.complex:
            __symbols__.append ('__complex__')
            
        __symbols__.append ('__py{}.{}__'.format (* sys.version_info [:2]))
            
        if utils.commandArgs.esv:
            __symbols__.append ('__esv{}__'.format (utils.commandArgs.esv))
        else:
            __symbols__.append ('__esv{}__'.format (utils.defaultJavaScriptVersion))
         
        # Import (ignored when transpiling) late, since commandArgs must be set already
        from org.transcrypt.stubs.browser import __set_stubsymbols__
        
        # Make symbols available to CPython, seems that exec can't do that directly
        __set_stubsymbols__ (__symbols__)
        
        if utils.commandArgs.run:
            try:
                with open (utils.commandArgs.source) as sourceFile:
                    exec (sourceFile.read (), globals (), locals ())
                    return setExitCode (exitSuccess)
            except Exception as exception:
                utils.log (True, 'Error: cannot run {} using CPython: {}\n'.format (utils.commandArgs.source, str (exception) .replace (' (<string>', '') .replace (')', '')))
                utils.log (True, traceback.format_exc())
                return setExitCode (exitCannotRunSource)
        else:
            try:
                compiler.Program (transpilationDirs, __symbols__)
                return setExitCode (exitSuccess)
            except utils.Error as error:
                utils.log (True, '\n{}\n', error)
                
                # Don't log anything else, even in verbose mode, since this would only be confusing
                if utils.commandArgs.dextex:
                    utils.log (True, '{}\n', traceback.format_exc ())
                    
                return setExitCode (exitSpecificCompileError)
            except Exception as exception:
                utils.log (True, '\n{}', exception)
                
                # Have to log something else, because a general exception isn't informative enough
                utils.log (True, '{}\n', traceback.format_exc ())
                
                return setExitCode (exitGeneralCompileError)
                
    except utils.CommandArgsError:
        return setExitCode (exitCommandArgsError)
        
    except utils.CommandArgsExit:
        return setExitCode (exitSuccess)
            
if __name__ == '__main__':
    sys.exit (main ())
