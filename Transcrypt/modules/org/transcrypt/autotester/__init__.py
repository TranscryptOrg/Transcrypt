# First run a test from the command prompt, generating an HTML file.
# The output of the test is stored in a DIV.
# Also the script is automatically included in the HTML file.
# Loading the HTML file will run the script.
# This will compare the output of the script running in the browswer to the output in the DIV.
# If those two match, the test reports OK, else it reports failure.

from org.transcrypt.__base__ import __envir__
from org.transcrypt.stubs.browser import *

import itertools

class AutoTester:
	def __init__ (self):
		self.referenceBuffer = []
		self.testBuffer = []
		self.messageDivId = 'message'
		self.referenceDivId = 'python'
		self.testDivId = 'transcrypt'
		
	def store (self, *args):
		item = ' '.join ([str (arg) for arg in args])
		if __envir__.executorName == __envir__.transpilerName:
			self.testBuffer.append (item)
		else:
			self.referenceBuffer.append (item)
		
	def dump (self):
		with open ('test.html', 'w') as aFile:
			aFile.write ('<script src="javascript/test.js"></script>\n\n')
			
			aFile.write ('<b>Status:</b>\n')
			aFile.write ('<div id="{}"></div><br><br>\n\n'.format (self.messageDivId))
			
			aFile.write ('<b>Reference output:</b>\n')
			aFile.write ('<div id="{}">{}</div><br><br>\n\n'.format (self.referenceDivId, '\t'.join (self.referenceBuffer)))
			
			aFile.write ('<b>Test output:</b>\n')
			aFile.write ('<div id="{}"></div>\n\n'.format (self.testDivId))

			aFile.write ('<script>test ();</script>\n')
		
	def compare (self):
		self.referenceBuffer = document.getElementById (self.referenceDivId) .innerHTML.split ('\t')
		for index, (testItem, referenceItem) in enumerate (zip (self.testBuffer, self.referenceBuffer)):
			if testItem != referenceItem:
				document.getElementById (self.messageDivId) .innerHTML = 'Test failed'
				test = zip ((self.referenceBuffer, self.referenceDivId), (self.testBuffer, self.testDivId))
				for buffer, divId in ((self.referenceBuffer, self.referenceDivId), (self.testBuffer, self.testDivId)):
					buffer = itertools.chain (buffer [ : index], ['*** ERROR ***'], buffer [index : ])
					document.getElementById (divId) .innerHTML = ' | '.join (buffer)
				break
		else:		
			document.getElementById (self.messageDivId) .innerHTML = 'Test succeeded'
			document.getElementById (testDivId) .innerHTML = ' | '.join (self.testBuffer)
			
	def done (self):
		if __envir__.executorName == __envir__.transpilerName:
			self.compare ()
		else:
			self.dump ()
