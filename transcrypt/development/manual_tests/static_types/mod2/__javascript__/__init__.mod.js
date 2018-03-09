	__nest__ (
		__all__,
		'mod2', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __name__ = 'mod2';
					var test = function (i) {
						return 3;
					};
					__pragma__ ('<all>')
						__all__.__name__ = __name__;
						__all__.test = test;
					__pragma__ ('</all>')
				}
			}
		}
	);
