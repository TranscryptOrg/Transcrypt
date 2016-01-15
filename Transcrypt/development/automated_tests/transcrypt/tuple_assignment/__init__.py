def run (autoTester):
	((a, b), santa, [c, d], e) = ((1, 2), 'santa-claus', {3, 4}, 5)
	autoTester.store (a, b, c, d, e, santa)
	
	for i, x in enumerate ((0.5, 1.5, 2.5, 3.5)):
		autoTester.store (i, x)
	
	e, pi = 3.14, 2.74
	e, pi = pi, e
	autoTester.store (e, pi)
	