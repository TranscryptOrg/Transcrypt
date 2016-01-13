
import mod1.mod11.mod111
import mod3
import mod1.mod11.mod112
import mod1
import mod1.mod11
import mod2
import mod2.mod21
import mod2.mod22

a = mod1.mod11.mod111.A (12345)
pi = mod1.pi
f = mod2.f

def run (autoTester):
	autoTester.store ('modules')
	autoTester.store (a.f ())
	autoTester.store (mod1.mod11.mod112.f ())
	autoTester.store (mod1.mod11.e)
	autoTester.store (pi)
	autoTester.store (f (102030))
	autoTester.store (mod21.f ())
	B = mod22.B
	b = B ()
	autoTester.store (b.x)
	autoTester.store (mod3.x)

	