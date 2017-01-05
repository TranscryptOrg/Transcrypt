	__nest__ (
		__all__,
		'dictionaries', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var tel = dict ({'guido': 4127, 'jack': 4098});
						autoTester.check (len (tel));
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
						autoTester.check (autoTester.expectException ((function __lambda__ () {
							return dict (1);
						})));
						autoTester.check (autoTester.expectException ((function __lambda__ () {
							return dict (134.34);
						})));
						autoTester.check (autoTester.expectException ((function __lambda__ () {
							return dict ('asdf');
						})));
						autoTester.check (autoTester.expectException ((function __lambda__ () {
							return dict (list (['1234', 1]));
						})));
						autoTester.check (dict (list ([])));
						autoTester.check (dict (dict ({})));
						autoTester.check (dict (dict ({'asdf': 1, 'qwer': 2})));
						var b = dict ({'a': 2.01, 'b': -(3.3)});
						var d = dict (b);
						autoTester.check (d);
						var b = dict ({'a': 2, 'b': list ([1, 2, 3])});
						var d = dict (b);
						autoTester.check (d);
						var b = dict ({'a': null, 'b': set (list ([1, 2, 3]))});
						var d = dict (b);
						autoTester.check (d);
						var b = dict ({'a': dict ({'c': 2}), 'b': tuple ([1, 2])});
						var d = dict (b);
						autoTester.check (d);
						autoTester.check (d ['a'] ['c']);
						autoTester.check (d.py_get ('a').py_get ('c'));
						autoTester.check (b.py_get ('a').py_get ('c'));
						d ['a'] ['c'] = 3;
						autoTester.check (d.py_get ('a').py_get ('c'));
						autoTester.check (b.py_get ('a').py_get ('c'));
						var knights = dict ({'robin': 'the brave', 'gallahad': 'the pure'});
						var __iterable0__ = sorted (knights.py_items ());
						__iterable0__ = __i__ (__iterable0__);
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
							var __left0__ = __iterable0__ [__index0__];
							var k = __left0__ [0];
							var v = __left0__ [1];
							autoTester.check (k, v);
						}
						if (__in__ ('gallahad', knights)) {
							autoTester.check ('gallahad is a knight');
						}
						var __iterable0__ = sorted (knights);
						__iterable0__ = __i__ (__iterable0__);
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
							var k = __iterable0__ [__index0__];
							autoTester.check (k);
						}
						var knight = dict ({'rudolph': 'the righteous'});
						var __iterable0__ = knight;
						__iterable0__ = __i__ (__iterable0__);
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
							var k = __iterable0__ [__index0__];
							autoTester.check (k);
						}
						var tel = dict ({'guido': 123});
						tel.py_update (dict ({'edsger': 42}));
						autoTester.check (tel.py_setdefault ('linus', 456));
						autoTester.check (tel ['linus']);
						autoTester.check (tel.py_setdefault ('guido', 789));
						autoTester.check (tel.py_pop ('guido', 1));
						autoTester.check (tel.py_pop ('guido', 1));
						autoTester.check (tel.py_pop ('edsger', 2));
						autoTester.check (tel.py_pop ('foo', 'bar'));
						autoTester.check (tel.py_pop ('foo', null));
						var knights = dict ({'robin': 'the brave', 'gallahad': 'the pure'});
						autoTester.check (autoTester.expectException ((function __lambda__ () {
							return knights.py_pop ('batman');
						})));
						autoTester.check (autoTester.expectException ((function __lambda__ () {
							return knights.py_pop ('batman', null);
						})));
						autoTester.check (autoTester.expectException ((function __lambda__ () {
							return knights.py_pop ('batman', 'the gullible');
						})));
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
