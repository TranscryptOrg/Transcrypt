	(function () {
		var classes = {};
		var conditional_expressions = {};
		var control_structures = {};
		var data_structures = {};
		var exceptions = {};
		var indices_and_slices = {};
		var list_comprehensions = {};
		var modules = {};
		var org = {};
		var simple_and_augmented_assignment = {};
		var tuple_assignment = {};
		__nest__ (org, 'transcrypt.autotester', __init__ (__world__.org.transcrypt.autotester));
		__nest__ (classes, '', __init__ (__world__.classes));
		__nest__ (conditional_expressions, '', __init__ (__world__.conditional_expressions));
		__nest__ (control_structures, '', __init__ (__world__.control_structures));
		__nest__ (data_structures, '', __init__ (__world__.data_structures));
		__nest__ (exceptions, '', __init__ (__world__.exceptions));
		__nest__ (indices_and_slices, '', __init__ (__world__.indices_and_slices));
		__nest__ (list_comprehensions, '', __init__ (__world__.list_comprehensions));
		__nest__ (modules, '', __init__ (__world__.modules));
		__nest__ (simple_and_augmented_assignment, '', __init__ (__world__.simple_and_augmented_assignment));
		__nest__ (tuple_assignment, '', __init__ (__world__.tuple_assignment));
		var autoTester = org.transcrypt.autotester.AutoTester ();
		autoTester.run (classes, 'classes');
		autoTester.run (conditional_expressions, 'conditional_expressions');
		autoTester.run (control_structures, 'control_structures');
		autoTester.run (data_structures, 'data_structures');
		autoTester.run (exceptions, 'exceptions');
		autoTester.run (indices_and_slices, 'indices_and_slices');
		autoTester.run (list_comprehensions, 'list_comprehensions');
		autoTester.run (modules, 'modules');
		autoTester.run (simple_and_augmented_assignment, 'simple_and_augmented_assignment');
		autoTester.run (tuple_assignment, 'tuple_assignemt');
		autoTester.done ();
		//<all>
		__all__.autoTester = autoTester;
		//</all>
	}) ();
