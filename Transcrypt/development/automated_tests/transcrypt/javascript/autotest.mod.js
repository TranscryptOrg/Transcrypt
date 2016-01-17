	(function () {
		var classes = {};
		var datastructures = {};
		var indices_and_slices = {};
		var list_comprehensions = {};
		var modules = {};
		var org = {};
		var tuple_assignment = {};
		__nest__ (org, 'transcrypt.autotester', __init__ (__world__.org.transcrypt.autotester));
		__nest__ (classes, '', __init__ (__world__.classes));
		__nest__ (datastructures, '', __init__ (__world__.datastructures));
		__nest__ (indices_and_slices, '', __init__ (__world__.indices_and_slices));
		__nest__ (list_comprehensions, '', __init__ (__world__.list_comprehensions));
		__nest__ (modules, '', __init__ (__world__.modules));
		__nest__ (tuple_assignment, '', __init__ (__world__.tuple_assignment));
		var autoTester = org.transcrypt.autotester.AutoTester ();
		autoTester.run (classes, 'classes');
		autoTester.run (datastructures, 'datastructures');
		autoTester.run (indices_and_slices, 'indices_and_slices');
		autoTester.run (list_comprehensions, 'list_comprehensions');
		autoTester.run (modules, 'modules');
		autoTester.run (tuple_assignment, 'tuple_assignemt');
		autoTester.done ();
		//<all>
		__all__.autoTester = autoTester;
		//</all>
	}) ();
