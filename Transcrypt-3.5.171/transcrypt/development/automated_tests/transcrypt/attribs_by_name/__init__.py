class A:
	def __init__ (self):
		self.s = 'hello'
		
a = A ()

def run (autoTester):
	autoTester.check (a.s, getattr (a, 's'))
	
	setattr (a, 's', 'goodbye')
	autoTester.check (a.s, getattr (a, 's'))
	
	setattr (a, 't', 'exists')
	autoTester.check (hasattr (a, 't'), a.t, getattr (a, 't'))
	
	delattr (a, 't')
	autoTester.check (hasattr (a, 't'))
