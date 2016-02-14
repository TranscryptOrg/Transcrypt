import os
import sys

sys.path.append ('{}/pyflakes'.format (os.path.dirname (os.path.abspath (__file__)) .replace ('\\', '/')))

import pyflakes.checker

def run (sourceFile, parseTree):
	print ('>>>', sourceFile)
	for message in pyflakes.checker.Checker (parseTree, sourceFile) .messages:
		print (message)

	
	