from org.transcrypt.stubs.browser import __pragma__
__pragma__ ('iconv')

def run (autoTester):
	tel = {'guido': 4127, 'jack': 4098}
	tel ['sape'] = 4139

	autoTester.check (tel)
	autoTester.check (tel ['jack'])

	del tel ['sape']
	tel ['irv'] = 4127
	autoTester.check (tel)

	autoTester.check (sorted (list (tel.keys ())), False)
	autoTester.check (sorted (tel.keys ()))

	autoTester.check ('guido' in tel)
	autoTester.check ('jack' not in tel)

	autoTester.check (dict ([('guido', 4127), ('jack', 4098), ('sape', 4139)]))

	knights = {'robin': 'the brave', 'gallahad': 'the pure'}

	for k, v in sorted (knights.items ()):
		autoTester.check (k, v)

	if 'gallahad' in knights:
		autoTester.check ('gallahad is a knight') 

	for k in sorted (knights):
		autoTester.check (k)
		
	knight = {'rudolph': 'the righteous'}
	for k in knight:	# Autotest automatic conversion with one knight, since sort order of dict undefined
		autoTester.check (k)