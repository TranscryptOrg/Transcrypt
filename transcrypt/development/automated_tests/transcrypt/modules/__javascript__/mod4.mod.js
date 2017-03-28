	__nest__ (
		__all__,
		'modules.mod4', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var mod4Add2FromMod5 = function (variable) {
						var mod5Add2 = __init__ (__world__.modules.mod5).mod5Add2;
						return mod5Add2 (variable);
					};
					var mod4Add1 = function (variable) {
						return variable + 1;
					};
					__pragma__ ('<use>' +
						'modules.mod5' +
					'</use>')
					__pragma__ ('<all>')
						__all__.mod4Add1 = mod4Add1;
						__all__.mod4Add2FromMod5 = mod4Add2FromMod5;
					__pragma__ ('</all>')
				}
			}
		}
	);
