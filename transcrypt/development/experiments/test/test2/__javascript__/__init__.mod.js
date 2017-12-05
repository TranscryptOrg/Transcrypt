	__nest__ (
		__all__,
		'test2', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __name__ = 'test2';
					var D = __class__ ('D', [object], {
						__module__: __name__,
					});
					__pragma__ ('<all>')
						__all__.D = D;
						__all__.__name__ = __name__;
					__pragma__ ('</all>')
				}
			}
		}
	);
