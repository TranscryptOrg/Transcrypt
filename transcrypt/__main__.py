# ====== Legal notices
#
# Copyright 2014, 2015, 2016 Jacques de Hooge, GEATEC engineering, www.geatec.com
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# 	http://www.apache.org/licenses/LICENSE-2.0
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

programDir = os.getcwd () .replace ('\\', '/')
transpilerDir = os.path.dirname (os.path.abspath (__file__)) .replace ('\\', '/')
	
modulesDir = '{}/modules'.format (transpilerDir)

# Both CPython and Transcrypt will use all dirs in sys.path as search roots for modules
# CPython will also search relatively from each module, Transcrypt only from the main module

sys.path = [item.replace ('\\', '/') for item in sys.path]
compilerPath = [programDir, modulesDir] + sys.path	# Used by Transcrypt rather than CPython, programDir isn't always part of the path under Linux

try:
	sys.path.remove (transpilerDir)						# Used by CPython, leave out Transcrypt dir to prevent importing modules root if there's a module by that name
except:
	pass
													
sys.path += [modulesDir]
sys.modules.pop ('org', None)						# Unload org from a packages dir, if it's there.

from org.transcrypt import __base__					# May reload org from a packages dir (or load org from different location)
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
			webbrowser.open ('https://github.com/JdeH/Transcrypt')
			
		if not utils.commandArgs.source:
			return setExitCode (exitSourceNotGiven)	# Should never be here, dealth with by command arg checks already
						
		__symbols__ = utils.commandArgs.symbols.split ('$') if utils.commandArgs.symbols else []
		
		if utils.commandArgs.complex:
			__symbols__.append ('__complex__')
			
		if utils.commandArgs.esv:
			__symbols__.append ('__esv{}__'.format (utils.commandArgs.esv))
		else:
			__symbols__.append ('__esv{}__'.format (utils.defaultJavaScriptVersion))
			
		from org.transcrypt.stubs.browser import __set_stubsymbols__	# Import (ignored when transpiling) late, since commandArgs must be set already
		__set_stubsymbols__ (__symbols__)								# Make symbols available to CPython, seems that exec can't do that directly
		
		if utils.commandArgs.run:
			try:
				with open (utils.commandArgs.source) as sourceFile:
					exec (sourceFile.read ())
					return setExitCode (exitSuccess)
			except Exception as exception:
				utils.log (True, 'Error: cannot run {} using CPython: {}\n'.format (utils.commandArgs.source, str (exception) .replace (' (<string>', '') .replace (')', '')))
				return setExitCode (exitCannotRunSource)
		else:
			try:
				compiler.Program (compilerPath, __symbols__)
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
