	__nest__ (
		__all__,
		'modules.mod1', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var pi = 3.1415693588;
					__pragma__ ('<all>')
						__all__.pi = pi;
					__pragma__ ('</all>')
				}
			}
		}
	);
