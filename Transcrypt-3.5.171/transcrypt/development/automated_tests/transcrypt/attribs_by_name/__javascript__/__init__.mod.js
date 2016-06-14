	__nest__ (
		__all__,
		'attribs_by_name', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var A = __class__ ('A', [object], {
						get __init__ () {return __get__ (this, function (self) {
							self.s = 'hello';
						});}
					});
					var a = A ();
					var run = function (autoTester) {
						autoTester.check (a.s, getattr (a, 's'));
						setattr (a, 's', 'goodbye');
						autoTester.check (a.s, getattr (a, 's'));
						setattr (a, 't', 'exists');
						autoTester.check (hasattr (a, 't'), a.t, getattr (a, 't'));
						delattr (a, 't');
						autoTester.check (hasattr (a, 't'));
					};
					__pragma__ ('<all>')
						__all__.A = A;
						__all__.a = a;
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
