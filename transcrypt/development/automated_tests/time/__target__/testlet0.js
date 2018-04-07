// Transcrypt'ed from Python, 2018-04-07 19:09:08
var time = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __globals__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __merge__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setProperty__, __setitem__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as __module_time__ from './time.js';
__nest__ (time, '', __module_time__);
var __name__ = 'testlet0';
export var ts = 1468968009.638596;
export var hy = (6 * 30) * 86400;
export var run = function (autoTester) {
	var c = autoTester.check;
	c ('time():', int (time.time () / 1000));
	c ('altzone:', time.altzone);
	c ('timelen:', len (str (int (time.time ()))));
	c ('localtime:', list (time.localtime (ts)));
	c ('ltime_no_dst:', list (time.localtime (ts + hy)));
	c ('gmtime:', list (time.gmtime (ts)));
	c ('daylight:', bool (time.daylight));
	c ('timezone:', time.timezone);
	c ('tzname:', time.tzname);
};

//# sourceMappingURL=testlet0.map