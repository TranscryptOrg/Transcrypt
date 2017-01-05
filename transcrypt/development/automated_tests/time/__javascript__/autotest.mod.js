	(function () {
		var mult_time = {};
		var org = {};
		var strptime = {};
		var testlet0 = {};
		__nest__ (org, 'transcrypt.autotester', __init__ (__world__.org.transcrypt.autotester));
		__nest__ (testlet0, '', __init__ (__world__.testlet0));
		__nest__ (strptime, '', __init__ (__world__.strptime));
		__nest__ (mult_time, '', __init__ (__world__.mult_time));
		var autoTester = org.transcrypt.autotester.AutoTester ();
		autoTester.run (testlet0, 'testlet0');
		autoTester.run (strptime, 'strptime');
		autoTester.run (mult_time, 'mult_time');
		autoTester.done ();
		__pragma__ ('<use>' +
			'mult_time' +
			'org.transcrypt.autotester' +
			'strptime' +
			'testlet0' +
		'</use>')
		__pragma__ ('<all>')
			__all__.autoTester = autoTester;
		__pragma__ ('</all>')
	}) ();
