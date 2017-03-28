	__nest__ (
		__all__,
		'org.transcrypt.autotester.html', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var okColor = 'green';
					var errorColor = 'red';
					var highlightColor = 'yellow';
					var testletNameColor = 'blue';
					var messageDivId = 'message';
					var referenceDivId = 'python';
					var refResultDivId = 'pyresults';
					var refPosDivId = 'pypos';
					var testDivId = 'transcrypt';
					var tableId = 'resulttable';
					var resultsDivId = 'results';
					var faultRowClass = 'faultrow';
					var testletHeaderClass = 'testletheader';
					var transValClass = 'trans-val';
					var transPosClass = 'trans-pos';
					var pyValClass = 'py-val';
					var pyPosClass = 'py-pos';
					var excAreaId = 'exc-area';
					var excHeaderClass = 'exc-header';
					var forceCollapseId = 'force-collapse';
					var forceExpandId = 'force-expand';
					var HTMLGenerator = __class__ ('HTMLGenerator', [object], {
						get __init__ () {return __get__ (this, function (self, filenameBase) {
							if (typeof filenameBase == 'undefined' || (filenameBase != null && filenameBase .hasOwnProperty ("__kwargtrans__"))) {;
								var filenameBase = null;
							};
							self._fnameBase = filenameBase;
						});},
						get generate_html () {return __get__ (this, function (self, refDict, minified) {
							if (typeof minified == 'undefined' || (minified != null && minified .hasOwnProperty ("__kwargtrans__"))) {;
								var minified = false;
							};
							if (self._fnameBase === null) {
								var __except0__ = ValueError ('Filename Base must be defined to generate');
								__except0__.__cause__ = null;
								throw __except0__;
							}
							var minInfix = (minified ? '.min' : '');
							var fname = minInfix.join (list ([self._fnameBase, '.html']));
							var jsFileName = minInfix.join (list ([self._fnameBase, '.js']));
							var jsPath = '{}/{}'.format (__envir__.target_subdir, jsFileName);
							f = open (fname, 'w');
							f.write ('<html><head>');
							self._writeCSS (f);
							f.write ('</head><body>');
							self._writeStatusHeaderTemplate (f);
							var dc = DataConverter ();
							dc.writeHiddenResults (f, refDict);
							self._writeTableArea (f);
							f.write ('<script src="{}"></script>\n\n'.format (jsPath));
							f.write ('</body></html>');
							f.close ();
						});},
						get _writeCSS () {return __get__ (this, function (self, f) {
							var cssOut = '\n\t\t<style>\n\t\t  body {\n\t\t    max-width: 100%;\n\t\t  }\n\t\t  .faultrow > td {\n\t\t     background-color: LightCoral;\n\t\t  }\n\t\t  #resulttable {\n\t\t    border-collapse: collapse;\n\t\t    width: 100%;\n\t\t    table-layout: fixed;\n\t\t  }\n\t\t  #resulttable th, #resulttable td {\n\t\t    border: 1px solid grey;\n\t\t  }\n\t\t  .testletheader > td {\n\t\t    background-color: LightSkyBlue;\n\t\t  }\n\t\t  .header-pos {\n\t\t    width: 20%;\n\t\t  }\n\t\t  .header-val {\n\t\t    width: 30%;\n\t\t  }\n\t\t  .py-pos,.trans-pos {\n\t\t    width: 20%;\n\t\t    overflow: hidden;\n\t\t  }\n\t\t  .py-val, .trans-val {\n\t\t    width: 30%;\n\t\t    overflow-x: auto;\n\t\t  }\n\t\t  .exc-header {\n\t      color: red;\n\t\t  }\n\t\t  .collapsed {\n\t\t    display: None;\n\t\t  }\n\t\t</style>\n\t\t';
							f.write (cssOut);
						});},
						get _writeStatusHeaderTemplate () {return __get__ (this, function (self, f) {
							f.write ('<b>Status:</b>\n');
							f.write ('<div id="{}"></div><br><br>\n\n'.format (messageDivId));
						});},
						get _writeTableArea () {return __get__ (this, function (self, f) {
							f.write ('<div id="{}"></div>'.format (excAreaId));
							f.write ('<div id="{}">'.format (resultsDivId));
							f.write ('<div> <a id="{}" href="#"> Collapse All</a> <a id="{}" href="#">Expand All</a></div>'.format (forceCollapseId, forceExpandId));
							f.write ('<table id="{}"><thead><tr> <th colspan="2"> CPython </th> <th colspan="2"> Transcrypt </th> </tr>'.format (tableId));
							f.write ('<tr> <th class="header-pos"> Location </th> <th class="header-val"> Value </th> <th class="header-val"> Value </th> <th class="header-pos"> Location </th> </tr></thead><tbody></tbody>');
							f.write ('</table>');
							f.write ('</div>');
						});}
					});
					var DataConverter = __class__ ('DataConverter', [object], {
						get writeHiddenResults () {return __get__ (this, function (self, f, refDict) {
							f.write ('<div id="{}" style="display: None">'.format (referenceDivId));
							for (var key of refDict.py_keys ()) {
								var itemData = ' | '.join (function () {
									var __accu0__ = [];
									for (var x of refDict [key]) {
										__accu0__.append (x [1]);
									}
									return __accu0__;
								} ());
								var posContent = ' | '.join (function () {
									var __accu0__ = [];
									for (var x of refDict [key]) {
										__accu0__.append (x [0]);
									}
									return __accu0__;
								} ());
								f.write ('<div id="{}">\n'.format (key));
								f.write ('<div id="{}">{}</div>\n\n'.format (refResultDivId, itemData));
								f.write ('<div id="{}">{}</div>\n'.format (refPosDivId, posContent));
								f.write ('</div>\n');
							}
							f.write ('</div></div>\n');
						});},
						get getPythonResults () {return __get__ (this, function (self) {
							var refData = document.getElementById (referenceDivId);
							var refDict = dict ({});
							for (var child of refData.children) {
								var keyName = child.getAttribute ('id');
								var __left0__ = self._extractPosResult (child);
								var posData = __left0__ [0];
								var resultData = __left0__ [1];
								refDict [keyName] = zip (posData, resultData);
							}
							return refDict;
						});},
						get _extractPosResult () {return __get__ (this, function (self, elem) {
							var resultData = null;
							var posData = null;
							for (var e of elem.children) {
								var idStr = e.getAttribute ('id');
								if (idStr == refResultDivId) {
									var resultData = e.innerHTML.py_split (' | ');
								}
								else if (idStr == refPosDivId) {
									var posData = e.innerHTML.py_split (' | ');
								}
								else {
									// pass;
								}
							}
							return tuple ([posData, resultData]);
						});}
					});
					var getRowClsName = function (py_name) {
						return 'mod-' + py_name;
					};
					var JSTesterUI = __class__ ('JSTesterUI', [object], {
						get __init__ () {return __get__ (this, function (self) {
							self.expander = TestModuleExpander ();
						});},
						get setOutputStatus () {return __get__ (this, function (self, success) {
							if (success) {
								document.getElementById (messageDivId).innerHTML = '<div style="color: {}">Test succeeded</div>'.format (okColor);
							}
							else {
								document.getElementById (messageDivId).innerHTML = '<div style="color: {}"><b>Test failed</b></div>'.format (errorColor);
							}
						});},
						get appendSeqRowName () {return __get__ (this, function (self, py_name, errCount) {
							var table = document.getElementById (tableId);
							var row = table.insertRow (-(1));
							row.id = py_name;
							row.classList.add (testletHeaderClass);
							self.expander.setupCollapseableHeader (row, errCount == 0);
							var headerCell = row.insertCell (0);
							headerCell.innerHTML = (py_name + ' | Errors = ') + str (errCount);
							headerCell.colSpan = 4;
							headerCell.style.textAlign = 'center';
						});},
						get appendTableResult () {return __get__ (this, function (self, py_name, testPos, testItem, refPos, refItem, collapse) {
							if (typeof collapse == 'undefined' || (collapse != null && collapse .hasOwnProperty ("__kwargtrans__"))) {;
								var collapse = false;
							};
							var clsName = getRowClsName (py_name);
							var table = document.getElementById (tableId);
							var row = table.insertRow (-(1));
							row.classList.add (clsName);
							if (testItem != refItem) {
								row.classList.add (faultRowClass);
								var refPos = '!!!' + refPos;
							}
							else {
								self.expander.setCollapsed (row, collapse);
							}
							var cpy_pos = row.insertCell (0);
							cpy_pos.innerHTML = refPos;
							cpy_pos.classList.add (pyPosClass);
							var cpy_val = row.insertCell (1);
							cpy_val.innerHTML = refItem;
							cpy_val.classList.add (pyValClass);
							var trans_val = row.insertCell (2);
							if (testItem !== null) {
								trans_val.innerHTML = testItem;
							}
							trans_val.classList.add (transValClass);
							var trans_pos = row.insertCell (3);
							if (testPos !== null) {
								trans_pos.innerHTML = testPos;
							}
							trans_pos.classList.add (transPosClass);
						});},
						get showException () {return __get__ (this, function (self, testname, exc) {
							var excElem = document.getElementById (excAreaId);
							var header = document.createElement ('H2');
							header.classList.add (excHeaderClass);
							header.innerHTML = 'Exception Thrown in JS Runtime';
							excElem.appendChild (header);
							var content = document.createElement ('p');
							content.innerHTML = 'Exception in {}: {}'.format (testname, str (exc));
							excElem.appendChild (content);
							var stacktrace = document.createElement ('p');
							if (exc.stack !== null) {
								stacktrace.innerHTML = str (exc.stack);
							}
							else {
								stacktrace.innerHTML = 'No Stack Trace Available!';
							}
						});}
					});
					var TestModuleExpander = __class__ ('TestModuleExpander', [object], {
						get __init__ () {return __get__ (this, function (self) {
							self.collapsedClass = 'collapsed';
							self.modCollapseClass = 'mod-collapsed';
							self._expandCollapseAllFuncs ();
						});},
						get setCollapsed () {return __get__ (this, function (self, row, collapse) {
							if (collapse) {
								row.classList.add (self.collapsedClass);
							}
							else {
								row.classList.remove (self.collapsedClass);
							}
						});},
						get setupCollapseableHeader () {return __get__ (this, function (self, row, startCollapsed) {
							if (typeof startCollapsed == 'undefined' || (startCollapsed != null && startCollapsed .hasOwnProperty ("__kwargtrans__"))) {;
								var startCollapsed = false;
							};
							if (startCollapsed) {
								row.classList.add (self.modCollapseClass);
							}
							var toggleCollapse = function (evt) {
								var headerRow = evt.target.parentElement;
								var doCollapse = !(headerRow.classList.contains (self.modCollapseClass));
								self.collapseModule (headerRow, doCollapse);
							};
							row.onclick = toggleCollapse;
						});},
						get collapseModule () {return __get__ (this, function (self, headerRow, doCollapse) {
							var py_name = headerRow.id;
							var table = document.getElementById (tableId);
							var clsName = getRowClsName (py_name);
							var allRows = table.tHead.children;
							var rows = filter ((function __lambda__ (x) {
								return x.classList.contains (clsName);
							}), allRows);
							for (var row of rows) {
								self.setCollapsed (row, doCollapse);
							}
							if (doCollapse) {
								headerRow.classList.add (self.modCollapseClass);
							}
							else {
								headerRow.classList.remove (self.modCollapseClass);
							}
						});},
						get _expandCollapseAllFuncs () {return __get__ (this, function (self) {
							var applyToAll = function (evt, collapse) {
								var table = document.getElementById (tableId);
								var filtFunc = (function __lambda__ (x) {
									return x.classList.contains (testletHeaderClass);
								});
								var headerRows = filter (filtFunc, table.tHead.children);
								for (var headerRow of headerRows) {
									self.collapseModule (headerRow, collapse);
								}
							};
							var collapseAll = function (evt) {
								evt.preventDefault ();
								applyToAll (evt, true);
								return false;
							};
							var expandAll = function (evt) {
								evt.preventDefault ();
								applyToAll (evt, false);
								return false;
							};
							var forceCollapse = document.getElementById (forceCollapseId);
							forceCollapse.onclick = collapseAll;
							var forceExpand = document.getElementById (forceExpandId);
							forceExpand.onclick = expandAll;
						});}
					});
					__pragma__ ('<all>')
						__all__.DataConverter = DataConverter;
						__all__.HTMLGenerator = HTMLGenerator;
						__all__.JSTesterUI = JSTesterUI;
						__all__.TestModuleExpander = TestModuleExpander;
						__all__.errorColor = errorColor;
						__all__.excAreaId = excAreaId;
						__all__.excHeaderClass = excHeaderClass;
						__all__.faultRowClass = faultRowClass;
						__all__.forceCollapseId = forceCollapseId;
						__all__.forceExpandId = forceExpandId;
						__all__.getRowClsName = getRowClsName;
						__all__.highlightColor = highlightColor;
						__all__.messageDivId = messageDivId;
						__all__.okColor = okColor;
						__all__.pyPosClass = pyPosClass;
						__all__.pyValClass = pyValClass;
						__all__.refPosDivId = refPosDivId;
						__all__.refResultDivId = refResultDivId;
						__all__.referenceDivId = referenceDivId;
						__all__.resultsDivId = resultsDivId;
						__all__.tableId = tableId;
						__all__.testDivId = testDivId;
						__all__.testletHeaderClass = testletHeaderClass;
						__all__.testletNameColor = testletNameColor;
						__all__.transPosClass = transPosClass;
						__all__.transValClass = transValClass;
					__pragma__ ('</all>')
				}
			}
		}
	);
