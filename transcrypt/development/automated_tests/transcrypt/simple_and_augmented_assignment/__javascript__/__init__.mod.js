	__nest__ (
		__all__,
		'simple_and_augmented_assignment', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var A = __class__ ('A', [object], {
						get __init__ () {return __get__ (this, function (self) {
							self.i = 0;
						});},
						get f () {return __get__ (this, function (self) {
							return self.i;
						});}
					});
					var a = A ();
					var run = function (autoTester) {
						var x = 3;
						var y = 5;
						var z = x + y;
						autoTester.check (z);
						var l = list ([1, 2, 3]);
						l [1] = l [2];
						autoTester.check (l);
						x++;
						autoTester.check (x);
						x++;
						autoTester.check (x);
						x++;
						autoTester.check (x);
						y--;
						autoTester.check (y);
						y--;
						autoTester.check (y);
						y--;
						autoTester.check (y);
						x += -(3);
						autoTester.check (x);
						x += 6;
						autoTester.check (x);
						y -= 3;
						autoTester.check (y);
						l [1] += l [1];
						autoTester.check (l);
						x += y;
						y += x;
						autoTester.check (x, y);
						var f = a.f;
						a.i++;
						autoTester.check (f ());
						a.i += 10;
						autoTester.check (f ());
						a.i += a.i;
						autoTester.check (f ());
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
