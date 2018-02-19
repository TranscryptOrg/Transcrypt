	(function () {
		var reporter = {};
		var __name__ = '__main__';
		__nest__ (reporter, '', __init__ (__world__.reporter));
		print ('I am aniplant.py, the main module of the main unit');
		var run = function () {
			reporter.report ();
		};
		__pragma__ ('<use>' +
			'reporter' +
		'</use>')
		__pragma__ ('<all>')
			__all__.__name__ = __name__;
			__all__.run = run;
		__pragma__ ('</all>')
	}) ();
