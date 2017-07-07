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
		var output = function () {
			var any = tuple ([].slice.apply (arguments).slice (0));
			var __iterable0__ = any;
			for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
				var item = __iterable0__ [__index0__];
				result += str (item);
				result += ' ';
			}
			result += '<br>\n';
		};
		output ('Issue 96');
		var Tolerant = __class__ ('Tolerant', [object], {
			a: 3,
			get f () {return __get__ (this, function (cls) {
				// pass;
			});},
			get __init__ () {return __get__ (this, function (self) {
				self.b = 4;
			});},
			get g () {return __get__ (this, function (self) {
				// pass;
			});}
		});
		var tolerant = Tolerant ();
		output ('T', __in__ ('a', Tolerant));
		output ('T', __in__ ('f', Tolerant));
		output ('F', __in__ ('b', Tolerant));
		output ('T', __in__ ('g', Tolerant));
		output ('F', __in__ ('h', Tolerant));
		output ('F', __in__ ('a', tolerant));
		output ('F', __in__ ('f', tolerant));
		output ('T', __in__ ('b', tolerant));
		output ('F', __in__ ('g', tolerant));
		output ('F', __in__ ('h', tolerant));
		output ('<br>Issue 102');
		
		        function Example () {};
		        Example.prototype.foo = function () {output (this, arguments);};
		
		        var example = new Example();
		        example.foo(1, 2, 3);
		        // Works as expected:
		        // Object {  } Arguments { , 5 more… }
		        
		
		var args = list ([1, 2, 3]);
		var example = new Example ();
		example.foo (1, 2, 3);
		example.foo.apply (null, args);
		output ('None rather than [object Object] in previous line');
		output ('<br>Issue 130');
		var x = __mod__ (-(3), 8);
		
		    var y = -3 % 8
		
		var z = -(3) % 8;
		output (x, ' != ', y, '==', z);
		document.getElementById ('output').innerHTML = result;
		__pragma__ ('<use>' +
			'random' +
		'</use>')
		__pragma__ ('<all>')
			__all__.Tolerant = Tolerant;
			__all__._array = _array;
			__all__._bitmask1 = _bitmask1;
			__all__._bitmask2 = _bitmask2;
			__all__._bitmask3 = _bitmask3;
			__all__._fill_array = _fill_array;
			__all__._index = _index;
			__all__._random_integer = _random_integer;
			__all__.args = args;
			__all__.choice = choice;
			__all__.example = example;
			__all__.output = output;
			__all__.randint = randint;
			__all__.random = random;
			__all__.result = result;
			__all__.seed = seed;
			__all__.tolerant = tolerant;
			__all__.x = x;
			__all__.z = z;
		__pragma__ ('</all>')
	}) ();
