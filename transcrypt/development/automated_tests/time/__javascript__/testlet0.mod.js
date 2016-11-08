	__nest__ (
		__all__,
		'testlet0', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var time = {};
					__nest__ (time, '', __init__ (__world__.time));
					var ts = 1468968009.638596;
					var hy = (6 * 30) * 86400;
					var run = function (autoTester) {
						var c = autoTester.check;
						c ('time():', int (time.time () / 1000));
						c ('altzone:', time.altzone);
						c ('timelen:', len (str (int (time.time ()))));
						c ('localtime:', list (time.localtime (ts)));
						c ('ltime_no_dst:', list (time.localtime (ts + hy)));
						c ('gmtime:', list (time.gmtime (ts)));
						c ('daylight:', bool (time.daylight));
						c ('timezone:', time.timezone);
						c ('tzname:', time.tzname);
					};
					__pragma__ ('<use>' +
						'time' +
					'</use>')
					__pragma__ ('<all>')
						__all__.hy = hy;
						__all__.run = run;
						__all__.ts = ts;
					__pragma__ ('</all>')
				}
			}
		}
	);
