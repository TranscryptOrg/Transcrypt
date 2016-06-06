	__nest__ (
		__all__,
		'div_fixes.issue55.sub2', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var anA = 'a';
					var aB = 'b';
					__pragma__ ('<all>')
						__all__.aB = aB;
						__all__.anA = anA;
					__pragma__ ('</all>')
				}
			}
		}
	);
