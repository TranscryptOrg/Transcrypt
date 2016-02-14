class A:
	def __init__ (self, x):
		self.x = x
		
	def f (self):
		console.log (self)
		
class B (A):
	pass
		
a1 = B (3)
a2 = B (4)

a1.f ()
a2.f ()

a1.f ()
a2.f ()

