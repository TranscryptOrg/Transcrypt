	__nest__ (
		__all__,
		'testmod', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __name__ = 'testmod';
					var a = 2;
					var f = function () {
						return a;
					};
					__pragma__ ('<all>')
						__all__.__name__ = __name__;
						__all__.a = a;
						__all__.f = f;
					__pragma__ ('</all>')
				}
			}
		}
	);
