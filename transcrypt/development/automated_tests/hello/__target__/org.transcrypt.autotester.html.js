// Transcrypt'ed from Python, 2018-04-07 16:09:24
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var __name__ = 'org.transcrypt.autotester.html';
export var okColor = 'green';
export var errorColor = 'red';
export var highlightColor = 'yellow';
export var testletNameColor = 'blue';
export var messageDivId = 'message';
export var referenceDivId = 'python';
export var refResultDivId = 'pyresults';
export var refPosDivId = 'pypos';
export var testDivId = 'transcrypt';
export var tableId = 'resulttable';
export var resultsDivId = 'results';
export var faultRowClass = 'faultrow';
export var testletHeaderClass = 'testletheader';
export var transValClass = 'trans-val';
export var transPosClass = 'trans-pos';
export var pyValClass = 'py-val';
export var pyPosClass = 'py-pos';
export var excAreaId = 'exc-area';
export var excHeaderClass = 'exc-header';
export var forceCollapseId = 'force-collapse';
export var forceExpandId = 'force-expand';

export var HTMLGenerator =  __class__ ('HTMLGenerator', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, filenameBase) {
		if (typeof filenameBase == 'undefined' || (filenameBase != null && filenameBase .hasOwnProperty ("__kwargtrans__"))) {;
			var filenameBase = null;
		};
		self._fnameBase = filenameBase;
	});},
	get generate_html () {return __get__ (this, function (self, refDict) {
		var minified = false;
		if (self._fnameBase === null) {
			var __except0__ = ValueError ('Filename Base must be defined to generate');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var fname = self._fnameBase + '.html';
		print ('Generating {}'.format (fname));
		var jsPath = '__target__/{}.js'.format (self._fnameBase.py_split ('/') [-(1)]);
		f = open (fname, 'w');
		f.write ('<html><head>');
		self._writeCSS (f);
		f.write ('</head><body>');
		self._writeStatusHeaderTemplate (f);
		var dc = DataConverter ();
		dc.writeHiddenResults (f, refDict);
		self._writeTableArea (f);
		f.write ('<script type="module" src="{}"></script>\n\n'.format (jsPath));
		f.write ('</body></html>');
		f.close ();
	});},
	get _writeCSS () {return __get__ (this, function (self, f) {
		var cssOut = '\n        <style>\n          body {\n            max-width: 100%;\n          }\n          .faultrow > td {\n             background-color: LightCoral;\n          }\n          #resulttable {\n            border-collapse: collapse;\n            width: 100%;\n            table-layout: fixed;\n          }\n          #resulttable th, #resulttable td {\n            border: 1px solid grey;\n          }\n          .testletheader > td {\n            background-color: LightSkyBlue;\n          }\n          .header-pos {\n            width: 20%;\n          }\n          .header-val {\n            width: 30%;\n          }\n          .py-pos,.trans-pos {\n            width: 20%;\n            overflow: hidden;\n          }\n          .py-val, .trans-val {\n            width: 30%;\n            overflow-x: auto;\n          }\n          .exc-header {\n          color: red;\n          }\n          .collapsed {\n            display: None;\n          }\n        </style>\n        ';
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

export var DataConverter =  __class__ ('DataConverter', [object], {
	__module__: __name__,
	get writeHiddenResults () {return __get__ (this, function (self, f, refDict) {
		f.write ('<div id="{}" style="display: None">'.format (referenceDivId));
		for (var key of refDict.py_keys ()) {
			var itemData = ' | '.join ((function () {
				var __accu0__ = [];
				for (var x of refDict [key]) {
					__accu0__.append (x [1]);
				}
				return __accu0__;
			}) ());
			var posContent = ' | '.join ((function () {
				var __accu0__ = [];
				for (var x of refDict [key]) {
					__accu0__.append (x [0]);
				}
				return __accu0__;
			}) ());
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
export var getRowClsName = function (py_name) {
	return 'mod-' + py_name;
};

export var JSTesterUI =  __class__ ('JSTesterUI', [object], {
	__module__: __name__,
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

export var TestModuleExpander =  __class__ ('TestModuleExpander', [object], {
	__module__: __name__,
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

//# sourceMappingURL=org.transcrypt.autotester.html.map