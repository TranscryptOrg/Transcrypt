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
							aFile.write ('<script src="{}/{}.js"></script>\n\n'.format (__envir__.targetSubDir, filePrename));
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
