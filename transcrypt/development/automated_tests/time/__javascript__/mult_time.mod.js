	__nest__ (
		__all__,
		'mult_time', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var time = {};
					__nest__ (time, '', __init__ (__world__.time));
					var run = function (autoTester) {
						var t = list ([2000, 1, 1, 1, 1, 1, 1, 1, 0]);
						var check = function (fmt) {
							var s = time.mktime (tuple (t));
							autoTester.check ('gmtime', tuple (time.gmtime (int (s))));
							autoTester.check ('localtime', tuple (time.localtime (int (s))));
							autoTester.check ('mktime', int (s));
							autoTester.check ('ctime', int (s));
						};
						for (var hour of tuple ([0, 1, 12, 14, 23])) {
							t [3] = hour;
							for (var f of tuple (['%p %I.%d.%Y', '%b .%d.%y', '%b .%d.%Y', '%d%m%Y%H:%M:%S%p', '%b .%d.%Y', 'M%m.%d.%Y', '%m.%d.%Y', '%m.%d.%Y', '%b .%d.%Y', '%m.%d.%Y', '%B %d.%Y', '%a %b %d %H:%M:%S %Y', '%d.%m.%Y %I:%M:%S%p', '%a%b %d %H:%M:%S %Y', '%a%b%d %H:%M:%S %Y', '%a%b%d%H:%Mx%S%Y', '%a%b%d%H:%Mxx%S%Y', '%a%b%d%H:%Mxx%S%Y +000', ' %a%b%d%H:%Mxx%S%Y +000 '])) {
								check (f);
							}
						}
						autoTester.check ('asctime', t);
					};
					__pragma__ ('<use>' +
						'time' +
					'</use>')
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
