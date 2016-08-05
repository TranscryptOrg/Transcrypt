from org.transcrypt.stubs.browser import __pragma__

def run (autoTester):
	def repeat3 (bareFunc):
		__pragma__ ('kwargs')
		def innerFunc (*args, **kwargs):
			autoTester.check ('BEGIN repeat3')
			for i in range (3):
				bareFunc (*args, **kwargs)
			autoTester.check ('END repeat3')
		__pragma__ ('nokwargs')
		return innerFunc
		
	def repeatN (n):
		def repeat (bareFunc):
			__pragma__ ('kwargs')
			def innerFunc (*args, **kwargs):
				autoTester.check ('BEGIN repeatN ({})'.format (n))
				for i in range (n):
					bareFunc (*args, **kwargs)
				autoTester.check ('END repeatN ({})'.format (n))
			__pragma__ ('nokwargs')
			return innerFunc
		return repeat
		
	@repeatN (4)
	@repeat3
	def funcNoArg ():
		autoTester.check ('spam')
		
	funcNoArg ()

	autoTester.check ()

	__pragma__ ('kwargs')
	@repeat3
	@repeatN (2)
	def funcArg (a):
		autoTester.check ('eggs', a)
	__pragma__ ('nokwargs')
		
	funcArg (3)

	autoTester.check ()

	funcArg (a = 4)
