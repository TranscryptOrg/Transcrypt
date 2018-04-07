// Transcrypt'ed from Python, 2018-04-07 19:09:09
var time = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __globals__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __merge__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setProperty__, __setitem__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
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