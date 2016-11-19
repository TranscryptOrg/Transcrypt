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

def getFileLocation():
	""" This function needs to crawl up the stack
	and find out where the grandparent caller of
	this function was in the source code of either the
	python or javascript, depending on environment.
	"""
	if __envir__.executor_name == __envir__.transpiler_name: # js
		s = None
		__pragma__('js', '{}',
			'''
			var e = new Error();
			if ( ! e.stack ) {
			  console.log("MAJOR ISSUE: Browser Error lacks Stack");
			} else {
			  s = e.stack;
			}
			''')
		# Now we will process the stack to find the grandparent
		# calling function
		# @note - I'm explicitly not including a 're' module
		#    dependency here
		frames = None
		__pragma__('js', '{}',
			'''
			var linereg = new RegExp("\\n\\r|\\n", "g");
			frames = s.toString().split(linereg);
			''')
		if ( frames is None or (len(frames) < 2)):
			__pragma__('js', '{}', 'console.log("Failed to Split Stack");')
			return("UNKNOWN:???")

		# @note - if the call stack in transcrypts javascript
		#   translation changes then this index may need to change
		#   @todo - need more work here to determine this because
		#     this is fragile
		gpFrame = frames[5]
		# This regex splits the string coming from the javascript
		# stacktrace so that we can connect the file and line number
		# runTests (http://localhost:8080/run/autotest.js:3159:8)
		#  func	      URL		      filename	  lineno:colno
		# Group 1 = function
		# Group 2 & 3 = protocol and hostname
		# Group 4 = Path on this host (filename is at the end)
		# Group 5 = lineno
		# Group 6 = column number in file
		frameReg = r"([^(]*)\(?([^:]*:)\/{2,3}([^:/]*:?)([^:]*):(\d+):(\d+)"
		m = None
		__pragma__('js', '{}',
			'''
			var r = new RegExp(frameReg);
			m = r.exec(gpFrame);
			''')
		if m:
			filepath = m[4]
			# Split the filepath and take the last element
			# to the get filename
			pathParts = filepath.split("/")
			filename = pathParts[len(pathParts)-1]
			lineno = m[5]
			return( "{}:{}".format(filename, lineno) )
		else:
			__pragma__('js', '{}', 'console.log("Failed to Match Frame");')
			return("UNKNOWN:???")
	else: #Python
		# Needed because Transcrypt imports are compile time
		# @note - I really want to differentiate python from
		#   javascript environments - I don't care what version
		#   of python - need to determine what that symbol should
		#   be
		__pragma__ ('ifdef', '__py3.6__')
		from inspect import getframeinfo, stack
		s = stack()
		caller = getframeinfo(s[2][0])
		# Trim the file name path so that we don't get
		# a lot of unnecessary content
		filepath = caller.filename
		# @todo - this is a hack - we should use os.path
		pathParts = filepath.split('/')
		filename = "/".join(pathParts[-2:])
		return( "%s:%d" % (filename, caller.lineno))
		__pragma__('else')
		return("UNKNOWN:???")
		__pragma__ ('endif')



class AutoTester:
	def __init__ (self, symbols = []):
		self.symbols = symbols
		# refDict/testDict contains the test results
		# of each testlet identified by name as the key
		self._currTestlet = "UNKNOWN"
		self.testDict = {}
		self.refDict = {}
		self.messageDivId = 'message'
		self.referenceDivId = 'python'
		self.refResultDivId = "pyresults"
		self.refPosDivId = "pypos"
		self.testDivId = 'transcrypt'
		self.tableId = 'resulttable'
		self.resultsDiv = 'results'
		self.faultRowClass = 'faultrow'
		self.testletHeaderClass = "testletheader"
		self.transValClass = "trans-val"
		self.transPosClass = "trans-pos"
		self.pyValClass = "py-val"
		self.pyPosClass = "py-pos"
		self.excArea = "exc-area"
		self.excHeaderClass = "exc-header"
		self.collapsedClass = "collapsed"
		self.modCollapseClass = "mod-collapsed"

	def sortedRepr (self, any):
		# When using sets or dicts, use elemens or keys
		# of one type, in sort order
		def tryGetNumKey (key):
			if type (key) == str:	# Try to interpret key as numerical, see comment with repr function in __builtins__
				try:
					return int (key)
				except:
					try:
						return float (key)
					except:
						return key
			else:
				return key

		if type (any) == dict:
			return '{' + ', '.join ([
				'{}: {}'.format (repr (key), repr (any [key]))
				for index, key in enumerate (sorted ([tryGetNumKey (key) for key in any.keys ()], key = lambda aKey: str (aKey)))
			]) + '}'
		elif type (any) == set:
			if len (any):
				return '{' + ', '.join (sorted ([str (item) for item in list (any)])) + '}'
			else:
				return repr (any)
		elif type (any) == range:
			return repr (list (any))
		else:
			return repr (any)

	def check (self, *args):
		position=getFileLocation()
		# N.B. stubs.browser provides a special sorting repr
		item = ' '.join ([self.sortedRepr (arg) for arg in args])
		if __envir__.executor_name == __envir__.transpiler_name:
			self.testDict[self._currTestlet].append((position,item))
		else:
			self.refDict[self._currTestlet].append((position,item))

	def expectException(self, func):
		try:
			func()
			return("no exception")
		except Exception as exc:
			return("exception")

	def _writeCSS(self, f):
		cssOut = """
		<style>
		  body {
		    max-width: 100%;
		  }
		  .faultrow > td {
		     background-color: LightCoral;
		  }
		  #resulttable {
		    border-collapse: collapse;
		    width: 100%;
		    table-layout: fixed;
		  }
		  #resulttable th, #resulttable td {
		    border: 1px solid grey;
		  }
		  .testletheader > td {
		    background-color: LightSkyBlue;
		  }
		  .header-pos {
		    width: 20%;
		  }
		  .header-val {
		    width: 30%;
		  }
		  .py-pos,.trans-pos {
		    width: 20%;
		    overflow: hidden;
		  }
		  .py-val, .trans-val {
		    width: 30%;
		    overflow-x: auto;
		  }
		  .exc-header {
	      color: red;
		  }
		  .collapsed {
		    display: None;
		  }
		</style>
		"""
		f.write(cssOut)

	def _writeStatusHeaderTemplate(self, f):
		f.write ('<b>Status:</b>\n')
		f.write ('<div id="{}"></div><br><br>\n\n'.format (self.messageDivId))

	def _writeHiddenResults(self, f):
		f.write('<div id="{}" style="display: None">'.format(self.referenceDivId))
		for key in self.refDict.keys():
			itemData = ' | '.join([x[1] for x in self.refDict[key]])
			posContent = ' | '.join([x[0] for x in self.refDict[key]])
			f.write('<div id="{}">\n'.format(key))
			# @note - we should probably HTML escape this
			#    data so that we don't get the HTML rendering
			#    engine mucking with our test result.
			f.write ('<div id="{}">{}</div>\n\n'.format (self.refResultDivId, itemData))
			f.write ('<div id="{}">{}</div>\n'.format(self.refPosDivId, posContent))
			f.write('</div>\n')
		f.write('</div></div>\n')

	def _writeTableArea(self, f):
		f.write ('<div id="{}"></div>'.format(self.excArea))
		f.write ('<div id="{}">'.format(self.resultsDiv))
		f.write ('<div> <a id="force-collapse" href="#"> Collapse All</a> <a id="force-expand" href="#">Expand All</a></div>')
		f.write ('<table id="{}"><thead><tr> <th colspan="2"> CPython </th> <th colspan="2"> Transcrypt </th> </tr>'.format(self.tableId))
		f.write ('<tr> <th class="header-pos"> Location </th> <th class="header-val"> Value </th> <th class="header-val"> Value </th> <th class="header-pos"> Location </th> </tr></thead><tbody></tbody>')
		f.write ('</table>')
		f.write ('</div>')

	def dump (self, filePrename):
		for minified in (False, True):
			miniInfix = '.min' if minified else ''
			fname = '{}{}.html'.format (filePrename, miniInfix)
			with open (fname, 'w') as aFile:
				aFile.write("<html><head>")
				self._writeCSS(aFile)
				aFile.write("</head><body>")
				self._writeStatusHeaderTemplate(aFile)

				self._writeHiddenResults(aFile)
				self._writeTableArea(aFile)

				aFile.write ('<script src="{}/{}{}.js"></script>\n\n'.format (__envir__.target_subdir, filePrename, miniInfix))
				aFile.write("</body></html>")

	def _setOutputStatus(self, success):
		if ( success ):
			document.getElementById (self.messageDivId) .innerHTML = '<div style="color: {}">Test succeeded</div>'.format (okColor)
		else:
			document.getElementById (self.messageDivId) .innerHTML = '<div style="color: {}"><b>Test failed</b></div>'.format (errorColor)

	def _appendTableResult(self, name, testPos, testItem, refPos, refItem, collapse=False):

		table = document.getElementById(self.tableId)
		# Insert at the end
		row = table.insertRow(-1);
		row.classList.add(name)
		if ( testItem != refItem ):
			row.classList.add(self.faultRowClass)
			refPos = "!!!" + refPos
		else:
			if ( collapse ):
				row.classList.add(self.collapsedClass)

		# Populate the Row
		cpy_pos = row.insertCell(0)
		cpy_pos.innerHTML = refPos
		cpy_pos.classList.add(self.pyPosClass)
		cpy_val = row.insertCell(1)
		cpy_val.innerHTML = refItem
		cpy_val.classList.add(self.pyValClass)
		trans_val = row.insertCell(2)
		if ( testItem is not None ):
			trans_val.innerHTML = testItem
		trans_val.classList.add(self.transValClass)
		trans_pos = row.insertCell(3)
		if ( testPos is not None ):
			trans_pos.innerHTML = testPos
		trans_pos.classList.add(self.transPosClass)

	def _extractPosResult(self, elem):
		resultData = None
		posData = None
		for e in elem.children:
			idStr = e.getAttribute("id")
			if ( idStr == self.refResultDivId):
				resultData = e.innerHTML.split(' | ')
			elif ( idStr == self.refPosDivId):
				posData = e.innerHTML.split(' | ')
			else:
				# Unknown Element - very strange
				pass
		return(posData, resultData)


	def _getPythonResults(self):
		""" Acquire the python unit test results from the
		    hidden div and parse into a dictionary.
		"""
		refData = document.getElementById(self.referenceDivId)
		# Each of the children of this element is in the form
		# <div id="{key}">
		#   <div id="pyresults"> {Result Content} </div>
		#   <div id="pypos"> {Result Positions} </div>
		# </div>
		for child in refData.children:
			keyName = child.getAttribute("id")
			posData,resultData = self._extractPosResult(child)
			self.refDict[keyName] = zip(posData, resultData)

	def _collapseModule(self, headerRow, doCollapse):
		""" collapse/expand particular module in the table of results
		"""
		name = headerRow.id
		table = document.getElementById(self.tableId)
		clsName = self._getRowClsName(name)
		allRows = table.tHead.children
		rows = filter(lambda x: x.classList.contains(clsName), allRows)

		for row in rows:
			if ( doCollapse ):
				row.classList.add(self.collapsedClass)
			else:
				row.classList.remove(self.collapsedClass)

		if ( doCollapse ):
			headerRow.classList.add(self.modCollapseClass)
		else:
			headerRow.classList.remove(self.modCollapseClass)


	def _appendSeqRowName(self, name, errCount):
		"""
		"""
		table = document.getElementById(self.tableId)
		# Insert at the end
		row = table.insertRow(-1);
		row.id = name
		row.classList.add(self.testletHeaderClass)
		if ( errCount == 0 ):
			row.classList.add(self.modCollapseClass)

		def toggleCollapse(evt):
			""" Toggle whether the
			"""
			headerRow = evt.target.parentElement
			doCollapse = not headerRow.classList.contains(self.modCollapseClass)
			self._collapseModule(headerRow, doCollapse)

		row.onclick = toggleCollapse

		# Populate the Row
		headerCell = row.insertCell(0)
		headerCell.innerHTML = name + " | Errors = " + str(errCount)
		headerCell.colSpan = 4
		headerCell.style.textAlign= "center"


	def _getRowClsName(self, name):
		return("mod-" + name)

	def _getTotalErrorCnt(self, testData, refData):
		""" This method determines the total number of non-matching
		    values in the test and reference data for a particular module.
		"""
		errCount = 0
		for i,(refPos, refItem) in enumerate(refData):
			try:
				testPos,testItem = testData[i]
				if ( testItem != refItem ):
					errCount+=1
			except:
				errCount+=1
		return(errCount)

	def _expandCollapseAllFuncs(self):
		""" This function sets up the callback handlers for the
		collapse all and expand all links
		"""

		def applyToAll(evt, collapse):
			"""
			"""
			table = document.getElementById(self.tableId)

			# find all rows in the testletheader class
			filtFunc = lambda x: x.classList.contains(self.testletHeaderClass)
			headerRows = filter(filtFunc, table.tHead.children)

			for headerRow in headerRows:
				self._collapseModule(headerRow, collapse)

		def collapseAll(evt):
			""" collapse all rows handler
			"""
			evt.preventDefault()
			applyToAll(evt, True)
			return(False)


		def expandAll(evt):
			""" Expand All Rows Handler
			"""
			evt.preventDefault()
			applyToAll(evt, False)
			return(False)

		forceCollapse = document.getElementById("force-collapse")
		forceCollapse.onclick = collapseAll

		forceExpand = document.getElementById("force-expand")
		forceExpand.onclick = expandAll

	def compare (self):
		# Setup the functions that expand or contract all
		# elements of the table
		self._expandCollapseAllFuncs()
		self._getPythonResults()

		totalErrors = 0
		sKeys = sorted(self.refDict.keys())
		for key in sKeys:
			refData = self.refDict[key]
			try:
				testData = self.testDict[key]
				if ( testData is None ):
					raise KeyError("No Test Data Module: {}".format(key))
			except KeyError:
				# No Test Data found for this key - we will populate with
				# errors for all ref data
				self._appendSeqRowName(key, len(refData))
				clsName = self._getRowClsName(key)
				for i,(refPos, refItem) in enumerate(refData):
					self._appendTableResult(clsName, None, None, refPos, refItem, False)
				continue
			# know we have testData so let's determine the total number of
			# errors for this test module. This will allow us to both set
			# the num of errors in the test module header row and set the
			# rows to the appropriate initial collapsed/expanded state.
			errCount= self._getTotalErrorCnt(testData, refData)
			collapse = (errCount == 0)
			self._appendSeqRowName(key, errCount)

			# Now we will populate the table with all the rows
			# of data fro the comparison
			clsName = self._getRowClsName(key)
			for i,(refPos, refItem) in enumerate(refData):
				try:
					# This will throw if testData's length is
					# shorter than refData's
					testPos,testItem = testData[i]
				except:
					testPos = None
					testItem = None

				self._appendTableResult(
					clsName, testPos, testItem, refPos, refItem, collapse
				)

		totalErrors += errCount
		self._setOutputStatus( totalErrors == 0 )

	def _showException(self, testname, exc):
		"""
		"""
		excElem = document.getElementById(self.excArea)
		header = document.createElement("H2")
		header.classList.add(self.excHeaderClass)
		header.innerHTML = "Exception Thrown in JS Runtime";
		excElem.appendChild(header)
		content = document.createElement("p")
		content.innerHTML = "Exception in {}: {}".format(testname, str(exc))
		excElem.appendChild(content)
		stacktrace = document.createElement("p")
		if ( exc.stack is not None ):
			stacktrace.innerHTML = str(exc.stack)
		else:
			stacktrace.innerHTML = "No Stack Trace Available!"

	def _cleanName(self, name):
		""" Clean the passed name of characters that won't be allowed
		    in CSS class or HTML id strings.
		"""
		# Convert testletName to replace any of the characters that
		# are not acceptable in a CSS class or HTML id - this is to
		# make our lives easier
		# @note - I'm SPECIFICALLY not using a regex here because the
		#   regex engine module is still under dev and could possibly
		#   have issues
		ret = name
		invalidChars = [
			'~', '!', '@', '$', '%',
			'^', '&', '*', '(', ')',
			'+', '=', ',', '.', '/',
			"'", ';', ':', '"', '?',
			'>', '<', '[', ']', '\\',
			'{', '}', '|', '`', '#',
			" ",
		]
		for ch in invalidChars:
			ret = ret.replace(ch, "_")
		return(ret)

	def run (self, testlet, testletName):
		testletName = self._cleanName(testletName)
		self._currTestlet = testletName
		if __envir__.executor_name == __envir__.transpiler_name:
			self.testDict[self._currTestlet] = []
		else:
			self.refDict[self._currTestlet] = []
		try:
			testlet.run (self)
		except Exception as exc:
			self._setOutputStatus(False)
			self._showException(testletName, exc)


	def done (self):
		if __envir__.executor_name == __envir__.transpiler_name:
			self.compare ()
		else:
			self.dump (__main__.__file__ [ : -3] .replace ('\\', '/') .rsplit ('/', 1) [-1])
