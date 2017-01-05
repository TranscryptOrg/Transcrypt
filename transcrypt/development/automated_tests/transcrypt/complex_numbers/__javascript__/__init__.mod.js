	__nest__ (
		__all__,
		'complex_numbers', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var x = 567;
						var y = -(3);
						var z = 5 * x + 2 * y;
						autoTester.check (x, y, z);
						var a = __add__ (234, complex (0, 3.0));
						var b = __sub__ (4, complex (0, 5.0));
						var c = __call__ (complex, null, __neg__ (6), 7);
						__call__ (autoTester.check, autoTester, a, b, c);
						var t = __add__ (__sub__ (__mul__ (6, x), __mul__ (3, y)), 7);
						__call__ (autoTester.check, autoTester, t);
						var d = __mul__ (2, a);
						var e = __mul__ (x, b);
						var f = __add__ (__add__ (z, d), e);
						var g = __div__ (a, b);
						var h = __sub__ (a, b);
						var i = __sub__ (x, c);
						var j = __sub__ (a, x);
						var k = __add__ (b, y);
						__call__ (autoTester.check, autoTester, d, e, f, __call__ (round, null, g.real, 2), __call__ (round, null, g.imag, 2), h, i, j, k);
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
