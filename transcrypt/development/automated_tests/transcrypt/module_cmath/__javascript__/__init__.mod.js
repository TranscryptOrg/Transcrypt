	__nest__ (
		__all__,
		'module_cmath', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var acos = __init__ (__world__.cmath).acos;
					var acosh = __init__ (__world__.cmath).acosh;
					var asin = __init__ (__world__.cmath).asin;
					var asinh = __init__ (__world__.cmath).asinh;
					var atan = __init__ (__world__.cmath).atan;
					var atanh = __init__ (__world__.cmath).atanh;
					var cos = __init__ (__world__.cmath).cos;
					var cosh = __init__ (__world__.cmath).cosh;
					var e = __init__ (__world__.cmath).e;
					var exp = __init__ (__world__.cmath).exp;
					var isfinite = __init__ (__world__.cmath).isfinite;
					var isinf = __init__ (__world__.cmath).isinf;
					var isnan = __init__ (__world__.cmath).isnan;
					var log = __init__ (__world__.cmath).log;
					var log10 = __init__ (__world__.cmath).log10;
					var phase = __init__ (__world__.cmath).phase;
					var pi = __init__ (__world__.cmath).pi;
					var polar = __init__ (__world__.cmath).polar;
					var rect = __init__ (__world__.cmath).rect;
					var sin = __init__ (__world__.cmath).sin;
					var sinh = __init__ (__world__.cmath).sinh;
					var sqrt = __init__ (__world__.cmath).sqrt;
					var tan = __init__ (__world__.cmath).tan;
					var tanh = __init__ (__world__.cmath).tanh;
					var twoPi = 2 * pi;
					var nDecs = 5;
					var run = function (autoTester) {
						__call__ (autoTester.check, autoTester, __call__ (phase, null, __add__ (1, complex (0, 1.0))));
						var aPolar = __call__ (polar, null, __add__ (3, complex (0, 5.0)));
						__call__ (autoTester.check, autoTester, __call__ (round, null, __getitem__ (aPolar, 0), nDecs), __getitem__ (aPolar, 1));
						var aRect = __call__ (rect, null, ...aPolar);
						__call__ (autoTester.check, autoTester, __call__ (round, null, aRect.real), __call__ (round, null, aRect.imag));
						var anExp = __call__ (exp, null, __sub__ (__neg__ (2.2), complex (0, 3.3)));
						__call__ (autoTester.check, autoTester, __call__ (round, null, anExp.real, nDecs), __call__ (round, null, anExp.imag, nDecs));
						var aLog = __call__ (log, null, anExp);
						__call__ (autoTester.check, autoTester, __call__ (round, null, aLog.real, nDecs), __call__ (round, null, aLog.imag, nDecs));
						var anExp10 = __pow__ (aLog, 10);
						__call__ (autoTester.check, autoTester, __call__ (round, null, anExp10.real, nDecs), __call__ (round, null, anExp10.imag, nDecs));
						var aLog10 = __call__ (log10, null, anExp10);
						__call__ (autoTester.check, autoTester, __call__ (round, null, aLog10.real, nDecs), __call__ (round, null, aLog10.imag, nDecs));
						var anExpRect = __pow__ (aLog, aRect);
						__call__ (autoTester.check, autoTester, __call__ (round, null, anExpRect.real, nDecs), __call__ (round, null, anExpRect.imag, nDecs));
						var aLogRect = __call__ (log, null, anExpRect, aRect);
						__call__ (autoTester.check, autoTester, __call__ (round, null, aLogRect.real, nDecs), __call__ (round, null, aLogRect.imag, nDecs));
						var aSqrt = __call__ (sqrt, null, complex (0, 1.0));
						__call__ (autoTester.check, autoTester, __call__ (round, null, aSqrt.real, nDecs), __call__ (round, null, aSqrt.imag, nDecs));
						__call__ (autoTester.check, autoTester, __call__ (sqrt, null, 4));
						var anotherSqrt = __call__ (sqrt, null, __neg__ (4));
						__call__ (autoTester.check, autoTester, __call__ (round, null, anotherSqrt.real), __call__ (round, null, anotherSqrt.imag));
						var anAsin = __call__ (asin, null, __add__ (1, complex (0, 2.0)));
						__call__ (autoTester.check, autoTester, __call__ (round, null, anAsin.real, nDecs), __call__ (round, null, anAsin.imag, nDecs));
						var anAcos = __call__ (acos, null, __add__ (__neg__ (2), complex (0, 3.0)));
						__call__ (autoTester.check, autoTester, __call__ (round, null, anAcos.real, nDecs), __call__ (round, null, anAcos.imag, nDecs));
						var anAtan = __call__ (atan, null, __sub__ (3, complex (0, 4.0)));
						__call__ (autoTester.check, autoTester, __call__ (round, null, anAtan.real, nDecs), __call__ (round, null, anAtan.imag, nDecs));
						var aSin = __call__ (sin, null, anAsin);
						__call__ (autoTester.check, autoTester, __call__ (round, null, aSin.real), __call__ (round, null, aSin.imag));
						var aCos = __call__ (cos, null, anAcos);
						__call__ (autoTester.check, autoTester, __call__ (round, null, aCos.real), __call__ (round, null, aCos.imag));
						var aTan = __call__ (tan, null, anAtan);
						__call__ (autoTester.check, autoTester, __call__ (round, null, aTan.real), __call__ (round, null, aTan.imag));
						var anAsinh = __call__ (asinh, null, aCos);
						__call__ (autoTester.check, autoTester, __call__ (round, null, anAsinh.real, nDecs), __call__ (round, null, anAsinh.imag, nDecs));
						var anAcosh = __call__ (acosh, null, aSin);
						__call__ (autoTester.check, autoTester, __call__ (round, null, anAcosh.real, nDecs), __call__ (round, null, anAcosh.imag, nDecs));
						var anAtanh = __call__ (atanh, null, aTan);
						__call__ (autoTester.check, autoTester, __call__ (round, null, anAtanh.real, nDecs), __call__ (round, null, anAtanh.imag, nDecs));
						var aSinh = __call__ (sinh, null, anAsinh);
						__call__ (autoTester.check, autoTester, __call__ (round, null, aSinh.real), __call__ (round, null, aSinh.imag));
						var aCosh = __call__ (cosh, null, anAcosh);
						__call__ (autoTester.check, autoTester, __call__ (round, null, aCosh.real), __call__ (round, null, aCosh.imag));
						var aTanh = __call__ (tanh, null, anAtanh);
						__call__ (autoTester.check, autoTester, __call__ (round, null, aTanh.real), __call__ (round, null, aTanh.imag));
					};
					__pragma__ ('<use>' +
						'cmath' +
					'</use>')
					__pragma__ ('<all>')
						__all__.acos = acos;
						__all__.acosh = acosh;
						__all__.asin = asin;
						__all__.asinh = asinh;
						__all__.atan = atan;
						__all__.atanh = atanh;
						__all__.cos = cos;
						__all__.cosh = cosh;
						__all__.e = e;
						__all__.exp = exp;
						__all__.isfinite = isfinite;
						__all__.isinf = isinf;
						__all__.isnan = isnan;
						__all__.log = log;
						__all__.log10 = log10;
						__all__.nDecs = nDecs;
						__all__.phase = phase;
						__all__.pi = pi;
						__all__.polar = polar;
						__all__.rect = rect;
						__all__.run = run;
						__all__.sin = sin;
						__all__.sinh = sinh;
						__all__.sqrt = sqrt;
						__all__.tan = tan;
						__all__.tanh = tanh;
						__all__.twoPi = twoPi;
					__pragma__ ('</all>')
				}
			}
		}
	);
