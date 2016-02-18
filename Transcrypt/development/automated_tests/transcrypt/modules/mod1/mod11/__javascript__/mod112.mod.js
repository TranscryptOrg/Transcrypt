	__nest__ (
		__all__,
		'modules.mod1.mod11.mod112', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var f = function () {
						return "Paris, c'est la vie\n";
					};
					__pragma__ ('<all>')
						__all__.f = f;
					__pragma__ ('</all>')
				}
			}
		}
	);
