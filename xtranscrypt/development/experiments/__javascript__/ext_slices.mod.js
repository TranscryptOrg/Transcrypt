	(function () {
		var Test = __class__ ('Test', [object], {
			get __getitem__ () {return __get__ (this, function (self, index) {
				__call__ (print, 'getitem (', index, ')');
			});},
			get __setitem__ () {return __get__ (this, function (self, index, value) {
				__call__ (print, 'setitem (', index, ')', value);
			});},
			get __getslice__ () {return __get__ (this, function (self, start, stop, step) {
				__call__ (print, 'getslice (', start, stop, step, ')');
			});},
			get __setslice__ () {return __get__ (this, function (self, start, stop, step, value) {
				__call__ (print, 'setslice (', start, stop, step, ')', value);
			});}
		});
		var __left0__ = __call__ (Test);
		var a = __left0__;
		var b = __left0__;
		var c = __left0__;
		var d = __left0__;
		var e = __left0__;
		var f = __left0__;
		var g = __left0__;
		var h = __left0__;
		var i = __left0__;
		var j = __left0__;
		var k = __left0__;
		var l = __left0__;
		a.__setitem__ ([[1, 2, 3], [4, 5, 6]], b.__getslice__ (7, 8, 9));
		c.__setslice__ (1, 2, 3, d.__getitem__ ([[4, 5, 6], [7, 8, 9]]));
		e.__setitem__ ([1, [1, 2, 3], 3], f.__getitem__ ([4, [4, 5, 6], 6]));
		__setitem__ (g, tuple ([1, 2, 3]), __getitem__ (h, tuple ([1, 2, 3])));
		__setitem__ (i, 1, __getitem__ (j, 1));
		k.__setslice__ (1, 2, 3, l.__getslice__ (1, 2, 3));
		__pragma__ ('<all>')
			__all__.Test = Test;
			__all__.a = a;
			__all__.b = b;
			__all__.c = c;
			__all__.d = d;
			__all__.e = e;
			__all__.f = f;
			__all__.g = g;
			__all__.h = h;
			__all__.i = i;
			__all__.j = j;
			__all__.k = k;
			__all__.l = l;
		__pragma__ ('</all>')
	}) ();
