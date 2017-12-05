	(function () {
		var test2 = {};
		var __name__ = '__main__';
		__nest__ (test2, '', __init__ (__world__.test2));
		var C = __class__ ('C', [object], {
			__module__: __name__,
		});
		print (111, test2.D.__module__);
		print (222, C.__module__);
		__pragma__ ('<use>' +
			'test2' +
		'</use>')
		__pragma__ ('<all>')
			__all__.C = C;
			__all__.__name__ = __name__;
		__pragma__ ('</all>')
	}) ();
