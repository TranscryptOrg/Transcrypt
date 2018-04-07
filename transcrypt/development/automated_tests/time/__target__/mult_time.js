// Transcrypt'ed from Python, 2018-04-07 16:09:41
var time = {};
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
import * as __module_time__ from './time.js';
__nest__ (time, '', __module_time__);
var __name__ = 'mult_time';
export var run = function (autoTester) {
	var t = list ([2000, 1, 1, 1, 1, 1, 1, 1, 0]);
	var check = function (fmt) {
		var s = time.mktime (tuple (t));
		autoTester.check ('gmtime', tuple (time.gmtime (int (s))));
		autoTester.check ('localtime', tuple (time.localtime (int (s))));
		autoTester.check ('mktime', int (s));
		autoTester.check ('ctime', int (s));
	};
	for (var hour of tuple ([0, 1, 12, 14, 23])) {
		t [3] = hour;
		for (var f of tuple (['%p %I.%d.%Y', '%b .%d.%y', '%b .%d.%Y', '%d%m%Y%H:%M:%S%p', '%b .%d.%Y', 'M%m.%d.%Y', '%m.%d.%Y', '%m.%d.%Y', '%b .%d.%Y', '%m.%d.%Y', '%B %d.%Y', '%a %b %d %H:%M:%S %Y', '%d.%m.%Y %I:%M:%S%p', '%a%b %d %H:%M:%S %Y', '%a%b%d %H:%M:%S %Y', '%a%b%d%H:%Mx%S%Y', '%a%b%d%H:%Mxx%S%Y', '%a%b%d%H:%Mxx%S%Y +000', ' %a%b%d%H:%Mxx%S%Y +000 '])) {
			check (f);
		}
	}
	autoTester.check ('asctime', t);
};

//# sourceMappingURL=mult_time.map