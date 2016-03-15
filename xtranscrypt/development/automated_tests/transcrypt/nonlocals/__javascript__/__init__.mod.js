	__nest__ (
		__all__,
		'nonlocals', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var test1 = 1;
						var test2 = 2;
						var f = function () {
							var test1 = 10;
							test2 = 20;
							autoTester.check (test1, test2);
						};
						f ();
						autoTester.check (test1, test2);
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
