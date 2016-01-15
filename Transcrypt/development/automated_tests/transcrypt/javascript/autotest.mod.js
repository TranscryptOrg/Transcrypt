	(function () {
		var classes = {};
		var datastructures = {};
		var modules = {};
		var org = {};
		__nest__ (org, 'transcrypt.autotester', __init__ (__world__.org.transcrypt.autotester));
		__nest__ (classes, '', __init__ (__world__.classes));
		__nest__ (modules, '', __init__ (__world__.modules));
		__nest__ (datastructures, '', __init__ (__world__.datastructures));
		var autoTester = org.transcrypt.autotester.AutoTester ();
		classes.run (autoTester);
		modules.run (autoTester);
		datastructures.run (autoTester);
		autoTester.done ();
		//<all>
		__all__.autoTester = autoTester;
		//</all>
	}) ();
