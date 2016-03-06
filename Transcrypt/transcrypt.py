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

sys.path [0] = sys.path [0] + '/modules'

from org.transcrypt import __base__
from org.transcrypt import utils
from org.transcrypt import compiler

programDir = os.getcwd () .replace ('\\', '/')
transpilerDir = os.path.dirname (os.path.abspath (__file__)) .replace ('\\', '/')	
modulesDir = '{}/modules'.format (transpilerDir)

licencePath = '{}/{}'.format (transpilerDir, '../license_reference.txt')	
if not os.path.isfile (licencePath):
	utils.log (True, 'Error: missing license reference file\n')
	exit (1)
	
utils.log (True, '{} (TM) Python to JavaScript Small Sane Subset Transpiler Version {}\n', __base__.__envir__.transpilerName.capitalize (), __base__.__envir__.transpilerVersion)
utils.log (True, 'Copyright (C) Geatec Engineering. License: Apache 2.0\n\n')
	
utils.commandArgs.parse ()
	
if utils.commandArgs.license:
	with open (licensePath) as licenseFile:
		bar = 80 * '='
		utils.log (True, '\n{}\n\n', bar)
		utils.log (True, '{}\n', licenseFile.read ())
		utils.log (True, '{}\n\n', bar)
		
if not utils.commandArgs.source:
	exit (0)
		
if utils.commandArgs.run:
	with open (utils.commandArgs.source) as sourceFile:
		exec (
			'import sys\n' +
			'sys.path [0] = sys.path [1 : ]\n' +	# "import transcrypt" should refer to library rather than to this file
			'sys.path.append (\'{}\')\n'.format (modulesDir) +
			sourceFile.read ()
		)
else:
	try:
		compiler.Program ([programDir, modulesDir] + [sitepackagesDir.replace ('\\', '/') for sitepackagesDir in site.getsitepackages ()])
	except utils.Error as error:
		utils.log (True, '\n{}\n', error)
		
		# Don't log anything else, even in verbose mode, since this would only be confusing
		if utils.debug:
			utils.log (True, '{}\n', traceback.format_exc ())
	except Exception as exception:
		utils.log (True, '\n{}', exception)
		
		# Have to log something else, because a general exception isn't informative enough
		utils.log (False, '{}\n', traceback.format_exc ())
	utils.log (True, 'Ready\n')
		