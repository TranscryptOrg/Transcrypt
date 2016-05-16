import os
import webbrowser

shipDir = os.path.dirname (os.path.abspath (__file__)) .replace ('\\', '/')
rootDir = '/'.join  (shipDir.split ('/')[ : -2])

def getAbsPath (relPath):
	return '{}/{}'.format (rootDir, relPath)

def test (relPath, fileNamePrefix, run = False, switches = ''):
	os.chdir (getAbsPath (relPath))
	
	os.system ('run_transcrypt -b -m {}{}.py'.format (switches, fileNamePrefix))	

	if run:
		os.chdir (getAbsPath (relPath))
		os.system ('run_transcrypt -r {}.py'.format (fileNamePrefix))		
	
	webbrowser.open ('file://{}/{}.html'.format (getAbsPath (relPath), fileNamePrefix), new = 2)
	webbrowser.open ('file://{}/{}.min.html'.format (getAbsPath (relPath), fileNamePrefix), new = 2)
	
for fcallSwitch in ('', '-f '):
	test ('development/automated_tests/hello', 'autotest', True, fcallSwitch)
	test ('development/automated_tests/transcrypt', 'autotest', True, fcallSwitch)
	test ('demos/hello', 'hello', False, fcallSwitch)
	test ('demos/jquery_demo', 'jquery_demo', False, fcallSwitch)
	test ('demos/d3js_demo', 'd3js_demo', False, fcallSwitch)
	test ('demos/pong', 'pong', False, fcallSwitch)
	test ('demos/turtle_demos', 'star', False, fcallSwitch + '-p .user ')
	test ('demos/turtle_demos', 'snowflake', False, fcallSwitch + '-p .user ')
	
	if fcallSwitch:
		print ('Shipment test completed')
	else:
		input ('Close browser tabs opened by shipment test and press [enter] for fcall test')
