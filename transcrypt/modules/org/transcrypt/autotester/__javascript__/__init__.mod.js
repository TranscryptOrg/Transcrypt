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
