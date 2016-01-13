	__nest__ (
		__all__,
		'modules', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var mod1 = {};
					var mod2 = {};
					var mod3 = {};
					__nest__ (mod1, 'mod11.mod111', __init__ (__world__.mod1.mod11.mod111));
					__nest__ (mod3, '', __init__ (__world__.mod3));
					__nest__ (mod1, 'mod11.mod112', __init__ (__world__.mod1.mod11.mod112));
					__nest__ (mod1, '', __init__ (__world__.mod1));
					__nest__ (mod1, 'mod11', __init__ (__world__.mod1.mod11));
					__nest__ (mod2, '', __init__ (__world__.mod2));
					__nest__ (mod2, 'mod21', __init__ (__world__.mod2.mod21));
					__nest__ (mod2, 'mod22', __init__ (__world__.mod2.mod22));
					var a = mod1.mod11.mod111.A (12345);
					var pi = mod1.pi;
					var f = mod2.f;
					var run = function (autoTester) {
						autoTester.store ('modules');
						autoTester.store (a.f ());
						autoTester.store (mod1.mod11.mod112.f ());
						autoTester.store (mod1.mod11.e);
						autoTester.store (pi);
						autoTester.store (f (102030));
						autoTester.store (mod21.f ());
						var B = mod22.B;
						var b = B ();
						autoTester.store (b.x);
						autoTester.store (mod3.x);
					};
					//<all>
					__all__.a = a;
					__all__.f = f;
					__all__.pi = pi;
					__all__.run = run;
					//</all>
				}
			}
		}
	);
