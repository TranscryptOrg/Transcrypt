	__nest__ (
		__all__,
		'reporter', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __name__ = 'reporter';
					print ('I am reporter.py, the sub module of the main unit');
					var report = function () {
						print ('report report report');
					};
					__pragma__ ('<all>')
						__all__.__name__ = __name__;
						__all__.report = report;
					__pragma__ ('</all>')
				}
			}
		}
	);
