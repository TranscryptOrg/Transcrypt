	(function () {
		var test1 = {};
		__nest__ (test1, '', __init__ (__world__.test1));
		__nest__ (test1, 'test2', __init__ (__world__.test1.test2));
		var run = function (autoTester) {
			autoTester.check ('From test: ', test1.test2.C.__module__);
			autoTester.check ('__main__');
			var D = __class__ ('D', [object], {
				__module__: '__main__',
			});
			autoTester.check ('From test:', D.__module__);
			autoTester.check (D.__name__);
		};
		__pragma__ ('<use>' +
			'test1' +
			'test1.test2' +
		'</use>')
		__pragma__ ('<all>')
			__all__.run = run;
		__pragma__ ('</all>')
	}) ();
