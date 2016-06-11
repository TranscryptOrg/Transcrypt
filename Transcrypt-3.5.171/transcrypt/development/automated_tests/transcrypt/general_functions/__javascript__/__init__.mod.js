	__nest__ (
		__all__,
		'general_functions', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var a = list ([1, 5, 3, 2, -(1)]);
						var b = list (['sun', 'earth', 'moon']);
						autoTester.check (sorted (a));
						autoTester.check (sorted (b));
						a.py_sort ();
						autoTester.check (a);
						b.py_sort ();
						autoTester.check (b);
						autoTester.check (sorted (a, __kwargdict__ ({reverse: true})));
						autoTester.check (sorted (b, __kwargdict__ ({reverse: true})));
						a.py_sort (__kwargdict__ ({reverse: true}));
						autoTester.check (a);
						b.py_sort (__kwargdict__ ({reverse: true}));
						autoTester.check (b);
						b.py_sort (__kwargdict__ ({key: (function __lambda__ (x) {
							return len (x);})}));
						autoTester.check (b);
						b.py_sort (__kwargdict__ ({key: (function __lambda__ (x) {
							return len (x);}), reverse: true}));
						autoTester.check (b);
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
