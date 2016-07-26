	__nest__ (
		__all__,
		'truthyness', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						autoTester.check (len (dict ({1: 2})));
						autoTester.check ('Select nonemtpy container, if any<br>');
						autoTester.check (__ (0) || tuple ([1, 2, 3]));
						autoTester.check (__ (tuple ([])) || tuple ([1, 2, 3]));
						autoTester.check (__ (tuple ([])) || tuple ([]));
						autoTester.check (__ (-__ ((1))) || __ (0) || tuple ([1, 2, 3]));
						autoTester.check (__ (tuple ([])) || __ (0) || tuple ([1, 2, 3]));
						autoTester.check (__ (tuple ([])) || __ (tuple ([])) || tuple ([1, 2, 3]));
						autoTester.check (__ (tuple ([])) || __ (tuple ([])) || tuple ([]));
						autoTester.check (__ (list ([0])) || list ([1, 2, 3]));
						autoTester.check (__ (list ([])) || list ([1, 2, 3]));
						autoTester.check (__ (list ([])) || list ([]));
						autoTester.check (__ (list ([-__ ((1))])) || __ (list ([0])) || list ([1, 2, 3]));
						autoTester.check (__ (list ([])) || __ (list ([0])) || list ([1, 2, 3]));
						autoTester.check (__ (list ([])) || __ (list ([])) || list ([1, 2, 3]));
						autoTester.check (__ (list ([])) || __ (list ([])) || list ([]));
						autoTester.check (__ (new set ([0])) || new set ([1, 2, 3]));
						autoTester.check (__ (set ()) || new set ([1, 2, 3]));
						autoTester.check (__ (set ()) || set ());
						autoTester.check (__ (new set ([-__ ((1))])) || __ (new set ([0])) || new set ([1, 2, 3]));
						autoTester.check (__ (set ()) || __ (new set ([0])) || new set ([1, 2, 3]));
						autoTester.check (__ (set ()) || __ (set ()) || new set ([1, 2, 3]));
						autoTester.check (__ (set ()) || __ (set ()) || set ());
						autoTester.check (__ (dict ({0: 10})) || dict ({1: 11, 2: 12, 3: 13}));
						autoTester.check (__ (dict ({})) || new set ([1, 2, 3]));
						autoTester.check (__ (dict ({})) || dict ({}));
						autoTester.check (__ (dict ([[-__ ((1)), -__ ((11))]])) || __ (dict ({0: 10})) || dict ({1: 11, 2: 12, 3: 13}));
						autoTester.check (__ (dict ({})) || __ (dict ({0: 10})) || dict ({1: 11, 2: 12, 3: 13}));
						autoTester.check (__ (dict ({})) || __ (dict ({})) || dict ({1: 11, 2: 12, 3: 13}));
						autoTester.check (__ (dict ({})) || __ (dict ({})) || dict ({}));
						autoTester.check ('<br><br>');
						autoTester.check ('Boolean evaluations');
						var __iterable0__ = tuple (['<br> -- falsy -- <br>', tuple ([]), list ([]), set (), dict ({}), 0, '', 3 > 5, false, '<br> -- truthy -- <br>', tuple ([1, 2, 3]), list ([1, 2, 3]), new set ([1, 2, 3]), dict ({'a': 1, 'b': 2, 'c': 3}), 3, 'hello', 5 > 3, true]);
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
							var expression = __iterable0__ [__index0__];
							if (__ (__in__ (expression, tuple (['<br> -- falsy -- <br>', '<br> -- truthy -- <br>'])))) {
								autoTester.check (expression);
							}
							else {
								autoTester.check (expression, ' . . . ');
								autoTester.check ('operators');
								autoTester.check (!__ ((!__ ((expression)))));
								autoTester.check (!__ ((!__ ((__ (true) && expression)))));
								autoTester.check (!__ ((!__ ((__ (false) || expression)))));
								autoTester.check (!__ ((!__ ((__ (expression) && true)))));
								autoTester.check (!__ ((!__ ((__ (expression) && false)))));
								autoTester.check ('if');
								if (__ (expression)) {
									autoTester.check (true);
								}
								else {
									autoTester.check (false);
								}
								if (__ (__ (expression) || expression)) {
									autoTester.check (true);
								}
								else {
									autoTester.check (false);
								}
								if (__ (false)) {
									autoTester.check ('if');
								}
								else {
									if (__ (expression)) {
										autoTester.check ('elif');
									}
									else {
										autoTester.check ('else');
									}
								}
								autoTester.check ('while');
								while (__ (expression)) {
									autoTester.check (true);
									break;
								}
								autoTester.check ('condex');
								autoTester.check ((__ (expression) ? true : false));
							}
						}
						if (__ (0.0)) {
							autoTester.check ('0.0');
						}
						else {
							if (__ (0.1)) {
								autoTester.check ('0.1');
							}
							else {
								autoTester.check ("Shouldn't be here...");
							}
						}
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
