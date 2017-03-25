	(function () {
		var mod1 = {};
		var mod2 = {};
		var Iterator = __init__ (__world__.typing).Iterator;
		__nest__ (mod1, '', __init__ (__world__.mod1));
		__nest__ (mod2, '', __init__ (__world__.mod2));
		var testVar = 3.5;
		var fib = function (n) {
			var __left0__ = tuple ([0, 1]);
			var a = __left0__ [0];
			var b = __left0__ [1];
			while (a < n) {
				var __left0__ = tuple ([b, a + b]);
				var a = __left0__ [0];
				var b = __left0__ [1];
			}
			return 3;
		};
		var add = function (a, b) {
			return a + b;
		};
		var A = __class__ ('A', [object], {
			get __init__ () {return __get__ (this, function (self) {
				// pass;
			});},
			get test () {return __get__ (this, function (self) {
				return 'test';
			});}
		});
		__pragma__ ('<use>' +
			'mod1' +
			'mod2' +
			'typing' +
		'</use>')
		__pragma__ ('<all>')
			__all__.A = A;
			__all__.Iterator = Iterator;
			__all__.add = add;
			__all__.fib = fib;
			__all__.testVar = testVar;
		__pragma__ ('</all>')
	}) ();
