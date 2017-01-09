# First run a test from the command prompt, generating an HTML file.
# The output of the test is stored in a DIV.
# Also the script is automatically included in the HTML file.
# Loading the HTML file will run the script.
# This will compare the output of the script running in the browswer to the output in the DIV.
# If those two match, the test reports OK, else it reports failure.


from org.transcrypt.stubs.browser import __main__, __envir__, __pragma__
from org.transcrypt.autotester.html import HTMLGenerator, DataConverter, JSTesterUI

# Don't import __envir__ from __base__ since it will overwrite __buildin__.__envir__ in the browser
# Import from stubs will be skipped in the browser
# ... The ice is a bit thin here

__pragma__ ('nokwargs')

import itertools

def getFileLocation(ancestor):
	""" This function needs to crawl up the stack
	and find out where the ancestor caller of
	this function was in the source code of either the
	python or javascript, depending on environment.
	@param ancestor the ancestor of this function that
	  we want to capture file information about.
	@return string indicating the file position and line number
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
		gpFrame = frames[(ancestor*2 + 1)]
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
	#ELSE
	# Needed because Transcrypt imports are compile time
	__pragma__("skip")
	from inspect import getframeinfo, stack
	s = stack()
	caller = getframeinfo(s[ancestor][0])
	# Trim the file name path so that we don't get
	# a lot of unnecessary content
	filepath = caller.filename
	# @todo - this is a hack - we should use os.path
	pathParts = filepath.split('/')
	filename = "/".join(pathParts[-2:])
	return( "%s:%d" % (filename, caller.lineno))
	__pragma__ ('noskip')



class AutoTester:
	""" Main testing class for comparing CPython to Transcrypt. This
	class is primarily used by calling the "check" method to confirm that
	the result is the same in both environments and "done" when all checks
	for a particular module have been completed.
	"""
	def __init__ (self, symbols = []):
		self.symbols = symbols
		# refDict/testDict contains the test results
		# of each testlet identified by name as the key
		self._currTestlet = "UNKNOWN"
		self.testDict = {}
		self.refDict = {}

		if __envir__.executor_name == __envir__.transpiler_name:
			self.ui = JSTesterUI()
		else:
			self.ui = None

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

	__pragma__('kwargs')
	def check (self, *args, ancestor = 2):
		""" Given a set of values from either the python or transcrypt
		environments, we log the position of the check call in the test
		and representative values of the passed arguments for later
		comparison.
		"""
		position=getFileLocation(ancestor)
		# N.B. stubs.browser provides a special sorting repr
		item = ' '.join ([self.sortedRepr (arg) for arg in args])
		if __envir__.executor_name == __envir__.transpiler_name:
			self.testDict[self._currTestlet].append((position,item))
		else:
			self.refDict[self._currTestlet].append((position,item))

	__pragma__('nokwargs')

	def expectException(self, func):
		""" This method attempts to call the passed method and
		checks to see whether an exception was generated.
		@return string indicating "no exception" or "exception"
		"""
		try:
			func()
			return("no exception")
		except Exception as exc:
			return("exception")

	def throwToError(self, func):
		""" This function invokes the passed function and then
		converts an exception to an error response so that
		the unit test can continue even in the case where an
		exception may or may not occur.
		"""
		try:
			return(func())
		except Exception as exc:
			return (None, "!!!{}".format(str(exc)))

	def checkEval(self, func):
		""" Check the result of the passed function which is
		invoked without arguments. If this function throws an
		exception, that exception is caught and converted to an error
		with can be compared against the result. This allows the
		user to control for exception that may or may not be generated
		in the unit tests
		"""
		ret = self.throwToError(func)
		self.check(ret, ancestor = 3)


	def checkPad(self, val, count):
		""" This method is to help manage flow control in unit tests and
        keep all unit tests aligned
		"""
		for i in range(0, count):
			self.check(val)

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

	def compare (self):
		# Load the python reference data from the hidden HTML div
		dc = DataConverter()
		self.refDict = dc.getPythonResults()

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
				self.ui.appendSeqRowName(key, len(refData))
				for i,(refPos, refItem) in enumerate(refData):
					self.ui.appendTableResult(key, None, None, refPos, refItem, False)
				continue
			# know we have testData so let's determine the total number of
			# errors for this test module. This will allow us to both set
			# the num of errors in the test module header row and set the
			# rows to the appropriate initial collapsed/expanded state.
			errCount= self._getTotalErrorCnt(testData, refData)
			collapse = (errCount == 0)
			self.ui.appendSeqRowName(key, errCount)

			# Now we will populate the table with all the rows
			# of data fro the comparison
			for i,(refPos, refItem) in enumerate(refData):
				try:
					# This will throw if testData's length is
					# shorter than refData's
					testPos,testItem = testData[i]
				except:
					testPos = None
					testItem = None

				self.ui.appendTableResult(
					key, testPos, testItem, refPos, refItem, collapse
				)

			totalErrors += errCount

		self.ui.setOutputStatus( totalErrors == 0 )


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
			if ( self.ui is not None ):
				self.ui.setOutputStatus(False)
				self.ui.showException(testletName, exc)
			else:
				# Error - No UI yet, reraise specific exception to enable finding out why
				raise


	def done (self):
		if __envir__.executor_name == __envir__.transpiler_name:
			self.compare ()
		else:
			fnameBase = __main__.__file__ [ : -3] .replace ('\\', '/') .rsplit ('/', 1) [-1]
			hg = HTMLGenerator(fnameBase)
			for minified in (False, True):
				hg.generate_html(self.refDict, minified)
