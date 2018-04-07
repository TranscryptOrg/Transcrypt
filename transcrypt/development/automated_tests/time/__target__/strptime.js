// Transcrypt'ed from Python, 2018-04-07 16:09:41
var time = {};
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
import * as __module_time__ from './time.js';
__nest__ (time, '', __module_time__);
var __name__ = 'strptime';
export var run = function (autoTester) {
	var check = function (t, fmt) {
		var s = tuple (time.strptime (t, fmt));
		autoTester.check (' '.join (list ([t, '[', fmt, '] = '])), s);
	};
	check ('FEb .1.1902', '%b .%d.%Y');
	check ('3112199912:00:00pm', '%d%m%Y%H:%M:%S%p');
	check ('FEb .1.1902', '%b .%d.%Y');
	check ('M1.1.1901', 'M%m.%d.%Y');
	check ('2.1.1900', '%m.%d.%Y');
	check ('6.1.2000', '%m.%d.%Y');
	check ('nov .1.1900', '%b .%d.%Y');
	check ('2.1.1900', '%m.%d.%Y');
	check ('december 1.1999', '%B %d.%Y');
	check ('Tue Jul 18 19:32:11 2016', '%a %b %d %H:%M:%S %Y');
	check ('31.12.1999 12:00:00pm', '%d.%m.%Y %I:%M:%S%p');
	check ('TueJul 18 19:32:11 2016', '%a%b %d %H:%M:%S %Y');
	check ('TueJul18 19:32:11 2016', '%a%b%d %H:%M:%S %Y');
	check ('TueJul1819:32x112016', '%a%b%d%H:%Mx%S%Y');
	check ('TueJul1819:32xx112016', '%a%b%d%H:%Mxx%S%Y');
};

//# sourceMappingURL=strptime.map