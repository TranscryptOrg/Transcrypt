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
					var aliasMod111 =  __init__ (__world__.modules.mod1.mod11.mod111);
					var aMod1 =  __init__ (__world__.modules.mod1);
					var mod111 = __init__ (__world__.modules.mod1.mod11.mod111);
					var mod112 = __init__ (__world__.modules.mod1.mod11.mod112);
					var aMod21 = __init__ (__world__.modules.mod2.mod21);
					var aMod22 = __init__ (__world__.modules.mod2.mod22);
					var mod3GetTwoHundred = __init__ (__world__.modules.mod3).mod3GetTwoHundred;
					var mod3Hundred = __init__ (__world__.modules.mod3).mod3Hundred;
					var x = __init__ (__world__.modules.mod3).x;
					var A = __init__ (__world__.modules.mod1.mod11.mod111).A;
					var a = modules.mod1.mod11.mod111.A (12345);
					var pi = modules.mod1.pi;
					var f = modules.mod2.f;
					var run = function (autoTester) {
						autoTester.check ('modules');
						autoTester.check (a.f ());
						autoTester.check (modules.mod1.mod11.mod112.f ());
						autoTester.check (modules.mod1.mod11.e);
						autoTester.check (pi);
						autoTester.check (f (102030));
						autoTester.check (modules.mod2.mod21.f ());
						var B = modules.mod2.mod22.B;
						var b = B ();
						autoTester.check (b.x);
						autoTester.check (modules.mod3.x);
						var a2 = aliasMod111.A (6789101112);
						autoTester.check (a2.f ());
						autoTester.check (aMod1.pi);
						var a3 = mod111.A (100.001);
						autoTester.check (a3.f ());
						autoTester.check (mod112.f ());
						autoTester.check (aMod21.f ());
						autoTester.check (aMod22.B ().x);
						autoTester.check (mod3Hundred);
						autoTester.check (mod3GetTwoHundred ());
						autoTester.check (A (123.321).f ());
					};
					__pragma__ ('<use>' +
						'modules.mod1' +
						'modules.mod1.mod11' +
						'modules.mod1.mod11.mod111' +
						'modules.mod1.mod11.mod112' +
						'modules.mod2' +
						'modules.mod2.mod21' +
						'modules.mod2.mod22' +
						'modules.mod3' +
					'</use>')
					__pragma__ ('<all>')
						__all__.a = a;
						__all__.f = f;
						__all__.pi = pi;
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
