# This module is avaible both in the Python and Transcrypt environments
# It is included in-between the __core__ and the __builtin__ module, so the latter can adapt __envir__
# In Transcrypt, __base__ is available inline, it isn't nested and cannot be imported in the normal way

class __Envir__:
	def __init__ (self):
		self.transpiler_name = 'transcrypt'
		self.transpiler_version = '3.5.157'
		self.target_subdir = '__javascript__'
		
__envir__ = __Envir__ ()
