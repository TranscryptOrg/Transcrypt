// Transcrypt'ed from Python, 2018-04-07 19:09:12
var re = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __globals__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __merge__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setProperty__, __setitem__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {testStr1, testStr2, testStr3, testStr4, checkMatchProperties, checkRegexProperties, aValue, checkFlagsExist, escapeTests, checkIgnoreCase, checkSearchWithGroups, checkMatchOps, checkMatchWithNamedGroups, checkMatchWithGroups, checkCommentGroup, checkFullMatchOps, checkFindAllOps, checkSplitOps, checkSubOps, checkSyntaxErrors, checkFindIter, checkWithFlags, checkConditionalGroups} from './basictests.js';
import * as __module_re__ from './re.js';
__nest__ (re, '', __module_re__);
var __name__ = 'basic_jsre';
export var run = function (test) {
	checkFlagsExist (test);
	escapeTests (test);
	checkMatchProperties (test, re.JSSTRICT);
	checkRegexProperties (test, re.JSSTRICT);
	checkIgnoreCase (test, re.JSSTRICT);
	checkSearchWithGroups (test, re.JSSTRICT);
	checkMatchOps (test, re.JSSTRICT);
	checkMatchWithGroups (test, re.JSSTRICT);
	checkFullMatchOps (test, re.JSSTRICT);
	checkFindAllOps (test, re.JSSTRICT);
	checkSplitOps (test, re.JSSTRICT);
	checkSubOps (test, re.JSSTRICT);
	checkSyntaxErrors (test, re.JSSTRICT);
	checkFindIter (test, re.JSSTRICT);
};

//# sourceMappingURL=basic_jsre.map