"use strict";
// Transcrypt'ed from Python, 2018-01-27 15:42:42
function pystone () {
    var __symbols__ = ['__py3.6__', '__esv5__'];
    var __all__ = {};
    var __world__ = __all__;
    var __nest__ = function (headObject, tailNames, value) {
        var current = headObject;
        if (tailNames != '') {
            var tailChain = tailNames.split ('.');
            var firstNewIndex = tailChain.length;
            for (var index = 0; index < tailChain.length; index++) {
                if (!current.hasOwnProperty (tailChain [index])) {
                    firstNewIndex = index;
                    break;
                }
                current = current [tailChain [index]];
            }
            for (var index = firstNewIndex; index < tailChain.length; index++) {
                current [tailChain [index]] = {};
                current = current [tailChain [index]];
            }
        }
        for (var attrib in value) {
            current [attrib] = value [attrib];
        }
    };
    __all__.__nest__ = __nest__;
    var __init__ = function (module) {
        if (!module.__inited__) {
            module.__all__.__init__ (module.__all__);
            module.__inited__ = true;
        }
        return module.__all__;
    };
    __all__.__init__ = __init__;
    var __get__ = function (self, func, quotedFuncName) {
        if (self) {
            if (self.hasOwnProperty ('__class__') || typeof self == 'string' || self instanceof String) {
                if (quotedFuncName) {
                    Object.defineProperty (self, quotedFuncName, {
                        value: function () {
                            var args = [] .slice.apply (arguments);
                            return func.apply (null, [self] .concat (args));
                        },
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });
                }
                return function () {
                    var args = [] .slice.apply (arguments);
                    return func.apply (null, [self] .concat (args));
                };
            }
            else {
                return func;
            }
        }
        else {
            return func;
        }
    }
    __all__.__get__ = __get__;
    var __getcm__ = function (self, func, quotedFuncName) {
        if (self.hasOwnProperty ('__class__')) {
            return function () {
                var args = [] .slice.apply (arguments);
                return func.apply (null, [self.__class__] .concat (args));
            };
        }
        else {
            return function () {
                var args = [] .slice.apply (arguments);
                return func.apply (null, [self] .concat (args));
            };
        }
    }
    __all__.__getcm__ = __getcm__;
    var __getsm__ = function (self, func, quotedFuncName) {
        return func;
    }
    __all__.__getsm__ = __getsm__;
    var py_metatype = {
        __name__: 'type',
        __bases__: [],
        __new__: function (meta, name, bases, attribs) {
            var cls = function () {
                var args = [] .slice.apply (arguments);
                return cls.__new__ (args);
            };
            for (var index = bases.length - 1; index >= 0; index--) {
                var base = bases [index];
                for (var attrib in base) {
                    var descrip = Object.getOwnPropertyDescriptor (base, attrib);
                    Object.defineProperty (cls, attrib, descrip);
                }
            }
            cls.__metaclass__ = meta;
            cls.__name__ = name.startsWith ('py_') ? name.slice (3) : name;
            cls.__bases__ = bases;
            for (var attrib in attribs) {
                var descrip = Object.getOwnPropertyDescriptor (attribs, attrib);
                Object.defineProperty (cls, attrib, descrip);
            }
            return cls;
        }
    };
    py_metatype.__metaclass__ = py_metatype;
    __all__.py_metatype = py_metatype;
    var object = {
        __init__: function (self) {},
        __metaclass__: py_metatype,
        __name__: 'object',
        __bases__: [],
        __new__: function (args) {
            var instance = Object.create (this, {__class__: {value: this, enumerable: true}});
            this.__init__.apply (null, [instance] .concat (args));
            return instance;
        }
    };
    __all__.object = object;
    var __class__ = function (name, bases, attribs, meta) {
        if (meta == undefined) {
            meta = bases [0] .__metaclass__;
        }
        return meta.__new__ (meta, name, bases, attribs);
    }
    __all__.__class__ = __class__;
    var __pragma__ = function () {};
    __all__.__pragma__ = __pragma__;
	__nest__ (
		__all__,
		'org.transcrypt.__base__', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __name__ = 'org.transcrypt.__base__';
					var __Envir__ = __class__ ('__Envir__', [object], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self) {
							self.interpreter_name = 'python';
							self.transpiler_name = 'transcrypt';
							self.transpiler_version = '3.6.85';
							self.target_subdir = '__javascript__';
						});}
					});
					var __envir__ = __Envir__ ();
					__pragma__ ('<all>')
						__all__.__Envir__ = __Envir__;
						__all__.__envir__ = __envir__;
						__all__.__name__ = __name__;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		'org.transcrypt.__standard__', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __name__ = 'org.transcrypt.__standard__';
					var Exception = __class__ ('Exception', [object], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self) {
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
										}
									}
									delete kwargs.__kwargtrans__;
								}
								var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
							}
							else {
								var args = tuple ();
							}
							self.__args__ = args;
							try {
								self.stack = kwargs.error.stack;
							}
							catch (__except0__) {
								self.stack = 'No stack trace available';
							}
						});},
						get __repr__ () {return __get__ (this, function (self) {
							if (len (self.__args__)) {
								return '{}{}'.format (self.__class__.__name__, repr (tuple (self.__args__)));
							}
							else {
								return '{}()'.format (self.__class__.__name__);
							}
						});},
						get __str__ () {return __get__ (this, function (self) {
							if (len (self.__args__) > 1) {
								return str (tuple (self.__args__));
							}
							else if (len (self.__args__)) {
								return str (self.__args__ [0]);
							}
							else {
								return '';
							}
						});}
					});
					var IterableError = __class__ ('IterableError', [Exception], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, error) {
							Exception.__init__ (self, "Can't iterate over non-iterable", __kwargtrans__ ({error: error}));
						});}
					});
					var StopIteration = __class__ ('StopIteration', [Exception], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, error) {
							Exception.__init__ (self, 'Iterator exhausted', __kwargtrans__ ({error: error}));
						});}
					});
					var ValueError = __class__ ('ValueError', [Exception], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, message, error) {
							Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
						});}
					});
					var KeyError = __class__ ('KeyError', [Exception], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, message, error) {
							Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
						});}
					});
					var AssertionError = __class__ ('AssertionError', [Exception], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, message, error) {
							if (message) {
								Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
							}
							else {
								Exception.__init__ (self, __kwargtrans__ ({error: error}));
							}
						});}
					});
					var NotImplementedError = __class__ ('NotImplementedError', [Exception], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, message, error) {
							Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
						});}
					});
					var IndexError = __class__ ('IndexError', [Exception], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, message, error) {
							Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
						});}
					});
					var AttributeError = __class__ ('AttributeError', [Exception], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, message, error) {
							Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
						});}
					});
					var py_TypeError = __class__ ('py_TypeError', [Exception], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, message, error) {
							Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
						});}
					});
					var Warning = __class__ ('Warning', [Exception], {
						__module__: __name__,
					});
					var UserWarning = __class__ ('UserWarning', [Warning], {
						__module__: __name__,
					});
					var DeprecationWarning = __class__ ('DeprecationWarning', [Warning], {
						__module__: __name__,
					});
					var RuntimeWarning = __class__ ('RuntimeWarning', [Warning], {
						__module__: __name__,
					});
					var __sort__ = function (iterable, key, reverse) {
						if (typeof key == 'undefined' || (key != null && key .hasOwnProperty ("__kwargtrans__"))) {;
							var key = null;
						};
						if (typeof reverse == 'undefined' || (reverse != null && reverse .hasOwnProperty ("__kwargtrans__"))) {;
							var reverse = false;
						};
						if (arguments.length) {
							var __ilastarg0__ = arguments.length - 1;
							if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
								var __allkwargs0__ = arguments [__ilastarg0__--];
								for (var __attrib0__ in __allkwargs0__) {
									switch (__attrib0__) {
										case 'iterable': var iterable = __allkwargs0__ [__attrib0__]; break;
										case 'key': var key = __allkwargs0__ [__attrib0__]; break;
										case 'reverse': var reverse = __allkwargs0__ [__attrib0__]; break;
									}
								}
							}
						}
						else {
						}
						if (key) {
							iterable.sort ((function __lambda__ (a, b) {
								if (arguments.length) {
									var __ilastarg0__ = arguments.length - 1;
									if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
										var __allkwargs0__ = arguments [__ilastarg0__--];
										for (var __attrib0__ in __allkwargs0__) {
											switch (__attrib0__) {
												case 'a': var a = __allkwargs0__ [__attrib0__]; break;
												case 'b': var b = __allkwargs0__ [__attrib0__]; break;
											}
										}
									}
								}
								else {
								}
								return (key (a) > key (b) ? 1 : -(1));
							}));
						}
						else {
							iterable.sort ();
						}
						if (reverse) {
							iterable.reverse ();
						}
					};
					var sorted = function (iterable, key, reverse) {
						if (typeof key == 'undefined' || (key != null && key .hasOwnProperty ("__kwargtrans__"))) {;
							var key = null;
						};
						if (typeof reverse == 'undefined' || (reverse != null && reverse .hasOwnProperty ("__kwargtrans__"))) {;
							var reverse = false;
						};
						if (arguments.length) {
							var __ilastarg0__ = arguments.length - 1;
							if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
								var __allkwargs0__ = arguments [__ilastarg0__--];
								for (var __attrib0__ in __allkwargs0__) {
									switch (__attrib0__) {
										case 'iterable': var iterable = __allkwargs0__ [__attrib0__]; break;
										case 'key': var key = __allkwargs0__ [__attrib0__]; break;
										case 'reverse': var reverse = __allkwargs0__ [__attrib0__]; break;
									}
								}
							}
						}
						else {
						}
						if (py_typeof (iterable) == dict) {
							var result = copy (iterable.py_keys ());
						}
						else {
							var result = copy (iterable);
						}
						__sort__ (result, key, reverse);
						return result;
					};
					var map = function (func, iterable) {
						return (function () {
							var __accu0__ = [];
							var __iterable0__ = iterable;
							for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
								var item = __iterable0__ [__index0__];
								__accu0__.append (func (item));
							}
							return __accu0__;
						}) ();
					};
					var filter = function (func, iterable) {
						if (func == null) {
							var func = bool;
						}
						return (function () {
							var __accu0__ = [];
							var __iterable0__ = iterable;
							for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
								var item = __iterable0__ [__index0__];
								if (func (item)) {
									__accu0__.append (item);
								}
							}
							return __accu0__;
						}) ();
					};
					var __Terminal__ = __class__ ('__Terminal__', [object], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self) {
							self.buffer = '';
							try {
								self.element = document.getElementById ('__terminal__');
							}
							catch (__except0__) {
								self.element = null;
							}
							if (self.element) {
								self.element.style.overflowX = 'auto';
								self.element.style.boxSizing = 'border-box';
								self.element.style.padding = '5px';
								self.element.innerHTML = '_';
							}
						});},
						get print () {return __get__ (this, function (self) {
							var sep = ' ';
							var end = '\n';
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'sep': var sep = __allkwargs0__ [__attrib0__]; break;
											case 'end': var end = __allkwargs0__ [__attrib0__]; break;
										}
									}
								}
								var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
							}
							else {
								var args = tuple ();
							}
							self.buffer = '{}{}{}'.format (self.buffer, sep.join ((function () {
								var __accu0__ = [];
								var __iterable0__ = args;
								for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
									var arg = __iterable0__ [__index0__];
									__accu0__.append (str (arg));
								}
								return __accu0__;
							}) ()), end).__getslice__ (-(4096), null, 1);
							if (self.element) {
								self.element.innerHTML = self.buffer.py_replace ('\n', '<br>').py_replace (' ', '&nbsp');
								self.element.scrollTop = self.element.scrollHeight;
							}
							else {
								console.log (sep.join ((function () {
									var __accu0__ = [];
									var __iterable0__ = args;
									for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
										var arg = __iterable0__ [__index0__];
										__accu0__.append (str (arg));
									}
									return __accu0__;
								}) ()));
							}
						});},
						get input () {return __get__ (this, function (self, question) {
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'question': var question = __allkwargs0__ [__attrib0__]; break;
										}
									}
								}
							}
							else {
							}
							self.print ('{}'.format (question), __kwargtrans__ ({end: ''}));
							var answer = window.prompt ('\n'.join (self.buffer.py_split ('\n').__getslice__ (-(16), null, 1)));
							self.print (answer);
							return answer;
						});}
					});
					var __terminal__ = __Terminal__ ();
					__pragma__ ('<all>')
						__all__.AssertionError = AssertionError;
						__all__.AttributeError = AttributeError;
						__all__.DeprecationWarning = DeprecationWarning;
						__all__.Exception = Exception;
						__all__.IndexError = IndexError;
						__all__.IterableError = IterableError;
						__all__.KeyError = KeyError;
						__all__.NotImplementedError = NotImplementedError;
						__all__.RuntimeWarning = RuntimeWarning;
						__all__.StopIteration = StopIteration;
						__all__.py_TypeError = py_TypeError;
						__all__.UserWarning = UserWarning;
						__all__.ValueError = ValueError;
						__all__.Warning = Warning;
						__all__.__Terminal__ = __Terminal__;
						__all__.__name__ = __name__;
						__all__.__sort__ = __sort__;
						__all__.__terminal__ = __terminal__;
						__all__.filter = filter;
						__all__.map = map;
						__all__.sorted = sorted;
					__pragma__ ('</all>')
				}
			}
		}
	);
    var __call__ = function (/* <callee>, <this>, <params>* */) {
        var args = [] .slice.apply (arguments);
        if (typeof args [0] == 'object' && '__call__' in args [0]) {
            return args [0] .__call__ .apply (args [1], args.slice (2));
        }
        else {
            return args [0] .apply (args [1], args.slice (2));
        }
    };
    __all__.__call__ = __call__;
    __nest__ (__all__, '', __init__ (__all__.org.transcrypt.__base__));
    var __envir__ = __all__.__envir__;
    __nest__ (__all__, '', __init__ (__all__.org.transcrypt.__standard__));
    var Exception = __all__.Exception;
    var IterableError = __all__.IterableError;
    var StopIteration = __all__.StopIteration;
    var ValueError = __all__.ValueError;
    var KeyError = __all__.KeyError;
    var AssertionError = __all__.AssertionError;
    var NotImplementedError = __all__.NotImplementedError;
    var IndexError = __all__.IndexError;
    var AttributeError = __all__.AttributeError;
    var py_TypeError = __all__.py_TypeError;
    var Warning = __all__.Warning;
    var UserWarning = __all__.UserWarning;
    var DeprecationWarning = __all__.DeprecationWarning;
    var RuntimeWarning = __all__.RuntimeWarning;
    var __sort__ = __all__.__sort__;
    var sorted = __all__.sorted;
    var map = __all__.map;
    var filter = __all__.filter;
    __all__.print = __all__.__terminal__.print;
    __all__.input = __all__.__terminal__.input;
    var __terminal__ = __all__.__terminal__;
    var print = __all__.print;
    var input = __all__.input;
    __envir__.executor_name = __envir__.transpiler_name;
    var __main__ = {__file__: ''};
    __all__.main = __main__;
    var __except__ = null;
    __all__.__except__ = __except__;
    var __kwargtrans__ = function (anObject) {
        anObject.__kwargtrans__ = null;
        anObject.constructor = Object;
        return anObject;
    }
    __all__.__kwargtrans__ = __kwargtrans__;
    var __globals__ = function (anObject) {
        if (isinstance (anObject, dict)) {
            return anObject;
        }
        else {
            return dict (anObject)
        }
    }
    __all__.__globals__ = __globals__
    var __super__ = function (aClass, methodName) {
        for (var index = 0; index < aClass.__bases__.length; index++) {
            var base = aClass.__bases__ [index];
            if (methodName in base) {
               return base [methodName];
            }
        }
        throw new Exception ('Superclass method not found');
    }
    __all__.__super__ = __super__
    var property = function (getter, setter) {
        if (!setter) {
            setter = function () {};
        }
        return {get: function () {return getter (this)}, set: function (value) {setter (this, value)}, enumerable: true};
    }
    __all__.property = property;
    var __setProperty__ = function (anObject, name, descriptor) {
        if (!anObject.hasOwnProperty (name)) {
            Object.defineProperty (anObject, name, descriptor);
        }
    }
    __all__.__setProperty__ = __setProperty__
    function assert (condition, message) {
        if (!condition) {
            throw AssertionError (message, new Error ());
        }
    }
    __all__.assert = assert;
    var __merge__ = function (object0, object1) {
        var result = {};
        for (var attrib in object0) {
            result [attrib] = object0 [attrib];
        }
        for (var attrib in object1) {
            result [attrib] = object1 [attrib];
        }
        return result;
    };
    __all__.__merge__ = __merge__;
    var dir = function (obj) {
        var aList = [];
        for (var aKey in obj) {
            aList.push (aKey.startsWith ('py_') ? aKey.slice (3) : aKey);
        }
        aList.sort ();
        return aList;
    };
    __all__.dir = dir;
    var setattr = function (obj, name, value) {
        obj [name] = value;
    };
    __all__.setattr = setattr;
    var getattr = function (obj, name) {
        return name in obj ? obj [name] : obj ['py_' + name];
    };
    __all__.getattr= getattr;
    var hasattr = function (obj, name) {
        try {
            return name in obj || 'py_' + name in obj;
        }
        catch (exception) {
            return false;
        }
    };
    __all__.hasattr = hasattr;
    var delattr = function (obj, name) {
        if (name in obj) {
            delete obj [name];
        }
        else {
            delete obj ['py_' + name];
        }
    };
    __all__.delattr = (delattr);
    var __in__ = function (element, container) {
        if (py_typeof (container) == dict) {
            return container.hasOwnProperty (element);
        }
        else {
            return (
                container.indexOf ?
                container.indexOf (element) > -1 :
                container.hasOwnProperty (element)
            );
        }
    };
    __all__.__in__ = __in__;
    var __specialattrib__ = function (attrib) {
        return (attrib.startswith ('__') && attrib.endswith ('__')) || attrib == 'constructor' || attrib.startswith ('py_');
    };
    __all__.__specialattrib__ = __specialattrib__;
    var len = function (anObject) {
        if (anObject === undefined || anObject === null) {
            return 0;
        }
        if (anObject.__len__ instanceof Function) {
            return anObject.__len__ ();
        }
        if (anObject.length !== undefined) {
            return anObject.length;
        }
        var length = 0;
        for (var attr in anObject) {
            if (!__specialattrib__ (attr)) {
                length++;
            }
        }
        return length;
    };
    __all__.len = len;
    function __i__ (any) {
        return py_typeof (any) == dict ? any.py_keys () : any;
    }
    function __k__ (keyed, key) {
        var result = keyed [key];
        if (typeof result == 'undefined') {
             throw KeyError (key, new Error());
        }
        return result;
    }
    function __t__ (target) {
        return (
            target === undefined || target === null ? false :
            ['boolean', 'number'] .indexOf (typeof target) >= 0 ? target :
            target.__bool__ instanceof Function ? (target.__bool__ () ? target : false) :
            target.__len__ instanceof Function ?  (target.__len__ () !== 0 ? target : false) :
            target instanceof Function ? target :
            len (target) !== 0 ? target :
            false
        );
    }
    __all__.__t__ = __t__;
    var bool = function (any) {
        return !!__t__ (any);
    };
    bool.__name__ = 'bool';
    __all__.bool = bool;
    var float = function (any) {
        if (any == 'inf') {
            return Infinity;
        }
        else if (any == '-inf') {
            return -Infinity;
        }
        else if (isNaN (parseFloat (any))) {
            if (any === false) {
                return 0;
            }
            else if (any === true) {
                return 1;
            }
            else {
                throw ValueError ("could not convert string to float: '" + str(any) + "'", new Error ());
            }
        }
        else {
            return +any;
        }
    };
    float.__name__ = 'float';
    __all__.float = float;
    var int = function (any) {
        return float (any) | 0
    };
    int.__name__ = 'int';
    __all__.int = int;
    var py_typeof = function (anObject) {
        var aType = typeof anObject;
        if (aType == 'object') {
            try {
                return anObject.__class__;
            }
            catch (exception) {
                return aType;
            }
        }
        else {
            return (
                aType == 'boolean' ? bool :
                aType == 'string' ? str :
                aType == 'number' ? (anObject % 1 == 0 ? int : float) :
                null
            );
        }
    };
    __all__.py_typeof = py_typeof;
    var issubclass = function (aClass, classinfo) {
        function isA (queryClass) {
            if (queryClass == classinfo) {
                return true;
            }
            for (var index = 0; index < queryClass.__bases__.length; index++) {
                if (isA (queryClass.__bases__ [index], classinfo)) {
                    return true;
                }
            }
            return false;
        };
        if (classinfo instanceof Array) {
            for (var index = 0; index < classinfo.length; index++) {
                var aClass2 = classinfo [index];
                if (issubclass (aClass, aClass2)) {
                    return true;
                }
            }
            return false;
        }
        try {
            return isA (aClass);
        }
        catch (exception) {
            return aClass == classinfo || classinfo == object || (aClass == bool && classinfo == int);
        }
    };
    __all__.issubclass = issubclass;
    var isinstance = function (anObject, classinfo) {
        try {
            return '__class__' in anObject ? issubclass (anObject.__class__, classinfo) : issubclass (py_typeof (anObject), classinfo);
        }
        catch (exception) {
            return issubclass (py_typeof (anObject), classinfo);
        }
    };
    __all__.isinstance = isinstance;
    var callable = function (anObject) {
        return anObject && typeof anObject == 'object' && '__call__' in anObject ? true : typeof anObject === 'function';
    };
    __all__.callable = callable;
    var repr = function (anObject) {
        try {
            return anObject.__repr__ ();
        }
        catch (exception) {
            try {
                return anObject.__str__ ();
            }
            catch (exception) {
                try {
                    if (anObject == null) {
                        return 'None';
                    }
                    else if (anObject.constructor == Object) {
                        var result = '{';
                        var comma = false;
                        for (var attrib in anObject) {
                            if (!__specialattrib__ (attrib)) {
                                if (attrib.isnumeric ()) {
                                    var attribRepr = attrib;
                                }
                                else {
                                    var attribRepr = '\'' + attrib + '\'';
                                }
                                if (comma) {
                                    result += ', ';
                                }
                                else {
                                    comma = true;
                                }
                                result += attribRepr + ': ' + repr (anObject [attrib]);
                            }
                        }
                        result += '}';
                        return result;
                    }
                    else {
                        return typeof anObject == 'boolean' ? anObject.toString () .capitalize () : anObject.toString ();
                    }
                }
                catch (exception) {
                    return '<object of type: ' + typeof anObject + '>';
                }
            }
        }
    };
    __all__.repr = repr;
    var chr = function (charCode) {
        return String.fromCharCode (charCode);
    };
    __all__.chr = chr;
    var ord = function (aChar) {
        return aChar.charCodeAt (0);
    };
    __all__.ord = ord;
    var max = function (nrOrSeq) {
        return arguments.length == 1 ? Math.max.apply (null, nrOrSeq) : Math.max.apply (null, arguments);
    };
    __all__.max = max;
    var min = function (nrOrSeq) {
        return arguments.length == 1 ? Math.min.apply (null, nrOrSeq) : Math.min.apply (null, arguments);
    };
    __all__.min = min;
    var abs = Math.abs;
    __all__.abs = abs;
    var round = function (number, ndigits) {
        if (ndigits) {
            var scale = Math.pow (10, ndigits);
            number *= scale;
        }
        var rounded = Math.round (number);
        if (rounded - number == 0.5 && rounded % 2) {
            rounded -= 1;
        }
        if (ndigits) {
            rounded /= scale;
        }
        return rounded;
    };
    __all__.round = round;
    function __jsUsePyNext__ () {
        try {
            var result = this.__next__ ();
            return {value: result, done: false};
        }
        catch (exception) {
            return {value: undefined, done: true};
        }
    }
    function __pyUseJsNext__ () {
        var result = this.next ();
        if (result.done) {
            throw StopIteration (new Error ());
        }
        else {
            return result.value;
        }
    }
    function py_iter (iterable) {
        if (typeof iterable == 'string' || '__iter__' in iterable) {
            var result = iterable.__iter__ ();
            result.next = __jsUsePyNext__;
        }
        else if ('selector' in iterable) {
            var result = list (iterable) .__iter__ ();
            result.next = __jsUsePyNext__;
        }
        else if ('next' in iterable) {
            var result = iterable
            if (! ('__next__' in result)) {
                result.__next__ = __pyUseJsNext__;
            }
        }
        else if (Symbol.iterator in iterable) {
            var result = iterable [Symbol.iterator] ();
            result.__next__ = __pyUseJsNext__;
        }
        else {
            throw IterableError (new Error ());
        }
        result [Symbol.iterator] = function () {return result;};
        return result;
    }
    function py_next (iterator) {
        try {
            var result = iterator.__next__ ();
        }
        catch (exception) {
            var result = iterator.next ();
            if (result.done) {
                throw StopIteration (new Error ());
            }
            else {
                return result.value;
            }
        }
        if (result == undefined) {
            throw StopIteration (new Error ());
        }
        else {
            return result;
        }
    }
    function __PyIterator__ (iterable) {
        this.iterable = iterable;
        this.index = 0;
    }
    __PyIterator__.prototype.__next__ = function () {
        if (this.index < this.iterable.length) {
            return this.iterable [this.index++];
        }
        else {
            throw StopIteration (new Error ());
        }
    };
    function __JsIterator__ (iterable) {
        this.iterable = iterable;
        this.index = 0;
    }
    __JsIterator__.prototype.next = function () {
        if (this.index < this.iterable.py_keys.length) {
            return {value: this.index++, done: false};
        }
        else {
            return {value: undefined, done: true};
        }
    };
    var py_reversed = function (iterable) {
        iterable = iterable.slice ();
        iterable.reverse ();
        return iterable;
    };
    __all__.py_reversed = py_reversed;
    var zip = function () {
        var args = [] .slice.call (arguments);
        for (var i = 0; i < args.length; i++) {
            if (typeof args [i] == 'string') {
                args [i] = args [i] .split ('');
            }
            else if (!Array.isArray (args [i])) {
                args [i] = Array.from (args [i]);
            }
        }
        var shortest = args.length == 0 ? [] : args.reduce (
            function (array0, array1) {
                return array0.length < array1.length ? array0 : array1;
            }
        );
        return shortest.map (
            function (current, index) {
                return args.map (
                    function (current) {
                        return current [index];
                    }
                );
            }
        );
    };
    __all__.zip = zip;
    function range (start, stop, step) {
        if (stop == undefined) {
            stop = start;
            start = 0;
        }
        if (step == undefined) {
            step = 1;
        }
        if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
            return [];
        }
        var result = [];
        for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
            result.push(i);
        }
        return result;
    };
    __all__.range = range;
    function any (iterable) {
        for (var index = 0; index < iterable.length; index++) {
            if (bool (iterable [index])) {
                return true;
            }
        }
        return false;
    }
    function all (iterable) {
        for (var index = 0; index < iterable.length; index++) {
            if (! bool (iterable [index])) {
                return false;
            }
        }
        return true;
    }
    function sum (iterable) {
        var result = 0;
        for (var index = 0; index < iterable.length; index++) {
            result += iterable [index];
        }
        return result;
    }
    __all__.any = any;
    __all__.all = all;
    __all__.sum = sum;
    function enumerate (iterable) {
        return zip (range (len (iterable)), iterable);
    }
    __all__.enumerate = enumerate;
    function copy (anObject) {
        if (anObject == null || typeof anObject == "object") {
            return anObject;
        }
        else {
            var result = {};
            for (var attrib in obj) {
                if (anObject.hasOwnProperty (attrib)) {
                    result [attrib] = anObject [attrib];
                }
            }
            return result;
        }
    }
    __all__.copy = copy;
    function deepcopy (anObject) {
        if (anObject == null || typeof anObject == "object") {
            return anObject;
        }
        else {
            var result = {};
            for (var attrib in obj) {
                if (anObject.hasOwnProperty (attrib)) {
                    result [attrib] = deepcopy (anObject [attrib]);
                }
            }
            return result;
        }
    }
    __all__.deepcopy = deepcopy;
    function list (iterable) {
        var instance = iterable ? [] .slice.apply (iterable) : [];
        return instance;
    }
    __all__.list = list;
    Array.prototype.__class__ = list;
    list.__name__ = 'list';
    Array.prototype.__iter__ = function () {return new __PyIterator__ (this);};
    Array.prototype.__getslice__ = function (start, stop, step) {
        if (start < 0) {
            start = this.length + start;
        }
        if (stop == null) {
            stop = this.length;
        }
        else if (stop < 0) {
            stop = this.length + stop;
        }
        else if (stop > this.length) {
            stop = this.length;
        }
        var result = list ([]);
        for (var index = start; index < stop; index += step) {
            result.push (this [index]);
        }
        return result;
    };
    Array.prototype.__setslice__ = function (start, stop, step, source) {
        if (start < 0) {
            start = this.length + start;
        }
        if (stop == null) {
            stop = this.length;
        }
        else if (stop < 0) {
            stop = this.length + stop;
        }
        if (step == null) {
            Array.prototype.splice.apply (this, [start, stop - start] .concat (source));
        }
        else {
            var sourceIndex = 0;
            for (var targetIndex = start; targetIndex < stop; targetIndex += step) {
                this [targetIndex] = source [sourceIndex++];
            }
        }
    };
    Array.prototype.__repr__ = function () {
        if (this.__class__ == set && !this.length) {
            return 'set()';
        }
        var result = !this.__class__ || this.__class__ == list ? '[' : this.__class__ == tuple ? '(' : '{';
        for (var index = 0; index < this.length; index++) {
            if (index) {
                result += ', ';
            }
            result += repr (this [index]);
        }
        if (this.__class__ == tuple && this.length == 1) {
            result += ',';
        }
        result += !this.__class__ || this.__class__ == list ? ']' : this.__class__ == tuple ? ')' : '}';;
        return result;
    };
    Array.prototype.__str__ = Array.prototype.__repr__;
    Array.prototype.append = function (element) {
        this.push (element);
    };
    Array.prototype.py_clear = function () {
        this.length = 0;
    };
    Array.prototype.extend = function (aList) {
        this.push.apply (this, aList);
    };
    Array.prototype.insert = function (index, element) {
        this.splice (index, 0, element);
    };
    Array.prototype.remove = function (element) {
        var index = this.indexOf (element);
        if (index == -1) {
            throw ValueError ("list.remove(x): x not in list", new Error ());
        }
        this.splice (index, 1);
    };
    Array.prototype.index = function (element) {
        return this.indexOf (element);
    };
    Array.prototype.py_pop = function (index) {
        if (index == undefined) {
            return this.pop ();
        }
        else {
            return this.splice (index, 1) [0];
        }
    };
    Array.prototype.py_sort = function () {
        __sort__.apply  (null, [this].concat ([] .slice.apply (arguments)));
    };
    Array.prototype.__add__ = function (aList) {
        return list (this.concat (aList));
    };
    Array.prototype.__mul__ = function (scalar) {
        var result = this;
        for (var i = 1; i < scalar; i++) {
            result = result.concat (this);
        }
        return result;
    };
    Array.prototype.__rmul__ = Array.prototype.__mul__;
    function tuple (iterable) {
        var instance = iterable ? [] .slice.apply (iterable) : [];
        instance.__class__ = tuple;
        return instance;
    }
    __all__.tuple = tuple;
    tuple.__name__ = 'tuple';
    function set (iterable) {
        var instance = [];
        if (iterable) {
            for (var index = 0; index < iterable.length; index++) {
                instance.add (iterable [index]);
            }
        }
        instance.__class__ = set;
        return instance;
    }
    __all__.set = set;
    set.__name__ = 'set';
    Array.prototype.__bindexOf__ = function (element) {
        element += '';
        var mindex = 0;
        var maxdex = this.length - 1;
        while (mindex <= maxdex) {
            var index = (mindex + maxdex) / 2 | 0;
            var middle = this [index] + '';
            if (middle < element) {
                mindex = index + 1;
            }
            else if (middle > element) {
                maxdex = index - 1;
            }
            else {
                return index;
            }
        }
        return -1;
    };
    Array.prototype.add = function (element) {
        if (this.indexOf (element) == -1) {
            this.push (element);
        }
    };
    Array.prototype.discard = function (element) {
        var index = this.indexOf (element);
        if (index != -1) {
            this.splice (index, 1);
        }
    };
    Array.prototype.isdisjoint = function (other) {
        this.sort ();
        for (var i = 0; i < other.length; i++) {
            if (this.__bindexOf__ (other [i]) != -1) {
                return false;
            }
        }
        return true;
    };
    Array.prototype.issuperset = function (other) {
        this.sort ();
        for (var i = 0; i < other.length; i++) {
            if (this.__bindexOf__ (other [i]) == -1) {
                return false;
            }
        }
        return true;
    };
    Array.prototype.issubset = function (other) {
        return set (other.slice ()) .issuperset (this);
    };
    Array.prototype.union = function (other) {
        var result = set (this.slice () .sort ());
        for (var i = 0; i < other.length; i++) {
            if (result.__bindexOf__ (other [i]) == -1) {
                result.push (other [i]);
            }
        }
        return result;
    };
    Array.prototype.intersection = function (other) {
        this.sort ();
        var result = set ();
        for (var i = 0; i < other.length; i++) {
            if (this.__bindexOf__ (other [i]) != -1) {
                result.push (other [i]);
            }
        }
        return result;
    };
    Array.prototype.difference = function (other) {
        var sother = set (other.slice () .sort ());
        var result = set ();
        for (var i = 0; i < this.length; i++) {
            if (sother.__bindexOf__ (this [i]) == -1) {
                result.push (this [i]);
            }
        }
        return result;
    };
    Array.prototype.symmetric_difference = function (other) {
        return this.union (other) .difference (this.intersection (other));
    };
    Array.prototype.py_update = function () {
        var updated = [] .concat.apply (this.slice (), arguments) .sort ();
        this.py_clear ();
        for (var i = 0; i < updated.length; i++) {
            if (updated [i] != updated [i - 1]) {
                this.push (updated [i]);
            }
        }
    };
    Array.prototype.__eq__ = function (other) {
        if (this.length != other.length) {
            return false;
        }
        if (this.__class__ == set) {
            this.sort ();
            other.sort ();
        }
        for (var i = 0; i < this.length; i++) {
            if (this [i] != other [i]) {
                return false;
            }
        }
        return true;
    };
    Array.prototype.__ne__ = function (other) {
        return !this.__eq__ (other);
    };
    Array.prototype.__le__ = function (other) {
        return this.issubset (other);
    };
    Array.prototype.__ge__ = function (other) {
        return this.issuperset (other);
    };
    Array.prototype.__lt__ = function (other) {
        return this.issubset (other) && !this.issuperset (other);
    };
    Array.prototype.__gt__ = function (other) {
        return this.issuperset (other) && !this.issubset (other);
    };
    function bytearray (bytable, encoding) {
        if (bytable == undefined) {
            return new Uint8Array (0);
        }
        else {
            var aType = py_typeof (bytable);
            if (aType == int) {
                return new Uint8Array (bytable);
            }
            else if (aType == str) {
                var aBytes = new Uint8Array (len (bytable));
                for (var i = 0; i < len (bytable); i++) {
                    aBytes [i] = bytable.charCodeAt (i);
                }
                return aBytes;
            }
            else if (aType == list || aType == tuple) {
                return new Uint8Array (bytable);
            }
            else {
                throw py_TypeError;
            }
        }
    }
    var bytes = bytearray;
    __all__.bytearray = bytearray;
    __all__.bytes = bytearray;
    Uint8Array.prototype.__add__ = function (aBytes) {
        var result = new Uint8Array (this.length + aBytes.length);
        result.set (this);
        result.set (aBytes, this.length);
        return result;
    };
    Uint8Array.prototype.__mul__ = function (scalar) {
        var result = new Uint8Array (scalar * this.length);
        for (var i = 0; i < scalar; i++) {
            result.set (this, i * this.length);
        }
        return result;
    };
    Uint8Array.prototype.__rmul__ = Uint8Array.prototype.__mul__;
    function str (stringable) {
        try {
            return stringable.__str__ ();
        }
        catch (exception) {
            try {
                return repr (stringable);
            }
            catch (exception) {
                return String (stringable);
            }
        }
    };
    __all__.str = str;
    String.prototype.__class__ = str;
    str.__name__ = 'str';
    String.prototype.__iter__ = function () {new __PyIterator__ (this);};
    String.prototype.__repr__ = function () {
        return (this.indexOf ('\'') == -1 ? '\'' + this + '\'' : '"' + this + '"') .py_replace ('\t', '\\t') .py_replace ('\n', '\\n');
    };
    String.prototype.__str__ = function () {
        return this;
    };
    String.prototype.capitalize = function () {
        return this.charAt (0).toUpperCase () + this.slice (1);
    };
    String.prototype.endswith = function (suffix) {
        return suffix == '' || this.slice (-suffix.length) == suffix;
    };
    String.prototype.find  = function (sub, start) {
        return this.indexOf (sub, start);
    };
    String.prototype.__getslice__ = function (start, stop, step) {
        if (start < 0) {
            start = this.length + start;
        }
        if (stop == null) {
            stop = this.length;
        }
        else if (stop < 0) {
            stop = this.length + stop;
        }
        var result = '';
        if (step == 1) {
            result = this.substring (start, stop);
        }
        else {
            for (var index = start; index < stop; index += step) {
                result = result.concat (this.charAt(index));
            }
        }
        return result;
    }
    __setProperty__ (String.prototype, 'format', {
        get: function () {return __get__ (this, function (self) {
            var args = tuple ([] .slice.apply (arguments).slice (1));
            var autoIndex = 0;
            return self.replace (/\{(\w*)\}/g, function (match, key) {
                if (key == '') {
                    key = autoIndex++;
                }
                if (key == +key) {
                    return args [key] == undefined ? match : str (args [key]);
                }
                else {
                    for (var index = 0; index < args.length; index++) {
                        if (typeof args [index] == 'object' && args [index][key] != undefined) {
                            return str (args [index][key]);
                        }
                    }
                    return match;
                }
            });
        });},
        enumerable: true
    });
    String.prototype.isalnum = function () {
        return /^[0-9a-zA-Z]{1,}$/.test(this)
    }
    String.prototype.isalpha = function () {
        return /^[a-zA-Z]{1,}$/.test(this)
    }
    String.prototype.isdecimal = function () {
        return /^[0-9]{1,}$/.test(this)
    }
    String.prototype.isdigit = function () {
        return this.isdecimal()
    }
    String.prototype.islower = function () {
        return /^[a-z]{1,}$/.test(this)
    }
    String.prototype.isupper = function () {
        return /^[A-Z]{1,}$/.test(this)
    }
    String.prototype.isspace = function () {
        return /^[\s]{1,}$/.test(this)
    }
    String.prototype.isnumeric = function () {
        return !isNaN (parseFloat (this)) && isFinite (this);
    };
    String.prototype.join = function (strings) {
        return strings.join (this);
    };
    String.prototype.lower = function () {
        return this.toLowerCase ();
    };
    String.prototype.py_replace = function (old, aNew, maxreplace) {
        return this.split (old, maxreplace) .join (aNew);
    };
    String.prototype.lstrip = function () {
        return this.replace (/^\s*/g, '');
    };
    String.prototype.rfind = function (sub, start) {
        return this.lastIndexOf (sub, start);
    };
    String.prototype.rsplit = function (sep, maxsplit) {
        if (sep == undefined || sep == null) {
            sep = /\s+/;
            var stripped = this.strip ();
        }
        else {
            var stripped = this;
        }
        if (maxsplit == undefined || maxsplit == -1) {
            return stripped.split (sep);
        }
        else {
            var result = stripped.split (sep);
            if (maxsplit < result.length) {
                var maxrsplit = result.length - maxsplit;
                return [result.slice (0, maxrsplit) .join (sep)] .concat (result.slice (maxrsplit));
            }
            else {
                return result;
            }
        }
    };
    String.prototype.rstrip = function () {
        return this.replace (/\s*$/g, '');
    };
    String.prototype.py_split = function (sep, maxsplit) {
        if (sep == undefined || sep == null) {
            sep = /\s+/;
            var stripped = this.strip ();
        }
        else {
            var stripped = this;
        }
        if (maxsplit == undefined || maxsplit == -1) {
            return stripped.split (sep);
        }
        else {
            var result = stripped.split (sep);
            if (maxsplit < result.length) {
                return result.slice (0, maxsplit).concat ([result.slice (maxsplit).join (sep)]);
            }
            else {
                return result;
            }
        }
    };
    String.prototype.startswith = function (prefix) {
        return this.indexOf (prefix) == 0;
    };
    String.prototype.strip = function () {
        return this.trim ();
    };
    String.prototype.upper = function () {
        return this.toUpperCase ();
    };
    String.prototype.__mul__ = function (scalar) {
        var result = this;
        for (var i = 1; i < scalar; i++) {
            result = result + this;
        }
        return result;
    };
    String.prototype.__rmul__ = String.prototype.__mul__;
    function __keys__ () {
        var keys = [];
        for (var attrib in this) {
            if (!__specialattrib__ (attrib)) {
                keys.push (attrib);
            }
        }
        return keys;
    }
    function __items__ () {
        var items = [];
        for (var attrib in this) {
            if (!__specialattrib__ (attrib)) {
                items.push ([attrib, this [attrib]]);
            }
        }
        return items;
    }
    function __del__ (key) {
        delete this [key];
    }
    function __clear__ () {
        for (var attrib in this) {
            delete this [attrib];
        }
    }
    function __getdefault__ (aKey, aDefault) {
        var result = this [aKey];
        if (result == undefined) {
            result = this ['py_' + aKey]
        }
        return result == undefined ? (aDefault == undefined ? null : aDefault) : result;
    }
    function __setdefault__ (aKey, aDefault) {
        var result = this [aKey];
        if (result != undefined) {
            return result;
        }
        var val = aDefault == undefined ? null : aDefault;
        this [aKey] = val;
        return val;
    }
    function __pop__ (aKey, aDefault) {
        var result = this [aKey];
        if (result != undefined) {
            delete this [aKey];
            return result;
        } else {
            if ( aDefault === undefined ) {
                throw KeyError (aKey, new Error());
            }
        }
        return aDefault;
    }
    function __popitem__ () {
        var aKey = Object.keys (this) [0];
        if (aKey == null) {
            throw KeyError ("popitem(): dictionary is empty", new Error ());
        }
        var result = tuple ([aKey, this [aKey]]);
        delete this [aKey];
        return result;
    }
    function __update__ (aDict) {
        for (var aKey in aDict) {
            this [aKey] = aDict [aKey];
        }
    }
    function __values__ () {
        var values = [];
        for (var attrib in this) {
            if (!__specialattrib__ (attrib)) {
                values.push (this [attrib]);
            }
        }
        return values;
    }
    function __dgetitem__ (aKey) {
        return this [aKey];
    }
    function __dsetitem__ (aKey, aValue) {
        this [aKey] = aValue;
    }
    function dict (objectOrPairs) {
        var instance = {};
        if (!objectOrPairs || objectOrPairs instanceof Array) {
            if (objectOrPairs) {
                for (var index = 0; index < objectOrPairs.length; index++) {
                    var pair = objectOrPairs [index];
                    if ( !(pair instanceof Array) || pair.length != 2) {
                        throw ValueError(
                            "dict update sequence element #" + index +
                            " has length " + pair.length +
                            "; 2 is required", new Error());
                    }
                    var key = pair [0];
                    var val = pair [1];
                    if (!(objectOrPairs instanceof Array) && objectOrPairs instanceof Object) {
                         if (!isinstance (objectOrPairs, dict)) {
                             val = dict (val);
                         }
                    }
                    instance [key] = val;
                }
            }
        }
        else {
            if (isinstance (objectOrPairs, dict)) {
                var aKeys = objectOrPairs.py_keys ();
                for (var index = 0; index < aKeys.length; index++ ) {
                    var key = aKeys [index];
                    instance [key] = objectOrPairs [key];
                }
            } else if (objectOrPairs instanceof Object) {
                instance = objectOrPairs;
            } else {
                throw ValueError ("Invalid type of object for dict creation", new Error ());
            }
        }
        __setProperty__ (instance, '__class__', {value: dict, enumerable: false, writable: true});
        __setProperty__ (instance, 'py_keys', {value: __keys__, enumerable: false});
        __setProperty__ (instance, '__iter__', {value: function () {new __PyIterator__ (this.py_keys ());}, enumerable: false});
        __setProperty__ (instance, Symbol.iterator, {value: function () {new __JsIterator__ (this.py_keys ());}, enumerable: false});
        __setProperty__ (instance, 'py_items', {value: __items__, enumerable: false});
        __setProperty__ (instance, 'py_del', {value: __del__, enumerable: false});
        __setProperty__ (instance, 'py_clear', {value: __clear__, enumerable: false});
        __setProperty__ (instance, 'py_get', {value: __getdefault__, enumerable: false});
        __setProperty__ (instance, 'py_setdefault', {value: __setdefault__, enumerable: false});
        __setProperty__ (instance, 'py_pop', {value: __pop__, enumerable: false});
        __setProperty__ (instance, 'py_popitem', {value: __popitem__, enumerable: false});
        __setProperty__ (instance, 'py_update', {value: __update__, enumerable: false});
        __setProperty__ (instance, 'py_values', {value: __values__, enumerable: false});
        __setProperty__ (instance, '__getitem__', {value: __dgetitem__, enumerable: false});
        __setProperty__ (instance, '__setitem__', {value: __dsetitem__, enumerable: false});
        return instance;
    }
    __all__.dict = dict;
    dict.__name__ = 'dict';
    function __setdoc__ (docString) {
        this.__doc__ = docString;
        return this;
    }
    __setProperty__ (Function.prototype, '__setdoc__', {value: __setdoc__, enumerable: false});
    var __jsmod__ = function (a, b) {
        if (typeof a == 'object' && '__mod__' in a) {
            return a.__mod__ (b);
        }
        else if (typeof b == 'object' && '__rpow__' in b) {
            return b.__rmod__ (a);
        }
        else {
            return a % b;
        }
    };
    __all__.__jsmod__ = __jsmod__;
    var __mod__ = function (a, b) {
        if (typeof a == 'object' && '__mod__' in a) {
            return a.__mod__ (b);
        }
        else if (typeof b == 'object' && '__rpow__' in b) {
            return b.__rmod__ (a);
        }
        else {
            return ((a % b) + b) % b;
        }
    };
    __all__.mod = __mod__;
    var __pow__ = function (a, b) {
        if (typeof a == 'object' && '__pow__' in a) {
            return a.__pow__ (b);
        }
        else if (typeof b == 'object' && '__rpow__' in b) {
            return b.__rpow__ (a);
        }
        else {
            return Math.pow (a, b);
        }
    };
    __all__.pow = __pow__;
    var __neg__ = function (a) {
        if (typeof a == 'object' && '__neg__' in a) {
            return a.__neg__ ();
        }
        else {
            return -a;
        }
    };
    __all__.__neg__ = __neg__;
    var __matmul__ = function (a, b) {
        return a.__matmul__ (b);
    };
    __all__.__matmul__ = __matmul__;
    var __mul__ = function (a, b) {
        if (typeof a == 'object' && '__mul__' in a) {
            return a.__mul__ (b);
        }
        else if (typeof b == 'object' && '__rmul__' in b) {
            return b.__rmul__ (a);
        }
        else if (typeof a == 'string') {
            return a.__mul__ (b);
        }
        else if (typeof b == 'string') {
            return b.__rmul__ (a);
        }
        else {
            return a * b;
        }
    };
    __all__.__mul__ = __mul__;
    var __truediv__ = function (a, b) {
        if (typeof a == 'object' && '__truediv__' in a) {
            return a.__truediv__ (b);
        }
        else if (typeof b == 'object' && '__rtruediv__' in b) {
            return b.__rtruediv__ (a);
        }
        else if (typeof a == 'object' && '__div__' in a) {
            return a.__div__ (b);
        }
        else if (typeof b == 'object' && '__rdiv__' in b) {
            return b.__rdiv__ (a);
        }
        else {
            return a / b;
        }
    };
    __all__.__truediv__ = __truediv__;
    var __floordiv__ = function (a, b) {
        if (typeof a == 'object' && '__floordiv__' in a) {
            return a.__floordiv__ (b);
        }
        else if (typeof b == 'object' && '__rfloordiv__' in b) {
            return b.__rfloordiv__ (a);
        }
        else if (typeof a == 'object' && '__div__' in a) {
            return a.__div__ (b);
        }
        else if (typeof b == 'object' && '__rdiv__' in b) {
            return b.__rdiv__ (a);
        }
        else {
            return Math.floor (a / b);
        }
    };
    __all__.__floordiv__ = __floordiv__;
    var __add__ = function (a, b) {
        if (typeof a == 'object' && '__add__' in a) {
            return a.__add__ (b);
        }
        else if (typeof b == 'object' && '__radd__' in b) {
            return b.__radd__ (a);
        }
        else {
            return a + b;
        }
    };
    __all__.__add__ = __add__;
    var __sub__ = function (a, b) {
        if (typeof a == 'object' && '__sub__' in a) {
            return a.__sub__ (b);
        }
        else if (typeof b == 'object' && '__rsub__' in b) {
            return b.__rsub__ (a);
        }
        else {
            return a - b;
        }
    };
    __all__.__sub__ = __sub__;
    var __lshift__ = function (a, b) {
        if (typeof a == 'object' && '__lshift__' in a) {
            return a.__lshift__ (b);
        }
        else if (typeof b == 'object' && '__rlshift__' in b) {
            return b.__rlshift__ (a);
        }
        else {
            return a << b;
        }
    };
    __all__.__lshift__ = __lshift__;
    var __rshift__ = function (a, b) {
        if (typeof a == 'object' && '__rshift__' in a) {
            return a.__rshift__ (b);
        }
        else if (typeof b == 'object' && '__rrshift__' in b) {
            return b.__rrshift__ (a);
        }
        else {
            return a >> b;
        }
    };
    __all__.__rshift__ = __rshift__;
    var __or__ = function (a, b) {
        if (typeof a == 'object' && '__or__' in a) {
            return a.__or__ (b);
        }
        else if (typeof b == 'object' && '__ror__' in b) {
            return b.__ror__ (a);
        }
        else {
            return a | b;
        }
    };
    __all__.__or__ = __or__;
    var __xor__ = function (a, b) {
        if (typeof a == 'object' && '__xor__' in a) {
            return a.__xor__ (b);
        }
        else if (typeof b == 'object' && '__rxor__' in b) {
            return b.__rxor__ (a);
        }
        else {
            return a ^ b;
        }
    };
    __all__.__xor__ = __xor__;
    var __and__ = function (a, b) {
        if (typeof a == 'object' && '__and__' in a) {
            return a.__and__ (b);
        }
        else if (typeof b == 'object' && '__rand__' in b) {
            return b.__rand__ (a);
        }
        else {
            return a & b;
        }
    };
    __all__.__and__ = __and__;
    var __eq__ = function (a, b) {
        if (typeof a == 'object' && '__eq__' in a) {
            return a.__eq__ (b);
        }
        else {
            return a == b;
        }
    };
    __all__.__eq__ = __eq__;
    var __ne__ = function (a, b) {
        if (typeof a == 'object' && '__ne__' in a) {
            return a.__ne__ (b);
        }
        else {
            return a != b
        }
    };
    __all__.__ne__ = __ne__;
    var __lt__ = function (a, b) {
        if (typeof a == 'object' && '__lt__' in a) {
            return a.__lt__ (b);
        }
        else {
            return a < b;
        }
    };
    __all__.__lt__ = __lt__;
    var __le__ = function (a, b) {
        if (typeof a == 'object' && '__le__' in a) {
            return a.__le__ (b);
        }
        else {
            return a <= b;
        }
    };
    __all__.__le__ = __le__;
    var __gt__ = function (a, b) {
        if (typeof a == 'object' && '__gt__' in a) {
            return a.__gt__ (b);
        }
        else {
            return a > b;
        }
    };
    __all__.__gt__ = __gt__;
    var __ge__ = function (a, b) {
        if (typeof a == 'object' && '__ge__' in a) {
            return a.__ge__ (b);
        }
        else {
            return a >= b;
        }
    };
    __all__.__ge__ = __ge__;
    var __imatmul__ = function (a, b) {
        if ('__imatmul__' in a) {
            return a.__imatmul__ (b);
        }
        else {
            return a.__matmul__ (b);
        }
    };
    __all__.__imatmul__ = __imatmul__;
    var __ipow__ = function (a, b) {
        if (typeof a == 'object' && '__pow__' in a) {
            return a.__ipow__ (b);
        }
        else if (typeof a == 'object' && '__ipow__' in a) {
            return a.__pow__ (b);
        }
        else if (typeof b == 'object' && '__rpow__' in b) {
            return b.__rpow__ (a);
        }
        else {
            return Math.pow (a, b);
        }
    };
    __all__.ipow = __ipow__;
    var __ijsmod__ = function (a, b) {
        if (typeof a == 'object' && '__imod__' in a) {
            return a.__ismod__ (b);
        }
        else if (typeof a == 'object' && '__mod__' in a) {
            return a.__mod__ (b);
        }
        else if (typeof b == 'object' && '__rpow__' in b) {
            return b.__rmod__ (a);
        }
        else {
            return a % b;
        }
    };
    __all__.ijsmod__ = __ijsmod__;
    var __imod__ = function (a, b) {
        if (typeof a == 'object' && '__imod__' in a) {
            return a.__imod__ (b);
        }
        else if (typeof a == 'object' && '__mod__' in a) {
            return a.__mod__ (b);
        }
        else if (typeof b == 'object' && '__rpow__' in b) {
            return b.__rmod__ (a);
        }
        else {
            return ((a % b) + b) % b;
        }
    };
    __all__.imod = __imod__;
    var __imul__ = function (a, b) {
        if (typeof a == 'object' && '__imul__' in a) {
            return a.__imul__ (b);
        }
        else if (typeof a == 'object' && '__mul__' in a) {
            return a = a.__mul__ (b);
        }
        else if (typeof b == 'object' && '__rmul__' in b) {
            return a = b.__rmul__ (a);
        }
        else if (typeof a == 'string') {
            return a = a.__mul__ (b);
        }
        else if (typeof b == 'string') {
            return a = b.__rmul__ (a);
        }
        else {
            return a *= b;
        }
    };
    __all__.__imul__ = __imul__;
    var __idiv__ = function (a, b) {
        if (typeof a == 'object' && '__idiv__' in a) {
            return a.__idiv__ (b);
        }
        else if (typeof a == 'object' && '__div__' in a) {
            return a = a.__div__ (b);
        }
        else if (typeof b == 'object' && '__rdiv__' in b) {
            return a = b.__rdiv__ (a);
        }
        else {
            return a /= b;
        }
    };
    __all__.__idiv__ = __idiv__;
    var __iadd__ = function (a, b) {
        if (typeof a == 'object' && '__iadd__' in a) {
            return a.__iadd__ (b);
        }
        else if (typeof a == 'object' && '__add__' in a) {
            return a = a.__add__ (b);
        }
        else if (typeof b == 'object' && '__radd__' in b) {
            return a = b.__radd__ (a);
        }
        else {
            return a += b;
        }
    };
    __all__.__iadd__ = __iadd__;
    var __isub__ = function (a, b) {
        if (typeof a == 'object' && '__isub__' in a) {
            return a.__isub__ (b);
        }
        else if (typeof a == 'object' && '__sub__' in a) {
            return a = a.__sub__ (b);
        }
        else if (typeof b == 'object' && '__rsub__' in b) {
            return a = b.__rsub__ (a);
        }
        else {
            return a -= b;
        }
    };
    __all__.__isub__ = __isub__;
    var __ilshift__ = function (a, b) {
        if (typeof a == 'object' && '__ilshift__' in a) {
            return a.__ilshift__ (b);
        }
        else if (typeof a == 'object' && '__lshift__' in a) {
            return a = a.__lshift__ (b);
        }
        else if (typeof b == 'object' && '__rlshift__' in b) {
            return a = b.__rlshift__ (a);
        }
        else {
            return a <<= b;
        }
    };
    __all__.__ilshift__ = __ilshift__;
    var __irshift__ = function (a, b) {
        if (typeof a == 'object' && '__irshift__' in a) {
            return a.__irshift__ (b);
        }
        else if (typeof a == 'object' && '__rshift__' in a) {
            return a = a.__rshift__ (b);
        }
        else if (typeof b == 'object' && '__rrshift__' in b) {
            return a = b.__rrshift__ (a);
        }
        else {
            return a >>= b;
        }
    };
    __all__.__irshift__ = __irshift__;
    var __ior__ = function (a, b) {
        if (typeof a == 'object' && '__ior__' in a) {
            return a.__ior__ (b);
        }
        else if (typeof a == 'object' && '__or__' in a) {
            return a = a.__or__ (b);
        }
        else if (typeof b == 'object' && '__ror__' in b) {
            return a = b.__ror__ (a);
        }
        else {
            return a |= b;
        }
    };
    __all__.__ior__ = __ior__;
    var __ixor__ = function (a, b) {
        if (typeof a == 'object' && '__ixor__' in a) {
            return a.__ixor__ (b);
        }
        else if (typeof a == 'object' && '__xor__' in a) {
            return a = a.__xor__ (b);
        }
        else if (typeof b == 'object' && '__rxor__' in b) {
            return a = b.__rxor__ (a);
        }
        else {
            return a ^= b;
        }
    };
    __all__.__ixor__ = __ixor__;
    var __iand__ = function (a, b) {
        if (typeof a == 'object' && '__iand__' in a) {
            return a.__iand__ (b);
        }
        else if (typeof a == 'object' && '__and__' in a) {
            return a = a.__and__ (b);
        }
        else if (typeof b == 'object' && '__rand__' in b) {
            return a = b.__rand__ (a);
        }
        else {
            return a &= b;
        }
    };
    __all__.__iand__ = __iand__;
    var __getitem__ = function (container, key) {
        if (typeof container == 'object' && '__getitem__' in container) {
            return container.__getitem__ (key);
        }
        else {
            return container [key];
        }
    };
    __all__.__getitem__ = __getitem__;
    var __setitem__ = function (container, key, value) {
        if (typeof container == 'object' && '__setitem__' in container) {
            container.__setitem__ (key, value);
        }
        else {
            container [key] = value;
        }
    };
    __all__.__setitem__ = __setitem__;
    var __getslice__ = function (container, lower, upper, step) {
        if (typeof container == 'object' && '__getitem__' in container) {
            return container.__getitem__ ([lower, upper, step]);
        }
        else {
            return container.__getslice__ (lower, upper, step);
        }
    };
    __all__.__getslice__ = __getslice__;
    var __setslice__ = function (container, lower, upper, step, value) {
        if (typeof container == 'object' && '__setitem__' in container) {
            container.__setitem__ ([lower, upper, step], value);
        }
        else {
            container.__setslice__ (lower, upper, step, value);
        }
    };
    __all__.__setslice__ = __setslice__;
	__nest__ (
		__all__,
		'time', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __name__ = 'time';
					var __date = new Date (0);
					var __now = new Date ();
					var __weekdays = list ([]);
					var __weekdays_long = list ([]);
					var __d = new Date (1467662339080);
					for (var i = 0; i < 7; i++) {
						var __iterable0__ = tuple ([tuple ([__weekdays, 'short']), tuple ([__weekdays_long, 'long'])]);
						for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
							var __left0__ = __iterable0__ [__index0__];
							var l = __left0__ [0];
							var s = __left0__ [1];
							l.append (__d.toLocaleString (window.navigator.language, dict ({'weekday': s})).lower ());
						}
						__d.setDate (__d.getDate () + 1);
					}
					var __months = list ([]);
					var __months_long = list ([]);
					var __d = new Date (946681200000.0);
					for (var i = 0; i < 12; i++) {
						var __iterable0__ = tuple ([tuple ([__months, 'short']), tuple ([__months_long, 'long'])]);
						for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
							var __left0__ = __iterable0__ [__index0__];
							var l = __left0__ [0];
							var s = __left0__ [1];
							l.append (__d.toLocaleString (window.navigator.language, dict ({'month': s})).lower ());
						}
						__d.setMonth (__d.getMonth () + 1);
					}
					var __lu = dict ({'Y': 0, 'm': 1, 'd': 2, 'H': 3, 'M': 4, 'S': 5});
					var _lsplit = function (s, sep, maxsplit) {
						if (maxsplit == 0) {
							return list ([s]);
						}
						var py_split = s.py_split (sep);
						if (!(maxsplit)) {
							return py_split;
						}
						var ret = py_split.slice (0, maxsplit, 1);
						if (len (ret) == len (py_split)) {
							return ret;
						}
						ret.append (sep.join (py_split.__getslice__ (maxsplit, null, 1)));
						return ret;
					};
					var _local_time_tuple = function (jd) {
						var res = tuple ([jd.getFullYear (), jd.getMonth () + 1, jd.getDate (), jd.getHours (), jd.getMinutes (), jd.getSeconds (), (jd.getDay () > 0 ? jd.getDay () - 1 : 6), _day_of_year (jd, true), _daylight_in_effect (jd), jd.getMilliseconds ()]);
						return res;
					};
					var _utc_time_tuple = function (jd) {
						var res = tuple ([jd.getUTCFullYear (), jd.getUTCMonth () + 1, jd.getUTCDate (), jd.getUTCHours (), jd.getUTCMinutes (), jd.getUTCSeconds (), jd.getUTCDay () - 1, _day_of_year (jd, false), 0, jd.getUTCMilliseconds ()]);
						return res;
					};
					var _day_of_year = function (jd, local) {
						var day_offs = 0;
						if (jd.getHours () + (jd.getTimezoneOffset () * 60) / 3600 < 0) {
							var day_offs = -(1);
						}
						var was = jd.getTime ();
						var cur = jd.setHours (23);
						jd.setUTCDate (1);
						jd.setUTCMonth (0);
						jd.setUTCHours (0);
						jd.setUTCMinutes (0);
						jd.setUTCSeconds (0);
						var res = round ((cur - jd) / 86400000);
						if (!(local)) {
							res += day_offs;
						}
						if (res == 0) {
							var res = 365;
							jd.setTime (jd.getTime () - 86400);
							var last_year = jd.getUTCFullYear ();
							if (_is_leap (last_year)) {
								var res = 366;
							}
						}
						jd.setTime (was);
						return res;
					};
					var _is_leap = function (year) {
						return __mod__ (year, 4) == 0 && (__mod__ (year, 100) != 0 || __mod__ (year, 400) == 0);
					};
					var __jan_jun_tz = function (t, func) {
						var was = t.getTime ();
						t.setDate (1);
						var res = list ([]);
						var __iterable0__ = tuple ([0, 6]);
						for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
							var m = __iterable0__ [__index0__];
							t.setMonth (m);
							if (!(func)) {
								res.append (t.getTimezoneOffset ());
							}
							else {
								res.append (func (t));
							}
						}
						t.setTime (was);
						return res;
					};
					var _daylight = function (t) {
						var jj = __jan_jun_tz (t);
						if (jj [0] != jj [1]) {
							return 1;
						}
						return 0;
					};
					var _daylight_in_effect = function (t) {
						var jj = __jan_jun_tz (t);
						if (min (jj [0], jj [1]) == t.getTimezoneOffset ()) {
							return 1;
						}
						return 0;
					};
					var _timezone = function (t) {
						var jj = __jan_jun_tz (t);
						return max (jj [0], jj [1]);
					};
					var __tzn = function (t) {
						try {
							return str (t).py_split ('(') [1].py_split (')') [0];
						}
						catch (__except0__) {
							return 'n.a.';
						}
					};
					var _tzname = function (t) {
						var cn = __tzn (t);
						var ret = list ([cn, cn]);
						var jj = __jan_jun_tz (t, __tzn);
						var ind = 0;
						if (!(_daylight_in_effect (t))) {
							var ind = 1;
						}
						var __iterable0__ = jj;
						for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
							var i = __iterable0__ [__index0__];
							if (i != cn) {
								ret [ind] = i;
							}
						}
						return tuple (ret);
					};
					var altzone = __now.getTimezoneOffset ();
					if (!(_daylight_in_effect (__now))) {
						var _jj = __jan_jun_tz (__now);
						var altzone = (altzone == _jj [1] ? _jj [0] : _jj [1]);
					}
					var altzone = altzone * 60;
					var timezone = _timezone (__now) * 60;
					var daylight = _daylight (__now);
					var tzname = _tzname (__now);
					var time = function () {
						return Date.now () / 1000;
					};
					var asctime = function (t) {
						return strftime ('%a %b %d %H:%M:%S %Y', t);
					};
					var mktime = function (t) {
						var d = new Date (t [0], t [1] - 1, t [2], t [3], t [4], t [5], 0);
						return (d - 0) / 1000;
					};
					var ctime = function (seconds) {
						if (!(seconds)) {
							var seconds = time ();
						}
						return asctime (localtime (seconds));
					};
					var localtime = function (seconds) {
						if (!(seconds)) {
							var seconds = time ();
						}
						return gmtime (seconds, true);
					};
					var gmtime = function (seconds, localtime) {
						if (!(seconds)) {
							var seconds = time ();
						}
						var millis = seconds * 1000;
						__date.setTime (millis);
						if (localtime) {
							var t = _local_time_tuple (__date);
						}
						else {
							var t = _utc_time_tuple (__date);
						}
						return t.__getslice__ (0, 9, 1);
					};
					var strptime = function (string, format) {
						if (!(format)) {
							var format = '%a %b %d %H:%M:%S %Y';
						}
						var __left0__ = tuple ([string, format]);
						var ts = __left0__ [0];
						var fmt = __left0__ [1];
						var get_next = function (fmt) {
							var get_sep = function (fmt) {
								var res = list ([]);
								if (!(fmt)) {
									return tuple (['', '']);
								}
								for (var i = 0; i < len (fmt) - 1; i++) {
									var c = fmt [i];
									if (c == '%') {
										break;
									}
									res.append (c);
								}
								return tuple ([''.join (res), fmt.__getslice__ (i, null, 1)]);
							};
							var __left0__ = tuple ([null, null, null]);
							var d = __left0__ [0];
							var sep = __left0__ [1];
							var f = __left0__ [2];
							if (fmt) {
								if (fmt [0] == '%') {
									var d = fmt [1];
									var __left0__ = get_sep (fmt.__getslice__ (2, null, 1));
									var sep = __left0__ [0];
									var f = __left0__ [1];
								}
								else {
									var __left0__ = get_sep (fmt);
									var sep = __left0__ [0];
									var f = __left0__ [1];
								}
							}
							return tuple ([d, sep, f]);
						};
						var dir_val = dict ({});
						while (ts) {
							var __left0__ = get_next (fmt);
							var d = __left0__ [0];
							var sep = __left0__ [1];
							var fmt = __left0__ [2];
							if (sep == '') {
								var lv = null;
								if (d) {
									var l = -(1);
									if (d == 'Y') {
										var l = 4;
									}
									else if (d == 'a') {
										var l = len (__weekdays [0]);
									}
									else if (d == 'A') {
										var l = len (__weekdays_long [0]);
									}
									else if (d == 'b') {
										var l = len (__months [0]);
									}
									else if (__in__ (d, tuple (['d', 'm', 'H', 'M', 'S']))) {
										var l = 2;
									}
									if (l > -(1)) {
										var lv = list ([ts.__getslice__ (0, l, 1), ts.__getslice__ (l, null, 1)]);
									}
								}
								if (!(lv)) {
									var lv = list ([ts, '']);
								}
							}
							else {
								var lv = _lsplit (ts, sep, 1);
							}
							if (d == null) {
								var ts = lv [1];
								continue;
							}
							var __left0__ = tuple ([lv [1], lv [0]]);
							var ts = __left0__ [0];
							dir_val [d] = __left0__ [1];
							if (fmt == '') {
								break;
							}
						}
						var t = list ([1900, 1, 1, 0, 0, 0, 0, 1, -(1)]);
						var ignore_keys = list ([]);
						var have_weekday = false;
						var __iterable0__ = dir_val.py_items ();
						for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
							var __left0__ = __iterable0__ [__index0__];
							var d = __left0__ [0];
							var v = __left0__ [1];
							if (__in__ (d, ignore_keys)) {
								continue;
							}
							if (d == 'p') {
								continue;
							}
							if (__in__ (d, __lu.py_keys ())) {
								t [__lu [d]] = int (v);
								continue;
							}
							if (__in__ (d, tuple (['a', 'A', 'b', 'B']))) {
								var v = v.lower ();
							}
							if (d == 'm') {
								ignore_keys.append ('b');
								ignore_keys.append ('B');
							}
							if (d == 'a') {
								if (!(__in__ (v, __weekdays))) {
									var __except0__ = ValueError ('Weekday unknown in your locale');
									__except0__.__cause__ = null;
									throw __except0__;
								}
								var have_weekday = true;
								t [6] = __weekdays.index (v);
							}
							else if (d == 'A') {
								if (!(__in__ (v, __weekdays_long))) {
									var __except0__ = ValueError ('Weekday unknown in your locale');
									__except0__.__cause__ = null;
									throw __except0__;
								}
								var have_weekday = true;
								t [6] = __weekdays_long.index (v);
							}
							else if (d == 'b') {
								if (!(__in__ (v, __months))) {
									var __except0__ = ValueError ('Month unknown in your locale');
									__except0__.__cause__ = null;
									throw __except0__;
								}
								t [1] = __months.index (v) + 1;
							}
							else if (d == 'B') {
								if (!(__in__ (v, __months_long))) {
									var __except0__ = ValueError ('Month unknown in your locale');
									__except0__.__cause__ = null;
									throw __except0__;
								}
								t [1] = __months_long.index (v) + 1;
							}
							else if (d == 'I') {
								var ampm = dir_val ['p'] || 'am';
								var ampm = ampm.lower ();
								var v = int (v);
								if (v == 12) {
									var v = 0;
								}
								else if (v > 12) {
									var __except0__ = ValueError (((("time data '" + string) + "' does not match format '") + format) + "'");
									__except0__.__cause__ = null;
									throw __except0__;
								}
								if (ampm == 'pm') {
									v += 12;
								}
								t [__lu ['H']] = v;
							}
							else if (d == 'y') {
								t [0] = 2000 + int (v);
							}
							else if (d == 'Z') {
								if (__in__ (v.lower (), list (['gmt', 'utc']))) {
									t [-(1)] = 0;
								}
							}
						}
						var __date = new Date (0);
						__date.setUTCFullYear (t [0]);
						__date.setUTCMonth (t [1] - 1);
						__date.setUTCDate (t [2]);
						__date.setUTCHours (t [3]);
						t [7] = _day_of_year (__date);
						if (!(have_weekday)) {
							t [6] = __date.getUTCDay () - 1;
						}
						return t;
					};
					var strftime = function (format, t) {
						var zf2 = function (v) {
							if (v < 10) {
								return '0' + str (v);
							}
							return v;
						};
						if (!(t)) {
							var t = localtime ();
						}
						var f = format;
						var __iterable0__ = __lu.py_keys ();
						for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
							var d = __iterable0__ [__index0__];
							var k = '%' + d;
							if (!(__in__ (k, f))) {
								continue;
							}
							var v = zf2 (t [__lu [d]]);
							var f = f.py_replace (k, v);
						}
						var __iterable0__ = tuple ([tuple (['b', __months, 1]), tuple (['B', __months_long, 1]), tuple (['a', __weekdays, 6]), tuple (['A', __weekdays_long, 6])]);
						for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
							var __left0__ = __iterable0__ [__index0__];
							var d = __left0__ [0];
							var l = __left0__ [1];
							var pos = __left0__ [2];
							var p = t [pos];
							if (pos == 1) {
								var p = p - 1;
							}
							var v = l [p].capitalize ();
							var f = f.py_replace ('%' + d, v);
						}
						if (__in__ ('%p', f)) {
							if (t [3] > 11) {
								var ap = 'PM';
							}
							else {
								var ap = 'AM';
							}
							var f = f.py_replace ('%p', ap);
						}
						if (__in__ ('%y', f)) {
							var f = f.py_replace ('%y', str (t [0]).__getslice__ (-(2), null, 1));
						}
						if (__in__ ('%I', f)) {
							var v = t [3];
							if (v == 0) {
								var v = 12;
							}
							else if (v > 12) {
								var v = v - 12;
							}
							var f = f.py_replace ('%I', zf2 (v));
						}
						return f;
					};
					__pragma__ ('<all>')
						__all__.__d = __d;
						__all__.__date = __date;
						__all__.__jan_jun_tz = __jan_jun_tz;
						__all__.__lu = __lu;
						__all__.__months = __months;
						__all__.__months_long = __months_long;
						__all__.__name__ = __name__;
						__all__.__now = __now;
						__all__.__tzn = __tzn;
						__all__.__weekdays = __weekdays;
						__all__.__weekdays_long = __weekdays_long;
						__all__._day_of_year = _day_of_year;
						__all__._daylight = _daylight;
						__all__._daylight_in_effect = _daylight_in_effect;
						__all__._is_leap = _is_leap;
						__all__._jj = _jj;
						__all__._local_time_tuple = _local_time_tuple;
						__all__._lsplit = _lsplit;
						__all__._timezone = _timezone;
						__all__._tzname = _tzname;
						__all__._utc_time_tuple = _utc_time_tuple;
						__all__.altzone = altzone;
						__all__.asctime = asctime;
						__all__.ctime = ctime;
						__all__.daylight = daylight;
						__all__.gmtime = gmtime;
						__all__.i = i;
						__all__.l = l;
						__all__.localtime = localtime;
						__all__.mktime = mktime;
						__all__.s = s;
						__all__.strftime = strftime;
						__all__.strptime = strptime;
						__all__.time = time;
						__all__.timezone = timezone;
						__all__.tzname = tzname;
					__pragma__ ('</all>')
				}
			}
		}
	);
	(function () {
		var time = {};
		var __name__ = '__main__';
		var LOOPS = 50000;
		__nest__ (time, '', __init__ (__world__.time));
		var clock = function () {
			return time.time ();
		};
		var __version__ = '1.1';
		var __left0__ = range (1, 6);
		var Ident1 = __left0__ [0];
		var Ident2 = __left0__ [1];
		var Ident3 = __left0__ [2];
		var Ident4 = __left0__ [3];
		var Ident5 = __left0__ [4];
		var Record = __class__ ('Record', [object], {
			__module__: __name__,
			get __init__ () {return __get__ (this, function (self, PtrComp, Discr, EnumComp, IntComp, StringComp) {
				if (typeof PtrComp == 'undefined' || (PtrComp != null && PtrComp .hasOwnProperty ("__kwargtrans__"))) {;
					var PtrComp = null;
				};
				if (typeof Discr == 'undefined' || (Discr != null && Discr .hasOwnProperty ("__kwargtrans__"))) {;
					var Discr = 0;
				};
				if (typeof EnumComp == 'undefined' || (EnumComp != null && EnumComp .hasOwnProperty ("__kwargtrans__"))) {;
					var EnumComp = 0;
				};
				if (typeof IntComp == 'undefined' || (IntComp != null && IntComp .hasOwnProperty ("__kwargtrans__"))) {;
					var IntComp = 0;
				};
				if (typeof StringComp == 'undefined' || (StringComp != null && StringComp .hasOwnProperty ("__kwargtrans__"))) {;
					var StringComp = 0;
				};
				self.PtrComp = PtrComp;
				self.Discr = Discr;
				self.EnumComp = EnumComp;
				self.IntComp = IntComp;
				self.StringComp = StringComp;
			});},
			get copy () {return __get__ (this, function (self) {
				return Record (self.PtrComp, self.Discr, self.EnumComp, self.IntComp, self.StringComp);
			});}
		});
		var TRUE = 1;
		var FALSE = 0;
		var main = function (loops) {
			if (typeof loops == 'undefined' || (loops != null && loops .hasOwnProperty ("__kwargtrans__"))) {;
				var loops = LOOPS;
			};
			var __left0__ = pystones (loops);
			var benchtime = __left0__ [0];
			var stones = __left0__ [1];
			print ('Pystone({}) time for {} passes = {}'.format (__version__, loops, benchtime));
			print ('This machine benchmarks at {} pystones/second'.format (stones));
		};
		var pystones = function (loops) {
			if (typeof loops == 'undefined' || (loops != null && loops .hasOwnProperty ("__kwargtrans__"))) {;
				var loops = LOOPS;
			};
			return Proc0 (loops);
		};
		var IntGlob = 0;
		var BoolGlob = FALSE;
		var Char1Glob = '\x00';
		var Char2Glob = '\x00';
		var Array1Glob = (function () {
			var __accu0__ = [];
			for (var i = 0; i < 51; i++) {
				__accu0__.append (0);
			}
			return __accu0__;
		}) ();
		var Array2Glob = (function () {
			var __accu0__ = [];
			for (var j = 0; j < 51; j++) {
				__accu0__.append ((function () {
					var __accu1__ = [];
					for (var i = 0; i < 51; i++) {
						__accu1__.append (0);
					}
					return __accu1__;
				}) ());
			}
			return __accu0__;
		}) ();
		var PtrGlb = null;
		var PtrGlbNext = null;
		var Proc0 = function (loops) {
			if (typeof loops == 'undefined' || (loops != null && loops .hasOwnProperty ("__kwargtrans__"))) {;
				var loops = LOOPS;
			};
			var starttime = clock ();
			for (var i = 0; i < loops; i++) {
				// pass;
			}
			var nulltime = clock () - starttime;
			PtrGlbNext = Record ();
			PtrGlb = Record ();
			PtrGlb.PtrComp = PtrGlbNext;
			PtrGlb.Discr = Ident1;
			PtrGlb.EnumComp = Ident3;
			PtrGlb.IntComp = 40;
			PtrGlb.StringComp = 'DHRYSTONE PROGRAM, SOME STRING';
			var String1Loc = "DHRYSTONE PROGRAM, 1'ST STRING";
			Array2Glob [8] [7] = 10;
			var starttime = clock ();
			for (var i = 0; i < loops; i++) {
				Proc5 ();
				Proc4 ();
				var IntLoc1 = 2;
				var IntLoc2 = 3;
				var String2Loc = "DHRYSTONE PROGRAM, 2'ND STRING";
				var EnumLoc = Ident2;
				BoolGlob = !(Func2 (String1Loc, String2Loc));
				while (IntLoc1 < IntLoc2) {
					var IntLoc3 = 5 * IntLoc1 - IntLoc2;
					var IntLoc3 = Proc7 (IntLoc1, IntLoc2);
					var IntLoc1 = IntLoc1 + 1;
				}
				Proc8 (Array1Glob, Array2Glob, IntLoc1, IntLoc3);
				PtrGlb = Proc1 (PtrGlb);
				var CharIndex = 'A';
				while (CharIndex <= Char2Glob) {
					if (EnumLoc == Func1 (CharIndex, 'C')) {
						var EnumLoc = Proc6 (Ident1);
					}
					var CharIndex = chr (ord (CharIndex) + 1);
				}
				var IntLoc3 = IntLoc2 * IntLoc1;
				var IntLoc2 = IntLoc3 / IntLoc1;
				var IntLoc2 = 7 * (IntLoc3 - IntLoc2) - IntLoc1;
				var IntLoc1 = Proc2 (IntLoc1);
			}
			var benchtime = (clock () - starttime) - nulltime;
			if (benchtime == 0.0) {
				var loopsPerBenchtime = 0.0;
			}
			else {
				var loopsPerBenchtime = loops / benchtime;
			}
			return tuple ([benchtime, loopsPerBenchtime]);
		};
		var Proc1 = function (PtrParIn) {
			var __left0__ = PtrGlb.copy ();
			PtrParIn.PtrComp = __left0__;
			var NextRecord = __left0__;
			PtrParIn.IntComp = 5;
			NextRecord.IntComp = PtrParIn.IntComp;
			NextRecord.PtrComp = PtrParIn.PtrComp;
			NextRecord.PtrComp = Proc3 (NextRecord.PtrComp);
			if (NextRecord.Discr == Ident1) {
				NextRecord.IntComp = 6;
				NextRecord.EnumComp = Proc6 (PtrParIn.EnumComp);
				NextRecord.PtrComp = PtrGlb.PtrComp;
				NextRecord.IntComp = Proc7 (NextRecord.IntComp, 10);
			}
			else {
				var PtrParIn = NextRecord.copy ();
			}
			NextRecord.PtrComp = null;
			return PtrParIn;
		};
		var Proc2 = function (IntParIO) {
			var IntLoc = IntParIO + 10;
			while (1) {
				if (Char1Glob == 'A') {
					var IntLoc = IntLoc - 1;
					var IntParIO = IntLoc - IntGlob;
					var EnumLoc = Ident1;
				}
				if (EnumLoc == Ident1) {
					break;
				}
			}
			return IntParIO;
		};
		var Proc3 = function (PtrParOut) {
			if (PtrGlb !== null) {
				var PtrParOut = PtrGlb.PtrComp;
			}
			else {
				IntGlob = 100;
			}
			PtrGlb.IntComp = Proc7 (10, IntGlob);
			return PtrParOut;
		};
		var Proc4 = function () {
			var BoolLoc = Char1Glob == 'A';
			var BoolLoc = BoolLoc || BoolGlob;
			Char2Glob = 'B';
		};
		var Proc5 = function () {
			Char1Glob = 'A';
			BoolGlob = FALSE;
		};
		var Proc6 = function (EnumParIn) {
			var EnumParOut = EnumParIn;
			if (!(Func3 (EnumParIn))) {
				var EnumParOut = Ident4;
			}
			if (EnumParIn == Ident1) {
				var EnumParOut = Ident1;
			}
			else if (EnumParIn == Ident2) {
				if (IntGlob > 100) {
					var EnumParOut = Ident1;
				}
				else {
					var EnumParOut = Ident4;
				}
			}
			else if (EnumParIn == Ident3) {
				var EnumParOut = Ident2;
			}
			else if (EnumParIn == Ident4) {
				// pass;
			}
			else if (EnumParIn == Ident5) {
				var EnumParOut = Ident3;
			}
			return EnumParOut;
		};
		var Proc7 = function (IntParI1, IntParI2) {
			var IntLoc = IntParI1 + 2;
			var IntParOut = IntParI2 + IntLoc;
			return IntParOut;
		};
		var Proc8 = function (Array1Par, Array2Par, IntParI1, IntParI2) {
			var IntLoc = IntParI1 + 5;
			Array1Par [IntLoc] = IntParI2;
			Array1Par [IntLoc + 1] = Array1Par [IntLoc];
			Array1Par [IntLoc + 30] = IntLoc;
			for (var IntIndex = IntLoc; IntIndex < IntLoc + 2; IntIndex++) {
				Array2Par [IntLoc] [IntIndex] = IntLoc;
			}
			Array2Par [IntLoc] [IntLoc - 1] = Array2Par [IntLoc] [IntLoc - 1] + 1;
			Array2Par [IntLoc + 20] [IntLoc] = Array1Par [IntLoc];
			IntGlob = 5;
		};
		var Func1 = function (CharPar1, CharPar2) {
			var CharLoc1 = CharPar1;
			var CharLoc2 = CharLoc1;
			if (CharLoc2 != CharPar2) {
				return Ident1;
			}
			else {
				return Ident2;
			}
		};
		var Func2 = function (StrParI1, StrParI2) {
			var IntLoc = 1;
			while (IntLoc <= 1) {
				if (Func1 (StrParI1 [IntLoc], StrParI2 [IntLoc + 1]) == Ident1) {
					var CharLoc = 'A';
					var IntLoc = IntLoc + 1;
				}
			}
			if (CharLoc >= 'W' && CharLoc <= 'Z') {
				var IntLoc = 7;
			}
			if (CharLoc == 'X') {
				return TRUE;
			}
			else if (StrParI1 > StrParI2) {
				var IntLoc = IntLoc + 7;
				return TRUE;
			}
			else {
				return FALSE;
			}
		};
		var Func3 = function (EnumParIn) {
			var EnumLoc = EnumParIn;
			if (EnumLoc == Ident3) {
				return TRUE;
			}
			return FALSE;
		};
		if (__name__ == '__main__') {
			main (LOOPS);
		}
		__pragma__ ('<use>' +
			'time' +
		'</use>')
		__pragma__ ('<all>')
			__all__.Array1Glob = Array1Glob;
			__all__.Array2Glob = Array2Glob;
			__all__.BoolGlob = BoolGlob;
			__all__.Char1Glob = Char1Glob;
			__all__.Char2Glob = Char2Glob;
			__all__.FALSE = FALSE;
			__all__.Func1 = Func1;
			__all__.Func2 = Func2;
			__all__.Func3 = Func3;
			__all__.Ident1 = Ident1;
			__all__.Ident2 = Ident2;
			__all__.Ident3 = Ident3;
			__all__.Ident4 = Ident4;
			__all__.Ident5 = Ident5;
			__all__.IntGlob = IntGlob;
			__all__.LOOPS = LOOPS;
			__all__.Proc0 = Proc0;
			__all__.Proc1 = Proc1;
			__all__.Proc2 = Proc2;
			__all__.Proc3 = Proc3;
			__all__.Proc4 = Proc4;
			__all__.Proc5 = Proc5;
			__all__.Proc6 = Proc6;
			__all__.Proc7 = Proc7;
			__all__.Proc8 = Proc8;
			__all__.PtrGlb = PtrGlb;
			__all__.PtrGlbNext = PtrGlbNext;
			__all__.Record = Record;
			__all__.TRUE = TRUE;
			__all__.__name__ = __name__;
			__all__.__version__ = __version__;
			__all__.clock = clock;
			__all__.main = main;
			__all__.pystones = pystones;
		__pragma__ ('</all>')
	}) ();
    return __all__;
}
window ['pystone'] = pystone ();
