// Transcrypt'ed from Python, 2018-04-05 23:13:32
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var re = {};
var __name__ = 'basictests';
import * as __module_re__ from './re.js';
__nest__ (re, '', __module_re__);
export var testStr1 = 'There,is,No,Time';
export var testStr2 = 'som[23] In[23423] the[34].asd[934].234.';
export var testStr3 = 's(43) d(03) asdfasd dsfsd(3) sd';
export var testStr4 = 'Were an apple like an orange then apple orange no appleorange';
export var checkMatchProperties = function (test, flags) {
	if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
		var flags = 0;
	};
	var result = re.search (',', testStr1, flags);
	if (result !== null) {
		test.check (result.pos);
		test.check (result.endpos);
		test.check (result.group ());
		test.check (result.group (0));
		test.check (result.string);
		var assignPos = function () {
			result.pos = 1;
		};
		test.check (test.expectException (assignPos));
		var assignEndPos = function () {
			result.endpos = 1;
		};
		test.check (test.expectException (assignEndPos));
		var assignRe = function () {
			result.re = 'asdfasdf';
		};
		test.check (test.expectException (assignRe));
		var assignStr = function () {
			result.string = 'asdf';
		};
		test.check (test.expectException (assignStr));
		var assignLastGroup = function () {
			result.lastgroup = 'asdfasdf';
		};
		test.check (test.expectException (assignLastGroup));
		var assignLastIndex = function () {
			result.lastindex = 33;
		};
		test.check (test.expectException (assignLastIndex));
	}
	else {
		test.checkPad ('NULL', 11);
	}
};
export var checkRegexProperties = function (test, flags) {
	if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
		var flags = 0;
	};
	var r = re.compile (',', flags);
	if (r !== null) {
		test.check (r.groups);
		test.check (r.pattern);
		test.check (r.flags);
		var d = r.groupindex;
		test.check (d);
		var assignPattern = function () {
			r.pattern = 'asdfasdf';
		};
		test.check (test.expectException (assignPattern));
		var assignFlags = function () {
			r.flags = 'wer';
		};
		test.check (test.expectException (assignFlags));
		var assignGroups = function () {
			r.groups = 1;
		};
		test.check (test.expectException (assignGroups));
		var assignGroupIndex = function () {
			r.groupindex = 34;
		};
		test.check (test.expectException (assignGroupIndex));
	}
	else {
		test.checkPad ('NULL', 8);
	}
};
export var aValue = function (flag) {
	var result = flag.value;
	return (result ? result : flag);
};
export var checkFlagsExist = function (test) {
	test.check (aValue (re.T));
	test.check (aValue (re.I));
	test.check (aValue (re.IGNORECASE));
	test.check (aValue (re.M));
	test.check (aValue (re.MULTILINE));
	test.check (aValue (re.S));
	test.check (aValue (re.DOTALL));
	test.check (aValue (re.U));
	test.check (aValue (re.UNICODE));
	test.check (aValue (re.X));
	test.check (aValue (re.VERBOSE));
	test.check (aValue (re.A));
	test.check (aValue (re.ASCII));
};
export var escapeTests = function (test) {
	test.check (re.escape ('buf[34]'));
	test.check (re.escape ('C:\\asdf\\wewer\\'));
	test.check (re.escape ('func(int a) { return(3)};'));
};
export var checkIgnoreCase = function (test, flags) {
	if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
		var flags = 0;
	};
	test.check (re.search ('as', testStr3, flags | re.I).pos);
	test.check (re.search ('as', testStr3, flags | re.I).endpos);
	test.check (re.search ('as', testStr3, flags | re.I).group ());
	test.check (re.search ('as', testStr3, flags | re.I).group (0));
	test.check (re.search ('AS', testStr3, flags | re.I).pos);
	test.check (re.search ('AS', testStr3, flags | re.I).endpos);
	test.check (re.search ('AS', testStr3, flags | re.I).group ());
	test.check (re.search ('AS', testStr3, flags | re.I).group (0));
};
export var checkSearchWithGroups = function (test, flags) {
	if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
		var flags = 0;
	};
	var r = '\\[([\\d]+)\\]';
	test.check (re.compile (r, flags).groups);
	test.check (re.search (r, testStr2, flags).pos);
	test.check (re.search (r, testStr2, flags).endpos);
	test.check (re.search (r, testStr2, flags).groups ());
	test.check (re.search (r, testStr2, flags).group ());
	test.checkEval ((function __lambda__ () {
		return re.search (r, testStr2, flags).group (0);
	}));
	test.checkEval ((function __lambda__ () {
		return re.search (r, testStr2, flags).group (1);
	}));
	test.check (re.search (r, testStr2, flags).start ());
	test.checkEval ((function __lambda__ () {
		return re.search (r, testStr2, flags).start (0);
	}));
	test.checkEval ((function __lambda__ () {
		return re.search (r, testStr2, flags).start (1);
	}));
	test.check (re.search (r, testStr2, flags).end ());
	test.checkEval ((function __lambda__ () {
		return re.search (r, testStr2, flags).end (0);
	}));
	test.checkEval ((function __lambda__ () {
		return re.search (r, testStr2, flags).end (1);
	}));
	test.check (re.search (r, testStr2, flags).span ());
	test.checkEval ((function __lambda__ () {
		return re.search (r, testStr2, flags).span (0);
	}));
	test.checkEval ((function __lambda__ () {
		return re.search (r, testStr2, flags).span (1);
	}));
	test.check (re.search (r, testStr2, flags).lastgroup);
	test.check (re.search (r, testStr2, flags).lastindex);
	for (var i = 2; i < 50; i++) {
		test.check (test.expectException ((function __lambda__ () {
			return re.search (',', testStr1, flags).group (i);
		})));
	}
};
export var checkMatchOps = function (test, flags) {
	if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
		var flags = 0;
	};
	test.check (re.match ('asdf', 'asdf', flags).pos);
	test.check (re.match ('asdf', 'asdf', flags).endpos);
	test.check (re.match ('asdf', 'asdf', flags).groups ());
	test.check (re.match ('a', 'asdf', flags).pos);
	test.check (re.match ('a', 'asdf', flags).endpos);
	test.check (re.match ('a', 'asdf', flags).groups ());
	test.check (re.match ('s', 'asdf', flags) === null);
	test.check (re.match ('^s', 'asdf', flags) === null);
	test.check (re.compile ('^s', flags).match ('asdf', 1) === null);
};
export var checkMatchWithNamedGroups = function (test, flags) {
	if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
		var flags = 0;
	};
	var r = null;
	try {
		var r = re.compile ('(?P<prefix>[a-zA-Z]+)://(?P<suffix>[^/]*)', flags);
	}
	catch (__except0__) {
		if (isinstance (__except0__, Exception)) {
			var exc = __except0__;
			test.checkPad (null, 15);
		}
		else {
			throw __except0__;
		}
	}
	if (r !== null) {
		test.check (r.groups);
		test.check (r.pattern);
		var d = r.groupindex;
		test.check (d);
		var m = r.match ('http://asdf');
		test.check (m.groups ());
		test.check (m.group ());
		test.check (m.group (0));
		test.check (m.group (1));
		test.check (m.group ('prefix'));
		test.check (m.group ('suffix'));
		var m = r.match ('ftp://192.168.1.1');
		test.check (m.group ());
		test.check (m.group (0));
		test.check (m.group (1));
		test.check (m.group ('prefix'));
		test.check (m.group ('suffix'));
		var m = r.match ('555-5555');
		test.check (m);
	}
	try {
		var r = re.compile ('(?P<country>\\d{1,3})-(?P<areacode>\\d{3})-(?P<number>\\d{3}-\\d{4})', flags);
	}
	catch (__except0__) {
		test.checkPad (null, 13);
	}
	if (r !== null) {
		test.check (r.groups);
		test.check (r.pattern);
		var d = r.groupindex;
		test.check (d);
		var m = r.match ('1-234-567-9012');
		test.check (m.groups ());
		test.check (m.group ());
		test.check (m.group (0));
		test.check (m.group (1));
		test.check (m.group (2));
		test.check (m.group (3));
		test.check (m.group ('country'));
		test.check (m.group ('areacode'));
		test.check (m.group ('number'));
		var m = r.match ('adfs;');
		test.check (m);
	}
};
export var checkMatchWithGroups = function (test, flags) {
	if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
		var flags = 0;
	};
	var rgx = re.compile ('(\\w)(\\w)(\\w)?', flags);
	test.check (rgx.pattern);
	test.check (rgx.groups);
	var m = rgx.match ('abc');
	if (m) {
		test.check (m.group (0));
		test.check (m.group (1));
		test.check (m.group (1, 2));
		test.check (m.group (2, 1));
	}
	else {
		test.checkPad (null, 4);
	}
	var m = rgx.match ('ab');
	if (m) {
		test.check (m.groups (0));
	}
	else {
		test.checkPad (null, 1);
	}
	var rgx = re.compile ('(?:[\\w\\s]+)\\[(\\d+)\\]', flags);
	test.check (rgx.pattern);
	test.check (rgx.groups);
	var m = rgx.match ('asdf[23]');
	if (m) {
		test.check (m.groups ());
		test.check (m.group (0));
		test.check (m.group (1));
		test.check (test.expectException ((function __lambda__ () {
			return m.group (2);
		})));
	}
	else {
		test.checkPad (null, 4);
	}
};
export var checkCommentGroup = function (test, flags) {
	if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
		var flags = 0;
	};
	var r = null;
	try {
		var r = re.compile ('a(?#foobar)b', flags);
	}
	catch (__except0__) {
		test.checkPad (null, 4);
	}
	if (r !== null) {
		test.check (r.groups);
		test.check (r.pattern);
		test.check (r.search ('ab').group ());
		test.check (r.search ('er'));
	}
	try {
		var r = re.compile ('([\\d]+)(?#blarg)\\[\\]', flags);
	}
	catch (__except0__) {
		test.checkPad (null, 4);
		return ;
	}
	test.check (r.groups);
	test.check (r.pattern);
	test.check (r.search ('1234[]').group ());
	test.check (r.search ('asdf[]'));
};
export var checkFullMatchOps = function (test, flags) {
	if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
		var flags = 0;
	};
	test.check (re.fullmatch ('asdf', 'asdf', flags).pos);
	test.check (re.fullmatch ('asdf', 'asdf', flags).endpos);
	test.check (re.fullmatch ('as', 'asdf', flags) === null);
	test.check (re.fullmatch ('q', 'asdf', flags) === null);
	test.check (re.compile ('o[gh]', flags).fullmatch ('dog') === null);
	test.check (re.compile ('o[gh]', flags).fullmatch ('ogre') === null);
	var m = re.compile ('o[gh]', flags).fullmatch ('doggie', 1, 3);
	if (m) {
		test.check (m.pos);
		test.check (m.endpos);
	}
	else {
		test.checkPad (null, 2);
	}
};
export var checkFindAllOps = function (test, flags) {
	if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
		var flags = 0;
	};
	test.check (re.findall (',', testStr1, flags));
	test.check (re.findall ('\\[([\\d]+)\\]', testStr2, flags));
	var r = '([^\\d\\s]+\\(([\\d]+)\\))';
	test.check (re.compile (r, flags).groups);
	test.check (re.findall (r, testStr3, flags));
};
export var checkSplitOps = function (test, flags) {
	if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
		var flags = 0;
	};
	test.check (re.py_split (',', testStr1, 0, flags));
	test.check (re.py_split ('(apple|orange)', testStr4, 0, flags));
	test.check (re.py_split ('\\[([\\d]+)\\]', testStr2, 0, flags));
	var r = re.compile (',', flags);
	test.check (r.py_split (testStr1, 0));
	test.check (r.py_split (testStr1, 1));
	test.check (r.py_split (testStr1, 2));
	test.check (r.py_split (testStr1, 3));
	test.check (r.py_split (testStr1, 4));
	var r = re.compile ('\\[([\\d]+)\\]', flags);
	test.check (r.py_split (testStr2, 0));
	test.check (r.py_split (testStr2, 1));
	test.check (r.py_split (testStr2, 2));
	test.check (r.py_split (testStr2, 3));
	test.check (r.py_split (testStr2, 4));
};
export var checkSubOps = function (test, flags) {
	if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
		var flags = 0;
	};
	var dashrepl = function (matchobj) {
		if (matchobj.group (0) == '-') {
			return ' ';
		}
		else {
			return '-';
		}
	};
	test.check (re.sub ('-{1,2}', dashrepl, 'pro----gram-files', 0, flags));
	test.check (re.sub ('-{1,2}', '4', 'pro----gram-files', 0, flags));
	test.check (re.subn ('-{1,2}', dashrepl, 'pro----gram-files', 0, flags));
	test.check (re.subn ('-{1,2}', '4', 'pro----gram-files', 0, flags));
};
export var checkSyntaxErrors = function (test, flags) {
	if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
		var flags = 0;
	};
	test.check (test.expectException ((function __lambda__ () {
		return re.compile (')', flags);
	})));
	test.check (test.expectException ((function __lambda__ () {
		return re.compile ('a\\', flags);
	})));
	test.check (test.expectException ((function __lambda__ () {
		return re.compile ('a[b', flags);
	})));
	test.check (test.expectException ((function __lambda__ () {
		return re.compile ('(abc', flags);
	})));
	test.check (test.expectException ((function __lambda__ () {
		return re.compile (')(', flags);
	})));
	test.check (test.expectException ((function __lambda__ () {
		return re.compile ('))', flags);
	})));
	test.check (test.expectException ((function __lambda__ () {
		return re.compile ('a[b-a]', flags);
	})));
	test.check (test.expectException ((function __lambda__ () {
		return re.compile ('*a', flags);
	})));
};
export var checkFindIter = function (test, flags) {
	if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
		var flags = 0;
	};
	var p = '\\[([\\d]+)\\]';
	var r = re.compile (p, flags);
	test.check (r.groups);
	var iret = r.finditer (testStr2);
	for (var m of iret) {
		test.check (m.pos);
		test.check (m.endpos);
		test.check (m.string);
		test.check (m.lastindex);
		test.check (m.groups ());
		test.check (m.group (0));
		test.check (m.group (1));
		test.check (test.expectException ((function __lambda__ () {
			return m.group (2);
		})));
		test.check (test.expectException ((function __lambda__ () {
			return m.group (2342);
		})));
		test.check (test.expectException ((function __lambda__ () {
			return m.group ('asdf');
		})));
		test.check (m.start (0));
		test.check (m.start (1));
		test.check (test.expectException ((function __lambda__ () {
			return m.start ('asdf');
		})));
		test.check (m.end (0));
		test.check (m.end (1));
		test.check (test.expectException ((function __lambda__ () {
			return m.end ('asdf');
		})));
	}
};
export var checkWithFlags = function (test, flags) {
	if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
		var flags = 0;
	};
	try {
		var r = re.compile ('(?i)aba', flags);
	}
	catch (__except0__) {
		test.checkPad (null, 5);
		return ;
	}
	test.check (r.groups);
	test.check (r.pattern);
	var m = r.search ('aBA');
	test.check (m.group ());
	test.check (m.groups ());
	var m = r.match ('aAa');
	test.check (m);
	var m = r.match ('ABA');
	test.check (m.group ());
	var m = r.match ('abA');
	test.check (m.group ());
};
export var checkConditionalGroups = function (test, flags) {
	if (typeof flags == 'undefined' || (flags != null && flags .hasOwnProperty ("__kwargtrans__"))) {;
		var flags = 0;
	};
	var rgx = null;
	try {
		var rgx = re.compile ('(a)?(b)?(?(1)a|c)(?(2)b)', flags);
	}
	catch (__except0__) {
		test.checkPad (null, 12);
	}
	if (rgx !== null) {
		test.check (rgx.pattern);
		test.checkEval ((function __lambda__ () {
			return rgx.match ('abab').group ();
		}));
		test.checkEval ((function __lambda__ () {
			return rgx.match ('aa').group ();
		}));
		test.checkEval ((function __lambda__ () {
			return rgx.match ('bcb').group ();
		}));
		test.checkEval ((function __lambda__ () {
			return rgx.match ('c').group ();
		}));
		test.checkEval ((function __lambda__ () {
			return rgx.match ('abcb');
		}));
		test.checkEval ((function __lambda__ () {
			return rgx.sub ('jumbo', 'ababsdf rexababwer');
		}));
		test.checkEval ((function __lambda__ () {
			return rgx.sub ('shrimp', 'shipbcb shootc aardvark');
		}));
	}
	try {
		var rgx = re.compile ('(a)?(b)?(?(1)a|c)(?(2)b|d)', flags);
	}
	catch (__except0__) {
		test.checkPad (null, 6);
		return ;
	}
	test.check (rgx.pattern);
	test.checkEval ((function __lambda__ () {
		return rgx.match ('abab').group ();
	}));
	test.checkEval ((function __lambda__ () {
		return rgx.match ('aad').group ();
	}));
	test.checkEval ((function __lambda__ () {
		return rgx.match ('bcb').group ();
	}));
	test.checkEval ((function __lambda__ () {
		return rgx.match ('bcb').group ();
	}));
};

//# sourceMappingURL=basictests.map