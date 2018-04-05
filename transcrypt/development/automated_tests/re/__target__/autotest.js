// Transcrypt'ed from Python, 2018-04-05 23:13:30
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var basic_jsre = {};
var basic_pyre = {};
var org = {};
var __name__ = '__main__';
import * as __module_org_transcrypt_autotester__ from './org.transcrypt.autotester.js';
__nest__ (org, 'transcrypt.autotester', __module_org_transcrypt_autotester__);
import * as __module_basic_pyre__ from './basic_pyre.js';
__nest__ (basic_pyre, '', __module_basic_pyre__);
import * as __module_basic_jsre__ from './basic_jsre.js';
__nest__ (basic_jsre, '', __module_basic_jsre__);
export var autoTester = org.transcrypt.autotester.AutoTester ();
autoTester.run (basic_jsre, 'Basic JS RE Tests');
autoTester.run (basic_pyre, 'Basic Python RE Tests');
autoTester.done ();

//# sourceMappingURL=autotest.map