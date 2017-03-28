	__nest__ (
		__all__,
		'module_itertools', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var accumulate = __init__ (__world__.itertools).accumulate;
					var chain = __init__ (__world__.itertools).chain;
					var combinations = __init__ (__world__.itertools).combinations;
					var combinations_with_replacement = __init__ (__world__.itertools).combinations_with_replacement;
					var compress = __init__ (__world__.itertools).compress;
					var count = __init__ (__world__.itertools).count;
					var cycle = __init__ (__world__.itertools).cycle;
					var dropwhile = __init__ (__world__.itertools).dropwhile;
					var filterfalse = __init__ (__world__.itertools).filterfalse;
					var groupby = __init__ (__world__.itertools).groupby;
					var islice = __init__ (__world__.itertools).islice;
					var permutations = __init__ (__world__.itertools).permutations;
					var product = __init__ (__world__.itertools).product;
					var repeat = __init__ (__world__.itertools).repeat;
					var starmap = __init__ (__world__.itertools).starmap;
					var takewhile = __init__ (__world__.itertools).takewhile;
					var tee = __init__ (__world__.itertools).tee;
					var pow = __init__ (__world__.math).pow;
					var fibonacci = function* () {
						var __left0__ = tuple ([0, 1]);
						var a = __left0__ [0];
						var b = __left0__ [1];
						for (var i = 0; i < 10; i++) {
							yield a;
							var __left0__ = tuple ([b, a + b]);
							var a = __left0__ [0];
							var b = __left0__ [1];
						}
					};
					var squares = function () {
						var __accu0__ = [];
						for (var i = 0; i < 10; i++) {
							__accu0__.append (i * i);
						}
						return __accu0__;
					} ();
					var chars = 'thequickbrownfoxjumpsoverthelazydog';
					var run = function (autoTester) {
						autoTester.check ('islice count', list (islice (count (10, 2), 4, 40, 3)));
						autoTester.check ('islice cycle', list (islice (cycle (fibonacci ()), 15)));
						autoTester.check ('repeat', list (repeat (3.14, 15)));
						autoTester.check ('islice repeat', list (islice (repeat (2.74), 15)));
						autoTester.check ('accumulate', list (accumulate (range (5))));
						var add = function (total, element) {
							return total + element;
						};
						autoTester.check ('accumulate', list (accumulate (list (['alamak', 'mirach', 'sirrah']), add)));
						autoTester.check ('chain', list (chain (fibonacci (), squares, chars)));
						autoTester.check ('chain.from_iterable', list (chain.from_iterable (list (['ape', 'node', 'mice', 'vim', 'sus', 'jet']))));
						var selectors = list ([true, true, false, true, false, false, true, true, false, true]);
						autoTester.check ('compress', list (compress (function () {
							var __accu0__ = [];
							for (var [index, py_selector] of enumerate (selectors)) {
								__accu0__.append ('{}{}'.format ((py_selector ? 'take' : 'leave'), index));
							}
							return __accu0__;
						} (), selectors)));
						autoTester.check ('dropwhile', list (dropwhile ((function __lambda__ (x) {
							return x < 5;
						}), list ([1, 4, 6, 4, 1]))));
						autoTester.check ('filterfalse', list (filterfalse ((function __lambda__ (x) {
							return __mod__ (x, 2);
						}), range (10))));
						var things = list ([tuple (['animal', 'bear']), tuple (['animal', 'duck']), tuple (['plant', 'cactus']), tuple (['vehicle', 'speed boat']), tuple (['vehicle', 'school bus'])]);
						for (var [key, group] of groupby (things, (function __lambda__ (x) {
							return x [0];
						}))) {
							for (var thing of group) {
								autoTester.check ('A {} is a {}.'.format (thing [1], key));
							}
							autoTester.check (' ');
						}
						autoTester.check ('islice', list (islice (list ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 2, 9, 2)));
						autoTester.check ('starmap', function () {
							var __accu0__ = [];
							for (var x of starmap (pow, list ([tuple ([2, 5]), tuple ([3, 2]), tuple ([10, 3])]))) {
								__accu0__.append (int (x));
							}
							return __accu0__;
						} ());
						autoTester.check ('takewhile', list (takewhile ((function __lambda__ (x) {
							return x < 5;
						}), list ([1, 4, 6, 4, 1]))));
						var __left0__ = tee (islice (count (), 5));
						var i1 = __left0__ [0];
						var i2 = __left0__ [1];
						autoTester.check ('tee', list (i1), list (i1), list (i2));
						autoTester.check ('product', list (product ('ABCD', 'xy')), list (product (range (2), __kwargtrans__ ({repeat: 3}))));
						autoTester.check ('permutations', list (permutations ('ABCD')), list (permutations ('ABCD', 2)));
						autoTester.check ('combinations', list (combinations ('ABCD', 2)), list (combinations (list ([1, 2, 3, 4, 5]), 3)), list (combinations (islice (count (), 6), 4)));
						autoTester.check ('combinations_with_replacement', list (combinations_with_replacement ('ABCD', 2)), list (combinations_with_replacement (list ([1, 2, 3, 4, 5]), 3)), list (combinations_with_replacement (islice (count (), 6), 4)));
					};
					__pragma__ ('<use>' +
						'itertools' +
						'math' +
					'</use>')
					__pragma__ ('<all>')
						__all__.accumulate = accumulate;
						__all__.chain = chain;
						__all__.chars = chars;
						__all__.combinations = combinations;
						__all__.combinations_with_replacement = combinations_with_replacement;
						__all__.compress = compress;
						__all__.count = count;
						__all__.cycle = cycle;
						__all__.dropwhile = dropwhile;
						__all__.fibonacci = fibonacci;
						__all__.filterfalse = filterfalse;
						__all__.groupby = groupby;
						__all__.islice = islice;
						__all__.permutations = permutations;
						__all__.pow = pow;
						__all__.product = product;
						__all__.repeat = repeat;
						__all__.run = run;
						__all__.squares = squares;
						__all__.starmap = starmap;
						__all__.takewhile = takewhile;
						__all__.tee = tee;
					__pragma__ ('</all>')
				}
			}
		}
	);
