	__nest__ (
		__all__,
		'modules.mod5', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var modules = {};
					var mod5Add2 = function (variable) {
						__nest__ (modules, 'mod4', __init__ (__world__.modules.mod4));
						return modules.mod4.mod4Add1 (variable + 1);
					};
					__pragma__ ('<use>' +
						'modules.mod4' +
					'</use>')
					__pragma__ ('<all>')
						__all__.mod5Add2 = mod5Add2;
					__pragma__ ('</all>')
				}
			}
		}
	);
