// Transcrypt'ed from Python, 2021-05-14 15:01:25
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {translate} from './re.translate.js';
export {translate};
var __all__ = dict ({get A () {return A;}, set A (value) {A = value;}, get ASCII () {return ASCII;}, set ASCII (value) {ASCII = value;}, get DEBUG () {return DEBUG;}, set DEBUG (value) {DEBUG = value;}, get DOTALL () {return DOTALL;}, set DOTALL (value) {DOTALL = value;}, get G () {return G;}, set G (value) {G = value;}, get GLOBAL () {return GLOBAL;}, set GLOBAL (value) {GLOBAL = value;}, get I () {return I;}, set I (value) {I = value;}, get IGNORECASE () {return IGNORECASE;}, set IGNORECASE (value) {IGNORECASE = value;}, get J () {return J;}, set J (value) {J = value;}, get JSSTRICT () {return JSSTRICT;}, set JSSTRICT (value) {JSSTRICT = value;}, get L () {return L;}, set L (value) {L = value;}, get LOCALE () {return LOCALE;}, set LOCALE (value) {LOCALE = value;}, get M () {return M;}, set M (value) {M = value;}, get MULTILINE () {return MULTILINE;}, set MULTILINE (value) {MULTILINE = value;}, get Match () {return Match;}, set Match (value) {Match = value;}, get PyRegExp () {return PyRegExp;}, set PyRegExp (value) {PyRegExp = value;}, get ReIndexError () {return ReIndexError;}, set ReIndexError (value) {ReIndexError = value;}, get Regex () {return Regex;}, set Regex (value) {Regex = value;}, get S () {return S;}, set S (value) {S = value;}, get STICKY () {return STICKY;}, set STICKY (value) {STICKY = value;}, get T () {return T;}, set T (value) {T = value;}, get TEMPLATE () {return TEMPLATE;}, set TEMPLATE (value) {TEMPLATE = value;}, get U () {return U;}, set U (value) {U = value;}, get UNICODE () {return UNICODE;}, set UNICODE (value) {UNICODE = value;}, get VERBOSE () {return VERBOSE;}, set VERBOSE (value) {VERBOSE = value;}, get X () {return X;}, set X (value) {X = value;}, get Y () {return Y;}, set Y (value) {Y = value;}, get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get compile () {return compile;}, set compile (value) {compile = value;}, get error () {return error;}, set error (value) {error = value;}, get escape () {return escape;}, set escape (value) {escape = value;}, get findall () {return findall;}, set findall (value) {findall = value;}, get finditer () {return finditer;}, set finditer (value) {finditer = value;}, get fullmatch () {return fullmatch;}, set fullmatch (value) {fullmatch = value;}, get match () {return match;}, set match (value) {match = value;}, get purge () {return purge;}, set purge (value) {purge = value;}, get search () {return search;}, set search (value) {search = value;}, get split () {return split;}, set split (value) {split = value;}, get sub () {return sub;}, set sub (value) {sub = value;}, get subn () {return subn;}, set subn (value) {subn = value;}});
var __name__ = 're';
export var T = 1 << 0;
export var TEMPLATE = T;
export var I = 1 << 1;
export var IGNORECASE = I;
export var L = 1 << 2;
export var LOCALE = L;
export var M = 1 << 3;
export var MULTILINE = M;
export var S = 1 << 4;
export var DOTALL = S;
export var U = 1 << 5;
export var UNICODE = U;
export var X = 1 << 6;
export var VERBOSE = X;
export var DEBUG = 1 << 7;
export var A = 1 << 8;
export var ASCII = A;
export var Y = 1 << 16;
export var STICKY = Y;
export var G = 1 << 17;
export var GLOBAL = G;
export var J = 1 << 19;
export var JSSTRICT = J;
export var error =  __class__ ('error', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, msg, error, pattern, flags, pos) {
		if (typeof pattern == 'undefined' || (pattern != null && pattern.hasOwnProperty ("__kwargtrans__"))) {;
			var pattern = null;
		};
		if (typeof flags == 'undefined' || (flags != null && flags.hasOwnProperty ("__kwargtrans__"))) {;
			var flags = 0;
		};
		if (typeof pos == 'undefined' || (pos != null && pos.hasOwnProperty ("__kwargtrans__"))) {;
			var pos = null;
		};
		Exception.__init__ (self, msg, __kwargtrans__ ({error: error}));
		self.pattern = pattern;
		self.flags = flags;
		self.pos = pos;
	});}
});
export var ReIndexError =  __class__ ('ReIndexError', [IndexError], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		IndexError.__init__ (self, 'no such group');
	});}
});
export var Match =  __class__ ('Match', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, mObj, string, pos, endpos, rObj, namedGroups) {
		if (typeof namedGroups == 'undefined' || (namedGroups != null && namedGroups.hasOwnProperty ("__kwargtrans__"))) {;
			var namedGroups = null;
		};
		for (var [index, match] of enumerate (mObj)) {
		}
		self._obj = mObj;
		self._pos = pos;
		self._endpos = endpos;
		self._re = rObj;
		self._string = string;
		self._namedGroups = namedGroups;
		self._lastindex = self._lastMatchGroup ();
		if (self._namedGroups !== null) {
			self._lastgroup = ;
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
				if ( !== null) {
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
		var ret = [];
		if (len (args) > 0) {
			for (var index of args) {
				if (py_typeof (index) === str) {
					if (self._namedGroups !== null) {
						if (!__in__ (index, self._namedGroups.py_keys ())) {
							var __except0__ = ReIndexError ();
							__except0__.__cause__ = null;
							throw __except0__;
						}
						ret.append ();
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
					ret.append ();
				}
			}
		}
		else {
			ret.append ();
		}
		if (len (ret) == 1) {
			return ;
		}
		else {
			return tuple (ret);
		}
	});},
	get groups () {return __get__ (this, function (self, py_default) {
		if (typeof py_default == 'undefined' || (py_default != null && py_default.hasOwnProperty ("__kwargtrans__"))) {;
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
		if (typeof py_default == 'undefined' || (py_default != null && py_default.hasOwnProperty ("__kwargtrans__"))) {;
			var py_default = null;
		};
		if (self._namedGroups !== null) {
			var ret = dict ({});
			for (var [gName, gId] of self._namedGroups.py_items ()) {
				var value = ;
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
		if (typeof group == 'undefined' || (group != null && group.hasOwnProperty ("__kwargtrans__"))) {;
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
				var gId = ;
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
		else if ( !== null) {
			var r = compile (escape (), self._re.flags);
			var m = r.search ();
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
		if (typeof group == 'undefined' || (group != null && group.hasOwnProperty ("__kwargtrans__"))) {;
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
				var gId = ;
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
			return self._obj.index + len ();
		}
		else if ( !== null) {
			var r = compile (escape (), self._re.flags);
			var m = r.search ();
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
		if (typeof group == 'undefined' || (group != null && group.hasOwnProperty ("__kwargtrans__"))) {;
			var group = 0;
		};
		return tuple ([self.start (group), self.end (group)]);
	});}
});
Object.defineProperty (Match, 'pos', property.call (Match, Match._getPos, Match._setPos));
Object.defineProperty (Match, 'endpos', property.call (Match, Match._getEndPos, Match._setEndPos));
Object.defineProperty (Match, 're', property.call (Match, Match._getRe, Match._setRe));
Object.defineProperty (Match, 'string', property.call (Match, Match._getString, Match._setString));
Object.defineProperty (Match, 'lastgroup', property.call (Match, Match._getLastGroup, Match._setLastGroup));
Object.defineProperty (Match, 'lastindex', property.call (Match, Match._getLastIndex, Match._setLastIndex));
export var Regex =  __class__ ('Regex', [object], {
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
		if (typeof flags == 'undefined' || (flags != null && flags.hasOwnProperty ("__kwargtrans__"))) {;
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
		var bitmaps = [tuple ([DEBUG, '']), tuple ([IGNORECASE, 'i']), tuple ([MULTILINE, 'm']), tuple ([STICKY, 'y']), tuple ([GLOBAL, 'g']), tuple ([UNICODE, 'u'])];
		var ret = ''.join ((function () {
			var __accu0__ = [];
			for (var x of bitmaps) {
				if (( & flags) > 0) {
					__accu0__.append ();
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
		if (typeof pos == 'undefined' || (pos != null && pos.hasOwnProperty ("__kwargtrans__"))) {;
			var pos = 0;
		};
		if (typeof endpos == 'undefined' || (endpos != null && endpos.hasOwnProperty ("__kwargtrans__"))) {;
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
		if (typeof pos == 'undefined' || (pos != null && pos.hasOwnProperty ("__kwargtrans__"))) {;
			var pos = 0;
		};
		if (typeof endpos == 'undefined' || (endpos != null && endpos.hasOwnProperty ("__kwargtrans__"))) {;
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
		if (typeof pos == 'undefined' || (pos != null && pos.hasOwnProperty ("__kwargtrans__"))) {;
			var pos = 0;
		};
		if (typeof endpos == 'undefined' || (endpos != null && endpos.hasOwnProperty ("__kwargtrans__"))) {;
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
			var obsEndPos = m.index + len ();
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
		if (typeof maxsplit == 'undefined' || (maxsplit != null && maxsplit.hasOwnProperty ("__kwargtrans__"))) {;
			var maxsplit = 0;
		};
		if (maxsplit < 0) {
			return [string];
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
			var ret = [];
			var lastM = null;
			var cnt = 0;
			for (var i = 0; i < maxsplit; i++) {
				var m = rObj.exec (string);
				if (m) {
					cnt++;
					if (lastM !== null) {
						var start = lastM.index + len ();
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
				var endPos = lastM.index + len ();
				var end = string.__getslice__ (endPos, null, 1);
				ret.append (end);
			}
			return ret;
		}
	});},
	get _findAllMatches () {return __get__ (this, function (self, string, pos, endpos) {
		if (typeof pos == 'undefined' || (pos != null && pos.hasOwnProperty ("__kwargtrans__"))) {;
			var pos = 0;
		};
		if (typeof endpos == 'undefined' || (endpos != null && endpos.hasOwnProperty ("__kwargtrans__"))) {;
			var endpos = null;
		};
		var target = self._getTargetStr (string, pos, endpos);
		var flags = self._flags;
		flags |= GLOBAL;
		var __left0__ = self._compileWrapper (self._jspattern, flags);
		var _ = __left0__ [0];
		var rObj = __left0__ [1];
		var ret = [];
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
		if (typeof pos == 'undefined' || (pos != null && pos.hasOwnProperty ("__kwargtrans__"))) {;
			var pos = 0;
		};
		if (typeof endpos == 'undefined' || (endpos != null && endpos.hasOwnProperty ("__kwargtrans__"))) {;
			var endpos = null;
		};
		var mlist = self._findAllMatches (string, pos, endpos);
		var mSelect = function (m) {
			if (len (m) > 2) {
				return tuple (m.__getslice__ (1, null, 1));
			}
			else if (len (m) == 2) {
				return ;
			}
			else {
				return ;
			}
		};
		var ret = map (mSelect, mlist);
		return ret;
	});},
	get finditer () {return __get__ (this, function (self, string, pos, endpos) {
		if (typeof endpos == 'undefined' || (endpos != null && endpos.hasOwnProperty ("__kwargtrans__"))) {;
			var endpos = null;
		};
		var mlist = self._findAllMatches (string, pos, endpos);
		var ret = map ((function __lambda__ (m) {
			return Match (m, string, 0, len (string), self, self._groupindex);
		}), mlist);
		return py_iter (ret);
	});},
	get sub () {return __get__ (this, function (self, repl, string, count) {
		if (typeof count == 'undefined' || (count != null && count.hasOwnProperty ("__kwargtrans__"))) {;
			var count = 0;
		};
		var __left0__ = self.subn (repl, string, count);
		var ret = __left0__ [0];
		var _ = __left0__ [1];
		return ret;
	});},
	get subn () {return __get__ (this, function (self, repl, string, count) {
		if (typeof count == 'undefined' || (count != null && count.hasOwnProperty ("__kwargtrans__"))) {;
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
				var lastEnd = m.index + len ();
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
Object.defineProperty (Regex, 'pattern', property.call (Regex, Regex._getPattern, Regex._setPattern));
Object.defineProperty (Regex, 'flags', property.call (Regex, Regex._getFlags, Regex._setFlags));
Object.defineProperty (Regex, 'groups', property.call (Regex, Regex._getGroups, Regex._setGroups));
Object.defineProperty (Regex, 'groupindex', property.call (Regex, Regex._getGroupIndex, Regex._setGroupIndex));
export var PyRegExp =  __class__ ('PyRegExp', [Regex], {
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
export var compile = function (pattern, flags) {
	if (typeof flags == 'undefined' || (flags != null && flags.hasOwnProperty ("__kwargtrans__"))) {;
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
export var search = function (pattern, string, flags) {
	if (typeof flags == 'undefined' || (flags != null && flags.hasOwnProperty ("__kwargtrans__"))) {;
		var flags = 0;
	};
	var p = compile (pattern, flags);
	return p.search (string);
};
export var match = function (pattern, string, flags) {
	if (typeof flags == 'undefined' || (flags != null && flags.hasOwnProperty ("__kwargtrans__"))) {;
		var flags = 0;
	};
	var p = compile (pattern, flags);
	return p.match (string);
};
export var fullmatch = function (pattern, string, flags) {
	if (typeof flags == 'undefined' || (flags != null && flags.hasOwnProperty ("__kwargtrans__"))) {;
		var flags = 0;
	};
	var p = compile (pattern, flags);
	return p.fullmatch (string);
};
export var py_split = function (pattern, string, maxsplit, flags) {
	if (typeof maxsplit == 'undefined' || (maxsplit != null && maxsplit.hasOwnProperty ("__kwargtrans__"))) {;
		var maxsplit = 0;
	};
	if (typeof flags == 'undefined' || (flags != null && flags.hasOwnProperty ("__kwargtrans__"))) {;
		var flags = 0;
	};
	var p = compile (pattern, flags);
	return p.py_split (string, maxsplit);
};
export var findall = function (pattern, string, flags) {
	if (typeof flags == 'undefined' || (flags != null && flags.hasOwnProperty ("__kwargtrans__"))) {;
		var flags = 0;
	};
	var p = compile (pattern, flags);
	return p.findall (string);
};
export var finditer = function (pattern, string, flags) {
	if (typeof flags == 'undefined' || (flags != null && flags.hasOwnProperty ("__kwargtrans__"))) {;
		var flags = 0;
	};
	var p = compile (pattern, flags);
	return p.finditer (string);
};
export var sub = function (pattern, repl, string, count, flags) {
	if (typeof count == 'undefined' || (count != null && count.hasOwnProperty ("__kwargtrans__"))) {;
		var count = 0;
	};
	if (typeof flags == 'undefined' || (flags != null && flags.hasOwnProperty ("__kwargtrans__"))) {;
		var flags = 0;
	};
	var p = compile (pattern, flags);
	return p.sub (repl, string, count);
};
export var subn = function (pattern, repl, string, count, flags) {
	if (typeof count == 'undefined' || (count != null && count.hasOwnProperty ("__kwargtrans__"))) {;
		var count = 0;
	};
	if (typeof flags == 'undefined' || (flags != null && flags.hasOwnProperty ("__kwargtrans__"))) {;
		var flags = 0;
	};
	var p = compile (pattern, flags);
	return p.subn (repl, string, count);
};
export var escape = function (string) {
	var ret = null;
	var replfunc = function (m) {
		if ( == '\\') {
			return '\\\\\\\\';
		}
		else {
			return '\\\\' + ;
		}
	};
	
	        var r = /[^A-Za-z:;\d]/g;
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
export var purge = function () {
	// pass;
};

//# sourceMappingURL=re.map