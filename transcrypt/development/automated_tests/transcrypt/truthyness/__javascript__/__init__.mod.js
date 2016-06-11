	__nest__ (
		__all__,
		'truthyness', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						autoTester.check (len (dict ({1: 2})));
						autoTester.check ('Select nonemtpy container, if any<br>');
						autoTester.check (__truthy__ (0) || tuple ([1, 2, 3]));
						autoTester.check (__truthy__ (tuple ([])) || tuple ([1, 2, 3]));
						autoTester.check (__truthy__ (tuple ([])) || tuple ([]));
						autoTester.check (__truthy__ (-__truthy__ ((1))) || __truthy__ (0) || tuple ([1, 2, 3]));
						autoTester.check (__truthy__ (tuple ([])) || __truthy__ (0) || tuple ([1, 2, 3]));
						autoTester.check (__truthy__ (tuple ([])) || __truthy__ (tuple ([])) || tuple ([1, 2, 3]));
						autoTester.check (__truthy__ (tuple ([])) || __truthy__ (tuple ([])) || tuple ([]));
						autoTester.check (__truthy__ (list ([0])) || list ([1, 2, 3]));
						autoTester.check (__truthy__ (list ([])) || list ([1, 2, 3]));
						autoTester.check (__truthy__ (list ([])) || list ([]));
						autoTester.check (__truthy__ (list ([-__truthy__ ((1))])) || __truthy__ (list ([0])) || list ([1, 2, 3]));
						autoTester.check (__truthy__ (list ([])) || __truthy__ (list ([0])) || list ([1, 2, 3]));
						autoTester.check (__truthy__ (list ([])) || __truthy__ (list ([])) || list ([1, 2, 3]));
						autoTester.check (__truthy__ (list ([])) || __truthy__ (list ([])) || list ([]));
						autoTester.check (__truthy__ (new set ([0])) || new set ([1, 2, 3]));
						autoTester.check (__truthy__ (set ()) || new set ([1, 2, 3]));
						autoTester.check (__truthy__ (set ()) || set ());
						autoTester.check (__truthy__ (new set ([-__truthy__ ((1))])) || __truthy__ (new set ([0])) || new set ([1, 2, 3]));
						autoTester.check (__truthy__ (set ()) || __truthy__ (new set ([0])) || new set ([1, 2, 3]));
						autoTester.check (__truthy__ (set ()) || __truthy__ (set ()) || new set ([1, 2, 3]));
						autoTester.check (__truthy__ (set ()) || __truthy__ (set ()) || set ());
						autoTester.check (__truthy__ (dict ({0: 10})) || dict ({1: 11, 2: 12, 3: 13}));
						autoTester.check (__truthy__ (dict ({})) || new set ([1, 2, 3]));
						autoTester.check (__truthy__ (dict ({})) || dict ({}));
						autoTester.check (__truthy__ (dict ([[-__truthy__ ((1)), -__truthy__ ((11))]])) || __truthy__ (dict ({0: 10})) || dict ({1: 11, 2: 12, 3: 13}));
						autoTester.check (__truthy__ (dict ({})) || __truthy__ (dict ({0: 10})) || dict ({1: 11, 2: 12, 3: 13}));
						autoTester.check (__truthy__ (dict ({})) || __truthy__ (dict ({})) || dict ({1: 11, 2: 12, 3: 13}));
						autoTester.check (__truthy__ (dict ({})) || __truthy__ (dict ({})) || dict ({}));
						autoTester.check ('<br><br>');
						autoTester.check ('Boolean evaluations');
						var __iter0__ = tuple (['<br> -- falsy -- <br>', tuple ([]), list ([]), set (), dict ({}), 0, '', 3 > 5, false, '<br> -- truthy -- <br>', tuple ([1, 2, 3]), list ([1, 2, 3]), new set ([1, 2, 3]), dict ({'a': 1, 'b': 2, 'c': 3}), 3, 'hello', 5 > 3, true]);
						for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
							var expression = __iter0__ [__index0__];
							if (__truthy__ (__in__ (expression, tuple (['<br> -- falsy -- <br>', '<br> -- truthy -- <br>'])))) {
								autoTester.check (expression);
							}
							else {
								autoTester.check (expression, ' . . . ');
								autoTester.check ('operators');
								autoTester.check (!__truthy__ ((!__truthy__ ((expression)))));
								autoTester.check (!__truthy__ ((!__truthy__ ((__truthy__ (true) && expression)))));
								autoTester.check (!__truthy__ ((!__truthy__ ((__truthy__ (false) || expression)))));
								autoTester.check (!__truthy__ ((!__truthy__ ((__truthy__ (expression) && true)))));
								autoTester.check (!__truthy__ ((!__truthy__ ((__truthy__ (expression) && false)))));
								autoTester.check ('if');
								if (__truthy__ (expression)) {
									autoTester.check (true);
								}
								else {
									autoTester.check (false);
								}
								if (__truthy__ (__truthy__ (expression) || expression)) {
									autoTester.check (true);
								}
								else {
									autoTester.check (false);
								}
								if (__truthy__ (false)) {
									autoTester.check ('if');
								}
								else {
									if (__truthy__ (expression)) {
										autoTester.check ('elif');
									}
									else {
										autoTester.check ('else');
									}
								}
								autoTester.check ('while');
								while (__truthy__ (expression)) {
									autoTester.check (true);
									break;
								}
								autoTester.check ('condex');
								autoTester.check ((__truthy__ (expression) ? true : false));
							}
						}
						if (__truthy__ (0.0)) {
							autoTester.check ('0.0');
						}
						else {
							if (__truthy__ (0.1)) {
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
