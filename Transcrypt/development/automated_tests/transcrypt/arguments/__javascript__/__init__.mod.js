	__nest__ (
		__all__,
		'__$arguments__', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var A = __class__ ('A', [object], {
						get __init__ () {return __get__ (this, function (self, x, y) {
							if (typeof self == 'undefined') {;
								var self = 123;
							};
							if (typeof x == 'undefined') {;
								var x = 456;
							};
							var n = 456;
							var __args0__ = [].slice.apply (arguments);
							var __ilastarg0__ = __args0__.length - 1;
							if (type (__args0__ [__ilastarg0__]) == __kwargdict__) {
								var __allkwargs0__ = __args0__ [__ilastarg0__--];
								var kwargs = {};
								for (var __attrib0__ in __allkwargs0__) {
									switch (__attrib0__) {
										case 'self': var self = __allkwargs0__ [__attrib0__]; break;
										case 'x': var x = __allkwargs0__ [__attrib0__]; break;
										case 'y': var y = __allkwargs0__ [__attrib0__]; break;
										case 'm': var m = __allkwargs0__ [__attrib0__]; break;
										case 'n': var n = __allkwargs0__ [__attrib0__]; break;
										default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
									}
								}
								kwargs.__class__ = null;
							}
							var args = tuple (__args0__.slice (3, __ilastarg0__ + 1));
							self.x = x;
							self.y = y;
							self.args = args;
							self.m = m;
							self.n = n;
							self.kwargs = kwargs;
							self.extra = 'hello';
						});},
						get f () {return __get__ (this, function (self, autoTester) {
							autoTester.check (self.x, self.y, self.args, self.m, self.n, self.kwargs, self.extra);
						});}
					});
					var B = __class__ ('B', [A], {
						get __init__ () {return __get__ (this, function (self, x, y) {
							if (typeof self == 'undefined') {;
								var self = -1;
							};
							var m = -2;
							var __args0__ = [].slice.apply (arguments);
							var __ilastarg0__ = __args0__.length - 1;
							if (type (__args0__ [__ilastarg0__]) == __kwargdict__) {
								var __allkwargs0__ = __args0__ [__ilastarg0__--];
								var kwargs = {};
								for (var __attrib0__ in __allkwargs0__) {
									switch (__attrib0__) {
										case 'self': var self = __allkwargs0__ [__attrib0__]; break;
										case 'x': var x = __allkwargs0__ [__attrib0__]; break;
										case 'y': var y = __allkwargs0__ [__attrib0__]; break;
										case 'm': var m = __allkwargs0__ [__attrib0__]; break;
										case 'n': var n = __allkwargs0__ [__attrib0__]; break;
										default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
									}
								}
								kwargs.__class__ = null;
							}
							var args = tuple (__args0__.slice (3, __ilastarg0__ + 1));
							A.__init__.apply (null, [self].concat ([y]).concat ([x]).concat (args).concat ([__kwargdict__ (__merge__ ({m: n, n: m}, kwargs))]));
						});}
					});
					var run = function (autoTester) {
						var f = function (x, y) {
							if (typeof x == 'undefined') {;
								var x = -1;
							};
							var m = -2;
							var __args0__ = [].slice.apply (arguments);
							var __ilastarg0__ = __args0__.length - 1;
							if (type (__args0__ [__ilastarg0__]) == __kwargdict__) {
								var __allkwargs0__ = __args0__ [__ilastarg0__--];
								var kwargs = {};
								for (var __attrib0__ in __allkwargs0__) {
									switch (__attrib0__) {
										case 'x': var x = __allkwargs0__ [__attrib0__]; break;
										case 'y': var y = __allkwargs0__ [__attrib0__]; break;
										case 'm': var m = __allkwargs0__ [__attrib0__]; break;
										case 'n': var n = __allkwargs0__ [__attrib0__]; break;
										default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
									}
								}
								kwargs.__class__ = null;
							}
							var args = tuple (__args0__.slice (2, __ilastarg0__ + 1));
							autoTester.check (x, y, args, m, n, kwargs);
						};
						f (1, 2, 10, 20, __kwargdict__ ({m: 100, n: 200, p: 1000, q: 2000}));
						var b = B (3, 4, 30, 40, __kwargdict__ ({m: 300, n: 400, p: 3000, q: 4000}));
						b.f (autoTester);
						var g = function () {
							var __args0__ = [].slice.apply (arguments);
							var __ilastarg0__ = __args0__.length - 1;
							if (type (__args0__ [__ilastarg0__]) == __kwargdict__) {
								var __allkwargs0__ = __args0__ [__ilastarg0__--];
								var kwargs = {};
								for (var __attrib0__ in __allkwargs0__) {
									switch (__attrib0__) {
										default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
									}
								}
								kwargs.__class__ = null;
							}
							var args = tuple (__args0__.slice (0, __ilastarg0__ + 1));
							autoTester.check (args, kwargs);
						};
						g.apply (null, tuple ([1, 2, 3]).concat ([__kwargdict__ ({'p': 'aP', 'q': 'aQ', 'r': 'anR'})]));
					};
					//<all>
					__all__.A = A;
					__all__.B = B;
					__all__.run = run;
					//</all>
				}
			}
		}
	);
