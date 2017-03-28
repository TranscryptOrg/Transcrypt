	__nest__ (
		__all__,
		'truthyness', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						autoTester.check (len (dict ({1: 2})));
						autoTester.check ('Select nonemtpy container, if any<br>');
						autoTester.check (__t__ (0) || tuple ([1, 2, 3]));
						autoTester.check (__t__ (tuple ([])) || tuple ([1, 2, 3]));
						autoTester.check (__t__ (tuple ([])) || tuple ([]));
						autoTester.check (__t__ (-__t__ ((1))) || __t__ (0) || tuple ([1, 2, 3]));
						autoTester.check (__t__ (tuple ([])) || __t__ (0) || tuple ([1, 2, 3]));
						autoTester.check (__t__ (tuple ([])) || __t__ (tuple ([])) || tuple ([1, 2, 3]));
						autoTester.check (__t__ (tuple ([])) || __t__ (tuple ([])) || tuple ([]));
						autoTester.check (__t__ (list ([0])) || list ([1, 2, 3]));
						autoTester.check (__t__ (list ([])) || list ([1, 2, 3]));
						autoTester.check (__t__ (list ([])) || list ([]));
						autoTester.check (__t__ (list ([-__t__ ((1))])) || __t__ (list ([0])) || list ([1, 2, 3]));
						autoTester.check (__t__ (list ([])) || __t__ (list ([0])) || list ([1, 2, 3]));
						autoTester.check (__t__ (list ([])) || __t__ (list ([])) || list ([1, 2, 3]));
						autoTester.check (__t__ (list ([])) || __t__ (list ([])) || list ([]));
						autoTester.check (__t__ (new set ([0])) || new set ([1, 2, 3, 4]));
						autoTester.check (__t__ (set ()) || new set ([1, 2, 3, 4]));
						autoTester.check (__t__ (set ()) || set ());
						autoTester.check (__t__ (new set ([-__t__ ((1))])) || __t__ (new set ([0])) || new set ([1, 2, 3, 5]));
						autoTester.check (__t__ (set ()) || __t__ (new set ([0])) || new set ([1, 2, 3, 6]));
						autoTester.check (__t__ (set ()) || __t__ (set ()) || new set ([1, 2, 3, 7]));
						autoTester.check (__t__ (set ()) || __t__ (set ()) || set ());
						autoTester.check (__t__ (dict ({0: 10})) || dict ({1: 11, 2: 12, 3: 13}));
						autoTester.check (__t__ (dict ({})) || new set ([1, 2, 3, 8]));
						autoTester.check (__t__ (dict ({})) || dict ({}));
						autoTester.check (__t__ (dict ([[-__t__ ((1)), -__t__ ((11))]])) || __t__ (dict ({0: 10})) || dict ({1: 11, 2: 12, 3: 13}));
						autoTester.check (__t__ (dict ({})) || __t__ (dict ({0: 10})) || dict ({1: 11, 2: 12, 3: 13}));
						autoTester.check (__t__ (dict ({})) || __t__ (dict ({})) || dict ({1: 11, 2: 12, 3: 13}));
						autoTester.check (__t__ (dict ({})) || __t__ (dict ({})) || dict ({}));
						autoTester.check ('<br><br>');
						autoTester.check ('Boolean evaluations');
						for (var expression of tuple (['<br> -- falsy -- <br>', tuple ([]), list ([]), set (), dict ({}), 0, '', 3 > 5, false, '<br> -- truthy -- <br>', tuple ([1, 2, 3]), list ([1, 2, 3]), new set ([1, 2, 3]), dict ({'a': 1, 'b': 2, 'c': 3}), 3, 'hello', 5 > 3, true])) {
							if (__t__ (__in__ (expression, tuple (['<br> -- falsy -- <br>', '<br> -- truthy -- <br>'])))) {
								autoTester.check (expression);
							}
							else {
								autoTester.check (expression, ' . . . ');
								autoTester.check ('operators');
								autoTester.check (!__t__ ((!__t__ ((expression)))));
								autoTester.check (!__t__ ((!__t__ ((__t__ (true) && expression)))));
								autoTester.check (!__t__ ((!__t__ ((__t__ (false) || expression)))));
								autoTester.check (!__t__ ((!__t__ ((__t__ (expression) && true)))));
								autoTester.check (!__t__ ((!__t__ ((__t__ (expression) && false)))));
								autoTester.check ('if');
								if (__t__ (expression)) {
									autoTester.check (true);
								}
								else {
									autoTester.check (false);
								}
								if (__t__ (__t__ (expression) || expression)) {
									autoTester.check (true);
								}
								else {
									autoTester.check (false);
								}
								if (__t__ (false)) {
									autoTester.check ('if');
								}
								else if (__t__ (expression)) {
									autoTester.check ('elif');
								}
								else {
									autoTester.check ('else');
								}
								autoTester.check ('while');
								while (__t__ (expression)) {
									autoTester.check (true);
									break;
								}
								autoTester.check ('condex');
								autoTester.check ((__t__ (expression) ? true : false));
							}
						}
						if (__t__ (0.0)) {
							autoTester.check ('0.0');
						}
						else if (__t__ (0.1)) {
							autoTester.check ('0.1');
						}
						else {
							autoTester.check ("Shouldn't be here...");
						}
						var A = __class__ ('A', [object], {
						});
						autoTester.check (!__t__ ((!__t__ ((A ())))));
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
