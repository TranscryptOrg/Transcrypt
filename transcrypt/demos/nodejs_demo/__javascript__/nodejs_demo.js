"use strict";
// Transcrypt'ed from Python, 2016-03-31 11:15:04
function nodejs_demo () {
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
	var __class__ = function (name, bases, extra) {
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
		cls.__name__ = name;
		cls.__bases__ = bases;
		for (var attrib in extra) {
			var descrip = Object.getOwnPropertyDescriptor (extra, attrib);
			Object.defineProperty (cls, attrib, descrip);
		}
		return cls;
	};
	__all__.__class__ = __class__;
	var object = __all__.__class__ ('object', [], {
		__init__: function (self) {},
		__name__: 'object',
		__bases__: [],
		__new__: function (args) {
			var instance = Object.create (this, {__class__: {value: this, enumerable: true}});
			this.__init__.apply (null, [instance] .concat (args));
			return instance;
		}
	});
	__all__.object = object;
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
							self.transpiler_version = '3.5.136';
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
	__nest__ (__all__, '', __init__ (__all__.org.transcrypt.__base__));
	var __envir__ = __all__.__envir__;
	__nest__ (__all__, '', __init__ (__all__.org.transcrypt.__standard__));
	var Exception = __all__.Exception;
	var __sort__ = __all__.__sort__;
	var sorted = __all__.sorted;
	__envir__.executor_name = __envir__.transpiler_name;
	var __main__ = {__file__: ''};
	__all__.main = __main__;
	var __except__ = null;
	__all__.__except__ = __except__;
	var __kwargdict__ = function (anObject) {
		anObject.__class__ = __kwargdict__;
		anObject.constructor = Object;
		return anObject;
	}
	__all__.___kwargdict__ = __kwargdict__;
	var property = function (getter, setter) {
		if (!setter) {
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
	var print = function () {
		var args = [] .slice.apply (arguments)
		var result = ''
		for (var i = 0; i < args.length; i++) {
			result += str (args [i]) + ' ';
		}
		console.log (result);
	};
	__all__.print = print;
	console.log.apply = function () {
		print ([] .slice.apply (arguments) .slice (1));
	};
	var __in__ = function (element, container) {
		if (type (container) == dict) {
			return container.py_keys () .indexOf (element) > -1;
		}
		else {
			return container.indexOf (element) > -1;
		}
	}
	__all__.__in__ = __in__;
	var __specialattrib__ = function (attrib) {
		return (attrib.startswith ('__') && attrib.endswith ('__')) || attrib == 'constructor' || attrib.startswith ('py_');
	}
	__all__.__specialattrib__ = __specialattrib__;
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
			throw ('ValueError');
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
					if (anObject.constructor == Object) {
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
	var chr = function (charCode) {
		return String.fromCharCode (charCode);
	}
	__all__.chr = chr;
	var ord = function (aChar) {
		return aChar.charCodeAt (0);
	}
	__all__.org = ord;
	var reversed = function (iterable) {
		iterable = iterable.slice ();
		iterable.reverse ();
		return iterable;
	}
	var zip = function () {
		var args = [] .slice.call (arguments);
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
	}
	__all__.zip = zip;
	function range (start, stop, step) {
		if (typeof stop == 'undefined') {
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
	function enumerate (iterable) {
		return zip (range (len (iterable)), iterable);
	}
	__all__.enumerate = enumerate;
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
	function list (iterable) {
		var instance = iterable ? [] .slice.apply (iterable) : [];
		return instance;
	}
	__all__.list = list;
	Array.prototype.__class__ = list;
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
		if (step == null) {
			Array.prototype.splice.apply (this, [start, stop - start] .concat (source))
		}
		else {
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
	Array.prototype.py_pop = function (index) {
		if (index == undefined) {
			return this.pop ()
		}
		else {
			return this.splice (index, 1) [0];
		}
	};
	Array.prototype.py_sort = function () {
		__sort__.apply  (null, [this].concat ([] .slice.apply (arguments)));
	};
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
	}
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
	Array.prototype.update = function () {
		var updated = [] .concat.apply (this.slice (), arguments) .sort ();
		this.clear ();
		for (var i = 0; i < updated.length; i++) {
			if (updated [i] != updated [i - 1]) {
				this.push (updated [i]);
			}
		}
	};
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
		if (!objectOrPairs || objectOrPairs instanceof Array) {
			var instance = {};
			if (objectOrPairs) {
				for (var index = 0; index < objectOrPairs.length; index++) {
					var pair = objectOrPairs [index];
					instance [pair [0]] = pair [1];
				}
			}
		}
		else {
			var instance = objectOrPairs;
		}
		Object.defineProperty (instance, '__class__', {value: dict, enumerable: false, writable: true});
		Object.defineProperty (instance, 'py_keys', {value: __keys__, enumerable: false});
		Object.defineProperty (instance, 'py_items', {value: __items__, enumerable: false});
		Object.defineProperty (instance, 'py_del', {value: __del__, enumerable: false});
		return instance;
	}
	__all__.dict = dict;
	dict.__name__ = 'dict';
	function str (stringable) {
		try {
			return stringable.__str__ ();
		}
		catch (e) {
			return new String (stringable);
		}
	}
	__all__.str = str;
	String.prototype.__class__ = str;
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
	Object.defineProperty (String.prototype, 'format', {
		get: function () {return __get__ (this, function (self) {
			var args = tuple ([] .slice.apply (arguments).slice (1));
			var autoIndex = 0;
			return self.replace (/\{(\w*)\}/g, function (match, key) {
				if (key == '') {
					key = autoIndex++;
				}
				if (key == +key) {
					return args [key] == 'undefined' ? match : args [key];
				}
				else {
					for (var index = 0; index < args.length; index++) {
						if (typeof args [index] == 'object' && typeof args [index][key] != 'undefined') {
							return args [index][key];
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
	var __matmul__ = function (a, b) {
		if (typeof a == 'object' && '__matmul__' in a) {
			return a.__matmul__ (b);
		}
		else {
			return b.__rmatmul__ (a);
		}
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
	(function () {
		var http = require ('http');
		var Demo = __class__ ('Demo', [object], {
			get __init__ () {return __get__ (this, function (self, port) {
				print ('Demo server started on port', port);
				self.server = http.createServer (self.serve);
				self.server.listen (port);
				self.oldIndex = 0;
				self.newIndex = 0;
				self.count = 0;
			});},
			get serve () {return __get__ (this, function (self, request, response) {
				response.writeHead (200);
				print ('Serving page', self.count);
				self.count++;
				while (self.newIndex == self.oldIndex) {
					self.newIndex = int (Math.random () * len (self.texts));
				}
				self.oldIndex = self.newIndex;
				response.end ('<h1>{}</h1>'.format (self.texts [self.newIndex]));
			});}
		});
		Demo.texts = tuple (['Welcome to the world of node.js', 'You can have your cake and eat it', "Use node's ecosystem while programming in Python", 'Using node.js from Transcrypt is easy', 'Take a Python ride into the node.js world']);
		var demo = Demo (8080);
		__pragma__ ('<all>')
			__all__.Demo = Demo;
			__all__.demo = demo;
			__all__.http = http;
		__pragma__ ('</all>')
	}) ();
	return __all__;
}
nodejs_demo ();
