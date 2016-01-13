
	// Initialize __base__ and make its names available directly and via __all__
	__nest__ (__all__, '', __init__ (__all__.org.transcrypt.__base__));
	var __envir__ = __all__.__envir__;
	
	// Complete __envir__ for non-stub mode
	__envir__.executorName = __envir__.transpilerName;

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
		if (collection.hasOwnProperty ('length')) {
			return collection.length;
		}
		else {
			return collection.size;
		}
	};
	__all__.len = len;
	
	// Repr function for anything that has a toString method in JavaScript
	
	var str = function (anObject) {
		return anObject.toString ();
	}
	__all__.str = str;
	
	var repr = function (anObject) {
		return anObject.toString ();
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
	
	function enumerate (aList) {
		return zip (range (len (aList)), aList);
	}
	
	// --- Set methods
	
	var set = function (iterable) {
		return new Set (iterable);
	};
	__all__.set = set;
	
	// --- List methods
	
	var list = function  () {
		return [] .slice.apply (arguments);
	}
	__all__.list = list;
	
	Array.prototype.append = function (element) {
		this.push (element);
	};

	Array.prototype.extend = function (aList) {
		this.push.apply (this, aList);
	};
	
	Array.prototype.clear = function (aList) {
		aList.splice (0, aList.length);
	};
	
	// --- String methods
	
	String.prototype.join = function (aList) {
		return aList.join (this);
	};
	
	String.prototype.jsSplit = String.prototype.split;
	
	String.prototype.split = function (sep, maxsplit) {
		if (!sep) {
			sep = ' ';
		}
		return this.jsSplit (sep || /s+/, maxsplit);
	};
	
	String.prototype.rsplit = function (sep, maxsplit) {
		var split = this.split (sep || /s+/);
		return maxsplit ? [ split.slice (0, -maxsplit) .join (sep) ].concat (split.slice (-maxsplit)) : split;
	};
	
	String.prototype.strip = function () {
		return this.replace (/^\s*|\s*$/g, '');
	};
		
	String.prototype.lstrip = function () {
		return this.replace (/^\s*/g, '');
	};
	
	String.prototype.rstrip = function () {
		return this.replace (/\s*$/g, '');
	};

