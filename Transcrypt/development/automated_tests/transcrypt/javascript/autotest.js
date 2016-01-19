"use strict";
// Transcrypt'ed from Python, 2016-01-19 14:47:49
function autotest () {
	var __all__ = {};
	var __world__ = __all__;
	
	// Nested object creator, part of the nesting may already exist and have attributes
	var __nest__ = function (headObject, tailNames, value) {
		// In some cases this will be a global object, e.g. 'window'
		var current = headObject;
		
		if (tailNames != '') {	// Split on empty string doesn't give empty list
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
		}
		return module.__all__;
	};
	__all__.__init__ = __init__;
	
	// Since we want to assign functions, a = b.f should make b.f produce a bound function
	// So __get__ should be called by a property rather then a function
	// Factory __get__ creates one of three curried functions for func
	// Which one is produced depends on what's to the left of the dot of the corresponding JavaScript property
	var __get__ = function (self, func) {
		if (self) {
			if (self.hasOwnProperty ('__class__')) {			// Object before the dot
				return function (args) {						// Return bound function
					var args = [] .slice.apply (arguments);
					return func.apply (null, [self] .concat (args));
				}
			}
			else {												// Class before the dot
				return func;									// Return static method
			}
		}
		else {													// Nothing before the dot
			return func;										// Return free function
		}
	}
	__all__.__get__ = __get__;
			
	// Class creator function
	var __class__ = function (name, bases, extra) {
		// Create class functor
		var cls = function () {
			var args = [] .slice.apply (arguments);
			return cls.__new__ (args);
		};
		
		// Copy methods and static attributes to class object
		for (var index in bases) {
			var base = bases [index];
			for (attrib in base) {
				cls [attrib] = base [attrib];
			}
		}
		
		// Add class specific attributes to class object
		cls.__name__ = name;
		cls.__bases__ = bases;
		
		// Add own methods and static attributes to class object
		for (var attrib in extra) {
			var descrip = Object.getOwnPropertyDescriptor (extra, attrib);
			Object.defineProperty (cls, attrib, descrip);
		}
				
		// Return class object
		return cls;
	};
	__all__.__class__ = __class__;

	// Create mother of all classes		
	var object = __all__.__class__ ('object', [], {
		__init__: function (self) {},
			
		// Object creator function is inherited by all classes
		__new__: function (args) {	// Args are just the constructor args		
			// Create instance, by 'inheriting' from this (the class), never more than 1 deep
			// In this way methods will be available both with a class and an object before the dot
			// The descriptor produced by __get__ will return the right method flavor
			var instance = Object.create (this, {__class__: {value: this, enumerable: true}});
			
			// Call constructor
			this.__init__.apply (null, [instance] .concat (args));
			
			// Return instance			
			return instance;
		}	
	});
	__all__.object = object;

	__nest__ (
		__all__,
		'org.transcrypt.__base__', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __Envir__ = __class__ ('__Envir__', [object], {
						get __init__ () {return __get__ (this, function (self) {
							self.transpilerName = 'transcrypt';
							self.transpilerVersion = '0.0.30';
						});}
					});
					var __envir__ = __Envir__ ();
					//<all>
					__all__.__Envir__ = __Envir__;
					__all__.__envir__ = __envir__;
					//</all>
				}
			}
		}
	);

	// Initialize non-nested module __base__ and make its names available directly and via __all__
	// It can't do that itself, because it is regular Python module
	// The compiler recognizes its name and generates it inline rather than nesting it
	__nest__ (__all__, '', __init__ (__all__.org.transcrypt.__base__));
	var __envir__ = __all__.__envir__;
	
	// Complete __envir__, that was created in __base__, for non-stub mode
	__envir__.executorName = __envir__.transpilerName;

	var __main__ = {__file__: ''}; // !!! May need some reorganisation
	
	// Console message
	var print = function () {
		console.log ([] .slice.apply (arguments) .join (' '));
	};
	__all__.print = print;
	
	// Make console.log understand apply
	console.log.apply = function () {
		print ([] .slice.apply (arguments) .slice (1));
	};

	// In function, used to mimic Python's in operator
	var __in__ = function (element, container) {
		return container.indexOf (element) > -1;
	}
	__all__.__in__ = __in__;
	
	// Len function for collections
	var len = function (collection) {
		try {
			return collection.length;
		}
		catch (exception) {
			return collection.size;
		}
	};
	__all__.len = len;
	
	// Repr function uses __repr__ method, then __str__ then toString
	var repr = function (anObject) {
		try {
			return anObject.__repr__ ();
		}
		catch (exception) {
			try {
				return anObject.__str__ ();
			}
			catch (exception) {	// It was a dict in Python, so an Object in JavaScript
				try {
					if (anObject.constructor == Object) {
						var result = '{';
						var comma = false;
						for (var attrib in anObject) {
							if (attrib.isnumeric ()) {	// ... Representation of '<number>' as a Python key deviates
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
							try {
								result += attribRepr + ': ' + anObject [attrib] .__repr__ ();
							}
							catch (exception) {
								result += attribRepr + ': ' + anObject [attrib] .toString ();
							}
						}
						result += '}';
						return result;					
					}
					else {
						return anObject.toString ();
					}
				}
				catch (exception) {
					console.log (exception);
					return '???';
				}
			}
		}
	}
	__all__.repr = repr;
	
	// Zip method for arrays
	var zip = function () {
		var args = [].slice.call (arguments);
		var shortest = args.length == 0 ? [] : args.reduce (	// Find shortest array in arguments
			function (array0, array1) {
				return array0.length < array1.length ? array0 : array1;
			}
		);
		return shortest.map (					// Map each element of shortest array
			function (current, index) {			// To the result of this function
				return args.map (				// Map each array in arguments
					function (current) {		// To the result of this function
						return current [index]; // Namely it's index't entry
					}
				);
			}
		);
	}
	__all__.zip = zip;
	
	// Range method, returning an array
	function range (start, stop, step) {
		if (typeof stop == 'undefined') {
			// one param defined
			stop = start;
			start = 0;
		}
		if (typeof step == 'undefined') {
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
	
	// Enumerate method, returning a zipped list
	function enumerate (iterable) {
		return zip (range (len (iterable)), iterable);
	}
		
	// List extensions to Array
	
	function list (iterable) {										// All such creators should be callable without new
		var instance = iterable ? [] .slice.apply (iterable) : [];	// Spread iterable, n.b. array.slice (), so array before dot
		instance.__class__ = list;
		return instance;
	}
	__all__.list = list;
	
	Array.prototype.__getslice__ = function (start, stop, step) {	// Only called if step is not null, else slice is called
		if (start < 0) {
			start = this.length + 1 - start;
		}
		
		if (stop == null) {
			stop = this.length;
		}
		else if (stop < 0) {
			stop = this.length + 1 - stop;
		}
		
		var result = [];
		for (var index = start; index < stop; index += step) {
			result.push (this [index]);
		}
		
		return result;
	}
		
	Array.prototype.__repr__ = function () {
		if (this.__class__ == set && !this.length) {
			return 'set()';
		}
		
		var result = !this.__class__ || this.__class__ == list ? '[' : this.__class__ == tuple ? '(' : '{';
		
		for (var index = 0; index < this.length; index++) {
			if (index) {
				result += ', ';
			}
			try {
				result += this [index] .__repr__ ();
			}
			catch (exception) {
				result += this [index] .toString ();
			}
		}
		
		if (this.__class__ == tuple && this.length == 1) {
			result += ',';
		}
		
		result += !this.__class__ || this.__class__ == list ? ']' : this.__class__ == tuple ? ')' : '}';;
		return result;
	};
	
	Array.prototype.__setslice__ = function (start, stop, step, source) {
		if (start < 0) {
			start = this.length + 1 - start;
		}
			
		if (stop == null) {
			stop = this.length;
		}
		else if (stop < 0) {
			stop = this.length + 1 - stop;
		}
			
		if (step == null) {	// Assign to 'ordinary' slice, replace subsequence
			Array.prototype.splice.apply (this, [start, stop - start] .concat (source)) 
		}
		else {				// Assign to extended slice, replace designated items one by one
			var sourceIndex = 0;
			for (var targetIndex = start; targetIndex < stop; targetIndex += step) {
				this [targetIndex] = source [sourceIndex++];
			}
		}
	}
		
	Array.prototype.__str__ = Array.prototype.__repr__;
	
	Array.prototype.append = function (element) {
		this.push (element);
	};

	Array.prototype.clear = function (aList) {
		aList.splice (0, aList.length);
	};
	
	Array.prototype.extend = function (aList) {
		this.push.apply (this, aList);
	};

	// Tuple extensions to Array
	
	function tuple (iterable) {
		var instance = iterable ? [] .slice.apply (iterable) : [];
		instance.__class__ = tuple;
		return instance;
	}
	__all__.tuple = tuple;
		
	// Set extensions to Array
		
	function set (iterable) {
		var instance = [];
		if (iterable) {
			for (var index = 0; index < iterable.length; index++) {
				if (instance.indexOf (iterable [index]) == -1) {
					instance.push (iterable [index]);
				}
			}
		}
		instance.__class__ = set;
		return instance;
	}
	__all__.set = set;
	
	// String extensions
		
	function str (stringable) {
		return new String (stringable);
	}
	__all__.str = str;	
	
	String.prototype.__repr__ = function () {
		return (this.indexOf ('\'') == -1 ? '\'' + this + '\'' : '"' + this + '"') .replace ('\n', '\\n');
	};
	
	String.prototype.__str__ = function () {
		return this;
	};
	
	String.prototype.capitalize = function () {
		return this.charAt (0).toUpperCase () + this.slice (1);
	};
	
	String.prototype.endswith = function (suffix) {
		return this.indexOf (suffix) == this.length - suffix.length;
	};
	
	String.prototype.find  = function (sub, start) {
		return this.indexOf (sub, start);
	};
	
	String.prototype.format = function () {
		var args = arguments;
		var autoIndex = 0;
		return this.replace (/\{(\w*)\}/g, function (match, key) { 
			if (key == '') {
				key = autoIndex++;
			}
			if (key == +key) {	// So key is numerical
				return args [key] == 'undefined' ? match : args [key];
			}
			else {				// Key is a string
				for (var index = 0; index < args.length; index++) {
					// Find first 'dict' that has that key and the right field
					if (typeof args [index] == 'object' && typeof args [index][key] != 'undefined') {
						return args [index][key];	// Return that field field
					}
				}
				return match;
			}
		});
	};
	
	String.prototype.isnumeric = function () {
		return !isNaN (parseFloat (this)) && isFinite (this);
	};
	
	String.prototype.join = function (aList) {
		return aList.join (this);
	};
	
	String.prototype.jsSplit = String.prototype.split;
	
	String.prototype.lower = function () {
		return this.toLowerCase ();
	};
	
	String.prototype.lstrip = function () {
		return this.replace (/^\s*/g, '');
	};
	
	String.prototype.rfind = function (sub, start) {
		return this.lastIndexOf (sub, start);
	};
	
	String.prototype.rsplit = function (sep, maxsplit) {
		var split = this.split (sep || /s+/);
		return maxsplit ? [ split.slice (0, -maxsplit) .join (sep) ].concat (split.slice (-maxsplit)) : split;
	};
	
	String.prototype.rstrip = function () {
		return this.replace (/\s*$/g, '');
	};
	
	String.prototype.split = function (sep, maxsplit) {
		if (!sep) {
			sep = ' ';
		}
		return this.jsSplit (sep || /s+/, maxsplit);
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
	
	__all__.str = str
	__nest__ (
		__all__,
		'classes', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var A = __class__ ('A', [object], {
							get __init__ () {return __get__ (this, function (self, x) {
								self.x = x;
							});},
							get show () {return __get__ (this, function (self, label) {
								autoTester.check ('A.show', label, self.x);
							});}
						});
						var B = __class__ ('B', [object], {
							get __init__ () {return __get__ (this, function (self, y) {
								autoTester.check ('In B constructor');
								self.y = y;
							});},
							get show () {return __get__ (this, function (self, label) {
								autoTester.check ('B.show', label, self.y);
							});}
						});
						var C = __class__ ('C', [A, B], {
							get __init__ () {return __get__ (this, function (self, x, y) {
								autoTester.check ('In C constructor');
								A.__init__ (self, x);
								B.__init__ (self, y);
							});},
							get show () {return __get__ (this, function (self, label) {
								A.show (self, label);
								B.show (self, label);
								autoTester.check ('C.show', label, self.x, self.y);
							});}
						});
						var a = A (1001);
						a.show ('america');
						var b = B (2002);
						b.show ('russia');
						var c = C (3003, 4004);
						c.show ('netherlands');
						var show2 = c.show;
						show2 ('copy');
					};
					//<all>
					__all__.run = run;
					//</all>
				}
			}
		}
	);
	__nest__ (
		__all__,
		'control_structures', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var __iter0__ = enumerate (function () {
							var __accu0__ = [];
							var __iter1__ = range (10);
							for (var __index0__ = 0; __index0__ < __iter1__.length; __index0__++) {
								var x = __iter1__ [__index0__];
								if (x % 2) {
									__accu0__ .push (x * x);
								}
							}
							return __accu0__;
						} ());
						for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
							var __left0__ = __iter0__ [__index0__] ;
							var index = __left0__[0];
							var square = __left0__[1];
							var __iter1__ = range (1, 2, 3);
							for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
								var y = __iter1__ [__index1__] ;
								var __iter2__ = range (10, 20, 30);
								for (var __index2__ = 0; __index2__ < __iter2__.length; __index2__++) {
									var z = __iter2__ [__index2__] ;
									autoTester.check (square + y, z);
								}
							}
						}
						var vehicles = ['bike', 'train', 'boat', 'car', 'plane', 'bus'];
						var __iter0__ = tuple ([false, true]);
						for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
							var doBreak = __iter0__ [__index0__] ;
							var __iter1__ = tuple ([false, true]);
							for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
								var doContinue = __iter1__ [__index1__] ;
								var __iter2__ = range (10);
								var __break0__ = false;
								for (var __index2__ = 0; __index2__ < __iter2__.length; __index2__++) {
									var index = __iter2__ [__index2__] ;
									var __iter3__ = range (0, 100, 10);
									var __break1__ = false;
									for (var __index3__ = 0; __index3__ < __iter3__.length; __index3__++) {
										var index2 = __iter3__ [__index3__] ;
										if (doBreak && index2 == 50) {
											autoTester.check ('break2');
											__break1__ = true;
											break;
										}
										if (doContinue && index2 == 50) {
											autoTester.check ('continue2');
											continue;
										}
									}
									if (!__break1__) {
										autoTester.check ('noBreak2');
									}
									if (doBreak && index == 5) {
										autoTester.check ('break');
										__break0__ = true;
										break;
									}
									if (doContinue && index == 5) {
										autoTester.check ('continue');
										continue;
									}
								}
								if (!__break0__) {
									autoTester.check ('noBreak');
								}
								var index = 0;
								var __break0__ = false;
								while (index < len (vehicles) && vehicles [index]  != 'bus') {
									autoTester.check (index, vehicles [index] );
									if (doBreak && vehicles [index]  == 'car') {
										autoTester.check ('breakWhile');
										__break0__ = true;
										break;
									}
									if (doContinue && vehicles [index]  == 'car') {
										autoTester.check ('continueWhile');
										index++;
										continue;
									}
									index++;
								}
								if (!__break0__) {
									autoTester.check ('noBreakWhile');
								}
							}
							var __iter1__ = vehicles;
							for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
								var vehicle = __iter1__ [__index1__] ;
								if (vehicle == 'bike') {
									autoTester.check ('netherlands');
								}
								else {
									if (vehicle == 'car') {
										autoTester.check ('america');
									}
									else {
										if (vehicle == 'boat') {
											autoTester.check ('oceania');
										}
										else {
											autoTester.check ('anywhere');
										}
									}
								}
							}
						}
					};
					//<all>
					__all__.run = run;
					//</all>
				}
			}
		}
	);
	__nest__ (
		__all__,
		'data_structures', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var aList = [1, 2, 3, 'sun', 'moon', 'stars'];
						autoTester.check (aList);
						autoTester.check (aList.__getslice__ (2, 4, 1));
						autoTester.check (aList.slice (0));
						autoTester.check (aList.slice (2));
						autoTester.check (len (aList));
						aList.append ('milkyway');
						autoTester.check (aList);
						aList.extend (['m1', 'm31']);
						autoTester.check (aList);
						var anotherList = list (tuple (['a', 'b', 'c']));
						autoTester.check (anotherList);
						var aDict = {1: 'plant', 'animal': 2};
						autoTester.check (aDict);
						autoTester.check (aDict [1] , aDict ['animal'] );
						var aTuple = tuple ([1, 2, 3, 4, 5]);
						autoTester.check (aTuple);
						autoTester.check (len (aTuple));
						var anotherTuple = tuple ([1]);
						autoTester.check (anotherTuple);
						var aSet = new set ([1, 2, 2, 3]);
						autoTester.check (aSet);
						autoTester.check (len (aSet));
						var anotherSet = set (tuple ([4, 5, 5, 6]));
						autoTester.check (anotherSet);
						var emptySet = set ();
						autoTester.check (emptySet);
						autoTester.check (len (emptySet));
					};
					//<all>
					__all__.run = run;
					//</all>
				}
			}
		}
	);
	__nest__ (
		__all__,
		'indices_and_slices', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var all = range (32);
						autoTester.check (all);
						autoTester.check (all.slice (8, 24));
						autoTester.check (all.__getslice__ (8, 24, 2));
						var aList = [3, 4, 7, 8];
						autoTester.check (aList);
						aList.__setslice__ (4, 4, null, [9, 10]);
						autoTester.check (aList);
						aList.__setslice__ (2, 2, null, [5, 6]);
						autoTester.check (aList);
						aList.__setslice__ (0, 0, null, [1, 2]);
						autoTester.check (aList);
						aList.__setslice__ (0, null, 2, function () {
							var __accu0__ = [];
							var __iter0__ = range (10);
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var x = __iter0__ [__index0__];
								if (x % 2) {
									__accu0__ .push (x + 0.001);
								}
							}
							return __accu0__;
						} ());
						autoTester.check (aList);
					};
					//<all>
					__all__.run = run;
					//</all>
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
					var chain = function () {
						var args = [] .slice.apply (arguments);
						var result = [];
						for (var index = 0; index < args.length; index++) {
							result = result.concat (args [index]);
						}
						return result;
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
		'list_comprehensions', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var squares = function () {
							var __accu0__ = [];
							var __iter0__ = range (10);
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var i = __iter0__ [__index0__];
								if (i % 2) {
									__accu0__ .push (i * i);
								}
							}
							return __accu0__;
						} ();
						autoTester.check (squares);
						var tuples = function () {
							var __accu0__ = [];
							var __iter0__ = tuple ([100, 200, 300, 400, 500, 600, 700]);
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var x = __iter0__ [__index0__];
								var __iter1__ = tuple ([10, 20, 30, 40, 50, 60, 70]);
								for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
									var y = __iter1__ [__index1__];
									if ((20 < y && y < 60)) {
										var __iter2__ = tuple ([1, 2, 3, 4, 5, 6, 7]);
										for (var __index2__ = 0; __index2__ < __iter2__.length; __index2__++) {
											var z = __iter2__ [__index2__];
											if (((200 < x && x < 600)) && ((2 < z && z < 6))) {
												__accu0__ .push (tuple ([x, y, z]));
											}
										}
									}
								}
							}
							return __accu0__;
						} ();
						autoTester.check (tuples);
						var nested = function () {
							var __accu0__ = [];
							var __iter0__ = function () {
								var __accu1__ = [];
								var __iter1__ = range (3);
								for (var __index0__ = 0; __index0__ < __iter1__.length; __index0__++) {
									var x = __iter1__ [__index0__];
									__accu1__ .push (x * x);
								}
								return __accu1__;
							} ();
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var x = __iter0__ [__index0__];
								__accu0__ .push (2 * x);
							}
							return __accu0__;
						} ();
						autoTester.check (nested);
						var a = 100;
						var x = 5;
						var scopeTest = function () {
							var __accu0__ = [];
							var __iter0__ = range (5);
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var x = __iter0__ [__index0__];
								__accu0__ .push (x + a);
							}
							return __accu0__;
						} ();
						autoTester.check (x);
						autoTester.check (scopeTest);
					};
					//<all>
					__all__.run = run;
					//</all>
				}
			}
		}
	);
	__nest__ (
		__all__,
		'modules', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var modules = {};
					__nest__ (modules, 'mod1.mod11.mod111', __init__ (__world__.modules.mod1.mod11.mod111));
					__nest__ (modules, 'mod3', __init__ (__world__.modules.mod3));
					__nest__ (modules, 'mod1.mod11.mod112', __init__ (__world__.modules.mod1.mod11.mod112));
					__nest__ (modules, 'mod1', __init__ (__world__.modules.mod1));
					__nest__ (modules, 'mod1.mod11', __init__ (__world__.modules.mod1.mod11));
					__nest__ (modules, 'mod2', __init__ (__world__.modules.mod2));
					__nest__ (modules, 'mod2.mod21', __init__ (__world__.modules.mod2.mod21));
					__nest__ (modules, 'mod2.mod22', __init__ (__world__.modules.mod2.mod22));
					var aliasMod111 =  __init__ (__world__.modules.mod1.mod11.mod111);
					var aMod1 =  __init__ (__world__.modules.mod1);
					var mod111 = __init__ (__world__.modules.mod1.mod11.mod111);
					var mod112 = __init__ (__world__.modules.mod1.mod11.mod112);
					var aMod21 = __init__ (__world__.modules.mod2.mod21);
					var aMod22 = __init__ (__world__.modules.mod2.mod22);
					var mod3GetTwoHundred = __init__ (__world__.modules.mod3).mod3GetTwoHundred;
					var mod3Hundred = __init__ (__world__.modules.mod3).mod3Hundred;
					var x = __init__ (__world__.modules.mod3).x;
					var A = __init__ (__world__.modules.mod1.mod11.mod111).A;
					var a = modules.mod1.mod11.mod111.A (12345);
					var pi = modules.mod1.pi;
					var f = modules.mod2.f;
					var run = function (autoTester) {
						autoTester.check ('modules');
						autoTester.check (a.f ());
						autoTester.check (modules.mod1.mod11.mod112.f ());
						autoTester.check (modules.mod1.mod11.e);
						autoTester.check (pi);
						autoTester.check (f (102030));
						autoTester.check (modules.mod2.mod21.f ());
						var B = modules.mod2.mod22.B;
						var b = B ();
						autoTester.check (b.x);
						autoTester.check (modules.mod3.x);
						var a2 = aliasMod111.A (6789101112);
						autoTester.check (a2.f ());
						autoTester.check (aMod1.pi);
						var a3 = mod111.A (100.001);
						autoTester.check (a3.f ());
						autoTester.check (mod112.f ());
						autoTester.check (aMod21.f ());
						autoTester.check (aMod22.B ().x);
						autoTester.check (mod3Hundred);
						autoTester.check (mod3GetTwoHundred ());
						autoTester.check (A (123.321).f ());
					};
					//<all>
					__all__.a = a;
					__all__.f = f;
					__all__.pi = pi;
					__all__.run = run;
					//</all>
				}
			}
		}
	);
	__nest__ (
		__all__,
		'modules.mod1', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var pi = 3.1415693588;
					//<all>
					__all__.pi = pi;
					//</all>
				}
			}
		}
	);
	__nest__ (
		__all__,
		'modules.mod1.mod11', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var e = 2.74;
					//<all>
					__all__.e = e;
					//</all>
				}
			}
		}
	);
	__nest__ (
		__all__,
		'modules.mod1.mod11.mod111', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var A = __class__ ('A', [object], {
						get __init__ () {return __get__ (this, function (self, x) {
							self.x = x;
						});},
						get f () {return __get__ (this, function (self) {
							return self.x;
						});}
					});
					//<all>
					__all__.A = A;
					//</all>
				}
			}
		}
	);
	__nest__ (
		__all__,
		'modules.mod1.mod11.mod112', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var f = function () {
						return "Paris, c'est la vie\n";
					};
					//<all>
					__all__.f = f;
					//</all>
				}
			}
		}
	);
	__nest__ (
		__all__,
		'modules.mod2', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var f = function (p) {
						return 2 * p;
					};
					//<all>
					__all__.f = f;
					//</all>
				}
			}
		}
	);
	__nest__ (
		__all__,
		'modules.mod2.mod21', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var f = function () {
						return 'London is the town for me\n';
					};
					//<all>
					__all__.f = f;
					//</all>
				}
			}
		}
	);
	__nest__ (
		__all__,
		'modules.mod2.mod22', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var B = __class__ ('B', [object], {
						get __init__ () {return __get__ (this, function (self) {
							self.x = 'Geef mij maar Amsterdam\n';
						});}
					});
					//<all>
					__all__.B = B;
					//</all>
				}
			}
		}
	);
	__nest__ (
		__all__,
		'modules.mod3', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var x = 'Toen wij uit Rotterdam vertrokken, vertrokken wij uit Rotterdam\n';
					var mod3Hundred = 100;
					var mod3GetTwoHundred = function () {
						return 200;
					};
					//<all>
					__all__.mod3GetTwoHundred = mod3GetTwoHundred;
					__all__.mod3Hundred = mod3Hundred;
					__all__.x = x;
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
					__nest__ (itertools, '', __init__ (__world__.itertools));
					var okColor = 'green';
					var errorColor = 'red';
					var highlightColor = 'yellow';
					var testletNameColor = 'blue';
					var AutoTester = __class__ ('AutoTester', [object], {
						get __init__ () {return __get__ (this, function (self) {
							self.referenceBuffer = [];
							self.testBuffer = [];
							self.messageDivId = 'message';
							self.referenceDivId = 'python';
							self.testDivId = 'transcrypt';
						});},
						get check () {return __get__ (this, function (self) {
							var args = [] .slice.apply (arguments) .slice (1);
							var item = ' '.join (function () {
								var __accu0__ = [];
								var __iter0__ = args;
								for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
									var arg = __iter0__ [__index0__];
									__accu0__ .push (repr (arg));
								}
								return __accu0__;
							} ());
							if (__envir__.executorName == __envir__.transpilerName) {
								self.testBuffer.append (item);
							}
							else {
								self.referenceBuffer.append (item);
							}
						});},
						get dump () {return __get__ (this, function (self, filePrename) {
							aFile = open ('{}.html'.format (filePrename), 'w');
							aFile.write ('<script src="javascript/{}.js"></script>\n\n'.format (filePrename));
							aFile.write ('<b>Status:</b>\n');
							aFile.write ('<div id="{}"></div><br><br>\n\n'.format (self.messageDivId));
							aFile.write ('<b>Reference output:</b>\n');
							aFile.write ('<div id="{}">{}</div><br><br>\n\n'.format (self.referenceDivId, ' | '.join (self.referenceBuffer)));
							aFile.write ('<b>Test output:</b>\n');
							aFile.write ('<div id="{}"></div>\n\n'.format (self.testDivId));
							aFile.write ('<script>{} ();</script>\n'.format (filePrename));
							aFile.close ();
						});},
						get compare () {return __get__ (this, function (self) {
							self.referenceBuffer = document.getElementById (self.referenceDivId).innerHTML.split (' | ');
							var __iter0__ = enumerate (zip (self.testBuffer, self.referenceBuffer));
							var __break0__ = false;
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var __left0__ = __iter0__ [__index0__] ;
								var index = __left0__[0];
								var testItem = __left0__[1][0];
								var referenceItem = __left0__[1][1];
								if (testItem != referenceItem) {
									document.getElementById (self.messageDivId).innerHTML = '<div style="color: {}"><b>Test failed</b></div>'.format (errorColor);
									var test = zip (tuple ([self.referenceBuffer, self.referenceDivId]), tuple ([self.testBuffer, self.testDivId]));
									var __iter1__ = tuple ([tuple ([self.referenceBuffer, self.referenceDivId, okColor]), tuple ([self.testBuffer, self.testDivId, errorColor])]);
									for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
										var __left0__ = __iter1__ [__index1__] ;
										var buffer = __left0__[0];
										var divId = __left0__[1];
										var accentColor = __left0__[2];
										var buffer = itertools.chain (buffer.slice (0, index), ['!!! <div style="display: inline; color: {}; background-color: {}"><b><i>{}</i></b></div>'.format (accentColor, highlightColor, buffer [index] )], buffer.slice (index + 1));
										document.getElementById (divId).innerHTML = ' | '.join (buffer);
									}
									__break0__ = true;
									break;
								}
							}
							if (!__break0__) {
								document.getElementById (self.messageDivId).innerHTML = '<div style="color: {}">Test succeeded</div>'.format (okColor);
								document.getElementById (self.testDivId).innerHTML = ' | '.join (self.testBuffer);
							}
						});},
						get run () {return __get__ (this, function (self, testlet, testletName) {
							self.check ('<div style="display: inline; color: {}"> --- Testlet: {} --- </div><br>'.format (testletNameColor, testletName));
							testlet.run (self);
							self.check ('<br><br>');
						});},
						get done () {return __get__ (this, function (self) {
							if (__envir__.executorName == __envir__.transpilerName) {
								self.compare ();
							}
							else {
								self.dump (__main__.__file__.slice (0, -3).replace ('\\', '/').rsplit ('/', 1) [-1] );
							}
						});}
					});
					//<all>
					__all__.AutoTester = AutoTester;
					__all__.errorColor = errorColor;
					__all__.highlightColor = highlightColor;
					__all__.okColor = okColor;
					__all__.testletNameColor = testletNameColor;
					//</all>
				}
			}
		}
	);
	__nest__ (
		__all__,
		'simple_and_augmented_assignment', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var A = __class__ ('A', [object], {
						get __init__ () {return __get__ (this, function (self) {
							self.i = 0;
						});},
						get f () {return __get__ (this, function (self) {
							return self.i;
						});}
					});
					var a = A ();
					var run = function (autoTester) {
						var x = 3;
						var y = 5;
						var z = x + y;
						autoTester.check (z);
						var l = [1, 2, 3];
						l [1]  = l [2] ;
						autoTester.check (l);
						x++;
						autoTester.check (x);
						x++;
						autoTester.check (x);
						x++;
						autoTester.check (x);
						y--;
						autoTester.check (y);
						y--;
						autoTester.check (y);
						y--;
						autoTester.check (y);
						x += -3;
						autoTester.check (x);
						x += 6;
						autoTester.check (x);
						y -= 3;
						autoTester.check (y);
						l [1]  += l [1] ;
						autoTester.check (l);
						x += y;
						y += x;
						autoTester.check (x, y);
						var f = a.f;
						a.i++;
						autoTester.check (f ());
						a.i += 10;
						autoTester.check (f ());
						a.i += a.i;
						autoTester.check (f ());
					};
					//<all>
					__all__.A = A;
					__all__.a = a;
					__all__.run = run;
					//</all>
				}
			}
		}
	);
	__nest__ (
		__all__,
		'tuple_assignment', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var __left0__ = tuple ([tuple ([1, 2]), 'santa-claus', new set ([3, 4]), 5]);
						var a = __left0__[0][0];
						var b = __left0__[0][1];
						var santa = __left0__[1];
						var c = __left0__[2][0];
						var d = __left0__[2][1];
						var e = __left0__[3];
						autoTester.check (a, b, c, d, e, santa);
						var __iter0__ = enumerate (tuple ([0.5, 1.5, 2.5, 3.5]));
						for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
							var __left0__ = __iter0__ [__index0__] ;
							var i = __left0__[0];
							var x = __left0__[1];
							autoTester.check (i, x);
						}
						var __left0__ = tuple ([3.14, 2.74]);
						var e = __left0__[0];
						var pi = __left0__[1];
						var __left0__ = tuple ([pi, e]);
						var e = __left0__[0];
						var pi = __left0__[1];
						autoTester.check (e, pi);
					};
					//<all>
					__all__.run = run;
					//</all>
				}
			}
		}
	);
	(function () {
		var classes = {};
		var control_structures = {};
		var data_structures = {};
		var indices_and_slices = {};
		var list_comprehensions = {};
		var modules = {};
		var org = {};
		var simple_and_augmented_assignment = {};
		var tuple_assignment = {};
		__nest__ (org, 'transcrypt.autotester', __init__ (__world__.org.transcrypt.autotester));
		__nest__ (classes, '', __init__ (__world__.classes));
		__nest__ (control_structures, '', __init__ (__world__.control_structures));
		__nest__ (data_structures, '', __init__ (__world__.data_structures));
		__nest__ (indices_and_slices, '', __init__ (__world__.indices_and_slices));
		__nest__ (list_comprehensions, '', __init__ (__world__.list_comprehensions));
		__nest__ (modules, '', __init__ (__world__.modules));
		__nest__ (simple_and_augmented_assignment, '', __init__ (__world__.simple_and_augmented_assignment));
		__nest__ (tuple_assignment, '', __init__ (__world__.tuple_assignment));
		var autoTester = org.transcrypt.autotester.AutoTester ();
		autoTester.run (classes, 'classes');
		autoTester.run (control_structures, 'control_structures');
		autoTester.run (data_structures, 'data_structures');
		autoTester.run (indices_and_slices, 'indices_and_slices');
		autoTester.run (list_comprehensions, 'list_comprehensions');
		autoTester.run (modules, 'modules');
		autoTester.run (simple_and_augmented_assignment, 'simple_and_augmented_assignment');
		autoTester.run (tuple_assignment, 'tuple_assignemt');
		autoTester.done ();
		//<all>
		__all__.autoTester = autoTester;
		//</all>
	}) ();
	return __all__;
}
window ['autotest'] = autotest;
