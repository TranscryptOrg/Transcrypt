def mro(c, r=None):
	''' assemble an mro from all bases (we have only the bases)'''
	last = 0
	if r is None:
		r = [c]
		last = 1
	for b in c.__bases__:
		if not b in r and not b == object:
			r.append(b)
			mro(b, r)
	if last and object in c.__bases__:
		r.append(object)
	return r


def run (autoTester):
	class A:
		p = 123
		def __init__ (self, x):
			self.x = x
			autoTester.check (self.p)

		def show (self, label):
			autoTester.check ('A.show', label, self.x)
			
		def show2 (self, label):
			autoTester.check ('A.show2', label, self.x)
		
	class B:
		p, q = 456, 789
		def __init__ (self, y):
			autoTester.check ('In B constructor')
			self.y = y
			autoTester.check (self.p)
			
		def show (self, label):
			autoTester.check ('B.show', label, self.y)
			
	class C (A, B):
		def __init__ (self, x, y):
			autoTester.check ('In C constructor')
			A.__init__ (self, x)
			B.__init__ (self, y)
			
		def show (self, label):
			A.show (self, label)
			B.show (self, label)
			autoTester.check ('C.show', label, self.x, self.y)
		
	a = A (1001)
	a.show ('america')
	autoTester.check (A.p)
	autoTester.check (a.p)

	b = B (2002)
	b.show ('russia')
	autoTester.check (B.p)
	autoTester.check (b.p)
	autoTester.check (b.q)

	autoTester.check (A.p)
	autoTester.check (a.p)

	c = C (3003, 4004)
	c.show ('netherlands')
	autoTester.check (C.p)
	autoTester.check (c.p)
	autoTester.check (c.q)

	c.show2 ('amsterdam')
	A.show2 (c, 'rotterdam')

	show3 = c.show
	show3 ('copy')
	
	autoTester.check (hasattr (a, 'x'))
	autoTester.check (hasattr (a, 'y'))
	autoTester.check (hasattr (a, 'p'))
	autoTester.check (hasattr (a, 'q'))

	# misc tests around classes:
	# check __bases__:
	autoTester.check([c.__name__ for c in mro(C)])
	# check isinstance method:
	s_types = (dict, list, A, B, C, bool, str, float, int)
	t_types = ((dict, list), (bool, int), (bool, A), (C, B))
	for types in (s_types, t_types):
		for t in types:
			for c in ({'a': 1}, [], a, C, c, C, b, True, 'a', 1, 1.2):
				autoTester.check(isinstance(c, t))
				if types == s_types:
					autoTester.check(isinstance(c, s_types))

