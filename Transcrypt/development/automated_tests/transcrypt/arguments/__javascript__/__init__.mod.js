	__nest__ (
		__all__,
		'__$arguments__', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var f = function (x, y) {
							if (typeof x == 'undefined') {;
								var x = -1;
							};
							var m = -2;
							var __args__ = [].slice.apply (arguments);
							var __ilastarg__ = __args__.length - 1;
							if (type (__args__ [__ilastarg__]) == __kwargdict__) {
								var __allkwargs__ = __args__ [__ilastarg__--];
								var kwargs = {};
								for (var __attrib__ in __allkwargs__) {
									switch (__attrib__) {
										case 'x': var x = __allkwargs__ [__attrib__]; break;
										case 'y': var y = __allkwargs__ [__attrib__]; break;
										case 'm': var m = __allkwargs__ [__attrib__]; break;
										case 'n': var n = __allkwargs__ [__attrib__]; break;
										default: kwargs [__attrib__] = __allkwargs__ [__attrib__];
									}
								}
								kwargs.__class__ = null;
							}
							var args = tuple (__args__.slice (2, __ilastarg__ + 1));
							autoTester.check (x, y, args, m, n, kwargs);
						};
						f (1, 2, 10, 20, __kwargdict__ ({'m': 100, 'n': 200, 'p': 1000, 'q': 2000}));
					};
					//<all>
					__all__.run = run;
					//</all>
				}
			}
		}
	);
