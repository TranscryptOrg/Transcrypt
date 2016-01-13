import modules.mod1.mod11.mod111
import modules.mod3
import modules.mod1.mod11.mod112
import modules.mod1
import modules.mod1.mod11
import modules.mod2
import modules.mod2.mod21
import modules.mod2.mod22

a = modules.mod1.mod11.mod111.A (12345)
pi = modules.mod1.pi
f = modules.mod2.f

def run (autoTester):
	autoTester.store ('modules')
	autoTester.store (a.f ())
	autoTester.store (modules.mod1.mod11.mod112.f ())
	autoTester.store (modules.mod1.mod11.e)
	autoTester.store (pi)
	autoTester.store (f (102030))
	autoTester.store (modules.mod2.mod21.f ())
	B = modules.mod2.mod22.B
	b = B ()
	autoTester.store (b.x)
	autoTester.store (modules.mod3.x)

	