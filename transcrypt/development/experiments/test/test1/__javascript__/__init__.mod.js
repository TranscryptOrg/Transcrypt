	__nest__ (
		__all__,
		'test1', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var test1 = {};
					__nest__ (test1, 'test2', __init__ (__world__.test1.test2));
					print ('From test1:', test1.test2.C.__module__);
					__pragma__ ('<use>' +
						'test1.test2' +
					'</use>')
				}
			}
		}
	);
