	(function () {
		var org = {};
		var testlet0 = {};
		var testlet1 = {};
		__nest__ (org, 'transcrypt.autotester', __init__ (__world__.org.transcrypt.autotester));
		__nest__ (testlet0, '', __init__ (__world__.testlet0));
		__nest__ (testlet1, '', __init__ (__world__.testlet1));
		var autoTester = org.transcrypt.autotester.AutoTester ();
		testlet0.run (autoTester);
		testlet1.run (autoTester);
		autoTester.done ();
		//<all>
		__all__.autoTester = autoTester;
		//</all>
	}) ();
