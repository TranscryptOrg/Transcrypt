"use strict";
// Transcrypt'ed from Python, 2018-03-08 14:46:42
function pysteroids () {
    var __symbols__ = ['__sform__', '__py3.6__', '__esv6__'];
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
    var __proxy__ = false;
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
                for (let symbol of Object.getOwnPropertySymbols (base)) {
                    let descrip = Object.getOwnPropertyDescriptor (base, symbol);
                    Object.defineProperty (cls, symbol, descrip);
                }
            }
            cls.__metaclass__ = meta;
            cls.__name__ = name.startsWith ('py_') ? name.slice (3) : name;
            cls.__bases__ = bases;
            for (var attrib in attribs) {
                var descrip = Object.getOwnPropertyDescriptor (attribs, attrib);
                Object.defineProperty (cls, attrib, descrip);
            }
            for (let symbol of Object.getOwnPropertySymbols (attribs)) {
                let descrip = Object.getOwnPropertyDescriptor (attribs, symbol);
                Object.defineProperty (cls, symbol, descrip);
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
            if ('__getattr__' in this || '__setattr__' in this) {
                instance = new Proxy (instance, {
                    get: function (target, name) {
                        let result = target [name];
                        if (result == undefined) {
                            return target.__getattr__ (name);
                        }
                        else {
                            return result;
                        }
                    },
                    set: function (target, name, value) {
                        try {
                            target.__setattr__ (name, value);
                        }
                        catch (exception) {
                            target [name] = value;
                        }
                        return true;
                    }
                })
            }
            this.__init__.apply (null, [instance] .concat (args));
            return instance;
        }
    };
    __all__.object = object;
    var __class__ = function (name, bases, attribs, meta) {
        if (meta === undefined) {
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
							self.transpiler_version = '3.6.101';
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
							for (var item of iterable) {
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
							for (var item of iterable) {
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
								for (var arg of args) {
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
									for (var arg of args) {
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
        for (let base of aClass.__bases__) {
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
    __all__.getattr = getattr;
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
        if (container === undefined || container === null) {
            return false;
        }
        if (container.__contains__ instanceof Function) {
            return container.__contains__ (element);
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
            if (keyed instanceof Array)
                if (key == +key && key >= 0 && keyed.length > key)
                    return result;
                else
                    throw IndexError (key, new Error());
            else
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
    var float = function (any) {
        if (any == 'inf') {
            return Infinity;
        }
        else if (any == '-inf') {
            return -Infinity;
        }
        else if (any == 'nan') {
            return NaN;
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
    float.__bases__ = [object];
    __all__.float = float;
    var int = function (any) {
        return float (any) | 0
    };
    int.__name__ = 'int';
    int.__bases__ = [object];
    __all__.int = int;
    Number.prototype.__format__ = function (fmt_spec) {
        if (fmt_spec == undefined || fmt_spec.strip ().length == 0) {
			return this.toString ();
        }
        var thousand_sep = false;
        var g_default = false;
        var width = 0;
        var zero = false;
        var alternate = false;
        var sign = '-';
        var align = '>';
        var fill = ' ';
        var precision = undefined;
        var ftype = undefined;
        var val = this.valueOf ();
        var is_negative = val < 0;
        val = Math.abs (val);
        var pad = function (s, width, fill, align) {
            if (fill == undefined) {
                fill = ' ';
            }
            if (align == undefined) {
                align = '>';
            }
            var alt = '';
            var sign = '';
            if (s.startswith (['+', '-'])) {
                sign = s [0];
                s = s.substr (1);
            }
            if (alternate && s.startswith (['0b', '0o', '0x'])) {
                alt = s.slice (0, 2);
                s = s.substr (2);
            }
            var len = s.length + sign.length + alt.length;
            var c = width - len;
            switch (align) {
                case '=':
                    return sign + alt + __mul__ (fill, c) + s;
                case '>':
                    return __mul__ (fill, c) + sign + alt + s;
                case '<':
                    return sign + alt + s + __mul__ (fill, c);
                case '^':
                    var m = ((c % 2) + 2) % 2;
                    var c = Math.floor (c / 2);
                    return __mul__ (fill, c) + sign + alt + s + __mul__ (fill, c + m);
                default:
                    throw ValueError ("Invalid align type: '" + align + "'", new Error ());
            }
        };
        var format_float = function (val) {
            if (val.indexOf ('e+') == -1 && (ftype == 'g' || ftype == 'G')) {
                var parts = val.py_split ('.');
                var d = parts [0];
                var t = parts [1];
                while (t [t.length - 1] == '0') {
                    t = t.slice (0, -1);
                }
                val = t != '' ? '.'.join ([d, t]) : d;
            }
            if (alternate && val.indexOf ('.') == -1) {
                val = val + '.';
            }
            return val;
        };
        if (fmt_spec.endswith (['b', 'c', 'd', 'e', 'E', 'f', 'F', 'g', 'G', 'n', 'o', 'x', 'X', '%'])) {
            ftype = fmt_spec [fmt_spec.length - 1];
            fmt_spec = fmt_spec.slice (0, -1);
            if (ftype == 'n') {
                ftype = Number.isInteger (val) ? 'd' : 'f';
            }
        }
        else {
            ftype = Number.isInteger (val) ? 'd' : 'g';
            g_default = true;
        }
        var parts = fmt_spec.split ('.');
        fmt_spec = parts [0];
        precision = parts [1];
        if (precision != undefined) {
            precision = parseInt (precision);
        }
        if (fmt_spec.length > 0 && fmt_spec [fmt_spec.length - 1] == ',') {
            thousand_sep = true;
            fmt_spec = fmt_spec.slice (0, -1);
        }
        if (fmt_spec.length > 0) {
            var _width = '';
            while (fmt_spec && fmt_spec [fmt_spec.length - 1].isnumeric ()) {
                _width = fmt_spec [fmt_spec.length - 1] + _width;
                fmt_spec = fmt_spec.slice (0, -1);
            }
            if (_width.length > 0) {
                if (_width [0] == '0') {
                    width = parseInt (_width.substr (1));
                    zero = true;
                }
                else {
                    width = parseInt (_width);
                }
            }
            if (fmt_spec.length > 0 && fmt_spec [fmt_spec.length - 1] == '#') {
                alternate = true;
                fmt_spec = fmt_spec.slice (0, -1);
            }
            if (fmt_spec.length > 0 && fmt_spec.endswith (['+', '-', ' '])) {
                sign = fmt_spec [fmt_spec.length - 1];
                fmt_spec = fmt_spec.slice (0, -1);
            }
            if (fmt_spec.length > 0 && fmt_spec.endswith (['<', '>', '=', '^'])) {
                align = fmt_spec [fmt_spec.length - 1];
                fmt_spec = fmt_spec.slice (0, -1);
            }
            if (fmt_spec.length > 0) {
                fill = fmt_spec [0];
            }
        }
        if (isNaN (val)) {
            val = 'nan';
        }
        else if (val == Infinity) {
            val = 'inf';
        }
        else {
            switch (ftype) {
                case 'b':
                    val = Math.floor (val).toString (2);
                    if (alternate) {
                        val = '0b' + val;
                    }
                    break;
                case 'c':
                    val = String.fromCharCode (Math.floor (val));
                    break;
                case 'd':
                    val = Math.floor (val).toString ();
                    if (thousand_sep) {
                        val = val.replace (/\B(?=(\d{3})+(?!\d))/g, ',');
                    }
                    break;
                case 'o':
                    val = Math.floor (val).toString (8);
                    if (alternate) {
                        val = '0o' + val;
                    }
                    break;
                case 'x':
                case 'X':
                    val = Math.floor (val).toString (16);
                    if (alternate) {
                        val = '0x' + val;
                    }
                    break;
                case 'e':
                case 'E':
                    if (precision == undefined) {
                        precision = 6;
                    }
                    var num_exp = val.toExponential (precision).split ('e+');
                    var num = num_exp [0];
                    var exp = num_exp [1];
                    val = num.toString () + 'e+' + pad (exp.toString(), 2, '0');
                    val = format_float (val);
                    break;
                case 'f':
                case 'F':
                case '%':
                    if (precision == undefined) {
                        precision = 6;
                    }
                    if (ftype == '%') {
                        val *= 100;
                    }
                    val = val.toFixed (precision);
                    val = format_float (val);
                    if (ftype == '%') {
                        val += '%';
                    }
                    break;
                case 'g':
                case 'G':
                    if (precision == undefined) {
                        precision = g_default ? 1 : 6;
                    }
                    if (precision == 0) {
                        precision = 1;
                    }
                    var convert_to_exponent = false;
                    if (g_default) {
                        var parts = val.toString ().split ('.');
                        var digit_count = parts [0].length + parts [1].length;
                        if (digit_count >= precision) {
                            convert_to_exponent = true;
                        }
                    }
                    var num_exp = val.toExponential (precision - 1).split ('e+');
                    var num = num_exp [0];
                    var exp = num_exp [1];
                    convert_to_exponent |= !((-4 <= exp && exp < precision));
                    if (convert_to_exponent) {
                        val = num.toString() + 'e+' + pad (exp.toString(), 2, '0');
                    }
                    else {
                        val = val.toFixed (precision - 1 - exp);
                    }
                    val = format_float (val);
                    break;
                default:
                    throw ValueError ("Invalid format type: '" + ftype + "'", new Error ());
            }
        }
        if (ftype === ftype.toUpperCase ()) {
            val = val.toUpperCase ()
        }
        if (ftype != 'c') {
            if (sign == '-') {
                if (is_negative) {
                    val = '-' + val;
                }
            }
            else {
                val = is_negative ? '-' + val : sign + val;
            }
        }
        if (zero) {
            fill = '0';
            align = '=';
        }
        if (width > 0) {
            val = pad (val, width, fill, align);
        }
        return val;
    };
    var bool = function (any) {
        return !!__t__ (any);
    };
    bool.__name__ = 'bool';
    bool.__bases__ = [int];
    __all__.bool = bool;
    var py_typeof = function (anObject) {
        var aType = typeof anObject;
        if (aType == 'object') {
            try {
                return '__class__' in anObject ? anObject.__class__ : object;
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
        if (classinfo instanceof Array) {
            for (let aClass2 of classinfo) {
                if (issubclass (aClass, aClass2)) {
                    return true;
                }
            }
            return false;
        }
        try {
            var aClass2 = aClass;
            if (aClass2 == classinfo) {
                return true;
            }
            else {
                var bases = [].slice.call (aClass2.__bases__);
                while (bases.length) {
                    aClass2 = bases.shift ();
                    if (aClass2 == classinfo) {
                        return true;
                    }
                    if (aClass2.__bases__.length) {
                        bases = [].slice.call (aClass2.__bases__).concat (bases);
                    }
                }
                return false;
            }
        }
        catch (exception) {
            return aClass == classinfo || classinfo == object;
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
        return arguments.length == 1 ? Math.max (...nrOrSeq) : Math.max (...arguments);
    };
    __all__.max = max;
    var min = function (nrOrSeq) {
        return arguments.length == 1 ? Math.min (...nrOrSeq) : Math.min (...arguments);
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
    var format = function (value, fmt_spec) {
        if (value == undefined) {
            return 'None';
        }
        fmt_spec = fmt_spec || '';
        var tval = typeof value;
        switch (tval) {
            case 'number':
            case 'string':
                return value.__format__(fmt_spec);
            case 'boolean':
                return fmt_spec ? (value ? 1 : 0).__format__(fmt_spec) : str (value);
            case 'object':
                if ('__format__' in value) {
                    return value.__format__ (fmt_spec);
                }
                else {
                    return str (value).__format__ (fmt_spec);
                }
            default:
                return str (value).__format__ (fmt_spec);
        }
    }
    __all__.format = format;
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
        for (let item of iterable) {
            if (bool (item)) {
                return true;
            }
        }
        return false;
    }
    function all (iterable) {
        for (let item of iterable) {
            if (! bool (item)) {
                return false;
            }
        }
        return true;
    }
    function sum (iterable) {
        let result = 0;
        for (let item of iterable) {
            result += item;
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
        var instance = iterable ? Array.from (iterable) : [];
        return instance;
    }
    __all__.list = list;
    Array.prototype.__class__ = list;
    list.__name__ = 'list';
    list.__bases__ = [object];
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
    tuple.__bases__ = [object];
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
    set.__bases__ = [object];
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
        if (typeof stringable === 'number')
            return stringable.toString();
        else {
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
        }
    };
    __all__.str = str;
    String.prototype.__class__ = str;
    str.__name__ = 'str';
    str.__bases__ = [object];
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
        if (suffix instanceof Array) {
            for (var i=0;i<suffix.length;i++) {
                if (this.slice (-suffix[i].length) == suffix[i])
                    return true;
            }
        } else
            return suffix == '' || this.slice (-suffix.length) == suffix;
        return false;
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
    };
    String.prototype.__format__ = function (fmt_spec) {
        if (fmt_spec == undefined || fmt_spec.strip ().length == 0) {
			return this.valueOf ();
        }
        var width = 0;
        var align = '<';
        var fill = ' ';
        var val = this.valueOf ();
        var pad = function (s, width, fill, align) {
            var len = s.length;
            var c = width - len;
            switch (align) {
                case '>':
                    return __mul__ (fill, c) + s;
                case '<':
                    return s + __mul__ (fill, c);
                case '^':
                    var m = ((c % 2) + 2) % 2;
                    var c = Math.floor (c / 2);
                    return __mul__ (fill, c) + s + __mul__ (fill, c + m);
                default:
                    return s;
            }
        };
        if (fmt_spec [fmt_spec.length - 1] == 's') {
            fmt_spec = fmt_spec.slice (0, -1);
        }
        if (fmt_spec.length > 0) {
            var _width = '';
            while (fmt_spec && fmt_spec [fmt_spec.length - 1].isnumeric ()) {
                _width = fmt_spec [fmt_spec.length - 1] + _width;
                fmt_spec = fmt_spec.slice (0, -1);
            }
            if (_width.length > 0) {
                width = parseInt (_width);
            }
            if (fmt_spec.length > 0 && fmt_spec.endswith (['<', '>', '^'])) {
                align = fmt_spec [fmt_spec.length - 1];
                fmt_spec = fmt_spec.slice (0, -1);
            }
            if (fmt_spec.length > 0) {
                fill = fmt_spec [0];
            }
        }
        if (width > 0) {
            val = pad (val, width, fill, align);
        }
        return val;
    };
    __setProperty__ (String.prototype, 'format', {
        get: function () {return __get__ (this, function (self) {
            var args = tuple ([] .slice.apply (arguments).slice (1));
            var autoIndex = 0;
            return self.replace (/\{([^\{]*)\}/g, function (match, key) {
                var parts = key.split (':');
                key = parts [0];
                var fmt_spec = parts [1];
                parts = key.split ('!')
                key = parts [0];
                var conversion = parts [1];
                var value = undefined;
                if (key == '') {
                    key = autoIndex++;
                }
                if (key == +key && args [key] != undefined) {
                    value = args [key];
                }
                else {
                    var attr = undefined;
                    var idx = key.indexOf ('.');
                    if (idx != -1) {
                        attr = key.substring (idx + 1);
                        key = key.substring (0, idx);
                    }
                    else {
                        idx = key.indexOf ('[');
                        if (idx != -1) {
                            attr = key.substring (idx + 1).slice (0, -1);
                            key = key.substring (0, idx);
                        }
                    }
                    if ((key == +key) && attr && args [key] != undefined) {
                        value = args [key][attr];
                    }
                    else {
                        for (var index = 0; index < args.length; index++) {
                            if (typeof args [index] == 'object' && args [index][key] != undefined) {
                                if (attr) {
                                    value = args [index][key][attr];
                                }
                                else {
                                    value = args [index][key];
                                }
                                break;
                            }
                        }
                    }
                }
                if (value == undefined) {
                    return match;
                }
                if (conversion == 'r') {
                    value = repr (value);
                }
                else if (conversion == 's') {
                    value = str (value);
                }
                else if (conversion == 'a') {
                    throw ValueError ("Conversion to ascii not yet supported: '" + match + "'", new Error ());
                }
                return format (value, fmt_spec);
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
        strings = Array.from (strings);
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
        if (prefix instanceof Array) {
            for (var i=0;i<prefix.length;i++) {
                if (this.indexOf (prefix [i]) == 0)
                    return true;
            }
        } else
            return this.indexOf (prefix) == 0;
        return false;
    };
    String.prototype.strip = function () {
        return this.trim ();
    };
    String.prototype.upper = function () {
        return this.toUpperCase ();
    };
    String.prototype.__mul__ = function (scalar) {
        var result = '';
        for (var i = 0; i < scalar; i++) {
            result = result + this;
        }
        return result;
    };
    String.prototype.__rmul__ = String.prototype.__mul__;
    function __contains__ (element) {
        return this.hasOwnProperty (element);
    }
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
        __setProperty__ (instance, '__contains__', {value: __contains__, enumerable: false});
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
    dict.__bases__ = [object];
    function __setdoc__ (docString) {
        this.__doc__ = docString;
        return this;
    }
    __setProperty__ (Function.prototype, '__setdoc__', {value: __setdoc__, enumerable: false});
    var __jsmod__ = function (a, b) {
        if (typeof a == 'object' && '__mod__' in a) {
            return a.__mod__ (b);
        }
        else if (typeof b == 'object' && '__rmod__' in b) {
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
        else if (typeof b == 'object' && '__rmod__' in b) {
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
        else if (typeof b == 'object' && '__rmod__' in b) {
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
        else if ((typeof container == 'string' || container instanceof Array) && key < 0) {
            return container [container.length + key];
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
        else if ((typeof container == 'string' || container instanceof Array) && key < 0) {
            container [container.length + key] = value;
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
		'audio', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var logging = {};
					var __name__ = 'audio';
					__nest__ (logging, '', __init__ (__world__.logging));
					var logger = logging.getLogger ('root');
					var load = function (player_element, sourcefile) {
						try {
							var audio_element = document.getElementById (player_element);
							if (!(len (audio_element))) {
								var __except0__ = Exception ("unable to load audio from element '{}'".format (player_element));
								__except0__.__cause__ = null;
								throw __except0__;
							}
							if (len (sourcefile)) {
								audio_element.src = sourcefile;
							}
							return audio_element;
						}
						catch (__except0__) {
							if (isinstance (__except0__, Exception)) {
								var e = __except0__;
								logging.exception (e);
							}
							else {
								throw __except0__;
							}
						}
					};
					var clip = function (filename) {
						var player = new Audio (filename);
						return player;
					};
					var loop = function (filename) {
						var player = new Audio (filename);
						var reset_player = function () {
							player.currentTime = 0;
							player.play ();
						};
						player.addEventListener ('ended', reset_player, false);
						return player;
					};
					__pragma__ ('<use>' +
						'logging' +
					'</use>')
					__pragma__ ('<all>')
						__all__.__name__ = __name__;
						__all__.clip = clip;
						__all__.load = load;
						__all__.logger = logger;
						__all__.loop = loop;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		'controls', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __name__ = 'controls';
					var clamp = __init__ (__world__.utils).clamp;
					var Keyboard = __class__ ('Keyboard', [object], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self) {
							self.keyboard = dict ({0: false});
							self.handlers = dict ({});
						});},
						get key_down () {return __get__ (this, function (self, key) {
							self.keyboard [key.key] = true;
						});},
						get key_up () {return __get__ (this, function (self, key) {
							self.keyboard [key.key] = false;
						});},
						get py_get () {return __get__ (this, function (self, key) {
							return self.keyboard.py_get (key, false);
						});},
						get get_axis () {return __get__ (this, function (self, key) {
							return self.handlers [key].value;
						});},
						get add_handler () {return __get__ (this, function (self, py_name, handler) {
							self.handlers [py_name] = handler;
						});},
						get py_update () {return __get__ (this, function (self, interval) {
							for (var [_, eachhandler] of self.handlers.py_items ()) {
								eachhandler.py_update (self, interval);
							}
						});},
						get py_clear () {return __get__ (this, function (self, axis) {
							self.handlers.py_get (axis).value = 0;
						});}
					});
					var ControlAxis = __class__ ('ControlAxis', [object], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, positive_key, negative_key, attack, decay, deadzone) {
							if (typeof attack == 'undefined' || (attack != null && attack .hasOwnProperty ("__kwargtrans__"))) {;
								var attack = 1;
							};
							if (typeof decay == 'undefined' || (decay != null && decay .hasOwnProperty ("__kwargtrans__"))) {;
								var decay = 0;
							};
							if (typeof deadzone == 'undefined' || (deadzone != null && deadzone .hasOwnProperty ("__kwargtrans__"))) {;
								var deadzone = 0.02;
							};
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'positive_key': var positive_key = __allkwargs0__ [__attrib0__]; break;
											case 'negative_key': var negative_key = __allkwargs0__ [__attrib0__]; break;
											case 'attack': var attack = __allkwargs0__ [__attrib0__]; break;
											case 'decay': var decay = __allkwargs0__ [__attrib0__]; break;
											case 'deadzone': var deadzone = __allkwargs0__ [__attrib0__]; break;
										}
									}
								}
							}
							else {
							}
							self.positive = positive_key;
							self.negative = negative_key;
							self.attack = attack;
							self.decay = decay;
							self.deadzone = deadzone;
							self.value = 0;
						});},
						get py_update () {return __get__ (this, function (self, keyboard, interval) {
							self.value -= (interval * self.decay) * self.value;
							var dz = abs (self.value) < self.deadzone;
							if (keyboard.py_get (self.positive)) {
								var dz = false;
								self.value += interval * self.attack;
							}
							if (keyboard.py_get (self.negative)) {
								var dz = false;
								self.value -= interval * self.attack;
							}
							if (dz) {
								self.value = 0;
							}
							else {
								self.value = clamp (self.value, -(1), 1);
							}
						});}
					});
					__pragma__ ('<use>' +
						'utils' +
					'</use>')
					__pragma__ ('<all>')
						__all__.ControlAxis = ControlAxis;
						__all__.Keyboard = Keyboard;
						__all__.__name__ = __name__;
						__all__.clamp = clamp;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		'logging', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var time = {};
					var warnings = {};
					var __name__ = 'logging';
					__nest__ (time, '', __init__ (__world__.time));
					__nest__ (warnings, '', __init__ (__world__.warnings));
					var __author__ = 'Vinay Sajip <vinay_sajip@red-dove.com>, Carl Allendorph';
					var __status__ = 'experimental';
					var __version__ = '0.5.1.2';
					var __date__ = '15 November 2016';
					var _startTime = time.time ();
					var raiseExceptions = true;
					var logThreads = true;
					var logMultiprocessing = true;
					var logProcesses = true;
					var CRITICAL = 50;
					var FATAL = CRITICAL;
					var ERROR = 40;
					var WARNING = 30;
					var WARN = WARNING;
					var INFO = 20;
					var DEBUG = 10;
					var NOTSET = 0;
					var _levelToName = dict ([[CRITICAL, 'CRITICAL'], [ERROR, 'ERROR'], [WARNING, 'WARNING'], [INFO, 'INFO'], [DEBUG, 'DEBUG'], [NOTSET, 'NOTSET']]);
					var _nameToLevel = dict ({'CRITICAL': CRITICAL, 'FATAL': FATAL, 'ERROR': ERROR, 'WARN': WARNING, 'WARNING': WARNING, 'INFO': INFO, 'DEBUG': DEBUG, 'NOTSET': NOTSET});
					var getLevelName = function (level) {
						return _levelToName.py_get (level) || _nameToLevel.py_get (level) || 'Level {}'.format (level);
					};
					var addLevelName = function (level, levelName) {
						_acquireLock ();
						try {
							_levelToName [level] = levelName;
							_nameToLevel [levelName] = level;
						}
						catch (__except0__) {
							if (isinstance (__except0__, Exception)) {
								var exc = __except0__;
								var __except1__ = exc;
								__except1__.__cause__ = null;
								throw __except1__;
							}
							else {
								throw __except0__;
							}
						}
						finally {
							_releaseLock ();
						}
					};
					var currentframe = function () {
						return null;
					};
					var _srcfile = null;
					var _checkLevel = function (level) {
						if (isinstance (level, int)) {
							var rv = level;
						}
						else if (str (level) == level) {
							if (!__in__ (level, _nameToLevel)) {
								var __except0__ = ValueError ('Unknown level: {}'.format (level));
								__except0__.__cause__ = null;
								throw __except0__;
							}
							var rv = _nameToLevel [level];
						}
						else {
							var __except0__ = py_TypeError ('Level not an integer or a valid string: {}'.format (level));
							__except0__.__cause__ = null;
							throw __except0__;
						}
						return rv;
					};
					var _lock = null;
					var _acquireLock = function () {
						if (_lock) {
							_lock.acquire ();
						}
					};
					var _releaseLock = function () {
						if (_lock) {
							_lock.release ();
						}
					};
					var LogRecord = __class__ ('LogRecord', [object], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, py_name, level, pathname, lineno, msg, args, exc_info, func, sinfo) {
							if (typeof func == 'undefined' || (func != null && func .hasOwnProperty ("__kwargtrans__"))) {;
								var func = null;
							};
							if (typeof sinfo == 'undefined' || (sinfo != null && sinfo .hasOwnProperty ("__kwargtrans__"))) {;
								var sinfo = null;
							};
							var ct = time.time ();
							self.py_name = py_name;
							self.msg = msg;
							if (args && len (args) == 1 && isinstance (args [0], collections.Mapping) && args [0]) {
								if (raiseExceptions) {
									var __except0__ = NotImplementedError ('No Dict Args to Log Record');
									__except0__.__cause__ = null;
									throw __except0__;
								}
							}
							self.args = args;
							self.levelname = getLevelName (level);
							self.levelno = level;
							self.pathname = pathname;
							self.filename = pathname;
							self.module = 'Unknown module';
							self.exc_info = exc_info;
							self.exc_text = null;
							self.stack_info = sinfo;
							self.lineno = lineno;
							self.funcName = func;
							self.created = ct;
							self.msecs = (ct - int (ct)) * 1000;
							self.relativeCreated = (self.created - _startTime) * 1000;
							self.thread = null;
							self.threadName = null;
							self.processName = null;
							self.process = null;
						});},
						get getMessage () {return __get__ (this, function (self) {
							var msg = str (self.msg);
							if (self.args) {
								var msg = msg.format (...self.args);
							}
							return msg;
						});},
						get toDict () {return __get__ (this, function (self) {
							var keysToPick = list (['name', 'msg', 'levelname', 'levelno', 'pathname', 'filename', 'module', 'lineno', 'funcName', 'created', 'asctime', 'msecs', 'relativeCreated', 'thread', 'threadName', 'process']);
							var ret = dict ({});
							for (var k of keysToPick) {
								if (k == 'name') {
									ret [k] = getattr (self, 'py_name', null);
								}
								else {
									ret [k] = getattr (self, k, null);
								}
							}
							ret ['message'] = self.getMessage ();
							return ret;
						});},
						get __str__ () {return __get__ (this, function (self) {
							return '<LogRecord: {}, {}, {}, {}, "{}">'.format (self.py_name, self.levelno, self.pathname, self.lineno, self.msg);
						});},
						get __repr__ () {return __get__ (this, function (self) {
							return str (self);
						});}
					});
					var _logRecordFactory = LogRecord;
					var setLogRecordFactory = function (factory) {
						_logRecordFactory = factory;
					};
					var getLogRecordFactory = function () {
						return _logRecordFactory;
					};
					var makeLogRecord = function (dict) {
						var rv = _logRecordFactory (null, null, '', 0, '', tuple ([]), null, null);
						rv.__dict__.py_update (dict);
						return rv;
					};
					var PercentStyle = __class__ ('PercentStyle', [object], {
						__module__: __name__,
						default_format: '%(message)s',
						asctime_format: '%(asctime)s',
						asctime_search: '%(asctime)',
						get __init__ () {return __get__ (this, function (self, fmt) {
							self._fmt = fmt || self.default_format;
						});},
						get usesTime () {return __get__ (this, function (self) {
							return self._fmt.find (self.asctime_search) >= 0;
						});},
						get format () {return __get__ (this, function (self, record) {
							return __mod__ (self._fmt, record.__dict__);
						});}
					});
					var StrFormatStyle = __class__ ('StrFormatStyle', [PercentStyle], {
						__module__: __name__,
						default_format: '{message}',
						asctime_format: '{asctime}',
						asctime_search: '{asctime',
						get format () {return __get__ (this, function (self, record) {
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'record': var record = __allkwargs0__ [__attrib0__]; break;
										}
									}
								}
							}
							else {
							}
							return self._fmt.format (__kwargtrans__ (record.toDict ()));
						});}
					});
					var StringTemplateStyle = __class__ ('StringTemplateStyle', [PercentStyle], {
						__module__: __name__,
						default_format: '${message}',
						asctime_format: '${asctime}',
						asctime_search: '${asctime}',
						get __init__ () {return __get__ (this, function (self, fmt) {
							self._fmt = fmt || self.default_format;
							self._tpl = Template (self._fmt);
						});},
						get usesTime () {return __get__ (this, function (self) {
							var fmt = self._fmt;
							return fmt.find ('$asctime') >= 0 || fmt.find (self.asctime_format) >= 0;
						});},
						get format () {return __get__ (this, function (self, record) {
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'record': var record = __allkwargs0__ [__attrib0__]; break;
										}
									}
								}
							}
							else {
							}
							return self._tpl.substitute (__kwargtrans__ (record.__dict__));
						});}
					});
					var BASIC_FORMAT = '{levelname}:{name}:{message}';
					var _STYLES = dict ({'{': tuple ([StrFormatStyle, BASIC_FORMAT])});
					var Formatter = __class__ ('Formatter', [object], {
						__module__: __name__,
						converter: time.localtime,
						get __init__ () {return __get__ (this, function (self, format, datefmt, style) {
							if (typeof format == 'undefined' || (format != null && format .hasOwnProperty ("__kwargtrans__"))) {;
								var format = null;
							};
							if (typeof datefmt == 'undefined' || (datefmt != null && datefmt .hasOwnProperty ("__kwargtrans__"))) {;
								var datefmt = null;
							};
							if (typeof style == 'undefined' || (style != null && style .hasOwnProperty ("__kwargtrans__"))) {;
								var style = '{';
							};
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'format': var format = __allkwargs0__ [__attrib0__]; break;
											case 'datefmt': var datefmt = __allkwargs0__ [__attrib0__]; break;
											case 'style': var style = __allkwargs0__ [__attrib0__]; break;
										}
									}
								}
							}
							else {
							}
							if (style != '{') {
								var __except0__ = NotImplementedError ('{} format only');
								__except0__.__cause__ = null;
								throw __except0__;
							}
							self._style = _STYLES [style] [0] (format);
							self._fmt = self._style._fmt;
							self.datefmt = datefmt;
						});},
						default_time_format: '%Y-%m-%d %H:%M:%S',
						default_msec_format: '{},{:03d}',
						get formatTime () {return __get__ (this, function (self, record, datefmt) {
							if (typeof datefmt == 'undefined' || (datefmt != null && datefmt .hasOwnProperty ("__kwargtrans__"))) {;
								var datefmt = null;
							};
							var ct = self.converter (record.created);
							if (datefmt) {
								var s = time.strftime (datefmt, ct);
							}
							else {
								var t = time.strftime (self.default_time_format, ct);
								var s = __mod__ (self.default_msec_format, tuple ([t, record.msecs]));
							}
							return s;
						});},
						get formatException () {return __get__ (this, function (self, ei) {
							return str (ei);
						});},
						get usesTime () {return __get__ (this, function (self) {
							return self._style.usesTime ();
						});},
						get formatMessage () {return __get__ (this, function (self, record) {
							return self._style.format (record);
						});},
						get formatStack () {return __get__ (this, function (self, stack_info) {
							return stack_info;
						});},
						get format () {return __get__ (this, function (self, record) {
							record.message = record.getMessage ();
							if (self.usesTime ()) {
								record.asctime = self.formatTime (record, self.datefmt);
							}
							var s = self.formatMessage (record);
							if (record.exc_info) {
								if (!(record.exc_text)) {
									record.exc_text = self.formatException (record.exc_info);
								}
							}
							if (record.exc_text) {
								if (s [len (s) - 1] != '\n') {
									var s = s + '\n';
									var s = s + record.exc_text;
								}
							}
							if (record.stack_info) {
								if (s [len (s) - 1] != '\n') {
									var s = s + '\n';
									var s = s + self.formatStack (record.stack_info);
								}
							}
							return s;
						});}
					});
					var _defaultFormatter = Formatter ();
					var BufferingFormatter = __class__ ('BufferingFormatter', [object], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, linefmt) {
							if (typeof linefmt == 'undefined' || (linefmt != null && linefmt .hasOwnProperty ("__kwargtrans__"))) {;
								var linefmt = null;
							};
							if (linefmt) {
								self.linefmt = linefmt;
							}
							else {
								self.linefmt = _defaultFormatter;
							}
						});},
						get formatHeader () {return __get__ (this, function (self, records) {
							return '';
						});},
						get formatFooter () {return __get__ (this, function (self, records) {
							return '';
						});},
						get format () {return __get__ (this, function (self, records) {
							var rv = '';
							if (len (records) > 0) {
								var rv = rv + self.formatHeader (records);
								for (var record of records) {
									var rv = rv + self.linefmt.format (record);
									var rv = rv + self.formatFooter (records);
								}
							}
							return rv;
						});}
					});
					var Filter = __class__ ('Filter', [object], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, py_name) {
							if (typeof py_name == 'undefined' || (py_name != null && py_name .hasOwnProperty ("__kwargtrans__"))) {;
								var py_name = '';
							};
							self.py_name = py_name;
							self.nlen = len (py_name);
						});},
						get filter () {return __get__ (this, function (self, record) {
							if (self.nlen == 0) {
								return true;
							}
							else if (self.py_name == record.py_name) {
								return true;
							}
							else if (record.py_name.find (self.py_name, 0, self.nlen) != 0) {
								return false;
							}
							return record.py_name [self.nlen] == '.';
						});}
					});
					var Filterer = __class__ ('Filterer', [object], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self) {
							self.filters = list ([]);
						});},
						get addFilter () {return __get__ (this, function (self, filt) {
							if (!(__in__ (filt, self.filters))) {
								self.filters.append (filt);
							}
						});},
						get removeFilter () {return __get__ (this, function (self, filt) {
							if (__in__ (filt, self.filters)) {
								self.filters.remove (filt);
							}
						});},
						get filter () {return __get__ (this, function (self, record) {
							var rv = true;
							for (var f of self.filters) {
								if (hasattr (f, 'filter')) {
									var result = f.filter (record);
								}
								else {
									var result = f (record);
								}
								if (!(result)) {
									var rv = false;
									break;
								}
							}
							return rv;
						});}
					});
					var ConsoleLogStream = __class__ ('ConsoleLogStream', [object], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self) {
							self.py_name = 'console';
						});},
						get write () {return __get__ (this, function (self, msg) {
							var msg = msg.rstrip ('\n\r');
							if (len (msg) > 0) {
								console.log (msg);
							}
						});}
					});
					var _consoleStream = ConsoleLogStream ();
					var _handlers = dict ({});
					var _handlerList = list ([]);
					var _removeHandlerRef = function (wr) {
						var __left0__ = tuple ([_acquireLock, _releaseLock, _handlerList]);
						var acquire = __left0__ [0];
						var release = __left0__ [1];
						var handlers = __left0__ [2];
						if (acquire && release && handlers) {
							acquire ();
							try {
								if (__in__ (wr, handlers)) {
									handlers.remove (wr);
								}
							}
							finally {
								release ();
							}
						}
					};
					var _addHandlerRef = function (handler) {
						_acquireLock ();
						try {
							_handlerList.append (handler);
						}
						finally {
							_releaseLock ();
						}
					};
					var Handler = __class__ ('Handler', [Filterer], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, level) {
							if (typeof level == 'undefined' || (level != null && level .hasOwnProperty ("__kwargtrans__"))) {;
								var level = NOTSET;
							};
							Filterer.__init__ (self);
							self._name = null;
							self.level = _checkLevel (level);
							self.formatter = null;
							_addHandlerRef (self);
							self.createLock ();
						});},
						get get_name () {return __get__ (this, function (self) {
							return self._name;
						});},
						get set_name () {return __get__ (this, function (self, py_name) {
							_acquireLock ();
							try {
								if (__in__ (self._name, _handlers)) {
									delete _handlers [self._name];
								}
								self._name = py_name;
								if (py_name) {
									_handlers [py_name] = self;
								}
							}
							finally {
								_releaseLock ();
							}
						});},
						get createLock () {return __get__ (this, function (self) {
							self.lock = null;
						});},
						get acquire () {return __get__ (this, function (self) {
							if (self.lock) {
								self.lock.acquire ();
							}
						});},
						get release () {return __get__ (this, function (self) {
							if (self.lock) {
								self.lock.release ();
							}
						});},
						get setLevel () {return __get__ (this, function (self, level) {
							self.level = _checkLevel (level);
						});},
						get format () {return __get__ (this, function (self, record) {
							if (self.formatter) {
								var fmt = self.formatter;
							}
							else {
								var fmt = _defaultFormatter;
							}
							return fmt.format (record);
						});},
						get emit () {return __get__ (this, function (self, record) {
							var __except0__ = NotImplementedError ('Must be implemented by handler');
							__except0__.__cause__ = null;
							throw __except0__;
						});},
						get handle () {return __get__ (this, function (self, record) {
							var rv = self.filter (record);
							if (rv) {
								self.acquire ();
								try {
									self.emit (record);
								}
								finally {
									self.release ();
								}
							}
							return rv;
						});},
						get setFormatter () {return __get__ (this, function (self, fmt) {
							self.formatter = fmt;
						});},
						get flush () {return __get__ (this, function (self) {
							// pass;
						});},
						get close () {return __get__ (this, function (self) {
							_acquireLock ();
							try {
								if (self._name && __in__ (self._name, _handlers)) {
									delete _handlers [self._name];
								}
							}
							finally {
								_releaseLock ();
							}
						});},
						get handleError () {return __get__ (this, function (self, record) {
							if (raiseExceptions) {
								var __except0__ = Exception ('Failed to log: {}'.format (record));
								__except0__.__cause__ = null;
								throw __except0__;
							}
							else {
								_consoleStream.write ('--- Logging Error ---\n');
							}
						});},
						get __repr__ () {return __get__ (this, function (self) {
							var level = getLevelName (self.level);
							return '<{} ({})>'.format (self.__class__.__name__, level);
						});}
					});
					Object.defineProperty (Handler, 'name', property.call (Handler, Handler.get_name, Handler.set_name));;
					var StreamHandler = __class__ ('StreamHandler', [Handler], {
						__module__: __name__,
						terminator: '\n',
						get __init__ () {return __get__ (this, function (self, stream, level) {
							if (typeof stream == 'undefined' || (stream != null && stream .hasOwnProperty ("__kwargtrans__"))) {;
								var stream = null;
							};
							if (typeof level == 'undefined' || (level != null && level .hasOwnProperty ("__kwargtrans__"))) {;
								var level = NOTSET;
							};
							Handler.__init__ (self, level);
							if (stream === null) {
								var stream = _consoleStream;
							}
							self.stream = stream;
						});},
						get flush () {return __get__ (this, function (self) {
							self.acquire ();
							try {
								if (self.stream && hasattr (self.stream, 'flush')) {
									self.stream.flush ();
								}
							}
							finally {
								self.release ();
							}
						});},
						get emit () {return __get__ (this, function (self, record) {
							try {
								var msg = self.format (record);
								var stream = self.stream;
								stream.write (msg);
								stream.write (self.terminator);
								self.flush ();
							}
							catch (__except0__) {
								if (isinstance (__except0__, Exception)) {
									self.handleError (record);
								}
								else {
									throw __except0__;
								}
							}
						});},
						get __repr__ () {return __get__ (this, function (self) {
							var level = getLevelName (self.level);
							var py_name = getattr (self.stream, 'name', '');
							if (py_name) {
								py_name += ' ';
							}
							return '<{} {}({})>'.format (self.__class__.__name__, py_name, level);
						});}
					});
					var FileHandler = __class__ ('FileHandler', [StreamHandler], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, filename, mode, encoding, delay) {
							if (typeof mode == 'undefined' || (mode != null && mode .hasOwnProperty ("__kwargtrans__"))) {;
								var mode = 'a';
							};
							if (typeof encoding == 'undefined' || (encoding != null && encoding .hasOwnProperty ("__kwargtrans__"))) {;
								var encoding = null;
							};
							if (typeof delay == 'undefined' || (delay != null && delay .hasOwnProperty ("__kwargtrans__"))) {;
								var delay = false;
							};
							var __except0__ = NotImplementedError ('No Filesystem for FileHandler');
							__except0__.__cause__ = null;
							throw __except0__;
						});}
					});
					var _StderrHandler = __class__ ('_StderrHandler', [StreamHandler], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, level) {
							if (typeof level == 'undefined' || (level != null && level .hasOwnProperty ("__kwargtrans__"))) {;
								var level = NOTSET;
							};
							StreamHandler.__init__ (self, null, level);
						});},
						get _getStream () {return __get__ (this, function (self) {
							return _consoleStream;
						});}
					});
					Object.defineProperty (_StderrHandler, 'stream', property.call (_StderrHandler, _StderrHandler._getStream));;
					var _defaultLastResort = _StderrHandler (WARNING);
					var lastResort = _defaultLastResort;
					var PlaceHolder = __class__ ('PlaceHolder', [object], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, alogger) {
							var n = alogger.py_name;
							self.loggerMap = dict ([[n, alogger]]);
						});},
						get append () {return __get__ (this, function (self, alogger) {
							var n = alogger.py_name;
							if (!__in__ (n, self.loggerMap.py_keys ())) {
								self.loggerMap [n] = alogger;
							}
						});}
					});
					var setLoggerClass = function (klass) {
						if (klass != Logger) {
							if (!(issubclass (klass, Logger))) {
								var __except0__ = py_TypeError ('logger not derived from logging.Logger: ' + klass.__name__);
								__except0__.__cause__ = null;
								throw __except0__;
							}
						}
						_loggerClass = klass;
					};
					var getLoggerClass = function () {
						return _loggerClass;
					};
					var Manager = __class__ ('Manager', [object], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, rootnode) {
							self.root = rootnode;
							self.disable = 0;
							self.emittedNoHandlerWarning = false;
							self.loggerDict = dict ({});
							self.loggerClass = null;
							self.logRecordFactory = null;
						});},
						get getLogger () {return __get__ (this, function (self, py_name) {
							var rv = null;
							if (!(isinstance (py_name, str))) {
								var __except0__ = py_TypeError ('A logger name must be a string');
								__except0__.__cause__ = null;
								throw __except0__;
							}
							_acquireLock ();
							try {
								if (__in__ (py_name, self.loggerDict)) {
									var rv = self.loggerDict [py_name];
									if (isinstance (rv, PlaceHolder)) {
										var ph = rv;
										var rv = self.loggerClass || _loggerClass (py_name);
										rv.manager = self;
										self.loggerDict [py_name] = rv;
										self._fixupChildren (ph, rv);
										self._fixupParents (rv);
									}
								}
								else {
									var rv = self.loggerClass || _loggerClass (py_name);
									rv.manager = self;
									self.loggerDict [py_name] = rv;
									self._fixupParents (rv);
								}
							}
							finally {
								_releaseLock ();
							}
							return rv;
						});},
						get setLoggerClass () {return __get__ (this, function (self, klass) {
							if (klass != Logger) {
								if (!(issubclass (klass, Logger))) {
									var __except0__ = py_TypeError ('logger not derived from logging.Logger: ' + klass.__name__);
									__except0__.__cause__ = null;
									throw __except0__;
								}
							}
							self.loggerClass = klass;
						});},
						get setLogRecordFactory () {return __get__ (this, function (self, factory) {
							self.logRecordFactory = factory;
						});},
						get _fixupParents () {return __get__ (this, function (self, alogger) {
							var py_name = alogger.py_name;
							var i = py_name.rfind ('.');
							var rv = null;
							while (i > 0 && !(rv)) {
								var substr = py_name.__getslice__ (0, i, 1);
								if (!__in__ (substr, self.loggerDict)) {
									self.loggerDict [substr] = PlaceHolder (alogger);
								}
								else {
									var obj = self.loggerDict [substr];
									if (isinstance (obj, Logger)) {
										var rv = obj;
									}
									else {
										assert (isinstance (obj, PlaceHolder));
										obj.append (alogger);
									}
								}
								var i = py_name.rfind ('.', 0, i - 1);
							}
							if (!(rv)) {
								var rv = self.root;
							}
							alogger.parent = rv;
						});},
						get _fixupChildren () {return __get__ (this, function (self, ph, alogger) {
							var py_name = alogger.py_name;
							var namelen = len (py_name);
							for (var c of ph.loggerMap.py_keys ()) {
								var log = ph.loggerMap [c];
								if (!(log.parent.py_name.startswith (py_name))) {
									alogger.parent = log.parent;
									log.parent = alogger;
								}
							}
						});}
					});
					var Logger = __class__ ('Logger', [Filterer], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, py_name, level) {
							if (typeof level == 'undefined' || (level != null && level .hasOwnProperty ("__kwargtrans__"))) {;
								var level = NOTSET;
							};
							Filterer.__init__ (self);
							self.py_name = py_name;
							self.level = _checkLevel (level);
							self.parent = null;
							self.propagate = true;
							self.handlers = list ([]);
							self.disabled = false;
						});},
						get setLevel () {return __get__ (this, function (self, level) {
							self.level = _checkLevel (level);
						});},
						get debug () {return __get__ (this, function (self, msg) {
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
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
							if (self.isEnabledFor (DEBUG)) {
								self._log (DEBUG, msg, args, __kwargtrans__ (kwargs));
							}
						});},
						get info () {return __get__ (this, function (self, msg) {
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
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
							if (self.isEnabledFor (INFO)) {
								self._log (INFO, msg, args, __kwargtrans__ (kwargs));
							}
						});},
						get warning () {return __get__ (this, function (self, msg) {
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
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
							if (self.isEnabledFor (WARNING)) {
								self._log (WARNING, msg, args, __kwargtrans__ (kwargs));
							}
						});},
						get warn () {return __get__ (this, function (self, msg) {
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
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
							warnings.warn_explicit ('The `warn` method is deprecated - use `warning`', DeprecationWarning, 'logging/__init__.py', 1388, 'logging');
							self.warning (msg, ...args, __kwargtrans__ (kwargs));
						});},
						get error () {return __get__ (this, function (self, msg) {
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
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
							if (self.isEnabledFor (ERROR)) {
								self._log (ERROR, msg, args, __kwargtrans__ (kwargs));
							}
						});},
						get exception () {return __get__ (this, function (self, msg) {
							var exc_info = true;
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
											case 'exc_info': var exc_info = __allkwargs0__ [__attrib0__]; break;
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
							self.error (msg, ...args, __kwargtrans__ (__merge__ ({exc_info: exc_info}, kwargs)));
						});},
						get critical () {return __get__ (this, function (self, msg) {
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
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
							if (self.isEnabledFor (CRITICAL)) {
								self._log (CRITICAL, msg, args, __kwargtrans__ (kwargs));
							}
							var fatal = critical;
						});},
						get log () {return __get__ (this, function (self, level, msg) {
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'level': var level = __allkwargs0__ [__attrib0__]; break;
											case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
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
							if (!(isinstance (level, int))) {
								if (raiseExceptions) {
									var __except0__ = py_TypeError ('level must be an integer');
									__except0__.__cause__ = null;
									throw __except0__;
								}
								else {
									return ;
								}
							}
							if (self.isEnabledFor (level)) {
								self._log (level, msg, args, __kwargtrans__ (kwargs));
							}
						});},
						get findCaller () {return __get__ (this, function (self, stack_info) {
							if (typeof stack_info == 'undefined' || (stack_info != null && stack_info .hasOwnProperty ("__kwargtrans__"))) {;
								var stack_info = false;
							};
							var f = currentframe ();
							var rv = tuple (['(unknown file)', 0, '(unknown function)', null]);
							return rv;
						});},
						get makeRecord () {return __get__ (this, function (self, py_name, level, fn, lno, msg, args, exc_info, func, extra, sinfo) {
							if (typeof func == 'undefined' || (func != null && func .hasOwnProperty ("__kwargtrans__"))) {;
								var func = null;
							};
							if (typeof extra == 'undefined' || (extra != null && extra .hasOwnProperty ("__kwargtrans__"))) {;
								var extra = null;
							};
							if (typeof sinfo == 'undefined' || (sinfo != null && sinfo .hasOwnProperty ("__kwargtrans__"))) {;
								var sinfo = null;
							};
							var rv = _logRecordFactory (py_name, level, fn, lno, msg, args, exc_info, func, sinfo);
							if (extra !== null) {
								for (var key of extra) {
									if (__in__ (key, list (['message', 'asctime'])) || __in__ (key, rv.__dict__)) {
										var __except0__ = KeyError (__mod__ ('Attempt to overwrite %r in LogRecord', key));
										__except0__.__cause__ = null;
										throw __except0__;
									}
									rv.__dict__ [key] = extra [key];
								}
							}
							return rv;
						});},
						get _log () {return __get__ (this, function (self, level, msg, args, exc_info, extra, stack_info) {
							if (typeof exc_info == 'undefined' || (exc_info != null && exc_info .hasOwnProperty ("__kwargtrans__"))) {;
								var exc_info = null;
							};
							if (typeof extra == 'undefined' || (extra != null && extra .hasOwnProperty ("__kwargtrans__"))) {;
								var extra = null;
							};
							if (typeof stack_info == 'undefined' || (stack_info != null && stack_info .hasOwnProperty ("__kwargtrans__"))) {;
								var stack_info = false;
							};
							var sinfo = null;
							if (_srcfile) {
								try {
									var __left0__ = self.findCaller (stack_info);
									var fn = __left0__ [0];
									var lno = __left0__ [1];
									var func = __left0__ [2];
									var sinfo = __left0__ [3];
								}
								catch (__except0__) {
									if (isinstance (__except0__, ValueError)) {
										var __left0__ = tuple (['(unknown file)', 0, '(unknown function)']);
										var fn = __left0__ [0];
										var lno = __left0__ [1];
										var func = __left0__ [2];
									}
									else {
										throw __except0__;
									}
								}
							}
							else {
								var __left0__ = tuple (['(unknown file)', 0, '(unknown function)']);
								var fn = __left0__ [0];
								var lno = __left0__ [1];
								var func = __left0__ [2];
							}
							var record = self.makeRecord (self.py_name, level, fn, lno, msg, args, exc_info, func, extra, sinfo);
							self.handle (record);
						});},
						get handle () {return __get__ (this, function (self, record) {
							if (!(self.disabled) && self.filter (record)) {
								self.callHandlers (record);
							}
						});},
						get addHandler () {return __get__ (this, function (self, hdlr) {
							_acquireLock ();
							try {
								if (!(__in__ (hdlr, self.handlers))) {
									self.handlers.append (hdlr);
								}
							}
							finally {
								_releaseLock ();
							}
						});},
						get removeHandler () {return __get__ (this, function (self, hdlr) {
							_acquireLock ();
							try {
								if (__in__ (hdlr, self.handlers)) {
									self.handlers.remove (hdlr);
								}
							}
							finally {
								_releaseLock ();
							}
						});},
						get hasHandlers () {return __get__ (this, function (self) {
							var c = self;
							var rv = false;
							while (c) {
								if (len (c.handlers) > 0) {
									var rv = true;
									break;
								}
								if (!(c.propagate)) {
									break;
								}
								else {
									var c = c.parent;
								}
							}
							return rv;
						});},
						get callHandlers () {return __get__ (this, function (self, record) {
							var c = self;
							var found = 0;
							while (c) {
								for (var hdlr of c.handlers) {
									var found = found + 1;
									if (record.levelno >= hdlr.level) {
										hdlr.handle (record);
									}
								}
								if (!(c.propagate)) {
									var c = null;
								}
								else {
									var c = c.parent;
								}
							}
							if (found == 0) {
								if (lastResort) {
									if (record.levelno >= lastResort.level) {
										lastResort.handle (record);
									}
								}
								else if (raiseExceptions && !(self.manager.emittedNoHandlerWarning)) {
									_consoleStream.write ('No handlers could be found for logger "{}"'.format (self.py_name));
									self.manager.emittedNoHandlerWarning = true;
								}
							}
						});},
						get getEffectiveLevel () {return __get__ (this, function (self) {
							var logger = self;
							while (logger) {
								if (logger.level) {
									return logger.level;
								}
								var logger = logger.parent;
							}
							return NOTSET;
						});},
						get isEnabledFor () {return __get__ (this, function (self, level) {
							if (self.manager.disable >= level) {
								return false;
							}
							return level >= self.getEffectiveLevel ();
						});},
						get getChild () {return __get__ (this, function (self, suffix) {
							if (self.root !== self) {
								var suffix = '.'.join (tuple ([self.py_name, suffix]));
							}
							return self.manager.getLogger (suffix);
						});},
						get __repr__ () {return __get__ (this, function (self) {
							var level = getLevelName (self.getEffectiveLevel ());
							return '<{} {} ({})>'.format (self.__class__.__name__, self.py_name, level);
						});}
					});
					var RootLogger = __class__ ('RootLogger', [Logger], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, level) {
							Logger.__init__ (self, 'root', level);
						});}
					});
					var _loggerClass = Logger;
					var LoggerAdapter = __class__ ('LoggerAdapter', [object], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, logger, extra) {
							self.logger = logger;
							self.extra = extra;
						});},
						get process () {return __get__ (this, function (self, msg, kwargs) {
							kwargs ['extra'] = self.extra;
							return tuple ([msg, kwargs]);
						});},
						get debug () {return __get__ (this, function (self, msg) {
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
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
							self.log (DEBUG, msg, ...args, __kwargtrans__ (kwargs));
						});},
						get info () {return __get__ (this, function (self, msg) {
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
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
							self.log (INFO, msg, ...args, __kwargtrans__ (kwargs));
						});},
						get warning () {return __get__ (this, function (self, msg) {
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
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
							self.log (WARNING, msg, ...args, __kwargtrans__ (kwargs));
						});},
						get warn () {return __get__ (this, function (self, msg) {
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
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
							warnings.warn_explicit ('The `warn` method is deprecated - use `warning`', DeprecationWarning, 'logging/__init__.py', 1719, 'logging');
							self.warning (msg, ...args, __kwargtrans__ (kwargs));
						});},
						get error () {return __get__ (this, function (self, msg) {
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
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
							self.log (ERROR, msg, ...args, __kwargtrans__ (kwargs));
						});},
						get exception () {return __get__ (this, function (self, msg) {
							var exc_info = true;
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
											case 'exc_info': var exc_info = __allkwargs0__ [__attrib0__]; break;
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
							self.log (ERROR, msg, ...args, __kwargtrans__ (__merge__ ({exc_info: exc_info}, kwargs)));
						});},
						get critical () {return __get__ (this, function (self, msg) {
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
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
							self.log (CRITICAL, msg, ...args, __kwargtrans__ (kwargs));
						});},
						get log () {return __get__ (this, function (self, level, msg) {
							var kwargs = dict ();
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'level': var level = __allkwargs0__ [__attrib0__]; break;
											case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
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
							if (self.isEnabledFor (level)) {
								var __left0__ = self.process (msg, kwargs);
								var msg = __left0__ [0];
								var kwargs = __left0__ [1];
								self.logger._log (level, msg, args, __kwargtrans__ (kwargs));
							}
						});},
						get isEnabledFor () {return __get__ (this, function (self, level) {
							if (self.logger.manager.disable >= level) {
								return false;
							}
							return level >= self.getEffectiveLevel ();
						});},
						get setLevel () {return __get__ (this, function (self, level) {
							self.logger.setLevel (level);
						});},
						get getEffectiveLevel () {return __get__ (this, function (self) {
							return self.logger.getEffectiveLevel ();
						});},
						get hasHandlers () {return __get__ (this, function (self) {
							return self.logger.hasHandlers ();
						});},
						get __repr__ () {return __get__ (this, function (self) {
							var logger = self.logger;
							var level = getLevelName (logger.getEffectiveLevel ());
							return '<{} {} ({})>'.format (self.__class__.__name__, logger.py_name, level);
						});}
					});
					var root = RootLogger (WARNING);
					Logger.root = root;
					Logger.manager = Manager (Logger.root);
					root.manager = Logger.manager;
					var _resetLogging = function () {
						var _handlerList = list ([]);
						var _handlers = dict ({});
						root = RootLogger (WARNING);
						Logger.root = root;
						Logger.manager = Manager (Logger.root);
						root.manager = Logger.manager;
					};
					var basicConfig = function () {
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
						}
						else {
						}
						_acquireLock ();
						try {
							if (len (root.handlers) == 0) {
								var handlers = kwargs.py_pop ('handlers', null);
								if (handlers !== null) {
									if (__in__ ('stream', kwargs)) {
										var __except0__ = ValueError ("'stream' should not be specified together with 'handlers'");
										__except0__.__cause__ = null;
										throw __except0__;
									}
								}
								if (handlers === null) {
									var stream = kwargs.py_pop ('stream', null);
									var h = StreamHandler (stream);
									var handlers = list ([h]);
								}
								var dfs = kwargs.py_pop ('datefmt', null);
								var style = kwargs.py_pop ('style', '{');
								if (!__in__ (style, _STYLES)) {
									var __except0__ = ValueError ('Style must be one of: {}'.format (','.join (_STYLES.py_keys ())));
									__except0__.__cause__ = null;
									throw __except0__;
								}
								var fs = kwargs.py_pop ('format', _STYLES [style] [1]);
								var fmt = Formatter (fs, dfs, style);
								for (var h of handlers) {
									if (h.formatter === null) {
										h.setFormatter (fmt);
									}
									root.addHandler (h);
								}
								var level = kwargs.py_pop ('level', null);
								if (level !== null) {
									root.setLevel (level);
								}
								if (len (kwargs) > 0) {
									var py_keys = ', '.join (kwargs.py_keys ());
									var __except0__ = ValueError ('Unrecognised argument(s): {}'.format (py_keys));
									__except0__.__cause__ = null;
									throw __except0__;
								}
							}
						}
						finally {
							_releaseLock ();
						}
					};
					var getLogger = function (py_name) {
						if (typeof py_name == 'undefined' || (py_name != null && py_name .hasOwnProperty ("__kwargtrans__"))) {;
							var py_name = null;
						};
						if (py_name) {
							return Logger.manager.getLogger (py_name);
						}
						else {
							return root;
						}
					};
					var critical = function (msg) {
						var kwargs = dict ();
						if (arguments.length) {
							var __ilastarg0__ = arguments.length - 1;
							if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
								var __allkwargs0__ = arguments [__ilastarg0__--];
								for (var __attrib0__ in __allkwargs0__) {
									switch (__attrib0__) {
										case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
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
						if (len (root.handlers) == 0) {
							basicConfig ();
						}
						root.critical (msg, ...args, __kwargtrans__ (kwargs));
					};
					var fatal = critical;
					var error = function (msg) {
						var kwargs = dict ();
						if (arguments.length) {
							var __ilastarg0__ = arguments.length - 1;
							if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
								var __allkwargs0__ = arguments [__ilastarg0__--];
								for (var __attrib0__ in __allkwargs0__) {
									switch (__attrib0__) {
										case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
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
						if (len (root.handlers) == 0) {
							basicConfig ();
						}
						root.error (msg, ...args, __kwargtrans__ (kwargs));
					};
					var exception = function (msg) {
						var exc_info = true;
						var kwargs = dict ();
						if (arguments.length) {
							var __ilastarg0__ = arguments.length - 1;
							if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
								var __allkwargs0__ = arguments [__ilastarg0__--];
								for (var __attrib0__ in __allkwargs0__) {
									switch (__attrib0__) {
										case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
										case 'exc_info': var exc_info = __allkwargs0__ [__attrib0__]; break;
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
						error (msg, ...args, __kwargtrans__ (__merge__ ({exc_info: exc_info}, kwargs)));
					};
					var warning = function (msg) {
						var kwargs = dict ();
						if (arguments.length) {
							var __ilastarg0__ = arguments.length - 1;
							if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
								var __allkwargs0__ = arguments [__ilastarg0__--];
								for (var __attrib0__ in __allkwargs0__) {
									switch (__attrib0__) {
										case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
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
						if (len (root.handlers) == 0) {
							basicConfig ();
						}
						root.warning (msg, ...args, __kwargtrans__ (kwargs));
					};
					var warn = function (msg) {
						var kwargs = dict ();
						if (arguments.length) {
							var __ilastarg0__ = arguments.length - 1;
							if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
								var __allkwargs0__ = arguments [__ilastarg0__--];
								for (var __attrib0__ in __allkwargs0__) {
									switch (__attrib0__) {
										case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
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
						warnings.warn_explicit ('The `warn` method is deprecated - use `warning`', DeprecationWarning, 'logging/__init__.py', 1944, 'logging');
						warning (msg, ...args, __kwargtrans__ (kwargs));
					};
					var info = function (msg) {
						var kwargs = dict ();
						if (arguments.length) {
							var __ilastarg0__ = arguments.length - 1;
							if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
								var __allkwargs0__ = arguments [__ilastarg0__--];
								for (var __attrib0__ in __allkwargs0__) {
									switch (__attrib0__) {
										case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
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
						if (len (root.handlers) == 0) {
							basicConfig ();
						}
						root.info (msg, ...args, __kwargtrans__ (kwargs));
					};
					var debug = function (msg) {
						var kwargs = dict ();
						if (arguments.length) {
							var __ilastarg0__ = arguments.length - 1;
							if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
								var __allkwargs0__ = arguments [__ilastarg0__--];
								for (var __attrib0__ in __allkwargs0__) {
									switch (__attrib0__) {
										case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
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
						if (len (root.handlers) == 0) {
							basicConfig ();
						}
						root.debug (msg, ...args, __kwargtrans__ (kwargs));
					};
					var log = function (level, msg) {
						var kwargs = dict ();
						if (arguments.length) {
							var __ilastarg0__ = arguments.length - 1;
							if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
								var __allkwargs0__ = arguments [__ilastarg0__--];
								for (var __attrib0__ in __allkwargs0__) {
									switch (__attrib0__) {
										case 'level': var level = __allkwargs0__ [__attrib0__]; break;
										case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
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
						if (len (root.handlers) == 0) {
							basicConfig ();
						}
						root.log (level, msg, ...args, __kwargtrans__ (kwargs));
					};
					var disable = function (level) {
						root.manager.disable = level;
					};
					var shutdown = function (handlerList) {
						if (typeof handlerList == 'undefined' || (handlerList != null && handlerList .hasOwnProperty ("__kwargtrans__"))) {;
							var handlerList = _handlerList;
						};
						for (var wr of py_reversed (handlerList.__getslice__ (0, null, 1))) {
							try {
								var h = wr ();
								if (h) {
									try {
										h.acquire ();
										h.flush ();
										h.close ();
									}
									catch (__except0__) {
										if (isinstance (__except0__, tuple ([OSError, ValueError]))) {
											// pass;
										}
										else {
											throw __except0__;
										}
									}
									finally {
										h.release ();
									}
								}
							}
							catch (__except0__) {
								if (isinstance (__except0__, Exception)) {
									var exc = __except0__;
									if (raiseExceptions) {
										var __except1__ = exc;
										__except1__.__cause__ = null;
										throw __except1__;
									}
								}
								else {
									throw __except0__;
								}
							}
						}
					};
					var NullHandler = __class__ ('NullHandler', [Handler], {
						__module__: __name__,
						get handle () {return __get__ (this, function (self, record) {
						});},
						get emit () {return __get__ (this, function (self, record) {
						});},
						get createLock () {return __get__ (this, function (self) {
							self.lock = null;
						});}
					});
					var _warnings_showwarning = null;
					var _showwarning = function (message, category, filename, lineno, file, line) {
						if (typeof file == 'undefined' || (file != null && file .hasOwnProperty ("__kwargtrans__"))) {;
							var file = null;
						};
						if (typeof line == 'undefined' || (line != null && line .hasOwnProperty ("__kwargtrans__"))) {;
							var line = null;
						};
						if (file !== null) {
							if (_warnings_showwarning !== null) {
								_warnings_showwarning (message, category, filename, lineno, file, line);
							}
						}
						else {
							var s = warnings.formatwarning (message, category, filename, lineno, line);
							var logger = getLogger ('py.warnings');
							if (!(logger.handlers)) {
								logger.addHandler (NullHandler ());
							}
							logger.warning (s);
						}
					};
					var captureWarnings = function (capture) {
						if (capture) {
							if (_warnings_showwarning === null) {
								_warnings_showwarning = warnings.showwarning;
								warnings.setShowWarning (_showwarning);
							}
						}
						else if (_warnings_showwarning !== null) {
							warnings.setShowWarnings (_warnings_showwarning);
							_warnings_showwarning = null;
						}
					};
					__pragma__ ('<use>' +
						'time' +
						'warnings' +
					'</use>')
					__pragma__ ('<all>')
						__all__.BASIC_FORMAT = BASIC_FORMAT;
						__all__.BufferingFormatter = BufferingFormatter;
						__all__.CRITICAL = CRITICAL;
						__all__.ConsoleLogStream = ConsoleLogStream;
						__all__.DEBUG = DEBUG;
						__all__.ERROR = ERROR;
						__all__.FATAL = FATAL;
						__all__.FileHandler = FileHandler;
						__all__.Filter = Filter;
						__all__.Filterer = Filterer;
						__all__.Formatter = Formatter;
						__all__.Handler = Handler;
						__all__.INFO = INFO;
						__all__.LogRecord = LogRecord;
						__all__.Logger = Logger;
						__all__.LoggerAdapter = LoggerAdapter;
						__all__.Manager = Manager;
						__all__.NOTSET = NOTSET;
						__all__.NullHandler = NullHandler;
						__all__.PercentStyle = PercentStyle;
						__all__.PlaceHolder = PlaceHolder;
						__all__.RootLogger = RootLogger;
						__all__.StrFormatStyle = StrFormatStyle;
						__all__.StreamHandler = StreamHandler;
						__all__.StringTemplateStyle = StringTemplateStyle;
						__all__.WARN = WARN;
						__all__.WARNING = WARNING;
						__all__._STYLES = _STYLES;
						__all__._StderrHandler = _StderrHandler;
						__all__.__author__ = __author__;
						__all__.__date__ = __date__;
						__all__.__name__ = __name__;
						__all__.__status__ = __status__;
						__all__.__version__ = __version__;
						__all__._acquireLock = _acquireLock;
						__all__._addHandlerRef = _addHandlerRef;
						__all__._checkLevel = _checkLevel;
						__all__._consoleStream = _consoleStream;
						__all__._defaultFormatter = _defaultFormatter;
						__all__._defaultLastResort = _defaultLastResort;
						__all__._handlerList = _handlerList;
						__all__._handlers = _handlers;
						__all__._levelToName = _levelToName;
						__all__._lock = _lock;
						__all__._logRecordFactory = _logRecordFactory;
						__all__._loggerClass = _loggerClass;
						__all__._nameToLevel = _nameToLevel;
						__all__._releaseLock = _releaseLock;
						__all__._removeHandlerRef = _removeHandlerRef;
						__all__._resetLogging = _resetLogging;
						__all__._showwarning = _showwarning;
						__all__._srcfile = _srcfile;
						__all__._startTime = _startTime;
						__all__._warnings_showwarning = _warnings_showwarning;
						__all__.addLevelName = addLevelName;
						__all__.basicConfig = basicConfig;
						__all__.captureWarnings = captureWarnings;
						__all__.critical = critical;
						__all__.currentframe = currentframe;
						__all__.debug = debug;
						__all__.disable = disable;
						__all__.error = error;
						__all__.exception = exception;
						__all__.fatal = fatal;
						__all__.getLevelName = getLevelName;
						__all__.getLogRecordFactory = getLogRecordFactory;
						__all__.getLogger = getLogger;
						__all__.getLoggerClass = getLoggerClass;
						__all__.info = info;
						__all__.lastResort = lastResort;
						__all__.log = log;
						__all__.logMultiprocessing = logMultiprocessing;
						__all__.logProcesses = logProcesses;
						__all__.logThreads = logThreads;
						__all__.makeLogRecord = makeLogRecord;
						__all__.raiseExceptions = raiseExceptions;
						__all__.root = root;
						__all__.setLogRecordFactory = setLogRecordFactory;
						__all__.setLoggerClass = setLoggerClass;
						__all__.shutdown = shutdown;
						__all__.warn = warn;
						__all__.warning = warning;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		'math', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __name__ = 'math';
					var pi = Math.PI;
					var e = Math.E;
					var exp = Math.exp;
					var expm1 = function (x) {
						return Math.exp (x) - 1;
					};
					var log = function (x, base) {
						return (base === undefined ? Math.log (x) : Math.log (x) / Math.log (base));
					};
					var log1p = function (x) {
						return Math.log (x + 1);
					};
					var log2 = function (x) {
						return Math.log (x) / Math.LN2;
					};
					var log10 = function (x) {
						return Math.log (x) / Math.LN10;
					};
					var pow = Math.pow;
					var sqrt = Math.sqrt;
					var sin = Math.sin;
					var cos = Math.cos;
					var tan = Math.tan;
					var asin = Math.asin;
					var acos = Math.acos;
					var atan = Math.atan;
					var atan2 = Math.atan2;
					var hypot = Math.hypot;
					var degrees = function (x) {
						return (x * 180) / Math.PI;
					};
					var radians = function (x) {
						return (x * Math.PI) / 180;
					};
					var sinh = Math.sinh;
					var cosh = Math.cosh;
					var tanh = Math.tanh;
					var asinh = Math.asinh;
					var acosh = Math.acosh;
					var atanh = Math.atanh;
					var floor = Math.floor;
					var ceil = Math.ceil;
					var trunc = Math.trunc;
					var isnan = isNaN;
					var inf = Infinity;
					var nan = NaN;
					__pragma__ ('<all>')
						__all__.__name__ = __name__;
						__all__.acos = acos;
						__all__.acosh = acosh;
						__all__.asin = asin;
						__all__.asinh = asinh;
						__all__.atan = atan;
						__all__.atan2 = atan2;
						__all__.atanh = atanh;
						__all__.ceil = ceil;
						__all__.cos = cos;
						__all__.cosh = cosh;
						__all__.degrees = degrees;
						__all__.e = e;
						__all__.exp = exp;
						__all__.expm1 = expm1;
						__all__.floor = floor;
						__all__.hypot = hypot;
						__all__.inf = inf;
						__all__.isnan = isnan;
						__all__.log = log;
						__all__.log10 = log10;
						__all__.log1p = log1p;
						__all__.log2 = log2;
						__all__.nan = nan;
						__all__.pi = pi;
						__all__.pow = pow;
						__all__.radians = radians;
						__all__.sin = sin;
						__all__.sinh = sinh;
						__all__.sqrt = sqrt;
						__all__.tan = tan;
						__all__.tanh = tanh;
						__all__.trunc = trunc;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		'org.threejs', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __name__ = 'org.threejs';
					var _ctor = function (obj) {
						var _c_ = function () {
							var args = tuple ([].slice.apply (arguments).slice (0));
							return new obj (...args);
						};
						return _c_;
					};
					var api = THREE
					var WebGLRenderTargetCube = _ctor (api.WebGLRenderTargetCube);
					var WebGLRenderTarget = _ctor (api.WebGLRenderTarget);
					var WebGLRenderer = _ctor (api.WebGLRenderer);
					var ShaderLib = _ctor (api.ShaderLib);
					var UniformsLib = _ctor (api.UniformsLib);
					var UniformsUtils = _ctor (api.UniformsUtils);
					var ShaderChunk = _ctor (api.ShaderChunk);
					var FogExp2 = _ctor (api.FogExp2);
					var Fog = _ctor (api.Fog);
					var Scene = _ctor (api.Scene);
					var LensFlare = _ctor (api.LensFlare);
					var Sprite = _ctor (api.Sprite);
					var LOD = _ctor (api.LOD);
					var SkinnedMesh = _ctor (api.SkinnedMesh);
					var Skeleton = _ctor (api.Skeleton);
					var Bone = _ctor (api.Bone);
					var Mesh = _ctor (api.Mesh);
					var LineSegments = _ctor (api.LineSegments);
					var LineLoop = _ctor (api.LineLoop);
					var Line = _ctor (api.Line);
					var Points = _ctor (api.Points);
					var Group = _ctor (api.Group);
					var VideoTexture = _ctor (api.VideoTexture);
					var DataTexture = _ctor (api.DataTexture);
					var CompressedTexture = _ctor (api.CompressedTexture);
					var CubeTexture = _ctor (api.CubeTexture);
					var CanvasTexture = _ctor (api.CanvasTexture);
					var DepthTexture = _ctor (api.DepthTexture);
					var Texture = _ctor (api.Texture);
					var CompressedTextureLoader = _ctor (api.CompressedTextureLoader);
					var DataTextureLoader = _ctor (api.DataTextureLoader);
					var CubeTextureLoader = _ctor (api.CubeTextureLoader);
					var TextureLoader = _ctor (api.TextureLoader);
					var ObjectLoader = _ctor (api.ObjectLoader);
					var MaterialLoader = _ctor (api.MaterialLoader);
					var BufferGeometryLoader = _ctor (api.BufferGeometryLoader);
					var DefaultLoadingManager = _ctor (api.DefaultLoadingManager);
					var LoadingManager = _ctor (api.LoadingManager);
					var JSONLoader = _ctor (api.JSONLoader);
					var ImageLoader = _ctor (api.ImageLoader);
					var FontLoader = _ctor (api.FontLoader);
					var FileLoader = _ctor (api.FileLoader);
					var Loader = _ctor (api.Loader);
					var Cache = _ctor (api.Cache);
					var AudioLoader = _ctor (api.AudioLoader);
					var SpotLightShadow = _ctor (api.SpotLightShadow);
					var SpotLight = _ctor (api.SpotLight);
					var PointLight = _ctor (api.PointLight);
					var RectAreaLight = _ctor (api.RectAreaLight);
					var HemisphereLight = _ctor (api.HemisphereLight);
					var DirectionalLightShadow = _ctor (api.DirectionalLightShadow);
					var DirectionalLight = _ctor (api.DirectionalLight);
					var AmbientLight = _ctor (api.AmbientLight);
					var LightShadow = _ctor (api.LightShadow);
					var Light = _ctor (api.Light);
					var StereoCamera = _ctor (api.StereoCamera);
					var PerspectiveCamera = _ctor (api.PerspectiveCamera);
					var OrthographicCamera = _ctor (api.OrthographicCamera);
					var CubeCamera = _ctor (api.CubeCamera);
					var ArrayCamera = _ctor (api.ArrayCamera);
					var Camera = _ctor (api.Camera);
					var AudioListener = _ctor (api.AudioListener);
					var PositionalAudio = _ctor (api.PositionalAudio);
					var AudioContext = _ctor (api.AudioContext);
					var AudioAnalyser = _ctor (api.AudioAnalyser);
					var Audio = _ctor (api.Audio);
					var VectorKeyframeTrack = _ctor (api.VectorKeyframeTrack);
					var StringKeyframeTrack = _ctor (api.StringKeyframeTrack);
					var QuaternionKeyframeTrack = _ctor (api.QuaternionKeyframeTrack);
					var NumberKeyframeTrack = _ctor (api.NumberKeyframeTrack);
					var ColorKeyframeTrack = _ctor (api.ColorKeyframeTrack);
					var BooleanKeyframeTrack = _ctor (api.BooleanKeyframeTrack);
					var PropertyMixer = _ctor (api.PropertyMixer);
					var PropertyBinding = _ctor (api.PropertyBinding);
					var KeyframeTrack = _ctor (api.KeyframeTrack);
					var AnimationUtils = _ctor (api.AnimationUtils);
					var AnimationObjectGroup = _ctor (api.AnimationObjectGroup);
					var AnimationMixer = _ctor (api.AnimationMixer);
					var AnimationClip = _ctor (api.AnimationClip);
					var Uniform = _ctor (api.Uniform);
					var InstancedBufferGeometry = _ctor (api.InstancedBufferGeometry);
					var BufferGeometry = _ctor (api.BufferGeometry);
					var GeometryIdCount = _ctor (api.GeometryIdCount);
					var Geometry = _ctor (api.Geometry);
					var InterleavedBufferAttribute = _ctor (api.InterleavedBufferAttribute);
					var InstancedInterleavedBuffer = _ctor (api.InstancedInterleavedBuffer);
					var InterleavedBuffer = _ctor (api.InterleavedBuffer);
					var InstancedBufferAttribute = _ctor (api.InstancedBufferAttribute);
					var Face3 = _ctor (api.Face3);
					var Object3D = _ctor (api.Object3D);
					var Raycaster = _ctor (api.Raycaster);
					var Layers = _ctor (api.Layers);
					var EventDispatcher = _ctor (api.EventDispatcher);
					var Clock = _ctor (api.Clock);
					var QuaternionLinearInterpolant = _ctor (api.QuaternionLinearInterpolant);
					var LinearInterpolant = _ctor (api.LinearInterpolant);
					var DiscreteInterpolant = _ctor (api.DiscreteInterpolant);
					var CubicInterpolant = _ctor (api.CubicInterpolant);
					var Interpolant = _ctor (api.Interpolant);
					var Triangle = _ctor (api.Triangle);
					var Math = _ctor (api.Math);
					var Spherical = _ctor (api.Spherical);
					var Cylindrical = _ctor (api.Cylindrical);
					var Plane = _ctor (api.Plane);
					var Frustum = _ctor (api.Frustum);
					var Sphere = _ctor (api.Sphere);
					var Ray = _ctor (api.Ray);
					var Matrix4 = _ctor (api.Matrix4);
					var Matrix3 = _ctor (api.Matrix3);
					var Box3 = _ctor (api.Box3);
					var Box2 = _ctor (api.Box2);
					var Line3 = _ctor (api.Line3);
					var Euler = _ctor (api.Euler);
					var Vector3 = _ctor (api.Vector3);
					var Quaternion = _ctor (api.Quaternion);
					var Color = _ctor (api.Color);
					var MorphBlendMesh = _ctor (api.MorphBlendMesh);
					var ImmediateRenderObject = _ctor (api.ImmediateRenderObject);
					var VertexNormalsHelper = _ctor (api.VertexNormalsHelper);
					var SpotLightHelper = _ctor (api.SpotLightHelper);
					var SkeletonHelper = _ctor (api.SkeletonHelper);
					var PointLightHelper = _ctor (api.PointLightHelper);
					var RectAreaLightHelper = _ctor (api.RectAreaLightHelper);
					var HemisphereLightHelper = _ctor (api.HemisphereLightHelper);
					var GridHelper = _ctor (api.GridHelper);
					var PolarGridHelper = _ctor (api.PolarGridHelper);
					var FaceNormalsHelper = _ctor (api.FaceNormalsHelper);
					var DirectionalLightHelper = _ctor (api.DirectionalLightHelper);
					var CameraHelper = _ctor (api.CameraHelper);
					var BoxHelper = _ctor (api.BoxHelper);
					var ArrowHelper = _ctor (api.ArrowHelper);
					var AxisHelper = _ctor (api.AxisHelper);
					var CatmullRomCurve3 = _ctor (api.CatmullRomCurve3);
					var CubicBezierCurve3 = _ctor (api.CubicBezierCurve3);
					var QuadraticBezierCurve3 = _ctor (api.QuadraticBezierCurve3);
					var LineCurve3 = _ctor (api.LineCurve3);
					var ArcCurve = _ctor (api.ArcCurve);
					var EllipseCurve = _ctor (api.EllipseCurve);
					var SplineCurve = _ctor (api.SplineCurve);
					var CubicBezierCurve = _ctor (api.CubicBezierCurve);
					var QuadraticBezierCurve = _ctor (api.QuadraticBezierCurve);
					var LineCurve = _ctor (api.LineCurve);
					var Shape = _ctor (api.Shape);
					var Path = _ctor (api.Path);
					var ShapePath = _ctor (api.ShapePath);
					var Font = _ctor (api.Font);
					var CurvePath = _ctor (api.CurvePath);
					var Curve = _ctor (api.Curve);
					var ShapeUtils = _ctor (api.ShapeUtils);
					var SceneUtils = _ctor (api.SceneUtils);
					var WireframeGeometry = _ctor (api.WireframeGeometry);
					var ParametricGeometry = _ctor (api.ParametricGeometry);
					var ParametricBufferGeometry = _ctor (api.ParametricBufferGeometry);
					var TetrahedronGeometry = _ctor (api.TetrahedronGeometry);
					var TetrahedronBufferGeometry = _ctor (api.TetrahedronBufferGeometry);
					var OctahedronGeometry = _ctor (api.OctahedronGeometry);
					var OctahedronBufferGeometry = _ctor (api.OctahedronBufferGeometry);
					var IcosahedronGeometry = _ctor (api.IcosahedronGeometry);
					var IcosahedronBufferGeometry = _ctor (api.IcosahedronBufferGeometry);
					var DodecahedronGeometry = _ctor (api.DodecahedronGeometry);
					var DodecahedronBufferGeometry = _ctor (api.DodecahedronBufferGeometry);
					var PolyhedronGeometry = _ctor (api.PolyhedronGeometry);
					var PolyhedronBufferGeometry = _ctor (api.PolyhedronBufferGeometry);
					var TubeGeometry = _ctor (api.TubeGeometry);
					var TubeBufferGeometry = _ctor (api.TubeBufferGeometry);
					var TorusKnotGeometry = _ctor (api.TorusKnotGeometry);
					var TorusKnotBufferGeometry = _ctor (api.TorusKnotBufferGeometry);
					var TorusGeometry = _ctor (api.TorusGeometry);
					var TorusBufferGeometry = _ctor (api.TorusBufferGeometry);
					var TextGeometry = _ctor (api.TextGeometry);
					var TextBufferGeometry = _ctor (api.TextBufferGeometry);
					var SphereGeometry = _ctor (api.SphereGeometry);
					var SphereBufferGeometry = _ctor (api.SphereBufferGeometry);
					var RingGeometry = _ctor (api.RingGeometry);
					var RingBufferGeometry = _ctor (api.RingBufferGeometry);
					var PlaneGeometry = _ctor (api.PlaneGeometry);
					var PlaneBufferGeometry = _ctor (api.PlaneBufferGeometry);
					var LatheGeometry = _ctor (api.LatheGeometry);
					var LatheBufferGeometry = _ctor (api.LatheBufferGeometry);
					var ShapeGeometry = _ctor (api.ShapeGeometry);
					var ShapeBufferGeometry = _ctor (api.ShapeBufferGeometry);
					var ExtrudeGeometry = _ctor (api.ExtrudeGeometry);
					var ExtrudeBufferGeometry = _ctor (api.ExtrudeBufferGeometry);
					var EdgesGeometry = _ctor (api.EdgesGeometry);
					var ConeGeometry = _ctor (api.ConeGeometry);
					var ConeBufferGeometry = _ctor (api.ConeBufferGeometry);
					var CylinderGeometry = _ctor (api.CylinderGeometry);
					var CylinderBufferGeometry = _ctor (api.CylinderBufferGeometry);
					var CircleGeometry = _ctor (api.CircleGeometry);
					var CircleBufferGeometry = _ctor (api.CircleBufferGeometry);
					var BoxGeometry = _ctor (api.BoxGeometry);
					var BoxBufferGeometry = _ctor (api.BoxBufferGeometry);
					var ShadowMaterial = _ctor (api.ShadowMaterial);
					var SpriteMaterial = _ctor (api.SpriteMaterial);
					var RawShaderMaterial = _ctor (api.RawShaderMaterial);
					var ShaderMaterial = _ctor (api.ShaderMaterial);
					var PointsMaterial = _ctor (api.PointsMaterial);
					var MeshPhysicalMaterial = _ctor (api.MeshPhysicalMaterial);
					var MeshStandardMaterial = _ctor (api.MeshStandardMaterial);
					var MeshPhongMaterial = _ctor (api.MeshPhongMaterial);
					var MeshToonMaterial = _ctor (api.MeshToonMaterial);
					var MeshNormalMaterial = _ctor (api.MeshNormalMaterial);
					var MeshLambertMaterial = _ctor (api.MeshLambertMaterial);
					var MeshDepthMaterial = _ctor (api.MeshDepthMaterial);
					var MeshBasicMaterial = _ctor (api.MeshBasicMaterial);
					var LineDashedMaterial = _ctor (api.LineDashedMaterial);
					var LineBasicMaterial = _ctor (api.LineBasicMaterial);
					var Material = _ctor (api.Material);
					var Float64BufferAttribute = _ctor (api.Float64BufferAttribute);
					var Float32BufferAttribute = _ctor (api.Float32BufferAttribute);
					var Uint32BufferAttribute = _ctor (api.Uint32BufferAttribute);
					var Int32BufferAttribute = _ctor (api.Int32BufferAttribute);
					var Uint16BufferAttribute = _ctor (api.Uint16BufferAttribute);
					var Int16BufferAttribute = _ctor (api.Int16BufferAttribute);
					var Uint8ClampedBufferAttribute = _ctor (api.Uint8ClampedBufferAttribute);
					var Uint8BufferAttribute = _ctor (api.Uint8BufferAttribute);
					var Int8BufferAttribute = _ctor (api.Int8BufferAttribute);
					var BufferAttribute = _ctor (api.BufferAttribute);
					var REVISION = _ctor (api.REVISION);
					var MOUSE = _ctor (api.MOUSE);
					var CullFaceNone = _ctor (api.CullFaceNone);
					var CullFaceBack = _ctor (api.CullFaceBack);
					var CullFaceFront = _ctor (api.CullFaceFront);
					var CullFaceFrontBack = _ctor (api.CullFaceFrontBack);
					var FrontFaceDirectionCW = _ctor (api.FrontFaceDirectionCW);
					var FrontFaceDirectionCCW = _ctor (api.FrontFaceDirectionCCW);
					var BasicShadowMap = _ctor (api.BasicShadowMap);
					var PCFShadowMap = _ctor (api.PCFShadowMap);
					var PCFSoftShadowMap = _ctor (api.PCFSoftShadowMap);
					var FrontSide = _ctor (api.FrontSide);
					var BackSide = _ctor (api.BackSide);
					var DoubleSide = _ctor (api.DoubleSide);
					var FlatShading = _ctor (api.FlatShading);
					var SmoothShading = _ctor (api.SmoothShading);
					var NoColors = _ctor (api.NoColors);
					var FaceColors = _ctor (api.FaceColors);
					var VertexColors = _ctor (api.VertexColors);
					var NoBlending = _ctor (api.NoBlending);
					var NormalBlending = _ctor (api.NormalBlending);
					var AdditiveBlending = _ctor (api.AdditiveBlending);
					var SubtractiveBlending = _ctor (api.SubtractiveBlending);
					var MultiplyBlending = _ctor (api.MultiplyBlending);
					var CustomBlending = _ctor (api.CustomBlending);
					var AddEquation = _ctor (api.AddEquation);
					var SubtractEquation = _ctor (api.SubtractEquation);
					var ReverseSubtractEquation = _ctor (api.ReverseSubtractEquation);
					var MinEquation = _ctor (api.MinEquation);
					var MaxEquation = _ctor (api.MaxEquation);
					var ZeroFactor = _ctor (api.ZeroFactor);
					var OneFactor = _ctor (api.OneFactor);
					var SrcColorFactor = _ctor (api.SrcColorFactor);
					var OneMinusSrcColorFactor = _ctor (api.OneMinusSrcColorFactor);
					var SrcAlphaFactor = _ctor (api.SrcAlphaFactor);
					var OneMinusSrcAlphaFactor = _ctor (api.OneMinusSrcAlphaFactor);
					var DstAlphaFactor = _ctor (api.DstAlphaFactor);
					var OneMinusDstAlphaFactor = _ctor (api.OneMinusDstAlphaFactor);
					var DstColorFactor = _ctor (api.DstColorFactor);
					var OneMinusDstColorFactor = _ctor (api.OneMinusDstColorFactor);
					var SrcAlphaSaturateFactor = _ctor (api.SrcAlphaSaturateFactor);
					var NeverDepth = _ctor (api.NeverDepth);
					var AlwaysDepth = _ctor (api.AlwaysDepth);
					var LessDepth = _ctor (api.LessDepth);
					var LessEqualDepth = _ctor (api.LessEqualDepth);
					var EqualDepth = _ctor (api.EqualDepth);
					var GreaterEqualDepth = _ctor (api.GreaterEqualDepth);
					var GreaterDepth = _ctor (api.GreaterDepth);
					var NotEqualDepth = _ctor (api.NotEqualDepth);
					var MultiplyOperation = _ctor (api.MultiplyOperation);
					var MixOperation = _ctor (api.MixOperation);
					var AddOperation = _ctor (api.AddOperation);
					var NoToneMapping = _ctor (api.NoToneMapping);
					var LinearToneMapping = _ctor (api.LinearToneMapping);
					var ReinhardToneMapping = _ctor (api.ReinhardToneMapping);
					var Uncharted2ToneMapping = _ctor (api.Uncharted2ToneMapping);
					var CineonToneMapping = _ctor (api.CineonToneMapping);
					var UVMapping = _ctor (api.UVMapping);
					var CubeReflectionMapping = _ctor (api.CubeReflectionMapping);
					var CubeRefractionMapping = _ctor (api.CubeRefractionMapping);
					var EquirectangularReflectionMapping = _ctor (api.EquirectangularReflectionMapping);
					var EquirectangularRefractionMapping = _ctor (api.EquirectangularRefractionMapping);
					var SphericalReflectionMapping = _ctor (api.SphericalReflectionMapping);
					var CubeUVReflectionMapping = _ctor (api.CubeUVReflectionMapping);
					var CubeUVRefractionMapping = _ctor (api.CubeUVRefractionMapping);
					var RepeatWrapping = _ctor (api.RepeatWrapping);
					var ClampToEdgeWrapping = _ctor (api.ClampToEdgeWrapping);
					var MirroredRepeatWrapping = _ctor (api.MirroredRepeatWrapping);
					var NearestFilter = _ctor (api.NearestFilter);
					var NearestMipMapNearestFilter = _ctor (api.NearestMipMapNearestFilter);
					var NearestMipMapLinearFilter = _ctor (api.NearestMipMapLinearFilter);
					var LinearFilter = _ctor (api.LinearFilter);
					var LinearMipMapNearestFilter = _ctor (api.LinearMipMapNearestFilter);
					var LinearMipMapLinearFilter = _ctor (api.LinearMipMapLinearFilter);
					var UnsignedByteType = _ctor (api.UnsignedByteType);
					var ByteType = _ctor (api.ByteType);
					var ShortType = _ctor (api.ShortType);
					var UnsignedShortType = _ctor (api.UnsignedShortType);
					var IntType = _ctor (api.IntType);
					var UnsignedIntType = _ctor (api.UnsignedIntType);
					var FloatType = _ctor (api.FloatType);
					var HalfFloatType = _ctor (api.HalfFloatType);
					var UnsignedShort4444Type = _ctor (api.UnsignedShort4444Type);
					var UnsignedShort5551Type = _ctor (api.UnsignedShort5551Type);
					var UnsignedShort565Type = _ctor (api.UnsignedShort565Type);
					var UnsignedInt248Type = _ctor (api.UnsignedInt248Type);
					var AlphaFormat = _ctor (api.AlphaFormat);
					var RGBFormat = _ctor (api.RGBFormat);
					var RGBAFormat = _ctor (api.RGBAFormat);
					var LuminanceFormat = _ctor (api.LuminanceFormat);
					var LuminanceAlphaFormat = _ctor (api.LuminanceAlphaFormat);
					var RGBEFormat = _ctor (api.RGBEFormat);
					var DepthFormat = _ctor (api.DepthFormat);
					var DepthStencilFormat = _ctor (api.DepthStencilFormat);
					var RGB_S3TC_DXT1_Format = _ctor (api.RGB_S3TC_DXT1_Format);
					var RGBA_S3TC_DXT1_Format = _ctor (api.RGBA_S3TC_DXT1_Format);
					var RGBA_S3TC_DXT3_Format = _ctor (api.RGBA_S3TC_DXT3_Format);
					var RGBA_S3TC_DXT5_Format = _ctor (api.RGBA_S3TC_DXT5_Format);
					var RGB_PVRTC_4BPPV1_Format = _ctor (api.RGB_PVRTC_4BPPV1_Format);
					var RGB_PVRTC_2BPPV1_Format = _ctor (api.RGB_PVRTC_2BPPV1_Format);
					var RGBA_PVRTC_4BPPV1_Format = _ctor (api.RGBA_PVRTC_4BPPV1_Format);
					var RGBA_PVRTC_2BPPV1_Format = _ctor (api.RGBA_PVRTC_2BPPV1_Format);
					var RGB_ETC1_Format = _ctor (api.RGB_ETC1_Format);
					var LoopOnce = _ctor (api.LoopOnce);
					var LoopRepeat = _ctor (api.LoopRepeat);
					var LoopPingPong = _ctor (api.LoopPingPong);
					var InterpolateDiscrete = _ctor (api.InterpolateDiscrete);
					var InterpolateLinear = _ctor (api.InterpolateLinear);
					var InterpolateSmooth = _ctor (api.InterpolateSmooth);
					var ZeroCurvatureEnding = _ctor (api.ZeroCurvatureEnding);
					var ZeroSlopeEnding = _ctor (api.ZeroSlopeEnding);
					var WrapAroundEnding = _ctor (api.WrapAroundEnding);
					var TrianglesDrawMode = _ctor (api.TrianglesDrawMode);
					var TriangleStripDrawMode = _ctor (api.TriangleStripDrawMode);
					var TriangleFanDrawMode = _ctor (api.TriangleFanDrawMode);
					var LinearEncoding = _ctor (api.LinearEncoding);
					var sRGBEncoding = _ctor (api.sRGBEncoding);
					var GammaEncoding = _ctor (api.GammaEncoding);
					var RGBEEncoding = _ctor (api.RGBEEncoding);
					var LogLuvEncoding = _ctor (api.LogLuvEncoding);
					var RGBM7Encoding = _ctor (api.RGBM7Encoding);
					var RGBM16Encoding = _ctor (api.RGBM16Encoding);
					var RGBDEncoding = _ctor (api.RGBDEncoding);
					var BasicDepthPacking = _ctor (api.BasicDepthPacking);
					var RGBADepthPacking = _ctor (api.RGBADepthPacking);
					var CubeGeometry = _ctor (api.CubeGeometry);
					var Face4 = _ctor (api.Face4);
					var LineStrip = _ctor (api.LineStrip);
					var LinePieces = _ctor (api.LinePieces);
					var MeshFaceMaterial = _ctor (api.MeshFaceMaterial);
					var MultiMaterial = _ctor (api.MultiMaterial);
					var PointCloud = _ctor (api.PointCloud);
					var Particle = _ctor (api.Particle);
					var ParticleSystem = _ctor (api.ParticleSystem);
					var PointCloudMaterial = _ctor (api.PointCloudMaterial);
					var ParticleBasicMaterial = _ctor (api.ParticleBasicMaterial);
					var ParticleSystemMaterial = _ctor (api.ParticleSystemMaterial);
					var Vertex = _ctor (api.Vertex);
					var DynamicBufferAttribute = _ctor (api.DynamicBufferAttribute);
					var Int8Attribute = _ctor (api.Int8Attribute);
					var Uint8Attribute = _ctor (api.Uint8Attribute);
					var Uint8ClampedAttribute = _ctor (api.Uint8ClampedAttribute);
					var Int16Attribute = _ctor (api.Int16Attribute);
					var Uint16Attribute = _ctor (api.Uint16Attribute);
					var Int32Attribute = _ctor (api.Int32Attribute);
					var Uint32Attribute = _ctor (api.Uint32Attribute);
					var Float32Attribute = _ctor (api.Float32Attribute);
					var Float64Attribute = _ctor (api.Float64Attribute);
					var ClosedSplineCurve3 = _ctor (api.ClosedSplineCurve3);
					var SplineCurve3 = _ctor (api.SplineCurve3);
					var Spline = _ctor (api.Spline);
					var BoundingBoxHelper = _ctor (api.BoundingBoxHelper);
					var EdgesHelper = _ctor (api.EdgesHelper);
					var WireframeHelper = _ctor (api.WireframeHelper);
					var XHRLoader = _ctor (api.XHRLoader);
					var BinaryTextureLoader = _ctor (api.BinaryTextureLoader);
					var GeometryUtils = _ctor (api.GeometryUtils);
					var ImageUtils = _ctor (api.ImageUtils);
					var Projector = _ctor (api.Projector);
					var CanvasRenderer = _ctor (api.CanvasRenderer);
					__pragma__ ('<all>')
						__all__.AddEquation = AddEquation;
						__all__.AddOperation = AddOperation;
						__all__.AdditiveBlending = AdditiveBlending;
						__all__.AlphaFormat = AlphaFormat;
						__all__.AlwaysDepth = AlwaysDepth;
						__all__.AmbientLight = AmbientLight;
						__all__.AnimationClip = AnimationClip;
						__all__.AnimationMixer = AnimationMixer;
						__all__.AnimationObjectGroup = AnimationObjectGroup;
						__all__.AnimationUtils = AnimationUtils;
						__all__.ArcCurve = ArcCurve;
						__all__.ArrayCamera = ArrayCamera;
						__all__.ArrowHelper = ArrowHelper;
						__all__.Audio = Audio;
						__all__.AudioAnalyser = AudioAnalyser;
						__all__.AudioContext = AudioContext;
						__all__.AudioListener = AudioListener;
						__all__.AudioLoader = AudioLoader;
						__all__.AxisHelper = AxisHelper;
						__all__.BackSide = BackSide;
						__all__.BasicDepthPacking = BasicDepthPacking;
						__all__.BasicShadowMap = BasicShadowMap;
						__all__.BinaryTextureLoader = BinaryTextureLoader;
						__all__.Bone = Bone;
						__all__.BooleanKeyframeTrack = BooleanKeyframeTrack;
						__all__.BoundingBoxHelper = BoundingBoxHelper;
						__all__.Box2 = Box2;
						__all__.Box3 = Box3;
						__all__.BoxBufferGeometry = BoxBufferGeometry;
						__all__.BoxGeometry = BoxGeometry;
						__all__.BoxHelper = BoxHelper;
						__all__.BufferAttribute = BufferAttribute;
						__all__.BufferGeometry = BufferGeometry;
						__all__.BufferGeometryLoader = BufferGeometryLoader;
						__all__.ByteType = ByteType;
						__all__.Cache = Cache;
						__all__.Camera = Camera;
						__all__.CameraHelper = CameraHelper;
						__all__.CanvasRenderer = CanvasRenderer;
						__all__.CanvasTexture = CanvasTexture;
						__all__.CatmullRomCurve3 = CatmullRomCurve3;
						__all__.CineonToneMapping = CineonToneMapping;
						__all__.CircleBufferGeometry = CircleBufferGeometry;
						__all__.CircleGeometry = CircleGeometry;
						__all__.ClampToEdgeWrapping = ClampToEdgeWrapping;
						__all__.Clock = Clock;
						__all__.ClosedSplineCurve3 = ClosedSplineCurve3;
						__all__.Color = Color;
						__all__.ColorKeyframeTrack = ColorKeyframeTrack;
						__all__.CompressedTexture = CompressedTexture;
						__all__.CompressedTextureLoader = CompressedTextureLoader;
						__all__.ConeBufferGeometry = ConeBufferGeometry;
						__all__.ConeGeometry = ConeGeometry;
						__all__.CubeCamera = CubeCamera;
						__all__.CubeGeometry = CubeGeometry;
						__all__.CubeReflectionMapping = CubeReflectionMapping;
						__all__.CubeRefractionMapping = CubeRefractionMapping;
						__all__.CubeTexture = CubeTexture;
						__all__.CubeTextureLoader = CubeTextureLoader;
						__all__.CubeUVReflectionMapping = CubeUVReflectionMapping;
						__all__.CubeUVRefractionMapping = CubeUVRefractionMapping;
						__all__.CubicBezierCurve = CubicBezierCurve;
						__all__.CubicBezierCurve3 = CubicBezierCurve3;
						__all__.CubicInterpolant = CubicInterpolant;
						__all__.CullFaceBack = CullFaceBack;
						__all__.CullFaceFront = CullFaceFront;
						__all__.CullFaceFrontBack = CullFaceFrontBack;
						__all__.CullFaceNone = CullFaceNone;
						__all__.Curve = Curve;
						__all__.CurvePath = CurvePath;
						__all__.CustomBlending = CustomBlending;
						__all__.CylinderBufferGeometry = CylinderBufferGeometry;
						__all__.CylinderGeometry = CylinderGeometry;
						__all__.Cylindrical = Cylindrical;
						__all__.DataTexture = DataTexture;
						__all__.DataTextureLoader = DataTextureLoader;
						__all__.DefaultLoadingManager = DefaultLoadingManager;
						__all__.DepthFormat = DepthFormat;
						__all__.DepthStencilFormat = DepthStencilFormat;
						__all__.DepthTexture = DepthTexture;
						__all__.DirectionalLight = DirectionalLight;
						__all__.DirectionalLightHelper = DirectionalLightHelper;
						__all__.DirectionalLightShadow = DirectionalLightShadow;
						__all__.DiscreteInterpolant = DiscreteInterpolant;
						__all__.DodecahedronBufferGeometry = DodecahedronBufferGeometry;
						__all__.DodecahedronGeometry = DodecahedronGeometry;
						__all__.DoubleSide = DoubleSide;
						__all__.DstAlphaFactor = DstAlphaFactor;
						__all__.DstColorFactor = DstColorFactor;
						__all__.DynamicBufferAttribute = DynamicBufferAttribute;
						__all__.EdgesGeometry = EdgesGeometry;
						__all__.EdgesHelper = EdgesHelper;
						__all__.EllipseCurve = EllipseCurve;
						__all__.EqualDepth = EqualDepth;
						__all__.EquirectangularReflectionMapping = EquirectangularReflectionMapping;
						__all__.EquirectangularRefractionMapping = EquirectangularRefractionMapping;
						__all__.Euler = Euler;
						__all__.EventDispatcher = EventDispatcher;
						__all__.ExtrudeBufferGeometry = ExtrudeBufferGeometry;
						__all__.ExtrudeGeometry = ExtrudeGeometry;
						__all__.Face3 = Face3;
						__all__.Face4 = Face4;
						__all__.FaceColors = FaceColors;
						__all__.FaceNormalsHelper = FaceNormalsHelper;
						__all__.FileLoader = FileLoader;
						__all__.FlatShading = FlatShading;
						__all__.Float32Attribute = Float32Attribute;
						__all__.Float32BufferAttribute = Float32BufferAttribute;
						__all__.Float64Attribute = Float64Attribute;
						__all__.Float64BufferAttribute = Float64BufferAttribute;
						__all__.FloatType = FloatType;
						__all__.Fog = Fog;
						__all__.FogExp2 = FogExp2;
						__all__.Font = Font;
						__all__.FontLoader = FontLoader;
						__all__.FrontFaceDirectionCCW = FrontFaceDirectionCCW;
						__all__.FrontFaceDirectionCW = FrontFaceDirectionCW;
						__all__.FrontSide = FrontSide;
						__all__.Frustum = Frustum;
						__all__.GammaEncoding = GammaEncoding;
						__all__.Geometry = Geometry;
						__all__.GeometryIdCount = GeometryIdCount;
						__all__.GeometryUtils = GeometryUtils;
						__all__.GreaterDepth = GreaterDepth;
						__all__.GreaterEqualDepth = GreaterEqualDepth;
						__all__.GridHelper = GridHelper;
						__all__.Group = Group;
						__all__.HalfFloatType = HalfFloatType;
						__all__.HemisphereLight = HemisphereLight;
						__all__.HemisphereLightHelper = HemisphereLightHelper;
						__all__.IcosahedronBufferGeometry = IcosahedronBufferGeometry;
						__all__.IcosahedronGeometry = IcosahedronGeometry;
						__all__.ImageLoader = ImageLoader;
						__all__.ImageUtils = ImageUtils;
						__all__.ImmediateRenderObject = ImmediateRenderObject;
						__all__.InstancedBufferAttribute = InstancedBufferAttribute;
						__all__.InstancedBufferGeometry = InstancedBufferGeometry;
						__all__.InstancedInterleavedBuffer = InstancedInterleavedBuffer;
						__all__.Int16Attribute = Int16Attribute;
						__all__.Int16BufferAttribute = Int16BufferAttribute;
						__all__.Int32Attribute = Int32Attribute;
						__all__.Int32BufferAttribute = Int32BufferAttribute;
						__all__.Int8Attribute = Int8Attribute;
						__all__.Int8BufferAttribute = Int8BufferAttribute;
						__all__.IntType = IntType;
						__all__.InterleavedBuffer = InterleavedBuffer;
						__all__.InterleavedBufferAttribute = InterleavedBufferAttribute;
						__all__.Interpolant = Interpolant;
						__all__.InterpolateDiscrete = InterpolateDiscrete;
						__all__.InterpolateLinear = InterpolateLinear;
						__all__.InterpolateSmooth = InterpolateSmooth;
						__all__.JSONLoader = JSONLoader;
						__all__.KeyframeTrack = KeyframeTrack;
						__all__.LOD = LOD;
						__all__.LatheBufferGeometry = LatheBufferGeometry;
						__all__.LatheGeometry = LatheGeometry;
						__all__.Layers = Layers;
						__all__.LensFlare = LensFlare;
						__all__.LessDepth = LessDepth;
						__all__.LessEqualDepth = LessEqualDepth;
						__all__.Light = Light;
						__all__.LightShadow = LightShadow;
						__all__.Line = Line;
						__all__.Line3 = Line3;
						__all__.LineBasicMaterial = LineBasicMaterial;
						__all__.LineCurve = LineCurve;
						__all__.LineCurve3 = LineCurve3;
						__all__.LineDashedMaterial = LineDashedMaterial;
						__all__.LineLoop = LineLoop;
						__all__.LinePieces = LinePieces;
						__all__.LineSegments = LineSegments;
						__all__.LineStrip = LineStrip;
						__all__.LinearEncoding = LinearEncoding;
						__all__.LinearFilter = LinearFilter;
						__all__.LinearInterpolant = LinearInterpolant;
						__all__.LinearMipMapLinearFilter = LinearMipMapLinearFilter;
						__all__.LinearMipMapNearestFilter = LinearMipMapNearestFilter;
						__all__.LinearToneMapping = LinearToneMapping;
						__all__.Loader = Loader;
						__all__.LoadingManager = LoadingManager;
						__all__.LogLuvEncoding = LogLuvEncoding;
						__all__.LoopOnce = LoopOnce;
						__all__.LoopPingPong = LoopPingPong;
						__all__.LoopRepeat = LoopRepeat;
						__all__.LuminanceAlphaFormat = LuminanceAlphaFormat;
						__all__.LuminanceFormat = LuminanceFormat;
						__all__.MOUSE = MOUSE;
						__all__.Material = Material;
						__all__.MaterialLoader = MaterialLoader;
						__all__.Math = Math;
						__all__.Matrix3 = Matrix3;
						__all__.Matrix4 = Matrix4;
						__all__.MaxEquation = MaxEquation;
						__all__.Mesh = Mesh;
						__all__.MeshBasicMaterial = MeshBasicMaterial;
						__all__.MeshDepthMaterial = MeshDepthMaterial;
						__all__.MeshFaceMaterial = MeshFaceMaterial;
						__all__.MeshLambertMaterial = MeshLambertMaterial;
						__all__.MeshNormalMaterial = MeshNormalMaterial;
						__all__.MeshPhongMaterial = MeshPhongMaterial;
						__all__.MeshPhysicalMaterial = MeshPhysicalMaterial;
						__all__.MeshStandardMaterial = MeshStandardMaterial;
						__all__.MeshToonMaterial = MeshToonMaterial;
						__all__.MinEquation = MinEquation;
						__all__.MirroredRepeatWrapping = MirroredRepeatWrapping;
						__all__.MixOperation = MixOperation;
						__all__.MorphBlendMesh = MorphBlendMesh;
						__all__.MultiMaterial = MultiMaterial;
						__all__.MultiplyBlending = MultiplyBlending;
						__all__.MultiplyOperation = MultiplyOperation;
						__all__.NearestFilter = NearestFilter;
						__all__.NearestMipMapLinearFilter = NearestMipMapLinearFilter;
						__all__.NearestMipMapNearestFilter = NearestMipMapNearestFilter;
						__all__.NeverDepth = NeverDepth;
						__all__.NoBlending = NoBlending;
						__all__.NoColors = NoColors;
						__all__.NoToneMapping = NoToneMapping;
						__all__.NormalBlending = NormalBlending;
						__all__.NotEqualDepth = NotEqualDepth;
						__all__.NumberKeyframeTrack = NumberKeyframeTrack;
						__all__.Object3D = Object3D;
						__all__.ObjectLoader = ObjectLoader;
						__all__.OctahedronBufferGeometry = OctahedronBufferGeometry;
						__all__.OctahedronGeometry = OctahedronGeometry;
						__all__.OneFactor = OneFactor;
						__all__.OneMinusDstAlphaFactor = OneMinusDstAlphaFactor;
						__all__.OneMinusDstColorFactor = OneMinusDstColorFactor;
						__all__.OneMinusSrcAlphaFactor = OneMinusSrcAlphaFactor;
						__all__.OneMinusSrcColorFactor = OneMinusSrcColorFactor;
						__all__.OrthographicCamera = OrthographicCamera;
						__all__.PCFShadowMap = PCFShadowMap;
						__all__.PCFSoftShadowMap = PCFSoftShadowMap;
						__all__.ParametricBufferGeometry = ParametricBufferGeometry;
						__all__.ParametricGeometry = ParametricGeometry;
						__all__.Particle = Particle;
						__all__.ParticleBasicMaterial = ParticleBasicMaterial;
						__all__.ParticleSystem = ParticleSystem;
						__all__.ParticleSystemMaterial = ParticleSystemMaterial;
						__all__.Path = Path;
						__all__.PerspectiveCamera = PerspectiveCamera;
						__all__.Plane = Plane;
						__all__.PlaneBufferGeometry = PlaneBufferGeometry;
						__all__.PlaneGeometry = PlaneGeometry;
						__all__.PointCloud = PointCloud;
						__all__.PointCloudMaterial = PointCloudMaterial;
						__all__.PointLight = PointLight;
						__all__.PointLightHelper = PointLightHelper;
						__all__.Points = Points;
						__all__.PointsMaterial = PointsMaterial;
						__all__.PolarGridHelper = PolarGridHelper;
						__all__.PolyhedronBufferGeometry = PolyhedronBufferGeometry;
						__all__.PolyhedronGeometry = PolyhedronGeometry;
						__all__.PositionalAudio = PositionalAudio;
						__all__.Projector = Projector;
						__all__.PropertyBinding = PropertyBinding;
						__all__.PropertyMixer = PropertyMixer;
						__all__.QuadraticBezierCurve = QuadraticBezierCurve;
						__all__.QuadraticBezierCurve3 = QuadraticBezierCurve3;
						__all__.Quaternion = Quaternion;
						__all__.QuaternionKeyframeTrack = QuaternionKeyframeTrack;
						__all__.QuaternionLinearInterpolant = QuaternionLinearInterpolant;
						__all__.REVISION = REVISION;
						__all__.RGBADepthPacking = RGBADepthPacking;
						__all__.RGBAFormat = RGBAFormat;
						__all__.RGBA_PVRTC_2BPPV1_Format = RGBA_PVRTC_2BPPV1_Format;
						__all__.RGBA_PVRTC_4BPPV1_Format = RGBA_PVRTC_4BPPV1_Format;
						__all__.RGBA_S3TC_DXT1_Format = RGBA_S3TC_DXT1_Format;
						__all__.RGBA_S3TC_DXT3_Format = RGBA_S3TC_DXT3_Format;
						__all__.RGBA_S3TC_DXT5_Format = RGBA_S3TC_DXT5_Format;
						__all__.RGBDEncoding = RGBDEncoding;
						__all__.RGBEEncoding = RGBEEncoding;
						__all__.RGBEFormat = RGBEFormat;
						__all__.RGBFormat = RGBFormat;
						__all__.RGBM16Encoding = RGBM16Encoding;
						__all__.RGBM7Encoding = RGBM7Encoding;
						__all__.RGB_ETC1_Format = RGB_ETC1_Format;
						__all__.RGB_PVRTC_2BPPV1_Format = RGB_PVRTC_2BPPV1_Format;
						__all__.RGB_PVRTC_4BPPV1_Format = RGB_PVRTC_4BPPV1_Format;
						__all__.RGB_S3TC_DXT1_Format = RGB_S3TC_DXT1_Format;
						__all__.RawShaderMaterial = RawShaderMaterial;
						__all__.Ray = Ray;
						__all__.Raycaster = Raycaster;
						__all__.RectAreaLight = RectAreaLight;
						__all__.RectAreaLightHelper = RectAreaLightHelper;
						__all__.ReinhardToneMapping = ReinhardToneMapping;
						__all__.RepeatWrapping = RepeatWrapping;
						__all__.ReverseSubtractEquation = ReverseSubtractEquation;
						__all__.RingBufferGeometry = RingBufferGeometry;
						__all__.RingGeometry = RingGeometry;
						__all__.Scene = Scene;
						__all__.SceneUtils = SceneUtils;
						__all__.ShaderChunk = ShaderChunk;
						__all__.ShaderLib = ShaderLib;
						__all__.ShaderMaterial = ShaderMaterial;
						__all__.ShadowMaterial = ShadowMaterial;
						__all__.Shape = Shape;
						__all__.ShapeBufferGeometry = ShapeBufferGeometry;
						__all__.ShapeGeometry = ShapeGeometry;
						__all__.ShapePath = ShapePath;
						__all__.ShapeUtils = ShapeUtils;
						__all__.ShortType = ShortType;
						__all__.Skeleton = Skeleton;
						__all__.SkeletonHelper = SkeletonHelper;
						__all__.SkinnedMesh = SkinnedMesh;
						__all__.SmoothShading = SmoothShading;
						__all__.Sphere = Sphere;
						__all__.SphereBufferGeometry = SphereBufferGeometry;
						__all__.SphereGeometry = SphereGeometry;
						__all__.Spherical = Spherical;
						__all__.SphericalReflectionMapping = SphericalReflectionMapping;
						__all__.Spline = Spline;
						__all__.SplineCurve = SplineCurve;
						__all__.SplineCurve3 = SplineCurve3;
						__all__.SpotLight = SpotLight;
						__all__.SpotLightHelper = SpotLightHelper;
						__all__.SpotLightShadow = SpotLightShadow;
						__all__.Sprite = Sprite;
						__all__.SpriteMaterial = SpriteMaterial;
						__all__.SrcAlphaFactor = SrcAlphaFactor;
						__all__.SrcAlphaSaturateFactor = SrcAlphaSaturateFactor;
						__all__.SrcColorFactor = SrcColorFactor;
						__all__.StereoCamera = StereoCamera;
						__all__.StringKeyframeTrack = StringKeyframeTrack;
						__all__.SubtractEquation = SubtractEquation;
						__all__.SubtractiveBlending = SubtractiveBlending;
						__all__.TetrahedronBufferGeometry = TetrahedronBufferGeometry;
						__all__.TetrahedronGeometry = TetrahedronGeometry;
						__all__.TextBufferGeometry = TextBufferGeometry;
						__all__.TextGeometry = TextGeometry;
						__all__.Texture = Texture;
						__all__.TextureLoader = TextureLoader;
						__all__.TorusBufferGeometry = TorusBufferGeometry;
						__all__.TorusGeometry = TorusGeometry;
						__all__.TorusKnotBufferGeometry = TorusKnotBufferGeometry;
						__all__.TorusKnotGeometry = TorusKnotGeometry;
						__all__.Triangle = Triangle;
						__all__.TriangleFanDrawMode = TriangleFanDrawMode;
						__all__.TriangleStripDrawMode = TriangleStripDrawMode;
						__all__.TrianglesDrawMode = TrianglesDrawMode;
						__all__.TubeBufferGeometry = TubeBufferGeometry;
						__all__.TubeGeometry = TubeGeometry;
						__all__.UVMapping = UVMapping;
						__all__.Uint16Attribute = Uint16Attribute;
						__all__.Uint16BufferAttribute = Uint16BufferAttribute;
						__all__.Uint32Attribute = Uint32Attribute;
						__all__.Uint32BufferAttribute = Uint32BufferAttribute;
						__all__.Uint8Attribute = Uint8Attribute;
						__all__.Uint8BufferAttribute = Uint8BufferAttribute;
						__all__.Uint8ClampedAttribute = Uint8ClampedAttribute;
						__all__.Uint8ClampedBufferAttribute = Uint8ClampedBufferAttribute;
						__all__.Uncharted2ToneMapping = Uncharted2ToneMapping;
						__all__.Uniform = Uniform;
						__all__.UniformsLib = UniformsLib;
						__all__.UniformsUtils = UniformsUtils;
						__all__.UnsignedByteType = UnsignedByteType;
						__all__.UnsignedInt248Type = UnsignedInt248Type;
						__all__.UnsignedIntType = UnsignedIntType;
						__all__.UnsignedShort4444Type = UnsignedShort4444Type;
						__all__.UnsignedShort5551Type = UnsignedShort5551Type;
						__all__.UnsignedShort565Type = UnsignedShort565Type;
						__all__.UnsignedShortType = UnsignedShortType;
						__all__.Vector3 = Vector3;
						__all__.VectorKeyframeTrack = VectorKeyframeTrack;
						__all__.Vertex = Vertex;
						__all__.VertexColors = VertexColors;
						__all__.VertexNormalsHelper = VertexNormalsHelper;
						__all__.VideoTexture = VideoTexture;
						__all__.WebGLRenderTarget = WebGLRenderTarget;
						__all__.WebGLRenderTargetCube = WebGLRenderTargetCube;
						__all__.WebGLRenderer = WebGLRenderer;
						__all__.WireframeGeometry = WireframeGeometry;
						__all__.WireframeHelper = WireframeHelper;
						__all__.WrapAroundEnding = WrapAroundEnding;
						__all__.XHRLoader = XHRLoader;
						__all__.ZeroCurvatureEnding = ZeroCurvatureEnding;
						__all__.ZeroFactor = ZeroFactor;
						__all__.ZeroSlopeEnding = ZeroSlopeEnding;
						__all__.__name__ = __name__;
						__all__._ctor = _ctor;
						__all__.api = api;
						__all__.sRGBEncoding = sRGBEncoding;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		'random', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var math = {};
					var __name__ = 'random';
					__nest__ (math, '', __init__ (__world__.math));
					var _array = (function () {
						var __accu0__ = [];
						for (var i = 0; i < 624; i++) {
							__accu0__.append (0);
						}
						return __accu0__;
					}) ();
					var _index = 0;
					var _bitmask1 = Math.pow (2, 32) - 1;
					var _bitmask2 = Math.pow (2, 31);
					var _bitmask3 = Math.pow (2, 31) - 1;
					var _fill_array = function () {
						for (var i = 0; i < 624; i++) {
							var y = (_array [i] & _bitmask2) + (_array [__mod__ (i + 1, 624)] & _bitmask3);
							_array [i] = _array [__mod__ (i + 397, 624)] ^ y >> 1;
							if (__mod__ (y, 2) != 0) {
								_array [i] ^= 2567483615;
							}
						}
					};
					var _random_integer = function () {
						if (_index == 0) {
							_fill_array ();
						}
						var y = _array [_index];
						y ^= y >> 11;
						y ^= y << 7 & 2636928640;
						y ^= y << 15 & 4022730752;
						y ^= y >> 18;
						_index = __mod__ (_index + 1, 624);
						return y;
					};
					var seed = function (x) {
						if (typeof x == 'undefined' || (x != null && x .hasOwnProperty ("__kwargtrans__"))) {;
							var x = int (_bitmask3 * Math.random ());
						};
						_array [0] = x;
						for (var i = 1; i < 624; i++) {
							_array [i] = (1812433253 * _array [i - 1] ^ (_array [i - 1] >> 30) + i) & _bitmask1;
						}
					};
					var randint = function (a, b) {
						return a + __mod__ (_random_integer (), (b - a) + 1);
					};
					var choice = function (seq) {
						return seq [randint (0, len (seq) - 1)];
					};
					var random = function () {
						return _random_integer () / _bitmask3;
					};
					var shuffle = function (x) {
						for (var i = len (x) - 1; i > 0; i--) {
							var j = math.floor (random () * (i + 1));
							var temp = x [i];
							x [i] = x [j];
							x [j] = temp;
						}
					};
					seed ();
					__pragma__ ('<use>' +
						'math' +
					'</use>')
					__pragma__ ('<all>')
						__all__.__name__ = __name__;
						__all__._array = _array;
						__all__._bitmask1 = _bitmask1;
						__all__._bitmask2 = _bitmask2;
						__all__._bitmask3 = _bitmask3;
						__all__._fill_array = _fill_array;
						__all__._index = _index;
						__all__._random_integer = _random_integer;
						__all__.choice = choice;
						__all__.randint = randint;
						__all__.random = random;
						__all__.seed = seed;
						__all__.shuffle = shuffle;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		're', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __name__ = 're';
					var translate = __init__ (__world__.re.translate).translate;
					var T = 1 << 0;
					var TEMPLATE = T;
					var I = 1 << 1;
					var IGNORECASE = I;
					var L = 1 << 2;
					var LOCALE = L;
					var M = 1 << 3;
					var MULTILINE = M;
					var S = 1 << 4;
					var DOTALL = S;
					var U = 1 << 5;
					var UNICODE = U;
					var X = 1 << 6;
					var VERBOSE = X;
					var DEBUG = 1 << 7;
					var A = 1 << 8;
					var ASCII = A;
					var Y = 1 << 16;
					var STICKY = Y;
					var G = 1 << 17;
					var GLOBAL = G;
					var J = 1 << 19;
					var JSSTRICT = J;
					var error = __class__ ('error', [Exception], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, msg, error, pattern, flags, pos) {
							if (typeof pattern == 'undefined' || (pattern != null && pattern .hasOwnProperty ("__kwargtrans__"))) {;
								var pattern = null;
							};
							if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
								var flags = 0;
							};
							if (typeof pos == 'undefined' || (pos != null && pos .hasOwnProperty ("__kwargtrans__"))) {;
								var pos = null;
							};
							Exception.__init__ (self, msg, __kwargtrans__ ({error: error}));
							self.pattern = pattern;
							self.flags = flags;
							self.pos = pos;
						});}
					});
					var ReIndexError = __class__ ('ReIndexError', [IndexError], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self) {
							IndexError.__init__ (self, 'no such group');
						});}
					});
					var Match = __class__ ('Match', [object], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, mObj, string, pos, endpos, rObj, namedGroups) {
							if (typeof namedGroups == 'undefined' || (namedGroups != null && namedGroups .hasOwnProperty ("__kwargtrans__"))) {;
								var namedGroups = null;
							};
							for (var [index, match] of enumerate (mObj)) {
								mObj [index] = (mObj [index] == undefined ? null : mObj [index]);
							}
							self._obj = mObj;
							self._pos = pos;
							self._endpos = endpos;
							self._re = rObj;
							self._string = string;
							self._namedGroups = namedGroups;
							self._lastindex = self._lastMatchGroup ();
							if (self._namedGroups !== null) {
								self._lastgroup = self._namedGroups [self._lastindex];
							}
							else {
								self._lastgroup = null;
							}
						});},
						get _getPos () {return __get__ (this, function (self) {
							return self._pos;
						});},
						get _setPos () {return __get__ (this, function (self, val) {
							var __except0__ = AttributeError ('readonly attribute');
							__except0__.__cause__ = null;
							throw __except0__;
						});},
						get _getEndPos () {return __get__ (this, function (self) {
							return self._endpos;
						});},
						get _setEndPos () {return __get__ (this, function (self, val) {
							var __except0__ = AttributeError ('readonly attribute');
							__except0__.__cause__ = null;
							throw __except0__;
						});},
						get _getRe () {return __get__ (this, function (self) {
							return self._re;
						});},
						get _setRe () {return __get__ (this, function (self, val) {
							var __except0__ = AttributeError ('readonly attribute');
							__except0__.__cause__ = null;
							throw __except0__;
						});},
						get _getString () {return __get__ (this, function (self) {
							return self._string;
						});},
						get _setString () {return __get__ (this, function (self, val) {
							var __except0__ = AttributeError ('readonly attribute');
							__except0__.__cause__ = null;
							throw __except0__;
						});},
						get _getLastGroup () {return __get__ (this, function (self) {
							return self._lastgroup;
						});},
						get _setLastGroup () {return __get__ (this, function (self, val) {
							var __except0__ = AttributeError ('readonly attribute');
							__except0__.__cause__ = null;
							throw __except0__;
						});},
						get _getLastIndex () {return __get__ (this, function (self) {
							return self._lastindex;
						});},
						get _setLastIndex () {return __get__ (this, function (self, val) {
							var __except0__ = AttributeError ('readonly attribute');
							__except0__.__cause__ = null;
							throw __except0__;
						});},
						get _lastMatchGroup () {return __get__ (this, function (self) {
							if (len (self._obj) > 1) {
								for (var i = len (self._obj) - 1; i > 0; i--) {
									if (self._obj [i] !== null) {
										return i;
									}
								}
								return null;
							}
							else {
								return null;
							}
						});},
						get expand () {return __get__ (this, function (self, template) {
							var __except0__ = NotImplementedError ();
							__except0__.__cause__ = null;
							throw __except0__;
						});},
						get group () {return __get__ (this, function (self) {
							var args = tuple ([].slice.apply (arguments).slice (1));
							var ret = list ([]);
							if (len (args) > 0) {
								for (var index of args) {
									if (py_typeof (index) === str) {
										if (self._namedGroups !== null) {
											if (!__in__ (index, self._namedGroups.py_keys ())) {
												var __except0__ = ReIndexError ();
												__except0__.__cause__ = null;
												throw __except0__;
											}
											ret.append (self._obj [self._namedGroups [index]]);
										}
										else {
											var __except0__ = NotImplementedError ('No NamedGroups Available');
											__except0__.__cause__ = null;
											throw __except0__;
										}
									}
									else {
										if (index >= len (self._obj)) {
											var __except0__ = ReIndexError ();
											__except0__.__cause__ = null;
											throw __except0__;
										}
										ret.append (self._obj [index]);
									}
								}
							}
							else {
								ret.append (self._obj [0]);
							}
							if (len (ret) == 1) {
								return ret [0];
							}
							else {
								return tuple (ret);
							}
						});},
						get groups () {return __get__ (this, function (self, py_default) {
							if (typeof py_default == 'undefined' || (py_default != null && py_default .hasOwnProperty ("__kwargtrans__"))) {;
								var py_default = null;
							};
							if (len (self._obj) > 1) {
								var ret = self._obj.__getslice__ (1, null, 1);
								return tuple ((function () {
									var __accu0__ = [];
									for (var x of ret) {
										__accu0__.append ((x !== null ? x : py_default));
									}
									return __accu0__;
								}) ());
							}
							else {
								return tuple ();
							}
						});},
						get groupdict () {return __get__ (this, function (self, py_default) {
							if (typeof py_default == 'undefined' || (py_default != null && py_default .hasOwnProperty ("__kwargtrans__"))) {;
								var py_default = null;
							};
							if (self._namedGroups !== null) {
								var ret = dict ({});
								for (var [gName, gId] of self._namedGroups.py_items ()) {
									var value = self._obj [gId];
									ret [gName] = (value !== null ? value : py_default);
								}
								return ret;
							}
							else {
								var __except0__ = NotImplementedError ('No NamedGroups Available');
								__except0__.__cause__ = null;
								throw __except0__;
							}
						});},
						get start () {return __get__ (this, function (self, group) {
							if (typeof group == 'undefined' || (group != null && group .hasOwnProperty ("__kwargtrans__"))) {;
								var group = 0;
							};
							var gId = 0;
							if (py_typeof (group) === str) {
								if (self._namedGroups !== null) {
									if (!__in__ (group, self._namedGroups.py_keys ())) {
										var __except0__ = ReIndexError ();
										__except0__.__cause__ = null;
										throw __except0__;
									}
									var gId = self._namedGroups [group];
								}
								else {
									var __except0__ = NotImplementedError ('No NamedGroups Available');
									__except0__.__cause__ = null;
									throw __except0__;
								}
							}
							else {
								var gId = group;
							}
							if (gId >= len (self._obj)) {
								var __except0__ = ReIndexError ();
								__except0__.__cause__ = null;
								throw __except0__;
							}
							if (gId == 0) {
								return self._obj.index;
							}
							else if (self._obj [gId] !== null) {
								var r = compile (escape (self._obj [gId]), self._re.flags);
								var m = r.search (self._obj [0]);
								if (m) {
									return self._obj.index + m.start ();
								}
								else {
									var __except0__ = Exception ('Failed to find capture group');
									__except0__.__cause__ = null;
									throw __except0__;
								}
							}
							else {
								return -(1);
							}
						});},
						get end () {return __get__ (this, function (self, group) {
							if (typeof group == 'undefined' || (group != null && group .hasOwnProperty ("__kwargtrans__"))) {;
								var group = 0;
							};
							var gId = 0;
							if (py_typeof (group) === str) {
								if (self._namedGroups !== null) {
									if (!__in__ (group, self._namedGroups.py_keys ())) {
										var __except0__ = ReIndexError ();
										__except0__.__cause__ = null;
										throw __except0__;
									}
									var gId = self._namedGroups [group];
								}
								else {
									var __except0__ = NotImplementedError ('No NamedGroups Available');
									__except0__.__cause__ = null;
									throw __except0__;
								}
							}
							else {
								var gId = group;
							}
							if (gId >= len (self._obj)) {
								var __except0__ = ReIndexError ();
								__except0__.__cause__ = null;
								throw __except0__;
							}
							if (gId == 0) {
								return self._obj.index + len (self._obj [0]);
							}
							else if (self._obj [gId] !== null) {
								var r = compile (escape (self._obj [gId]), self._re.flags);
								var m = r.search (self._obj [0]);
								if (m) {
									return self._obj.index + m.end ();
								}
								else {
									var __except0__ = Exception ('Failed to find capture group');
									__except0__.__cause__ = null;
									throw __except0__;
								}
							}
							else {
								return -(1);
							}
						});},
						get span () {return __get__ (this, function (self, group) {
							if (typeof group == 'undefined' || (group != null && group .hasOwnProperty ("__kwargtrans__"))) {;
								var group = 0;
							};
							return tuple ([self.start (group), self.end (group)]);
						});}
					});
					Object.defineProperty (Match, 'pos', property.call (Match, Match._getPos, Match._setPos));;
					Object.defineProperty (Match, 'endpos', property.call (Match, Match._getEndPos, Match._setEndPos));;
					Object.defineProperty (Match, 're', property.call (Match, Match._getRe, Match._setRe));;
					Object.defineProperty (Match, 'string', property.call (Match, Match._getString, Match._setString));;
					Object.defineProperty (Match, 'lastgroup', property.call (Match, Match._getLastGroup, Match._setLastGroup));;
					Object.defineProperty (Match, 'lastindex', property.call (Match, Match._getLastIndex, Match._setLastIndex));;
					var Regex = __class__ ('Regex', [object], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, pattern, flags) {
							if (!((flags & ASCII) > 0)) {
								flags |= UNICODE;
							}
							self._flags = flags;
							var __left0__ = self._compileWrapper (pattern, flags);
							self._jsFlags = __left0__ [0];
							self._obj = __left0__ [1];
							self._jspattern = pattern;
							self._pypattern = pattern;
							var __left0__ = self._compileWrapper (pattern + '|', flags);
							var _ = __left0__ [0];
							var groupCounterRegex = __left0__ [1];
							self._groups = groupCounterRegex.exec ('').length - 1;
							self._groupindex = null;
						});},
						get _getPattern () {return __get__ (this, function (self) {
							var ret = self._pypattern.py_replace ('\\', '\\\\');
							return ret;
						});},
						get _setPattern () {return __get__ (this, function (self, val) {
							var __except0__ = AttributeError ('readonly attribute');
							__except0__.__cause__ = null;
							throw __except0__;
						});},
						get _getFlags () {return __get__ (this, function (self) {
							return self._flags;
						});},
						get _setFlags () {return __get__ (this, function (self, val) {
							var __except0__ = AttributeError ('readonly attribute');
							__except0__.__cause__ = null;
							throw __except0__;
						});},
						get _getGroups () {return __get__ (this, function (self) {
							return self._groups;
						});},
						get _setGroups () {return __get__ (this, function (self, val) {
							var __except0__ = AttributeError ('readonly attribute');
							__except0__.__cause__ = null;
							throw __except0__;
						});},
						get _getGroupIndex () {return __get__ (this, function (self) {
							if (self._groupindex === null) {
								return dict ({});
							}
							else {
								return self._groupindex;
							}
						});},
						get _setGroupIndex () {return __get__ (this, function (self, val) {
							var __except0__ = AttributeError ('readonly attribute');
							__except0__.__cause__ = null;
							throw __except0__;
						});},
						get _compileWrapper () {return __get__ (this, function (self, pattern, flags) {
							if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
								var flags = 0;
							};
							var jsFlags = self._convertFlags (flags);
							var rObj = null;
							var errObj = null;
							
							                   try {
							                     rObj = new RegExp(pattern, jsFlags)
							                   } catch( err ) {
							                     errObj = err
							                   }
							                   
							if (errObj !== null) {
								var __except0__ = error (errObj.message, errObj, pattern, flags);
								__except0__.__cause__ = null;
								throw __except0__;
							}
							return tuple ([jsFlags, rObj]);
						});},
						get _convertFlags () {return __get__ (this, function (self, flags) {
							var bitmaps = list ([tuple ([DEBUG, '']), tuple ([IGNORECASE, 'i']), tuple ([MULTILINE, 'm']), tuple ([STICKY, 'y']), tuple ([GLOBAL, 'g']), tuple ([UNICODE, 'u'])]);
							var ret = ''.join ((function () {
								var __accu0__ = [];
								for (var x of bitmaps) {
									if ((x [0] & flags) > 0) {
										__accu0__.append (x [1]);
									}
								}
								return __accu0__;
							}) ());
							return ret;
						});},
						get _getTargetStr () {return __get__ (this, function (self, string, pos, endpos) {
							var endPtr = len (string);
							if (endpos !== null) {
								if (endpos < endPtr) {
									var endPtr = endpos;
								}
							}
							if (endPtr < 0) {
								var endPtr = 0;
							}
							var ret = string.__getslice__ (pos, endPtr, 1);
							return ret;
						});},
						get _patternHasCaptures () {return __get__ (this, function (self) {
							return self._groups > 0;
						});},
						get search () {return __get__ (this, function (self, string, pos, endpos) {
							if (typeof pos == 'undefined' || (pos != null && pos .hasOwnProperty ("__kwargtrans__"))) {;
								var pos = 0;
							};
							if (typeof endpos == 'undefined' || (endpos != null && endpos .hasOwnProperty ("__kwargtrans__"))) {;
								var endpos = null;
							};
							if (endpos === null) {
								var endpos = len (string);
							}
							var rObj = self._obj;
							var m = rObj.exec (string);
							if (m) {
								if (m.index < pos || m.index > endpos) {
									return null;
								}
								else {
									return Match (m, string, pos, endpos, self, self._groupindex);
								}
							}
							else {
								return null;
							}
						});},
						get match () {return __get__ (this, function (self, string, pos, endpos) {
							if (typeof pos == 'undefined' || (pos != null && pos .hasOwnProperty ("__kwargtrans__"))) {;
								var pos = 0;
							};
							if (typeof endpos == 'undefined' || (endpos != null && endpos .hasOwnProperty ("__kwargtrans__"))) {;
								var endpos = null;
							};
							var target = string;
							if (endpos !== null) {
								var target = target.__getslice__ (0, endpos, 1);
							}
							else {
								var endpos = len (string);
							}
							var rObj = self._obj;
							var m = rObj.exec (target);
							if (m) {
								if (m.index == pos) {
									return Match (m, string, pos, endpos, self, self._groupindex);
								}
								else {
									return null;
								}
							}
							else {
								return null;
							}
						});},
						get fullmatch () {return __get__ (this, function (self, string, pos, endpos) {
							if (typeof pos == 'undefined' || (pos != null && pos .hasOwnProperty ("__kwargtrans__"))) {;
								var pos = 0;
							};
							if (typeof endpos == 'undefined' || (endpos != null && endpos .hasOwnProperty ("__kwargtrans__"))) {;
								var endpos = null;
							};
							var target = string;
							var strEndPos = len (string);
							if (endpos !== null) {
								var target = target.__getslice__ (0, endpos, 1);
								var strEndPos = endpos;
							}
							var rObj = self._obj;
							var m = rObj.exec (target);
							if (m) {
								var obsEndPos = m.index + len (m [0]);
								if (m.index == pos && obsEndPos == strEndPos) {
									return Match (m, string, pos, strEndPos, self, self._groupindex);
								}
								else {
									return null;
								}
							}
							else {
								return null;
							}
						});},
						get py_split () {return __get__ (this, function (self, string, maxsplit) {
							if (typeof maxsplit == 'undefined' || (maxsplit != null && maxsplit .hasOwnProperty ("__kwargtrans__"))) {;
								var maxsplit = 0;
							};
							if (maxsplit < 0) {
								return list ([string]);
							}
							var mObj = null;
							var rObj = self._obj;
							if (maxsplit == 0) {
								var mObj = string.py_split (rObj);
								return mObj;
							}
							else {
								var flags = self._flags;
								flags |= GLOBAL;
								var __left0__ = self._compileWrapper (self._jspattern, flags);
								var _ = __left0__ [0];
								var rObj = __left0__ [1];
								var ret = list ([]);
								var lastM = null;
								var cnt = 0;
								for (var i = 0; i < maxsplit; i++) {
									var m = rObj.exec (string);
									if (m) {
										cnt++;
										if (lastM !== null) {
											var start = lastM.index + len (lastM [0]);
											var head = string.__getslice__ (start, m.index, 1);
											ret.append (head);
											if (len (m) > 1) {
												ret.extend (m.__getslice__ (1, null, 1));
											}
										}
										else {
											var head = string.__getslice__ (0, m.index, 1);
											ret.append (head);
											if (len (m) > 1) {
												ret.extend (m.__getslice__ (1, null, 1));
											}
										}
										var lastM = m;
									}
									else {
										break;
									}
								}
								if (lastM !== null) {
									var endPos = lastM.index + len (lastM [0]);
									var end = string.__getslice__ (endPos, null, 1);
									ret.append (end);
								}
								return ret;
							}
						});},
						get _findAllMatches () {return __get__ (this, function (self, string, pos, endpos) {
							if (typeof pos == 'undefined' || (pos != null && pos .hasOwnProperty ("__kwargtrans__"))) {;
								var pos = 0;
							};
							if (typeof endpos == 'undefined' || (endpos != null && endpos .hasOwnProperty ("__kwargtrans__"))) {;
								var endpos = null;
							};
							var target = self._getTargetStr (string, pos, endpos);
							var flags = self._flags;
							flags |= GLOBAL;
							var __left0__ = self._compileWrapper (self._jspattern, flags);
							var _ = __left0__ [0];
							var rObj = __left0__ [1];
							var ret = list ([]);
							while (true) {
								var m = rObj.exec (target);
								if (m) {
									ret.append (m);
								}
								else {
									break;
								}
							}
							return ret;
						});},
						get findall () {return __get__ (this, function (self, string, pos, endpos) {
							if (typeof pos == 'undefined' || (pos != null && pos .hasOwnProperty ("__kwargtrans__"))) {;
								var pos = 0;
							};
							if (typeof endpos == 'undefined' || (endpos != null && endpos .hasOwnProperty ("__kwargtrans__"))) {;
								var endpos = null;
							};
							var mlist = self._findAllMatches (string, pos, endpos);
							var mSelect = function (m) {
								if (len (m) > 2) {
									return tuple (m.__getslice__ (1, null, 1));
								}
								else if (len (m) == 2) {
									return m [1];
								}
								else {
									return m [0];
								}
							};
							var ret = map (mSelect, mlist);
							return ret;
						});},
						get finditer () {return __get__ (this, function (self, string, pos, endpos) {
							if (typeof endpos == 'undefined' || (endpos != null && endpos .hasOwnProperty ("__kwargtrans__"))) {;
								var endpos = null;
							};
							var mlist = self._findAllMatches (string, pos, endpos);
							var ret = map ((function __lambda__ (m) {
								return Match (m, string, 0, len (string), self, self._groupindex);
							}), mlist);
							return py_iter (ret);
						});},
						get sub () {return __get__ (this, function (self, repl, string, count) {
							if (typeof count == 'undefined' || (count != null && count .hasOwnProperty ("__kwargtrans__"))) {;
								var count = 0;
							};
							var __left0__ = self.subn (repl, string, count);
							var ret = __left0__ [0];
							var _ = __left0__ [1];
							return ret;
						});},
						get subn () {return __get__ (this, function (self, repl, string, count) {
							if (typeof count == 'undefined' || (count != null && count .hasOwnProperty ("__kwargtrans__"))) {;
								var count = 0;
							};
							var flags = self._flags;
							flags |= GLOBAL;
							var __left0__ = self._compileWrapper (self._jspattern, flags);
							var _ = __left0__ [0];
							var rObj = __left0__ [1];
							var ret = '';
							var totalMatch = 0;
							var lastEnd = -(1);
							while (true) {
								if (count > 0) {
									if (totalMatch >= count) {
										if (lastEnd < 0) {
											return tuple ([ret, totalMatch]);
										}
										else {
											ret += string.__getslice__ (lastEnd, m.index, 1);
											return tuple ([ret, totalMatch]);
										}
									}
								}
								var m = rObj.exec (string);
								if (m) {
									if (lastEnd < 0) {
										ret += string.__getslice__ (0, m.index, 1);
									}
									else {
										ret += string.__getslice__ (lastEnd, m.index, 1);
									}
									if (callable (repl)) {
										var content = repl (Match (m, string, 0, len (string), self, self._groupindex));
										ret += content;
									}
									else {
										ret += repl;
									}
									totalMatch++;
									var lastEnd = m.index + len (m [0]);
								}
								else if (lastEnd < 0) {
									return tuple ([string, 0]);
								}
								else {
									ret += string.__getslice__ (lastEnd, null, 1);
									return tuple ([ret, totalMatch]);
								}
							}
						});}
					});
					Object.defineProperty (Regex, 'pattern', property.call (Regex, Regex._getPattern, Regex._setPattern));;
					Object.defineProperty (Regex, 'flags', property.call (Regex, Regex._getFlags, Regex._setFlags));;
					Object.defineProperty (Regex, 'groups', property.call (Regex, Regex._getGroups, Regex._setGroups));;
					Object.defineProperty (Regex, 'groupindex', property.call (Regex, Regex._getGroupIndex, Regex._setGroupIndex));;
					var PyRegExp = __class__ ('PyRegExp', [Regex], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, pyPattern, flags) {
							var __left0__ = translate (pyPattern);
							var jsTokens = __left0__ [0];
							var inlineFlags = __left0__ [1];
							var namedGroups = __left0__ [2];
							var nCapGroups = __left0__ [3];
							var n_splits = __left0__ [4];
							flags |= inlineFlags;
							var jsPattern = ''.join (jsTokens);
							Regex.__init__ (self, jsPattern, flags);
							self._pypattern = pyPattern;
							self._nsplits = n_splits;
							self._jsTokens = jsTokens;
							self._capgroups = nCapGroups;
							self._groupindex = namedGroups;
						});}
					});
					var compile = function (pattern, flags) {
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						if (flags & JSSTRICT) {
							var p = Regex (pattern, flags);
						}
						else {
							var p = PyRegExp (pattern, flags);
						}
						return p;
					};
					var search = function (pattern, string, flags) {
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						var p = compile (pattern, flags);
						return p.search (string);
					};
					var match = function (pattern, string, flags) {
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						var p = compile (pattern, flags);
						return p.match (string);
					};
					var fullmatch = function (pattern, string, flags) {
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						var p = compile (pattern, flags);
						return p.fullmatch (string);
					};
					var py_split = function (pattern, string, maxsplit, flags) {
						if (typeof maxsplit == 'undefined' || (maxsplit != null && maxsplit .hasOwnProperty ("__kwargtrans__"))) {;
							var maxsplit = 0;
						};
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						var p = compile (pattern, flags);
						return p.py_split (string, maxsplit);
					};
					var findall = function (pattern, string, flags) {
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						var p = compile (pattern, flags);
						return p.findall (string);
					};
					var finditer = function (pattern, string, flags) {
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						var p = compile (pattern, flags);
						return p.finditer (string);
					};
					var sub = function (pattern, repl, string, count, flags) {
						if (typeof count == 'undefined' || (count != null && count .hasOwnProperty ("__kwargtrans__"))) {;
							var count = 0;
						};
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						var p = compile (pattern, flags);
						return p.sub (repl, string, count);
					};
					var subn = function (pattern, repl, string, count, flags) {
						if (typeof count == 'undefined' || (count != null && count .hasOwnProperty ("__kwargtrans__"))) {;
							var count = 0;
						};
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						var p = compile (pattern, flags);
						return p.subn (repl, string, count);
					};
					var escape = function (string) {
						var ret = null;
						var replfunc = function (m) {
							if (m [0] == '\\') {
								return '\\\\\\\\';
							}
							else {
								return '\\\\' + m [0];
							}
						};
						
						        var r = /[^A-Za-z\d]/g;
						        ret = string.replace(r, replfunc);
						        
						if (ret !== null) {
							return ret;
						}
						else {
							var __except0__ = Exception ('Failed to escape the passed string');
							__except0__.__cause__ = null;
							throw __except0__;
						}
					};
					var purge = function () {
						// pass;
					};
					__pragma__ ('<use>' +
						're.translate' +
					'</use>')
					__pragma__ ('<all>')
						__all__.A = A;
						__all__.ASCII = ASCII;
						__all__.DEBUG = DEBUG;
						__all__.DOTALL = DOTALL;
						__all__.G = G;
						__all__.GLOBAL = GLOBAL;
						__all__.I = I;
						__all__.IGNORECASE = IGNORECASE;
						__all__.J = J;
						__all__.JSSTRICT = JSSTRICT;
						__all__.L = L;
						__all__.LOCALE = LOCALE;
						__all__.M = M;
						__all__.MULTILINE = MULTILINE;
						__all__.Match = Match;
						__all__.PyRegExp = PyRegExp;
						__all__.ReIndexError = ReIndexError;
						__all__.Regex = Regex;
						__all__.S = S;
						__all__.STICKY = STICKY;
						__all__.T = T;
						__all__.TEMPLATE = TEMPLATE;
						__all__.U = U;
						__all__.UNICODE = UNICODE;
						__all__.VERBOSE = VERBOSE;
						__all__.X = X;
						__all__.Y = Y;
						__all__.__name__ = __name__;
						__all__.compile = compile;
						__all__.error = error;
						__all__.escape = escape;
						__all__.findall = findall;
						__all__.finditer = finditer;
						__all__.fullmatch = fullmatch;
						__all__.match = match;
						__all__.purge = purge;
						__all__.search = search;
						__all__.py_split = py_split;
						__all__.sub = sub;
						__all__.subn = subn;
						__all__.translate = translate;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		're.translate', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var re = {};
					var __name__ = 're.translate';
					var VERBOSE = false;
					var MAX_SHIFTREDUCE_LOOPS = 1000;
					var stringFlags = 'aiLmsux';
					var Group = __class__ ('Group', [object], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, start, end, klass) {
							self.start = start;
							self.end = end;
							self.klass = klass;
						});},
						get __repr__ () {return __get__ (this, function (self) {
							return str (tuple ([self.start, self.end, self.klass]));
						});}
					});
					var generateGroupSpans = function (tokens) {
						var groupInfo = list ([]);
						var idx = 0;
						for (var token of tokens) {
							if (__t__ (token.py_name.startswith ('('))) {
								groupInfo.append (Group (idx, null, token.py_name));
							}
							else if (__t__ (token.py_name == ')')) {
								for (var group of py_reversed (groupInfo)) {
									if (__t__ (group.end === null)) {
										group.end = idx;
									}
								}
							}
							idx++;
						}
						return groupInfo;
					};
					var countCaptureGroups = function (tokens) {
						var groupInfo = generateGroupSpans (tokens);
						var count = 0;
						for (var token of tokens) {
							if (__t__ (token.py_name == '(')) {
								count++;
							}
						}
						return count;
					};
					var getCaptureGroup = function (groupInfo, namedGroups, groupRef) {
						try {
							var id = int (groupRef);
						}
						catch (__except0__) {
							var id = namedGroups [groupRef];
						}
						var search = 0;
						for (var group of groupInfo) {
							if (__t__ (group.klass == '(')) {
								search++;
								if (__t__ (search == id)) {
									return group;
								}
							}
						}
					};
					var splitIfElse = function (tokens, namedGroups) {
						var variants = list ([]);
						var groupInfo = generateGroupSpans (tokens);
						for (var group of groupInfo) {
							if (__t__ (group.klass == '(?<')) {
								var iff = tokens.__getslice__ (0, null, 1);
								var els = tokens.__getslice__ (0, null, 1);
								var conStart = group.start;
								var conEnd = group.end;
								var ref = tokens [conStart + 1].py_name;
								var captureGroup = getCaptureGroup (groupInfo, namedGroups, ref);
								var captureGroupModifier = tokens [captureGroup.end + 1];
								if (__t__ (__t__ (__in__ (captureGroupModifier.py_name, list (['?', '*']))) || captureGroupModifier.py_name.startswith ('{0,'))) {
									if (__t__ (captureGroupModifier.py_name == '?')) {
										iff [captureGroup.end + 1] = null;
									}
									else if (__t__ (captureGroupModifier.py_name == '*')) {
										iff [captureGroup.end + 1] = Token ('+');
									}
									else if (__t__ (captureGroupModifier.py_name.startswith ('{0,'))) {
										iff [captureGroup.end + 1].py_name.__setslice__ (0, 3, null, '{1,');
									}
									els [captureGroup.end + 1] = null;
									var hasElse = false;
									for (var idx = conStart; idx < conEnd; idx++) {
										if (__t__ (tokens [idx].py_name == '|')) {
											var hasElse = true;
											els.py_pop (conEnd);
											iff.__setslice__ (idx, conEnd + 1, null, list ([]));
											els.__setslice__ (conStart, idx + 1, null, list ([]));
											break;
										}
									}
									if (__t__ (!__t__ ((hasElse)))) {
										els.__setslice__ (conStart, conEnd + 1, null, list ([]));
										iff.py_pop (conEnd);
									}
									iff.__setslice__ (conStart, conStart + 3, null, list ([]));
									els.__setslice__ (captureGroup.start, captureGroup.end + 1, null, list ([Token ('('), Token (')')]));
									iff.remove (null);
									els.remove (null);
									variants.append (iff);
									variants.append (els);
								}
								else {
									var pastIff = false;
									for (var idx = conStart; idx < conEnd; idx++) {
										if (__t__ (iff [idx].py_name == '|')) {
											var iff = tokens.__getslice__ (0, idx, 1);
											iff.extend (tokens.__getslice__ (conEnd + 1, null, 1));
											break;
										}
									}
									iff.__setslice__ (conStart, conStart + 3, null, list ([]));
									variants.append (iff);
								}
								break;
							}
						}
						if (__t__ (!__t__ ((variants)))) {
							return list ([tokens]);
						}
						var allVariants = list ([]);
						for (var variant of variants) {
							allVariants.extend (splitIfElse (variant, namedGroups));
						}
						return allVariants;
					};
					var Token = __class__ ('Token', [object], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, py_name, paras, pure) {
							if (typeof paras == 'undefined' || (paras != null && paras .hasOwnProperty ("__kwargtrans__"))) {;
								var paras = null;
							};
							if (typeof pure == 'undefined' || (pure != null && pure .hasOwnProperty ("__kwargtrans__"))) {;
								var pure = false;
							};
							if (__t__ (paras === null)) {
								var paras = list ([]);
							}
							self.py_name = py_name;
							self.paras = paras;
							self.pure = pure;
							self.isModeGroup = false;
						});},
						get __repr__ () {return __get__ (this, function (self) {
							return self.py_name;
						});},
						get resolve () {return __get__ (this, function (self) {
							var paras = '';
							for (var para of self.paras) {
								paras += str (para);
							}
							return self.py_name + paras;
						});}
					});
					var shift = function (stack, queue) {
						var done = !__t__ ((bool (queue)));
						if (__t__ (!__t__ ((done)))) {
							stack.append (Token (queue [0], list ([]), true));
							var queue = queue.__getslice__ (1, null, 1);
						}
						return tuple ([stack, queue, done]);
					};
					var shiftReduce = function (stack, queue, namedGroups, flags) {
						var done = false;
						var high = len (stack) - 1;
						if (__t__ (len (stack) < 2)) {
							var __left0__ = shift (stack, queue);
							var stack = __left0__ [0];
							var queue = __left0__ [1];
							var done = __left0__ [2];
							return tuple ([stack, queue, flags, done]);
						}
						var s0 = (__t__ (len (stack) > 0) ? stack [high] : Token (''));
						var s1 = (__t__ (len (stack) > 1) ? stack [high - 1] : Token (''));
						if (__t__ (VERBOSE)) {
							for (var token of stack) {
								console.log (token.resolve (), '\t', __kwargtrans__ ({end: ''}));
							}
							console.log ('');
						}
						if (__t__ (s1.py_name == '\\')) {
							if (__t__ (s0.py_name == 'A')) {
								stack.__setslice__ (-__t__ ((2)), null, null, list ([Token ('^')]));
							}
							else if (__t__ (s0.py_name == 'a')) {
								stack.__setslice__ (-__t__ ((2)), null, null, list ([Token ('\\07')]));
							}
							else if (__t__ (s0.py_name == 'Z')) {
								stack.__setslice__ (-__t__ ((2)), null, null, list ([Token ('$')]));
							}
							else {
								stack.__setslice__ (-__t__ ((2)), null, null, list ([Token ('\\' + s0.py_name)]));
							}
						}
						else if (__t__ (__t__ (s0.py_name == '$') && s0.pure)) {
							stack.py_pop ();
							stack.extend (list ([Token ('(?='), Token ('\\n'), Token ('?'), Token ('$'), Token (')')]));
						}
						else if (__t__ (s1.py_name == '{')) {
							if (__t__ (__t__ (s0.py_name == ',') && len (s1.paras) == 0)) {
								s1.paras.append ('0');
								s1.paras.append (',');
							}
							else if (__t__ (s0.py_name == '}')) {
								s1.paras.append ('}');
								s1.py_name = s1.resolve ();
								s1.paras = list ([]);
							}
							else {
								s1.paras.append (s0.py_name);
							}
							var stack = stack.__getslice__ (0, -__t__ ((1)), 1);
						}
						else if (__t__ (__t__ (s1.py_name == '[') && s0.py_name == '^')) {
							stack.__setslice__ (-__t__ ((2)), null, null, list ([Token ('[^')]));
						}
						else if (__t__ (__t__ (s1.py_name == '(') && s0.py_name == '?')) {
							stack.__setslice__ (-__t__ ((2)), null, null, list ([Token ('(?')]));
						}
						else if (__t__ (__t__ (__in__ (s1.py_name, list (['*', '+', '?']))) && s0.py_name == '?')) {
							stack.__setslice__ (-__t__ ((2)), null, null, list ([Token (s1.py_name + '?')]));
						}
						else if (__t__ (__t__ (s1.isModeGroup) && s0.py_name == ')')) {
							var stack = stack.__getslice__ (0, -__t__ ((2)), 1);
						}
						else if (__t__ (s1.py_name == '(?')) {
							if (__t__ (__in__ (s0.py_name, stringFlags))) {
								if (__t__ (s0.py_name == 'i')) {
									flags |= re.IGNORECASE;
								}
								else if (__t__ (s0.py_name == 'L')) {
									flags |= re.LOCALE;
								}
								else if (__t__ (s0.py_name == 'm')) {
									flags |= re.MULTILINE;
								}
								else if (__t__ (s0.py_name == 's')) {
									flags |= re.DOTALL;
								}
								else if (__t__ (s0.py_name == 'u')) {
									flags |= re.UNICODE;
								}
								else if (__t__ (s0.py_name == 'x')) {
									flags |= re.VERBOSE;
								}
								else if (__t__ (s0.py_name == 'a')) {
									flags |= re.ASCII;
								}
								stack.py_pop ();
								s1.isModeGroup = true;
							}
							else {
								if (__t__ (s0.py_name == '(')) {
									s0.py_name = '<';
								}
								var newToken = Token ('(?' + s0.py_name);
								stack.__setslice__ (-__t__ ((2)), null, null, list ([newToken]));
							}
						}
						else if (__t__ (s1.py_name == '(?<')) {
							if (__t__ (s0.py_name == ')')) {
								stack.__setslice__ (-__t__ ((1)), null, null, list ([Token (''.join (s1.paras)), Token ('>')]));
								s1.paras = list ([]);
							}
							else {
								s1.paras.append (s0.py_name);
								stack.py_pop ();
							}
						}
						else if (__t__ (s1.py_name == '(?P')) {
							stack.__setslice__ (-__t__ ((2)), null, null, list ([Token ('(?P' + s0.py_name)]));
						}
						else if (__t__ (s1.py_name == '(?P<')) {
							if (__t__ (s0.py_name == '>')) {
								namedGroups [''.join (s1.paras)] = countCaptureGroups (stack) + 1;
								stack.__setslice__ (-__t__ ((2)), null, null, list ([Token ('(')]));
							}
							else {
								s1.paras.append (s0.py_name);
								stack.py_pop ();
							}
						}
						else if (__t__ (s1.py_name == '(?P=')) {
							if (__t__ (s0.py_name == ')')) {
								stack.__setslice__ (-__t__ ((2)), null, null, list ([Token ('\\' + str (namedGroups [s1.paras [0]]))]));
							}
							else if (__t__ (!__t__ ((s1.paras)))) {
								s1.paras.append (s0.py_name);
								stack.py_pop ();
							}
							else {
								s1.paras [0] += s0.py_name;
								stack.py_pop ();
							}
						}
						else if (__t__ (s1.py_name == '(?#')) {
							if (__t__ (s0.py_name == ')')) {
								var stack = stack.__getslice__ (0, -__t__ ((2)), 1);
							}
							else {
								var stack = stack.__getslice__ (0, -__t__ ((1)), 1);
							}
						}
						else {
							var __left0__ = shift (stack, queue);
							var stack = __left0__ [0];
							var queue = __left0__ [1];
							var done = __left0__ [2];
						}
						return tuple ([stack, queue, flags, done]);
					};
					var translate = function (rgx) {
						__nest__ (re, '', __init__ (__world__.re));
						var stack = list ([]);
						var queue = list (rgx);
						var flags = 0;
						var namedGroups = dict ();
						var nloop = 0;
						while (__t__ (true)) {
							nloop++;
							if (__t__ (nloop > MAX_SHIFTREDUCE_LOOPS)) {
								var __except0__ = Exception ();
								__except0__.__cause__ = null;
								throw __except0__;
							}
							var __left0__ = shiftReduce (stack, queue, namedGroups, flags);
							var stack = __left0__ [0];
							var queue = __left0__ [1];
							var flags = __left0__ [2];
							var done = __left0__ [3];
							if (__t__ (done)) {
								break;
							}
						}
						var variants = splitIfElse (stack, namedGroups);
						var n_splits = len (variants);
						var final = list ([]);
						for (var i = 0; i < len (variants); i++) {
							final.extend (variants [i]);
							if (__t__ (i < len (variants) - 1)) {
								final.append (Token ('|'));
							}
						}
						var stack = final;
						var groupInfo = generateGroupSpans (stack);
						var resolvedTokens = list ([]);
						for (var token of stack) {
							var stringed = token.resolve ();
							if (__t__ (__t__ (flags & re.DOTALL) && stringed == '.')) {
								var stringed = '[\\s\\S]';
							}
							resolvedTokens.append (stringed);
						}
						return tuple ([resolvedTokens, flags, namedGroups, countCaptureGroups (stack), n_splits]);
					};
					__pragma__ ('<use>' +
						're' +
					'</use>')
					__pragma__ ('<all>')
						__all__.Group = Group;
						__all__.MAX_SHIFTREDUCE_LOOPS = MAX_SHIFTREDUCE_LOOPS;
						__all__.Token = Token;
						__all__.VERBOSE = VERBOSE;
						__all__.__name__ = __name__;
						__all__.countCaptureGroups = countCaptureGroups;
						__all__.generateGroupSpans = generateGroupSpans;
						__all__.getCaptureGroup = getCaptureGroup;
						__all__.shift = shift;
						__all__.shiftReduce = shiftReduce;
						__all__.splitIfElse = splitIfElse;
						__all__.stringFlags = stringFlags;
						__all__.translate = translate;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		'time', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __name__ = 'time';
					try {
						var __language = window.navigator.language;
					}
					catch (__except0__) {
						var __language = 'en-US';
					}
					var __debugGetLanguage = function () {
						return __language;
					};
					var __adapt__ = function (request) {
						__language = request.headers ['accept-language'].py_split (',') [0];
					};
					var __date = new Date (0);
					var __now = new Date ();
					var __weekdays = list ([]);
					var __weekdays_long = list ([]);
					var __d = new Date (1467662339080);
					for (var i = 0; i < 7; i++) {
						for (var [l, s] of tuple ([tuple ([__weekdays, 'short']), tuple ([__weekdays_long, 'long'])])) {
							l.append (__d.toLocaleString (__language, dict ({'weekday': s})).lower ());
						}
						__d.setDate (__d.getDate () + 1);
					}
					var __months = list ([]);
					var __months_long = list ([]);
					var __d = new Date (946681200000.0);
					for (var i = 0; i < 12; i++) {
						for (var [l, s] of tuple ([tuple ([__months, 'short']), tuple ([__months_long, 'long'])])) {
							l.append (__d.toLocaleString (__language, dict ({'month': s})).lower ());
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
						for (var m of tuple ([0, 6])) {
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
						for (var i of jj) {
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
						for (var [d, v] of dir_val.py_items ()) {
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
						for (var d of __lu.py_keys ()) {
							var k = '%' + d;
							if (!(__in__ (k, f))) {
								continue;
							}
							var v = zf2 (t [__lu [d]]);
							var f = f.py_replace (k, v);
						}
						for (var [d, l, pos] of tuple ([tuple (['b', __months, 1]), tuple (['B', __months_long, 1]), tuple (['a', __weekdays, 6]), tuple (['A', __weekdays_long, 6])])) {
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
						__all__.__adapt__ = __adapt__;
						__all__.__d = __d;
						__all__.__date = __date;
						__all__.__debugGetLanguage = __debugGetLanguage;
						__all__.__jan_jun_tz = __jan_jun_tz;
						__all__.__language = __language;
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
	__nest__ (
		__all__,
		'units', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var random = {};
					var __name__ = 'units';
					__nest__ (random, '', __init__ (__world__.random));
					var three = __init__ (__world__.org.threejs);
					var wrap = __init__ (__world__.utils).wrap;
					var AABB = __init__ (__world__.utils).AABB;
					var Unit = __class__ ('Unit', [object], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self) {
							self.geo = null;
							self.momentum = three.Vector3 (0, 0, 0);
						});},
						get get_position () {return __get__ (this, function (self) {
							return self.geo.position;
						});},
						get set_position () {return __get__ (this, function (self, p) {
							self.geo.position.set (p.x, p.y, p.z);
						});},
						get py_update () {return __get__ (this, function (self, t) {
							if (self.visible) {
								var current_pos = self.geo.position;
								var move = three.Vector3 ().copy (self.momentum).multiplyScalar (t);
								var current_pos = current_pos.add (move);
								self.geo.position.set (current_pos.x, current_pos.y, current_pos.z);
							}
						});},
						get get_vis () {return __get__ (this, function (self) {
							return self.geo.visible;
						});},
						get set_vis () {return __get__ (this, function (self, v) {
							self.geo.visible = v;
						});}
					});
					Object.defineProperty (Unit, 'visible', property.call (Unit, Unit.get_vis, Unit.set_vis));;
					Object.defineProperty (Unit, 'position', property.call (Unit, Unit.get_position, Unit.set_position));;
					var Ship = __class__ ('Ship', [Unit], {
						__module__: __name__,
						ROTATE_SPEED: 2.1,
						THRUST: 45,
						get __init__ () {return __get__ (this, function (self, keyboard, game) {
							Unit.__init__ (self);
							self.keyboard = keyboard;
							self.geo = three.Mesh (three.ConeBufferGeometry (1, 3, 8), three.MeshNormalMaterial ());
							var exhaust = three.Mesh (three.ConeBufferGeometry (0.5, 2, 8), three.MeshBasicMaterial (dict ({'color': 16776960})));
							self.geo.add (exhaust);
							exhaust.translateY (-(2));
							exhaust.rotateZ (3.14159);
							self.exhaust = exhaust;
							self.momentum = three.Vector3 (0, 0, 0);
							self.keyboard = keyboard;
							self.bbox = AABB (2, 3, self.geo.position);
							self.game = game;
						});},
						get thrust () {return __get__ (this, function (self, amt) {
							var thrust_amt = amt * self.THRUST;
							self.momentum = self.momentum.add (self.heading.multiplyScalar (thrust_amt));
							self.exhaust.visible = amt > 0;
						});},
						get spin () {return __get__ (this, function (self, amt) {
							self.geo.rotateZ ((amt * self.ROTATE_SPEED) * -(1));
						});},
						get py_update () {return __get__ (this, function (self, t) {
							Unit.py_update (self, t);
							self.bbox.py_update (self.position);
						});},
						get get_heading () {return __get__ (this, function (self) {
							var m = self.geo.matrixWorld.elements;
							return three.Vector3 (m [4], m [5], m [6]);
						});}
					});
					Object.defineProperty (Ship, 'heading', property.call (Ship, Ship.get_heading));;
					var Asteroid = __class__ ('Asteroid', [Unit], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, radius, pos) {
							Unit.__init__ (self);
							self.radius = radius;
							self.geo = three.Mesh (three.SphereGeometry (self.radius), three.MeshNormalMaterial ());
							self.geo.position.set (pos.x, pos.y, pos.z);
							self.bbox = AABB (self.radius * 2, self.radius * 2, self.geo.position);
							self.momentum = three.Vector3 (0, 0, 0);
						});},
						get py_update () {return __get__ (this, function (self, t) {
							Unit.py_update (self, t);
							self.bbox.py_update (self.position);
						});}
					});
					var Bullet = __class__ ('Bullet', [object], {
						__module__: __name__,
						EXPIRES: 1,
						RESET_POS: three.Vector3 (0, 0, 1000),
						BULLET_SPEED: 50,
						get __init__ () {return __get__ (this, function (self) {
							self.vector = three.Vector3 (0, 0, 0);
							self.geo = three.Mesh (three.BoxGeometry (0.25, 0.25, 0.25), three.MeshBasicMaterial (dict ({'color': 16777215})));
							self.lifespan = 0;
							self.momentum = three.Vector3 (0, 0, 0);
							self.reset ();
						});},
						get py_update () {return __get__ (this, function (self, t) {
							if (self.geo.position.z < 1000) {
								self.lifespan += t;
								if (self.lifespan > self.EXPIRES) {
									self.reset ();
									return ;
								}
								var delta = three.Vector3 ().copy (self.vector);
								delta.multiplyScalar (self.BULLET_SPEED * t);
								delta.add (self.momentum);
								var current_pos = self.geo.position.add (delta);
								self.geo.position.set (current_pos.x, current_pos.y, current_pos.z);
								wrap (self.geo);
							}
						});},
						get reset () {return __get__ (this, function (self) {
							self.lifespan = 0;
							self.momentum = three.Vector3 (0, 0, 0);
							self.geo.position.set (self.RESET_POS.x, self.RESET_POS.y, self.RESET_POS.z);
						});},
						get get_position () {return __get__ (this, function (self) {
							return self.geo.position;
						});}
					});
					Object.defineProperty (Bullet, 'position', property.call (Bullet, Bullet.get_position));;
					__pragma__ ('<use>' +
						'org.threejs' +
						'random' +
						'utils' +
					'</use>')
					__pragma__ ('<all>')
						__all__.AABB = AABB;
						__all__.Asteroid = Asteroid;
						__all__.Bullet = Bullet;
						__all__.Ship = Ship;
						__all__.Unit = Unit;
						__all__.__name__ = __name__;
						__all__.three = three;
						__all__.wrap = wrap;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		'utils', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __name__ = 'utils';
					var three = __init__ (__world__.org.threejs);
					var pad_wrap = function (min, max, val) {
						if (val < min) {
							return max;
						}
						if (val > max) {
							return min;
						}
						return val;
					};
					var XWRAP = 0;
					var XNWRAP = 0;
					var YWRAP = 0;
					var YNWRAP = 0;
					var set_limits = function (x, y) {
						XWRAP = int (x);
						XNWRAP = -(1) * XWRAP;
						YWRAP = int (y);
						YNWRAP = -(1) * YWRAP;
					};
					var wrap = function (obj) {
						var __left0__ = tuple ([obj.position.x, obj.position.y, obj.position.z]);
						var x = __left0__ [0];
						var y = __left0__ [1];
						var z = __left0__ [2];
						var x = pad_wrap (XNWRAP, XWRAP, x);
						var y = pad_wrap (YNWRAP, YWRAP, y);
						obj.position.set (x, y, z);
					};
					var clamp = function (val, low, high) {
						return max (min (val, high), low);
					};
					var sign = function (val) {
						if (val > 0) {
							return 1;
						}
						if (val < 0) {
							return -(1);
						}
						return 0;
					};
					var now = function () {
						var d = new Date;
						return d.getTime () / 1000.0;
					};
					var set_element = function (id, value) {
						document.getElementById (id).innerHTML = value;
					};
					var AABB = __class__ ('AABB', [object], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, width, height, center) {
							self.hw = width / 2.0;
							self.hh = width / 2.0;
							self.position = center;
						});},
						get contains () {return __get__ (this, function (self, item) {
							var x = self.position.x;
							var y = self.position.y;
							var h = self.hh;
							var w = self.hw;
							return item.x > x - w && item.x < x + w && item.y > y - h && item.y < y + h;
						});},
						get py_update () {return __get__ (this, function (self, pos) {
							self.position = pos;
						});}
					});
					var FPSCounter = __class__ ('FPSCounter', [object], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, hud_element) {
							self.frames = list ([0.1]);
							for (var n = 0; n < 99; n++) {
								self.frames.append (0.1);
							}
							self.next_frame = 0;
							self.average = 0;
							self.visible = true;
							self.element = hud_element;
						});},
						get py_update () {return __get__ (this, function (self, t) {
							self.frames [self.next_frame] = t;
							self.next_frame++;
							if (self.next_frame > 99) {
								self.next_frame = 0;
							}
							var sum = (function __lambda__ (a, b) {
								return a + b;
							});
							var total = 0;
							for (var n = 0; n < 100; n++) {
								total += self.frames [n];
							}
							self.average = total * 10;
							if (self.visible) {
								self.element.innerHTML = '{} fps'.format (int (1000 / self.average));
							}
						});}
					});
					var advance = function (cr, value) {
						(function () {return cr.next (value).value}) ();
					};
					var coroutine = function (loop, callback) {
						var callback_fn = (callback !== null ? callback : (function __lambda__ (a) {
							return a;
						}));
						var coroutine_generator = function* () {
							var alive = true;
							var result = null;
							while (alive) {
								var next_value = yield;
								var __left0__ = loop (next_value);
								var alive = __left0__ [0];
								var result = __left0__ [1];
								yield result;
							}
							yield callback_fn (result);
						};
						var cr = coroutine_generator ();
						cr.advance = (function __lambda__ (a) {
							return advance (cr, a);
						});
						return cr;
					};
					var timer = function (duration, loop, callback) {
						var expires_at = now () + duration;
						var loop_fn = (loop !== null ? loop : (function __lambda__ (a) {
							return tuple ([true, a]);
						}));
						var callback_fn = (callback !== null ? callback : (function __lambda__ (a) {
							return a;
						}));
						var timer_coroutine = function* () {
							var alive = true;
							var result = null;
							while (alive) {
								var next_value = yield;
								var __left0__ = loop_fn (next_value);
								var alive = __left0__ [0];
								var result = __left0__ [1];
								var alive = alive && now () < expires_at;
								yield result;
							}
							yield callback_fn (result);
						};
						var tc = timer_coroutine ();
						tc.advance = (function __lambda__ (a) {
							return advance (tc, a);
						});
						return tc;
					};
					__pragma__ ('<use>' +
						'org.threejs' +
					'</use>')
					__pragma__ ('<all>')
						__all__.AABB = AABB;
						__all__.FPSCounter = FPSCounter;
						__all__.XNWRAP = XNWRAP;
						__all__.XWRAP = XWRAP;
						__all__.YNWRAP = YNWRAP;
						__all__.YWRAP = YWRAP;
						__all__.__name__ = __name__;
						__all__.advance = advance;
						__all__.clamp = clamp;
						__all__.coroutine = coroutine;
						__all__.now = now;
						__all__.pad_wrap = pad_wrap;
						__all__.set_element = set_element;
						__all__.set_limits = set_limits;
						__all__.sign = sign;
						__all__.three = three;
						__all__.timer = timer;
						__all__.wrap = wrap;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		'warnings', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var re = {};
					var __name__ = 'warnings';
					__nest__ (re, '', __init__ (__world__.re));
					var Actions = __class__ ('Actions', [object], {
						__module__: __name__,
						error: 'error',
						ignore: 'ignore',
						always: 'always',
						defaultact: 'default',
						module: 'module',
						once: 'once'
					});
					var ActionSet = set ((function () {
						var __accu0__ = [];
						for (var x of dir (Actions)) {
							if (!(x.startswith ('_'))) {
								__accu0__.append (x);
							}
						}
						return __accu0__;
					}) ());
					var CategoryMap = dict ({'UserWarning': UserWarning, 'DeprecationWarning': DeprecationWarning, 'RuntimeWarning': RuntimeWarning});
					var _warnings_defaults = false;
					var filters = list ([]);
					var defaultaction = Actions.defaultact;
					var onceregistry = dict ({});
					var _filters_version = 1;
					var _filters_mutated = function () {
						_filters_version++;
					};
					var showwarning = function (message, category, filename, lineno, file, line) {
						if (typeof file == 'undefined' || (file != null && file .hasOwnProperty ("__kwargtrans__"))) {;
							var file = null;
						};
						if (typeof line == 'undefined' || (line != null && line .hasOwnProperty ("__kwargtrans__"))) {;
							var line = null;
						};
						var msg = WarningMessage (message, category, filename, lineno, file, line);
						_showwarnmsg_impl (msg);
					};
					var formatwarning = function (message, category, filename, lineno, line) {
						if (typeof line == 'undefined' || (line != null && line .hasOwnProperty ("__kwargtrans__"))) {;
							var line = null;
						};
						var msg = WarningMessage (message, category, filename, lineno, null, line);
						return _formatwarnmsg_impl (msg);
					};
					var _showwarnmsg_impl = function (msg) {
						var f = msg.file;
						var text = _formatwarnmsg (msg);
						if (f === null) {
							var text = text.rstrip ('\r\n');
							console.log (text);
						}
						else {
							try {
								f.write (text);
							}
							catch (__except0__) {
								if (isinstance (__except0__, Exception)) {
									var exc = __except0__;
									// pass;
								}
								else {
									throw __except0__;
								}
							}
						}
					};
					var _formatwarnmsg_impl = function (msg) {
						var s = '{}:{}: {}: {}\n'.format (msg.filename, msg.lineno, msg.category, str (msg.message));
						if (msg.line) {
							var line = msg.line.strip ();
							s += '  {}\n'.format (line);
						}
						return s;
					};
					var _showwarning = showwarning;
					var setShowWarning = function (func) {
						if (!(callable (func))) {
							var __except0__ = py_TypeError ('showwarning method must be callable');
							__except0__.__cause__ = null;
							throw __except0__;
						}
						showwarning = func;
					};
					var _showwarnmsg = function (msg) {
						if (!(callable (showwarning))) {
							var __except0__ = py_TypeError ('warnings.showwarning() must be set to a function or method');
							__except0__.__cause__ = null;
							throw __except0__;
						}
						showwarning (msg.message, msg.category, msg.filename, msg.lineno, msg.file, msg.line);
					};
					var _formatwarning = formatwarning;
					var _formatwarnmsg = function (msg) {
						if (formatwarning !== _formatwarning) {
							return formatwarning (msg.message, msg.category, msg.filename, msg.lineno, __kwargtrans__ ({line: msg.line}));
						}
						return _formatwarnmsg_impl (msg);
					};
					var addWarningCategory = function (cat) {
						var py_name = cat.__name__;
						if (!__in__ (py_name, CategoryMap)) {
							CategoryMap [py_name] = cat;
						}
						else {
							var __except0__ = Exception ('Warning Category {} already exists'.format (py_name));
							__except0__.__cause__ = null;
							throw __except0__;
						}
					};
					var filterwarnings = function (action, message, category, module, lineno, append) {
						if (typeof message == 'undefined' || (message != null && message .hasOwnProperty ("__kwargtrans__"))) {;
							var message = '';
						};
						if (typeof category == 'undefined' || (category != null && category .hasOwnProperty ("__kwargtrans__"))) {;
							var category = Warning;
						};
						if (typeof module == 'undefined' || (module != null && module .hasOwnProperty ("__kwargtrans__"))) {;
							var module = '';
						};
						if (typeof lineno == 'undefined' || (lineno != null && lineno .hasOwnProperty ("__kwargtrans__"))) {;
							var lineno = 0;
						};
						if (typeof append == 'undefined' || (append != null && append .hasOwnProperty ("__kwargtrans__"))) {;
							var append = false;
						};
						if (arguments.length) {
							var __ilastarg0__ = arguments.length - 1;
							if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
								var __allkwargs0__ = arguments [__ilastarg0__--];
								for (var __attrib0__ in __allkwargs0__) {
									switch (__attrib0__) {
										case 'action': var action = __allkwargs0__ [__attrib0__]; break;
										case 'message': var message = __allkwargs0__ [__attrib0__]; break;
										case 'category': var category = __allkwargs0__ [__attrib0__]; break;
										case 'module': var module = __allkwargs0__ [__attrib0__]; break;
										case 'lineno': var lineno = __allkwargs0__ [__attrib0__]; break;
										case 'append': var append = __allkwargs0__ [__attrib0__]; break;
									}
								}
							}
						}
						else {
						}
						assert (__in__ (action, ActionSet), 'invalid action: {}'.format (action));
						assert (isinstance (message, str), 'message must be a string');
						assert (isinstance (module, str), 'module must be a string');
						assert (isinstance (lineno, int) && lineno >= 0, 'lineno must be an int >= 0');
						_add_filter (action, re.compile (message, re.I), category, re.compile (module), lineno, __kwargtrans__ ({append: append}));
					};
					var simplefilter = function (action, category, lineno, append) {
						if (typeof category == 'undefined' || (category != null && category .hasOwnProperty ("__kwargtrans__"))) {;
							var category = Warning;
						};
						if (typeof lineno == 'undefined' || (lineno != null && lineno .hasOwnProperty ("__kwargtrans__"))) {;
							var lineno = 0;
						};
						if (typeof append == 'undefined' || (append != null && append .hasOwnProperty ("__kwargtrans__"))) {;
							var append = false;
						};
						if (arguments.length) {
							var __ilastarg0__ = arguments.length - 1;
							if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
								var __allkwargs0__ = arguments [__ilastarg0__--];
								for (var __attrib0__ in __allkwargs0__) {
									switch (__attrib0__) {
										case 'action': var action = __allkwargs0__ [__attrib0__]; break;
										case 'category': var category = __allkwargs0__ [__attrib0__]; break;
										case 'lineno': var lineno = __allkwargs0__ [__attrib0__]; break;
										case 'append': var append = __allkwargs0__ [__attrib0__]; break;
									}
								}
							}
						}
						else {
						}
						assert (__in__ (action, ActionSet), 'invalid action: {}'.format (action));
						assert (isinstance (lineno, int) && lineno >= 0, 'lineno must be an int >= 0');
						_add_filter (action, null, category, null, lineno, __kwargtrans__ ({append: append}));
					};
					var _add_filter = function () {
						if (arguments.length) {
							var __ilastarg0__ = arguments.length - 1;
							if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
								var __allkwargs0__ = arguments [__ilastarg0__--];
								for (var __attrib0__ in __allkwargs0__) {
									switch (__attrib0__) {
										case 'append': var append = __allkwargs0__ [__attrib0__]; break;
									}
								}
							}
							var item = tuple ([].slice.apply (arguments).slice (0, __ilastarg0__ + 1));
						}
						else {
							var item = tuple ();
						}
						if (!(append)) {
							try {
								filters.remove (item);
							}
							catch (__except0__) {
								if (isinstance (__except0__, Exception)) {
									// pass;
								}
								else {
									throw __except0__;
								}
							}
							filters.insert (0, item);
						}
						else if (!__in__ (item, filters)) {
							filters.append (item);
						}
						_filters_mutated ();
					};
					var resetwarnings = function () {
						var filters = list ([]);
						_filters_mutated ();
					};
					var __warningregistry__ = dict ({});
					var _checkCatMatch = function (msgCat, filtCat) {
						return msgCat.__name__ == filtCat.__name__;
					};
					var warn_explicit = function (message, category, filename, lineno, module, registry, module_globals) {
						if (typeof module == 'undefined' || (module != null && module .hasOwnProperty ("__kwargtrans__"))) {;
							var module = null;
						};
						if (typeof registry == 'undefined' || (registry != null && registry .hasOwnProperty ("__kwargtrans__"))) {;
							var registry = null;
						};
						if (typeof module_globals == 'undefined' || (module_globals != null && module_globals .hasOwnProperty ("__kwargtrans__"))) {;
							var module_globals = null;
						};
						var lineno = int (lineno);
						if (module === null) {
							var module = filename || '<unknown>';
							if (module.__getslice__ (-(3), null, 1).lower () == '.py') {
								var module = module.__getslice__ (0, -(3), 1);
							}
						}
						if (registry === null) {
							var registry = __warningregistry__;
						}
						try {
							var currVersion = registry ['version'];
						}
						catch (__except0__) {
							if (isinstance (__except0__, KeyError)) {
								var currVersion = 0;
							}
							else {
								throw __except0__;
							}
						}
						if (currVersion != _filters_version) {
							registry.py_clear ();
							registry ['version'] = _filters_version;
						}
						if (isinstance (message, Warning)) {
							var text = str (message);
							var category = message.__class__;
						}
						else {
							var text = message;
							var message = category (message);
						}
						var key = tuple ([text, category, lineno]);
						if (__in__ (key, registry)) {
							return ;
						}
						var __break0__ = false;
						for (var item of filters) {
							var __left0__ = item;
							var action = __left0__ [0];
							var msg = __left0__ [1];
							var cat = __left0__ [2];
							var mod = __left0__ [3];
							var ln = __left0__ [4];
							if ((msg === null || msg.match (text)) && _checkCatMatch (category, cat) && (mod === null || mod.match (module)) && (ln == 0 || lineno == ln)) {
								__break0__ = true;
								break;
							}
						}
						if (!__break0__) {
							var action = defaultaction;
						}
						if (action == Actions.ignore) {
							registry [key] = 1;
							return ;
						}
						if (action == Actions.error) {
							var __except0__ = message;
							__except0__.__cause__ = null;
							throw __except0__;
						}
						if (action == Actions.once) {
							registry [key] = 1;
							var oncekey = tuple ([text, category]);
							if (__in__ (oncekey, onceregistry)) {
								return ;
							}
							onceregistry [oncekey] = 1;
						}
						else if (action == Actions.always) {
							// pass;
						}
						else if (action == Actions.module) {
							registry [key] = 1;
							var altkey = tuple ([text, category, 0]);
							if (__in__ (altkey, registry)) {
								return ;
							}
							registry [altkey] = 1;
						}
						else if (action == Actions.defaultact) {
							registry [key] = 1;
						}
						else {
							var __except0__ = RuntimeError ('Unrecognized action ({}) in warnings.filters:\n {}'.format (action, item));
							__except0__.__cause__ = null;
							throw __except0__;
						}
						var msg = WarningMessage (message, category.__name__, filename, lineno);
						_showwarnmsg (msg);
					};
					var WarningMessage = __class__ ('WarningMessage', [object], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, message, category, filename, lineno, file, line) {
							if (typeof file == 'undefined' || (file != null && file .hasOwnProperty ("__kwargtrans__"))) {;
								var file = null;
							};
							if (typeof line == 'undefined' || (line != null && line .hasOwnProperty ("__kwargtrans__"))) {;
								var line = null;
							};
							self.message = message;
							self.category = category;
							self.filename = filename;
							self.lineno = lineno;
							self.file = file;
							self.line = line;
							self._category_name = (category ? category.__name__ : null);
						});},
						get __str__ () {return __get__ (this, function (self) {
							return '{{message : {}, category : {}, filename : {}, lineno : {}, line : {} }}'.format (self.message, self._category_name, self.filename, self.lineno, self.line);
						});}
					});
					var catch_warnings = __class__ ('catch_warnings', [object], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self) {
							var record = false;
							var module = null;
							self._record = record;
							self._entered = false;
							var __except0__ = NotImplementedError ('with/as not well supported in transcrypt');
							__except0__.__cause__ = null;
							throw __except0__;
						});}
					});
					var setWarningOptions = function (opts) {
						_processoptions (opts);
					};
					var _OptionError = __class__ ('_OptionError', [Exception], {
						__module__: __name__,
					});
					var _processoptions = function (args) {
						for (var arg of args) {
							try {
								_setoption (arg);
							}
							catch (__except0__) {
								if (isinstance (__except0__, _OptionError)) {
									var msg = __except0__;
									console.log ('WARNING: Invalid -W option ignored: {}'.format (msg));
								}
								else {
									throw __except0__;
								}
							}
						}
					};
					var _setoption = function (arg) {
						var parts = arg.py_split (':');
						if (len (parts) > 5) {
							var __except0__ = _OptionError ('too many fields (max 5): {}'.format (arg));
							__except0__.__cause__ = null;
							throw __except0__;
						}
						while (len (parts) < 5) {
							parts.append ('');
						}
						var __left0__ = (function () {
							var __accu0__ = [];
							for (var s of parts) {
								__accu0__.append (s.strip ());
							}
							return __accu0__;
						}) ();
						var action = __left0__ [0];
						var message = __left0__ [1];
						var category = __left0__ [2];
						var module = __left0__ [3];
						var lineno = __left0__ [4];
						var action = _getaction (action);
						var message = re.escape (message);
						var category = _getcategory (category);
						var module = re.escape (module);
						if (module) {
							var module = module + '$';
						}
						if (lineno) {
							try {
								var lineno = int (lineno);
								if (lineno < 0) {
									var __except0__ = ValueError;
									__except0__.__cause__ = null;
									throw __except0__;
								}
							}
							catch (__except0__) {
								if (isinstance (__except0__, tuple ([ValueError, OverflowError]))) {
									var __except1__ = _OptionError ('invalid lineno {}'.format (lineno));
									__except1__.__cause__ = null;
									throw __except1__;
								}
								else {
									throw __except0__;
								}
							}
						}
						else {
							var lineno = 0;
						}
						filterwarnings (action, message, category, module, lineno);
					};
					var _getaction = function (action) {
						if (!(action)) {
							return Actions.defaultact;
						}
						if (action == 'all') {
							return Action.always;
						}
						for (var a of ActionSet) {
							if (a.startswith (action)) {
								return a;
							}
						}
						var __except0__ = _OptionError ('invalid action: {}'.format (action));
						__except0__.__cause__ = null;
						throw __except0__;
					};
					var _getcategory = function (category) {
						if (!(category)) {
							return Warning;
						}
						if (__in__ (category, CategoryMap.py_keys ())) {
							try {
								var cat = CategoryMap [category];
							}
							catch (__except0__) {
								if (isinstance (__except0__, NameError)) {
									var __except1__ = _OptionError ('unknown warning category: {}'.format (category));
									__except1__.__cause__ = null;
									throw __except1__;
								}
								else {
									throw __except0__;
								}
							}
						}
						else {
							var __except0__ = Exception ('Unable to import category: {}, use `addWarningCategory`'.format (category));
							__except0__.__cause__ = null;
							throw __except0__;
						}
						return cat;
					};
					if (!(_warnings_defaults)) {
						var silence = list ([DeprecationWarning]);
						for (var cls of silence) {
							simplefilter (Actions.ignore, __kwargtrans__ ({category: cls}));
						}
					}
					__pragma__ ('<use>' +
						're' +
					'</use>')
					__pragma__ ('<all>')
						__all__.ActionSet = ActionSet;
						__all__.Actions = Actions;
						__all__.CategoryMap = CategoryMap;
						__all__.WarningMessage = WarningMessage;
						__all__._OptionError = _OptionError;
						__all__.__name__ = __name__;
						__all__.__warningregistry__ = __warningregistry__;
						__all__._add_filter = _add_filter;
						__all__._checkCatMatch = _checkCatMatch;
						__all__._filters_mutated = _filters_mutated;
						__all__._filters_version = _filters_version;
						__all__._formatwarning = _formatwarning;
						__all__._formatwarnmsg = _formatwarnmsg;
						__all__._formatwarnmsg_impl = _formatwarnmsg_impl;
						__all__._getaction = _getaction;
						__all__._getcategory = _getcategory;
						__all__._processoptions = _processoptions;
						__all__._setoption = _setoption;
						__all__._showwarning = _showwarning;
						__all__._showwarnmsg = _showwarnmsg;
						__all__._showwarnmsg_impl = _showwarnmsg_impl;
						__all__._warnings_defaults = _warnings_defaults;
						__all__.addWarningCategory = addWarningCategory;
						__all__.catch_warnings = catch_warnings;
						__all__.cls = cls;
						__all__.defaultaction = defaultaction;
						__all__.filters = filters;
						__all__.filterwarnings = filterwarnings;
						__all__.formatwarning = formatwarning;
						__all__.onceregistry = onceregistry;
						__all__.resetwarnings = resetwarnings;
						__all__.setShowWarning = setShowWarning;
						__all__.setWarningOptions = setWarningOptions;
						__all__.showwarning = showwarning;
						__all__.silence = silence;
						__all__.simplefilter = simplefilter;
						__all__.warn_explicit = warn_explicit;
					__pragma__ ('</all>')
				}
			}
		}
	);
	(function () {
		var audio = {};
		var logging = {};
		var math = {};
		var random = {};
		var __name__ = '__main__';
		__nest__ (logging, '', __init__ (__world__.logging));
		__nest__ (math, '', __init__ (__world__.math));
		__nest__ (random, '', __init__ (__world__.random));
		__nest__ (audio, '', __init__ (__world__.audio));
		var three =  __init__ (__world__.org.threejs);
		var Keyboard = __init__ (__world__.controls).Keyboard;
		var ControlAxis = __init__ (__world__.controls).ControlAxis;
		var Ship = __init__ (__world__.units).Ship;
		var Asteroid = __init__ (__world__.units).Asteroid;
		var Bullet = __init__ (__world__.units).Bullet;
		var wrap = __init__ (__world__.utils).wrap;
		var now = __init__ (__world__.utils).now;
		var FPSCounter = __init__ (__world__.utils).FPSCounter;
		var coroutine = __init__ (__world__.utils).coroutine;
		var clamp = __init__ (__world__.utils).clamp;
		var set_limits = __init__ (__world__.utils).set_limits;
		var DEBUG = true;
		var logger = logging.getLogger ('root');
		logger.addHandler (logging.StreamHandler ());
		if (DEBUG) {
			logger.setLevel (logging.INFO);
			logger.info ('====== debug logging on =====');
		}
		var waiter = function () {
			var args = tuple ([].slice.apply (arguments).slice (0));
			return tuple ([true, args [0]]);
		};
		var done = function () {
			var args = tuple ([].slice.apply (arguments).slice (0));
			print ('done at', args [0]);
		};
		var hfov = function (vfov, w, h) {
			return ;
		};
		var Graphics = __class__ ('Graphics', [object], {
			__module__: __name__,
			get __init__ () {return __get__ (this, function (self, w, h, canvas, fov) {
				if (typeof fov == 'undefined' || (fov != null && fov .hasOwnProperty ("__kwargtrans__"))) {;
					var fov = 53.13;
				};
				self.width = float (w);
				self.height = float (h);
				self.scene = three.Scene ();
				self.camera = three.PerspectiveCamera (fov, self.width / self.height, 1, 500);
				self.vfov = math.radians (fov);
				self.hfov = 2 * math.atan (math.tan (math.radians (fov) / 2.0) * ((w / h) * 1.0));
				self.camera.position.set (0, 0, 80);
				self.camera.lookAt (self.scene.position);
				self.renderer = three.WebGLRenderer (dict ({'Antialias': true}));
				self.renderer.setSize (self.width, self.height);
				canvas.appendChild (self.renderer.domElement);
			});},
			get render () {return __get__ (this, function (self) {
				self.renderer.render (self.scene, self.camera);
			});},
			get add () {return __get__ (this, function (self, item) {
				self.scene.add (item.geo);
			});},
			get extent () {return __get__ (this, function (self) {
				var v_extent = math.tan (self.vfov / 2.0) * 80;
				var h_extent = math.tan (self.hfov / 2.0) * 80;
				return tuple ([h_extent, v_extent]);
			});}
		});
		var Audio = __class__ ('Audio', [object], {
			__module__: __name__,
			get __init__ () {return __get__ (this, function (self, audio_path) {
				if (typeof audio_path == 'undefined' || (audio_path != null && audio_path .hasOwnProperty ("__kwargtrans__"))) {;
					var audio_path = '';
				};
				var pth = (function __lambda__ (p) {
					return audio_path + p;
				});
				self.fire_rota = list ([audio.clip (pth ('344276__nsstudios__laser3.wav')), audio.clip (pth ('344276__nsstudios__laser3.wav')), audio.clip (pth ('344276__nsstudios__laser3.wav')), audio.clip (pth ('344276__nsstudios__laser3.wav'))]);
				self.explosion_rota = list ([audio.clip (pth ('108641__juskiddink__nearby-explosion-with-debris.wav')), audio.clip (pth ('108641__juskiddink__nearby-explosion-with-debris.wav')), audio.clip (pth ('108641__juskiddink__nearby-explosion-with-debris.wav')), audio.clip (pth ('108641__juskiddink__nearby-explosion-with-debris.wav'))]);
				self.thrust = audio.loop (pth ('146770__qubodup__rocket-boost-engine-loop.wav'));
				self.fail = audio.clip (pth ('172950__notr__saddertrombones.mp3'));
				self.thrust.play ();
				self.shoot_ctr = 0;
				self.explode_ctr = 0;
			});},
			get fire () {return __get__ (this, function (self) {
				self.fire_rota [__mod__ (self.shoot_ctr, 4)].play ();
				self.shoot_ctr++;
			});},
			get explode () {return __get__ (this, function (self) {
				self.explosion_rota [__mod__ (self.shoot_ctr, 4)].play ();
				self.shoot_ctr++;
			});}
		});
		var Game = __class__ ('Game', [object], {
			__module__: __name__,
			get __init__ () {return __get__ (this, function (self, canvas, fullscreen) {
				if (typeof fullscreen == 'undefined' || (fullscreen != null && fullscreen .hasOwnProperty ("__kwargtrans__"))) {;
					var fullscreen = true;
				};
				self.keyboard = Keyboard ();
				if (fullscreen) {
					self.graphics = Graphics (window.innerWidth, window.innerHeight, canvas);
				}
				else {
					self.graphics = Graphics (canvas.offsetWidth, (3 * canvas.offsetWidth) / 4, canvas);
				}
				self.extents = self.graphics.extent ();
				set_limits (...self.extents);
				self.create_controls ();
				self.ship = null;
				self.bullets = list ([]);
				self.asteroids = list ([]);
				self.helptext = null;
				self.resetter = null;
				self.setup ();
				self.last_frame = now ();
				self.audio = Audio ();
				self.lives = 3;
				self.score = 0;
				self.score_display = document.getElementById ('score');
				self.fps_counter = FPSCounter (document.getElementById ('FPS'));
				var v_center = canvas.offsetHeight / 3;
				var title = document.getElementById ('game_over');
				title.style.top = v_center;
				var hud = document.getElementById ('hud');
				hud.style.width = canvas.offsetWidth;
				hud.style.height = canvas.offsetHeight;
				var frame = document.getElementById ('game_frame');
				frame.style.min_height = canvas.offsetHeight;
			});},
			get create_controls () {return __get__ (this, function (self) {
				self.keyboard.add_handler ('spin', ControlAxis ('ArrowRight', 'ArrowLeft', __kwargtrans__ ({attack: 1, decay: 0.6})));
				self.keyboard.add_handler ('thrust', ControlAxis ('ArrowUp', 'ArrowDown', __kwargtrans__ ({attack: 0.65, decay: 2.5, deadzone: 0.1})));
				self.keyboard.add_handler ('fire', ControlAxis (' ', 'None', __kwargtrans__ ({attack: 10})));
				document.onkeydown = self.keyboard.key_down;
				document.onkeyup = self.keyboard.key_up;
				var suppress_scroll = function (e) {
					if (__in__ (e.keyCode, list ([32, 37, 38, 39, 40]))) {
						e.preventDefault ();
					}
				};
				window.addEventListener ('keydown', suppress_scroll, false);
			});},
			get setup () {return __get__ (this, function (self) {
				self.ship = Ship (self.keyboard, self);
				self.graphics.add (self.ship);
				var rsign = function () {
					if (random.random () < 0.5) {
						return -(1);
					}
					return 1;
				};
				for (var a = 0; a < 8; a++) {
					var x = (random.random () - 0.5) * 2;
					var y = random.random () - 0.5;
					var z = 0;
					var offset = three.Vector3 (x, y, z);
					offset.normalize ();
					var push = random.randint (20, 60);
					var offset = offset.multiplyScalar (push);
					var r = (random.random () + 1.0) * 2.5;
					var asteroid = Asteroid (r, offset);
					var mx = ((random.random () + random.random ()) + random.random (2)) - 2.0;
					var my = ((random.random () + random.random ()) + random.random (2)) - 2.0;
					asteroid.momentum = three.Vector3 (mx, my, 0);
					self.graphics.add (asteroid);
					self.asteroids.append (asteroid);
				}
				for (var b = 0; b < 8; b++) {
					var bullet = Bullet ();
					self.graphics.add (bullet);
					self.bullets.append (bullet);
				}
				self.helptext = self.help_display ();
			});},
			get tick () {return __get__ (this, function (self) {
				if (len (self.asteroids) == 0 || self.lives < 1) {
					document.getElementById ('game_over').style.visibility = 'visible';
					document.getElementById ('credits').style.visibility = 'visible';
					document.getElementById ('game_canvas').style.cursor = 'auto';
					return ;
				}
				requestAnimationFrame (self.tick);
				var t = now () - self.last_frame;
				self.fps_counter.py_update (t);
				self.keyboard.py_update (t);
				if (self.ship.visible) {
					self.handle_input (t);
				}
				var dead = list ([]);
				for (var b of self.bullets) {
					if (b.position.z < 1000) {
						for (var a of self.asteroids) {
							if (a.bbox.contains (b.position)) {
								var d = a.geo.position.distanceTo (b.position);
								if (d < a.radius) {
									b.reset ();
									dead.append (a);
								}
							}
						}
					}
				}
				if (self.ship.visible) {
					for (var a of self.asteroids) {
						if (a.bbox.contains (self.ship.position)) {
							var d = a.geo.position.distanceTo (self.ship.position);
							if (d < a.radius + 0.5) {
								self.resetter = self.kill ();
								print ('!!', self.resetter);
								dead.append (a);
							}
						}
					}
				}
				else {
					self.resetter.advance (t);
				}
				for (var d of dead) {
					self.asteroids.remove (d);
					var new_score = int (100 * d.radius);
					self.update_score (new_score);
					d.geo.visible = false;
					if (d.radius > 1.5) {
						self.audio.explode ();
						var new_asteroids = random.randint (2, 5);
						for (var n = 0; n < new_asteroids; n++) {
							var new_a = Asteroid ((d.radius + 1.0) / new_asteroids, d.position);
							var mx = (random.random () - 0.5) * 6;
							var my = (random.random () - 0.5) * 4;
							new_a.momentum = three.Vector3 ().copy (d.momentum);
							new_a.momentum.add (three.Vector3 (mx, my, 0));
							self.graphics.add (new_a);
							self.asteroids.append (new_a);
						}
					}
				}
				for (var b of self.bullets) {
					b.py_update (t);
				}
				self.ship.py_update (t);
				wrap (self.ship.geo);
				for (var item of self.asteroids) {
					item.py_update (t);
					wrap (item.geo);
				}
				if (self.resetter !== null) {
					self.resetter.advance (t);
				}
				if (self.helptext !== null) {
					self.helptext.advance (t);
				}
				self.graphics.render ();
				self.last_frame = now ();
			});},
			get handle_input () {return __get__ (this, function (self, t) {
				if (self.keyboard.get_axis ('fire') >= 1) {
					var mo = three.Vector3 ().copy (self.ship.momentum).multiplyScalar (t);
					if (self.fire (self.ship.position, self.ship.heading, mo)) {
						self.audio.fire ();
					}
					self.keyboard.py_clear ('fire');
				}
				var spin = self.keyboard.get_axis ('spin');
				self.ship.spin (spin * t);
				var thrust = self.keyboard.get_axis ('thrust');
				self.audio.thrust.volume = clamp (thrust * 5, 0, 1);
				self.ship.thrust (thrust * t);
			});},
			get fire () {return __get__ (this, function (self, pos, vector, momentum, t) {
				for (var each_bullet of self.bullets) {
					if (each_bullet.geo.position.z >= 1000) {
						each_bullet.geo.position.set (pos.x, pos.y, pos.z);
						each_bullet.vector = vector;
						each_bullet.lifespan = 0;
						each_bullet.momentum = three.Vector3 ().copy (momentum).multiplyScalar (0.66);
						return true;
					}
				}
				return false;
			});},
			get kill () {return __get__ (this, function (self) {
				self.lives--;
				self.ship.momentum = three.Vector3 (0, 0, 0);
				self.ship.position = three.Vector3 (0, 0, 0);
				self.ship.geo.setRotationFromEuler (three.Euler (0, 0, 0));
				self.keyboard.py_clear ('spin');
				self.keyboard.py_clear ('thrust');
				self.keyboard.py_clear ('fire');
				self.ship.visible = false;
				self.audio.fail.play ();
				var can_reappear = now () + 3.0;
				var reappear = function (t) {
					if (now () < can_reappear) {
						return tuple ([true, 'waiting']);
					}
					for (var a of self.asteroids) {
						if (a.bbox.contains (self.ship.position)) {
							return tuple ([true, "can't spawn"]);
						}
					}
					return tuple ([false, 'OK']);
				};
				var clear_resetter = function () {
					self.ship.visible = true;
					self.resetter = null;
				};
				var reset = coroutine (reappear, clear_resetter);
				py_next (reset);
				return reset;
			});},
			get help_display () {return __get__ (this, function (self) {
				var messages = 3;
				var repeats = 2;
				var elapsed = 0;
				var count = 0;
				var period = 2.25;
				var display_stuff = function (t) {
					if (count < messages * repeats) {
						elapsed += t / period;
						count = int (elapsed);
						var lintime = __mod__ (elapsed, 1);
						var opacity = math.pow (math.sin (lintime * 3.1415), 2);
						logger.info (lintime);
						document.getElementById ('instructions{}'.format (__mod__ (count, 3))).style.opacity = opacity;
						return tuple ([true, opacity]);
					}
					else {
						return tuple ([false, 'OK']);
					}
				};
				var done = function () {
					document.getElementById ('instructions1').style.visiblity = 'hidden';
				};
				var displayer = coroutine (display_stuff, done);
				py_next (displayer);
				logger.debug ('displayer', displayer);
				return displayer;
			});},
			get update_score () {return __get__ (this, function (self, score) {
				self.score += score;
				self.score_display.innerHTML = self.score;
				print (self.score, self.score_display);
			});}
		});
		var canvas = document.getElementById ('game_canvas');
		var game = Game (canvas, true);
		game.tick ();
		__pragma__ ('<use>' +
			'audio' +
			'controls' +
			'logging' +
			'math' +
			'org.threejs' +
			'random' +
			'units' +
			'utils' +
		'</use>')
		__pragma__ ('<all>')
			__all__.Asteroid = Asteroid;
			__all__.Audio = Audio;
			__all__.Bullet = Bullet;
			__all__.ControlAxis = ControlAxis;
			__all__.DEBUG = DEBUG;
			__all__.FPSCounter = FPSCounter;
			__all__.Game = Game;
			__all__.Graphics = Graphics;
			__all__.Keyboard = Keyboard;
			__all__.Ship = Ship;
			__all__.__name__ = __name__;
			__all__.canvas = canvas;
			__all__.clamp = clamp;
			__all__.coroutine = coroutine;
			__all__.done = done;
			__all__.game = game;
			__all__.hfov = hfov;
			__all__.logger = logger;
			__all__.now = now;
			__all__.set_limits = set_limits;
			__all__.waiter = waiter;
			__all__.wrap = wrap;
		__pragma__ ('</all>')
	}) ();
    return __all__;
}
window ['pysteroids'] = pysteroids ();

//# sourceMappingURL=extra/sourcemap/pysteroids.js.map
