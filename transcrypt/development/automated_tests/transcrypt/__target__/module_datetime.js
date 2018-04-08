// Transcrypt'ed from Python, 2018-04-08 11:00:00
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __globals__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __merge__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setProperty__, __setitem__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {date, timedelta, datetime, timezone} from './datetime.js';
var __name__ = 'module_datetime';
export var fix_time = function (dt) {
	if (__gt__ (dt.hour, 23)) {
		var dt = __sub__ (dt, __call__ (timedelta, null, __kwargtrans__ ({minutes: 60})));
	}
	if (__gt__ (dt.minute, 50)) {
		var dt = __sub__ (dt, __call__ (timedelta, null, __kwargtrans__ ({minutes: 10})));
	}
	return dt;
};
export var run = function (autoTester) {
	var tz = timezone.utc;
	__call__ (autoTester.check, autoTester, __call__ (repr, null, tz));
	var tz2 = __call__ (timezone, null, __call__ (timedelta, null, __kwargtrans__ ({hours: __neg__ (5)})), 'EST');
	__call__ (autoTester.check, autoTester, __call__ (repr, null, tz2));
	var now = __call__ (fix_time, null, __call__ (datetime.utcnow, datetime));
	var now2 = __call__ (fix_time, null, __call__ (datetime.now, datetime, timezone.utc));
	__call__ (autoTester.check, autoTester, __eq__ (now.day, now2.day));
	__call__ (autoTester.check, autoTester, __eq__ (now.hour, now2.hour));
	__call__ (autoTester.check, autoTester, __call__ (__call__ (now.py_replace, now, __kwargtrans__ ({tzinfo: timezone.utc})).astimezone, __call__ (now.py_replace, now, __kwargtrans__ ({tzinfo: timezone.utc})), __kwargtrans__ ({tz: null})).hour);
	var delta = __call__ (timedelta, null, __kwargtrans__ ({days: 8, minutes: 15, microseconds: 685}));
	var delta2 = __call__ (timedelta, null, __kwargtrans__ ({days: 8, minutes: 15, microseconds: 684}));
	__call__ (autoTester.check, autoTester, delta);
	__call__ (autoTester.check, autoTester, delta2);
	__call__ (autoTester.check, autoTester, __eq__ (delta, delta2));
	__call__ (autoTester.check, autoTester, __gt__ (delta, delta2));
	__call__ (autoTester.check, autoTester, __lt__ (delta, delta2));
	var d = __call__ (date, null, 2017, 5, 5);
	__call__ (autoTester.check, autoTester, d.day);
	var d = __call__ (date.today, date);
	__call__ (autoTester.check, autoTester, d);
	__call__ (autoTester.check, autoTester, d.day);
	__call__ (autoTester.check, autoTester, __call__ (d.weekday, d));
	__call__ (autoTester.check, autoTester, __call__ (d.isoweekday, d));
	__call__ (autoTester.check, autoTester, __call__ (d.isocalendar, d));
	__call__ (autoTester.check, autoTester, __call__ (d.ctime, d));
	var d = __call__ (d.py_replace, d, __kwargtrans__ ({day: 28}));
	__call__ (autoTester.check, autoTester, d.day);
	__call__ (autoTester.check, autoTester, __call__ (d.strftime, d, '%Y.%m.%d'));
	__call__ (autoTester.check, autoTester, __call__ (d.ctime, d));
	__call__ (autoTester.check, autoTester, __call__ (d.isoformat, d));
	var d2 = __add__ (d, delta);
	var d3 = __sub__ (d2, delta);
	__call__ (autoTester.check, autoTester, d);
	__call__ (autoTester.check, autoTester, d2);
	__call__ (autoTester.check, autoTester, d3);
	__call__ (autoTester.check, autoTester, __eq__ (d, d3));
	__call__ (autoTester.check, autoTester, __gt__ (d, d3));
	__call__ (autoTester.check, autoTester, __lt__ (d, d3));
	__call__ (autoTester.check, autoTester, __eq__ (d, d2));
	__call__ (autoTester.check, autoTester, __gt__ (d, d2));
	__call__ (autoTester.check, autoTester, __lt__ (d, d2));
	var now = __call__ (fix_time, null, __call__ (datetime.now, datetime));
	__call__ (autoTester.check, autoTester, now.day);
	__call__ (autoTester.check, autoTester, now.hour);
	__call__ (autoTester.check, autoTester, (__add__ (now, __call__ (timedelta, null, __kwargtrans__ ({days: 2})))).day);
	var d = __call__ (datetime, null, 2010, 1, 1, __kwargtrans__ ({tzinfo: timezone.utc}));
	__call__ (autoTester.check, autoTester, d);
	var d = __call__ (datetime, null, 2017, 9, 19, 15, 43, 8, 142);
	__call__ (autoTester.check, autoTester, d);
	__call__ (autoTester.check, autoTester, __sub__ (d, __call__ (timedelta, null, __kwargtrans__ ({minutes: 150}))));
	var d = __call__ (datetime.strptime, datetime, '2017-03-14 15:28:14', '%Y-%m-%d %H:%M:%S');
	__call__ (autoTester.check, autoTester, d);
	__call__ (autoTester.check, autoTester, __call__ (d.strftime, d, '%Y.%m.%d %H:%M:%S'));
	var d = __add__ (d, __call__ (timedelta, null, __kwargtrans__ ({hours: 5, minutes: 18, seconds: 25})));
	__call__ (autoTester.check, autoTester, __call__ (d.strftime, d, '%Y-%m-%d %H:%M:%S'));
	var d = __call__ (d.py_replace, d, __kwargtrans__ ({year: 2016, month: 1}));
	__call__ (autoTester.check, autoTester, __call__ (d.ctime, d));
	__call__ (autoTester.check, autoTester, __call__ (d.isoformat, d));
	__call__ (autoTester.check, autoTester, __call__ (d.date, d));
	__call__ (autoTester.check, autoTester, __call__ (d.time, d));
	__call__ (autoTester.check, autoTester, __call__ (tuple, null, __call__ (d.timetuple, d)));
	__call__ (autoTester.check, autoTester, __call__ (tuple, null, __call__ (d.utctimetuple, d)));
	var d2 = __add__ (d, delta);
	var d3 = __sub__ (d2, delta);
	__call__ (autoTester.check, autoTester, d);
	__call__ (autoTester.check, autoTester, d2);
	__call__ (autoTester.check, autoTester, d3);
	__call__ (autoTester.check, autoTester, __eq__ (d, d3));
	__call__ (autoTester.check, autoTester, __gt__ (d, d3));
	__call__ (autoTester.check, autoTester, __lt__ (d, d3));
	__call__ (autoTester.check, autoTester, __eq__ (d, d2));
	__call__ (autoTester.check, autoTester, __gt__ (d, d2));
	__call__ (autoTester.check, autoTester, __lt__ (d, d2));
};
export {};

//# sourceMappingURL=module_datetime.map