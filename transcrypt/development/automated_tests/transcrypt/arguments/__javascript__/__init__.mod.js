	__nest__ (
		__all__,
		'py_arguments', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var A = __class__ ('A', [object], {
						get __init__ () {return __get__ (this, function (self, x, y) {
							if (typeof x == 'undefined' || (x != null && x .hasOwnProperty ("__kwargtrans__"))) {;
								var x = 123;
							};
							if (typeof y == 'undefined' || (y != null && y .hasOwnProperty ("__kwargtrans__"))) {;
								var y = 456;
							};
							var n = 456;
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
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
									delete kwargs.__kwargtrans__;
								}
								var args = tuple ([].slice.apply (arguments).slice (3, __ilastarg0__ + 1));
							}
							else {
								var args = tuple ();
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
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'autoTester': var autoTester = __allkwargs0__ [__attrib0__]; break;
										}
									}
								}
							}
							else {
							}
							autoTester.check (self.x, self.y, self.args, self.m, self.n, self.kwargs, self.extra);
						});}
					});
					var B = __class__ ('B', [A], {
						get __init__ () {return __get__ (this, function (self, x, y) {
							if (typeof y == 'undefined' || (y != null && y .hasOwnProperty ("__kwargtrans__"))) {;
								var y = -(1);
							};
							var m = -(2);
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
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
									delete kwargs.__kwargtrans__;
								}
								var args = tuple ([].slice.apply (arguments).slice (3, __ilastarg0__ + 1));
							}
							else {
								var args = tuple ();
							}
							A.__init__ (self, y, x, ...args, __kwargtrans__ (__merge__ ({m: n, n: m}, kwargs)));
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
							if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
								var __allkwargs0__ = arguments [__ilastarg0__--];
								for (var __attrib0__ in __allkwargs0__) {
									switch (__attrib0__) {
										case 'autoTester': var autoTester = __allkwargs0__ [__attrib0__]; break;
									}
								}
							}
						}
						else {
						}
						var f = function (x, y) {
							if (typeof y == 'undefined' || (y != null && y .hasOwnProperty ("__kwargtrans__"))) {;
								var y = -(1);
							};
							var m = -(2);
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'x': var x = __allkwargs0__ [__attrib0__]; break;
											case 'y': var y = __allkwargs0__ [__attrib0__]; break;
											case 'm': var m = __allkwargs0__ [__attrib0__]; break;
											case 'n': var n = __allkwargs0__ [__attrib0__]; break;
											default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
										}
									}
									delete kwargs.__kwargtrans__;
								}
								var args = tuple ([].slice.apply (arguments).slice (2, __ilastarg0__ + 1));
							}
							else {
								var args = tuple ();
							}
							autoTester.check ('#203', kwargs.__class__.__name__);
							autoTester.check ('#203', sorted (kwargs.py_keys ()));
							var f2 = function (x, y) {
								if (typeof y == 'undefined' || (y != null && y .hasOwnProperty ("__kwargtrans__"))) {;
									var y = -(3);
								};
								var m = -(4);
								var kwargs = dict ();
								if (arguments.length) {
									var __ilastarg0__ = arguments.length - 1;
									if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
										var __allkwargs0__ = arguments [__ilastarg0__--];
										for (var __attrib0__ in __allkwargs0__) {
											switch (__attrib0__) {
												case 'x': var x = __allkwargs0__ [__attrib0__]; break;
												case 'y': var y = __allkwargs0__ [__attrib0__]; break;
												case 'm': var m = __allkwargs0__ [__attrib0__]; break;
												case 'n': var n = __allkwargs0__ [__attrib0__]; break;
												default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
											}
										}
										delete kwargs.__kwargtrans__;
									}
									var args = tuple ([].slice.apply (arguments).slice (2, __ilastarg0__ + 1));
								}
								else {
									var args = tuple ();
								}
								autoTester.check (x, y, args, m, n, kwargs);
							};
							f2 (11, 22, 1010, 2020, __kwargtrans__ ({m: 100100, n: 200200, p: 10001000, q: 20002000}));
							autoTester.check (x, y, args, m, n, kwargs);
						};
						f (1, 2, 10, 20, __kwargtrans__ ({m: 100, n: 200, p: 1000, q: 2000}));
						var b = B (3, 4, 30, 40, __kwargtrans__ ({m: 300, n: 400, p: 3000, q: 4000}));
						b.f (autoTester);
						var g = function () {
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
							autoTester.check (args, kwargs);
						};
						g (...tuple ([1, 2, 3]), __kwargtrans__ (dict ({'p': 'aP', 'q': 'aQ', 'r': 'anR'})));
						(function __lambda__ (x, y) {
							if (typeof y == 'undefined' || (y != null && y .hasOwnProperty ("__kwargtrans__"))) {;
								var y = -(1);
							};
							var m = -(2);
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'x': var x = __allkwargs0__ [__attrib0__]; break;
											case 'y': var y = __allkwargs0__ [__attrib0__]; break;
											case 'm': var m = __allkwargs0__ [__attrib0__]; break;
											case 'n': var n = __allkwargs0__ [__attrib0__]; break;
											default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
										}
									}
									delete kwargs.__kwargtrans__;
								}
								var args = tuple ([].slice.apply (arguments).slice (2, __ilastarg0__ + 1));
							}
							else {
								var args = tuple ();
							}
							return autoTester.check (x, y, args, m, n, kwargs);
						}) (1, 2, 8, 16, __kwargtrans__ ({m: 128, n: 256.3, p: 1024.3, q: 2048.3}));
						autoTester.check (C ().tricky (...range (4)));
						autoTester.check ('{}-{}'.format (1, 3, 5, 7, 9));
						autoTester.check ('{}-{}'.format (...range (4)));
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
