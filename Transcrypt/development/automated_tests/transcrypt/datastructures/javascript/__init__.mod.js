	__nest__ (
		__all__,
		'datastructures', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var aList = [1, 2, 3, 'sun', 'moon', 'stars'];
						autoTester.store (aList);
						autoTester.store (aList.__pyslice__ (2, 4, 1));
						autoTester.store (aList.slice (0));
						autoTester.store (aList.slice (2));
						autoTester.store (len (aList));
						aList.append ('milkyway');
						autoTester.store (aList);
						aList.extend (['m1', 'm31']);
						autoTester.store (aList);
						var anotherList = list (tuple (['a', 'b', 'c']));
						autoTester.store (anotherList);
						var aDict = {1: 'plant', 'animal': 2};
						autoTester.store (aDict);
						autoTester.store (aDict [1] , aDict ['animal'] );
						var aTuple = tuple ([1, 2, 3, 4, 5]);
						autoTester.store (aTuple);
						autoTester.store (len (aTuple));
						var anotherTuple = tuple ([1]);
						autoTester.store (anotherTuple);
						var aSet = new set ([1, 2, 2, 3]);
						autoTester.store (aSet);
						autoTester.store (len (aSet));
						var anotherSet = set (tuple ([4, 5, 5, 6]));
						autoTester.store (anotherSet);
						var emptySet = set ();
						autoTester.store (emptySet);
						autoTester.store (len (emptySet));
					};
					//<all>
					__all__.run = run;
					//</all>
				}
			}
		}
	);
