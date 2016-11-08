	__nest__ (
		__all__,
		'div_fixes', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var aB = __init__ (__world__.div_fixes.issue55).aB;
					var anA = __init__ (__world__.div_fixes.issue55).anA;
					var f1 = __init__ (__world__.div_fixes.issue55).f1;
					var p = __init__ (__world__.div_fixes.issue55).p;
					var q = __init__ (__world__.div_fixes.issue55).q;
					var r = __init__ (__world__.div_fixes.issue55).r;
					var y = __init__ (__world__.div_fixes.issue55).y;
					var run = function (autoTester) {
						autoTester.check ('Issue 24');
						var py_switch = false;
						autoTester.check (py_switch);
						autoTester.check ('Issue 27');
						autoTester.check (list (['zero', 'one', 'two', 'three', 'four']).index ('three'));
						autoTester.check ('Issue 36');
						var results = list ([]);
						for (var i = 0; i < 10; i++) {
							results.append ((function __lambda__ (j) {
								return (function __lambda__ () {
									return j;
								});
							}) (i));
						}
						autoTester.check (function () {
							var __accu0__ = [];
							var __iterable0__ = results;
							for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
								var result = __iterable0__ [__index0__];
								__accu0__.append (result ());
							}
							return __accu0__;
						} ());
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
						aDict.clear ();
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
						var aList = list ([4, 5, 6]);
						__call__ (autoTester.check, autoTester, __add__ (__add__ (list ([1, 2, 3]), aList), list ([4, 5, 6])));
						__call__ (autoTester.check, autoTester, __mul__ (3, list ([1, 2, 3])));
						__call__ (autoTester.check, autoTester, __mul__ (list ([1, 2, 3]), 3));
						var aString = 'Crocodile';
						__call__ (autoTester.check, autoTester, __add__ (__add__ ('Tiger', aString), 'Elephant'));
						__call__ (autoTester.check, autoTester, __mul__ (3, aString));
						__call__ (autoTester.check, autoTester, __mul__ (aString, 3));
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
								var x = list ([null, null]);
							}
							x [0] = 3;
							x [1] = 2;
							var __iterable0__ = x;
							for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
								var i = __iterable0__ [__index0__];
								autoTester.check (i);
							}
							if (__in__ ('__esv6__', __symbols__)) {
								var y = 3;
								var __iterable0__ = y;
								for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
									var j = __iterable0__ [__index0__];
									autoTester.check (j);
								}
							}
						}
						catch (__except0__) {
							// pass;
						}
						if (__in__ ('__esv6__', __symbols__)) {
							autoTester.check ('Issue 122');
							var chunks = function* (aList, chunkLength) {
								var __iterable0__ = range (0, len (aList), chunkLength);
								for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
									var index = __iterable0__ [__index0__];
									yield aList.__getslice__ (index, index + chunkLength, 1);
								}
							};
							var __iterable0__ = chunks (function () {
								var __accu0__ = [];
								for (var index = 0; index < 26; index++) {
									__accu0__.append (chr (index + 97));
								}
								return __accu0__;
							} (), 10);
							for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
								var chunk = __iterable0__ [__index0__];
								autoTester.check (chunk);
							}
						}
						autoTester.check ('Issue 123');
						autoTester.check (__mod__ (10, 3), __mod__ (10, -(3)), __mod__ (-(10), 3), __mod__ (-(10), -(3)), __mod__ (10, 10), __mod__ (10, -(10)), __mod__ (-(10), 10), __mod__ (-(10), -(10)));
						autoTester.check ('Issue 125');
						var abc = 'abc';
						var __iterable0__ = abc;
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
							var index = __iterable0__ [__index0__];
							autoTester.check (abc);
						}
						autoTester.check ('Issue 127');
						autoTester.check (dict ({'include_docs': 'true', 'keys': list (['key1', 'key2']), 'limit': 50}));
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
						autoTester.check (aDict.get ('a', 'noApe'), aDict.get ('b'), aDict.get ('c', 'noCarot'), aDict.get ('d'));
						autoTester.check ('Issue 144');
						var aList = function () {
							var __accu0__ = [];
							var __iterable0__ = list ([1, 2, 3]);
							for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
								var x = __getitem__ (__iterable0__, __index0__);
								__call__ (__accu0__.append, __accu0__, x);
							}
							return __accu0__;
						} ();
						__call__ (autoTester.check, autoTester, aList);
						autoTester.check ('<br><br>Issue 145<br>');
						var SortTest = __class__ ('SortTest', [object], {
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
										word += self.alphabet [__mod__ (self.pseudoRandom, 26)];
									}
									return word;
								};
								self.rows = function () {
									var __accu0__ = [];
									for (var iRow = 0; iRow < self.nRows; iRow++) {
										__accu0__.append (function () {
											var __accu1__ = [];
											for (var iCol = 0; iCol < self.nCols; iCol++) {
												__accu1__.append (randomWord ());
											}
											return __accu1__;
										} ());
									}
									return __accu0__;
								} ();
							});},
							get py_sort () {return __get__ (this, function (self) {
								var __iterable0__ = py_reversed (range (self.nCols));
								for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
									var iCol = __iterable0__ [__index0__];
									self.rows.py_sort (__kwargdict__ ({key: (function __lambda__ (row) {
										return row [iCol];
									})}));
								}
							});}
						});
						var sortTest = SortTest ();
						autoTester.check ('<br>Unsorted:<br>');
						var __iterable0__ = sortTest.rows;
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
							var row = __iterable0__ [__index0__];
							autoTester.check ('{}<br>'.format (','.join (function () {
								var __accu0__ = [];
								var __iterable1__ = row;
								for (var __index1__ = 0; __index1__ < __iterable1__.length; __index1__++) {
									var word = __iterable1__ [__index1__];
									__accu0__.append (word);
								}
								return __accu0__;
							} ())));
						}
						sortTest.py_sort ();
						autoTester.check ('<br>Sorted:<br>');
						var __iterable0__ = sortTest.rows;
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
							var row = __iterable0__ [__index0__];
							autoTester.check ('{}<br>'.format (','.join (function () {
								var __accu0__ = [];
								var __iterable1__ = row;
								for (var __index1__ = 0; __index1__ < __iterable1__.length; __index1__++) {
									var word = __iterable1__ [__index1__];
									__accu0__.append (word);
								}
								return __accu0__;
							} ())));
						}
					};
					__pragma__ ('<use>' +
						'div_fixes.issue55' +
					'</use>')
					__pragma__ ('<all>')
						__all__.aB = aB;
						__all__.anA = anA;
						__all__.f1 = f1;
						__all__.p = p;
						__all__.q = q;
						__all__.r = r;
						__all__.run = run;
						__all__.y = y;
					__pragma__ ('</all>')
				}
			}
		}
	);
