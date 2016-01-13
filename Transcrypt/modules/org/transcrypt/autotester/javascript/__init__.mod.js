	__nest__ (
		__all__,
		'org.transcrypt.autotester', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var itertools = {};
					var __envir__ = transcrypt.org.transcrypt.__base__.__envir__;
					__nest__ (itertools, '', __init__ (__world__.itertools));
					var AutoTester = __class__ ('AutoTester', [object], {
						get __init__ () {return __get__ (this, function (self) {
							self.referenceBuffer = [];
							self.testBuffer = [];
							self.messageDivId = 'message';
							self.referenceDivId = 'python';
							self.testDivId = 'transcrypt';
						});},
						get store () {return __get__ (this, function (self) {
							var args = [] .slice.apply (arguments) .slice (1);
							var item = ' '.join (str (args));
							if (__envir__.executorName == __envir__.transpilerName) {
								self.testBuffer.append (item);
							}
							else {
								self.referenceBuffer.append (item)}
						});},
						get dump () {return __get__ (this, function (self) {
							aFile = open ('test.html', 'w');
							aFile.write ('<script src="javascript/test.js"></script>\n\n');
							aFile.write ('<b>Status:</b>\n');
							aFile.write ('<div id="{}"></div><br><br>\n\n'.format (self.messageDivId));
							aFile.write ('<b>Reference output:</b>\n');
							aFile.write ('<div id="{}">{}</div><br><br>\n\n'.format (self.referenceDivId, '\t'.join (self.referenceBuffer)));
							aFile.write ('<b>Test output:</b>\n');
							aFile.write ('<div id="{}"></div>\n\n'.format (self.testDivId));
							aFile.write ('<script>test ();</script>\n');
							aFile.close ();
						});},
						get compare () {return __get__ (this, function (self) {
							self.referenceBuffer = document.getElementById (self.referenceDivId).innerHTML.split ('\t');
							var __iter0__ = enumerate (zip (self.testBuffer, self.referenceBuffer));
							var __break0__ = false;
							for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
								var __left0__ = __iter0__ [__index0__] ;
								var index = __left0__ [0];
								var testItem = __left0__ [1][0];
								var referenceItem = __left0__ [1][1];
								if (testItem != referenceItem) {
									document.getElementById (self.messageDivId).innerHTML = 'Test failed';
									var test = zip ([self.referenceBuffer, self.referenceDivId], [self.testBuffer, self.testDivId]);
									var __iter1__ = [[self.referenceBuffer, self.referenceDivId], [self.testBuffer, self.testDivId]];
									for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
										var __left0__ = __iter1__ [__index1__] ;
										var buffer = __left0__ [0];
										var divId = __left0__ [1];
										var buffer = itertools.chain (buffer.slice (0, index), ['*** ERROR ***'], buffer.slice (index));
										document.getElementById (divId).innerHTML = ' | '.join (buffer);
									}
									;
									__break0__ = true;
									break;
								}
							}
							if (!__break0__) {
								document.getElementById (self.messageDivId).innerHTML = 'Test succeeded';
								document.getElementById (testDivId).innerHTML = ' | '.join (self.testBuffer);
							}
						});},
						get done () {return __get__ (this, function (self) {
							if (__envir__.executorName == __envir__.transpilerName) {
								self.compare ();
							}
							else {
								self.dump ()}
						});}
					});
					//<all>
					__all__.AutoTester = AutoTester;
					//</all>
				}
			}
		}
	);
