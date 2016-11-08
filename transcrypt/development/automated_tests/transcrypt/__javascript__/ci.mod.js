	(function () {
		var module_math = {};
		var org = {};
		__nest__ (org, 'transcrypt.autotester', __init__ (__world__.org.transcrypt.autotester));
		__nest__ (module_math, '', __init__ (__world__.module_math));
		var autoTester = org.transcrypt.autotester.AutoTester ();
		module_math.run (autoTester);
		autoTester.done ();
		__pragma__ ('<use>' +
			'module_math' +
			'org.transcrypt.autotester' +
		'</use>')
		__pragma__ ('<all>')
			__all__.autoTester = autoTester;
		__pragma__ ('</all>')
	}) ();
