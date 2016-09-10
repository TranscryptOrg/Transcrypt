import sys
import os
import subprocess
import traceback

mypyPath = '{}/mypy-lang-0.4.4-and-api'.format (os.path.dirname (os.path.abspath (__file__)) .replace ('\\', '/'))
sys.path.append (mypyPath)

from mypy import api
from org.transcrypt import utils

def run (sourcePath):
	try:
		utils.log (True, 'Performing static type validation on application: {}\n', sourcePath)
		
		validationMessages = api.type_validator.validate ([sourcePath])
		
		if validationMessages:
			oldFileName = ''
			for validationMessage in validationMessages:
				if isinstance (validationMessage, api.StaticTypingError):
					if validationMessage.file_name != oldFileName:
						utils.log (True, '\tFile {}\n', validationMessage.file_name)
						oldFileName = validationMessage.file_name
					utils.log (True, '\t\tLine {}: {}\n', validationMessage.line_nr, validationMessage.description)
				elif isinstance (validationError, api.CompilationError):
					utils.log (True, '\t{}'.format (message))
				else:
					util.log (True, '\tUnknown error')
			utils.log (True, '\n')
	except Exception as exception:
		utils.log (False, traceback.format_exc ())
		raise exception
		
