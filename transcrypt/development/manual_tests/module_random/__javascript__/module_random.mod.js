	(function () {
		var __name__ = '__main__';
		var __name__ = __init__ (__world__.random).__name__;
		var _array = __init__ (__world__.random)._array;
		var _bitmask1 = __init__ (__world__.random)._bitmask1;
		var _bitmask2 = __init__ (__world__.random)._bitmask2;
		var _bitmask3 = __init__ (__world__.random)._bitmask3;
		var _fill_array = __init__ (__world__.random)._fill_array;
		var _index = __init__ (__world__.random)._index;
		var _random_integer = __init__ (__world__.random)._random_integer;
		var choice = __init__ (__world__.random).choice;
		var randint = __init__ (__world__.random).randint;
		var random = __init__ (__world__.random).random;
		var seed = __init__ (__world__.random).seed;
		var shuffle = __init__ (__world__.random).shuffle;
		var result = '';
		var output = function (any) {
			result += any + '<br>\n';
		};
		for (var fixedSeed of tuple ([false, true])) {
			if (fixedSeed) {
				seed (3);
			}
			else {
				seed ();
			}
			output ('------ {} ------'.format ((fixedSeed ? 'fixed seed' : 'auto seed')));
			output ('--- randint ---');
			for (var i = 0; i < 20; i++) {
				output (randint (10, 20));
			}
			output ('<br>\n--- choice ---');
			for (var i = 0; i < 20; i++) {
				output (choice (list ([1, 2, 3, 4, 5])));
			}
			output ('<br>\n--- random ---');
			for (var i = 0; i < 20; i++) {
				output (random ());
			}
			output ('<br>\n--- shuffle ---');
			var aList = list ([0, 1, 2, 3, 4, 5, 6]);
			output (aList);
			for (var i = 0; i < 7; i++) {
				shuffle (aList);
				output (aList);
			}
			output ('<br>\n');
		}
		document.getElementById ('output').innerHTML = result;
		__pragma__ ('<use>' +
			'random' +
		'</use>')
		__pragma__ ('<all>')
			__all__.__name__ = __name__;
			__all__._array = _array;
			__all__._bitmask1 = _bitmask1;
			__all__._bitmask2 = _bitmask2;
			__all__._bitmask3 = _bitmask3;
			__all__._fill_array = _fill_array;
			__all__._index = _index;
			__all__._random_integer = _random_integer;
			__all__.aList = aList;
			__all__.choice = choice;
			__all__.fixedSeed = fixedSeed;
			__all__.i = i;
			__all__.output = output;
			__all__.randint = randint;
			__all__.random = random;
			__all__.result = result;
			__all__.seed = seed;
			__all__.shuffle = shuffle;
		__pragma__ ('</all>')
	}) ();
