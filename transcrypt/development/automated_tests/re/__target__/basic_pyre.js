// Transcrypt'ed from Python, 2018-04-05 23:13:31
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var re = {};
var __name__ = 'basic_pyre';
import * as __module_re__ from './re.js';
__nest__ (re, '', __module_re__);
import {testStr1, testStr2, testStr3, testStr4, checkMatchProperties, checkRegexProperties, aValue, checkFlagsExist, escapeTests, checkIgnoreCase, checkSearchWithGroups, checkMatchOps, checkMatchWithNamedGroups, checkMatchWithGroups, checkCommentGroup, checkFullMatchOps, checkFindAllOps, checkSplitOps, checkSubOps, checkSyntaxErrors, checkFindIter, checkWithFlags, checkConditionalGroups} from './basictests.js';
export var run = function (test) {
	checkFlagsExist (test);
	escapeTests (test);
	checkMatchProperties (test);
	checkRegexProperties (test);
	checkIgnoreCase (test);
	checkSearchWithGroups (test);
	checkMatchOps (test);
	checkMatchWithGroups (test);
	checkFullMatchOps (test);
	checkFindAllOps (test);
	checkSplitOps (test);
	checkSubOps (test);
	checkSyntaxErrors (test);
	checkConditionalGroups (test);
	checkCommentGroup (test);
	checkWithFlags (test);
	checkFindIter (test);
};

//# sourceMappingURL=basic_pyre.map