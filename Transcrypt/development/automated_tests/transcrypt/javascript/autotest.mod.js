	(function () {
		var classes = {};
		var modules = {};
		var org = {};
		var sys = {};
		__nest__ (org, 'transcrypt.autotester', __init__ (__world__.org.transcrypt.autotester));
		print (7777777777);
		__nest__ (sys, '', __init__ (__world__.sys));
		var __iter0__ = sys.path;
		for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
			var item = __iter0__ [__index0__] ;
			print (item);
		}
		;
		print (8888888888);
		__nest__ (classes, '', __init__ (__world__.classes));
		__nest__ (modules, '', __init__ (__world__.modules));
		var autoTester = org.transcrypt.autotester.AutoTester ();
		classes.run (autoTester);
		modules.run (autoTester);
		autoTester.done ();
		//<all>
		__all__.autoTester = autoTester;
		__all__.item = item;
		//</all>
	}) ();
