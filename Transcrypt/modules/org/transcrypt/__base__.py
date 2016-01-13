# This module is avaible both from the command prompt and in the browser
# It is included in-between the __core__ and the __builtin__ module, so the latter can adapt __envir__

class __Envir__:
	def __init__ (self):
		self.transpilerName = 'transcrypt'
		self.transpilerVersion = '0.0.15'
		
__envir__ = __Envir__ ()

