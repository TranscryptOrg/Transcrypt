	(function () {
		var basic_jsre = {};
		var basic_pyre = {};
		var org = {};
		__nest__ (org, 'transcrypt.autotester', __init__ (__world__.org.transcrypt.autotester));
		__nest__ (basic_pyre, '', __init__ (__world__.basic_pyre));
		__nest__ (basic_jsre, '', __init__ (__world__.basic_jsre));
		var autoTester = org.transcrypt.autotester.AutoTester ();
		autoTester.run (basic_jsre, 'Basic JS RE Tests');
		autoTester.run (basic_pyre, 'Basic Python RE Tests');
		autoTester.done ();
		__pragma__ ('<use>' +
			'basic_jsre' +
			'basic_pyre' +
			'org.transcrypt.autotester' +
		'</use>')
		__pragma__ ('<all>')
			__all__.autoTester = autoTester;
		__pragma__ ('</all>')
	}) ();
