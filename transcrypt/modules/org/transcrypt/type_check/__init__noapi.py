import sys
import os
import subprocess

mypyPath = '{}/mypy-lang-0.4.4'.format (os.path.dirname (os.path.abspath (__file__)) .replace ('\\', '/'))
sys.path.append (mypyPath)

from mypy import main
from mypy import build
from mypy import defaults
from mypy import git
from mypy import experiments
from mypy.build import BuildSource, BuildResult, PYTHON_EXTENSIONS
from mypy.errors import CompileError, set_drop_into_pdb, set_show_tb
from mypy.options import Options, BuildType
from mypy.version import __version__

PY_EXTENSIONS = tuple(PYTHON_EXTENSIONS)

from org.transcrypt import utils

def run (sourcePath):
	def logHeader (sourcePath):
		utils.log (True, 'Performing static type validation on application: {}\n', sourcePath)	
	
	try:
		options = Options ()
		# options.silent_imports = True
		result = main.type_check_only ([BuildSource (sourcePath, None, None)], None, options)
		
		if result.errors:
			logHeader (sourcePath)
			oldModuleName = ''
			for message in result.errors:
				if ': error:' in message:
					moduleName, lineNr, errorLabel, tail = message.split (':', 4)
					if moduleName != oldModuleName:
						utils.log (True, '\tFile {}\n', moduleName)
						oldModuleName = moduleName
					utils.log (True, '\t\tLine {}:{}\n', lineNr, tail)
			utils.log (True, '\n')
	except CompileError as compileError:
		if compileError.messages:
			logHeader (sourcePath)
			for message in compileError.messages:
				utils.log (True, '\t{}', message)
			utils.log (True, '\n')
		
