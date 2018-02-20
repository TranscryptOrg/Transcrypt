	__nest__ (
		__all__,
		'animals_submodule', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __name__ = 'animals_submodule';
					var getTaxoTag = function () {
						return 'animal';
					};
					__pragma__ ('<all>')
						__all__.__name__ = __name__;
						__all__.getTaxoTag = getTaxoTag;
					__pragma__ ('</all>')
				}
			}
		}
	);
