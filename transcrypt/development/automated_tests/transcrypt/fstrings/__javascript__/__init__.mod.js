	__nest__ (
		__all__,
		'fstrings', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var math = {};
					__nest__ (math, '', __init__ (__world__.math));
					var run = function (autoTester) {
						var aDict = dict ({'one': 1});
						var aSet = new set (['rose']);
						var anArray = list (['hundred', 100, 'pi', 3.14, 'e', 2.74, 'dozen', 12]);
						var anInt = 144;
						var aFloat = 3.14;
						autoTester.check (aDict);
						autoTester.check (str (aDict));
						autoTester.check (repr (aDict));
						autoTester.check ('aDictionary: ({}, {})'.format ('aDict', 'aDict ["one"]'));
						autoTester.check ('aDictionary: ({}, {})'.format (aDict, aDict ['one']));
						autoTester.check ('aSet: ({}, {})'.format (aSet, __in__ ('rose', aSet)));
						autoTester.check ('anArray ({}, {}, {})'.format (anArray, anArray.__getslice__ (1, 4, 1), anArray [5]));
						autoTester.check ('anInt ({}, {})'.format (anInt, int (math.sqrt (anInt))));
						autoTester.check ('aFloat ({}, {})'.format (aFloat, round (math.sin (aFloat + 2.74), 2)));
					};
					__pragma__ ('<use>' +
						'math' +
					'</use>')
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
