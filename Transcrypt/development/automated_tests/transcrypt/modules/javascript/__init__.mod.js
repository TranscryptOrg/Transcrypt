	__nest__ (
		__all__,
		'modules', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var modules = {};
					__nest__ (modules, 'mod1.mod11.mod111', __init__ (__world__.modules.mod1.mod11.mod111));
					__nest__ (modules, 'mod3', __init__ (__world__.modules.mod3));
					__nest__ (modules, 'mod1.mod11.mod112', __init__ (__world__.modules.mod1.mod11.mod112));
					__nest__ (modules, 'mod1', __init__ (__world__.modules.mod1));
					__nest__ (modules, 'mod1.mod11', __init__ (__world__.modules.mod1.mod11));
					__nest__ (modules, 'mod2', __init__ (__world__.modules.mod2));
					__nest__ (modules, 'mod2.mod21', __init__ (__world__.modules.mod2.mod21));
					__nest__ (modules, 'mod2.mod22', __init__ (__world__.modules.mod2.mod22));
					var a = modules.mod1.mod11.mod111.A (12345);
					var pi = modules.mod1.pi;
					var f = modules.mod2.f;
					var run = function (autoTester) {
						autoTester.store ('modules');
						autoTester.store (a.f ());
						autoTester.store (modules.mod1.mod11.mod112.f ());
						autoTester.store (modules.mod1.mod11.e);
						autoTester.store (pi);
						autoTester.store (f (102030));
						autoTester.store (modules.mod2.mod21.f ());
						var B = modules.mod22.B;
						var b = B ();
						autoTester.store (b.x);
						autoTester.store (modules.mod3.x);
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
