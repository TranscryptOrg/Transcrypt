// Transcrypt'ed from Python, 2021-05-14 15:00:26
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get DataConverter () {return DataConverter;}, set DataConverter (value) {DataConverter = value;}, get HTMLGenerator () {return HTMLGenerator;}, set HTMLGenerator (value) {HTMLGenerator = value;}, get JSTesterUI () {return JSTesterUI;}, set JSTesterUI (value) {JSTesterUI = value;}, get TestModuleExpander () {return TestModuleExpander;}, set TestModuleExpander (value) {TestModuleExpander = value;}, get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get errorColor () {return errorColor;}, set errorColor (value) {errorColor = value;}, get excAreaId () {return excAreaId;}, set excAreaId (value) {excAreaId = value;}, get excHeaderClass () {return excHeaderClass;}, set excHeaderClass (value) {excHeaderClass = value;}, get faultRowClass () {return faultRowClass;}, set faultRowClass (value) {faultRowClass = value;}, get forceCollapseId () {return forceCollapseId;}, set forceCollapseId (value) {forceCollapseId = value;}, get forceExpandId () {return forceExpandId;}, set forceExpandId (value) {forceExpandId = value;}, get getRowClsName () {return getRowClsName;}, set getRowClsName (value) {getRowClsName = value;}, get highlightColor () {return highlightColor;}, set highlightColor (value) {highlightColor = value;}, get itemsAreEqual () {return itemsAreEqual;}, set itemsAreEqual (value) {itemsAreEqual = value;}, get messageDivId () {return messageDivId;}, set messageDivId (value) {messageDivId = value;}, get okColor () {return okColor;}, set okColor (value) {okColor = value;}, get pyPosClass () {return pyPosClass;}, set pyPosClass (value) {pyPosClass = value;}, get pyValClass () {return pyValClass;}, set pyValClass (value) {pyValClass = value;}, get refPosDivId () {return refPosDivId;}, set refPosDivId (value) {refPosDivId = value;}, get refResultDivId () {return refResultDivId;}, set refResultDivId (value) {refResultDivId = value;}, get referenceDivId () {return referenceDivId;}, set referenceDivId (value) {referenceDivId = value;}, get resultsDivId () {return resultsDivId;}, set resultsDivId (value) {resultsDivId = value;}, get tableId () {return tableId;}, set tableId (value) {tableId = value;}, get testDivId () {return testDivId;}, set testDivId (value) {testDivId = value;}, get testletHeaderClass () {return testletHeaderClass;}, set testletHeaderClass (value) {testletHeaderClass = value;}, get testletNameColor () {return testletNameColor;}, set testletNameColor (value) {testletNameColor = value;}, get transPosClass () {return transPosClass;}, set transPosClass (value) {transPosClass = value;}, get transValClass () {return transValClass;}, set transValClass (value) {transValClass = value;}});
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
export var itemsAreEqual = function (item0, item1) {
	return ' '.join (item0.py_split ()) == ' '.join (item1.py_split ());
};
export var HTMLGenerator =  __class__ ('HTMLGenerator', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, filenameBase) {
		if (typeof filenameBase == 'undefined' || (filenameBase != null && filenameBase.hasOwnProperty ("__kwargtrans__"))) {;
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
		var f = open (fname, 'w', __kwargtrans__ ({encoding: 'UTF-8'}));
		try {
			f.__enter__ ();
			f.write ("<html><head><meta charset = 'UTF-8'>");
			self._writeCSS (f);
			f.write ('</head><body>');
			self._writeStatusHeaderTemplate (f);
			var dc = DataConverter ();
			dc.writeHiddenResults (f, refDict);
			self._writeTableArea (f);
			f.write ('<script type="module" src="{}"></script>\n\n'.format (jsPath));
			f.write ('</body></html>');
			f.__exit__ ();
		}
		catch (__except0__) {
			if (! (f.__exit__ (__except0__.name, __except0__, __except0__.stack))) {
				throw __except0__;
			}
		}
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
		if (typeof collapse == 'undefined' || (collapse != null && collapse.hasOwnProperty ("__kwargtrans__"))) {;
			var collapse = false;
		};
		var clsName = getRowClsName (py_name);
		var table = document.getElementById (tableId);
		var row = table.insertRow (-(1));
		row.classList.add (clsName);
		if (!(itemsAreEqual (testItem, refItem))) {
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
		if (typeof startCollapsed == 'undefined' || (startCollapsed != null && startCollapsed.hasOwnProperty ("__kwargtrans__"))) {;
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