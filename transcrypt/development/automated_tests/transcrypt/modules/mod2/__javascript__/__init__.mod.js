	__nest__ (
		__all__,
		'modules.mod2', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var f = function (p) {
						return 2 * p;
					};
					__pragma__ ('<all>')
						__all__.f = f;
					__pragma__ ('</all>')
				}
			}
		}
	);
