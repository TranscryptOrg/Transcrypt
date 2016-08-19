from org.transcrypt.stubs.browser import __pragma__
from cmath import *

twoPi = 2 * pi
nDecs = 5

__pragma__ ('opov')

def run (autoTester):
	autoTester.check (phase (1 + 1j))
	
	aPolar = polar (3 + 5j)
	autoTester.check (round (aPolar [0], nDecs), aPolar [1])
	
	aRect = rect (*aPolar)
	autoTester.check (round (aRect.real), round (aRect.imag))
	
	anExp = exp (-2.2 - 3.3j)
	autoTester.check (round (anExp.real, nDecs), round (anExp.imag, nDecs))
	
	aLog = log (anExp)
	autoTester.check (round (aLog.real, nDecs), round (aLog.imag, nDecs))
	
	anExp10 = aLog ** 10
	autoTester.check (round (anExp10.real, nDecs), round (anExp10.imag, nDecs))
	
	aLog10 = log10 (anExp10)
	autoTester.check (round (aLog10.real, nDecs), round (aLog10.imag, nDecs))
	
	anExpRect = aLog ** aRect
	autoTester.check (round (anExpRect.real, nDecs), round (anExpRect.imag, nDecs))
	
	aLogRect = log (anExpRect, aRect)
	autoTester.check (round (aLogRect.real, nDecs), round (aLogRect.imag, nDecs))
	
	aSqrt = sqrt (1j)
	autoTester.check (round (aSqrt.real, nDecs), round (aSqrt.imag, nDecs))
	autoTester.check (sqrt (4))
	anotherSqrt = sqrt (-4)
	autoTester.check (round (anotherSqrt.real), round (anotherSqrt.imag))
	
	anAsin = asin (1 + 2j)
	autoTester.check (round (anAsin.real, nDecs), round (anAsin.imag, nDecs))

	anAcos = acos (-2 + 3j)
	autoTester.check (round (anAcos.real, nDecs), round (anAcos.imag, nDecs))
	
	anAtan = atan (3 - 4j)
	autoTester.check (round (anAtan.real, nDecs), round (anAtan.imag, nDecs))
	
	aSin = sin (anAsin)
	autoTester.check (round (aSin.real), round (aSin.imag))
	
	aCos = cos (anAcos)
	autoTester.check (round (aCos.real), round (aCos.imag))
	
	aTan = tan (anAtan)
	autoTester.check (round (aTan.real), round (aTan.imag))
	
	anAsinh = asinh (aCos)
	autoTester.check (round (anAsinh.real, nDecs), round (anAsinh.imag, nDecs))

	anAcosh = acosh (aSin)
	autoTester.check (round (anAcosh.real, nDecs), round (anAcosh.imag, nDecs))
	
	anAtanh = atanh (aTan)
	autoTester.check (round (anAtanh.real, nDecs), round (anAtanh.imag, nDecs))
	
	aSinh = sinh (anAsinh)
	autoTester.check (round (aSinh.real), round (aSinh.imag))
	
	aCosh = cosh (anAcosh)
	autoTester.check (round (aCosh.real), round (aCosh.imag))
	
	aTanh = tanh (anAtanh)
	autoTester.check (round (aTanh.real), round (aTanh.imag))
	