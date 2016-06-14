import os

shipDir = os.path.dirname (os.path.abspath (__file__)) .replace ('\\', '/')
appRootDir = '/'.join  (shipDir.split ('/')[ : -2])
distributionDir = '/'.join  (appRootDir.split ('/')[ : -1])
dynWebRootDir, statWebRootDir = eval (open ('upload_all.nogit') .read ())

def getAbsPath (rootDir, relPath):
	return '{}/{}'.format (rootDir, relPath)

def copyWebsite (projRelPath, webRelPath, static = False, subdirs = False):
	 os.system ('xcopy /Y {} {} {}'.format ('/E' if subdirs else '', getAbsPath (appRootDir, projRelPath) .replace ('/', '\\'), getAbsPath (statWebRootDir if static else dynWebRootDir, webRelPath) .replace ('/', '\\')))

copyWebsite ('docs/sphinx/_build/html', 'docs/html/', True, True)

os.chdir (distributionDir)

os.system ('uploadPython')

os.system ('git add .')
os.system ('git commit -m"{}"'.format (input ('Description of commit: ')))
os.system ('git push origin master')

copyWebsite ('demos/pong/__javascript__/pong.js', 'static/__javascript__/')	# Site has special html with text and link to source

copyWebsite ('development/automated_tests/transcrypt/autotest.html', 'static/')
copyWebsite ('development/automated_tests/transcrypt/__javascript__/autotest.js', 'static/__javascript__/')

os.chdir (shipDir)
