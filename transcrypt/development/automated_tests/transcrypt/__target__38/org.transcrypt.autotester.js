// Transcrypt'ed from Python, 2021-05-14 15:00:26
var itertools = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as __module_itertools__ from './itertools.js';
__nest__ (itertools, '', __module_itertools__);
import {DataConverter, HTMLGenerator, JSTesterUI, itemsAreEqual} from './org.transcrypt.autotester.html.js';
export {JSTesterUI, itemsAreEqual, HTMLGenerator, DataConverter};
var __all__ = dict ({get AutoTester () {return AutoTester;}, set AutoTester (value) {AutoTester = value;}, get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get getFileLocation () {return getFileLocation;}, set getFileLocation (value) {getFileLocation = value;}});
var __name__ = 'org.transcrypt.autotester';
export var getFileLocation = function (ancestor) {
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
			console.log("Failed to Match Frame", gpFrame);
			return 'UNKNOWN:???';
		}
	}
};
export var AutoTester =  __class__ ('AutoTester', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, symbols) {
		if (typeof symbols == 'undefined' || (symbols != null && symbols.hasOwnProperty ("__kwargtrans__"))) {;
			var symbols = [];
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
			return ('{' + ', '.join ((function () {
				var __accu0__ = [];
				for (var [index, key] of enumerate (sorted ((function () {
					var __accu1__ = [];
					for (var key of any.py_keys ()) {
						__accu1__.append (tryGetNumKey (key));
					}
					return __accu1__;
				}) (), __kwargtrans__ ({key: (function __lambda__ (aKey) {
					return str (aKey);
				})})))) {
					__accu0__.append ('{}: {}'.format (repr (key), repr (any [key])));
				}
				return __accu0__;
			}) ())) + '}';
		}
		else if (py_typeof (any) == set) {
			if (len (any)) {
				return ('{' + ', '.join (sorted ((function () {
					var __accu0__ = [];
					for (var item of list (any)) {
						__accu0__.append (str (item));
					}
					return __accu0__;
				}) ()))) + '}';
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
		var item = ' '.join ((function () {
			var __accu0__ = [];
			for (var arg of args) {
				__accu0__.append (self.sortedRepr (arg));
			}
			return __accu0__;
		}) ());
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
				if (!(itemsAreEqual (testItem, refItem))) {
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
		var invalidChars = ['~', '!', '@', '$', '%', '^', '&', '*', '(', ')', '+', '=', ',', '.', '/', "'", ';', ':', '"', '?', '>', '<', '[', ']', '\\', '{', '}', '|', '`', '#', ' '];
		for (var ch of invalidChars) {
			var ret = ret.py_replace (ch, '_');
		}
		return ret;
	});},
	get run () {return __get__ (this, function (self, testlet, testletName) {
		var testletName = self._cleanName (testletName);
		self._currTestlet = testletName;
		if (__envir__.executor_name == __envir__.transpiler_name) {
			self.testDict [self._currTestlet] = [];
		}
		else {
			self.refDict [self._currTestlet] = [];
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
			var fnameBase = __main__.__file__.py_replace ('\\', '/');
			var hg = HTMLGenerator (fnameBase);
			hg.generate_html (self.refDict);
		}
	});}
});

//# sourceMappingURL=org.transcrypt.autotester.map