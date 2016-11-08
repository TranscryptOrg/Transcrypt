	__nest__ (
		__all__,
		'strptime', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var time = {};
					__nest__ (time, '', __init__ (__world__.time));
					var run = function (autoTester) {
						var check = function (t, fmt) {
							var s = tuple (time.strptime (t, fmt));
							autoTester.check (' '.join (list ([t, '[', fmt, '] = '])), s);
						};
						check ('FEb .1.1902', '%b .%d.%Y');
						check ('3112199912:00:00pm', '%d%m%Y%H:%M:%S%p');
						check ('FEb .1.1902', '%b .%d.%Y');
						check ('M1.1.1901', 'M%m.%d.%Y');
						check ('2.1.1900', '%m.%d.%Y');
						check ('6.1.2000', '%m.%d.%Y');
						check ('nov .1.1900', '%b .%d.%Y');
						check ('2.1.1900', '%m.%d.%Y');
						check ('december 1.1999', '%B %d.%Y');
						check ('Tue Jul 18 19:32:11 2016', '%a %b %d %H:%M:%S %Y');
						check ('31.12.1999 12:00:00pm', '%d.%m.%Y %I:%M:%S%p');
						check ('TueJul 18 19:32:11 2016', '%a%b %d %H:%M:%S %Y');
						check ('TueJul18 19:32:11 2016', '%a%b%d %H:%M:%S %Y');
						check ('TueJul1819:32x112016', '%a%b%d%H:%Mx%S%Y');
						check ('TueJul1819:32xx112016', '%a%b%d%H:%Mxx%S%Y');
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
