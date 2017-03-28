"use strict";
// Transcrypt'ed from Python, 2017-03-28 16:41:21
function autotest () {
   var __symbols__ = ['__py3.5__', '__esv6__'];
    var __all__ = {};
    var __world__ = __all__;
    
    // Nested object creator, part of the nesting may already exist and have attributes
    var __nest__ = function (headObject, tailNames, value) {
        // In some cases this will be a global object, e.g. 'window'
        var current = headObject;
        
        if (tailNames != '') {  // Split on empty string doesn't give empty list
            // Find the last already created object in tailNames
            var tailChain = tailNames.split ('.');
            var firstNewIndex = tailChain.length;
            for (var index = 0; index < tailChain.length; index++) {
                if (!current.hasOwnProperty (tailChain [index])) {
                    firstNewIndex = index;
                    break;
                }
                current = current [tailChain [index]];
            }
            
            // Create the rest of the objects, if any
            for (var index = firstNewIndex; index < tailChain.length; index++) {
                current [tailChain [index]] = {};
                current = current [tailChain [index]];
            }
        }
        
        // Insert it new attributes, it may have been created earlier and have other attributes
        for (var attrib in value) {
            current [attrib] = value [attrib];          
        }       
    };
    __all__.__nest__ = __nest__;
    
    // Initialize module if not yet done and return its globals
    var __init__ = function (module) {
        if (!module.__inited__) {
            module.__all__.__init__ (module.__all__);
            module.__inited__ = true;
        }
        return module.__all__;
    };
    __all__.__init__ = __init__;
    
    
    // Proxy switch, controlled by __pragma__ ('proxy') and __pragma ('noproxy')
    var __proxy__ = false;  // No use assigning it to __all__, only its transient state is important
    
    
    // Since we want to assign functions, a = b.f should make b.f produce a bound function
    // So __get__ should be called by a property rather then a function
    // Factory __get__ creates one of three curried functions for func
    // Which one is produced depends on what's to the left of the dot of the corresponding JavaScript property
    var __get__ = function (self, func, quotedFuncName) {
        if (self) {
            if (self.hasOwnProperty ('__class__') || typeof self == 'string' || self instanceof String) {           // Object before the dot
                if (quotedFuncName) {                                   // Memoize call since fcall is on, by installing bound function in instance
                    Object.defineProperty (self, quotedFuncName, {      // Will override the non-own property, next time it will be called directly
                        value: function () {                            // So next time just call curry function that calls function
                            var args = [] .slice.apply (arguments);
                            return func.apply (null, [self] .concat (args));
                        },              
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });
                }
                return function () {                                    // Return bound function, code dupplication for efficiency if no memoizing
                    var args = [] .slice.apply (arguments);             // So multilayer search prototype, apply __get__, call curry func that calls func
                    return func.apply (null, [self] .concat (args));
                };
            }
            else {                                                      // Class before the dot
                return func;                                            // Return static method
            }
        }
        else {                                                          // Nothing before the dot
            return func;                                                // Return free function
        }
    }
    __all__.__get__ = __get__;
        
    // Mother of all metaclasses        
    var py_metatype = {
        __name__: 'type',
        __bases__: [],
        
        // Overridable class creation worker
        __new__: function (meta, name, bases, attribs) {
            // Create the class cls, a functor, which the class creator function will return
            var cls = function () {                     // If cls is called with arg0, arg1, etc, it calls its __new__ method with [arg0, arg1, etc]
                var args = [] .slice.apply (arguments); // It has a __new__ method, not yet but at call time, since it is copied from the parent in the loop below
                return cls.__new__ (args);              // Each Python class directly or indirectly derives from object, which has the __new__ method
            };                                          // If there are no bases in the Python source, the compiler generates [object] for this parameter
            
            // Copy all methods, including __new__, properties and static attributes from base classes to new cls object
            // The new class object will simply be the prototype of its instances
            // JavaScript prototypical single inheritance will do here, since any object has only one class
            // This has nothing to do with Python multiple inheritance, that is implemented explictly in the copy loop below
            for (var index = bases.length - 1; index >= 0; index--) {   // Reversed order, since class vars of first base should win
                var base = bases [index];
                for (var attrib in base) {
                    var descrip = Object.getOwnPropertyDescriptor (base, attrib);
                    Object.defineProperty (cls, attrib, descrip);
                }           

                for (var symbol of Object.getOwnPropertySymbols (base)) {
                    var descrip = Object.getOwnPropertyDescriptor (base, symbol);
                    Object.defineProperty (cls, symbol, descrip);
                }
                
            }
            
            // Add class specific attributes to the created cls object
            cls.__metaclass__ = meta;
            cls.__name__ = name;
            cls.__bases__ = bases;
            
            // Add own methods, properties and own static attributes to the created cls object
            for (var attrib in attribs) {
                var descrip = Object.getOwnPropertyDescriptor (attribs, attrib);
                Object.defineProperty (cls, attrib, descrip);
            }

            for (var symbol of Object.getOwnPropertySymbols (attribs)) {
                var descrip = Object.getOwnPropertyDescriptor (attribs, symbol);
                Object.defineProperty (cls, symbol, descrip);
            }
            
            // Return created cls object
            return cls;
        }
    };
    py_metatype.__metaclass__ = py_metatype;
    __all__.py_metatype = py_metatype;
    
    // Mother of all classes
    var object = {
        __init__: function (self) {},
        
        __metaclass__: py_metatype, // By default, all classes have metaclass type, since they derive from object
        __name__: 'object',
        __bases__: [],
            
        // Object creator function, is inherited by all classes (so could be global)
        __new__: function (args) {  // Args are just the constructor args       
            // In JavaScript the Python class is the prototype of the Python object
            // In this way methods and static attributes will be available both with a class and an object before the dot
            // The descriptor produced by __get__ will return the right method flavor
            var instance = Object.create (this, {__class__: {value: this, enumerable: true}});
            
        if ('__getattr__' in this || '__setattr__' in this) {
            instance = new Proxy (instance, {
                get: function (target, name) {
                    var result = target [name];
                    if (result == undefined) {  // Target doesn't have attribute named name
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
                    catch (exception) {         // Target doesn't have a __setattr__ method
                        target [name] = value;
                    }
                    return true;
                }
            })
        }

            // Call constructor
            this.__init__.apply (null, [instance] .concat (args));

            // Return constructed instance
            return instance;
        }   
    };
    __all__.object = object;
    
    // Class creator facade function, calls class creation worker
    var __class__ = function (name, bases, attribs, meta) {         // Parameter meta is optional
        if (meta == undefined) {
            meta = bases [0] .__metaclass__;
        }
                
        return meta.__new__ (meta, name, bases, attribs);
    }
    __all__.__class__ = __class__;
    
    // Define __pragma__ to preserve '<all>' and '</all>', since it's never generated as a function, must be done early, so here
    var __pragma__ = function () {};
    __all__.__pragma__ = __pragma__;
    
    	__nest__ (
		__all__,
		'org.transcrypt.__base__', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __Envir__ = __class__ ('__Envir__', [object], {
						get __init__ () {return __get__ (this, function (self) {
							self.interpreter_name = 'python';
							self.transpiler_name = 'transcrypt';
							self.transpiler_version = '3.6.22';
							self.target_subdir = '__javascript__';
						});}
					});
					var __envir__ = __Envir__ ();
					__pragma__ ('<all>')
						__all__.__Envir__ = __Envir__;
						__all__.__envir__ = __envir__;
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
					var Exception = __class__ ('Exception', [object], {
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
						get __init__ () {return __get__ (this, function (self, error) {
							Exception.__init__ (self, "Can't iterate over non-iterable", __kwargtrans__ ({error: error}));
						});}
					});
					var StopIteration = __class__ ('StopIteration', [Exception], {
						get __init__ () {return __get__ (this, function (self, error) {
							Exception.__init__ (self, 'Iterator exhausted', __kwargtrans__ ({error: error}));
						});}
					});
					var ValueError = __class__ ('ValueError', [Exception], {
						get __init__ () {return __get__ (this, function (self, error) {
							Exception.__init__ (self, 'Erroneous value', __kwargtrans__ ({error: error}));
						});}
					});
					var KeyError = __class__ ('KeyError', [Exception], {
						get __init__ () {return __get__ (this, function (self, error) {
							Exception.__init__ (self, 'Invalid key', __kwargtrans__ ({error: error}));
						});}
					});
					var AssertionError = __class__ ('AssertionError', [Exception], {
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
						get __init__ () {return __get__ (this, function (self, message, error) {
							Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
						});}
					});
					var IndexError = __class__ ('IndexError', [Exception], {
						get __init__ () {return __get__ (this, function (self, message, error) {
							Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
						});}
					});
					var AttributeError = __class__ ('AttributeError', [Exception], {
						get __init__ () {return __get__ (this, function (self, message, error) {
							Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
						});}
					});
					var Warning = __class__ ('Warning', [Exception], {
					});
					var UserWarning = __class__ ('UserWarning', [Warning], {
					});
					var DeprecationWarning = __class__ ('DeprecationWarning', [Warning], {
					});
					var RuntimeWarning = __class__ ('RuntimeWarning', [Warning], {
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
						return function () {
							var __accu0__ = [];
							for (var item of iterable) {
								__accu0__.append (func (item));
							}
							return __accu0__;
						} ();
					};
					var filter = function (func, iterable) {
						return function () {
							var __accu0__ = [];
							for (var item of iterable) {
								if (func (item)) {
									__accu0__.append (item);
								}
							}
							return __accu0__;
						} ();
					};
					var __Terminal__ = __class__ ('__Terminal__', [object], {
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
							self.buffer = '{}{}{}'.format (self.buffer, sep.join (function () {
								var __accu0__ = [];
								for (var arg of args) {
									__accu0__.append (str (arg));
								}
								return __accu0__;
							} ()), end).__getslice__ (-(4096), null, 1);
							if (self.element) {
								self.element.innerHTML = self.buffer.py_replace ('\n', '<br>');
								self.element.scrollTop = self.element.scrollHeight;
							}
							else {
								console.log (sep.join (function () {
									var __accu0__ = [];
									for (var arg of args) {
										__accu0__.append (str (arg));
									}
									return __accu0__;
								} ()));
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
						__all__.UserWarning = UserWarning;
						__all__.ValueError = ValueError;
						__all__.Warning = Warning;
						__all__.__Terminal__ = __Terminal__;
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
    var __call__ = function (/* <callee>, <this>, <params>* */) {   // Needed for __base__ and __standard__ if global 'opov' switch is on
        var args = [] .slice.apply (arguments);
        if (typeof args [0] == 'object' && '__call__' in args [0]) {        // Overloaded
            return args [0] .__call__ .apply (args [1], args.slice (2));
        }
        else {                                                              // Native
            return args [0] .apply (args [1], args.slice (2));
        }
    };
    __all__.__call__ = __call__;

    // Initialize non-nested modules __base__ and __standard__ and make its names available directly and via __all__
    // They can't do that itself, because they're regular Python modules
    // The compiler recognizes their names and generates them inline rather than nesting them
    // In this way it isn't needed to import them everywhere

    // __base__

    __nest__ (__all__, '', __init__ (__all__.org.transcrypt.__base__));
    var __envir__ = __all__.__envir__;

    // __standard__

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

    // Warnings Exceptions
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

    // Complete __envir__, that was created in __base__, for non-stub mode
    __envir__.executor_name = __envir__.transpiler_name;

    // Make make __main__ available in browser
    var __main__ = {__file__: ''};
    __all__.main = __main__;

    // Define current exception, there's at most one exception in the air at any time
    var __except__ = null;
    __all__.__except__ = __except__;
    
     // Creator of a marked dictionary, used to pass **kwargs parameter
    var __kwargtrans__ = function (anObject) {
        anObject.__kwargtrans__ = null; // Removable marker
        anObject.constructor = Object;
        return anObject;
    }
    __all__.__kwargtrans__ = __kwargtrans__;

    // 'Oneshot' dict promotor, used to enrich __all__ and help globals () return a true dict
    var __globals__ = function (anObject) {
        if (isinstance (anObject, dict)) {  // Don't attempt to promote (enrich) again, since it will make a copy
            return anObject;
        }
        else {
            return dict (anObject)
        }
    }
    __all__.__globals__ = __globals__
    
    // Partial implementation of super () .<methodName> (<params>)
    var __super__ = function (aClass, methodName) {        
        // Lean and fast, no C3 linearization, only call first implementation encountered
        // Will allow __super__ ('<methodName>') (self, <params>) rather than only <className>.<methodName> (self, <params>)
        
        for (let base of aClass.__bases__) {
            if (methodName in base) {
               return base [methodName];
            }
        }

        throw new Exception ('Superclass method not found');    // !!! Improve!
    }
    __all__.__super__ = __super__
        
    // Python property installer function, no member since that would bloat classes
    var property = function (getter, setter) {  // Returns a property descriptor rather than a property
        if (!setter) {  // ??? Make setter optional instead of dummy?
            setter = function () {};
        }
        return {get: function () {return getter (this)}, set: function (value) {setter (this, value)}, enumerable: true};
    }
    __all__.property = property;
    
    // Conditional JavaScript property installer function, prevents redefinition of properties if multiple Transcrypt apps are on one page
    var __setProperty__ = function (anObject, name, descriptor) {
        if (!anObject.hasOwnProperty (name)) {
            Object.defineProperty (anObject, name, descriptor);
        }
    }
    __all__.__setProperty__ = __setProperty__
    
    // Assert function, call to it only generated when compiling with --dassert option
    function assert (condition, message) {  // Message may be undefined
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

    // Manipulating attributes by name
    
    var dir = function (obj) {
        var aList = [];
        for (var aKey in obj) {
            aList.push (aKey);
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
        return obj [name];
    };
    __all__.getattr= getattr;

    var hasattr = function (obj, name) {
        return name in obj;
    };
    __all__.hasattr = hasattr;

    var delattr = function (obj, name) {
        delete obj [name];
    };
    __all__.delattr = (delattr);

    // The __in__ function, used to mimic Python's 'in' operator
    // In addition to CPython's semantics, the 'in' operator is also allowed to work on objects, avoiding a counterintuitive separation between Python dicts and JavaScript objects
    // In general many Transcrypt compound types feature a deliberate blend of Python and JavaScript facilities, facilitating efficient integration with JavaScript libraries
    // If only Python objects and Python dicts are dealt with in a certain context, the more pythonic 'hasattr' is preferred for the objects as opposed to 'in' for the dicts
    var __in__ = function (element, container) {
        if (py_typeof (container) == dict) {        // Currently only implemented as an augmented JavaScript object
            return container.hasOwnProperty (element);
        }
        else {                                      // Parameter 'element' itself is an array, string or a plain, non-dict JavaScript object
            return (
                container.indexOf ?                 // If it has an indexOf
                container.indexOf (element) > -1 :  // it's an array or a string,
                container.hasOwnProperty (element)  // else it's a plain, non-dict JavaScript object
            );
        }
    };
    __all__.__in__ = __in__;

    // Find out if an attribute is special
    var __specialattrib__ = function (attrib) {
        return (attrib.startswith ('__') && attrib.endswith ('__')) || attrib == 'constructor' || attrib.startswith ('py_');
    };
    __all__.__specialattrib__ = __specialattrib__;

    // Len function for any object
    var len = function (anObject) {
        if (anObject) {
            var l = anObject.length;
            if (l == undefined) {
                var result = 0;
                for (var attrib in anObject) {
                    if (!__specialattrib__ (attrib)) {
                        result++;
                    }
                }
                return result;
            }
            else {
                return l;
            }
        }
        else {
            return 0;
        }
    };
    __all__.len = len;

    // General conversions

    function __i__ (any) {  //  Conversion to iterable
        return py_typeof (any) == dict ? any.py_keys () : any;
    }

    function __t__ (any) {  // Conversion to truthyness, __ ([1, 2, 3]) returns [1, 2, 3], needed for nonempty selection: l = list1 or list2]
        return (['boolean', 'number'] .indexOf (typeof any) >= 0 || any instanceof Function || len (any)) ? any : false;
        // JavaScript functions have a length attribute, denoting the number of parameters
        // Python objects are JavaScript functions, but their length doesn't matter, only their existence
        // By the term 'any instanceof Function' we make sure that Python objects aren't rejected when their length equals zero
    }
    __all__.__t__ = __t__;

    var bool = function (any) {     // Always truly returns a bool, rather than something truthy or falsy
        return !!__t__ (any);
    };
    bool.__name__ = 'bool';         // So it can be used as a type with a name
    __all__.bool = bool;

    var float = function (any) {
        if (any == 'inf') {
            return Infinity;
        }
        else if (any == '-inf') {
            return -Infinity;
        }
        else if (isNaN (any)) {
            throw ValueError (new Error ());
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
        if (aType == 'object') {    // Directly trying '__class__ in anObject' turns out to wreck anObject in Chrome if its a primitive
            try {
                return anObject.__class__;
            }
            catch (exception) {
                return aType;
            }
        }
        else {
            return (    // Odly, the braces are required here
                aType == 'boolean' ? bool :
                aType == 'string' ? str :
                aType == 'number' ? (anObject % 1 == 0 ? int : float) :
                null
            );
        }
    };
    __all__.py_typeof = py_typeof;

    var isinstance = function (anObject, classinfo) {
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
        }

        if (classinfo instanceof Array) {   // Assume in most cases it isn't, then making it recursive rather than two functions saves a call
            for (let aClass of classinfo) {
                if (isinstance (anObject, aClass)) {
                    return true;
                }
            }
            return false;
        }

        try {                   // Most frequent use case first
            return '__class__' in anObject ? isA (anObject.__class__) : anObject instanceof classinfo;
        }
        catch (exception) {     // Using isinstance on primitives assumed rare
            var aType = py_typeof (anObject);
            return aType == classinfo || (aType == bool && classinfo == int);
        }
    };
    __all__.isinstance = isinstance;

    var callable = function (anObject) {
        if ( typeof anObject == 'object' && '__call__' in anObject ) {
            return true;
        }
        else {
            return typeof anObject === 'function';
        }
    };
    __all__.callable = callable;

    // Repr function uses __repr__ method, then __str__, then toString
    var repr = function (anObject) {
        try {
            return anObject.__repr__ ();
        }
        catch (exception) {
            try {
                return anObject.__str__ ();
            }
            catch (exception) { // anObject has no __repr__ and no __str__
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
                                    var attribRepr = attrib;                // If key can be interpreted as numerical, we make it numerical
                                }                                           // So we accept that '1' is misrepresented as 1
                                else {
                                    var attribRepr = '\'' + attrib + '\'';  // Alpha key in dict
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
                    console.log ('ERROR: Could not evaluate repr (<object of type ' + typeof anObject + '>)');
                    console.log (exception);
                    return '???';
                }
            }
        }
    };
    __all__.repr = repr;

    // Char from Unicode or ASCII
    var chr = function (charCode) {
        return String.fromCharCode (charCode);
    };
    __all__.chr = chr;

    // Unicode or ASCII from char
    var ord = function (aChar) {
        return aChar.charCodeAt (0);
    };
    __all__.org = ord;

    // Maximum of n numbers
    var max = Math.max;
    __all__.max = max;

    // Minimum of n numbers
    var min = Math.min;
    __all__.min = min;

    // Absolute value
    var abs = Math.abs;
    __all__.abs = abs;

    // Bankers rounding
    var round = function (number, ndigits) {
        if (ndigits) {
            var scale = Math.pow (10, ndigits);
            number *= scale;
        }

        var rounded = Math.round (number);
        if (rounded - number == 0.5 && rounded % 2) {   // Has rounded up to odd, should have rounded down to even
            rounded -= 1;
        }

        if (ndigits) {
            rounded /= scale;
        }

        return rounded;
    };
    __all__.round = round;

    // BEGIN unified iterator model

    function __jsUsePyNext__ () {       // Add as 'next' method to make Python iterator JavaScript compatible
        try {
            var result = this.__next__ ();
            return {value: result, done: false};
        }
        catch (exception) {
            return {value: undefined, done: true};
        }
    }

    function __pyUseJsNext__ () {       // Add as '__next__' method to make JavaScript iterator Python compatible
        var result = this.next ();
        if (result.done) {
            throw StopIteration (new Error ());
        }
        else {
            return result.value;
        }
    }

    function py_iter (iterable) {                   // Alias for Python's iter function, produces a universal iterator / iterable, usable in Python and JavaScript
        if (typeof iterable == 'string' || '__iter__' in iterable) {    // JavaScript Array or string or Python iterable (string has no 'in')
            var result = iterable.__iter__ ();                          // Iterator has a __next__
            result.next = __jsUsePyNext__;                              // Give it a next
        }
        else if ('selector' in iterable) {                              // Assume it's a JQuery iterator
            var result = list (iterable) .__iter__ ();                  // Has a __next__
            result.next = __jsUsePyNext__;                              // Give it a next
        }
        else if ('next' in iterable) {                                  // It's a JavaScript iterator already,  maybe a generator, has a next and may have a __next__
            var result = iterable
            if (! ('__next__' in result)) {                             // If there's no danger of recursion
                result.__next__ = __pyUseJsNext__;                      // Give it a __next__
            }
        }
        else if (Symbol.iterator in iterable) {                         // It's a JavaScript iterable such as a typed array, but not an iterator
            var result = iterable [Symbol.iterator] ();                 // Has a next
            result.__next__ = __pyUseJsNext__;                          // Give it a __next__
        }
        else {
            throw IterableError (new Error ()); // No iterator at all
        }
        result [Symbol.iterator] = function () {return result;};
        return result;
    }

    function py_next (iterator) {               // Called only in a Python context, could receive Python or JavaScript iterator
        try {                                   // Primarily assume Python iterator, for max speed
            var result = iterator.__next__ ();
        }
        catch (exception) {                     // JavaScript iterators are the exception here
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

    // END unified iterator model

    // Reversed function for arrays
    var py_reversed = function (iterable) {
        iterable = iterable.slice ();
        iterable.reverse ();
        return iterable;
    };
    __all__.py_reversed = py_reversed;

    // Zip method for arrays and strings
    var zip = function () {
        var args = [] .slice.call (arguments);
        if (typeof args [0] == 'string') {
            for (var i = 0; i < args.length; i++) {
                args [i] = args [i] .split ('');
            }
        }
        var shortest = args.length == 0 ? [] : args.reduce (    // Find shortest array in arguments
            function (array0, array1) {
                return array0.length < array1.length ? array0 : array1;
            }
        );
        return shortest.map (                   // Map each element of shortest array
            function (current, index) {         // To the result of this function
                return args.map (               // Map each array in arguments
                    function (current) {        // To the result of this function
                        return current [index]; // Namely it's index't entry
                    }
                );
            }
        );
    };
    __all__.zip = zip;

    // Range method, returning an array
    function range (start, stop, step) {
        if (stop == undefined) {
            // one param defined
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

    // Any, all and sum

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

    // Enumerate method, returning a zipped list
    function enumerate (iterable) {
        return zip (range (len (iterable)), iterable);
    }
    __all__.enumerate = enumerate;

    // Shallow and deepcopy

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

    // List extensions to Array

    function list (iterable) {                                      // All such creators should be callable without new
        var instance = iterable ? Array.from (iterable) : [];
        // Sort is the normal JavaScript sort, Python sort is a non-member function
        return instance;
    }
    __all__.list = list;
    Array.prototype.__class__ = list;   // All arrays are lists (not only if constructed by the list ctor), unless constructed otherwise
    list.__name__ = 'list';

    /*
    Array.from = function (iterator) { // !!! remove
        result = [];
        for (item of iterator) {
            result.push (item);
        }
        return result;
    }
    */

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

        if (step == null) { // Assign to 'ordinary' slice, replace subsequence
            Array.prototype.splice.apply (this, [start, stop - start] .concat (source));
        }
        else {              // Assign to extended slice, replace designated items one by one
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

    Array.prototype.clear = function () {
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
            throw KeyError (new Error ());
        }
        this.splice (index, 1);
    };

    Array.prototype.index = function (element) {
        return this.indexOf (element);
    };

    Array.prototype.py_pop = function (index) {
        if (index == undefined) {
            return this.pop ();  // Remove last element
        }
        else {
            return this.splice (index, 1) [0];
        }
    };

    Array.prototype.py_sort = function () {
        __sort__.apply  (null, [this].concat ([] .slice.apply (arguments)));    // Can't work directly with arguments
        // Python params: (iterable, key = None, reverse = False)
        // py_sort is called with the Transcrypt kwargs mechanism, and just passes the params on to __sort__
        // __sort__ is def'ed with the Transcrypt kwargs mechanism
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

    // Tuple extensions to Array

    function tuple (iterable) {
        var instance = iterable ? [] .slice.apply (iterable) : [];
        instance.__class__ = tuple; // Not all arrays are tuples
        return instance;
    }
    __all__.tuple = tuple;
    tuple.__name__ = 'tuple';

    // Set extensions to Array
    // N.B. Since sets are unordered, set operations will occasionally alter the 'this' array by sorting it

    function set (iterable) {
        var instance = [];
        if (iterable) {
            for (var index = 0; index < iterable.length; index++) {
                instance.add (iterable [index]);
            }


        }
        instance.__class__ = set;   // Not all arrays are sets
        return instance;
    }
    __all__.set = set;
    set.__name__ = 'set';

    Array.prototype.__bindexOf__ = function (element) { // Used to turn O (n^2) into O (n log n)
    // Since sorting is lex, compare has to be lex. This also allows for mixed lists

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
        if (this.indexOf (element) == -1) { // Avoid duplicates in set
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
        return set (other.slice ()) .issuperset (this); // Sort copy of 'other', not 'other' itself, since it may be an ordered sequence
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

    Array.prototype.py_update = function () {   // O (n)
        var updated = [] .concat.apply (this.slice (), arguments) .sort ();
        this.clear ();
        for (var i = 0; i < updated.length; i++) {
            if (updated [i] != updated [i - 1]) {
                this.push (updated [i]);
            }
        }
    };

    Array.prototype.__eq__ = function (other) { // Also used for list
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

    Array.prototype.__ne__ = function (other) { // Also used for list
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

    // String extensions

    function str (stringable) {
        try {
            return stringable.__str__ ();
        }
        catch (exception) {
            try {
                return repr (stringable);
            }
            catch (exception) {
                return String (stringable); // No new, so no permanent String object but a primitive in a temporary 'just in time' wrapper
            }
        }
    };
    __all__.str = str;

    String.prototype.__class__ = str;   // All strings are str
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

    // Since it's worthwhile for the 'format' function to be able to deal with *args, it is defined as a property
    // __get__ will produce a bound function if there's something before the dot
    // Since a call using *args is compiled to e.g. <object>.<function>.apply (null, args), the function has to be bound already
    // Otherwise it will never be, because of the null argument
    // Using 'this' rather than 'null' contradicts the requirement to be able to pass bound functions around
    // The object 'before the dot' won't be available at call time in that case, unless implicitly via the function bound to it
    // While for Python methods this mechanism is generated by the compiler, for JavaScript methods it has to be provided manually
    // Call memoizing is unattractive here, since every string would then have to hold a reference to a bound format method
    __setProperty__ (String.prototype, 'format', {
        get: function () {return __get__ (this, function (self) {
            var args = tuple ([] .slice.apply (arguments).slice (1));
            var autoIndex = 0;
            return self.replace (/\{(\w*)\}/g, function (match, key) {
                if (key == '') {
                    key = autoIndex++;
                }
                if (key == +key) {  // So key is numerical
                    return args [key] == undefined ? match : str (args [key]);
                }
                else {              // Key is a string
                    for (var index = 0; index < args.length; index++) {
                        // Find first 'dict' that has that key and the right field
                        if (typeof args [index] == 'object' && args [index][key] != undefined) {
                            return str (args [index][key]); // Return that field field
                        }
                    }
                    return match;
                }
            });
        });},
        enumerable: true
    });

    String.prototype.isnumeric = function () {
        return !isNaN (parseFloat (this)) && isFinite (this);
    };

    String.prototype.join = function (strings) {
        strings = Array.from (strings); // Much faster than iterating through strings char by char
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

    String.prototype.rsplit = function (sep, maxsplit) {    // Combination of general whitespace sep and positive maxsplit neither supported nor checked, expensive and rare
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

    String.prototype.py_split = function (sep, maxsplit) {  // Combination of general whitespace sep and positive maxsplit neither supported nor checked, expensive and rare
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

    // Dict extensions to object

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

    function __getdefault__ (aKey, aDefault) {  // Each Python object already has a function called __get__, so we call this one __getdefault__
        var result = this [aKey];
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
            // Identify check because user could pass None
            if ( aDefault === undefined ) {
                throw KeyError (aKey, new Error());
            }
        }
        return aDefault;
    }
    
    function __popitem__ () {
        var aKey = Object.keys (this) [0];
        if (aKey == null) {
            throw KeyError (aKey, new Error ());
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
    
    function __dgetitem__ (aKey) {
        return this [aKey];
    }
    
    function __dsetitem__ (aKey, aValue) {
        this [aKey] = aValue;
    }

    function dict (objectOrPairs) {
        var instance = {};
        if (!objectOrPairs || objectOrPairs instanceof Array) { // It's undefined or an array of pairs
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
                         // User can potentially pass in an object
                         // that has a hierarchy of objects. This
                         // checks to make sure that these objects
                         // get converted to dict objects instead of
                         // leaving them as js objects.
                         
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
                // Passed object is a dict already so we need to be a little careful
                // N.B. - this is a shallow copy per python std - so
                // it is assumed that children have already become
                // python objects at some point.
                
                var aKeys = objectOrPairs.py_keys ();
                for (var index = 0; index < aKeys.length; index++ ) {
                    var key = aKeys [index];
                    instance [key] = objectOrPairs [key];
                }
            } else if (objectOrPairs instanceof Object) {
                // Passed object is a JavaScript object but not yet a dict, don't copy it
                instance = objectOrPairs;
            } else {
                // We have already covered Array so this indicates
                // that the passed object is not a js object - i.e.
                // it is an int or a string, which is invalid.
                
                throw ValueError ("Invalid type of object for dict creation", new Error ());
            }
        }

        // Trancrypt interprets e.g. {aKey: 'aValue'} as a Python dict literal rather than a JavaScript object literal
        // So dict literals rather than bare Object literals will be passed to JavaScript libraries
        // Some JavaScript libraries call all enumerable callable properties of an object that's passed to them
        // So the properties of a dict should be non-enumerable
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
        __setProperty__ (instance, '__getitem__', {value: __dgetitem__, enumerable: false});    // Needed since compound keys necessarily
        __setProperty__ (instance, '__setitem__', {value: __dsetitem__, enumerable: false});    // trigger overloading to deal with slices
        return instance;
    }

    __all__.dict = dict;
    dict.__name__ = 'dict';
    
    // Docstring setter

    function __setdoc__ (docString) {
        this.__doc__ = docString;
        return this;
    }

    // Python classes, methods and functions are all translated to JavaScript functions
    __setProperty__ (Function.prototype, '__setdoc__', {value: __setdoc__, enumerable: false});

    // General operator overloading, only the ones that make most sense in matrix and complex operations

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

    // Overloaded binary arithmetic
    
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

    var __div__ = function (a, b) {
        if (typeof a == 'object' && '__div__' in a) {
            return a.__div__ (b);
        }
        else if (typeof b == 'object' && '__rdiv__' in b) {
            return b.__rdiv__ (a);
        }
        else {
            return a / b;
        }
    };
    __all__.__div__ = __div__;

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

    // Overloaded binary bitwise
    
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
        
    // Overloaded binary compare
    
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
    
    // Overloaded augmented general
    
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
    
    // Overloaded augmented arithmetic
    
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

    // Overloaded augmented bitwise
    
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
    
    // Indices and slices

    var __getitem__ = function (container, key) {                           // Slice c.q. index, direct generated call to runtime switch
        if (typeof container == 'object' && '__getitem__' in container) {
            return container.__getitem__ (key);                             // Overloaded on container
        }
        else {
            return container [key];                                         // Container must support bare JavaScript brackets
        }
    };
    __all__.__getitem__ = __getitem__;

    var __setitem__ = function (container, key, value) {                    // Slice c.q. index, direct generated call to runtime switch
        if (typeof container == 'object' && '__setitem__' in container) {
            container.__setitem__ (key, value);                             // Overloaded on container
        }
        else {
            container [key] = value;                                        // Container must support bare JavaScript brackets
        }
    };
    __all__.__setitem__ = __setitem__;

    var __getslice__ = function (container, lower, upper, step) {           // Slice only, no index, direct generated call to runtime switch
        if (typeof container == 'object' && '__getitem__' in container) {
            return container.__getitem__ ([lower, upper, step]);            // Container supports overloaded slicing c.q. indexing
        }
        else {
            return container.__getslice__ (lower, upper, step);             // Container only supports slicing injected natively in prototype
        }
    };
    __all__.__getslice__ = __getslice__;

    var __setslice__ = function (container, lower, upper, step, value) {    // Slice, no index, direct generated call to runtime switch
        if (typeof container == 'object' && '__setitem__' in container) {
            container.__setitem__ ([lower, upper, step], value);            // Container supports overloaded slicing c.q. indexing
        }
        else {
            container.__setslice__ (lower, upper, step, value);             // Container only supports slicing injected natively in prototype
        }
    };
    __all__.__setslice__ = __setslice__;

	__nest__ (
		__all__,
		'basic_jsre', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var re = {};
					__nest__ (re, '', __init__ (__world__.re));
					var checkCommentGroup = __init__ (__world__.basictests).checkCommentGroup;
					var checkConditionalGroups = __init__ (__world__.basictests).checkConditionalGroups;
					var checkFindAllOps = __init__ (__world__.basictests).checkFindAllOps;
					var checkFindIter = __init__ (__world__.basictests).checkFindIter;
					var checkFlagsExist = __init__ (__world__.basictests).checkFlagsExist;
					var checkFullMatchOps = __init__ (__world__.basictests).checkFullMatchOps;
					var checkIgnoreCase = __init__ (__world__.basictests).checkIgnoreCase;
					var checkMatchOps = __init__ (__world__.basictests).checkMatchOps;
					var checkMatchProperties = __init__ (__world__.basictests).checkMatchProperties;
					var checkMatchWithGroups = __init__ (__world__.basictests).checkMatchWithGroups;
					var checkMatchWithNamedGroups = __init__ (__world__.basictests).checkMatchWithNamedGroups;
					var checkRegexProperties = __init__ (__world__.basictests).checkRegexProperties;
					var checkSearchWithGroups = __init__ (__world__.basictests).checkSearchWithGroups;
					var checkSplitOps = __init__ (__world__.basictests).checkSplitOps;
					var checkSubOps = __init__ (__world__.basictests).checkSubOps;
					var checkSyntaxErrors = __init__ (__world__.basictests).checkSyntaxErrors;
					var checkWithFlags = __init__ (__world__.basictests).checkWithFlags;
					var escapeTests = __init__ (__world__.basictests).escapeTests;
					var testStr1 = __init__ (__world__.basictests).testStr1;
					var testStr2 = __init__ (__world__.basictests).testStr2;
					var testStr3 = __init__ (__world__.basictests).testStr3;
					var testStr4 = __init__ (__world__.basictests).testStr4;
					var run = function (test) {
						checkFlagsExist (test);
						escapeTests (test);
						checkMatchProperties (test, re.JSSTRICT);
						checkRegexProperties (test, re.JSSTRICT);
						checkIgnoreCase (test, re.JSSTRICT);
						checkSearchWithGroups (test, re.JSSTRICT);
						checkMatchOps (test, re.JSSTRICT);
						checkMatchWithGroups (test, re.JSSTRICT);
						checkFullMatchOps (test, re.JSSTRICT);
						checkFindAllOps (test, re.JSSTRICT);
						checkSplitOps (test, re.JSSTRICT);
						checkSubOps (test, re.JSSTRICT);
						checkSyntaxErrors (test, re.JSSTRICT);
						checkFindIter (test, re.JSSTRICT);
					};
					__pragma__ ('<use>' +
						'basictests' +
						're' +
					'</use>')
					__pragma__ ('<all>')
						__all__.checkCommentGroup = checkCommentGroup;
						__all__.checkConditionalGroups = checkConditionalGroups;
						__all__.checkFindAllOps = checkFindAllOps;
						__all__.checkFindIter = checkFindIter;
						__all__.checkFlagsExist = checkFlagsExist;
						__all__.checkFullMatchOps = checkFullMatchOps;
						__all__.checkIgnoreCase = checkIgnoreCase;
						__all__.checkMatchOps = checkMatchOps;
						__all__.checkMatchProperties = checkMatchProperties;
						__all__.checkMatchWithGroups = checkMatchWithGroups;
						__all__.checkMatchWithNamedGroups = checkMatchWithNamedGroups;
						__all__.checkRegexProperties = checkRegexProperties;
						__all__.checkSearchWithGroups = checkSearchWithGroups;
						__all__.checkSplitOps = checkSplitOps;
						__all__.checkSubOps = checkSubOps;
						__all__.checkSyntaxErrors = checkSyntaxErrors;
						__all__.checkWithFlags = checkWithFlags;
						__all__.escapeTests = escapeTests;
						__all__.run = run;
						__all__.testStr1 = testStr1;
						__all__.testStr2 = testStr2;
						__all__.testStr3 = testStr3;
						__all__.testStr4 = testStr4;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		'basic_pyre', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var re = {};
					__nest__ (re, '', __init__ (__world__.re));
					var checkCommentGroup = __init__ (__world__.basictests).checkCommentGroup;
					var checkConditionalGroups = __init__ (__world__.basictests).checkConditionalGroups;
					var checkFindAllOps = __init__ (__world__.basictests).checkFindAllOps;
					var checkFindIter = __init__ (__world__.basictests).checkFindIter;
					var checkFlagsExist = __init__ (__world__.basictests).checkFlagsExist;
					var checkFullMatchOps = __init__ (__world__.basictests).checkFullMatchOps;
					var checkIgnoreCase = __init__ (__world__.basictests).checkIgnoreCase;
					var checkMatchOps = __init__ (__world__.basictests).checkMatchOps;
					var checkMatchProperties = __init__ (__world__.basictests).checkMatchProperties;
					var checkMatchWithGroups = __init__ (__world__.basictests).checkMatchWithGroups;
					var checkMatchWithNamedGroups = __init__ (__world__.basictests).checkMatchWithNamedGroups;
					var checkRegexProperties = __init__ (__world__.basictests).checkRegexProperties;
					var checkSearchWithGroups = __init__ (__world__.basictests).checkSearchWithGroups;
					var checkSplitOps = __init__ (__world__.basictests).checkSplitOps;
					var checkSubOps = __init__ (__world__.basictests).checkSubOps;
					var checkSyntaxErrors = __init__ (__world__.basictests).checkSyntaxErrors;
					var checkWithFlags = __init__ (__world__.basictests).checkWithFlags;
					var escapeTests = __init__ (__world__.basictests).escapeTests;
					var testStr1 = __init__ (__world__.basictests).testStr1;
					var testStr2 = __init__ (__world__.basictests).testStr2;
					var testStr3 = __init__ (__world__.basictests).testStr3;
					var testStr4 = __init__ (__world__.basictests).testStr4;
					var run = function (test) {
						checkFlagsExist (test);
						escapeTests (test);
						checkMatchProperties (test);
						checkRegexProperties (test);
						checkIgnoreCase (test);
						checkSearchWithGroups (test);
						checkMatchOps (test);
						checkMatchWithGroups (test);
						checkFullMatchOps (test);
						checkFindAllOps (test);
						checkSplitOps (test);
						checkSubOps (test);
						checkSyntaxErrors (test);
						checkConditionalGroups (test);
						checkCommentGroup (test);
						checkWithFlags (test);
						checkFindIter (test);
					};
					__pragma__ ('<use>' +
						'basictests' +
						're' +
					'</use>')
					__pragma__ ('<all>')
						__all__.checkCommentGroup = checkCommentGroup;
						__all__.checkConditionalGroups = checkConditionalGroups;
						__all__.checkFindAllOps = checkFindAllOps;
						__all__.checkFindIter = checkFindIter;
						__all__.checkFlagsExist = checkFlagsExist;
						__all__.checkFullMatchOps = checkFullMatchOps;
						__all__.checkIgnoreCase = checkIgnoreCase;
						__all__.checkMatchOps = checkMatchOps;
						__all__.checkMatchProperties = checkMatchProperties;
						__all__.checkMatchWithGroups = checkMatchWithGroups;
						__all__.checkMatchWithNamedGroups = checkMatchWithNamedGroups;
						__all__.checkRegexProperties = checkRegexProperties;
						__all__.checkSearchWithGroups = checkSearchWithGroups;
						__all__.checkSplitOps = checkSplitOps;
						__all__.checkSubOps = checkSubOps;
						__all__.checkSyntaxErrors = checkSyntaxErrors;
						__all__.checkWithFlags = checkWithFlags;
						__all__.escapeTests = escapeTests;
						__all__.run = run;
						__all__.testStr1 = testStr1;
						__all__.testStr2 = testStr2;
						__all__.testStr3 = testStr3;
						__all__.testStr4 = testStr4;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		'basictests', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var re = {};
					__nest__ (re, '', __init__ (__world__.re));
					var testStr1 = 'There,is,No,Time';
					var testStr2 = 'som[23] In[23423] the[34].asd[934].234.';
					var testStr3 = 's(43) d(03) asdfasd dsfsd(3) sd';
					var testStr4 = 'Were an apple like an orange then apple orange no appleorange';
					var checkMatchProperties = function (test, flags) {
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						var result = re.search (',', testStr1, flags);
						if (result !== null) {
							test.check (result.pos);
							test.check (result.endpos);
							test.check (result.group ());
							test.check (result.group (0));
							test.check (result.string);
							var assignPos = function () {
								result.pos = 1;
							};
							test.check (test.expectException (assignPos));
							var assignEndPos = function () {
								result.endpos = 1;
							};
							test.check (test.expectException (assignEndPos));
							var assignRe = function () {
								result.re = 'asdfasdf';
							};
							test.check (test.expectException (assignRe));
							var assignStr = function () {
								result.string = 'asdf';
							};
							test.check (test.expectException (assignStr));
							var assignLastGroup = function () {
								result.lastgroup = 'asdfasdf';
							};
							test.check (test.expectException (assignLastGroup));
							var assignLastIndex = function () {
								result.lastindex = 33;
							};
							test.check (test.expectException (assignLastIndex));
						}
						else {
							test.checkPad ('NULL', 11);
						}
					};
					var checkRegexProperties = function (test, flags) {
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						var r = re.compile (',', flags);
						if (r !== null) {
							test.check (r.groups);
							test.check (r.pattern);
							test.check (r.flags);
							var d = r.groupindex;
							test.check (d);
							var assignPattern = function () {
								r.pattern = 'asdfasdf';
							};
							test.check (test.expectException (assignPattern));
							var assignFlags = function () {
								r.flags = 'wer';
							};
							test.check (test.expectException (assignFlags));
							var assignGroups = function () {
								r.groups = 1;
							};
							test.check (test.expectException (assignGroups));
							var assignGroupIndex = function () {
								r.groupindex = 34;
							};
							test.check (test.expectException (assignGroupIndex));
						}
						else {
							test.checkPad ('NULL', 8);
						}
					};
					var checkFlagsExist = function (test) {
						test.check (re.T);
						test.check (re.I);
						test.check (re.IGNORECASE);
						test.check (re.M);
						test.check (re.MULTILINE);
						test.check (re.S);
						test.check (re.DOTALL);
						test.check (re.U);
						test.check (re.UNICODE);
						test.check (re.X);
						test.check (re.VERBOSE);
						test.check (re.A);
						test.check (re.ASCII);
					};
					var escapeTests = function (test) {
						test.check (re.escape ('buf[34]'));
						test.check (re.escape ('C:\\asdf\\wewer\\'));
						test.check (re.escape ('func(int a) { return(3)};'));
					};
					var checkIgnoreCase = function (test, flags) {
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						test.check (re.search ('as', testStr3, flags | re.I).pos);
						test.check (re.search ('as', testStr3, flags | re.I).endpos);
						test.check (re.search ('as', testStr3, flags | re.I).group ());
						test.check (re.search ('as', testStr3, flags | re.I).group (0));
						test.check (re.search ('AS', testStr3, flags | re.I).pos);
						test.check (re.search ('AS', testStr3, flags | re.I).endpos);
						test.check (re.search ('AS', testStr3, flags | re.I).group ());
						test.check (re.search ('AS', testStr3, flags | re.I).group (0));
					};
					var checkSearchWithGroups = function (test, flags) {
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						var r = '\\[([\\d]+)\\]';
						test.check (re.compile (r, flags).groups);
						test.check (re.search (r, testStr2, flags).pos);
						test.check (re.search (r, testStr2, flags).endpos);
						test.check (re.search (r, testStr2, flags).groups ());
						test.check (re.search (r, testStr2, flags).group ());
						test.checkEval ((function __lambda__ () {
							return re.search (r, testStr2, flags).group (0);
						}));
						test.checkEval ((function __lambda__ () {
							return re.search (r, testStr2, flags).group (1);
						}));
						test.check (re.search (r, testStr2, flags).start ());
						test.checkEval ((function __lambda__ () {
							return re.search (r, testStr2, flags).start (0);
						}));
						test.checkEval ((function __lambda__ () {
							return re.search (r, testStr2, flags).start (1);
						}));
						test.check (re.search (r, testStr2, flags).end ());
						test.checkEval ((function __lambda__ () {
							return re.search (r, testStr2, flags).end (0);
						}));
						test.checkEval ((function __lambda__ () {
							return re.search (r, testStr2, flags).end (1);
						}));
						test.check (re.search (r, testStr2, flags).span ());
						test.checkEval ((function __lambda__ () {
							return re.search (r, testStr2, flags).span (0);
						}));
						test.checkEval ((function __lambda__ () {
							return re.search (r, testStr2, flags).span (1);
						}));
						test.check (re.search (r, testStr2, flags).lastgroup);
						test.check (re.search (r, testStr2, flags).lastindex);
						for (var i = 2; i < 50; i++) {
							test.check (test.expectException ((function __lambda__ () {
								return re.search (',', testStr1, flags).group (i);
							})));
						}
					};
					var checkMatchOps = function (test, flags) {
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						test.check (re.match ('asdf', 'asdf', flags).pos);
						test.check (re.match ('asdf', 'asdf', flags).endpos);
						test.check (re.match ('asdf', 'asdf', flags).groups ());
						test.check (re.match ('a', 'asdf', flags).pos);
						test.check (re.match ('a', 'asdf', flags).endpos);
						test.check (re.match ('a', 'asdf', flags).groups ());
						test.check (re.match ('s', 'asdf', flags) === null);
						test.check (re.match ('^s', 'asdf', flags) === null);
						test.check (re.compile ('^s', flags).match ('asdf', 1) === null);
					};
					var checkMatchWithNamedGroups = function (test, flags) {
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						var r = null;
						try {
							var r = re.compile ('(?P<prefix>[a-zA-Z]+)://(?P<suffix>[^/]*)', flags);
						}
						catch (__except0__) {
							if (isinstance (__except0__, Exception)) {
								var exc = __except0__;
								test.checkPad (null, 15);
							}
							else {
								throw __except0__;
							}
						}
						if (r !== null) {
							test.check (r.groups);
							test.check (r.pattern);
							var d = r.groupindex;
							test.check (d);
							var m = r.match ('http://asdf');
							test.check (m.groups ());
							test.check (m.group ());
							test.check (m.group (0));
							test.check (m.group (1));
							test.check (m.group ('prefix'));
							test.check (m.group ('suffix'));
							var m = r.match ('ftp://192.168.1.1');
							test.check (m.group ());
							test.check (m.group (0));
							test.check (m.group (1));
							test.check (m.group ('prefix'));
							test.check (m.group ('suffix'));
							var m = r.match ('555-5555');
							test.check (m);
						}
						try {
							var r = re.compile ('(?P<country>\\d{1,3})-(?P<areacode>\\d{3})-(?P<number>\\d{3}-\\d{4})', flags);
						}
						catch (__except0__) {
							test.checkPad (null, 13);
						}
						if (r !== null) {
							test.check (r.groups);
							test.check (r.pattern);
							var d = r.groupindex;
							test.check (d);
							var m = r.match ('1-234-567-9012');
							test.check (m.groups ());
							test.check (m.group ());
							test.check (m.group (0));
							test.check (m.group (1));
							test.check (m.group (2));
							test.check (m.group (3));
							test.check (m.group ('country'));
							test.check (m.group ('areacode'));
							test.check (m.group ('number'));
							var m = r.match ('adfs;');
							test.check (m);
						}
					};
					var checkMatchWithGroups = function (test, flags) {
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						var rgx = re.compile ('(\\w)(\\w)(\\w)?', flags);
						test.check (rgx.pattern);
						test.check (rgx.groups);
						var m = rgx.match ('abc');
						if (m) {
							test.check (m.group (0));
							test.check (m.group (1));
							test.check (m.group (1, 2));
							test.check (m.group (2, 1));
						}
						else {
							test.checkPad (null, 4);
						}
						var m = rgx.match ('ab');
						if (m) {
							test.check (m.groups (0));
						}
						else {
							test.checkPad (null, 1);
						}
						var rgx = re.compile ('(?:[\\w\\s]+)\\[(\\d+)\\]', flags);
						test.check (rgx.pattern);
						test.check (rgx.groups);
						var m = rgx.match ('asdf[23]');
						if (m) {
							test.check (m.groups ());
							test.check (m.group (0));
							test.check (m.group (1));
							test.check (test.expectException ((function __lambda__ () {
								return m.group (2);
							})));
						}
						else {
							test.checkPad (null, 4);
						}
					};
					var checkCommentGroup = function (test, flags) {
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						var r = null;
						try {
							var r = re.compile ('a(?#foobar)b', flags);
						}
						catch (__except0__) {
							test.checkPad (null, 4);
						}
						if (r !== null) {
							test.check (r.groups);
							test.check (r.pattern);
							test.check (r.search ('ab').group ());
							test.check (r.search ('er'));
						}
						try {
							var r = re.compile ('([\\d]+)(?#blarg)\\[\\]', flags);
						}
						catch (__except0__) {
							test.checkPad (null, 4);
							return ;
						}
						test.check (r.groups);
						test.check (r.pattern);
						test.check (r.search ('1234[]').group ());
						test.check (r.search ('asdf[]'));
					};
					var checkFullMatchOps = function (test, flags) {
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						test.check (re.fullmatch ('asdf', 'asdf', flags).pos);
						test.check (re.fullmatch ('asdf', 'asdf', flags).endpos);
						test.check (re.fullmatch ('as', 'asdf', flags) === null);
						test.check (re.fullmatch ('q', 'asdf', flags) === null);
						test.check (re.compile ('o[gh]', flags).fullmatch ('dog') === null);
						test.check (re.compile ('o[gh]', flags).fullmatch ('ogre') === null);
						var m = re.compile ('o[gh]', flags).fullmatch ('doggie', 1, 3);
						if (m) {
							test.check (m.pos);
							test.check (m.endpos);
						}
						else {
							test.checkPad (null, 2);
						}
					};
					var checkFindAllOps = function (test, flags) {
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						test.check (re.findall (',', testStr1, flags));
						test.check (re.findall ('\\[([\\d]+)\\]', testStr2, flags));
						var r = '([^\\d\\s]+\\(([\\d]+)\\))';
						test.check (re.compile (r, flags).groups);
						test.check (re.findall (r, testStr3, flags));
					};
					var checkSplitOps = function (test, flags) {
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						test.check (re.py_split (',', testStr1, 0, flags));
						test.check (re.py_split ('(apple|orange)', testStr4, 0, flags));
						test.check (re.py_split ('\\[([\\d]+)\\]', testStr2, 0, flags));
						var r = re.compile (',', flags);
						test.check (r.py_split (testStr1, 0));
						test.check (r.py_split (testStr1, 1));
						test.check (r.py_split (testStr1, 2));
						test.check (r.py_split (testStr1, 3));
						test.check (r.py_split (testStr1, 4));
						var r = re.compile ('\\[([\\d]+)\\]', flags);
						test.check (r.py_split (testStr2, 0));
						test.check (r.py_split (testStr2, 1));
						test.check (r.py_split (testStr2, 2));
						test.check (r.py_split (testStr2, 3));
						test.check (r.py_split (testStr2, 4));
					};
					var checkSubOps = function (test, flags) {
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						var dashrepl = function (matchobj) {
							if (matchobj.group (0) == '-') {
								return ' ';
							}
							else {
								return '-';
							}
						};
						test.check (re.sub ('-{1,2}', dashrepl, 'pro----gram-files', 0, flags));
						test.check (re.sub ('-{1,2}', '4', 'pro----gram-files', 0, flags));
						test.check (re.subn ('-{1,2}', dashrepl, 'pro----gram-files', 0, flags));
						test.check (re.subn ('-{1,2}', '4', 'pro----gram-files', 0, flags));
					};
					var checkSyntaxErrors = function (test, flags) {
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						test.check (test.expectException ((function __lambda__ () {
							return re.compile (')', flags);
						})));
						test.check (test.expectException ((function __lambda__ () {
							return re.compile ('a\\', flags);
						})));
						test.check (test.expectException ((function __lambda__ () {
							return re.compile ('a[b', flags);
						})));
						test.check (test.expectException ((function __lambda__ () {
							return re.compile ('(abc', flags);
						})));
						test.check (test.expectException ((function __lambda__ () {
							return re.compile (')(', flags);
						})));
						test.check (test.expectException ((function __lambda__ () {
							return re.compile ('))', flags);
						})));
						test.check (test.expectException ((function __lambda__ () {
							return re.compile ('a[b-a]', flags);
						})));
						test.check (test.expectException ((function __lambda__ () {
							return re.compile ('*a', flags);
						})));
					};
					var checkFindIter = function (test, flags) {
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						var p = '\\[([\\d]+)\\]';
						var r = re.compile (p, flags);
						test.check (r.groups);
						var iret = r.finditer (testStr2);
						for (var m of iret) {
							test.check (m.pos);
							test.check (m.endpos);
							test.check (m.string);
							test.check (m.lastindex);
							test.check (m.groups ());
							test.check (m.group (0));
							test.check (m.group (1));
							test.check (test.expectException ((function __lambda__ () {
								return m.group (2);
							})));
							test.check (test.expectException ((function __lambda__ () {
								return m.group (2342);
							})));
							test.check (test.expectException ((function __lambda__ () {
								return m.group ('asdf');
							})));
							test.check (m.start (0));
							test.check (m.start (1));
							test.check (test.expectException ((function __lambda__ () {
								return m.start ('asdf');
							})));
							test.check (m.end (0));
							test.check (m.end (1));
							test.check (test.expectException ((function __lambda__ () {
								return m.end ('asdf');
							})));
						}
					};
					var checkWithFlags = function (test, flags) {
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						try {
							var r = re.compile ('(?i)aba', flags);
						}
						catch (__except0__) {
							test.checkPad (null, 5);
							return ;
						}
						test.check (r.groups);
						test.check (r.pattern);
						var m = r.search ('aBA');
						test.check (m.group ());
						test.check (m.groups ());
						var m = r.match ('aAa');
						test.check (m);
						var m = r.match ('ABA');
						test.check (m.group ());
						var m = r.match ('abA');
						test.check (m.group ());
					};
					var checkConditionalGroups = function (test, flags) {
						if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
							var flags = 0;
						};
						var rgx = null;
						try {
							var rgx = re.compile ('(a)?(b)?(?(1)a|c)(?(2)b)', flags);
						}
						catch (__except0__) {
							test.checkPad (null, 12);
						}
						if (rgx !== null) {
							test.check (rgx.pattern);
							test.checkEval ((function __lambda__ () {
								return rgx.match ('abab').group ();
							}));
							test.checkEval ((function __lambda__ () {
								return rgx.match ('aa').group ();
							}));
							test.checkEval ((function __lambda__ () {
								return rgx.match ('bcb').group ();
							}));
							test.checkEval ((function __lambda__ () {
								return rgx.match ('c').group ();
							}));
							test.checkEval ((function __lambda__ () {
								return rgx.match ('abcb');
							}));
							test.checkEval ((function __lambda__ () {
								return rgx.sub ('jumbo', 'ababsdf rexababwer');
							}));
							test.checkEval ((function __lambda__ () {
								return rgx.sub ('shrimp', 'shipbcb shootc aardvark');
							}));
						}
						try {
							var rgx = re.compile ('(a)?(b)?(?(1)a|c)(?(2)b|d)', flags);
						}
						catch (__except0__) {
							test.checkPad (null, 6);
							return ;
						}
						test.check (rgx.pattern);
						test.checkEval ((function __lambda__ () {
							return rgx.match ('abab').group ();
						}));
						test.checkEval ((function __lambda__ () {
							return rgx.match ('aad').group ();
						}));
						test.checkEval ((function __lambda__ () {
							return rgx.match ('bcb').group ();
						}));
						test.checkEval ((function __lambda__ () {
							return rgx.match ('bcb').group ();
						}));
					};
					__pragma__ ('<use>' +
						're' +
					'</use>')
					__pragma__ ('<all>')
						__all__.checkCommentGroup = checkCommentGroup;
						__all__.checkConditionalGroups = checkConditionalGroups;
						__all__.checkFindAllOps = checkFindAllOps;
						__all__.checkFindIter = checkFindIter;
						__all__.checkFlagsExist = checkFlagsExist;
						__all__.checkFullMatchOps = checkFullMatchOps;
						__all__.checkIgnoreCase = checkIgnoreCase;
						__all__.checkMatchOps = checkMatchOps;
						__all__.checkMatchProperties = checkMatchProperties;
						__all__.checkMatchWithGroups = checkMatchWithGroups;
						__all__.checkMatchWithNamedGroups = checkMatchWithNamedGroups;
						__all__.checkRegexProperties = checkRegexProperties;
						__all__.checkSearchWithGroups = checkSearchWithGroups;
						__all__.checkSplitOps = checkSplitOps;
						__all__.checkSubOps = checkSubOps;
						__all__.checkSyntaxErrors = checkSyntaxErrors;
						__all__.checkWithFlags = checkWithFlags;
						__all__.escapeTests = escapeTests;
						__all__.testStr1 = testStr1;
						__all__.testStr2 = testStr2;
						__all__.testStr3 = testStr3;
						__all__.testStr4 = testStr4;
					__pragma__ ('</all>')
				}
			}
		}
	);
    __nest__ (
        __all__,
        'itertools', {
            __all__: {
                __inited__: false,
                __init__: function (__all__) {
                    var count = function* (start, step) {
                        if (start == undefined) {
                            start = 0;
                        }
                        if (step == undefined) {
                            step = 1;
                        }
                        while (true) {
                            yield start;
                            start += step;
                        }
                    }
                    var cycle = function* (iterable) {                      
                        let buffer = Array.from (iterable); // Can't reset, Chrome can't obtain iter from gener
                        while (true) {
                            for (let item of buffer) {
                                yield item;
                            }
                        }
                    }
                    var repeat = function* (item, n) {
                        if (typeof n == 'undefined') {
                            while (true) {
                                yield item;
                            }
                        }
                        else {
                            for (let index = 0; index < n; index++) {
                                yield item;
                            }
                        }
                    }
                    var accumulate = function* (iterable, func) {
                        let sum;
                        let first = true;
                        if (func) {
                            for (let item of iterable) {
                                if (first) {
                                    sum = item;
                                    first = false;
                                }
                                else {
                                    sum = func (sum, item);
                                }
                                yield sum;
                            }
                        }
                        else {
                            for (let item of iterable) {
                                if (first) {
                                    sum = item;
                                    first = false;
                                }
                                else {
                                    sum = sum + item;
                                }
                                yield sum;
                            }
                        }
                    }
                    var chain = function* () {
                        let args = [] .slice.apply (arguments);                         
                        for (let arg of args) {
                            for (let item of arg) {
                                yield item;
                            }
                        }
                    }
                    chain.from_iterable = function* (iterable) {                        
                        for (let item of iterable) {
                            for (let subItem of item) {
                                yield subItem;
                            }
                        }
                    }
                    var compress = function* (data, selectors) {
                        let dataIterator = data [Symbol.iterator] .call (data);
                        let selectorsIterator = selectors [Symbol.iterator] ();
                        while (true) {
                            let dataItem = dataIterator.next ();
                            let selectorsItem = selectorsIterator.next ();
                            if (dataItem.done || selectorsItem.done) {
                                break;
                            }
                            else {
                                if (selectorsItem.value) {
                                    yield dataItem.value;
                                }
                            }
                        }
                    }
                    var dropwhile = function* (pred, seq) {
                        let started = false;
                        for (let item of seq) {
                            if (started) {
                                yield item;
                            }
                            else if (!pred (item)) {
                                started = true;
                                yield item;
                            }
                        }
                    }
                    var filterfalse = function* (pred, seq) {
                        for (let item of seq) {
                            if (!pred (item)) {
                                yield item;
                            }
                        }
                    }
                    var groupby = function* (iterable, keyfunc) {
                        let anIterator = iterable [Symbol.iterator] ();
                        let item = anIterator.next ();
                        
                        if (item.done) {
                            return;
                        }
                        
                        let groupKey = keyfunc (item.value);
                        let more = true;
                        
                        function* group () {
                            while (true) {
                                yield (item.value);
                                item = anIterator.next ();
                                
                                if (item.done) {
                                    more = false;
                                    return;
                                }
                                
                                let key = keyfunc (item.value);
                                
                                if (key != groupKey) {
                                    groupKey = key;
                                    return;
                                }
                            }
                        }
                        
                        while (more) {
                            yield tuple ([groupKey, group ()]);
                        }
                    }
                    
                    var islice = function* () {
                        let start;  // Have to be defined at function level, or Closure compiler will loose them after a yield 
                        let stop;   //
                        let step;   //
                        
                        let args = [] .slice.apply (arguments);
                        let anIterator = args [0][Symbol.iterator] ();
                        if (args.length == 2) {
                            stop = args [1];
                            start = 0;
                            step = 1;
                        }
                        else {
                            start = args [1];
                            stop = args [2];
                            if (args.length == 4) {
                                step = args [3];
                            }
                            else {
                                step = 1;
                            }
                        }
                        for (let index = 0; index < start; index++) {
                            if (anIterator.next (). done) {
                                return;
                            }
                        }
                        for (let index = 0; index < stop - start; index++) {
                            let next = anIterator.next ();
                            if (next.done) {
                                return;
                            }
                            if (index % step == 0) {
                                yield next.value;
                            }
                        }
                    }
                    var starmap = function* (func, seq) {
                        let anIterator = seq [Symbol.iterator] ();
                        while (true) {
                            let next = anIterator.next ()
                            if (next.done) {
                                return;
                            }
                            else {
                                yield func (...next.value); 
                            }
                        }
                    }
                    var takewhile = function* (pred, seq) {
                        for (let item of seq) {
                            if (pred (item)) {
                                yield item;
                            }
                            else {
                                return;
                            }
                        }
                    }
                    var tee = function (iterable, n) {
                        if (n == undefined) {
                            n = 2;
                        }
                        let all = [];                               // Don't return iterator since destructuring assignment cannot yet deal with that
                        let one = list (iterable);
                        for (let i = 0; i < n; i++) {
                            all.append (one [Symbol.iterator] ());  // Iterator rather than list, exhaustable for semantic equivalence
                        }
                        return list (all);
                    }
                    
                    var product = function () {
                        let args = [] .slice.apply (arguments);
                        if (args.length && args [args.length - 1] .hasOwnProperty ('__kwargtrans__')) {
                            var repeat = args.pop () ['repeat']; 
                        }
                        else {
                            var repeat = 1;
                        }
                        
                        let oldMolecules = [tuple ([])];
                        for (let i = 0; i < repeat; i++) {
                            for (let arg of args) {
                                let newMolecules = [];
                                for (let oldMolecule of oldMolecules) {
                                    for (let atom of arg) {
                                        newMolecules.append (tuple (oldMolecule.concat (atom)));
                                    }
                                }
                                oldMolecules = newMolecules;
                            }
                        }
                        return list (oldMolecules); // Also works if args is emptpy
                    }
                    var permutations = function (iterable, r) {
                        if (r == undefined) {
                            try {
                                r = len (iterable);
                            }
                            catch (exception) {
                                r = len (list (iterable));
                            }
                        }
                        let aProduct = product (iterable, __kwargtrans__ ({repeat: r}));
                        let result = [];
                        for (let molecule of aProduct) {
                            if (len (set (molecule)) == r) {    // Weed out doubles
                                result.append (molecule);
                            }
                        }
                        return list (result);
                    }
                    var combinations = function (iterable, r) {
                        let tail = list (iterable);
                        function recurse (tail, molecule, rNext) {
                            for (let index = 0; index < len (tail) - rNext; index++) {
                                let newMolecule = molecule.concat (tail.slice (index, index + 1));

                                if (rNext) {
                                    recurse (tail.slice (index + 1), newMolecule, rNext - 1);
                                }
                                else {
                                    result.append (tuple (newMolecule));
                                }
                            }
                        }
                        let result = [];
                        recurse (tail, tail.slice (0, 0), r - 1);
                        return list (result);
                    }
                    var combinations_with_replacement = function (iterable, r) {
                        let tail = list (iterable);
                        function recurse (tail, molecule, rNext) {
                            for (let index = 0; index < len (tail); index++) {
                                let newMolecule = molecule.concat (tail.slice (index, index + 1));

                                if (rNext) {
                                    recurse (tail.slice (index), newMolecule, rNext - 1);
                                }
                                else {
                                    result.append (tuple (newMolecule));
                                }
                            }
                        }
                        let result = [];
                        recurse (tail, tail.slice (0, 0), r - 1);
                        return list (result);
                    }
                    //<all>
                    __all__.count = count;
                    __all__.cycle = cycle;
                    __all__.repeat = repeat;
                    __all__.accumulate = accumulate;
                    __all__.chain = chain;
                    __all__.compress = compress;
                    __all__.dropwhile = dropwhile;
                    __all__.filterfalse = filterfalse;
                    __all__.groupby = groupby;
                    __all__.islice = islice;
                    __all__.starmap = starmap;
                    __all__.takewhile = takewhile;
                    __all__.tee = tee;
                    __all__.product = product;
                    __all__.permutations = permutations;
                    __all__.combinations = combinations;
                    __all__.combinations_with_replacement = combinations_with_replacement;
                    //</all>
                }
            }
        }
    );
	__nest__ (
		__all__,
		'org.transcrypt.autotester', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var itertools = {};
					var HTMLGenerator = __init__ (__world__.org.transcrypt.autotester.html).HTMLGenerator;
					var DataConverter = __init__ (__world__.org.transcrypt.autotester.html).DataConverter;
					var JSTesterUI = __init__ (__world__.org.transcrypt.autotester.html).JSTesterUI;
					__nest__ (itertools, '', __init__ (__world__.itertools));
					var getFileLocation = function (ancestor) {
						if (__envir__.executor_name == __envir__.transpiler_name) {
							var s = null;
							
										var e = new Error();
										if ( ! e.stack ) {
										  console.log("MAJOR ISSUE: Browser Error lacks Stack");
										} else {
										  s = e.stack;
										}
										
							var frames = null;
							
										var linereg = new RegExp("\n\r|\n", "g");
										frames = s.toString().split(linereg);
										
							if (frames === null || len (frames) < 2) {
								console.log("Failed to Split Stack");
								return 'UNKNOWN:???';
							}
							var gpFrame = frames [ancestor * 2 + 1];
							var frameReg = '([^(]*)\\(?([^:]*:)\\/{2,3}([^:/]*:?)([^:]*):(\\d+):(\\d+)';
							var m = null;
							
										var r = new RegExp(frameReg);
										m = r.exec(gpFrame);
										
							if (m) {
								var filepath = m [4];
								var pathParts = filepath.py_split ('/');
								var filename = pathParts [len (pathParts) - 1];
								var lineno = m [5];
								return '{}:{}'.format (filename, lineno);
							}
							else {
								console.log("Failed to Match Frame");
								return 'UNKNOWN:???';
							}
						}
					};
					var AutoTester = __class__ ('AutoTester', [object], {
						get __init__ () {return __get__ (this, function (self, symbols) {
							if (typeof symbols == 'undefined' || (symbols != null && symbols .hasOwnProperty ("__kwargtrans__"))) {;
								var symbols = list ([]);
							};
							self.symbols = symbols;
							self._currTestlet = 'UNKNOWN';
							self.testDict = dict ({});
							self.refDict = dict ({});
							if (__envir__.executor_name == __envir__.transpiler_name) {
								self.ui = JSTesterUI ();
							}
							else {
								self.ui = null;
							}
						});},
						get sortedRepr () {return __get__ (this, function (self, any) {
							var tryGetNumKey = function (key) {
								if (py_typeof (key) == str) {
									try {
										return int (key);
									}
									catch (__except0__) {
										try {
											return float (key);
										}
										catch (__except1__) {
											return key;
										}
									}
								}
								else {
									return key;
								}
							};
							if (py_typeof (any) == dict) {
								return ('{' + ', '.join (function () {
									var __accu0__ = [];
									for (var [index, key] of enumerate (sorted (function () {
										var __accu1__ = [];
										for (var key of any.py_keys ()) {
											__accu1__.append (tryGetNumKey (key));
										}
										return __accu1__;
									} (), __kwargtrans__ ({key: (function __lambda__ (aKey) {
										return str (aKey);
									})})))) {
										__accu0__.append ('{}: {}'.format (repr (key), repr (any [key])));
									}
									return __accu0__;
								} ())) + '}';
							}
							else if (py_typeof (any) == set) {
								if (len (any)) {
									return ('{' + ', '.join (sorted (function () {
										var __accu0__ = [];
										for (var item of list (any)) {
											__accu0__.append (str (item));
										}
										return __accu0__;
									} ()))) + '}';
								}
								else {
									return repr (any);
								}
							}
							else if (py_typeof (any) == range) {
								return repr (list (any));
							}
							else {
								return repr (any);
							}
						});},
						get check () {return __get__ (this, function (self) {
							var ancestor = 2;
							if (arguments.length) {
								var __ilastarg0__ = arguments.length - 1;
								if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
									var __allkwargs0__ = arguments [__ilastarg0__--];
									for (var __attrib0__ in __allkwargs0__) {
										switch (__attrib0__) {
											case 'self': var self = __allkwargs0__ [__attrib0__]; break;
											case 'ancestor': var ancestor = __allkwargs0__ [__attrib0__]; break;
										}
									}
								}
								var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
							}
							else {
								var args = tuple ();
							}
							var position = getFileLocation (ancestor);
							var item = ' '.join (function () {
								var __accu0__ = [];
								for (var arg of args) {
									__accu0__.append (self.sortedRepr (arg));
								}
								return __accu0__;
							} ());
							if (__envir__.executor_name == __envir__.transpiler_name) {
								self.testDict [self._currTestlet].append (tuple ([position, item]));
							}
							else {
								self.refDict [self._currTestlet].append (tuple ([position, item]));
							}
						});},
						get expectException () {return __get__ (this, function (self, func) {
							try {
								func ();
								return 'no exception';
							}
							catch (__except0__) {
								if (isinstance (__except0__, Exception)) {
									var exc = __except0__;
									return 'exception';
								}
								else {
									throw __except0__;
								}
							}
						});},
						get throwToError () {return __get__ (this, function (self, func) {
							try {
								return func ();
							}
							catch (__except0__) {
								if (isinstance (__except0__, Exception)) {
									var exc = __except0__;
									return tuple ([null, '!!!{}'.format (str (exc))]);
								}
								else {
									throw __except0__;
								}
							}
						});},
						get checkEval () {return __get__ (this, function (self, func) {
							var ret = self.throwToError (func);
							self.check (ret, __kwargtrans__ ({ancestor: 3}));
						});},
						get checkPad () {return __get__ (this, function (self, val, count) {
							for (var i = 0; i < count; i++) {
								self.check (val);
							}
						});},
						get _getTotalErrorCnt () {return __get__ (this, function (self, testData, refData) {
							var errCount = 0;
							for (var [i, [refPos, refItem]] of enumerate (refData)) {
								try {
									var __left0__ = testData [i];
									var testPos = __left0__ [0];
									var testItem = __left0__ [1];
									if (testItem != refItem) {
										errCount++;
									}
								}
								catch (__except0__) {
									errCount++;
								}
							}
							return errCount;
						});},
						get compare () {return __get__ (this, function (self) {
							var dc = DataConverter ();
							self.refDict = dc.getPythonResults ();
							var totalErrors = 0;
							var sKeys = sorted (self.refDict.py_keys ());
							for (var key of sKeys) {
								var refData = self.refDict [key];
								try {
									var testData = self.testDict [key];
									if (testData === null) {
										var __except0__ = KeyError ('No Test Data Module: {}'.format (key));
										__except0__.__cause__ = null;
										throw __except0__;
									}
								}
								catch (__except0__) {
									if (isinstance (__except0__, KeyError)) {
										self.ui.appendSeqRowName (key, len (refData));
										for (var [i, [refPos, refItem]] of enumerate (refData)) {
											self.ui.appendTableResult (key, null, null, refPos, refItem, false);
										}
										continue;
									}
									else {
										throw __except0__;
									}
								}
								var errCount = self._getTotalErrorCnt (testData, refData);
								var collapse = errCount == 0;
								self.ui.appendSeqRowName (key, errCount);
								for (var [i, [refPos, refItem]] of enumerate (refData)) {
									try {
										var __left0__ = testData [i];
										var testPos = __left0__ [0];
										var testItem = __left0__ [1];
									}
									catch (__except0__) {
										var testPos = null;
										var testItem = null;
									}
									self.ui.appendTableResult (key, testPos, testItem, refPos, refItem, collapse);
								}
								totalErrors += errCount;
							}
							self.ui.setOutputStatus (totalErrors == 0);
						});},
						get _cleanName () {return __get__ (this, function (self, py_name) {
							var ret = py_name;
							var invalidChars = list (['~', '!', '@', '$', '%', '^', '&', '*', '(', ')', '+', '=', ',', '.', '/', "'", ';', ':', '"', '?', '>', '<', '[', ']', '\\', '{', '}', '|', '`', '#', ' ']);
							for (var ch of invalidChars) {
								var ret = ret.py_replace (ch, '_');
							}
							return ret;
						});},
						get run () {return __get__ (this, function (self, testlet, testletName) {
							var testletName = self._cleanName (testletName);
							self._currTestlet = testletName;
							if (__envir__.executor_name == __envir__.transpiler_name) {
								self.testDict [self._currTestlet] = list ([]);
							}
							else {
								self.refDict [self._currTestlet] = list ([]);
							}
							try {
								testlet.run (self);
							}
							catch (__except0__) {
								if (isinstance (__except0__, Exception)) {
									var exc = __except0__;
									if (self.ui !== null) {
										self.ui.setOutputStatus (false);
										self.ui.showException (testletName, exc);
									}
									else {
										__except0__.__cause__ = null;
										throw __except0__;
									}
								}
								else {
									throw __except0__;
								}
							}
						});},
						get done () {return __get__ (this, function (self) {
							if (__envir__.executor_name == __envir__.transpiler_name) {
								self.compare ();
							}
							else {
								var fnameBase = __main__.__file__.__getslice__ (0, -(3), 1).py_replace ('\\', '/').rsplit ('/', 1) [-(1)];
								var hg = HTMLGenerator (fnameBase);
								for (var minified of tuple ([false, true])) {
									hg.generate_html (self.refDict, minified);
								}
							}
						});}
					});
					__pragma__ ('<use>' +
						'itertools' +
						'org.transcrypt.autotester.html' +
					'</use>')
					__pragma__ ('<all>')
						__all__.AutoTester = AutoTester;
						__all__.DataConverter = DataConverter;
						__all__.HTMLGenerator = HTMLGenerator;
						__all__.JSTesterUI = JSTesterUI;
						__all__.getFileLocation = getFileLocation;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		'org.transcrypt.autotester.html', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var okColor = 'green';
					var errorColor = 'red';
					var highlightColor = 'yellow';
					var testletNameColor = 'blue';
					var messageDivId = 'message';
					var referenceDivId = 'python';
					var refResultDivId = 'pyresults';
					var refPosDivId = 'pypos';
					var testDivId = 'transcrypt';
					var tableId = 'resulttable';
					var resultsDivId = 'results';
					var faultRowClass = 'faultrow';
					var testletHeaderClass = 'testletheader';
					var transValClass = 'trans-val';
					var transPosClass = 'trans-pos';
					var pyValClass = 'py-val';
					var pyPosClass = 'py-pos';
					var excAreaId = 'exc-area';
					var excHeaderClass = 'exc-header';
					var forceCollapseId = 'force-collapse';
					var forceExpandId = 'force-expand';
					var HTMLGenerator = __class__ ('HTMLGenerator', [object], {
						get __init__ () {return __get__ (this, function (self, filenameBase) {
							if (typeof filenameBase == 'undefined' || (filenameBase != null && filenameBase .hasOwnProperty ("__kwargtrans__"))) {;
								var filenameBase = null;
							};
							self._fnameBase = filenameBase;
						});},
						get generate_html () {return __get__ (this, function (self, refDict, minified) {
							if (typeof minified == 'undefined' || (minified != null && minified .hasOwnProperty ("__kwargtrans__"))) {;
								var minified = false;
							};
							if (self._fnameBase === null) {
								var __except0__ = ValueError ('Filename Base must be defined to generate');
								__except0__.__cause__ = null;
								throw __except0__;
							}
							var minInfix = (minified ? '.min' : '');
							var fname = minInfix.join (list ([self._fnameBase, '.html']));
							var jsFileName = minInfix.join (list ([self._fnameBase, '.js']));
							var jsPath = '{}/{}'.format (__envir__.target_subdir, jsFileName);
							f = open (fname, 'w');
							f.write ('<html><head>');
							self._writeCSS (f);
							f.write ('</head><body>');
							self._writeStatusHeaderTemplate (f);
							var dc = DataConverter ();
							dc.writeHiddenResults (f, refDict);
							self._writeTableArea (f);
							f.write ('<script src="{}"></script>\n\n'.format (jsPath));
							f.write ('</body></html>');
							f.close ();
						});},
						get _writeCSS () {return __get__ (this, function (self, f) {
							var cssOut = '\n\t\t<style>\n\t\t  body {\n\t\t    max-width: 100%;\n\t\t  }\n\t\t  .faultrow > td {\n\t\t     background-color: LightCoral;\n\t\t  }\n\t\t  #resulttable {\n\t\t    border-collapse: collapse;\n\t\t    width: 100%;\n\t\t    table-layout: fixed;\n\t\t  }\n\t\t  #resulttable th, #resulttable td {\n\t\t    border: 1px solid grey;\n\t\t  }\n\t\t  .testletheader > td {\n\t\t    background-color: LightSkyBlue;\n\t\t  }\n\t\t  .header-pos {\n\t\t    width: 20%;\n\t\t  }\n\t\t  .header-val {\n\t\t    width: 30%;\n\t\t  }\n\t\t  .py-pos,.trans-pos {\n\t\t    width: 20%;\n\t\t    overflow: hidden;\n\t\t  }\n\t\t  .py-val, .trans-val {\n\t\t    width: 30%;\n\t\t    overflow-x: auto;\n\t\t  }\n\t\t  .exc-header {\n\t      color: red;\n\t\t  }\n\t\t  .collapsed {\n\t\t    display: None;\n\t\t  }\n\t\t</style>\n\t\t';
							f.write (cssOut);
						});},
						get _writeStatusHeaderTemplate () {return __get__ (this, function (self, f) {
							f.write ('<b>Status:</b>\n');
							f.write ('<div id="{}"></div><br><br>\n\n'.format (messageDivId));
						});},
						get _writeTableArea () {return __get__ (this, function (self, f) {
							f.write ('<div id="{}"></div>'.format (excAreaId));
							f.write ('<div id="{}">'.format (resultsDivId));
							f.write ('<div> <a id="{}" href="#"> Collapse All</a> <a id="{}" href="#">Expand All</a></div>'.format (forceCollapseId, forceExpandId));
							f.write ('<table id="{}"><thead><tr> <th colspan="2"> CPython </th> <th colspan="2"> Transcrypt </th> </tr>'.format (tableId));
							f.write ('<tr> <th class="header-pos"> Location </th> <th class="header-val"> Value </th> <th class="header-val"> Value </th> <th class="header-pos"> Location </th> </tr></thead><tbody></tbody>');
							f.write ('</table>');
							f.write ('</div>');
						});}
					});
					var DataConverter = __class__ ('DataConverter', [object], {
						get writeHiddenResults () {return __get__ (this, function (self, f, refDict) {
							f.write ('<div id="{}" style="display: None">'.format (referenceDivId));
							for (var key of refDict.py_keys ()) {
								var itemData = ' | '.join (function () {
									var __accu0__ = [];
									for (var x of refDict [key]) {
										__accu0__.append (x [1]);
									}
									return __accu0__;
								} ());
								var posContent = ' | '.join (function () {
									var __accu0__ = [];
									for (var x of refDict [key]) {
										__accu0__.append (x [0]);
									}
									return __accu0__;
								} ());
								f.write ('<div id="{}">\n'.format (key));
								f.write ('<div id="{}">{}</div>\n\n'.format (refResultDivId, itemData));
								f.write ('<div id="{}">{}</div>\n'.format (refPosDivId, posContent));
								f.write ('</div>\n');
							}
							f.write ('</div></div>\n');
						});},
						get getPythonResults () {return __get__ (this, function (self) {
							var refData = document.getElementById (referenceDivId);
							var refDict = dict ({});
							for (var child of refData.children) {
								var keyName = child.getAttribute ('id');
								var __left0__ = self._extractPosResult (child);
								var posData = __left0__ [0];
								var resultData = __left0__ [1];
								refDict [keyName] = zip (posData, resultData);
							}
							return refDict;
						});},
						get _extractPosResult () {return __get__ (this, function (self, elem) {
							var resultData = null;
							var posData = null;
							for (var e of elem.children) {
								var idStr = e.getAttribute ('id');
								if (idStr == refResultDivId) {
									var resultData = e.innerHTML.py_split (' | ');
								}
								else if (idStr == refPosDivId) {
									var posData = e.innerHTML.py_split (' | ');
								}
								else {
									// pass;
								}
							}
							return tuple ([posData, resultData]);
						});}
					});
					var getRowClsName = function (py_name) {
						return 'mod-' + py_name;
					};
					var JSTesterUI = __class__ ('JSTesterUI', [object], {
						get __init__ () {return __get__ (this, function (self) {
							self.expander = TestModuleExpander ();
						});},
						get setOutputStatus () {return __get__ (this, function (self, success) {
							if (success) {
								document.getElementById (messageDivId).innerHTML = '<div style="color: {}">Test succeeded</div>'.format (okColor);
							}
							else {
								document.getElementById (messageDivId).innerHTML = '<div style="color: {}"><b>Test failed</b></div>'.format (errorColor);
							}
						});},
						get appendSeqRowName () {return __get__ (this, function (self, py_name, errCount) {
							var table = document.getElementById (tableId);
							var row = table.insertRow (-(1));
							row.id = py_name;
							row.classList.add (testletHeaderClass);
							self.expander.setupCollapseableHeader (row, errCount == 0);
							var headerCell = row.insertCell (0);
							headerCell.innerHTML = (py_name + ' | Errors = ') + str (errCount);
							headerCell.colSpan = 4;
							headerCell.style.textAlign = 'center';
						});},
						get appendTableResult () {return __get__ (this, function (self, py_name, testPos, testItem, refPos, refItem, collapse) {
							if (typeof collapse == 'undefined' || (collapse != null && collapse .hasOwnProperty ("__kwargtrans__"))) {;
								var collapse = false;
							};
							var clsName = getRowClsName (py_name);
							var table = document.getElementById (tableId);
							var row = table.insertRow (-(1));
							row.classList.add (clsName);
							if (testItem != refItem) {
								row.classList.add (faultRowClass);
								var refPos = '!!!' + refPos;
							}
							else {
								self.expander.setCollapsed (row, collapse);
							}
							var cpy_pos = row.insertCell (0);
							cpy_pos.innerHTML = refPos;
							cpy_pos.classList.add (pyPosClass);
							var cpy_val = row.insertCell (1);
							cpy_val.innerHTML = refItem;
							cpy_val.classList.add (pyValClass);
							var trans_val = row.insertCell (2);
							if (testItem !== null) {
								trans_val.innerHTML = testItem;
							}
							trans_val.classList.add (transValClass);
							var trans_pos = row.insertCell (3);
							if (testPos !== null) {
								trans_pos.innerHTML = testPos;
							}
							trans_pos.classList.add (transPosClass);
						});},
						get showException () {return __get__ (this, function (self, testname, exc) {
							var excElem = document.getElementById (excAreaId);
							var header = document.createElement ('H2');
							header.classList.add (excHeaderClass);
							header.innerHTML = 'Exception Thrown in JS Runtime';
							excElem.appendChild (header);
							var content = document.createElement ('p');
							content.innerHTML = 'Exception in {}: {}'.format (testname, str (exc));
							excElem.appendChild (content);
							var stacktrace = document.createElement ('p');
							if (exc.stack !== null) {
								stacktrace.innerHTML = str (exc.stack);
							}
							else {
								stacktrace.innerHTML = 'No Stack Trace Available!';
							}
						});}
					});
					var TestModuleExpander = __class__ ('TestModuleExpander', [object], {
						get __init__ () {return __get__ (this, function (self) {
							self.collapsedClass = 'collapsed';
							self.modCollapseClass = 'mod-collapsed';
							self._expandCollapseAllFuncs ();
						});},
						get setCollapsed () {return __get__ (this, function (self, row, collapse) {
							if (collapse) {
								row.classList.add (self.collapsedClass);
							}
							else {
								row.classList.remove (self.collapsedClass);
							}
						});},
						get setupCollapseableHeader () {return __get__ (this, function (self, row, startCollapsed) {
							if (typeof startCollapsed == 'undefined' || (startCollapsed != null && startCollapsed .hasOwnProperty ("__kwargtrans__"))) {;
								var startCollapsed = false;
							};
							if (startCollapsed) {
								row.classList.add (self.modCollapseClass);
							}
							var toggleCollapse = function (evt) {
								var headerRow = evt.target.parentElement;
								var doCollapse = !(headerRow.classList.contains (self.modCollapseClass));
								self.collapseModule (headerRow, doCollapse);
							};
							row.onclick = toggleCollapse;
						});},
						get collapseModule () {return __get__ (this, function (self, headerRow, doCollapse) {
							var py_name = headerRow.id;
							var table = document.getElementById (tableId);
							var clsName = getRowClsName (py_name);
							var allRows = table.tHead.children;
							var rows = filter ((function __lambda__ (x) {
								return x.classList.contains (clsName);
							}), allRows);
							for (var row of rows) {
								self.setCollapsed (row, doCollapse);
							}
							if (doCollapse) {
								headerRow.classList.add (self.modCollapseClass);
							}
							else {
								headerRow.classList.remove (self.modCollapseClass);
							}
						});},
						get _expandCollapseAllFuncs () {return __get__ (this, function (self) {
							var applyToAll = function (evt, collapse) {
								var table = document.getElementById (tableId);
								var filtFunc = (function __lambda__ (x) {
									return x.classList.contains (testletHeaderClass);
								});
								var headerRows = filter (filtFunc, table.tHead.children);
								for (var headerRow of headerRows) {
									self.collapseModule (headerRow, collapse);
								}
							};
							var collapseAll = function (evt) {
								evt.preventDefault ();
								applyToAll (evt, true);
								return false;
							};
							var expandAll = function (evt) {
								evt.preventDefault ();
								applyToAll (evt, false);
								return false;
							};
							var forceCollapse = document.getElementById (forceCollapseId);
							forceCollapse.onclick = collapseAll;
							var forceExpand = document.getElementById (forceExpandId);
							forceExpand.onclick = expandAll;
						});}
					});
					__pragma__ ('<all>')
						__all__.DataConverter = DataConverter;
						__all__.HTMLGenerator = HTMLGenerator;
						__all__.JSTesterUI = JSTesterUI;
						__all__.TestModuleExpander = TestModuleExpander;
						__all__.errorColor = errorColor;
						__all__.excAreaId = excAreaId;
						__all__.excHeaderClass = excHeaderClass;
						__all__.faultRowClass = faultRowClass;
						__all__.forceCollapseId = forceCollapseId;
						__all__.forceExpandId = forceExpandId;
						__all__.getRowClsName = getRowClsName;
						__all__.highlightColor = highlightColor;
						__all__.messageDivId = messageDivId;
						__all__.okColor = okColor;
						__all__.pyPosClass = pyPosClass;
						__all__.pyValClass = pyValClass;
						__all__.refPosDivId = refPosDivId;
						__all__.refResultDivId = refResultDivId;
						__all__.referenceDivId = referenceDivId;
						__all__.resultsDivId = resultsDivId;
						__all__.tableId = tableId;
						__all__.testDivId = testDivId;
						__all__.testletHeaderClass = testletHeaderClass;
						__all__.testletNameColor = testletNameColor;
						__all__.transPosClass = transPosClass;
						__all__.transValClass = transValClass;
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
						get __init__ () {return __get__ (this, function (self) {
							IndexError.__init__ (self, 'no such group');
						});}
					});
					var Match = __class__ ('Match', [object], {
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
								return tuple (function () {
									var __accu0__ = [];
									for (var x of ret) {
										__accu0__.append ((x !== null ? x : py_default));
									}
									return __accu0__;
								} ());
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
									var value = self._obj [gid];
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
							var ret = ''.join (function () {
								var __accu0__ = [];
								for (var x of bitmaps) {
									if ((x [0] & flags) > 0) {
										__accu0__.append (x [1]);
									}
								}
								return __accu0__;
							} ());
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
					var VERBOSE = false;
					var MAX_SHIFTREDUCE_LOOPS = 1000;
					var stringFlags = 'aiLmsux';
					var Group = __class__ ('Group', [object], {
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
	(function () {
		var basic_jsre = {};
		var basic_pyre = {};
		var org = {};
		__nest__ (org, 'transcrypt.autotester', __init__ (__world__.org.transcrypt.autotester));
		__nest__ (basic_pyre, '', __init__ (__world__.basic_pyre));
		__nest__ (basic_jsre, '', __init__ (__world__.basic_jsre));
		var autoTester = org.transcrypt.autotester.AutoTester ();
		autoTester.run (basic_jsre, 'Basic JS RE Tests');
		autoTester.run (basic_pyre, 'Basic Python RE Tests');
		autoTester.done ();
		__pragma__ ('<use>' +
			'basic_jsre' +
			'basic_pyre' +
			'org.transcrypt.autotester' +
		'</use>')
		__pragma__ ('<all>')
			__all__.autoTester = autoTester;
		__pragma__ ('</all>')
	}) ();
   return __all__;
}
window ['autotest'] = autotest ();

//# sourceMappingURL=extra/sourcemap/autotest.js.map
