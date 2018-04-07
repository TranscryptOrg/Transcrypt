// Transcrypt'ed from Python, 2018-04-07 16:09:32
var div_issues = {};
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, complex, __conj__, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
import * as __module_div_issues_issue387_test1_test2__ from './div_issues.issue387.test1.test2.js';
__nest__ (div_issues, 'issue387.test1.test2', __module_div_issues_issue387_test1_test2__);
import * as __module_div_issues_issue387_test1__ from './div_issues.issue387.test1.js';
__nest__ (div_issues, 'issue387.test1', __module_div_issues_issue387_test1__);
var __name__ = 'div_issues.issue387';
export var run387 = function (autoTester) {
	autoTester.check (div_issues.issue387.test1.getReport ());
	autoTester.check ('From test: ', div_issues.issue387.test1.test2.C.__module__);
	autoTester.check (__name__);
	var D = __class__ ('D', [object], {
		__module__: __name__,
	});
	autoTester.check ('From test:', D.__module__);
	autoTester.check (D.__name__);
};
export {};

//# sourceMappingURL=div_issues.issue387.map