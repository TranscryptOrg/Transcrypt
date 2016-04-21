	__nest__ (
		__all__,
		'div_fixes', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						autoTester.check (65 / (5 * 2));
						var py_switch = false;
						autoTester.check (py_switch);
						autoTester.check (Math.floor (15 / 7));
						autoTester.check (list (['zero', 'one', 'two', 'three', 'four']).index ('three'));
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
