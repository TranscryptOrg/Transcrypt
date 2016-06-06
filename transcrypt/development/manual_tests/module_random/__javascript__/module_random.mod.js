	(function () {
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
		var result = '';
		var output = function (any) {
			result += any + '<br>\n';
		};
		var __iter0__ = tuple ([false, true]);
		for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
			var fixedSeed = __iter0__ [__index0__];
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
			output ('<br>\n');
		}
		document.getElementById ('output').innerHTML = result;
		__pragma__ ('<use>' +
			'random' +
		'</use>')
		__pragma__ ('<all>')
			__all__._array = _array;
			__all__._bitmask1 = _bitmask1;
			__all__._bitmask2 = _bitmask2;
			__all__._bitmask3 = _bitmask3;
			__all__._fill_array = _fill_array;
			__all__._index = _index;
			__all__._random_integer = _random_integer;
			__all__.choice = choice;
			__all__.fixedSeed = fixedSeed;
			__all__.i = i;
			__all__.output = output;
			__all__.randint = randint;
			__all__.random = random;
			__all__.result = result;
			__all__.seed = seed;
		__pragma__ ('</all>')
	}) ();
