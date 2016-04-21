	__nest__ (
		__all__,
		'py_arguments', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var A = __class__ ('A', [object], {
						get __init__ () {return __get__ (this, function (self, x, y) {
							if (typeof x == 'undefined' || (x != null && x .__class__ == __kwargdict__)) {;
								var x = 123;
							};
							if (typeof y == 'undefined' || (y != null && y .__class__ == __kwargdict__)) {;
								var y = 456;
							};
							var n = 456;
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].__class__ == __kwargdict__) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
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
								var args = tuple ([].slice.apply (arguments).slice (3, __ilastarg0__ + 1));
							}
							self.x = x;
							self.y = y;
							self.args = args;
							self.m = m;
							self.n = n;
							self.kwargs = kwargs;
							self.extra = 'hello';
						});},
						get f () {return __get__ (this, function (self, autoTester) {
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].__class__ == __kwargdict__) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'autoTester': var autoTester = __allkwargs0__ [__attrib0__]; break;
										}
									}
								}
							}
							autoTester.check (self.x, self.y, self.args, self.m, self.n, self.kwargs, self.extra);
						});}
					});
					var B = __class__ ('B', [A], {
						get __init__ () {return __get__ (this, function (self, x, y) {
							if (typeof y == 'undefined' || (y != null && y .__class__ == __kwargdict__)) {;
								var y = -(1);
							};
							var m = -(2);
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].__class__ == __kwargdict__) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
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
								var args = tuple ([].slice.apply (arguments).slice (3, __ilastarg0__ + 1));
							}
							A.__init__.apply (null, [self].concat ([y]).concat ([x]).concat (args).concat ([__kwargdict__ (__merge__ ({m: n, n: m}, kwargs))]));
						});}
					});
					var C = __class__ ('C', [object], {
						get tricky () {return __get__ (this, function (self) {
							var args = tuple ([].slice.apply (arguments).slice (1));
							return args;
						});}
					});
					var run = function (autoTester) {
						if (arguments.length) {
							var __ilastarg0__ = arguments.length - 1;
							if (arguments [__ilastarg0__] && arguments [__ilastarg0__].__class__ == __kwargdict__) {
								var __allkwargs0__ = arguments [__ilastarg0__--];
								for (var __attrib0__ in __allkwargs0__) {
									switch (__attrib0__) {
										case 'autoTester': var autoTester = __allkwargs0__ [__attrib0__]; break;
									}
								}
							}
						}
						var f = function (x, y) {
							if (typeof y == 'undefined' || (y != null && y .__class__ == __kwargdict__)) {;
								var y = -(1);
							};
							var m = -(2);
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].__class__ == __kwargdict__) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
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
								var args = tuple ([].slice.apply (arguments).slice (2, __ilastarg0__ + 1));
							}
							var f2 = function (x, y) {
								if (typeof y == 'undefined' || (y != null && y .__class__ == __kwargdict__)) {;
									var y = -(3);
								};
								var m = -(4);
								if (arguments.length) {
									var __ilastarg0__ = arguments.length - 1;
									if (arguments [__ilastarg0__] && arguments [__ilastarg0__].__class__ == __kwargdict__) {
										var __allkwargs0__ = arguments [__ilastarg0__--];
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
									var args = tuple ([].slice.apply (arguments).slice (2, __ilastarg0__ + 1));
								}
								autoTester.check (x, y, args, m, n, kwargs);
							};
							f2 (11, 22, 1010, 2020, __kwargdict__ ({m: 100100, n: 200200, p: 10001000, q: 20002000}));
							autoTester.check (x, y, args, m, n, kwargs);
						};
						f (1, 2, 10, 20, __kwargdict__ ({m: 100, n: 200, p: 1000, q: 2000}));
						var b = B (3, 4, 30, 40, __kwargdict__ ({m: 300, n: 400, p: 3000, q: 4000}));
						b.f (autoTester);
						var g = function () {
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].__class__ == __kwargdict__) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									var kwargs = {};
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
										}
									}
									kwargs.__class__ = null;
								}
								var args = tuple ([].slice.apply (arguments).slice (0, __ilastarg0__ + 1));
							}
							autoTester.check (args, kwargs);
						};
						g.apply (null, tuple ([1, 2, 3]).concat ([__kwargdict__ (dict ({'p': 'aP', 'q': 'aQ', 'r': 'anR'}))]));
						(function __lambda__ (x, y) {
							if (typeof y == 'undefined' || (y != null && y .__class__ == __kwargdict__)) {;
								var y = -(1);
							};
							var m = -(2);
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].__class__ == __kwargdict__) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
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
								var args = tuple ([].slice.apply (arguments).slice (2, __ilastarg0__ + 1));
							}
							return autoTester.check (x, y, args, m, n, kwargs);}) (1, 2, 8, 16, __kwargdict__ ({m: 128, n: 256.3, p: 1024.3, q: 2048.3}));
						autoTester.check (C ().tricky.apply (null, range (4)));
						autoTester.check ('{}-{}'.format (1, 3, 5, 7, 9));
						autoTester.check ('{}-{}'.format.apply (null, range (4)));
					};
					__pragma__ ('<all>')
						__all__.A = A;
						__all__.B = B;
						__all__.C = C;
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
