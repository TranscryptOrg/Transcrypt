import os
import webbrowser

shipDir = os.path.dirname (os.path.abspath (__file__)) .replace ('\\', '/')
rootDir = '/'.join  (shipDir.split ('/')[ : -2])

def getAbsPath (relPath):
	return '{}/{}'.format (rootDir, relPath)

def test (relPath, fileNamePrefix, run = False):
	os.chdir (getAbsPath (relPath))
	os.system ('run_transcrypt -b {}{}.py'.format (fcallSwitch, fileNamePrefix))	

	if run:
		os.chdir (getAbsPath (relPath))
		os.system ('run_transcrypt -r {}.py'.format (fileNamePrefix))		
	
	webbrowser.open ('file://{}/{}.html'.format (getAbsPath (relPath), fileNamePrefix), new = 2)
	webbrowser.open ('file://{}/{}.min.html'.format (getAbsPath (relPath), fileNamePrefix), new = 2)

def autoTest (*args):
	test (*args, True)
	
for fcallSwitch in ('', '-f '):
	autoTest ('development/automated_tests/hello', 'autotest')
	autoTest ('development/automated_tests/transcrypt', 'autotest')
	test ('demos/hello', 'hello')
	test ('demos/jquery_demo', 'jquery_demo')
	test ('demos/d3js_demo', 'd3js_demo')
	test ('demos/pong', 'pong')
	if fcallSwitch:
		print ('Shipment test completed')
	else:
		input ('Close browser tabs opened by shipment test and press [enter] for fcall test')
