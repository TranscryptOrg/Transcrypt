	__nest__ (
		__all__,
		'data_structures', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var aList = list ([1, 2, 3, 'moon', 'stars']);
						autoTester.check (aList);
						aList.insert (3, 'sun');
						autoTester.check (aList);
						autoTester.check (aList.__getslice__ (2, 4, 1));
						autoTester.check (aList.__getslice__ (0, null, 1));
						autoTester.check (aList.__getslice__ (2, null, 1));
						autoTester.check (len (aList));
						aList.append ('milkyway');
						autoTester.check (aList);
						aList.extend (list (['m1', 'm31']));
						autoTester.check (aList);
						var anotherList = list (tuple (['a', 'b', 'c']));
						autoTester.check (anotherList);
						var aDict = dict ({1: 'plant', 'animal': 2});
						autoTester.check (aDict);
						autoTester.check (aDict [1], aDict ['animal']);
						var p = function () {
							return 3;
						};
						var q = 4;
						autoTester.check (dict ([[p (), 'three'], [q, 'four']]));
						var aTuple = tuple ([1, 2, 3, 4, 5]);
						autoTester.check (aTuple);
						autoTester.check (len (aTuple));
						var anotherTuple = tuple ([1]);
						autoTester.check (anotherTuple);
						var aSet = new set ([1, 2, 2, 3]);
						autoTester.check (aSet);
						autoTester.check (len (aSet));
						var anotherSet = set (tuple ([4, 5, 5, 6]));
						autoTester.check (anotherSet);
						var emptySet = set ();
						autoTester.check (emptySet);
						autoTester.check (len (emptySet));
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
