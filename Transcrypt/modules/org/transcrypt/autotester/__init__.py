# First run a test from the command prompt, generating an HTML file.
# The output of the test is stored in a DIV.
# Also the script is automatically included in the HTML file.
# Loading the HTML file will run the script.
# This will compare the output of the script running in the browswer to the output in the DIV.
# If those two match, the test reports OK, else it reports failure.

from org.transcrypt.stubs.browser import *
from org.transcrypt.stubs.browser import __main__, __envir__, __pragma__
# Don't import __envir__ from __base__ since it will overwrite __buildin__.__envir__ in the browser
# Import from stubs will be skipped in the browser
# ... The ice is a bit thin here

__pragma__ ('nokwargs')

import itertools

okColor = 'green'
errorColor = 'red'
highlightColor = 'yellow'
testletNameColor = 'blue'

class AutoTester:
	def __init__ (self):
		self.referenceBuffer = []
		self.testBuffer = []
		self.messageDivId = 'message'
		self.referenceDivId = 'python'
		self.testDivId = 'transcrypt'
		
	def check (self, *args):
		item = ' '.join ([repr (arg) for arg in args])	# N.B. stubs.browser provides a special sorting repr
		if __envir__.executorName == __envir__.transpilerName:
			self.testBuffer.append (item)
		else:
			self.referenceBuffer.append (item)
		
	def dump (self, filePrename):
		for minified in (False, True):
			miniInfix = '.min' if minified else ''
			with open ('{}{}.html'.format (filePrename, miniInfix), 'w') as aFile:				
				aFile.write ('<b>Status:</b>\n')
				aFile.write ('<div id="{}"></div><br><br>\n\n'.format (self.messageDivId))
				
				aFile.write ('<b>Reference output:</b>\n')
				aFile.write ('<div id="{}">{}</div><br><br>\n\n'.format (self.referenceDivId, ' | '.join (self.referenceBuffer)))
				
				aFile.write ('<b>Test output:</b>\n')
				aFile.write ('<div id="{}"></div>\n\n'.format (self.testDivId))

				aFile.write ('<script src="{}/{}{}.js"></script>\n\n'.format (__envir__.targetSubDir, filePrename, miniInfix))
				
	def compare (self):
		self.referenceBuffer = document.getElementById (self.referenceDivId) .innerHTML.split (' | ')
		for index, (testItem, referenceItem) in enumerate (zip (self.testBuffer, self.referenceBuffer)):
			if testItem != referenceItem:
				document.getElementById (self.messageDivId) .innerHTML = '<div style="color: {}"><b>Test failed</b></div>'.format (errorColor)
				for buffer, divId, accentColor in ((self.referenceBuffer, self.referenceDivId, okColor), (self.testBuffer, self.testDivId, errorColor)):
					buffer = itertools.chain (buffer [ : index], [
						'!!! <div style="display: inline; color: {}; background-color: {}"><b><i>{}</i></b></div>'.format (accentColor, highlightColor, buffer [index])
					], buffer [index + 1 : ])
					document.getElementById (divId) .innerHTML = ' | '.join (buffer)
				break
		else:		
			document.getElementById (self.messageDivId) .innerHTML = '<div style="color: {}">Test succeeded</div>'.format (okColor)
			document.getElementById (self.testDivId) .innerHTML = ' | '.join (self.testBuffer)
			
	def run (self, testlet, testletName):
		self.check ('<div style="display: inline; color: {}"> --- Testlet: {} --- </div><br>'.format (testletNameColor, testletName))
		testlet.run (self)
		self.check ('<br><br>')
			
	def done (self):
		if __envir__.executorName == __envir__.transpilerName:
			self.compare ()
		else:
			self.dump (__main__.__file__ [ : -3] .replace ('\\', '/') .rsplit ('/', 1) [-1])
