
from org.transcrypt.stubs.browser import __pragma__
import re
__pragma__("skip")
re.J = (1<<19)
re.JSSTRICT = re.J
__pragma__("noskip")

testStr1 = "There,is,No,Time"
testStr2 = "som[23] In[23423] the[34].asd[934].234."
testStr3 = "s(43) d(03) asdfasd dsfsd(3) sd"
testStr4 = "Were an apple like an orange then apple orange no appleorange"

def checkMatchProperties(test, flags = 0):
	""" This test checks that properties on the match
	are reported correctly, and that they are read-only
	"""
	result = re.search(",", testStr1, flags)
	if ( result is not None ):
		test.check( result.pos )
		test.check( result.endpos )
		test.check( result.group() )
		test.check( result.group(0) )
		test.check( result.string )

		# Check readonly props of match
		def assignPos():
			result.pos = 1
		test.check(test.expectException(assignPos))
		def assignEndPos():
			result.endpos = 1
		test.check(test.expectException(assignEndPos))
		def assignRe():
			result.re = "asdfasdf"
		test.check(test.expectException(assignRe))
		def assignStr():
			result.string = "asdf"
		test.check(test.expectException(assignStr))
		def assignLastGroup():
			result.lastgroup = "asdfasdf"
		test.check(test.expectException(assignLastGroup))
		def assignLastIndex():
			result.lastindex = 33
		test.check(test.expectException(assignLastIndex))
	else:
		test.checkPad("NULL", 11)


def checkRegexProperties(test, flags = 0):
	""" This test checks that the appropriate properties
	exist on the Regex object and that these properties
	are read-only.
	"""
	r = re.compile(",", flags)
	if ( r is not None ):
		test.check( r.groups )
		test.check( r.pattern )
		test.check( r.flags )
		test.check( r.groupindex )
		# Check Read-only props on regex object
		def assignPattern():
			r.pattern = "asdfasdf"
		test.check(
			test.expectException(assignPattern)
		)
		def assignFlags():
			r.flags = "wer"
		test.check(
			test.expectException(assignFlags)
		)
		def assignGroups():
			r.groups = 1
		test.check(
			test.expectException(assignGroups)
		)
		def assignGroupIndex():
			r.groupindex = 34
		test.check(
			test.expectException(assignGroupIndex)
		)
	else:
		test.checkPad("NULL", 8)

def checkFlagsExist(test):
	test.check(re.T)
	test.check(re.I)
	test.check(re.IGNORECASE)
	test.check(re.M)
	test.check(re.MULTILINE)
	test.check(re.S)
	test.check(re.DOTALL)
	test.check(re.U)
	test.check(re.UNICODE)
	test.check(re.X)
	test.check(re.VERBOSE)
	test.check(re.A)
	test.check(re.ASCII)

def escapeTests(test):
	test.check(re.escape("buf[34]"))
	test.check(re.escape("C:\\asdf\\wewer\\"))
	test.check(re.escape("func(int a) { return(3)};"))

def checkIgnoreCase(test, flags = 0):
	test.check( re.search("as", testStr3, flags|re.I).pos )
	test.check( re.search("as", testStr3, flags|re.I).endpos )
	test.check( re.search("as", testStr3, flags|re.I).group() )
	test.check( re.search("as", testStr3, flags|re.I).group(0) )
	test.check( re.search("AS", testStr3, flags|re.I).pos )
	test.check( re.search("AS", testStr3, flags|re.I).endpos )
	test.check( re.search("AS", testStr3, flags|re.I).group() )
	test.check( re.search("AS", testStr3, flags|re.I).group(0) )

def checkSearchWithGroups(test, flags = 0):
	r = "\\[([\\d]+)\\]"
	test.check( re.compile(r, flags).groups )
	test.check( re.search(r, testStr2, flags).pos)
	test.check( re.search(r, testStr2, flags).endpos)
	test.check( re.search(r, testStr2, flags).groups())
	test.check( re.search(r, testStr2, flags).group())
	test.check( re.search(r, testStr2, flags).group(0))
	test.check( re.search(r, testStr2, flags).group(1))
	test.check( re.search(r, testStr2, flags).start())
	test.check( re.search(r, testStr2, flags).start(0))
	test.check( re.search(r, testStr2, flags).start(1))
	test.check( re.search(r, testStr2, flags).end())
	test.check( re.search(r, testStr2, flags).end(0))
	test.check( re.search(r, testStr2, flags).end(1))
	test.check( re.search(r, testStr2, flags).span())
	test.check( re.search(r, testStr2, flags).span(0))
	test.check( re.search(r, testStr2, flags).span(1))
	test.check( re.search(r, testStr2, flags).lastgroup)
	test.check( re.search(r, testStr2, flags).lastindex)

	for i in range(2,50):
		test.check(
			test.expectException(lambda: re.search(',', testStr1, flags).group(1))
		)


def checkMatchOps(test, flags = 0):
	test.check( re.match("asdf", "asdf", flags).pos )
	test.check( re.match(r"asdf", "asdf", flags).endpos )
	test.check( re.match("asdf", "asdf", flags).groups() )
	test.check( re.match("a", "asdf", flags).pos )
	test.check( re.match("a", "asdf", flags).endpos )
	test.check( re.match("a", "asdf", flags).groups() )
	test.check( (re.match("s", "asdf", flags) is None) )
	test.check( (re.match(r"^s", "asdf", flags) is None) )
	test.check( (re.compile("^s", flags).match("asdf", 1) is None) )
	# Matches with named groups
	try:
		r = re.compile(r"(?P<prefix>[a-zA-Z]+)://(?P<suffix>[^/]*)", flags)
	except Exception as exc:
		test.checkPad(None, 6)
		return

	m = r.match("http://asdf")
	test.check( m.groups() )
	test.check( m.group() )
	test.check( m.group(0) )
	test.check( m.group(1) )
	test.check( m.group("prefix") )
	test.check( m.group("suffix") )


def checkFullMatchOps(test, flags = 0):
	test.check( (re.fullmatch("asdf", "asdf", flags).pos))
	test.check( (re.fullmatch("asdf", "asdf", flags).endpos))
	test.check( (re.fullmatch("as", "asdf", flags) is None))
	test.check( (re.fullmatch("q", "asdf", flags) is None))
	test.check( (re.compile("o[gh]", flags).fullmatch("dog") is None))
	test.check( (re.compile("o[gh]", flags).fullmatch("ogre") is None))
	test.check( re.compile("o[gh]", flags).fullmatch("doggie",1,3).pos)

def checkFindAllOps(test, flags = 0):
	test.check(re.findall(",", testStr1, flags)) # No Caps
	test.check(re.findall("\\[([\\d]+)\\]", testStr2, flags)) # 1 Cap
	r = "([^\d\s]+\\(([\d]+)\\))"
	test.check(re.compile(r, flags).groups)
	test.check(re.findall(r, testStr3, flags)) # 2 Caps

def checkSplitOps(test, flags = 0):
	test.check(re.split(",", testStr1, flags))

	test.check(re.split("(apple|orange)",testStr4, flags))
	test.check(re.split("\\[([\\d]+)\\]", testStr2, flags))
	r = re.compile(",", flags)
	test.check(r.split(testStr1, 0))
	test.check(r.split(testStr1, 1))
	test.check(r.split(testStr1, 2))
	test.check(r.split(testStr1, 3))
	test.check(r.split(testStr1, 4))

	r = re.compile("\\[([\\d]+)\\]", flags)
	test.check(r.split(testStr2,0))
	test.check(r.split(testStr2,1))
	test.check(r.split(testStr2,2))
	test.check(r.split(testStr2,3))
	test.check(r.split(testStr2,4))

def checkSubOps(test, flags = 0):
	def dashrepl(matchobj):
		if matchobj.group(0) == '-':
			return ' '
		else:
			return '-'
	test.check(re.sub('-{1,2}', dashrepl, 'pro----gram-files',0, flags))
	test.check(re.sub('-{1,2}', '4', 'pro----gram-files',0, flags))
	test.check(re.subn('-{1,2}', dashrepl, 'pro----gram-files',0,flags))
	test.check(re.subn('-{1,2}', '4', 'pro----gram-files',0,flags))

def checkSyntaxErrors(test, flags = 0):
	test.check(test.expectException( lambda: re.compile(r')', flags)))
	test.check(test.expectException( lambda: re.compile("a\\", flags)))
	test.check(test.expectException( lambda: re.compile(r'a[b', flags)))
	test.check(test.expectException( lambda: re.compile(r'(abc', flags)))
	test.check(test.expectException( lambda: re.compile(r')(', flags)))
	test.check(test.expectException( lambda: re.compile(r'))', flags)))
	test.check(test.expectException( lambda: re.compile(r'a[b-a]', flags)))
	test.check(test.expectException( lambda: re.compile(r'*a', flags)))

def checkFindIter(test, flags = 0):
	""" Test the finditer method
	"""
	p = "\\[([\\d]+)\\]"
	r = re.compile(p, flags)
	test.check( r.groups )

	iret = r.finditer(testStr2)
	for m in iret:
		test.check(m.pos)
		test.check(m.endpos)
		test.check(m.string)
		test.check(m.lastindex)
