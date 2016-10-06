import os
import os.path
import sys
import datetime
import webbrowser
import argparse
import time

class CommandArgs:
	def __init__ (self):
		self.argParser = argparse.ArgumentParser ()
	
		self.argParser.add_argument ('-c', '--clean', help = 'clean source tree', action = 'store_true')
		self.argParser.add_argument ('-d', '--docs', help = 'make docs', action = 'store_true')
		self.argParser.add_argument ('-f', '--fcall', help = 'test fast calls', action = 'store_true')
		self.argParser.add_argument ('-i', '--inst', help = 'installed version rather than new one', action = 'store_true')
		
		self.__dict__.update (self.argParser.parse_args () .__dict__)

commandArgs = CommandArgs ()
		
transpileCommand = 'transcrypt' if commandArgs.inst else 'run_transcrypt'
		
if commandArgs.clean:
	answer0 = input ('\nWARNING: THIS PROGRAM MAY ERRONEOUSLY DELETE MANY VALUABLE FILES!\nUsing it is entirely at your own risk.\nRead the sourcecode if you want to know what it does.\nIf you\'re not sure that its harmless in your situation, DON\'T USE IT!!!\n\nARE YOU SURE YOU WANT TO CONTINUE? (y = yes, n = no) ')
	if answer0 != 'y':
		print ('\nShipment test aborted')
		sys.exit (1)
		
cleanFromTime = datetime.datetime.now ()

shipDir = os.path.dirname (os.path.abspath (__file__)) .replace ('\\', '/')
appRootDir = '/'.join  (shipDir.split ('/')[ : -2])

def getAbsPath (relPath):
	return '{}/{}'.format (appRootDir, relPath)

def test (relPath, fileNamePrefix, run = False, nodejs = False, switches = '', outputFileNamePrefix = ''):
	os.chdir (getAbsPath (relPath))
	

	redirect = ' > {}.out'.format (outputFileNamePrefix) if outputFileNamePrefix else ''
	
	os.system ('{} -b -m -dm -dt -da {}{}.py{}'.format (transpileCommand, switches, fileNamePrefix, redirect))

	if run:
		os.chdir (getAbsPath (relPath))
		
		if ' -e 6 ' in (' ' + switches + ' '):
			os.system ('{} -r -e 6 {}.py'.format (transpileCommand, fileNamePrefix))
		else:
			os.system ('{} -r {}.py'.format (transpileCommand, fileNamePrefix))		
	
	if nodejs:
		os.system ('start cmd /k node __javascript__/{}.js'.format (fileNamePrefix))
		time.sleep (5)
		webbrowser.open ('http://localhost:8080', new = 2)
	else:
		webbrowser.open ('file://{}/{}.html'.format (getAbsPath (relPath), fileNamePrefix), new = 2)
		
		filePath = '{}/{}.min.html'.format (getAbsPath (relPath), fileNamePrefix)
		if os.path.isfile (filePath):
			webbrowser.open ('file://{}'.format (filePath), new = 2)
	
# Perform all tests

for esvSwitch in ('', '-e 6 '):
	for fcallSwitch in (('', '-f ') if commandArgs.fcall else ('',)):
		switches = fcallSwitch + esvSwitch
		test ('demos/nodejs_demo', 'nodejs_demo', False, True, switches + '-p .none ')
		test ('development/automated_tests/hello', 'autotest', True, False, switches)
		test ('development/automated_tests/transcrypt', 'autotest', True, False, switches + '-c ')	
		test ('development/automated_tests/time', 'autotest', True, False, switches)	
		test ('development/manual_tests/module_random', 'module_random', False, False, switches)
		test ('development/manual_tests/transcrypt_only', 'transcrypt_only', False, False, switches)
		test ('development/manual_tests/static_types', 'static_types', False, False, switches + '-ds -dc -n ', 'static_types')
		test ('demos/hello', 'hello', False, False, switches)
		test ('demos/jquery_demo', 'jquery_demo', False, False, switches)
		test ('demos/d3js_demo', 'd3js_demo', False, False, switches)
		test ('demos/ios_app', 'ios_app', False, False, switches)
		test ('demos/react_demo', 'react_demo', False, False, switches)
		test ('demos/riot_demo', 'riot_demo', False, False, switches)
		test ('demos/plotly_demo', 'plotly_demo', False, False, switches)
		test ('demos/pong', 'pong', False, False, switches)
		test ('demos/turtle_demos', 'star', False, False, switches + '-p .user ')
		test ('demos/turtle_demos', 'snowflake', False, False, switches + '-p .user ')
		test ('demos/turtle_demos', 'mondrian', False, False, switches + '-p .user ')
		test ('demos/turtle_demos', 'mandala', False, False, switches + '-p .user ')
		test ('demos/terminal_demo', 'terminal_demo', False, False, switches)

# Make docs optionally since they cause a lot of diffs	
# Make them before target files are erased, since they are to be included in the docs
if commandArgs.docs:
	sphinxDir = '/'.join ([appRootDir, 'docs/sphinx'])
	os.chdir (sphinxDir)
	os.system ('touch *.rst')
	os.system ('make html')

# Optionally remove all targets	except documentation
if commandArgs.clean:
	removalList = []
	
	for rootDir, dirNames, fileNames in os.walk (appRootDir):
		rootDir = rootDir.replace ('\\', '/')
		
		if not '/docs/' in rootDir:
			for fileName in fileNames:
				filePath = '{}/{}'.format (rootDir.replace ('\\', '/'), fileName)
				if filePath.endswith ('.pyc') or datetime.datetime.fromtimestamp (os.path.getmtime (filePath)) >= cleanFromTime:
					removalList.append (filePath)
				
	print ('THE FOLLOWING FILES WILL ALL BE REMOVED:\n')

	for filePath in removalList:
		print (filePath)
		
	answer1 = input ('\nARE YOU SURE YOU WANT TO REMOVE ALL OF THE ABOVE FILES? (y = yes, n = no) ')

	if answer1 == 'y':
		for filePath in removalList:
			os.remove (filePath)
	else:
		print ('\nShipment test aborted')
		sys.exit (1)
		
print ('\nShipment test ready')
