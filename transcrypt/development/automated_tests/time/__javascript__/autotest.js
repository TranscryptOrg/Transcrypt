"use strict";
// Transcrypt'ed from Python, 2016-11-28 19:56:51
function autotest () {
   var __symbols__ = ['__complex__', '__py3.5__', '__esv5__'];
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
            
        // Object creator function is inherited by all classes (so in principle it could be made global)
        __new__: function (args) {  // Args are just the constructor args       
            // In JavaScript the Python class is the prototype of the Python object
            // In this way methods and static attributes will be available both with a class and an object before the dot
            // The descriptor produced by __get__ will return the right method flavor
            var instance = Object.create (this, {__class__: {value: this, enumerable: true}});
            

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
							self.transpiler_version = '3.6.3';
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
							else {
								if (len (self.__args__)) {
									return str (self.__args__ [0]);
								}
								else {
									return '';
								}
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
							var __iterable0__ = iterable;
							for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
								var item = __iterable0__ [__index0__];
								__accu0__.append (func (item));
							}
							return __accu0__;
						} ();
					};
					var filter = function (func, iterable) {
						return function () {
							var __accu0__ = [];
							var __iterable0__ = iterable;
							for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
								var item = __iterable0__ [__index0__];
								if (func (item)) {
									__accu0__.append (item);
								}
							}
							return __accu0__;
						} ();
					};
					var complex = __class__ ('complex', [object], {
						get __init__ () {return __get__ (this, function (self, real, imag) {
							if (typeof imag == 'undefined' || (imag != null && imag .hasOwnProperty ("__kwargtrans__"))) {;
								var imag = null;
							};
							if (imag == null) {
								if (py_typeof (real) == complex) {
									self.real = real.real;
									self.imag = real.imag;
								}
								else {
									self.real = real;
									self.imag = 0;
								}
							}
							else {
								self.real = real;
								self.imag = imag;
							}
						});},
						get __neg__ () {return __get__ (this, function (self) {
							return complex (-(self.real), -(self.imag));
						});},
						get __exp__ () {return __get__ (this, function (self) {
							var modulus = Math.exp (self.real);
							return complex (modulus * Math.cos (self.imag), modulus * Math.sin (self.imag));
						});},
						get __log__ () {return __get__ (this, function (self) {
							return complex (Math.log (Math.sqrt (self.real * self.real + self.imag * self.imag)), Math.atan2 (self.imag, self.real));
						});},
						get __pow__ () {return __get__ (this, function (self, other) {
							return self.__log__ ().__mul__ (other).__exp__ ();
						});},
						get __rpow__ () {return __get__ (this, function (self, real) {
							return self.__mul__ (Math.log (real)).__exp__ ();
						});},
						get __mul__ () {return __get__ (this, function (self, other) {
							if (typeof other === 'number') {
								return complex (self.real * other, self.imag * other);
							}
							else {
								return complex (self.real * other.real - self.imag * other.imag, self.real * other.imag + self.imag * other.real);
							}
						});},
						get __rmul__ () {return __get__ (this, function (self, real) {
							return complex (self.real * real, self.imag * real);
						});},
						get __div__ () {return __get__ (this, function (self, other) {
							if (typeof other === 'number') {
								return complex (self.real / other, self.imag / other);
							}
							else {
								var denom = other.real * other.real + other.imag * other.imag;
								return complex ((self.real * other.real + self.imag * other.imag) / denom, (self.imag * other.real - self.real * other.imag) / denom);
							}
						});},
						get __rdiv__ () {return __get__ (this, function (self, real) {
							var denom = self.real * self.real;
							return complex ((real * self.real) / denom, (real * self.imag) / denom);
						});},
						get __add__ () {return __get__ (this, function (self, other) {
							if (typeof other === 'number') {
								return complex (self.real + other, self.imag);
							}
							else {
								return complex (self.real + other.real, self.imag + other.imag);
							}
						});},
						get __radd__ () {return __get__ (this, function (self, real) {
							return complex (self.real + real, self.imag);
						});},
						get __sub__ () {return __get__ (this, function (self, other) {
							if (typeof other === 'number') {
								return complex (self.real - other, self.imag);
							}
							else {
								return complex (self.real - other.real, self.imag - other.imag);
							}
						});},
						get __rsub__ () {return __get__ (this, function (self, real) {
							return complex (real - self.real, -(self.imag));
						});},
						get __repr__ () {return __get__ (this, function (self) {
							return '({}{}{}j)'.format (self.real, (self.imag >= 0 ? '+' : ''), self.imag);
						});},
						get __str__ () {return __get__ (this, function (self) {
							return __repr__ (self).__getslice__ (1, -(1), 1);
						});}
					});
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
								var __iterable0__ = args;
								for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
									var arg = __iterable0__ [__index0__];
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
									var __iterable0__ = args;
									for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
										var arg = __iterable0__ [__index0__];
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
						__all__.complex = complex;
						__all__.filter = filter;
						__all__.map = map;
						__all__.sorted = sorted;
					__pragma__ ('</all>')
				}
			}
		}
	);

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

    var complex = __all__.complex;
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

    // Property installer function, no member since that would bloat classes
    var property = function (getter, setter) {  // Returns a property descriptor rather than a property
        if (!setter) {  // ??? Make setter optional instead of dummy?
            setter = function () {};
        }
        return {get: function () {return getter (this)}, set: function (value) {setter (this, value)}, enumerable: true};
    }
    __all__.property = property;

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
            for (var index = 0; index < classinfo.length; index++) {
                var aClass = classinfo [index];
                if (isinstance (anObject, aClass)) {
                    return true;
                }
            }
            return false;
        }

        try {                   // Most frequent use case first
            return '__class__' in anObject ? isA (anObject.__class__) : anObject instanceof classinfo;
        }
        catch (exception) {     // Using isinstance on primitives asumed rare
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
    var abs = function (x) {
        try {
            return Math.abs (x);
        }
        catch (exception) {
            return Math.sqrt (x.real * x.real + x.imag * x.imag);
        }
    };

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

    // Zip method for arrays
    var zip = function () {
        var args = [] .slice.call (arguments);
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
        var instance = iterable ? [] .slice.apply (iterable) : [];  // Spread iterable, n.b. array.slice (), so array before dot
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
    Object.defineProperty (String.prototype, 'format', {
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
                throw KeyError(aKey, new Error());
            }
        }
        return aDefault;
    }

    function __update__ (aDict) {
        for (var aKey in aDict) {
            this [aKey] = aDict [aKey];
        }
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
        Object.defineProperty (instance, '__class__', {value: dict, enumerable: false, writable: true});
        Object.defineProperty (instance, 'py_keys', {value: __keys__, enumerable: false});
        Object.defineProperty (instance, '__iter__', {value: function () {new __PyIterator__ (this.py_keys ());}, enumerable: false});
        Object.defineProperty (instance, Symbol.iterator, {value: function () {new __JsIterator__ (this.py_keys ());}, enumerable: false});
        Object.defineProperty (instance, 'py_items', {value: __items__, enumerable: false});
        Object.defineProperty (instance, 'py_del', {value: __del__, enumerable: false});
        Object.defineProperty (instance, 'py_clear', {value: __clear__, enumerable: false});
        Object.defineProperty (instance, 'py_get', {value: __getdefault__, enumerable: false});
        Object.defineProperty (instance, 'py_setdefault', {value: __setdefault__, enumerable: false});
        Object.defineProperty (instance, 'py_pop', {value: __pop__, enumerable: false});
        Object.defineProperty (instance, 'py_update', {value: __update__, enumerable: false});
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
    Object.defineProperty (Function.prototype, '__setdoc__', {value: __setdoc__, enumerable: false});

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
    __all__.pow = __pow__;

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

    var __call__ = function (/* <callee>, <this>, <params>* */) {
        var args = [] .slice.apply (arguments);
        if (typeof args [0] == 'object' && '__call__' in args [0]) {        // Overloaded
            return args [0] .__call__ .apply (args [1], args.slice (2));
        }
        else {                                                              // Native
            return args [0] .apply (args [1], args.slice (2));
        }
    };
    __all__.__call__ = __call__;
    __nest__ (
        __all__,
        'itertools', {
            __all__: {
                __inited__: false,
                __init__: function (__all__) {
                    var chain = function () {
                        var args = [] .slice.apply (arguments);
                        var result = [];
                        for (var index = 0; index < args.length; index++) {
                            result = result.concat (args [index]);
                        }
                        return list (result);
                    }
                    //<all>
                    __all__.chain = chain;
                    //</all>
                }
            }
        }
    );
	__nest__ (
		__all__,
		'mult_time', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var time = {};
					__nest__ (time, '', __init__ (__world__.time));
					var run = function (autoTester) {
						var t = list ([2000, 1, 1, 1, 1, 1, 1, 1, 0]);
						var check = function (fmt) {
							var s = time.mktime (tuple (t));
							autoTester.check ('gmtime', tuple (time.gmtime (int (s))));
							autoTester.check ('localtime', tuple (time.localtime (int (s))));
							autoTester.check ('mktime', int (s));
							autoTester.check ('ctime', int (s));
						};
						var __iterable0__ = tuple ([0, 1, 12, 14, 23]);
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
							var hour = __iterable0__ [__index0__];
							t [3] = hour;
							var __iterable1__ = tuple (['%p %I.%d.%Y', '%b .%d.%y', '%b .%d.%Y', '%d%m%Y%H:%M:%S%p', '%b .%d.%Y', 'M%m.%d.%Y', '%m.%d.%Y', '%m.%d.%Y', '%b .%d.%Y', '%m.%d.%Y', '%B %d.%Y', '%a %b %d %H:%M:%S %Y', '%d.%m.%Y %I:%M:%S%p', '%a%b %d %H:%M:%S %Y', '%a%b%d %H:%M:%S %Y', '%a%b%d%H:%Mx%S%Y', '%a%b%d%H:%Mxx%S%Y', '%a%b%d%H:%Mxx%S%Y +000', ' %a%b%d%H:%Mxx%S%Y +000 ']);
							for (var __index1__ = 0; __index1__ < __iterable1__.length; __index1__++) {
								var f = __iterable1__ [__index1__];
								check (f);
							}
						}
						autoTester.check ('asctime', t);
					};
					__pragma__ ('<use>' +
						'time' +
					'</use>')
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
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
									var __iterable0__ = enumerate (sorted (function () {
										var __accu1__ = [];
										var __iterable1__ = any.py_keys ();
										for (var __index0__ = 0; __index0__ < __iterable1__.length; __index0__++) {
											var key = __iterable1__ [__index0__];
											__accu1__.append (tryGetNumKey (key));
										}
										return __accu1__;
									} (), __kwargtrans__ ({key: (function __lambda__ (aKey) {
										return str (aKey);
									})})));
									for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
										var __left0__ = __iterable0__ [__index0__];
										var index = __left0__ [0];
										var key = __left0__ [1];
										__accu0__.append ('{}: {}'.format (repr (key), repr (any [key])));
									}
									return __accu0__;
								} ())) + '}';
							}
							else {
								if (py_typeof (any) == set) {
									if (len (any)) {
										return ('{' + ', '.join (sorted (function () {
											var __accu0__ = [];
											var __iterable0__ = list (any);
											for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
												var item = __iterable0__ [__index0__];
												__accu0__.append (str (item));
											}
											return __accu0__;
										} ()))) + '}';
									}
									else {
										return repr (any);
									}
								}
								else {
									if (py_typeof (any) == range) {
										return repr (list (any));
									}
									else {
										return repr (any);
									}
								}
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
								var __iterable0__ = args;
								for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
									var arg = __iterable0__ [__index0__];
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
							var __iterable0__ = enumerate (refData);
							for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
								var __left0__ = __iterable0__ [__index0__];
								var i = __left0__ [0];
								var refPos = __left0__ [1][0];
								var refItem = __left0__ [1][1];
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
							var __iterable0__ = sKeys;
							for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
								var key = __iterable0__ [__index0__];
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
										var __iterable1__ = enumerate (refData);
										for (var __index1__ = 0; __index1__ < __iterable1__.length; __index1__++) {
											var __left0__ = __iterable1__ [__index1__];
											var i = __left0__ [0];
											var refPos = __left0__ [1][0];
											var refItem = __left0__ [1][1];
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
								var __iterable1__ = enumerate (refData);
								for (var __index1__ = 0; __index1__ < __iterable1__.length; __index1__++) {
									var __left0__ = __iterable1__ [__index1__];
									var i = __left0__ [0];
									var refPos = __left0__ [1][0];
									var refItem = __left0__ [1][1];
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
							var __iterable0__ = invalidChars;
							for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
								var ch = __iterable0__ [__index0__];
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
										var __except1__ = Exception ('No Valid UI instance yet');
										__except1__.__cause__ = null;
										throw __except1__;
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
								var __iterable0__ = tuple ([false, true]);
								for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
									var minified = __iterable0__ [__index0__];
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
							var __iterable0__ = refDict.py_keys ();
							for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
								var key = __iterable0__ [__index0__];
								var itemData = ' | '.join (function () {
									var __accu0__ = [];
									var __iterable1__ = refDict [key];
									for (var __index1__ = 0; __index1__ < __iterable1__.length; __index1__++) {
										var x = __iterable1__ [__index1__];
										__accu0__.append (x [1]);
									}
									return __accu0__;
								} ());
								var posContent = ' | '.join (function () {
									var __accu0__ = [];
									var __iterable1__ = refDict [key];
									for (var __index1__ = 0; __index1__ < __iterable1__.length; __index1__++) {
										var x = __iterable1__ [__index1__];
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
							var __iterable0__ = refData.children;
							for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
								var child = __iterable0__ [__index0__];
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
							var __iterable0__ = elem.children;
							for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
								var e = __iterable0__ [__index0__];
								var idStr = e.getAttribute ('id');
								if (idStr == refResultDivId) {
									var resultData = e.innerHTML.py_split (' | ');
								}
								else {
									if (idStr == refPosDivId) {
										var posData = e.innerHTML.py_split (' | ');
									}
									else {
										// pass;
									}
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
							var __iterable0__ = rows;
							for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
								var row = __iterable0__ [__index0__];
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
								var __iterable0__ = headerRows;
								for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
									var headerRow = __iterable0__ [__index0__];
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
		'strptime', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var time = {};
					__nest__ (time, '', __init__ (__world__.time));
					var run = function (autoTester) {
						var check = function (t, fmt) {
							var s = tuple (time.strptime (t, fmt));
							autoTester.check (' '.join (list ([t, '[', fmt, '] = '])), s);
						};
						check ('FEb .1.1902', '%b .%d.%Y');
						check ('3112199912:00:00pm', '%d%m%Y%H:%M:%S%p');
						check ('FEb .1.1902', '%b .%d.%Y');
						check ('M1.1.1901', 'M%m.%d.%Y');
						check ('2.1.1900', '%m.%d.%Y');
						check ('6.1.2000', '%m.%d.%Y');
						check ('nov .1.1900', '%b .%d.%Y');
						check ('2.1.1900', '%m.%d.%Y');
						check ('december 1.1999', '%B %d.%Y');
						check ('Tue Jul 18 19:32:11 2016', '%a %b %d %H:%M:%S %Y');
						check ('31.12.1999 12:00:00pm', '%d.%m.%Y %I:%M:%S%p');
						check ('TueJul 18 19:32:11 2016', '%a%b %d %H:%M:%S %Y');
						check ('TueJul18 19:32:11 2016', '%a%b%d %H:%M:%S %Y');
						check ('TueJul1819:32x112016', '%a%b%d%H:%Mx%S%Y');
						check ('TueJul1819:32xx112016', '%a%b%d%H:%Mxx%S%Y');
					};
					__pragma__ ('<use>' +
						'time' +
					'</use>')
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		'testlet0', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var time = {};
					__nest__ (time, '', __init__ (__world__.time));
					var ts = 1468968009.638596;
					var hy = (6 * 30) * 86400;
					var run = function (autoTester) {
						var c = autoTester.check;
						c ('time():', int (time.time () / 1000));
						c ('altzone:', time.altzone);
						c ('timelen:', len (str (int (time.time ()))));
						c ('localtime:', list (time.localtime (ts)));
						c ('ltime_no_dst:', list (time.localtime (ts + hy)));
						c ('gmtime:', list (time.gmtime (ts)));
						c ('daylight:', bool (time.daylight));
						c ('timezone:', time.timezone);
						c ('tzname:', time.tzname);
					};
					__pragma__ ('<use>' +
						'time' +
					'</use>')
					__pragma__ ('<all>')
						__all__.hy = hy;
						__all__.run = run;
						__all__.ts = ts;
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
					var __date = new Date (0);
					var __now = new Date ();
					var __weekdays = list ([]);
					var __weekdays_long = list ([]);
					var __d = new Date (1467662339080);
					for (var i = 0; i < 7; i++) {
						var __iterable0__ = tuple ([tuple ([__weekdays, 'short']), tuple ([__weekdays_long, 'long'])]);
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
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
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
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
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
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
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
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
									else {
										if (d == 'a') {
											var l = len (__weekdays [0]);
										}
										else {
											if (d == 'A') {
												var l = len (__weekdays_long [0]);
											}
											else {
												if (d == 'b') {
													var l = len (__months [0]);
												}
												else {
													if (__in__ (d, tuple (['d', 'm', 'H', 'M', 'S']))) {
														var l = 2;
													}
												}
											}
										}
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
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
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
							else {
								if (d == 'A') {
									if (!(__in__ (v, __weekdays_long))) {
										var __except0__ = ValueError ('Weekday unknown in your locale');
										__except0__.__cause__ = null;
										throw __except0__;
									}
									var have_weekday = true;
									t [6] = __weekdays_long.index (v);
								}
								else {
									if (d == 'b') {
										if (!(__in__ (v, __months))) {
											var __except0__ = ValueError ('Month unknown in your locale');
											__except0__.__cause__ = null;
											throw __except0__;
										}
										t [1] = __months.index (v) + 1;
									}
									else {
										if (d == 'B') {
											if (!(__in__ (v, __months_long))) {
												var __except0__ = ValueError ('Month unknown in your locale');
												__except0__.__cause__ = null;
												throw __except0__;
											}
											t [1] = __months_long.index (v) + 1;
										}
										else {
											if (d == 'I') {
												var ampm = dir_val ['p'] || 'am';
												var ampm = ampm.lower ();
												var v = int (v);
												if (v == 12) {
													var v = 0;
												}
												else {
													if (v > 12) {
														var __except0__ = ValueError (((("time data '" + string) + "' does not match format '") + format) + "'");
														__except0__.__cause__ = null;
														throw __except0__;
													}
												}
												if (ampm == 'pm') {
													v += 12;
												}
												t [__lu ['H']] = v;
											}
											else {
												if (d == 'y') {
													t [0] = 2000 + int (v);
												}
												else {
													if (d == 'Z') {
														if (__in__ (v.lower (), list (['gmt', 'utc']))) {
															t [-(1)] = 0;
														}
													}
												}
											}
										}
									}
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
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
							var d = __iterable0__ [__index0__];
							var k = '%' + d;
							if (!(__in__ (k, f))) {
								continue;
							}
							var v = zf2 (t [__lu [d]]);
							var f = f.py_replace (k, v);
						}
						var __iterable0__ = tuple ([tuple (['b', __months, 1]), tuple (['B', __months_long, 1]), tuple (['a', __weekdays, 6]), tuple (['A', __weekdays_long, 6])]);
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
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
							else {
								if (v > 12) {
									var v = v - 12;
								}
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
		var mult_time = {};
		var org = {};
		var strptime = {};
		var testlet0 = {};
		__nest__ (org, 'transcrypt.autotester', __init__ (__world__.org.transcrypt.autotester));
		__nest__ (testlet0, '', __init__ (__world__.testlet0));
		__nest__ (strptime, '', __init__ (__world__.strptime));
		__nest__ (mult_time, '', __init__ (__world__.mult_time));
		var autoTester = org.transcrypt.autotester.AutoTester ();
		autoTester.run (testlet0, 'testlet0');
		autoTester.run (strptime, 'strptime');
		autoTester.run (mult_time, 'mult_time');
		autoTester.done ();
		__pragma__ ('<use>' +
			'mult_time' +
			'org.transcrypt.autotester' +
			'strptime' +
			'testlet0' +
		'</use>')
		__pragma__ ('<all>')
			__all__.autoTester = autoTester;
		__pragma__ ('</all>')
	}) ();
   return __all__;
}
window ['autotest'] = autotest ();
