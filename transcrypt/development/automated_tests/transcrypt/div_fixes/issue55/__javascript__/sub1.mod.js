	__nest__ (
		__all__,
		'div_fixes.issue55.sub1', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var p = 'p';
					var q = 'q';
					var r = 'r';
					__pragma__ ('<all>')
						__all__.p = p;
						__all__.q = q;
						__all__.r = r;
					__pragma__ ('</all>')
				}
			}
		}
	);
