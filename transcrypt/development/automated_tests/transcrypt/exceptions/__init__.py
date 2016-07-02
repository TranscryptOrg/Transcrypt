from org.transcrypt.stubs.browser import __envir__, __new__, __pragma__

class Ex1 (Exception):
	pass
		
class Ex2 (Ex1):
	pass
	
class Ex3 (Exception):
	pass
	
if __envir__.executor_name == 'python':
	class Table (BaseException):
		def __init__ (self, *args):
			self.fields = args
			
		def __repr__ (self):
			return 'Table' + repr (self.fields) .replace (', ', ',') .replace ('\'', '')
else:
	__pragma__ ('js', '{}', '''
		function _Table () {
			this.fields = [] .slice.apply (arguments);
		}
		
		_Table.prototype.__str__ = function () {
			return ('Table(' + this.fields.toString () + ')');
		};
	''')
	Table = _Table

def test1 ():
	raise (Exception ('mary'))
	
def test2 (autoTester):
	try:
		test1 ()
	except Ex1 as exception:
		autoTester.check (111)
		autoTester.check (exception)
	except Exception as exception:
		autoTester.check (222)
		autoTester.check (exception)
		
def run (autoTester):
	test2 (autoTester)
	
	try:
		raise Ex2 ('had')
	except Ex1 as exception:
		autoTester.check ('a')
	except Exception as exception:
		autoTester.check ('little')
		autoTester.check (exception)
		
	autoTester.check (333)
		
	try:
		raise Ex1 ('lamb')
	except Ex2 as exception:
		autoTester.check ('his')
		autoTester.check (exception)
	except Ex1 as exception:
		autoTester.check ('fleece')
		autoTester.check (exception)
	except Exception as exception:
		autoTester.check ('was')
		autoTester.check (exception)
	finally:
		autoTester.check ('white')
		
	autoTester.check (444)

	def test3 ():
		raise Ex3 ('as')
		
	autoTester.check (555)

	try:
		test3 ()
	except Ex1 as exception:
		autoTester.check ('snow')
		autoTester.check (exception)
	except Exception as exception:
		autoTester.check ('and')
		autoTester.check (exception)
	finally:
		autoTester.check ('everywhere')
		
	autoTester.check (666)
	
	try:
		raise Ex3 ('that')
	except Ex1 as exception:
		autoTester.check ('mary')
		autoTester.check (exception)
	except:
		autoTester.check ('went')
	finally:
		autoTester.check ('the')
	
	autoTester.check (777)
	
	try:
		try:
			raise Ex3 ('lamb')
		except Ex1 as exception:
			autoTester.check ('was')
			autoTester.check (exception)
		finally:
			autoTester.check ('to')
	except Ex3 as exception:	# We should get here, exception not swallowed
		autoTester.check ('go')
		autoTester.check (exception)
		
	try:
		raise __new__ (Table ('he', 'followed', 'her'))
	except Ex1 as exception:
		autoTester.check ('to')
		autoTester.check (exception)
	except Table as exception:	# Pure JavaScript exception, if no Python __class__
		autoTester.check ('school')
		autoTester.check (exception)
	except Ex3 as exception:
		autoTester.check ('one')
		autoTester.check (exception)
	finally:
		autoTester.check ('day')
	
	autoTester.check (888)
