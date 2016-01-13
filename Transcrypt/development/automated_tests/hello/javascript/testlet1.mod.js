	__nest__ (
		__all__,
		'testlet1', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						autoTester.store ('goodbye');
						autoTester.store ('moon');
					};
					//<all>
					__all__.run = run;
					//</all>
				}
			}
		}
	);
