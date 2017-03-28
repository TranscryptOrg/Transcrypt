	__nest__ (
		__all__,
		'dict_comprehensions', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var original = dict ({'Isaac': 'Newton', 'Albert': 'Einstein', 'Paul': 'Dirac'});
						autoTester.check (original);
						var inverted = function () {
							var __accu0__ = [];
							for (var key of __i__ (original)) {
								__accu0__.append (list ([original [key], key]));
							}
							return dict (__accu0__);
						} ();
						autoTester.check (inverted);
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
