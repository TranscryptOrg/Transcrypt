import builtins

from org.transcrypt import __base__ 

# Complete __envir__ for the stub mode
__base__.__envir__.executorName = 'python'

# Browser root singleton
class window:
	class console:
		def log (*args):
			builtins.print ('console.log :\t', *args)

	def alert (anObject):
		input ('window.alert:\t {}\t(Press [ENTER] to continue)'.format (anObject))

# Add attributes of window to global namespace as is done in a browser
for attributeName in window.__dict__:
	vars () [attributeName] = window.__dict__ [attributeName]
	
def print (*args):
	console.log (*args)
	