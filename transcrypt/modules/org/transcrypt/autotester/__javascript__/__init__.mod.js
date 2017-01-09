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
							else if (py_typeof (any) == set) {
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
