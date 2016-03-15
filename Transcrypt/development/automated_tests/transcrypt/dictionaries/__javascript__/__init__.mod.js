	__nest__ (
		__all__,
		'dictionaries', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var tel = dict ({'guido': 4127, 'jack': 4098});
						tel ['sape'] = 4139;
						autoTester.check (tel);
						autoTester.check (tel ['jack']);
						delete tel ['sape'];
						tel ['irv'] = 4127;
						autoTester.check (tel);
						autoTester.check (sorted (list (tel.py_keys ())), false);
						autoTester.check (sorted (tel.py_keys ()));
						autoTester.check (__in__ ('guido', tel));
						autoTester.check (!__in__ ('jack', tel));
						autoTester.check (dict (list ([tuple (['guido', 4127]), tuple (['jack', 4098]), tuple (['sape', 4139])])));
						var knights = dict ({'robin': 'the brave', 'gallahad': 'the pure'});
						var __iter0__ = sorted (knights.py_items ());
						if (type (__iter0__) == dict) {
							__iter0__ = __iter0__.py_keys ();
						}
						for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
							var __left0__ = __iter0__ [__index0__];
							var k = __left0__ [0];
							var v = __left0__ [1];
							autoTester.check (k, v);
						}
						if (__in__ ('gallahad', knights)) {
							autoTester.check ('gallahad is a knight');
						}
						var __iter0__ = sorted (knights);
						if (type (__iter0__) == dict) {
							__iter0__ = __iter0__.py_keys ();
						}
						for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
							var k = __iter0__ [__index0__];
							autoTester.check (k);
						}
						var knight = dict ({'rudolph': 'the righteous'});
						var __iter0__ = knight;
						if (type (__iter0__) == dict) {
							__iter0__ = __iter0__.py_keys ();
						}
						for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
							var k = __iter0__ [__index0__];
							autoTester.check (k);
						}
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
