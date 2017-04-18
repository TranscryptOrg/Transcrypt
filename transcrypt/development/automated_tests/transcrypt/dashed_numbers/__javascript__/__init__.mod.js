	__nest__ (
		__all__,
		'dashed_numbers', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var math = {};
					__nest__ (math, '', __init__ (__world__.math));
					var run = function (autoTester) {
						autoTester.check (1000000000);
						autoTester.check (120000.03);
						autoTester.check (16777215);
					};
					__pragma__ ('<use>' +
						'math' +
					'</use>')
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
