	__nest__ (
		__all__,
		'components.snabbdom', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __name__ = 'components.snabbdom';
					for (var key of tuple (['makeDOMDriver', 'div', 'h', 'input', 'span', 'h2'])) {
						__all__ [key] = getattr (CycleDOM, key);
					}
					__pragma__ ('<all>')
						__all__.__name__ = __name__;
						__all__.key = key;
					__pragma__ ('</all>')
				}
			}
		}
	);
