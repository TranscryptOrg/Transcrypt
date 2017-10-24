	(function () {
		var re = {};
		__nest__ (re, '', __init__ (__world__.re));
		var Example = __class__ ('Example', [object], {
			d: dict ({'A': 1, 'B': 2}),
			rec: re.compile ('(?P<decimal>\\d+)', re.ASCII),
			get run () {return __get__ (this, function (self) {
				var match = self.rec.match ('42');
				if (!(match)) {
					print ('ERROR: RE does not match');
				}
				var e = match.groupdict ();
				print ('before: self.d=', self.d);
				print ('before: e=', e);
				self.d.py_update (e);
				print ('after: self.d=', self.d);
			});}
		});
		var example = Example ();
		example.run ();
		__pragma__ ('<use>' +
			're' +
		'</use>')
		__pragma__ ('<all>')
			__all__.Example = Example;
			__all__.example = example;
		__pragma__ ('</all>')
	}) ();
