"use strict";
// Transcrypt'ed from Python, 2016-05-24 16:33:25
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
			if (self.hasOwnProperty ('__class__') || typeof self == 'string' || self instanceof String) {			// Object before the dot
				if (quotedFuncName) {									// Memoize call since fcall is on, by installing bound function in instance
					Object.defineProperty (self, quotedFuncName, {		// Will override the non-own property, next time it will be called directly
						value: function () {							// So next time just call curry function that calls function
							var args = [] .slice.apply (arguments);
							return func.apply (null, [self] .concat (args));
						},				
						writable: true,
						enumerable: true,
						configurable: true
					});
				}
				return function () {									// Return bound function, code dupplication for efficiency if no memoizing
					var args = [] .slice.apply (arguments);				// So multilayer search prototype, apply __get__, call curry func that calls func
					return func.apply (null, [self] .concat (args));
				};
			}
			else {														// Class before the dot
				return func;											// Return static method
			}
		}
		else {															// Nothing before the dot
			return func;												// Return free function
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
		
		// Copy methods, properties and static attributes from base classes to new class object
		for (var index = bases.length - 1; index >= 0; index--) {	// Reversed order, since class vars of first base should win
			var base = bases [index];
			for (var attrib in base) {
				var descrip = Object.getOwnPropertyDescriptor (base, attrib);
				Object.defineProperty (cls, attrib, descrip);
			}
		}
		
		// Add class specific attributes to class object
		cls.__name__ = name;
		cls.__bases__ = bases;
		
		// Add own methods, properties and static attributes to class object
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
			
		__name__: 'object',
		__bases__: [],
			
		// Object creator function is inherited by all classes (??? Make global?)
		__new__: function (args) {	// Args are just the constructor args		
			// In JavaScript the Python class is the prototype of the Python object
			// In this way methods and static attributes will be available both with a class and an object before the dot
			// The descriptor produced by __get__ will return the right method flavor
			var instance = Object.create (this, {__class__: {value: this, enumerable: true}});
			
			// Call constructor
			this.__init__.apply (null, [instance] .concat (args));
			
			// Return instance			
			return instance;
		}	
	});
	__all__.object = object;
	
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
							self.transpiler_name = 'transcrypt';
							self.transpiler_version = '3.5.156';
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
							var args = tuple ([].slice.apply (arguments).slice (1));
							self.args = args;
						});},
						get __repr__ () {return __get__ (this, function (self) {
							if (len (self.args)) {
								return '{}{}'.format (self.__class__.__name__, repr (tuple (self.args)));
							}
							else {
								return '???';
							}
						});},
						get __str__ () {return __get__ (this, function (self) {
							if (len (self.args) > 1) {
								return str (tuple (self.args));
							}
							else {
								if (len (self.args)) {
									return str (self.args [0]);
								}
								else {
									return '???';
								}
							}
						});}
					});
					var ValueError = __class__ ('ValueError', [Exception], {
					});
					var __sort__ = function (iterable, key, reverse) {
						if (typeof key == 'undefined' || (key != null && key .__class__ == __kwargdict__)) {;
							var key = null;
						};
						if (typeof reverse == 'undefined' || (reverse != null && reverse .__class__ == __kwargdict__)) {;
							var reverse = false;
						};
						if (arguments.length) {
							var __ilastarg0__ = arguments.length - 1;
							if (arguments [__ilastarg0__] && arguments [__ilastarg0__].__class__ == __kwargdict__) {
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
						if (key) {
							iterable.sort ((function __lambda__ (a, b) {
								if (arguments.length) {
									var __ilastarg0__ = arguments.length - 1;
									if (arguments [__ilastarg0__] && arguments [__ilastarg0__].__class__ == __kwargdict__) {
										var __allkwargs0__ = arguments [__ilastarg0__--];
										for (var __attrib0__ in __allkwargs0__) {
											switch (__attrib0__) {
												case 'a': var a = __allkwargs0__ [__attrib0__]; break;
												case 'b': var b = __allkwargs0__ [__attrib0__]; break;
											}
										}
									}
								}
								return key (a) > key (b);}));
						}
						else {
							iterable.sort ();
						}
						if (reverse) {
							iterable.reverse ();
						}
					};
					var sorted = function (iterable, key, reverse) {
						if (typeof key == 'undefined' || (key != null && key .__class__ == __kwargdict__)) {;
							var key = null;
						};
						if (typeof reverse == 'undefined' || (reverse != null && reverse .__class__ == __kwargdict__)) {;
							var reverse = false;
						};
						if (arguments.length) {
							var __ilastarg0__ = arguments.length - 1;
							if (arguments [__ilastarg0__] && arguments [__ilastarg0__].__class__ == __kwargdict__) {
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
						if (type (iterable) == dict) {
							var result = copy (iterable.py_keys ());
						}
						else {
							var result = copy (iterable);
						}
						__sort__ (result, key, reverse);
						return result;
					};
					__pragma__ ('<all>')
						__all__.Exception = Exception;
						__all__.ValueError = ValueError;
						__all__.__sort__ = __sort__;
						__all__.sorted = sorted;
					__pragma__ ('</all>')
				}
			}
		}
	);

	// Initialize non-nested modules __base__ and __standard__ and make its names available directly and via __all__
	// It can't do that itself, because it is a regular Python module
	// The compiler recognizes its their namesand generates them inline rather than nesting them
	// In this way it isn't needed to import them everywhere
	 	
	__nest__ (__all__, '', __init__ (__all__.org.transcrypt.__base__));
	var __envir__ = __all__.__envir__;

	__nest__ (__all__, '', __init__ (__all__.org.transcrypt.__standard__));
	var Exception = __all__.Exception;
	var __sort__ = __all__.__sort__;
	var sorted = __all__.sorted;

	// Complete __envir__, that was created in __base__, for non-stub mode
	__envir__.executor_name = __envir__.transpiler_name;
	
	// Make make __main__ available in browser
	var __main__ = {__file__: ''};
	__all__.main = __main__;
	
	// Define current exception, there's at most one exception in the air at any time
	var __except__ = null;
	__all__.__except__ = __except__;
		
	// Define recognizable dictionary for **kwargs parameter
	var __kwargdict__ = function (anObject) {
		anObject.__class__ = __kwargdict__;	// This class needs no __name__
		anObject.constructor = Object;
		return anObject;
	}
	__all__.___kwargdict__ = __kwargdict__;
	
	// Property installer function, no member since that would bloat classes
	var property = function (getter, setter) {	// Returns a property descriptor rather than a property
		if (!setter) {	// ??? Make setter optional instead of dummy?
			setter = function () {};
		}
		return {get: function () {return getter (this)}, set: function (value) {setter (this, value)}, enumerable: true};
	}
	__all__.property = property;
	
	var __merge__ = function (object0, object1) {
		var result = {};
		for (var attrib in object0) {
			result [attrib] = object0 [attrib];
		}
		for (var attrib in object1) {
			result [attrib] = object1 [attrib];
		}
		return result;
	}
	__all__.__merge__ = __merge__;
	
	// Console message
	var print = function () {
		var args = [] .slice.apply (arguments)
		var result = ''
		for (var i = 0; i < args.length; i++) {
			result += str (args [i]) + ' ';
		}
		console.log (result);
	};
	__all__.print = print;
	
	// Make console.log understand apply
	console.log.apply = function () {
		print ([] .slice.apply (arguments) .slice (1));
	};

	// In function, used to mimic Python's in operator
	var __in__ = function (element, container) {
		if (type (container) == dict) {
			return container.py_keys () .indexOf (element) > -1;
		}
		else {
			return container.indexOf (element) > -1;
		}
	}
	__all__.__in__ = __in__;
	
	// Find out if an attribute is special
	var __specialattrib__ = function (attrib) {
		return (attrib.startswith ('__') && attrib.endswith ('__')) || attrib == 'constructor' || attrib.startswith ('py_');
	}
	__all__.__specialattrib__ = __specialattrib__;
		
	// Len function for any object
	var len = function (anObject) {
		try {
			return anObject.length;
		}
		catch (exception) {
			var result = 0;
			for (attrib in anObject) {
				if (!__specialattrib__ (attrib)) {
					result++;
				}
			}
			return result;
		}
	};
	__all__.len = len;
	
	var bool = {__name__: 'bool'}
	__all__.bool = bool;
	
	var float = function (any) {
		if (isNaN (any)) {
			throw ('ValueError');	// !!! Turn into real value error
		}
		else {
			return +any;
		}
	}
	float.__name__ = 'float'
	__all__.float = float;
	
	var int = function (any) {
		return float (any) | 0
	}
	int.__name__ = 'int';
	__all__.int = int;
	
	var type = function (anObject) {
		try {
			return anObject.__class__;
		}
		catch (exception) {
			var aType = typeof anObject;
			if (aType == 'boolean') {
				return bool;
			}
			else if (aType == 'number') {
				if (anObject % 1 == 0) {
					return int;
				}
				else {
					return float;
				}				
			}
			else {
				return aType;
			}
		}
	}
	__all__.type = type;
	
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
		return isA (anObject.__class__)
	};
	__all__.isinstance = isinstance;
	
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
							if (!__specialattrib__ (attrib)) {
								if (attrib.isnumeric ()) {
									var attribRepr = attrib;				// If key can be interpreted as numerical, we make it numerical 
								}											// So we accept that '1' is misrepresented as 1
								else {
									var attribRepr = '\'' + attrib + '\'';	// Alpha key in dict
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
					return '???';
				}
			}
		}
	}
	__all__.repr = repr;
	
	// Char from Unicode or ASCII
	
	var chr = function (charCode) {
		return String.fromCharCode (charCode);
	}
	__all__.chr = chr;

	// Unicode or ASCII from char
	
	var ord = function (aChar) {
		return aChar.charCodeAt (0);
	}
	__all__.org = ord;
	
	// Reversed function for arrays
	var reversed = function (iterable) {
		iterable = iterable.slice ();
		iterable.reverse ();
		return iterable;
	}
	
	// Zip method for arrays
	var zip = function () {
		var args = [] .slice.call (arguments);
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
	__all__.range = range;
	
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
			var result = {}
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
			var result = {}
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
	
	function list (iterable) {										// All such creators should be callable without new
		var instance = iterable ? [] .slice.apply (iterable) : [];	// Spread iterable, n.b. array.slice (), so array before dot
		// Sort is the normal JavaScript sort, Python sort is a non-member function
		return instance;
	}
	__all__.list = list;
	Array.prototype.__class__ = list;	// All arrays are lists (not only if constructed by the list ctor), unless constructed otherwise
	list.__name__ = 'list';
	
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
		
		var result = list ([]);
		for (var index = start; index < stop; index += step) {
			result.push (this [index]);
		}
		
		return result;
	}
		
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
			throw ('KeyError');
		}
		this.splice (index, 1);
	};

	Array.prototype.index = function (element) {
		return this.indexOf (element)
	};
	
	Array.prototype.py_pop = function (index) {
		if (index == undefined) {
			return this.pop ()	// Remove last element
		}
		else {
			return this.splice (index, 1) [0];
		}
	};	
	
	Array.prototype.py_sort = function () {
		__sort__.apply  (null, [this].concat ([] .slice.apply (arguments)));	// Can't work directly with arguments
		// Python params: (iterable, key = None, reverse = False)
		// py_sort is called with the Transcrypt kwargs mechanism, and just passes the params on to __sort__
		// __sort__ is def'ed with the Transcrypt kwargs mechanism
	};
	
	// Tuple extensions to Array
	
	function tuple (iterable) {
		var instance = iterable ? [] .slice.apply (iterable) : [];
		instance.__class__ = tuple;	// Not all arrays are tuples
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
		instance.__class__ = set;	// Not all arrays are sets
		return instance;
	}
	__all__.set = set;
	set.__name__ = 'set';
	
	Array.prototype.__bindexOf__ = function (element) {	// Used to turn O (n^2) into O (n log n)
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
	}
	
	Array.prototype.add = function (element) {		
		if (this.indexOf (element) == -1) {	// Avoid duplicates in set
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
		return set (other.slice ()) .issuperset (this);	// Sort copy of 'other', not 'other' itself, since it may be an ordered sequence
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
	
	Array.prototype.update = function () {	// O (n)
		var updated = [] .concat.apply (this.slice (), arguments) .sort ();		
		this.clear ();
		for (var i = 0; i < updated.length; i++) {
			if (updated [i] != updated [i - 1]) {
				this.push (updated [i]);
			}
		}
	};
	
	// Dict extensions to object
	
	function __keys__ () {
		var keys = []
		for (var attrib in this) {
			if (!__specialattrib__ (attrib)) {
				keys.push (attrib);
			}     
		}
		return keys;
	}
	__all__.__keys__ = __keys__;
		
	function __items__ () {
		var items = []
		for (var attrib in this) {
			if (!__specialattrib__ (attrib)) {
				items.push ([attrib, this [attrib]]);
			}     
		}
		return items;
	}
	__all__.__items__ = __items__;
		
	function __del__ (key) {
		delete this [key];
	}
	
	__all__.__del__ = __del__;
		
	function dict (objectOrPairs) {
		if (!objectOrPairs || objectOrPairs instanceof Array) {	// It's undefined or an array of pairs
			var instance = {};
			if (objectOrPairs) {
				for (var index = 0; index < objectOrPairs.length; index++) {
					var pair = objectOrPairs [index];
					instance [pair [0]] = pair [1];
				}
			}
		}
		else {													// It's a JavaScript object literal
			var instance = objectOrPairs;
		}
			
		// Trancrypt interprets e.g. {aKey: 'aValue'} as a Python dict literal rather than a JavaScript object literal
		// So dict literals rather than bare Object literals will be passed to JavaScript libraries
		// Some JavaScript libraries call all enumerable callable properties of an object that's passed to them
		// So the properties of a dict should be non-enumerable
		Object.defineProperty (instance, '__class__', {value: dict, enumerable: false, writable: true});
		Object.defineProperty (instance, 'py_keys', {value: __keys__, enumerable: false});			
		Object.defineProperty (instance, 'py_items', {value: __items__, enumerable: false});		
		Object.defineProperty (instance, 'py_del', {value: __del__, enumerable: false});
		
		return instance;
	}
	__all__.dict = dict;
	dict.__name__ = 'dict';
	
	// String extensions
		
	function str (stringable) {
		try {
			return stringable.__str__ ();
		}
		catch (e) {
			return new String (stringable);
		}
	}
	__all__.str = str;	
	
	String.prototype.__class__ = str;	// All strings are str
	str.__name__ = 'str';
	
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
		return suffix == '' || this.slice (-suffix.length) == suffix;
	};
	
	String.prototype.find  = function (sub, start) {
		return this.indexOf (sub, start);
	};
	
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
		});},
		enumerable: true
	});
	
	String.prototype.isnumeric = function () {
		return !isNaN (parseFloat (this)) && isFinite (this);
	};
	
	String.prototype.join = function (aList) {
		return aList.join (this);
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
		var split = this.split (sep || /s+/);
		return maxsplit ? [ split.slice (0, -maxsplit) .join (sep) ].concat (split.slice (-maxsplit)) : split;
	};
	
	String.prototype.rstrip = function () {
		return this.replace (/\s*$/g, '');
	};
	
	String.prototype.py_split = function (sep, maxsplit) {
		if (!sep) {
			sep = ' ';
		}
		return this.split (sep || /s+/, maxsplit);
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
	
	// Operator overloading, only the ones that make most sense in matrix operations
	
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

	var __call__ = function (/* <callee>, <params>* */) {
		var args = [] .slice.apply (arguments)
		if (typeof args [0] == 'object' && '__call__' in args [0]) {
			return args [0] .__call__ .apply (null,  args.slice (1));
		}
		else {
			return args [0] .apply (null, args.slice (1));
		}		
	};
	__all__.__call__ = __call__;

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
								autoTester.check (self.p);
							});},
							get show () {return __get__ (this, function (self, label) {
								autoTester.check ('A.show', label, self.x);
							});},
							get show2 () {return __get__ (this, function (self, label) {
								autoTester.check ('A.show2', label, self.x);
							});}
						});
						A.p = 123;
						var B = __class__ ('B', [object], {
							get __init__ () {return __get__ (this, function (self, y) {
								autoTester.check ('In B constructor');
								self.y = y;
								autoTester.check (self.p);
							});},
							get show () {return __get__ (this, function (self, label) {
								autoTester.check ('B.show', label, self.y);
							});}
						});
						var __left0__ = tuple ([456, 789]);
						B.p = __left0__ [0];
						B.q = __left0__ [1];
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
						autoTester.check (A.p);
						autoTester.check (a.p);
						var b = B (2002);
						b.show ('russia');
						autoTester.check (B.p);
						autoTester.check (b.p);
						autoTester.check (b.q);
						autoTester.check (A.p);
						autoTester.check (a.p);
						var c = C (3003, 4004);
						c.show ('netherlands');
						autoTester.check (C.p);
						autoTester.check (c.p);
						autoTester.check (c.q);
						c.show2 ('amsterdam');
						A.show2 (c, 'rotterdam');
						var show3 = c.show;
						show3 ('copy');
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		'conditional_expressions', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var f = function (x, b) {
						return (b ? x * x : x + x);
					};
					var run = function (autoTester) {
						var bools = tuple ([false, true]);
						var __iter0__ = bools;
						for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
							var a = __iter0__ [__index0__];
							var __iter1__ = bools;
							for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
								var b = __iter1__ [__index1__];
								autoTester.check (f ((a ? 10 : 100), b));
							}
						}
						var __iter0__ = bools;
						for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
							var p = __iter0__ [__index0__];
							var __iter1__ = bools;
							for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
								var q = __iter1__ [__index1__];
								var __iter2__ = bools;
								for (var __index2__ = 0; __index2__ < __iter2__.length; __index2__++) {
									var r = __iter2__ [__index2__];
									autoTester.check ((p ? 'a' : (q ? 'b' : (r ? 'c' : 'd'))));
									var a = (r ? (q ? (p ? 'e' : 'f') : 'g') : 'h');
									var b = (p ? 'i' : (q ? 'j' : (r ? 'k' : 'l')));
									var c = ((q ? p : r) ? 'm' : 'n');
									var d = ((p < q && q <= r) ? 'o' : 'p');
									autoTester.check (a, b, c, d);
								}
							}
						}
						var odd = function () {
							var __accu0__ = [];
							for (var x = 0; x < 10; x++) {
								__accu0__.append ((x % 2 ? x : x + 1));
							}
							return __accu0__;
						} ();
						var noDuplicates = set (odd);
						autoTester.check (odd, noDuplicates);
					};
					__pragma__ ('<all>')
						__all__.f = f;
						__all__.run = run;
					__pragma__ ('</all>')
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
						for (var index = 0; index < 10; index++) {
							autoTester.check (index);
						}
						for (var index = 8; index < 16; index++) {
							autoTester.check (index);
						}
						for (var index = 8; index < 16; index += 2) {
							autoTester.check (index);
						}
						for (var index = 10; index > 0; index--) {
							autoTester.check (index);
						}
						for (var index = 16; index > 8; index -= 2) {
							autoTester.check (index);
						}
						var __iter0__ = tuple (['cat', 'dog', 'turtle', 'goldfish']);
						for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
							var animal = __iter0__ [__index0__];
							autoTester.check (animal);
						}
						var __iter0__ = enumerate (function () {
							var __accu0__ = [];
							for (var x = 0; x < 10; x++) {
								if (x % 2) {
									__accu0__.append (x * x);
								}
							}
							return __accu0__;
						} ());
						for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
							var __left0__ = __iter0__ [__index0__];
							var index = __left0__ [0];
							var square = __left0__ [1];
							var __iter1__ = tuple ([1, 2, 3]);
							for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
								var y = __iter1__ [__index1__];
								var __iter2__ = tuple ([10, 20, 30]);
								for (var __index2__ = 0; __index2__ < __iter2__.length; __index2__++) {
									var z = __iter2__ [__index2__];
									autoTester.check (square + y, z);
								}
							}
						}
						var vehicles = list (['bike', 'train', 'boat', 'car', 'plane', 'bus']);
						var __iter0__ = tuple ([false, true]);
						for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
							var doBreak = __iter0__ [__index0__];
							var __iter1__ = tuple ([false, true]);
							for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
								var doContinue = __iter1__ [__index1__];
								var __break2__ = false;
								for (var index = 0; index < 10; index++) {
									var __break3__ = false;
									for (var index2 = 0; index2 < 100; index2 += 10) {
										if (doBreak && index2 == 50) {
											autoTester.check ('break2');
											__break3__ = true;
											break;
										}
										if (doContinue && index2 == 50) {
											autoTester.check ('continue2');
											continue;
										}
									}
									if (!__break3__) {
										autoTester.check ('noBreak2');
									}
									if (doBreak && index == 5) {
										autoTester.check ('break');
										__break2__ = true;
										break;
									}
									if (doContinue && index == 5) {
										autoTester.check ('continue');
										continue;
									}
								}
								if (!__break2__) {
									autoTester.check ('noBreak');
								}
								var index = 0;
								var __break2__ = false;
								while (index < len (vehicles) && vehicles [index] != 'bus') {
									autoTester.check (index, vehicles [index]);
									if (doBreak && vehicles [index] == 'car') {
										autoTester.check ('breakWhile');
										__break2__ = true;
										break;
									}
									if (doContinue && vehicles [index] == 'car') {
										autoTester.check ('continueWhile');
										index++;
										continue;
									}
									index++;
								}
								if (!__break2__) {
									autoTester.check ('noBreakWhile');
								}
							}
							var __iter1__ = vehicles;
							for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
								var vehicle = __iter1__ [__index1__];
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
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
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
						var aList = list ([1, 2, 3, 'moon', 'stars']);
						autoTester.check (aList);
						aList.insert (3, 'sun');
						autoTester.check (aList);
						autoTester.check (aList.__getslice__ (2, 4, 1));
						autoTester.check (aList.__getslice__ (0, null, 1));
						autoTester.check (aList.__getslice__ (2, null, 1));
						autoTester.check (len (aList));
						aList.append ('milkyway');
						autoTester.check (aList);
						aList.extend (list (['m1', 'm31']));
						autoTester.check (aList);
						var anotherList = list (tuple (['a', 'b', 'c']));
						autoTester.check (anotherList);
						var aDict = dict ({1: 'plant', 'animal': 2});
						autoTester.check (aDict);
						autoTester.check (aDict [1], aDict ['animal']);
						var p = function () {
							return 3;
						};
						var q = 4;
						autoTester.check (dict ([[p (), 'three'], [q, 'four']]));
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
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		'dict_comprehensions', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var original = dict ({'Isaac': 'Newton', 'Albert': 'Einstein', 'Paul': 'Dirac'});
						autoTester.check (original);
						var inverted = function () {
							var __accu0__ = [];
							var __iter0__ = original;
							if (type (__iter0__) == dict) {
								__iter0__ = __iter0__.py_keys ();
							}
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var key = __iter0__ [__index0__];
								__accu0__.append (list ([original [key], key]));
							}
							return dict (__accu0__);
						} ();
						autoTester.check (inverted);
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		'dictionaries', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var tel = dict ({'guido': 4127, 'jack': 4098});
						tel ['sape'] = 4139;
						autoTester.check (tel);
						autoTester.check (tel ['jack']);
						delete tel ['sape'];
						tel ['irv'] = 4127;
						autoTester.check (tel);
						autoTester.check (sorted (list (tel.py_keys ())), false);
						autoTester.check (sorted (tel.py_keys ()));
						autoTester.check (__in__ ('guido', tel));
						autoTester.check (!__in__ ('jack', tel));
						autoTester.check (dict (list ([tuple (['guido', 4127]), tuple (['jack', 4098]), tuple (['sape', 4139])])));
						var knights = dict ({'robin': 'the brave', 'gallahad': 'the pure'});
						var __iter0__ = sorted (knights.py_items ());
						if (type (__iter0__) == dict) {
							__iter0__ = __iter0__.py_keys ();
						}
						for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
							var __left0__ = __iter0__ [__index0__];
							var k = __left0__ [0];
							var v = __left0__ [1];
							autoTester.check (k, v);
						}
						if (__in__ ('gallahad', knights)) {
							autoTester.check ('gallahad is a knight');
						}
						var __iter0__ = sorted (knights);
						if (type (__iter0__) == dict) {
							__iter0__ = __iter0__.py_keys ();
						}
						for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
							var k = __iter0__ [__index0__];
							autoTester.check (k);
						}
						var knight = dict ({'rudolph': 'the righteous'});
						var __iter0__ = knight;
						if (type (__iter0__) == dict) {
							__iter0__ = __iter0__.py_keys ();
						}
						for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
							var k = __iter0__ [__index0__];
							autoTester.check (k);
						}
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		'div_fixes', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						autoTester.check (65 / (5 * 2));
						var py_switch = false;
						autoTester.check (py_switch);
						autoTester.check (Math.floor (15 / 7));
						autoTester.check (list (['zero', 'one', 'two', 'three', 'four']).index ('three'));
						var results = list ([]);
						for (var i = 0; i < 10; i++) {
							results.append ((function __lambda__ (j) {
								return (function __lambda__ () {
									return j;});}) (i));
						}
						autoTester.check (function () {
							var __accu0__ = [];
							var __iter0__ = results;
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var result = __iter0__ [__index0__];
								__accu0__.append (result ());
							}
							return __accu0__;
						} ());
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		'exceptions', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var Ex1 = __class__ ('Ex1', [Exception], {
					});
					var Ex2 = __class__ ('Ex2', [Ex1], {
					});
					var Ex3 = __class__ ('Ex3', [Exception], {
					});
					var test1 = function () {
						__except__ = Exception ('mary');
						__except__.__cause__ = null;
						throw __except__;
					};
					var test2 = function (autoTester) {
						try {
							test1 ();
						}
						catch (__except__) {
							if (isinstance (__except__, Ex1)) {
								var exception = __except__;
								autoTester.check (111);
								autoTester.check (exception);
							}
							else if (isinstance (__except__, Exception)) {
								var exception = __except__;
								autoTester.check (222);
								autoTester.check (exception);
							}
						}
					};
					var run = function (autoTester) {
						test2 (autoTester);
						try {
							__except__ = Ex2 ('had');
							__except__.__cause__ = null;
							throw __except__;
						}
						catch (__except__) {
							if (isinstance (__except__, Ex1)) {
								var exception = __except__;
								autoTester.check ('a');
							}
							else if (isinstance (__except__, Exception)) {
								var exception = __except__;
								autoTester.check ('little');
								autoTester.check (exception);
							}
						}
						autoTester.check (333);
						try {
							__except__ = Ex1 ('lamb');
							__except__.__cause__ = null;
							throw __except__;
						}
						catch (__except__) {
							if (isinstance (__except__, Ex2)) {
								var exception = __except__;
								autoTester.check ('his');
								autoTester.check (exception);
							}
							else if (isinstance (__except__, Ex1)) {
								var exception = __except__;
								autoTester.check ('fleece');
								autoTester.check (exception);
							}
							else if (isinstance (__except__, Exception)) {
								var exception = __except__;
								autoTester.check ('was');
								autoTester.check (exception);
							}
						}
						finally {autoTester.check ('white');
						}
						autoTester.check (444);
						var test3 = function () {
							__except__ = Ex3 ('as');
							__except__.__cause__ = null;
							throw __except__;
						};
						autoTester.check (555);
						try {
							test3 ();
						}
						catch (__except__) {
							if (isinstance (__except__, Ex1)) {
								var exception = __except__;
								autoTester.check ('snow');
								autoTester.check (exception);
							}
							else if (isinstance (__except__, Exception)) {
								var exception = __except__;
								autoTester.check ('and');
								autoTester.check (exception);
							}
						}
						finally {autoTester.check ('everywhere');
						}
						autoTester.check (666);
					};
					__pragma__ ('<all>')
						__all__.Ex1 = Ex1;
						__all__.Ex2 = Ex2;
						__all__.Ex3 = Ex3;
						__all__.run = run;
						__all__.test1 = test1;
						__all__.test2 = test2;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		'extended_slices', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var indices = function (key) {
						if (__envir__.executor_name == __envir__.transpiler_name) {
							return (type (key) == list ? tuple (key) : key);
						}
						else {
							try {
								return key.indices (1000000000);
							}
							catch (__except__) {
								try {
									return tuple (function () {
										var __accu0__ = [];
										var __iter0__ = key;
										for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
											var subkey = __iter0__ [__index0__];
											__accu0__.append (indices (subkey));
										}
										return __accu0__;
									} ());
								}
								catch (__except__) {
									return key;
								}
							}
						}
					};
					var Test = __class__ ('Test', [object], {
						get __init__ () {return __get__ (this, function (self, autoTester) {
							self.autoTester = autoTester;
						});},
						get __getitem__ () {return __get__ (this, function (self, key) {
							self.autoTester.check ('getitem (', indices (key), ')');
							return 1234567;
						});},
						get __setitem__ () {return __get__ (this, function (self, key, value) {
							self.autoTester.check ('setitem (', indices (key), ')', value);
						});}
					});
					var run = function (autoTester) {
						var __left0__ = Test (autoTester);
						var a = __left0__;
						var b = __left0__;
						var c = __left0__;
						var d = __left0__;
						var e = __left0__;
						var f = __left0__;
						var g = __left0__;
						var h = __left0__;
						var i = __left0__;
						var j = __left0__;
						var k = __left0__;
						var l = __left0__;
						a.__setitem__ ([tuple ([1, 2, 3]), tuple ([4, 5, 6])], __getslice__ (b, 7, 8, 9));
						__setslice__ (c, 1, 2, 3, d.__getitem__ ([tuple ([4, 5, 6]), tuple ([7, 8, 9])]));
						e.__setitem__ ([1, tuple ([1, 2, 3]), 3], f.__getitem__ ([4, tuple ([4, 5, 6]), 6]));
						g.__setitem__ ([1, 2, 3], h.__getitem__ ([1, 2, 3]));
						__setitem__ (i, 1, __getitem__ (j, 1));
						__setslice__ (k, 1, 2, 3, __getslice__ (l, 1, 2, 3));
					};
					__pragma__ ('<all>')
						__all__.Test = Test;
						__all__.indices = indices;
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		'general_functions', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var a = list ([1, 5, 3, 2, -(1)]);
						var b = list (['sun', 'earth', 'moon']);
						autoTester.check (sorted (a));
						autoTester.check (sorted (b));
						a.py_sort ();
						autoTester.check (a);
						b.py_sort ();
						autoTester.check (b);
						autoTester.check (sorted (a, __kwargdict__ ({reverse: true})));
						autoTester.check (sorted (b, __kwargdict__ ({reverse: true})));
						a.py_sort (__kwargdict__ ({reverse: true}));
						autoTester.check (a);
						b.py_sort (__kwargdict__ ({reverse: true}));
						autoTester.check (b);
						b.py_sort (__kwargdict__ ({key: (function __lambda__ (x) {
							return len (x);})}));
						autoTester.check (b);
						b.py_sort (__kwargdict__ ({key: (function __lambda__ (x) {
							return len (x);}), reverse: true}));
						autoTester.check (b);
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
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
						autoTester.check (all.__getslice__ (8, 24, 1));
						autoTester.check (all.__getslice__ (8, 24, 2));
						var aList = list ([3, 4, 7, 8]);
						autoTester.check (aList);
						aList.__setslice__ (4, 4, null, list ([9, 10]));
						autoTester.check (aList);
						aList.__setslice__ (2, 2, null, list ([5, 6]));
						autoTester.check (aList);
						aList.__setslice__ (0, 0, null, list ([1, 2]));
						autoTester.check (aList);
						aList.__setslice__ (0, null, 2, function () {
							var __accu0__ = [];
							for (var x = 0; x < 10; x++) {
								if (x % 2) {
									__accu0__.append (x + 0.001);
								}
							}
							return __accu0__;
						} ());
						autoTester.check (aList);
					};
					__pragma__ ('<all>')
						__all__.run = run;
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
		'lambda_functions', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var z = 1000;
						autoTester.check ((function __lambda__ (x, y) {
							return (x + y) + z;}) (111, 222));
						var f = function (list0, list1, aFunc) {
							return function () {
								var __accu0__ = [];
								var __iter0__ = zip (list0, list1);
								for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
									var elem = __iter0__ [__index0__];
									__accu0__.append (aFunc.apply (null, elem));
								}
								return __accu0__;
							} ();
						};
						var x = f (range (10), range (0, 100, 10), (function __lambda__ (x, y) {
							return (x + y) + z;}));
						autoTester.check (x);
						autoTester.check (f (range (10, 20), range (100, 200, 10), (function __lambda__ (x, y) {
							return x * y + 100 * z;})));
						autoTester.check (f (range (10, 20), range (100, 200, 10), (function __lambda__ () {
							var args = tuple ([].slice.apply (arguments).slice (0));
							return args [0] * args [1] + 100 * z;})));
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
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
							for (var i = 0; i < 10; i++) {
								if (i % 2) {
									__accu0__.append (i * i);
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
											if ((200 < x && x < 600)) {
												if ((2 < z && z < 6)) {
													__accu0__.append (tuple ([x, y, z]));
												}
											}
										}
									}
								}
							}
							return __accu0__;
						} ();
						autoTester.check (tuples);
						var tricky = function () {
							var __accu0__ = [];
							var __iter0__ = tuple ([tuple ([10, 11]), tuple ([20, 21])]);
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var __left0__ = __iter0__ [__index0__];
								var x = __left0__ [0];
								var y = __left0__ [1];
								__accu0__.append (tuple ([2 * x, 3 * y]));
							}
							return __accu0__;
						} ();
						autoTester.check (tricky);
						var nested = function () {
							var __accu0__ = [];
							var __iter0__ = function () {
								var __accu1__ = [];
								for (var x = 0; x < 3; x++) {
									__accu1__.append (x * x);
								}
								return __accu1__;
							} ();
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var x = __iter0__ [__index0__];
								__accu0__.append (2 * x);
							}
							return __accu0__;
						} ();
						autoTester.check (nested);
						var a = 100;
						var x = 5;
						var scopeTest = function () {
							var __accu0__ = [];
							for (var x = 0; x < 5; x++) {
								__accu0__.append (x + a);
							}
							return __accu0__;
						} ();
						autoTester.check (x);
						autoTester.check (scopeTest);
					};
					__pragma__ ('<all>')
						__all__.run = run;
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
					var pi = Math.PI;
					var e = Math.E;
					var exp = Math.exp;
					var expm1 = Math.expm1;
					var log = Math.log;
					var log1p = Math.log1p;
					var log2 = Math.log2;
					var log10 = Math.log10;
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
					__pragma__ ('<all>')
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
						__all__.log = log;
						__all__.log10 = log10;
						__all__.log1p = log1p;
						__all__.log2 = log2;
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
		'math_module', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var acos = __init__ (__world__.math).acos;
					var acosh = __init__ (__world__.math).acosh;
					var asin = __init__ (__world__.math).asin;
					var asinh = __init__ (__world__.math).asinh;
					var atan = __init__ (__world__.math).atan;
					var atan2 = __init__ (__world__.math).atan2;
					var atanh = __init__ (__world__.math).atanh;
					var ceil = __init__ (__world__.math).ceil;
					var cos = __init__ (__world__.math).cos;
					var cosh = __init__ (__world__.math).cosh;
					var degrees = __init__ (__world__.math).degrees;
					var e = __init__ (__world__.math).e;
					var exp = __init__ (__world__.math).exp;
					var expm1 = __init__ (__world__.math).expm1;
					var floor = __init__ (__world__.math).floor;
					var hypot = __init__ (__world__.math).hypot;
					var log = __init__ (__world__.math).log;
					var log10 = __init__ (__world__.math).log10;
					var log1p = __init__ (__world__.math).log1p;
					var log2 = __init__ (__world__.math).log2;
					var pi = __init__ (__world__.math).pi;
					var pow = __init__ (__world__.math).pow;
					var radians = __init__ (__world__.math).radians;
					var sin = __init__ (__world__.math).sin;
					var sinh = __init__ (__world__.math).sinh;
					var sqrt = __init__ (__world__.math).sqrt;
					var tan = __init__ (__world__.math).tan;
					var tanh = __init__ (__world__.math).tanh;
					var trunc = __init__ (__world__.math).trunc;
					var run = function (autoTester) {
						autoTester.check (pi);
						autoTester.check (e);
						autoTester.check (exp (3));
						autoTester.check (expm1 (4));
						autoTester.check (log (0.2));
						autoTester.check (log1p (5));
						autoTester.check (log2 (257));
						autoTester.check (log10 (1001));
						autoTester.check (pow (3, 4.5));
						autoTester.check (sqrt (25.1));
						autoTester.check (sin (10));
						autoTester.check (cos (10));
						autoTester.check (tan (10));
						autoTester.check (asin (0.5));
						autoTester.check (acos (0.5));
						autoTester.check (atan (0.5));
						autoTester.check (atan2 (1, 2));
						autoTester.check (hypot (3, 4.1));
						autoTester.check (degrees (pi / 2.1));
						autoTester.check (radians (90));
						autoTester.check (sinh (1));
						autoTester.check (cosh (1));
						autoTester.check (tan (1));
						autoTester.check (asinh (70));
						autoTester.check (acosh (70));
						autoTester.check (atan (70));
						autoTester.check (floor (3.5));
						autoTester.check (ceil (3.5));
						autoTester.check (trunc (3.5));
					};
					__pragma__ ('<use>' +
						'math' +
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
					__pragma__ ('<use>' +
						'modules.mod1' +
						'modules.mod1.mod11' +
						'modules.mod1.mod11.mod111' +
						'modules.mod1.mod11.mod112' +
						'modules.mod2' +
						'modules.mod2.mod21' +
						'modules.mod2.mod22' +
						'modules.mod3' +
					'</use>')
					__pragma__ ('<all>')
						__all__.a = a;
						__all__.f = f;
						__all__.pi = pi;
						__all__.run = run;
					__pragma__ ('</all>')
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
					__pragma__ ('<all>')
						__all__.pi = pi;
					__pragma__ ('</all>')
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
					__pragma__ ('<all>')
						__all__.e = e;
					__pragma__ ('</all>')
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
					__pragma__ ('<all>')
						__all__.A = A;
					__pragma__ ('</all>')
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
					__pragma__ ('<all>')
						__all__.f = f;
					__pragma__ ('</all>')
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
					__pragma__ ('<all>')
						__all__.f = f;
					__pragma__ ('</all>')
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
					__pragma__ ('<all>')
						__all__.f = f;
					__pragma__ ('</all>')
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
					__pragma__ ('<all>')
						__all__.B = B;
					__pragma__ ('</all>')
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
					__pragma__ ('<all>')
						__all__.mod3GetTwoHundred = mod3GetTwoHundred;
						__all__.mod3Hundred = mod3Hundred;
						__all__.x = x;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		'nonlocals', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var test1 = 1;
						var test2 = 2;
						var f = function () {
							var test1 = 10;
							test2 = 20;
							autoTester.check (test1, test2);
						};
						f ();
						autoTester.check (test1, test2);
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
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
									for (var row = 0; row < nRows; row++) {
										__accu0__.append (function () {
											var __accu1__ = [];
											for (var col = 0; col < nCols; col++) {
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
								for (var iTargetRow = 0; iTargetRow < result.nRows; iTargetRow++) {
									for (var iTargetCol = 0; iTargetCol < result.nCols; iTargetCol++) {
										for (var iTerm = 0; iTerm < self.nCols; iTerm++) {
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
							for (var iRow = 0; iRow < self.nRows; iRow++) {
								for (var iCol = 0; iCol < self.nCols; iCol++) {
									result._ [iRow] [iCol] = scalar * self._ [iRow] [iCol];
								}
							}
							return result;
						});},
						get __add__ () {return __get__ (this, function (self, other) {
							var result = Matrix (self.nRows, self.nCols);
							for (var iRow = 0; iRow < self.nRows; iRow++) {
								for (var iCol = 0; iCol < self.nCols; iCol++) {
									result._ [iRow] [iCol] = self._ [iRow] [iCol] + other._ [iRow] [iCol];
								}
							}
							return result;
						});},
						get __getitem__ () {return __get__ (this, function (self, index) {
							return self._ [index];
						});},
						get __setitem__ () {return __get__ (this, function (self, index, value) {
							self._ [index] = value;
						});},
						get __repr__ () {return __get__ (this, function (self) {
							return repr (self._);
						});}
					});
					var Functor = __class__ ('Functor', [object], {
						get __init__ () {return __get__ (this, function (self, factor) {
							self.factor = factor;
						});},
						get __call__ () {return __get__ (this, function (self, x, y) {
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
							return tuple ([self.factor * x, self.factor * y, function () {
								var __accu0__ = [];
								var __iter0__ = args;
								for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
									var arg = __iter0__ [__index0__];
									__accu0__.append (self.factor * arg);
								}
								return __accu0__;
							} (), self.factor * m, self.factor * n]);
						});}
					});
					var f = Functor (10);
					var g = function (x, y) {
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
						return tuple ([x, y, args, m, n]);
					};
					var run = function (autoTester) {
						var m0 = Matrix (3, 3, list ([list ([1, 2, 3]), list ([4, 5, 6]), list ([7, 8, 10])]));
						var m1 = Matrix (3, 3, list ([list ([10, 20, 30]), list ([40, 50, 60]), list ([70, 80, 90])]));
						var x = 3;
						var y = (x * 4) * x;
						var fast = 2 * 3;
						__setitem__ (__getitem__ (m1, 1), 2, __getitem__ (__getitem__ (m0, 1), 2));
						var slow = __add__ (2, 3);
						var m2 = __add__ (__mul__ (m0, m1), __mul__ (m1, __add__ (m0, m1)));
						var m3 = __mul__ (__mul__ (2, __add__ (__mul__ (__mul__ (__mul__ (2, m0), 3), m1), __mul__ (m2, 4))), 2);
						__call__ (autoTester.check, __getitem__ (__getitem__ (m0, 1), 1), __getitem__ (__getitem__ (m0, 1), 2), __getitem__ (__getitem__ (m1, 1), 1), __getitem__ (__getitem__ (m1, 1), 2));
						var fast2 = 16 * y + 1;
						autoTester.check (m0, m1);
						autoTester.check (x, y);
						autoTester.check (m2);
						autoTester.check (m3);
						autoTester.check (fast, slow, fast2);
						var x = 'marker';
						__call__ (autoTester.check, __call__ (f, 3, 4, 30, 40, __kwargdict__ ({m: 300, n: 400, p: 3000, q: 4000})));
						__call__ (autoTester.check, __call__ (g, 3, 4, 30, 40, __kwargdict__ ({m: 300, n: 400, p: 3000, q: 4000})));
					};
					__pragma__ ('<all>')
						__all__.Functor = Functor;
						__all__.Matrix = Matrix;
						__all__.f = f;
						__all__.g = g;
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
					__nest__ (itertools, '', __init__ (__world__.itertools));
					var okColor = 'green';
					var errorColor = 'red';
					var highlightColor = 'yellow';
					var testletNameColor = 'blue';
					var AutoTester = __class__ ('AutoTester', [object], {
						get __init__ () {return __get__ (this, function (self) {
							self.referenceBuffer = list ([]);
							self.testBuffer = list ([]);
							self.messageDivId = 'message';
							self.referenceDivId = 'python';
							self.testDivId = 'transcrypt';
						});},
						get sortedRepr () {return __get__ (this, function (self, any) {
							var tryGetNumKey = function (key) {
								if (type (key) == str) {
									try {
										return int (key);
									}
									catch (__except__) {
										try {
											return float (key);
										}
										catch (__except__) {
											return key;
										}
									}
								}
								else {
									return key;
								}
							};
							if (type (any) == dict) {
								return ('{' + ', '.join (function () {
									var __accu0__ = [];
									var __iter0__ = enumerate (sorted (function () {
										var __accu1__ = [];
										var __iter1__ = any.py_keys ();
										for (var __index0__ = 0; __index0__ < __iter1__.length; __index0__++) {
											var key = __iter1__ [__index0__];
											__accu1__.append (tryGetNumKey (key));
										}
										return __accu1__;
									} (), __kwargdict__ ({key: (function __lambda__ (aKey) {
										return str (aKey);})})));
									for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
										var __left0__ = __iter0__ [__index0__];
										var index = __left0__ [0];
										var key = __left0__ [1];
										__accu0__.append ('{}: {}'.format (repr (key), repr (any [key])));
									}
									return __accu0__;
								} ())) + '}';
							}
							else {
								if (type (any) == set) {
									if (len (any)) {
										return ('{' + ', '.join (sorted (function () {
											var __accu0__ = [];
											var __iter0__ = list (any);
											for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
												var item = __iter0__ [__index0__];
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
									if (type (any) == range) {
										return repr (list (any));
									}
									else {
										return repr (any);
									}
								}
							}
						});},
						get check () {return __get__ (this, function (self) {
							var args = tuple ([].slice.apply (arguments).slice (1));
							var item = ' '.join (function () {
								var __accu0__ = [];
								var __iter0__ = args;
								for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
									var arg = __iter0__ [__index0__];
									__accu0__.append (self.sortedRepr (arg));
								}
								return __accu0__;
							} ());
							if (__envir__.executor_name == __envir__.transpiler_name) {
								self.testBuffer.append (item);
							}
							else {
								self.referenceBuffer.append (item);
							}
						});},
						get dump () {return __get__ (this, function (self, filePrename) {
							var __iter0__ = tuple ([false, true]);
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var minified = __iter0__ [__index0__];
								var miniInfix = (minified ? '.min' : '');
								aFile = open ('{}{}.html'.format (filePrename, miniInfix), 'w');
								aFile.write ('<b>Status:</b>\n');
								aFile.write ('<div id="{}"></div><br><br>\n\n'.format (self.messageDivId));
								aFile.write ('<b>CPython output:</b>\n');
								aFile.write ('<div id="{}">{}</div><br><br>\n\n'.format (self.referenceDivId, ' | '.join (self.referenceBuffer)));
								aFile.write ('<b>Transcrypt output:</b>\n');
								aFile.write ('<div id="{}"></div>\n\n'.format (self.testDivId));
								aFile.write ('<script src="{}/{}{}.js"></script>\n\n'.format (__envir__.target_subdir, filePrename, miniInfix));
								aFile.close ();
							}
						});},
						get compare () {return __get__ (this, function (self) {
							self.referenceBuffer = document.getElementById (self.referenceDivId).innerHTML.py_split (' | ');
							var __break0__ = false;
							var __iter0__ = enumerate (zip (self.testBuffer, self.referenceBuffer));
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var __left0__ = __iter0__ [__index0__];
								var index = __left0__ [0];
								var testItem = __left0__ [1][0];
								var referenceItem = __left0__ [1][1];
								if (testItem != referenceItem) {
									document.getElementById (self.messageDivId).innerHTML = '<div style="color: {}"><b>Test failed</b></div>'.format (errorColor);
									var __iter1__ = tuple ([tuple ([self.referenceBuffer, self.referenceDivId, okColor]), tuple ([self.testBuffer, self.testDivId, errorColor])]);
									for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
										var __left0__ = __iter1__ [__index1__];
										var buffer = __left0__ [0];
										var divId = __left0__ [1];
										var accentColor = __left0__ [2];
										var buffer = itertools.chain (buffer.__getslice__ (0, index, 1), list (['!!! <div style="display: inline; color: {}; background-color: {}"><b><i>{}</i></b></div>'.format (accentColor, highlightColor, buffer [index])]), buffer.__getslice__ (index + 1, null, 1));
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
							if (__envir__.executor_name == __envir__.transpiler_name) {
								self.compare ();
							}
							else {
								self.dump (__main__.__file__.__getslice__ (0, -(3), 1).py_replace ('\\', '/').rsplit ('/', 1) [-(1)]);
							}
						});}
					});
					__pragma__ ('<use>' +
						'itertools' +
					'</use>')
					__pragma__ ('<all>')
						__all__.AutoTester = AutoTester;
						__all__.errorColor = errorColor;
						__all__.highlightColor = highlightColor;
						__all__.okColor = okColor;
						__all__.testletNameColor = testletNameColor;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		'properties', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var A = __class__ ('A', [object], {
						get getX () {return __get__ (this, function (self) {
							return self._x;
						});},
						get setX () {return __get__ (this, function (self, value) {
							self._x = value;
						});},
						get getY () {return __get__ (this, function (self) {
							return self._y;
						});},
						get setY () {return __get__ (this, function (self, value) {
							self._y = 1000 + value;
						});},
						get getY2 () {return __get__ (this, function (self) {
							return self._y;
						});},
						get setY2 () {return __get__ (this, function (self, value) {
							self._y = value;
						});},
						get getT () {return __get__ (this, function (self) {
							return self._t;
						});},
						get setT () {return __get__ (this, function (self, value) {
							self._t = value;
						});},
						get getU () {return __get__ (this, function (self) {
							return self._u + 10000;
						});},
						get setU () {return __get__ (this, function (self, value) {
							self._u = value - 5000;
						});}
					});
					A.p = 1234;
					var __left0__ = tuple ([property.call (A, A.getX, A.setX), property.call (A, A.getY, A.setY), property.call (A, A.getY2, A.setY2)]);
					Object.defineProperty (A, 'x', __left0__ [0]);;
					Object.defineProperty (A, 'y', __left0__ [1]);;
					Object.defineProperty (A, 'y2', __left0__ [2]);;
					Object.defineProperty (A, 't', property.call (A, A.getT, A.setT));;
					Object.defineProperty (A, 'u', property.call (A, A.getU, A.setU));;
					A.q = 5678;
					var B = __class__ ('B', [object], {
						get getZ () {return __get__ (this, function (self) {
							return self.z_;
						});},
						get setZ () {return __get__ (this, function (self, value) {
							self.z_ = value;
						});}
					});
					Object.defineProperty (B, 'z', property.call (B, B.getZ, B.setZ));;
					var C = __class__ ('C', [object], {
						get __init__ () {return __get__ (this, function (self) {
							self.offset = 1234;
						});},
						get getW () {return __get__ (this, function (self) {
							return self.w_ + self.offset;
						});},
						get setW () {return __get__ (this, function (self, value) {
							self.w_ = value - self.offset;
						});}
					});
					Object.defineProperty (C, 'w', property.call (C, C.getW, C.setW));;
					var run = function (autoTester) {
						var a1 = A ();
						var a2 = A ();
						a1.y2 = 1000;
						a2.y2 = 2000;
						a1.x = 5;
						a1.y = 6;
						a2.x = 7;
						a2.y = 8;
						a1.t = 77;
						a1.u = 88;
						autoTester.check (a1.x, a1.y, a1.y2);
						autoTester.check (a2.x, a2.y, a2.y2);
						autoTester.check (a1.p, a2.p, a1.q, a2.q);
						autoTester.check (a1.t, a1.u);
						var b = B ();
						var c = C ();
						b.z = 100100;
						c.z = 200200;
						c.w = 300300;
						autoTester.check (a1.x, b.z, c.z, c.w);
						c.w = 400400;
						c.z = 500500;
						b.z = 600600;
						autoTester.check (a1.x, b.z, c.z, c.w);
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
	__nest__ (
		__all__,
		'set_comprehensions', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var even = function () {
							var __accu0__ = [];
							var __iter0__ = list ([0, 9, 1, 7, 2, 8, 3, 6, 4, 5]);
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var i = __iter0__ [__index0__];
								__accu0__.append (2 * i);
							}
							return set (__accu0__);
						} ();
						autoTester.check (even);
						var odd = function () {
							var __accu0__ = [];
							var __iter0__ = list ([5, 6, 7, 8, 9, 4, 3, 1, 2, 0]);
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var i = __iter0__ [__index0__];
								__accu0__.append (2 * i + 1);
							}
							return set (__accu0__);
						} ();
						autoTester.check (odd);
						even.add (12);
						even.add (12);
						autoTester.check (even);
						even.discard (12);
						even.discard (12);
						autoTester.check (even);
						var uni = even.union (odd);
						autoTester.check (uni);
						autoTester.check (odd.isdisjoint (even));
						autoTester.check (uni.isdisjoint (even));
						autoTester.check (even.issuperset (uni));
						autoTester.check (uni.issuperset (even));
						autoTester.check (even.issubset (uni));
						autoTester.check (uni.issubset (even));
						var first = new set ([4, 1, 0, 5, 3, 2, 6]);
						autoTester.check (first);
						var second = new set ([3, 5, 6, 9, 4, 7, 8]);
						autoTester.check (second);
						var inter = first.intersection (second);
						autoTester.check (inter);
						var diff = first.difference (second);
						autoTester.check (diff);
						var symDiff = first.symmetric_difference (second);
						autoTester.check (symDiff);
						var aSet = new set ([200, 4, 5, 100]);
						aSet.update (first, symDiff, second);
						autoTester.check (aSet);
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
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
						var l = list ([1, 2, 3]);
						l [1] = l [2];
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
						x += -(3);
						autoTester.check (x);
						x += 6;
						autoTester.check (x);
						y -= 3;
						autoTester.check (y);
						l [1] += l [1];
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
					__pragma__ ('<all>')
						__all__.A = A;
						__all__.a = a;
						__all__.run = run;
					__pragma__ ('</all>')
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
						var a = __left0__ [0][0];
						var b = __left0__ [0][1];
						var santa = __left0__ [1];
						var c = __left0__ [2][0];
						var d = __left0__ [2][1];
						var e = __left0__ [3];
						autoTester.check (a, b, c, d, e, santa);
						var __iter0__ = enumerate (tuple ([0.5, 1.5, 2.5, 3.5]));
						for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
							var __left0__ = __iter0__ [__index0__];
							var i = __left0__ [0];
							var x = __left0__ [1];
							autoTester.check (i, x);
						}
						var __left0__ = tuple ([3.14, 2.74]);
						var e = __left0__ [0];
						var pi = __left0__ [1];
						var __left0__ = tuple ([pi, e]);
						var e = __left0__ [0];
						var pi = __left0__ [1];
						autoTester.check (e, pi);
						var f = function () {
							return function () {
								var __accu0__ = [];
								for (var i = 7000; i < 10000; i += 1000) {
									__accu0__.append (tuple ([i, 2 * i]));
								}
								return __accu0__;
							} ();
						};
						var g = function () {
							return f;
						};
						var __left0__ = g () ();
						var k = __left0__ [0][0];
						var l = __left0__ [0][1];
						var m = __left0__ [1][0];
						var n = __left0__ [1][1];
						var o = __left0__ [2][0];
						var p = __left0__ [2][1];
						autoTester.check (k, l, m, n, o, p);
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
	(function () {
		var py_arguments = {};
		var classes = {};
		var conditional_expressions = {};
		var control_structures = {};
		var data_structures = {};
		var dict_comprehensions = {};
		var dictionaries = {};
		var div_fixes = {};
		var exceptions = {};
		var extended_slices = {};
		var general_functions = {};
		var indices_and_slices = {};
		var lambda_functions = {};
		var list_comprehensions = {};
		var math_module = {};
		var modules = {};
		var nonlocals = {};
		var operator_overloading = {};
		var org = {};
		var properties = {};
		var set_comprehensions = {};
		var simple_and_augmented_assignment = {};
		var tuple_assignment = {};
		__nest__ (org, 'transcrypt.autotester', __init__ (__world__.org.transcrypt.autotester));
		__nest__ (py_arguments, '', __init__ (__world__.py_arguments));
		__nest__ (classes, '', __init__ (__world__.classes));
		__nest__ (conditional_expressions, '', __init__ (__world__.conditional_expressions));
		__nest__ (control_structures, '', __init__ (__world__.control_structures));
		__nest__ (data_structures, '', __init__ (__world__.data_structures));
		__nest__ (dict_comprehensions, '', __init__ (__world__.dict_comprehensions));
		__nest__ (dictionaries, '', __init__ (__world__.dictionaries));
		__nest__ (div_fixes, '', __init__ (__world__.div_fixes));
		__nest__ (exceptions, '', __init__ (__world__.exceptions));
		__nest__ (extended_slices, '', __init__ (__world__.extended_slices));
		__nest__ (general_functions, '', __init__ (__world__.general_functions));
		__nest__ (indices_and_slices, '', __init__ (__world__.indices_and_slices));
		__nest__ (lambda_functions, '', __init__ (__world__.lambda_functions));
		__nest__ (list_comprehensions, '', __init__ (__world__.list_comprehensions));
		__nest__ (modules, '', __init__ (__world__.modules));
		__nest__ (math_module, '', __init__ (__world__.math_module));
		__nest__ (nonlocals, '', __init__ (__world__.nonlocals));
		__nest__ (operator_overloading, '', __init__ (__world__.operator_overloading));
		__nest__ (properties, '', __init__ (__world__.properties));
		__nest__ (set_comprehensions, '', __init__ (__world__.set_comprehensions));
		__nest__ (simple_and_augmented_assignment, '', __init__ (__world__.simple_and_augmented_assignment));
		__nest__ (tuple_assignment, '', __init__ (__world__.tuple_assignment));
		var autoTester = org.transcrypt.autotester.AutoTester ();
		autoTester.run (py_arguments, 'arguments');
		autoTester.run (classes, 'classes');
		autoTester.run (conditional_expressions, 'conditional_expressions');
		autoTester.run (control_structures, 'control_structures');
		autoTester.run (data_structures, 'data_structures');
		autoTester.run (dict_comprehensions, 'dict_comprehensions');
		autoTester.run (dictionaries, 'dictionaries');
		autoTester.run (div_fixes, 'div_fixes');
		autoTester.run (exceptions, 'exceptions');
		autoTester.run (extended_slices, 'extended_slices');
		autoTester.run (general_functions, 'general_functions');
		autoTester.run (indices_and_slices, 'indices_and_slices');
		autoTester.run (lambda_functions, 'lambda_functions');
		autoTester.run (list_comprehensions, 'list_comprehensions');
		autoTester.run (modules, 'modules');
		autoTester.run (math_module, 'math_module');
		autoTester.run (nonlocals, 'nonlocals');
		autoTester.run (operator_overloading, 'operator_overloading');
		autoTester.run (properties, 'properties');
		autoTester.run (set_comprehensions, 'set_comprehensions');
		autoTester.run (simple_and_augmented_assignment, 'simple_and_augmented_assignment');
		autoTester.run (tuple_assignment, 'tuple_assignemt');
		autoTester.done ();
		__pragma__ ('<use>' +
			'arguments' +
			'classes' +
			'conditional_expressions' +
			'control_structures' +
			'data_structures' +
			'dict_comprehensions' +
			'dictionaries' +
			'div_fixes' +
			'exceptions' +
			'extended_slices' +
			'general_functions' +
			'indices_and_slices' +
			'lambda_functions' +
			'list_comprehensions' +
			'math_module' +
			'modules' +
			'nonlocals' +
			'operator_overloading' +
			'org.transcrypt.autotester' +
			'properties' +
			'set_comprehensions' +
			'simple_and_augmented_assignment' +
			'tuple_assignment' +
		'</use>')
		__pragma__ ('<all>')
			__all__.autoTester = autoTester;
		__pragma__ ('</all>')
	}) ();
	return __all__;
}
window ['autotest'] = autotest ();

//# sourceMappingURL=extra/sourcemap/autotest.js.map
