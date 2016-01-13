	__nest__ (
		__all__,
		'testmod', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var f = function () {
						console.log ('testmod.f called');
					};
					print ('Initializing testmod');
					//<all>
					__all__.f = f;
					//</all>
				}
			}
		}
	);
