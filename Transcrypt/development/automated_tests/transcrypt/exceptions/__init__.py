class Ex1 (Exception):
	pass
		
class Ex2 (Ex1):
	pass
	
class Ex3 (Exception):
	pass
	
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
