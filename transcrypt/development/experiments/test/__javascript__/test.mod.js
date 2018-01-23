	(function () {
		var __name__ = '__main__';
		var pystone = __init__ (__world__.test.pystone);
		pystone.main ();
		__pragma__ ('<use>' +
			'test.pystone' +
		'</use>')
		__pragma__ ('<all>')
			__all__.__name__ = __name__;
			__all__.pystone = pystone;
		__pragma__ ('</all>')
	}) ();
