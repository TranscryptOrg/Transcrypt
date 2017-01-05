	__nest__ (
		__all__,
		'cmath', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var pi = Math.PI;
					var e = Math.E;
					var phase = function (x) {
						return (typeof x === 'number' ? 0 : Math.atan2 (x.imag, x.real));
					};
					var polar = function (x) {
						return (typeof x === 'number' ? tuple ([Math.abs (x), 0]) : tuple ([abs (x), phase (x)]));
					};
					var rect = function (r, phi) {
						return __mul__ (r, __add__ (__call__ (Math.cos, Math, phi), __mul__ (complex (0, 1.0), __call__ (Math.sin, Math, phi))));
					};
					var exp = function (x) {
						return (typeof x === 'number' ? complex (x, 0).__exp__ () : x.__exp__ ());
					};
					var log = function (x, base) {
						return (base === undefined ? (typeof x === 'number' ? complex (x, 0).__log__ () : x.__log__ ()) : __div__ (log (x), log (base)));
					};
					var log10 = function (x) {
						return log (x, 10);
					};
					var sqrt = function (x) {
						return exp (__mul__ (log (x), 0.5));
					};
					var sin = function (x) {
						return __mul__ (__neg__ (complex (0, 0.5)), __sub__ (__call__ (exp, null, __mul__ (complex (0, 1.0), x)), __call__ (exp, null, __mul__ (__neg__ (complex (0, 1.0)), x))));
					};
					var cos = function (x) {
						return __mul__ (0.5, __add__ (__call__ (exp, null, __mul__ (complex (0, 1.0), x)), __call__ (exp, null, __mul__ (__neg__ (complex (0, 1.0)), x))));
					};
					var tan = function (x) {
						return __div__ (__mul__ (__neg__ (complex (0, 1.0)), __sub__ (__call__ (exp, null, __mul__ (complex (0, 1.0), x)), __call__ (exp, null, __mul__ (__neg__ (complex (0, 1.0)), x)))), __add__ (__call__ (exp, null, __mul__ (complex (0, 1.0), x)), __call__ (exp, null, __mul__ (__neg__ (complex (0, 1.0)), x))));
					};
					var asin = function (x) {
						return __mul__ (__neg__ (complex (0, 1.0)), __call__ (log, null, __add__ (__mul__ (complex (0, 1.0), x), __call__ (sqrt, null, __sub__ (1, __mul__ (x, x))))));
					};
					var acos = function (x) {
						return __mul__ (__neg__ (complex (0, 1.0)), __call__ (log, null, __add__ (x, __mul__ (complex (0, 1.0), __call__ (sqrt, null, __sub__ (1, __mul__ (x, x)))))));
					};
					var atan = function (x) {
						return __mul__ (complex (0, 0.5), __call__ (log, null, __div__ (__add__ (complex (0, 1.0), x), __sub__ (complex (0, 1.0), x))));
					};
					var sinh = function (x) {
						return __mul__ (0.5, __sub__ (__call__ (exp, null, x), __call__ (exp, null, __neg__ (x))));
					};
					var cosh = function (x) {
						return __mul__ (0.5, __add__ (__call__ (exp, null, x), __call__ (exp, null, __neg__ (x))));
					};
					var tanh = function (x) {
						return __div__ (__sub__ (__call__ (exp, null, x), __call__ (exp, null, __neg__ (x))), __add__ (__call__ (exp, null, x), __call__ (exp, null, __neg__ (x))));
					};
					var asinh = function (x) {
						return __call__ (log, null, __add__ (x, __call__ (sqrt, null, __add__ (1, __mul__ (x, x)))));
					};
					var acosh = function (x) {
						return __call__ (log, null, __add__ (x, __call__ (sqrt, null, __add__ (__neg__ (1), __mul__ (x, x)))));
					};
					var atanh = function (x) {
						return __mul__ (0.5, __call__ (log, null, __div__ (__add__ (1, x), __sub__ (1, x))));
					};
					var isinf = function (x) {
						return x.real == js_Infinite || x.imag == js.Infinite;
					};
					var isfinite = function (x) {
						return !(isinf (x));
					};
					var isnan = function (x) {
						return isNaN (x.real) || isNaN (x.imag);
					};
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
						__all__.phase = phase;
						__all__.pi = pi;
						__all__.polar = polar;
						__all__.rect = rect;
						__all__.sin = sin;
						__all__.sinh = sinh;
						__all__.sqrt = sqrt;
						__all__.tan = tan;
						__all__.tanh = tanh;
					__pragma__ ('</all>')
				}
			}
		}
	);
