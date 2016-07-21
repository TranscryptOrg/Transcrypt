# coding: utf-8
def run (autoTester):
	check = autoTester.check
	check('min:',   min(-1.1, -1, -3))
	check('max:',   max(-1.1, -1, -3))
	check('abs:',   [abs(-1), abs(1), abs(0), abs(-0.1), abs(0.1)])
	check('ord:',   [ord('a'), ord('é'[0])]) # this is the 2 codepoint version
	check('round:', [round(4.006),
			 round(4.006, 2),
			 round(4060, -2),
			 round(1/2.),
			 round(1/2., 1),
			 round(1/2, 1),
			 round(1/3., 2)])

