	__nest__ (
		__all__,
		'snabbdom', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __iterable0__ = tuple (['makeDOMDriver', 'div', 'h', 'input', 'span']);
					for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
						var key = __iterable0__ [__index0__];
						__all__ [key] = getattr (CycleDOM, key);
					}
					__pragma__ ('<all>')
						__all__.key = key;
					__pragma__ ('</all>')
				}
			}
		}
	);
