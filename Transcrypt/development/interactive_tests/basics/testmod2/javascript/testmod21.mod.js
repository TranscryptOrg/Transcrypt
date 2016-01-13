	__nest__ (
		__all__,
		'testmod2.testmod21', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var f = function () {
						print ('testmod21.f');
					};
					//<all>
					__all__.f = f;
					//</all>
				}
			}
		}
	);
