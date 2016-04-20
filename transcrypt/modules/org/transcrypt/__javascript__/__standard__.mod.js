/* 000001 */ 	__nest__ (
/* 000001 */ 		__all__,
/* 000001 */ 		'org.transcrypt.__standard__', {
/* 000001 */ 			__all__: {
/* 000001 */ 				__inited__: false,
/* 000001 */ 				__init__: function (__all__) {
/* 000014 */ 					var Exception = __class__ ('Exception', [object], {
/* 000015 */ 						get __init__ () {return __get__ (this, function (self) {
/* 000015 */ 							var args = tuple ([].slice.apply (arguments).slice (1));
/* 000016 */ 							self.args = args;
/* 000016 */ 						});},
/* 000018 */ 						get __repr__ () {return __get__ (this, function (self) {
/* 000019 */ 							if (len (self.args)) {
/* 000020 */ 								return '{}{}'.format (self.__class__.__name__, repr (tuple (self.args)));
/* 000020 */ 							}
/* 000020 */ 							else {
/* 000022 */ 								return '???';
/* 000022 */ 							}
/* 000022 */ 						});},
/* 000024 */ 						get __str__ () {return __get__ (this, function (self) {
/* 000025 */ 							if (len (self.args) > 1) {
/* 000026 */ 								return str (tuple (self.args));
/* 000026 */ 							}
/* 000026 */ 							else {
/* 000027 */ 								if (len (self.args)) {
/* 000028 */ 									return str (self.args [0]);
/* 000028 */ 								}
/* 000028 */ 								else {
/* 000030 */ 									return '???';
/* 000030 */ 								}
/* 000030 */ 							}
/* 000030 */ 						});}
/* 000030 */ 					});
/* 000032 */ 					var ValueError = __class__ ('ValueError', [Exception], {
/* 000032 */ 					});
/* 000037 */ 					var __sort__ = function (iterable, key, reverse) {
/* 000037 */ 						if (typeof key == 'undefined' || (key != null && key .__class__ == __kwargdict__)) {;
/* 000037 */ 							var key = null;
/* 000037 */ 						};
/* 000037 */ 						if (typeof reverse == 'undefined' || (reverse != null && reverse .__class__ == __kwargdict__)) {;
/* 000037 */ 							var reverse = false;
/* 000037 */ 						};
/* 000037 */ 						if (arguments.length) {
/* 000037 */ 							var __ilastarg0__ = arguments.length - 1;
/* 000037 */ 							if (arguments [__ilastarg0__] && arguments [__ilastarg0__].__class__ == __kwargdict__) {
/* 000037 */ 								var __allkwargs0__ = arguments [__ilastarg0__--];
/* 000037 */ 								for (var __attrib0__ in __allkwargs0__) {
/* 000037 */ 									switch (__attrib0__) {
/* 000037 */ 										case 'iterable': var iterable = __allkwargs0__ [__attrib0__]; break;
/* 000037 */ 										case 'key': var key = __allkwargs0__ [__attrib0__]; break;
/* 000037 */ 										case 'reverse': var reverse = __allkwargs0__ [__attrib0__]; break;
/* 000037 */ 									}
/* 000037 */ 								}
/* 000037 */ 							}
/* 000037 */ 						}
/* 000038 */ 						if (key) {
/* 000039 */ 							iterable.sort ((function __lambda__ (a, b) {
/* 000039 */ 								if (arguments.length) {
/* 000039 */ 									var __ilastarg0__ = arguments.length - 1;
/* 000039 */ 									if (arguments [__ilastarg0__] && arguments [__ilastarg0__].__class__ == __kwargdict__) {
/* 000039 */ 										var __allkwargs0__ = arguments [__ilastarg0__--];
/* 000039 */ 										for (var __attrib0__ in __allkwargs0__) {
/* 000039 */ 											switch (__attrib0__) {
/* 000039 */ 												case 'a': var a = __allkwargs0__ [__attrib0__]; break;
/* 000039 */ 												case 'b': var b = __allkwargs0__ [__attrib0__]; break;
/* 000039 */ 											}
/* 000039 */ 										}
/* 000039 */ 									}
/* 000039 */ 								}
/* 000039 */ 								return key (a) > key (b);}));
/* 000039 */ 						}
/* 000039 */ 						else {
/* 000041 */ 							iterable.sort ();
/* 000041 */ 						}
/* 000043 */ 						if (reverse) {
/* 000044 */ 							iterable.reverse ();
/* 000044 */ 						}
/* 000044 */ 					};
/* 000046 */ 					var sorted = function (iterable, key, reverse) {
/* 000046 */ 						if (typeof key == 'undefined' || (key != null && key .__class__ == __kwargdict__)) {;
/* 000046 */ 							var key = null;
/* 000046 */ 						};
/* 000046 */ 						if (typeof reverse == 'undefined' || (reverse != null && reverse .__class__ == __kwargdict__)) {;
/* 000046 */ 							var reverse = false;
/* 000046 */ 						};
/* 000046 */ 						if (arguments.length) {
/* 000046 */ 							var __ilastarg0__ = arguments.length - 1;
/* 000046 */ 							if (arguments [__ilastarg0__] && arguments [__ilastarg0__].__class__ == __kwargdict__) {
/* 000046 */ 								var __allkwargs0__ = arguments [__ilastarg0__--];
/* 000046 */ 								for (var __attrib0__ in __allkwargs0__) {
/* 000046 */ 									switch (__attrib0__) {
/* 000046 */ 										case 'iterable': var iterable = __allkwargs0__ [__attrib0__]; break;
/* 000046 */ 										case 'key': var key = __allkwargs0__ [__attrib0__]; break;
/* 000046 */ 										case 'reverse': var reverse = __allkwargs0__ [__attrib0__]; break;
/* 000046 */ 									}
/* 000046 */ 								}
/* 000046 */ 							}
/* 000046 */ 						}
/* 000047 */ 						if (type (iterable) == dict) {
/* 000048 */ 							var result = copy (iterable.py_keys ());
/* 000048 */ 						}
/* 000048 */ 						else {
/* 000050 */ 							var result = copy (iterable);
/* 000050 */ 						}
/* 000052 */ 						__sort__ (result, key, reverse);
/* 000053 */ 						return result;
/* 000053 */ 					};
/* 000053 */ 					__pragma__ ('<all>')
/* 000053 */ 						__all__.Exception = Exception;
/* 000053 */ 						__all__.ValueError = ValueError;
/* 000053 */ 						__all__.__sort__ = __sort__;
/* 000053 */ 						__all__.sorted = sorted;
/* 000053 */ 					__pragma__ ('</all>')
/* 000053 */ 				}
/* 000053 */ 			}
/* 000053 */ 		}
/* 000053 */ 	);
/* 000053 */ 