	__nest__ (
		__all__,
		'modules.mod3', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var x = 'Toen wij uit Rotterdam vertrokken, vertrokken wij uit Rotterdam\n';
					var mod3Hundred = 100;
					var mod3GetTwoHundred = function () {
						return 200;
					};
					__pragma__ ('<all>')
						__all__.mod3GetTwoHundred = mod3GetTwoHundred;
						__all__.mod3Hundred = mod3Hundred;
						__all__.x = x;
					__pragma__ ('</all>')
				}
			}
		}
	);
