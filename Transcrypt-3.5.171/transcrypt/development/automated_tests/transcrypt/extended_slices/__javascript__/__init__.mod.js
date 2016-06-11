	__nest__ (
		__all__,
		'extended_slices', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var indices = function (key) {
						if (__envir__.executor_name == __envir__.transpiler_name) {
							return (type (key) == list ? tuple (key) : key);
						}
						else {
							try {
								return key.indices (1000000000);
							}
							catch (__except__) {
								try {
									return tuple (function () {
										var __accu0__ = [];
										var __iter0__ = key;
										for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
											var subkey = __iter0__ [__index0__];
											__accu0__.append (indices (subkey));
										}
										return __accu0__;
									} ());
								}
								catch (__except__) {
									return key;
								}
							}
						}
					};
					var Test = __class__ ('Test', [object], {
						get __init__ () {return __get__ (this, function (self, autoTester) {
							self.autoTester = autoTester;
						});},
						get __getitem__ () {return __get__ (this, function (self, key) {
							self.autoTester.check ('getitem (', indices (key), ')');
							return 1234567;
						});},
						get __setitem__ () {return __get__ (this, function (self, key, value) {
							self.autoTester.check ('setitem (', indices (key), ')', value);
						});}
					});
					var run = function (autoTester) {
						var __left0__ = Test (autoTester);
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
						a.__setitem__ ([tuple ([1, 2, 3]), tuple ([4, 5, 6])], __getslice__ (b, 7, 8, 9));
						__setslice__ (c, 1, 2, 3, d.__getitem__ ([tuple ([4, 5, 6]), tuple ([7, 8, 9])]));
						e.__setitem__ ([1, tuple ([1, 2, 3]), 3], f.__getitem__ ([4, tuple ([4, 5, 6]), 6]));
						g.__setitem__ ([1, 2, 3], h.__getitem__ ([1, 2, 3]));
						__setitem__ (i, 1, __getitem__ (j, 1));
						__setslice__ (k, 1, 2, 3, __getslice__ (l, 1, 2, 3));
					};
					__pragma__ ('<all>')
						__all__.Test = Test;
						__all__.indices = indices;
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
