	__nest__ (
		__all__,
		'cats_submodule', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var getTaxoTag = function () {
						return 'cat';
					};
					__pragma__ ('<all>')
						__all__.getTaxoTag = getTaxoTag;
					__pragma__ ('</all>')
				}
			}
		}
	);
