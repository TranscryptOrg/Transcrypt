	__nest__ (
		__all__,
		'div_pulls', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						autoTester.check ('Pull 56');
						var s = 'abcdefghij';
						autoTester.check (s.__getslice__ (2, 3, 1));
						autoTester.check (s.__getslice__ (0, 3, 1));
						autoTester.check (s.__getslice__ (2, null, 1));
						autoTester.check (s.__getslice__ (0, null, 2));
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
