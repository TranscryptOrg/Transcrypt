	__nest__ (
		__all__,
		'div_fixes.issue55.a', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var f1 = function () {
						return 'f1';
					};
					__pragma__ ('<all>')
						__all__.f1 = f1;
					__pragma__ ('</all>')
				}
			}
		}
	);
