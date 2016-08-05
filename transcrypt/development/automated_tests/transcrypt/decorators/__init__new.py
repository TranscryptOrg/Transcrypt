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
		
	class Repeater:
		def __init__ (self, n):
			self.n = n
			
		def __call__ (self, bareFunc):
			__pragma__ ('kwargs')
			def innerFunc (*args, **kwargs):
				autoTester.check ('BEGIN repeat3')
				for i in range (self.n):
					bareFunc (*args, **kwargs)
				autoTester.check ('END repeat3')
			__pragma__ ('nokwargs')
			return innerFunc
		
	@repeatN (4)
	@repeat3
	def funcNoArg ():
		autoTester.check ('spam')
		
	funcNoArg ()
	autoTester.check ()

	@repeat3
	@repeatN (2)
	def funcArg (a):
		autoTester.check ('eggs', a)
		
	funcArg (3)
	autoTester.check ()

	funcArg (a = 4)
	autoTester.check ()

	__pragma__ ('opov')
	@Repeater (3)
	def funcNoArg2 ():
		autoTester.check ('toast')
	__pragma__ ('noopov')
	
	funcNoArg2 ()
	autoTester.check ()
	
	@Repeater (5)
	def funcArg2 (a):
		autoTester.check ('jam', a)
	__pragma__ ('noopov')
	
	funcArg2 (3)
	autoTester.check ()
	
	funcArg2 (a = 4)
	