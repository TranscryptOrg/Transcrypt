	__nest__ (
		__all__,
		'operator_overloading', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var Matrix = __class__ ('Matrix', [object], {
						get __init__ () {return __get__ (this, function (self, nRows, nCols, elements) {
							if (typeof elements == 'undefined' || (elements != null && elements .__class__ == __kwargdict__)) {;
								var elements = list ([]);
							};
							self.nRows = nRows;
							self.nCols = nCols;
							if (len (elements)) {
								self._ = elements;
							}
							else {
								self._ = function () {
									var __accu0__ = [];
									var __iter0__ = range (nRows);
									for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
										var row = __iter0__ [__index0__];
										__accu0__.append (function () {
											var __accu1__ = [];
											var __iter1__ = range (nCols);
											for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
												var col = __iter1__ [__index1__];
												__accu1__.append (0);
											}
											return __accu1__;
										} ());
									}
									return __accu0__;
								} ();
							}
						});},
						get __mul__ () {return __get__ (this, function (self, other) {
							if (type (other) == Matrix) {
								var result = Matrix (self.nRows, other.nCols);
								var __iter0__ = range (result.nRows);
								for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
									var iTargetRow = __iter0__ [__index0__];
									var __iter1__ = range (result.nCols);
									for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
										var iTargetCol = __iter1__ [__index1__];
										var __iter2__ = range (self.nCols);
										for (var __index2__ = 0; __index2__ < __iter2__.length; __index2__++) {
											var iTerm = __iter2__ [__index2__];
											result._ [iTargetRow] [iTargetCol] += self._ [iTargetRow] [iTerm] * other._ [iTerm] [iTargetCol];
										}
									}
								}
								return result;
							}
							else {
								return self.__rmul__ (other);
							}
						});},
						get __rmul__ () {return __get__ (this, function (self, scalar) {
							var result = Matrix (self.nRows, self.nCols);
							var __iter0__ = range (self.nRows);
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var iRow = __iter0__ [__index0__];
								var __iter1__ = range (self.nCols);
								for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
									var iCol = __iter1__ [__index1__];
									result._ [iRow] [iCol] = scalar * self._ [iRow] [iCol];
								}
							}
							return result;
						});},
						get __add__ () {return __get__ (this, function (self, other) {
							var result = Matrix (self.nRows, self.nCols);
							var __iter0__ = range (self.nRows);
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var iRow = __iter0__ [__index0__];
								var __iter1__ = range (self.nCols);
								for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
									var iCol = __iter1__ [__index1__];
									result._ [iRow] [iCol] = self._ [iRow] [iCol] + other._ [iRow] [iCol];
								}
							}
							return result;
						});},
						get __getitem__ () {return __get__ (this, function (self, index) {
							return self._ [index];
						});},
						get __setitem__ () {return __get__ (this, function (self, index, value) {
							self.elements_ [index] = value;
						});},
						get __repr__ () {return __get__ (this, function (self) {
							return repr (self._);
						});}
					});
					var run = function (autoTester) {
						var m0 = Matrix (3, 3, list ([list ([1, 2, 3]), list ([4, 5, 6]), list ([7, 8, 10])]));
						var m1 = Matrix (3, 3, list ([list ([10, 20, 30]), list ([40, 50, 60]), list ([70, 80, 90])]));
						var x = 3;
						var y = x * 4 * x;
						var fast = 2 * 3;
						;
						var slow = add (2, 3);
						var m2 = add (mul (m0, m1), mul (m1, add (m0, m1)));
						var m3 = mul (mul (2, add (mul (mul (mul (2, m0), 3), m1), mul (m2, 4))), 2);
						;
						var fast2 = 16 * y + 1;
						autoTester.check (m0, m1);
						autoTester.check (x, y);
						autoTester.check (m2);
						autoTester.check (m3);
						autoTester.check (fast, slow, fast2);
					};
					__pragma__ ('<all>')
						__all__.Matrix = Matrix;
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
