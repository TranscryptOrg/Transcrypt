from org.transcrypt.stubs.browser import __pragma__

def run (autoTester):
	def repeat3 (bareFunc):
		__pragma__ ('kwargs')
		def innerFunc (*args, **kwargs):
			for i in range (3):
				bareFunc (*args, **kwargs)
		__pragma__ ('nokwargs')
		return innerFunc
		
	@repeat3
	def bareFuncNoArg ():
		autoTester.check ('spam')
			
	bareFuncNoArg ()

	__pragma__ ('kwargs')
	@repeat3
	def bareFuncArg (a):
		autoTester.check ('eggs', a)
	__pragma__ ('nokwargs')
		
	bareFuncArg (3)
	bareFuncArg (a = 4)
