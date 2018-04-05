// Transcrypt'ed from Python, 2018-04-05 23:13:27
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var itertools = {};
var __name__ = 'org.transcrypt.autotester';
import {HTMLGenerator, DataConverter, JSTesterUI} from './org.transcrypt.autotester.html.js';
export {HTMLGenerator, DataConverter, JSTesterUI};
import * as __module_itertools__ from './itertools.js';
__nest__ (itertools, '', __module_itertools__);
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
			console.log("Failed to Match Frame");
			return 'UNKNOWN:???';
		}
	}
};

export var AutoTester =  __class__ ('AutoTester', [object], {
	__module__: __name__,
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
			var fnameBase = __main__.__file__.py_replace ('\\', '/');
			var hg = HTMLGenerator (fnameBase);
			hg.generate_html (self.refDict);
		}
	});}
});

//# sourceMappingURL=org.transcrypt.autotester.map