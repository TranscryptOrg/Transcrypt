class A:
	foo='bar'
	def __init__ (self):
		self.foo2 = 'bar2'

class B (A):
	foo3='bar3'
	def __init__ (self):
		self.foo4 = 'bar4'
		
def run (autoTester):
	autoTester.check ('sort and sorted<br>')
	a = [1, 5, 3, 2, -1]
	b = ['sun', 'earth', 'moon']
	
	autoTester.check (sorted (a))
	autoTester.check (sorted (b))
	
	a.sort ()
	autoTester.check (a)
	
	b.sort ()
	autoTester.check (b)

	autoTester.check (sorted (a, reverse = True))
	autoTester.check (sorted (b, reverse = True))
	
	a.sort (reverse = True)
	autoTester.check (a)
	
	b.sort (reverse = True)
	autoTester.check (b)
	
	b.sort (key = lambda x: len (x)) 
	autoTester.check (b)

	b.sort (key = lambda x: len (x), reverse = True) 
	autoTester.check (b)

<<<<<<< HEAD
	autoTester.check ('<br><br>dir<br>')
	autoTester.check ([entry for entry in dir (A) if not entry.startswith ('__')])
	autoTester.check ([entry for entry in dir (A()) if not entry.startswith ('__')])
	autoTester.check ([entry for entry in dir (B) if not entry.startswith ('__')])
	autoTester.check ([entry for entry in dir (B()) if not entry.startswith ('__')])
=======
	class A: foo='bar'
	autoTester.check ('foo' in dir(A))
	autoTester.check ('foo' in dir(A()))
>>>>>>> b5e9a118d3581b9b396f614aa519e10b3340e1e7
