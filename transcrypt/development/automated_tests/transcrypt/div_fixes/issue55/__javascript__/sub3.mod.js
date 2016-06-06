	__nest__ (
		__all__,
		'div_fixes.issue55.sub3', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var x = 'x';
					__pragma__ ('<all>')
						__all__.x = x;
					__pragma__ ('</all>')
				}
			}
		}
	);
