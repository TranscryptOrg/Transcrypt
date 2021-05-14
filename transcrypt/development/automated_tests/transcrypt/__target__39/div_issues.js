// Transcrypt'ed from Python, 2021-05-14 15:01:25
var re = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as __module_re__ from './re.js';
__nest__ (re, '', __module_re__);
import {run559} from './div_issues.issue559.js';
import {run387} from './div_issues.issue387.js';
import {aB, anA, f1, p, q, r, y} from './div_issues.issue55.js';
export {q, y, f1, r, aB, run387, anA, p, run559};
var __all__ = dict ({get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get run () {return run;}, set run (value) {run = value;}});
var __name__ = 'div_issues';
export var run = function (autoTester) {
	autoTester.check ('Issue 24');
	var py_switch = false;
	autoTester.check (py_switch);
	autoTester.check ('Issue 27');
	autoTester.check (['zero', 'one', 'two', 'three', 'four'].index ('three'));
	autoTester.check ('Issue 36');
	var results = [];
	for (var i = 0; i < 10; i++) {
		results.append ((function __lambda__ (j) {
			return (function __lambda__ () {
				return j;
			});
		}) (i));
	}
	autoTester.check ((function () {
		var __accu0__ = [];
		for (var result of results) {
			__accu0__.append (result ());
		}
		return __accu0__;
	}) ());
	autoTester.check ('Issue 37');
	autoTester.check (Math.floor (15 / 7));
	autoTester.check ('Issue 40');
	autoTester.check (65 / (5 * 2));
	autoTester.check ('Issue 50');
	autoTester.check ((Math.floor (((240 + 30) - 1) / 30)) * 30);
	autoTester.check ('Issue 51');
	var a = 1;
	var b = 1;
	autoTester.check (a, b, new set ([a, b]) == new set ([1, 2]));
	autoTester.check ('Issue 52');
	var __left0__ = tuple (['switch', 'case', 'default']);
	var py_switch = __left0__ [0];
	var py_case = __left0__ [1];
	var py_default = __left0__ [2];
	autoTester.check (py_switch, py_case, py_default);
	autoTester.check ('Issue 54');
	var aDict = dict ({1: 11, 2: 22, 3: 33});
	autoTester.check (aDict);
	aDict.py_clear ();
	autoTester.check (aDict);
	autoTester.check ('Issue 60');
	var three = 3;
	var one = three & 1;
	var seven = three | 4;
	var eight = one << 3;
	var four = eight >> 1;
	var aTrue = bool (three & one);
	var aFalse = bool (three & four);
	autoTester.check (3, three, 1, one, 7, seven, 8, eight, 4, four, true, aTrue, false, aFalse);
	autoTester.check ('Issue 65');
	var aList = [4, 5, 6];
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __add__ (__add__ ([1, 2, 3], aList), [4, 5, 6]));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __mul__ (3, [1, 2, 3]));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __mul__ ([1, 2, 3], 3));
	}) ();
	var aString = 'Crocodile';
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __add__ (__add__ ('Tiger', aString), 'Elephant'));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __mul__ (3, aString));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __mul__ (aString, 3));
	}) ();
	autoTester.check ('Issue 76');
	var initially17 = 17;
	autoTester.check (initially17);
	var initially17 = Math.floor (initially17 / 2);
	autoTester.check (initially17);
	var initially17 = Math.floor (initially17 / 2);
	autoTester.check (initially17);
	autoTester.check ('Issue 112');
	try {
		if (__envir__.executor_name == __envir__.transpiler_name) {
			var x = new Int8Array (2);
		}
		else {
			var x = [null, null];
		}
		for (var i of x) {
			autoTester.check (i);
		}
		var y = 3;
		for (var j of y) {
			autoTester.check (j);
		}
	}
	catch (__except0__) {
		// pass;
	}
	autoTester.check ('Issue 122');
	var chunks = function* (aList, chunkLength) {
		for (var index of range (0, len (aList), chunkLength)) {
			yield aList.__getslice__ (index, index + chunkLength, 1);
		}
		};
	for (var chunk of chunks ((function () {
		var __accu0__ = [];
		for (var index = 0; index < 26; index++) {
			__accu0__.append (chr (index + 97));
		}
		return __accu0__;
	}) (), 10)) {
		autoTester.check (chunk);
	}
	autoTester.check ('Issue 123');
	autoTester.check (__mod__ (10, 3), __mod__ (10, -(3)), __mod__ (-(10), 3), __mod__ (-(10), -(3)), __mod__ (10, 10), __mod__ (10, -(10)), __mod__ (-(10), 10), __mod__ (-(10), -(10)));
	autoTester.check ('Issue 125');
	var abc = 'abc';
	for (var index of abc) {
		autoTester.check (abc);
	}
	autoTester.check ('Issue 127');
	autoTester.check (dict ({'include_docs': 'true', 'keys': ['key1', 'key2'], 'limit': 50}));
	autoTester.check ('Issue 134');
	var __left0__ = tuple ([5, 12, -(5), -(5), 0, 0]);
	var x0 = __left0__ [0];
	var x1 = __left0__ [1];
	var x2 = __left0__ [2];
	var x3 = __left0__ [3];
	var x4 = __left0__ [4];
	var x5 = __left0__ [5];
	var x0 = __mod__ (x0, 10);
	var x1 = __mod__ (x1, 5);
	var x2 = __mod__ (x2, 2);
	var x3 = __mod__ (x3, -(3));
	var x4 = __mod__ (x4, 1);
	var x5 = __mod__ (x5, -(1000));
	autoTester.check (x0, x1, x2, x3, x4);
	autoTester.check ('Issue 136');
	var aDict = dict ({'a': 'ape', 'b': 'banana'});
	autoTester.check (aDict.py_get ('a', 'noApe'), aDict.py_get ('b'), aDict.py_get ('c', 'noCarot'), aDict.py_get ('d'));
	autoTester.check ('Issue 144');
	var aList = (function () {
		var __accu0__ = [];
		var __iterable0__ = [1, 2, 3];
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var x = ;
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, x);
			}) ();
		}
		return __accu0__;
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, aList);
	}) ();
	autoTester.check ('<br><br>Issue 145<br>');
	var SortTest = __class__ ('SortTest', [object], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self) {
			self.alphabet = 'abcdefghijklmnopqrstuvwxyz';
			self.nChars = 10;
			self.nCols = 10;
			self.nRows = 30;
			self.pseudoRandom = 0;
			var randomWord = function () {
				var word = '';
				for (var iChar = 0; iChar < self.nChars; iChar++) {
					self.pseudoRandom = __mod__ (81212 * self.pseudoRandom + 28411, 134456);
					word += ;
				}
				return word;
			};
			self.rows = (function () {
				var __accu0__ = [];
				for (var iRow = 0; iRow < self.nRows; iRow++) {
					__accu0__.append ((function () {
						var __accu1__ = [];
						for (var iCol = 0; iCol < self.nCols; iCol++) {
							__accu1__.append (randomWord ());
						}
						return __accu1__;
					}) ());
				}
				return __accu0__;
			}) ();
		});},
		get py_sort () {return __get__ (this, function (self) {
			for (var iCol of py_reversed (range (self.nCols))) {
				self.rows.py_sort (__kwargtrans__ ({key: (function __lambda__ (row) {
					return ;
				})}));
			}
		});}
	});
	var sortTest = SortTest ();
	autoTester.check ('<br>Unsorted:<br>');
	for (var row of sortTest.rows) {
		autoTester.check ('{}<br>'.format (','.join ((function () {
			var __accu0__ = [];
			for (var word of row) {
				__accu0__.append (word);
			}
			return __accu0__;
		}) ())));
	}
	sortTest.py_sort ();
	autoTester.check ('<br>Sorted:<br>');
	for (var row of sortTest.rows) {
		autoTester.check ('{}<br>'.format (','.join ((function () {
			var __accu0__ = [];
			for (var word of row) {
				__accu0__.append (word);
			}
			return __accu0__;
		}) ())));
	}
	autoTester.check ('<br><br>Issue 148<br>');
	var aDict = dict ({'items': [4, 5, 6]});
	for (var [aKey, aValue] of aDict.py_items ()) {
		autoTester.check ('{}: {}'.format (aKey, aValue));
	}
	autoTester.check ('<br><br>Issue 169<br>');
	autoTester.check (int (1 / float ('inf')), int (1 / float ('-inf')));
	autoTester.check ('<br><br>Issue 178<br>');
	var bitmaps = [tuple ([2, '']), tuple ([4, '']), tuple ([8, 'i']), tuple ([16, 'm']), tuple ([32, 'y']), tuple ([64, 'u']), tuple ([128, 'g'])];
	for (var flags of tuple ([122, 233, 11, 55, 79, 201, 23, 111, 200, 100, 50, 25, 12, 6])) {
		autoTester.check (''.join ((function () {
			var __accu0__ = [];
			for (var x of bitmaps) {
				if (( & flags) > 0) {
					__accu0__.append ();
				}
			}
			return __accu0__;
		}) ()));
	}
	var issue256 = function () {
		autoTester.check ('Issue 256');
		var C = __class__ ('C', [object], {
			__module__: __name__,
			get __init__ () {return __get__ (this, function (self, value) {
				self.value = value;
			});}
		});
		var f1 = function (value) {
			return (C (value).value || 'second').capitalize () == 'First';
		};
		var f2 = function (value) {
			return (C (value).value || 'second').capitalize () == 'Second';
		};
		var f3 = function (value) {
			return C (value).value || 'second';
		};
		var f4 = function (value) {
			return C (value).value || 'second';
		};
		autoTester.check (f1 ('first'));
		autoTester.check (f1 (''));
		autoTester.check (f2 ('first'));
		autoTester.check (f2 (''));
		autoTester.check (f3 ('first'));
		autoTester.check (f4 (''));
	};
	issue256 ();
	autoTester.check ('Issue 274');
	var a = 3;
	autoTester.check ('Still alive');
	autoTester.check ('Issue 276');
	var a = 2;
	var b = Math.pow (a, 3);
	var a = Math.pow (a, 4);
	autoTester.check (a, b);
	autoTester.check ('Issue 277');
	var py_new = 3;
	autoTester.check (py_new);
	autoTester.check ('Issue 279');
	var A = __class__ ('A', [object], {
		__module__: __name__,
		py_TypeError: 111,
		TypeError: 222
	});
	autoTester.check (A.py_TypeError, A.TypeError);
	autoTester.check ('Still alive');
	autoTester.check ('Issue 301');
	var filter_word = function (word0, word1) {
		if (len (word0) != len (word1)) {
			return false;
		}
		for (var [char0, char1] of zip (word0, word1)) {
			if (char0 != '_' && char0 != char1) {
				return false;
			}
		}
		return true;
	};
	autoTester.check (filter_word ('bee', 'beer'));
	autoTester.check (filter_word ('wine', 'wine'));
	autoTester.check (filter_word ('win_', 'wind'));
	autoTester.check (filter_word ('_in_', 'kind'));
	autoTester.check (filter_word ('min_', 'kind'));
	autoTester.check ('Issue 306');
	var dict_306 = dict ({'Abraham': 'Lincoln', 'Barack': "O'Bama", 'Thomas': 'Jefferson'});
	var results = [];
	try {
		while (true) {
			results.append (dict_306.py_popitem ());
		}
	}
	catch (__except0__) {
		if (isinstance (__except0__, Exception)) {
			var exception = __except0__;
			autoTester.check (sorted (results));
			autoTester.check ("That's it");
		}
		else {
			throw __except0__;
		}
	}
	autoTester.check ('Issue 314');
	try {
		autoTester.check (int (float (123)));
	}
	catch (__except0__) {
		autoTester.check ('a');
	}
	try {
		autoTester.check (float (12.3));
	}
	catch (__except0__) {
		autoTester.check ('b');
	}
	try {
		autoTester.check (int (float ('123')));
	}
	catch (__except0__) {
		autoTester.check ('c');
	}
	try {
		autoTester.check (int (float (' 123')));
	}
	catch (__except0__) {
		autoTester.check ('d');
	}
	try {
		autoTester.check (float (''));
	}
	catch (__except0__) {
		autoTester.check ('e');
	}
	try {
		autoTester.check (float (' '));
	}
	catch (__except0__) {
		autoTester.check ('f');
	}
	try {
		autoTester.check (float ('drie'));
	}
	catch (__except0__) {
		autoTester.check ('g');
	}
	autoTester.check ('Issue 316');
	autoTester.check (list (filter (null, [[1, 2], [3], [], [4, 5], [6]])));
	autoTester.check (list (filter ((function __lambda__ (l) {
		return len (l) >= 2;
	}), [[1, 2], [3], [], [4, 5], [6]])));
	autoTester.check ('Issue 317');
	var mylist = [];
	try {
		mylist.remove ('value');
	}
	catch (__except0__) {
		if (isinstance (__except0__, ValueError)) {
			var exception = __except0__;
			autoTester.check (exception.__class__.__name__);
		}
		else {
			throw __except0__;
		}
	}
	autoTester.check ('Issue 331');
	autoTester.check (max (-(5), 4, 1, 2, -(3), 2));
	autoTester.check (max ([-(5), 4, 1, 2, -(3), 2]));
	autoTester.check (max (tuple ([5, 6, 2, -(2), -(4)])));
	autoTester.check (min (-(5), 4, 1, 2, -(3), 2));
	autoTester.check (min ([-(5), 4, 1, 2, -(3), 2]));
	autoTester.check (min (tuple ([5, 6, 2, -(2), -(4)])));
	autoTester.check ('issue 356');
	try {
		var __except0__ = py_TypeError ('How are you?');
		__except0__.__cause__ = null;
		throw __except0__;
	}
	catch (__except0__) {
		if (isinstance (__except0__, py_TypeError)) {
			var exception = __except0__;
			autoTester.check (exception);
		}
		else {
			throw __except0__;
		}
	}
	autoTester.check ('Issue 369');
	var Vector = __class__ ('Vector', [object], {
		__module__: __name__,
		get __init__ () {return __get__ (this, function (self) {
			var py_values = tuple ([].slice.apply (arguments).slice (1));
			self.py_values = py_values;
		});},
		get __iter__ () {return __get__ (this, function* (self) {
			for (var item of self.py_values) {
				yield item;
			}
			});},
		[Symbol.iterator] () {return this.__iter__ ()},
		get __add__ () {return __get__ (this, function (self, other) {
			return Vector (...(function () {
				var __accu0__ = [];
				for (var [x, y] of zip (self, other)) {
					__accu0__.append (x + y);
				}
				return py_iter (__accu0__);
			}) ());
		});},
		get __str__ () {return __get__ (this, function (self) {
			return str (list (self.py_values));
		});}
	});
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (str, null, __add__ (__call__ (Vector, null, 1, 2, 3), __call__ (Vector, null, 3, 4, 5))));
	}) ();
	autoTester.check ('Issue 387');
	run387 (autoTester);
	autoTester.check ('Issue 391');
	autoTester.check (int (false));
	autoTester.check (int (true));
	autoTester.check (int (1 == 2));
	autoTester.check (int (1 != 2));
	autoTester.check ('Issue 392');
	var Example = __class__ ('Example', [object], {
		__module__: __name__,
		d: dict ({'A': 1, 'B': 2}),
		rec: re.compile ('(?P<decimal>\\d+)', re.ASCII),
		get run () {return __get__ (this, function (self) {
			var match = self.rec.match ('42');
			if (!(match)) {
				print ('ERROR: RE does not match');
			}
			var e = match.groupdict ();
			autoTester.check ('before: self.d=', self.d);
			autoTester.check ('before: e=', e);
			self.d.py_update (e);
			autoTester.check ('after: self.d=', self.d);
		});}
	});
	var example = Example ();
	example.run ();
	autoTester.check ('Issue 398');
	var Test398 = __class__ ('Test398', [object], {
		__module__: __name__,
	});
	var test398 = Test398 ();
	autoTester.check ('Issue 399');
	try {
		var surpressWarning = ;
		var surpressWarning = ;
		autoTester.check ('no problem');
	}
	catch (__except0__) {
		if (isinstance (__except0__, KeyError)) {
			autoTester.check ('not found');
		}
		else {
			throw __except0__;
		}
	}
	autoTester.check ('Issue 413');
	var Foo = __class__ ('Foo', [object], {
		__module__: __name__,
		get __len__ () {return __get__ (this, function (self) {
			return 3;
		});},
		get __getitem__ () {return __get__ (this, function (self, i) {
			if (i >= 3) {
				var __except0__ = IndexError;
				__except0__.__cause__ = null;
				throw __except0__;
			}
			return 'This is item ' + str (i);
		});}
	});
	var foo = Foo ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, 'Attempt 1:');
	}) ();
	var __iterable0__ = foo;
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var i = ;
		(function () {
			var __accu0__ = autoTester;
			return __call__ (__accu0__.check, __accu0__, i);
		}) ();
	}
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, 'Attempt 2:');
	}) ();
	for (var i = 0; i < __call__ (len, null, foo); i++) {
		(function () {
			var __accu0__ = autoTester;
			return __call__ (__accu0__.check, __accu0__, );
		}) ();
	}
	autoTester.check ('Issue 414');
	var Foo = __class__ ('Foo', [object], {
		__module__: __name__,
	});
	var foo = Foo ();
	foo.bar = 'baz';
	foo.py_name = 'hello';
	foo.py_default = 'world';
	autoTester.check ((function () {
		var __accu0__ = [];
		for (var x of dir (foo)) {
			if (!(x.startswith ('__'))) {
				__accu0__.append (x);
			}
		}
		return __accu0__;
	}) ());
	var foo = function () {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (0, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		var py_default = kwargs.py_get ('default', 'bar');
		return py_default;
	};
	autoTester.check (foo ());
	autoTester.check (foo (__kwargtrans__ ({py_default: 'Hello World'})));
	autoTester.check ('Issue 460');
	var s460 = 'car';
	var l460 = [11, 22, 33];
	var t460 = tuple ([4, 5, 6]);
	var d460 = dict ([[-(1), 'mmminusOne'], ['b', 'bbbike']]);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, , , , , , );
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, , , , , , );
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, , , , , , );
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, , );
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, , , , , , );
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, , , , , , );
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, , , , , , );
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, , );
	}) ();
	try {
		autoTester.check (, );
	}
	catch (__except0__) {
		autoTester.check (111);
	}
	try {
		autoTester.check (, );
	}
	catch (__except0__) {
		autoTester.check (222);
	}
	var a = [1, 2, 3];
	var b = [4, 5, 6];
	var c = '1,2,34,5,6';
	if (__envir__.executor_name == __envir__.transpiler_name) {
		autoTester.check (a + b);
		(function () {
			var __accu0__ = autoTester;
			return __call__ (__accu0__.check, __accu0__, __add__ (a, b));
		}) ();
		autoTester.check (a + b);
	}
	else {
		autoTester.check (c);
		(function () {
			var __accu0__ = autoTester;
			return __call__ (__accu0__.check, __accu0__, __add__ (a, b));
		}) ();
		autoTester.check (c);
	}
	if (__eq__ (__envir__.executor_name, __envir__.transpiler_name)) {
		autoTester.check (a + b);
		(function () {
			var __accu0__ = autoTester;
			return __call__ (__accu0__.check, __accu0__, __add__ (a, b));
		}) ();
		autoTester.check (a + b);
	}
	else {
		autoTester.check (c);
		(function () {
			var __accu0__ = autoTester;
			return __call__ (__accu0__.check, __accu0__, __add__ (a, b));
		}) ();
		autoTester.check (c);
	}
	autoTester.check ('Issue 494');
	var a = 1;
	autoTester.check ('a={}'.format (a));
	var a = null;
	autoTester.check ('a={}'.format (a));
	autoTester.check ('Issue 515');
	autoTester.check ('a: {}; b: {}'.format (null, 1));
	autoTester.check ('a: {}; b: {}'.format (1, null));
	autoTester.check ('a: {0}; b: {1}'.format (1, null));
	autoTester.check ('a: {0}; b: {1}'.format (1, []));
	autoTester.check ('a: {}; b: {}'.format (1, []));
	autoTester.check ('a: {0}; b: {1}'.format (1, dict ({})));
	autoTester.check ('a: {}; b: {}'.format (1, dict ({})));
	autoTester.check ('a: {0}; b: {1}'.format (1, 0));
	autoTester.check ('a: {}; b: {}'.format (1, 0));
	autoTester.check ('Issue 559');
	run559 (autoTester);
};

//# sourceMappingURL=div_issues.map