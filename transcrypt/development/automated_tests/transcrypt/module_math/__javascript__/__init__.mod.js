	__nest__ (
		__all__,
		'module_math', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var acos = __init__ (__world__.math).acos;
					var acosh = __init__ (__world__.math).acosh;
					var asin = __init__ (__world__.math).asin;
					var asinh = __init__ (__world__.math).asinh;
					var atan = __init__ (__world__.math).atan;
					var atan2 = __init__ (__world__.math).atan2;
					var atanh = __init__ (__world__.math).atanh;
					var ceil = __init__ (__world__.math).ceil;
					var cos = __init__ (__world__.math).cos;
					var cosh = __init__ (__world__.math).cosh;
					var degrees = __init__ (__world__.math).degrees;
					var e = __init__ (__world__.math).e;
					var exp = __init__ (__world__.math).exp;
					var expm1 = __init__ (__world__.math).expm1;
					var floor = __init__ (__world__.math).floor;
					var hypot = __init__ (__world__.math).hypot;
					var inf = __init__ (__world__.math).inf;
					var log = __init__ (__world__.math).log;
					var log10 = __init__ (__world__.math).log10;
					var log1p = __init__ (__world__.math).log1p;
					var log2 = __init__ (__world__.math).log2;
					var nan = __init__ (__world__.math).nan;
					var pi = __init__ (__world__.math).pi;
					var pow = __init__ (__world__.math).pow;
					var radians = __init__ (__world__.math).radians;
					var sin = __init__ (__world__.math).sin;
					var sinh = __init__ (__world__.math).sinh;
					var sqrt = __init__ (__world__.math).sqrt;
					var tan = __init__ (__world__.math).tan;
					var tanh = __init__ (__world__.math).tanh;
					var trunc = __init__ (__world__.math).trunc;
					var run = function (autoTester) {
						autoTester.check (pi);
						autoTester.check (e);
						autoTester.check (exp (3));
						autoTester.check (int (expm1 (5)));
						autoTester.check (log (0.2));
						autoTester.check (round (log (1024, 2)));
						autoTester.check (log1p (5));
						autoTester.check (int (log2 (257)));
						autoTester.check (int (log10 (1001)));
						autoTester.check (pow (3, 4.5));
						autoTester.check (sqrt (25.1));
						autoTester.check (sin (10));
						autoTester.check (cos (10));
						autoTester.check (tan (10));
						autoTester.check (asin (0.5));
						autoTester.check (acos (0.5));
						autoTester.check (atan (0.5));
						autoTester.check (atan2 (1, 2));
						autoTester.check (int (hypot (3, 4.1)));
						autoTester.check (degrees (pi / 2.1));
						autoTester.check (radians (90));
						autoTester.check (sinh (1));
						autoTester.check (cosh (1));
						autoTester.check (tan (1));
						autoTester.check (asinh (70));
						autoTester.check (acosh (70));
						autoTester.check (atan (70));
						autoTester.check (floor (3.5));
						autoTester.check (ceil (3.5));
						autoTester.check (trunc (3.5));
					};
					__pragma__ ('<use>' +
						'math' +
					'</use>')
					__pragma__ ('<all>')
						__all__.acos = acos;
						__all__.acosh = acosh;
						__all__.asin = asin;
						__all__.asinh = asinh;
						__all__.atan = atan;
						__all__.atan2 = atan2;
						__all__.atanh = atanh;
						__all__.ceil = ceil;
						__all__.cos = cos;
						__all__.cosh = cosh;
						__all__.degrees = degrees;
						__all__.e = e;
						__all__.exp = exp;
						__all__.expm1 = expm1;
						__all__.floor = floor;
						__all__.hypot = hypot;
						__all__.inf = inf;
						__all__.log = log;
						__all__.log10 = log10;
						__all__.log1p = log1p;
						__all__.log2 = log2;
						__all__.nan = nan;
						__all__.pi = pi;
						__all__.pow = pow;
						__all__.radians = radians;
						__all__.run = run;
						__all__.sin = sin;
						__all__.sinh = sinh;
						__all__.sqrt = sqrt;
						__all__.tan = tan;
						__all__.tanh = tanh;
						__all__.trunc = trunc;
					__pragma__ ('</all>')
				}
			}
		}
	);
