	__nest__ (
		__all__,
		'docstrings', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __doc__ = 'Just a module\nto test docstrings';
					var run = function (autoTester) {
						var f = function (p) {
							autoTester.check (p);
						} .__setdoc__ ('Just a function\n        called f');
						var C = __class__ ('C', [object], {
							get g () {return __get__ (this, function (self, q) {
								autoTester.check (q);
							} .__setdoc__ ('Just a method\n            called g'));}
						}) .__setdoc__ ('Just a class\n        called C');
						autoTester.check (__doc__);
						autoTester.check ();
						autoTester.check (f.__doc__);
						autoTester.check ();
						autoTester.check (C.__doc__);
						autoTester.check ();
						autoTester.check (C.g.__doc__);
						autoTester.check ();
						f ('Doc');
						C ().g ('strings');
					};
					__pragma__ ('<all>')
						__all__.__doc__ = __doc__;
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
