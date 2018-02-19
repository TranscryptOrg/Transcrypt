	__nest__ (
		__all__,
		'anisound', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __name__ = 'anisound';
					print ('I am anisound, the sub module of sub0');
					var sound = function () {
						print ('anisound anisound anisound');
					};
					__pragma__ ('<all>')
						__all__.__name__ = __name__;
						__all__.sound = sound;
					__pragma__ ('</all>')
				}
			}
		}
	);
