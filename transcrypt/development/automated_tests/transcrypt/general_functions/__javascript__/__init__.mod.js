	__nest__ (
		__all__,
		'general_functions', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var A = __class__ ('A', [object], {
						foo: 'bar',
						get __init__ () {return __get__ (this, function (self) {
							self.foo2 = 'bar2';
						});}
					});
					var B = __class__ ('B', [A], {
						foo3: 'bar3',
						get __init__ () {return __get__ (this, function (self) {
							self.foo4 = 'bar4';
						});}
					});
					var run = function (autoTester) {
						autoTester.check ('sort and sorted<br>');
						var a = list ([1, 5, 3, 2, -(1)]);
						var b = list (['sun', 'earth', 'moon']);
						autoTester.check (sorted (a));
						autoTester.check (sorted (b));
						a.py_sort ();
						autoTester.check (a);
						b.py_sort ();
						autoTester.check (b);
						autoTester.check (sorted (a, __kwargdict__ ({reverse: true})));
						autoTester.check (sorted (b, __kwargdict__ ({reverse: true})));
						a.py_sort (__kwargdict__ ({reverse: true}));
						autoTester.check (a);
						b.py_sort (__kwargdict__ ({reverse: true}));
						autoTester.check (b);
						b.py_sort (__kwargdict__ ({key: (function __lambda__ (x) {
							return len (x);
						})}));
						autoTester.check (b);
						b.py_sort (__kwargdict__ ({key: (function __lambda__ (x) {
							return len (x);
						}), reverse: true}));
						autoTester.check (b);
						autoTester.check ('<br><br>dir<br>');
						autoTester.check (function () {
							var __accu0__ = [];
							var __iterable0__ = dir (A);
							for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
								var entry = __iterable0__ [__index0__];
								if (!(entry.startswith ('__'))) {
									__accu0__.append (entry);
								}
							}
							return __accu0__;
						} ());
						autoTester.check (function () {
							var __accu0__ = [];
							var __iterable0__ = dir (A ());
							for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
								var entry = __iterable0__ [__index0__];
								if (!(entry.startswith ('__'))) {
									__accu0__.append (entry);
								}
							}
							return __accu0__;
						} ());
						autoTester.check (function () {
							var __accu0__ = [];
							var __iterable0__ = dir (B);
							for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
								var entry = __iterable0__ [__index0__];
								if (!(entry.startswith ('__'))) {
									__accu0__.append (entry);
								}
							}
							return __accu0__;
						} ());
						autoTester.check (function () {
							var __accu0__ = [];
							var __iterable0__ = dir (B ());
							for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
								var entry = __iterable0__ [__index0__];
								if (!(entry.startswith ('__'))) {
									__accu0__.append (entry);
								}
							}
							return __accu0__;
						} ());
						autoTester.check ('<br><br>any, all, sum<br>');
						var list1 = list (['ape', 'node', 'mice']);
						var list2 = list (['vim', '', 'jet']);
						var list3 = list (['', '', '']);
						var list4 = list ([list ([1, 2]), list ([1]), list ([])]);
						autoTester.check (list1, any (list1), all (list1));
						autoTester.check (list2, any (list2), all (list2));
						autoTester.check (list3, any (list3), all (list3));
						autoTester.check (list4, any (list4), all (list4));
						autoTester.check (sum (range (5)));
					};
					__pragma__ ('<all>')
						__all__.A = A;
						__all__.B = B;
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
