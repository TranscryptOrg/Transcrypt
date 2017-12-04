	__nest__ (
		__all__,
		'test1', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var test2 = {};
					__nest__ (test2, '', __init__ (__world__.test2));
					__pragma__ ('<use>' +
						'test2' +
					'</use>')
				}
			}
		}
	);
