
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
