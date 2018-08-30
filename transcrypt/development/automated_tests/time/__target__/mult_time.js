// Transcrypt'ed from Python, 2018-08-28 20:47:52
var time = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
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