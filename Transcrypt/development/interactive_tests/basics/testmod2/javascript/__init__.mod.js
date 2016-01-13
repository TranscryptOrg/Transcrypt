	__nest__ (
		__all__,
		'testmod2', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var testmod2 = {};
					__nest__ (testmod2, 'testmod21', __init__ (__world__.testmod2.testmod21));
					testmod2.testmod21.f ();
					var f = function () {
						print ('testmod2.f');
					};
					//<all>
					__all__.f = f;
					//</all>
				}
			}
		}
	);
