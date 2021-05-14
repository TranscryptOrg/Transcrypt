// Transcrypt'ed from Python, 2021-05-14 15:01:24
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {date, datetime, timedelta, timezone} from './datetime.js';
export {timezone, date, timedelta, datetime};
var __all__ = dict ({get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get fix_time () {return fix_time;}, set fix_time (value) {fix_time = value;}, get run () {return run;}, set run (value) {run = value;}});
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
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (repr, null, tz));
	}) ();
	var tz2 = __call__ (timezone, null, __call__ (timedelta, null, __kwargtrans__ ({hours: __neg__ (5)})), 'EST');
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (repr, null, tz2));
	}) ();
	var now = __call__ (fix_time, null, (function () {
		var __accu0__ = datetime;
		return __call__ (__accu0__.utcnow, __accu0__);
	}) ());
	var now2 = __call__ (fix_time, null, (function () {
		var __accu0__ = datetime;
		return __call__ (__accu0__.now, __accu0__, timezone.utc);
	}) ());
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __eq__ (now.day, now2.day));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __eq__ (now.hour, now2.hour));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, (function () {
			var __accu1__ = (function () {
				var __accu2__ = now;
				return __call__ (__accu2__.py_replace, __accu2__, __kwargtrans__ ({tzinfo: timezone.utc}));
			}) ();
			return __call__ (__accu1__.astimezone, __accu1__, __kwargtrans__ ({tz: null}));
		}) ().hour);
	}) ();
	var delta = __call__ (timedelta, null, __kwargtrans__ ({days: 8, minutes: 15, microseconds: 685}));
	var delta2 = __call__ (timedelta, null, __kwargtrans__ ({days: 8, minutes: 15, microseconds: 684}));
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, delta);
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, delta2);
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __eq__ (delta, delta2));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __gt__ (delta, delta2));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __lt__ (delta, delta2));
	}) ();
	var d = __call__ (date, null, 2017, 5, 5);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, d.day);
	}) ();
	var d = (function () {
		var __accu0__ = date;
		return __call__ (__accu0__.today, __accu0__);
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, d);
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, d.day);
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, (function () {
			var __accu1__ = d;
			return __call__ (__accu1__.weekday, __accu1__);
		}) ());
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, (function () {
			var __accu1__ = d;
			return __call__ (__accu1__.isoweekday, __accu1__);
		}) ());
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, (function () {
			var __accu1__ = d;
			return __call__ (__accu1__.isocalendar, __accu1__);
		}) ());
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, (function () {
			var __accu1__ = d;
			return __call__ (__accu1__.ctime, __accu1__);
		}) ());
	}) ();
	var d = (function () {
		var __accu0__ = d;
		return __call__ (__accu0__.py_replace, __accu0__, __kwargtrans__ ({day: 28}));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, d.day);
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, (function () {
			var __accu1__ = d;
			return __call__ (__accu1__.strftime, __accu1__, '%Y.%m.%d');
		}) ());
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, (function () {
			var __accu1__ = d;
			return __call__ (__accu1__.ctime, __accu1__);
		}) ());
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, (function () {
			var __accu1__ = d;
			return __call__ (__accu1__.isoformat, __accu1__);
		}) ());
	}) ();
	var d2 = __add__ (d, delta);
	var d3 = __sub__ (d2, delta);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, d);
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, d2);
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, d3);
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __eq__ (d, d3));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __gt__ (d, d3));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __lt__ (d, d3));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __eq__ (d, d2));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __gt__ (d, d2));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __lt__ (d, d2));
	}) ();
	var now = __call__ (fix_time, null, (function () {
		var __accu0__ = datetime;
		return __call__ (__accu0__.now, __accu0__);
	}) ());
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, now.day);
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, now.hour);
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, (__add__ (now, __call__ (timedelta, null, __kwargtrans__ ({days: 2})))).day);
	}) ();
	var d = __call__ (datetime, null, 2010, 1, 1, __kwargtrans__ ({tzinfo: timezone.utc}));
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, d);
	}) ();
	var d = __call__ (datetime, null, 2017, 9, 19, 15, 43, 8, 142);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, d);
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __sub__ (d, __call__ (timedelta, null, __kwargtrans__ ({minutes: 150}))));
	}) ();
	var d = (function () {
		var __accu0__ = datetime;
		return __call__ (__accu0__.strptime, __accu0__, '2017-03-14 15:28:14', '%Y-%m-%d %H:%M:%S');
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, d);
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, (function () {
			var __accu1__ = d;
			return __call__ (__accu1__.strftime, __accu1__, '%Y.%m.%d %H:%M:%S');
		}) ());
	}) ();
	var d = __add__ (d, __call__ (timedelta, null, __kwargtrans__ ({hours: 5, minutes: 18, seconds: 25})));
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, (function () {
			var __accu1__ = d;
			return __call__ (__accu1__.strftime, __accu1__, '%Y-%m-%d %H:%M:%S');
		}) ());
	}) ();
	var d = (function () {
		var __accu0__ = d;
		return __call__ (__accu0__.py_replace, __accu0__, __kwargtrans__ ({year: 2016, month: 1}));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, (function () {
			var __accu1__ = d;
			return __call__ (__accu1__.ctime, __accu1__);
		}) ());
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, (function () {
			var __accu1__ = d;
			return __call__ (__accu1__.isoformat, __accu1__);
		}) ());
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, (function () {
			var __accu1__ = d;
			return __call__ (__accu1__.date, __accu1__);
		}) ());
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, (function () {
			var __accu1__ = d;
			return __call__ (__accu1__.time, __accu1__);
		}) ());
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (tuple, null, (function () {
			var __accu1__ = d;
			return __call__ (__accu1__.timetuple, __accu1__);
		}) ()));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __call__ (tuple, null, (function () {
			var __accu1__ = d;
			return __call__ (__accu1__.utctimetuple, __accu1__);
		}) ()));
	}) ();
	var d2 = __add__ (d, delta);
	var d3 = __sub__ (d2, delta);
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, d);
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, d2);
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, d3);
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __eq__ (d, d3));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __gt__ (d, d3));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __lt__ (d, d3));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __eq__ (d, d2));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __gt__ (d, d2));
	}) ();
	(function () {
		var __accu0__ = autoTester;
		return __call__ (__accu0__.check, __accu0__, __lt__ (d, d2));
	}) ();
};

//# sourceMappingURL=module_datetime.map