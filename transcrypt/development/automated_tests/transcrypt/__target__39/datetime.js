// Transcrypt'ed from Python, 2021-05-14 15:01:24
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as _math from './math.js';
import * as _time from './time.js';
export {_time, _math};
var __all__ = dict ({get MAXYEAR () {return MAXYEAR;}, set MAXYEAR (value) {MAXYEAR = value;}, get MINYEAR () {return MINYEAR;}, set MINYEAR (value) {MINYEAR = value;}, get _DAYNAMES () {return _DAYNAMES;}, set _DAYNAMES (value) {_DAYNAMES = value;}, get _DAYS_BEFORE_MONTH () {return _DAYS_BEFORE_MONTH;}, set _DAYS_BEFORE_MONTH (value) {_DAYS_BEFORE_MONTH = value;}, get _DAYS_IN_MONTH () {return _DAYS_IN_MONTH;}, set _DAYS_IN_MONTH (value) {_DAYS_IN_MONTH = value;}, get _DI100Y () {return _DI100Y;}, set _DI100Y (value) {_DI100Y = value;}, get _DI400Y () {return _DI400Y;}, set _DI400Y (value) {_DI400Y = value;}, get _DI4Y () {return _DI4Y;}, set _DI4Y (value) {_DI4Y = value;}, get _EPOCH () {return _EPOCH;}, set _EPOCH (value) {_EPOCH = value;}, get _MAXORDINAL () {return _MAXORDINAL;}, set _MAXORDINAL (value) {_MAXORDINAL = value;}, get _MONTHNAMES () {return _MONTHNAMES;}, set _MONTHNAMES (value) {_MONTHNAMES = value;}, get _Omitted () {return _Omitted;}, set _Omitted (value) {_Omitted = value;}, get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get _build_struct_time () {return _build_struct_time;}, set _build_struct_time (value) {_build_struct_time = value;}, get _check_date_fields () {return _check_date_fields;}, set _check_date_fields (value) {_check_date_fields = value;}, get _check_int_field () {return _check_int_field;}, set _check_int_field (value) {_check_int_field = value;}, get _check_time_fields () {return _check_time_fields;}, set _check_time_fields (value) {_check_time_fields = value;}, get _check_tzinfo_arg () {return _check_tzinfo_arg;}, set _check_tzinfo_arg (value) {_check_tzinfo_arg = value;}, get _check_tzname () {return _check_tzname;}, set _check_tzname (value) {_check_tzname = value;}, get _check_utc_offset () {return _check_utc_offset;}, set _check_utc_offset (value) {_check_utc_offset = value;}, get _cmp () {return _cmp;}, set _cmp (value) {_cmp = value;}, get _cmperror () {return _cmperror;}, set _cmperror (value) {_cmperror = value;}, get _d_max () {return _d_max;}, set _d_max (value) {_d_max = value;}, get _d_min () {return _d_min;}, set _d_min (value) {_d_min = value;}, get _date_class () {return _date_class;}, set _date_class (value) {_date_class = value;}, get _days_before_month () {return _days_before_month;}, set _days_before_month (value) {_days_before_month = value;}, get _days_before_year () {return _days_before_year;}, set _days_before_year (value) {_days_before_year = value;}, get _days_in_month () {return _days_in_month;}, set _days_in_month (value) {_days_in_month = value;}, get _divide_and_round () {return _divide_and_round;}, set _divide_and_round (value) {_divide_and_round = value;}, get _dt_max () {return _dt_max;}, set _dt_max (value) {_dt_max = value;}, get _dt_min () {return _dt_min;}, set _dt_min (value) {_dt_min = value;}, get _format_time () {return _format_time;}, set _format_time (value) {_format_time = value;}, get _is_leap () {return _is_leap;}, set _is_leap (value) {_is_leap = value;}, get _isoweek1monday () {return _isoweek1monday;}, set _isoweek1monday (value) {_isoweek1monday = value;}, get _ord2ymd () {return _ord2ymd;}, set _ord2ymd (value) {_ord2ymd = value;}, get _td_max () {return _td_max;}, set _td_max (value) {_td_max = value;}, get _td_min () {return _td_min;}, set _td_min (value) {_td_min = value;}, get _td_resolution () {return _td_resolution;}, set _td_resolution (value) {_td_resolution = value;}, get _time_class () {return _time_class;}, set _time_class (value) {_time_class = value;}, get _tm_max () {return _tm_max;}, set _tm_max (value) {_tm_max = value;}, get _tm_min () {return _tm_min;}, set _tm_min (value) {_tm_min = value;}, get _tz_max () {return _tz_max;}, set _tz_max (value) {_tz_max = value;}, get _tz_min () {return _tz_min;}, set _tz_min (value) {_tz_min = value;}, get _tz_utc () {return _tz_utc;}, set _tz_utc (value) {_tz_utc = value;}, get _tzinfo_class () {return _tzinfo_class;}, set _tzinfo_class (value) {_tzinfo_class = value;}, get _wrap_strftime () {return _wrap_strftime;}, set _wrap_strftime (value) {_wrap_strftime = value;}, get _ymd2ord () {return _ymd2ord;}, set _ymd2ord (value) {_ymd2ord = value;}, get date () {return date;}, set date (value) {date = value;}, get datetime () {return datetime;}, set datetime (value) {datetime = value;}, get dbm () {return dbm;}, set dbm (value) {dbm = value;}, get dim () {return dim;}, set dim (value) {dim = value;}, get rjust () {return rjust;}, set rjust (value) {rjust = value;}, get time () {return time;}, set time (value) {time = value;}, get timedelta () {return timedelta;}, set timedelta (value) {timedelta = value;}, get timezone () {return timezone;}, set timezone (value) {timezone = value;}, get tzinfo () {return tzinfo;}, set tzinfo (value) {tzinfo = value;}, get zfill () {return zfill;}, set zfill (value) {zfill = value;}});
var __name__ = 'datetime';
export var zfill = function (s, c) {
	var s = str (s);
	if (len (s) < c) {
		return __add__ (__mul__ ('0', __sub__ (c, __call__ (len, null, s))), s);
	}
	else {
		return s;
	}
};
export var rjust = function (s, c) {
	var s = str (s);
	if (len (s) < c) {
		return __add__ (__mul__ (' ', __sub__ (c, __call__ (len, null, s))), s);
	}
	else {
		return s;
	}
};
export var _cmp = function (x, y) {
	return (x == y ? 0 : (x > y ? 1 : -(1)));
};
export var MINYEAR = 1;
export var MAXYEAR = 9999;
export var _MAXORDINAL = 3652059;
export var _DAYS_IN_MONTH = [-(1), 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export var _DAYS_BEFORE_MONTH = [-(1)];
export var dbm = 0;
for (var dim of _DAYS_IN_MONTH.__getslice__ (1, null, 1)) {
	_DAYS_BEFORE_MONTH.append (dbm);
	dbm += dim;
}
export var _is_leap = function (year) {
	return __mod__ (year, 4) == 0 && (__mod__ (year, 100) != 0 || __mod__ (year, 400) == 0);
};
export var _days_before_year = function (year) {
	var y = year - 1;
	return ((y * 365 + Math.floor (y / 4)) - Math.floor (y / 100)) + Math.floor (y / 400);
};
export var _days_in_month = function (year, month) {
	assert ((1 <= month && month <= 12), month);
	if (month == 2 && _is_leap (year)) {
		return 29;
	}
	return ;
};
export var _days_before_month = function (year, month) {
	assert ((1 <= month && month <= 12), 'month must be in 1..12');
	return  + (month > 2 && _is_leap (year));
};
export var _ymd2ord = function (year, month, day) {
	assert ((1 <= month && month <= 12), 'month must be in 1..12');
	var dim = _days_in_month (year, month);
	assert ((1 <= day && day <= dim), __mod__ ('day must be in 1..%d', dim));
	return (_days_before_year (year) + _days_before_month (year, month)) + day;
};
export var _DI400Y = _days_before_year (401);
export var _DI100Y = _days_before_year (101);
export var _DI4Y = _days_before_year (5);
assert (_DI4Y == 4 * 365 + 1);
assert (_DI400Y == 4 * _DI100Y + 1);
assert (_DI100Y == 25 * _DI4Y - 1);
export var _ord2ymd = function (n) {
	n--;
	var __left0__ = divmod (n, _DI400Y);
	var n400 = __left0__ [0];
	var n = __left0__ [1];
	var year = n400 * 400 + 1;
	var __left0__ = divmod (n, _DI100Y);
	var n100 = __left0__ [0];
	var n = __left0__ [1];
	var __left0__ = divmod (n, _DI4Y);
	var n4 = __left0__ [0];
	var n = __left0__ [1];
	var __left0__ = divmod (n, 365);
	var n1 = __left0__ [0];
	var n = __left0__ [1];
	year += (n100 * 100 + n4 * 4) + n1;
	if (n1 == 4 || n100 == 4) {
		assert (n == 0);
		return tuple ([year - 1, 12, 31]);
	}
	var leapyear = n1 == 3 && (n4 != 24 || n100 == 3);
	assert (leapyear == _is_leap (year));
	var month = n + 50 >> 5;
	var preceding =  + (month > 2 && leapyear);
	if (preceding > n) {
		month--;
		preceding -=  + (month == 2 && leapyear);
	}
	n -= preceding;
	assert ((0 <= n && n < _days_in_month (year, month)));
	return tuple ([year, month, n + 1]);
};
export var _MONTHNAMES = [null, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export var _DAYNAMES = [null, 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export var _build_struct_time = function (y, m, d, hh, mm, ss, dstflag) {
	var wday = __mod__ (_ymd2ord (y, m, d) + 6, 7);
	var dnum = _days_before_month (y, m) + d;
	return tuple ([y, m, d, hh, mm, ss, wday, dnum, dstflag]);
};
export var _format_time = function (hh, mm, ss, us) {
	var result = '{}:{}:{}'.format (zfill (hh, 2), zfill (mm, 2), zfill (ss, 2));
	if (us) {
		result += '.{}'.format (zfill (us, 6));
	}
	return result;
};
export var _wrap_strftime = function (object, format, timetuple) {
	var freplace = null;
	var zreplace = null;
	var Zreplace = null;
	var newformat = [];
	var __left0__ = tuple ([0, len (format)]);
	var i = __left0__ [0];
	var n = __left0__ [1];
	while (i < n) {
		var ch = ;
		i++;
		if (ch == '%') {
			if (i < n) {
				var ch = ;
				i++;
				if (ch == 'f') {
					if (freplace === null) {
						var freplace = '{}'.format (zfill (getattr (object, 'microsecond', 0), 6));
					}
					newformat.append (freplace);
				}
				else if (ch == 'z') {
					if (zreplace === null) {
						var zreplace = '';
						if (hasattr (object, 'utcoffset')) {
							var offset = object.utcoffset ();
							if (offset !== null) {
								var sign = '+';
								if (offset.days < 0) {
									var offset = -(offset);
									var sign = '-';
								}
								var __left0__ = divmod (offset, timedelta (__kwargtrans__ ({hours: 1})));
								var h = __left0__ [0];
								var m = __left0__ [1];
								assert (!(__mod__ (m, timedelta (__kwargtrans__ ({minutes: 1})))), 'whole minute');
								var m = Math.floor (m / timedelta (__kwargtrans__ ({minutes: 1})));
								var zreplace = '{}{}{}'.format (sign, zfill (h, 2), zfill (m, 2));
							}
						}
					}
					assert (!__in__ ('%', zreplace));
					newformat.append (zreplace);
				}
				else if (ch == 'Z') {
					if (Zreplace === null) {
						var Zreplace = '';
						if (hasattr (object, 'tzname')) {
							var s = object.tzname ();
							if (s !== null) {
								var Zreplace = s.py_replace ('%', '%%');
							}
						}
					}
					newformat.append (Zreplace);
				}
				else {
					newformat.append ('%');
					newformat.append (ch);
				}
			}
			else {
				newformat.append ('%');
			}
		}
		else {
			newformat.append (ch);
		}
	}
	var newformat = ''.join (newformat);
	return _time.strftime (newformat, timetuple);
};
export var _check_tzname = function (py_name) {
	if (py_name !== null && !(isinstance (py_name, str))) {
		var __except0__ = py_TypeError ("tzinfo.tzname() must return None or string, not '{}'".format (py_typeof (py_name)));
		__except0__.__cause__ = null;
		throw __except0__;
	}
};
export var _check_utc_offset = function (py_name, offset) {
	assert (__in__ (py_name, tuple (['utcoffset', 'dst'])));
	if (offset === null) {
		return ;
	}
	if (!(isinstance (offset, timedelta))) {
		var __except0__ = py_TypeError ("tzinfo.{}() must return None or timedelta, not '{}'".format (py_name, py_typeof (offset)));
		__except0__.__cause__ = null;
		throw __except0__;
	}
	if (offset.__mod__ (timedelta (__kwargtrans__ ({minutes: 1}))).microseconds || offset.microseconds) {
		var __except0__ = ValueError ('tzinfo.{}() must return a whole number of minutes, got {}'.format (py_name, offset));
		__except0__.__cause__ = null;
		throw __except0__;
	}
	if (!((__lt__ (__neg__ (__call__ (timedelta, null, 1)), offset) && __lt__ (offset, __call__ (timedelta, null, 1))))) {
		var __except0__ = __call__ (ValueError, null, (function () {
			var __accu0__ = '{}()={}, must be must be strictly between -timedelta(hours=24) and timedelta(hours=24)';
			return __call__ (__accu0__.format, __accu0__, py_name, offset);
		}) ());
		__except0__.__cause__ = null;
		throw __except0__;
	}
};
export var _check_int_field = function (value) {
	var _type = py_typeof (value);
	if (_type == int) {
		return value;
	}
	if (!(_type == float)) {
		try {
			var value = value.__int__ ();
			try {
				if (py_typeof (value) == int) {
					return value;
				}
				var __except0__ = py_TypeError ('__int__ returned non-int (type {})'.format (py_typeof (value).__name__));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			catch (__except0__) {
			}
		}
		catch (__except0__) {
			if (isinstance (__except0__, AttributeError)) {
				// pass;
			}
			else {
				throw __except0__;
			}
		}
		var __except0__ = py_TypeError ('an integer is required (got type {})'.format (py_typeof (value).__name__));
		__except0__.__cause__ = null;
		throw __except0__;
	}
	var __except0__ = py_TypeError ('integer argument expected, got float');
	__except0__.__cause__ = null;
	throw __except0__;
};
export var _check_date_fields = function (year, month, day) {
	var year = _check_int_field (year);
	var month = _check_int_field (month);
	var day = _check_int_field (day);
	if (!((MINYEAR <= year && year <= MAXYEAR))) {
		var __except0__ = ValueError ('year must be in {}..{}'.format (MINYEAR, MAXYEAR), year);
		__except0__.__cause__ = null;
		throw __except0__;
	}
	if (!((1 <= month && month <= 12))) {
		var __except0__ = ValueError ('month must be in 1..12', month);
		__except0__.__cause__ = null;
		throw __except0__;
	}
	var dim = _days_in_month (year, month);
	if (!((1 <= day && day <= dim))) {
		var __except0__ = ValueError ('day must be in 1..{}'.format (dim), day);
		__except0__.__cause__ = null;
		throw __except0__;
	}
	return tuple ([year, month, day]);
};
export var _check_time_fields = function (hour, minute, second, microsecond) {
	var hour = _check_int_field (hour);
	var minute = _check_int_field (minute);
	var second = _check_int_field (second);
	var microsecond = _check_int_field (microsecond);
	if (!((0 <= hour && hour <= 23))) {
		var __except0__ = ValueError ('hour must be in 0..23', hour);
		__except0__.__cause__ = null;
		throw __except0__;
	}
	if (!((0 <= minute && minute <= 59))) {
		var __except0__ = ValueError ('minute must be in 0..59', minute);
		__except0__.__cause__ = null;
		throw __except0__;
	}
	if (!((0 <= second && second <= 59))) {
		var __except0__ = ValueError ('second must be in 0..59', second);
		__except0__.__cause__ = null;
		throw __except0__;
	}
	if (!((0 <= microsecond && microsecond <= 999999))) {
		var __except0__ = ValueError ('microsecond must be in 0..999999', microsecond);
		__except0__.__cause__ = null;
		throw __except0__;
	}
	return tuple ([hour, minute, second, microsecond]);
};
export var _check_tzinfo_arg = function (tz) {
	if (tz !== null && !(isinstance (tz, tzinfo))) {
		var __except0__ = py_TypeError ('tzinfo argument must be None or of a tzinfo subclass');
		__except0__.__cause__ = null;
		throw __except0__;
	}
};
export var _cmperror = function (x, y) {
	var __except0__ = py_TypeError ("can't compare '{}' to '{}'".format (py_typeof (x).__name__, py_typeof (y).__name__));
	__except0__.__cause__ = null;
	throw __except0__;
};
export var _divide_and_round = function (a, b) {
	var __left0__ = divmod (a, b);
	var q = __left0__ [0];
	var r = __left0__ [1];
	r *= 2;
	var greater_than_half = (b > 0 ? r > b : r < b);
	if (greater_than_half || r == b && __mod__ (q, 2) == 1) {
		q++;
	}
	return q;
};
export var timedelta =  __class__ ('timedelta', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, days, seconds, microseconds, milliseconds, minutes, hours, weeks) {
		if (typeof days == 'undefined' || (days != null && days.hasOwnProperty ("__kwargtrans__"))) {;
			var days = 0;
		};
		if (typeof seconds == 'undefined' || (seconds != null && seconds.hasOwnProperty ("__kwargtrans__"))) {;
			var seconds = 0;
		};
		if (typeof microseconds == 'undefined' || (microseconds != null && microseconds.hasOwnProperty ("__kwargtrans__"))) {;
			var microseconds = 0;
		};
		if (typeof milliseconds == 'undefined' || (milliseconds != null && milliseconds.hasOwnProperty ("__kwargtrans__"))) {;
			var milliseconds = 0;
		};
		if (typeof minutes == 'undefined' || (minutes != null && minutes.hasOwnProperty ("__kwargtrans__"))) {;
			var minutes = 0;
		};
		if (typeof hours == 'undefined' || (hours != null && hours.hasOwnProperty ("__kwargtrans__"))) {;
			var hours = 0;
		};
		if (typeof weeks == 'undefined' || (weeks != null && weeks.hasOwnProperty ("__kwargtrans__"))) {;
			var weeks = 0;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'days': var days = __allkwargs0__ [__attrib0__]; break;
						case 'seconds': var seconds = __allkwargs0__ [__attrib0__]; break;
						case 'microseconds': var microseconds = __allkwargs0__ [__attrib0__]; break;
						case 'milliseconds': var milliseconds = __allkwargs0__ [__attrib0__]; break;
						case 'minutes': var minutes = __allkwargs0__ [__attrib0__]; break;
						case 'hours': var hours = __allkwargs0__ [__attrib0__]; break;
						case 'weeks': var weeks = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __left0__ = 0;
		var d = __left0__;
		var s = __left0__;
		var us = __left0__;
		days += weeks * 7;
		seconds += minutes * 60 + hours * 3600;
		microseconds += milliseconds * 1000;
		if (isinstance (days, float)) {
			var __left0__ = _math.modf (days);
			var dayfrac = __left0__ [0];
			var days = __left0__ [1];
			var __left0__ = _math.modf (dayfrac * (24.0 * 3600.0));
			var daysecondsfrac = __left0__ [0];
			var daysecondswhole = __left0__ [1];
			assert (daysecondswhole == int (daysecondswhole));
			var s = int (daysecondswhole);
			assert (days == int (days));
			var d = int (days);
		}
		else {
			var daysecondsfrac = 0.0;
			var d = days;
		}
		assert (isinstance (daysecondsfrac, tuple ([float, int])));
		assert (abs (daysecondsfrac) <= 1.0);
		assert (isinstance (d, int));
		assert (abs (s) <= 24 * 3600);
		if (isinstance (seconds, float)) {
			var __left0__ = _math.modf (seconds);
			var secondsfrac = __left0__ [0];
			var seconds = __left0__ [1];
			assert (seconds == int (seconds));
			var seconds = int (seconds);
			secondsfrac += daysecondsfrac;
			assert (abs (secondsfrac) <= 2.0);
		}
		else {
			var secondsfrac = daysecondsfrac;
		}
		assert (isinstance (secondsfrac, tuple ([float, int])));
		assert (abs (secondsfrac) <= 2.0);
		assert (isinstance (seconds, int));
		var __left0__ = divmod (seconds, 24 * 3600);
		var days = __left0__ [0];
		var seconds = __left0__ [1];
		d += days;
		s += int (seconds);
		assert (isinstance (s, int));
		assert (abs (s) <= (2 * 24) * 3600);
		var usdouble = secondsfrac * 1000000.0;
		assert (abs (usdouble) < 2100000.0);
		if (isinstance (microseconds, float)) {
			var microseconds = round (microseconds + usdouble);
			var __left0__ = divmod (microseconds, 1000000);
			var seconds = __left0__ [0];
			var microseconds = __left0__ [1];
			var __left0__ = divmod (seconds, 24 * 3600);
			var days = __left0__ [0];
			var seconds = __left0__ [1];
			d += days;
			s += seconds;
		}
		else {
			var microseconds = int (microseconds);
			var __left0__ = divmod (microseconds, 1000000);
			var seconds = __left0__ [0];
			var microseconds = __left0__ [1];
			var __left0__ = divmod (seconds, 24 * 3600);
			var days = __left0__ [0];
			var seconds = __left0__ [1];
			d += days;
			s += seconds;
			var microseconds = round (microseconds + usdouble);
		}
		assert (isinstance (s, int));
		assert (isinstance (microseconds, int));
		assert (abs (s) <= (3 * 24) * 3600);
		assert (abs (microseconds) < 3100000.0);
		var __left0__ = divmod (microseconds, 1000000);
		var seconds = __left0__ [0];
		var us = __left0__ [1];
		s += seconds;
		var __left0__ = divmod (s, 24 * 3600);
		var days = __left0__ [0];
		var s = __left0__ [1];
		d += days;
		assert (isinstance (d, int));
		assert (isinstance (s, int) && (0 <= s && s < 24 * 3600));
		assert (isinstance (us, int) && (0 <= us && us < 1000000));
		if (abs (d) > 999999999) {
			var __except0__ = OverflowError (__mod__ ('timedelta # of days is too large: %d', d));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._days = d;
		self._seconds = s;
		self._microseconds = us;
	});},
	get __repr__ () {return __get__ (this, function (self) {
		if (self._microseconds) {
			return 'datetime.timedelta(days={}, seconds={}, microseconds={})'.format (self._days, self._seconds, self._microseconds);
		}
		if (self._seconds) {
			return 'datetime.timedelta(days={}, seconds={})'.format (self._days, self._seconds);
		}
		return 'datetime.timedelta(days={})'.format (self._days);
	});},
	get __str__ () {return __get__ (this, function (self) {
		var __left0__ = divmod (self._seconds, 60);
		var mm = __left0__ [0];
		var ss = __left0__ [1];
		var __left0__ = divmod (mm, 60);
		var hh = __left0__ [0];
		var mm = __left0__ [1];
		var s = '{}:{}:{}'.format (hh, zfill (mm, 2), zfill (ss, 2));
		if (self._days) {
			var plural = function (n) {
				return tuple ([n, abs (n) != 1 && 's' || '']);
			};
			var s = '{} day{}, '.format (plural (self._days)) + s;
		}
		if (self._microseconds) {
			var s = s + '.{}'.format (zfill (self._microseconds, 6));
		}
		return s;
	});},
	get total_seconds () {return __get__ (this, function (self) {
		return ((self.days * 86400 + self.seconds) * Math.pow (10, 6) + self.microseconds) / Math.pow (10, 6);
	});},
	get _get_days () {return __get__ (this, function (self) {
		return self._days;
	});},
	get _get_seconds () {return __get__ (this, function (self) {
		return self._seconds;
	});},
	get _get_microseconds () {return __get__ (this, function (self) {
		return self._microseconds;
	});},
	get __add__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, timedelta)) {
			return timedelta (self._days + other._days, self._seconds + other._seconds, self._microseconds + other._microseconds);
		}
		return NotImplemented;
	});},
	get __radd__ () {return __get__ (this, function (self, other) {
		return self.__add__ (other);
	});},
	get __sub__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, timedelta)) {
			return timedelta (self._days - other._days, self._seconds - other._seconds, self._microseconds - other._microseconds);
		}
		return NotImplemented;
	});},
	get __rsub__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, timedelta)) {
			return -(self) + other;
		}
		return NotImplemented;
	});},
	get __neg__ () {return __get__ (this, function (self) {
		return timedelta (-(self._days), -(self._seconds), -(self._microseconds));
	});},
	get __pos__ () {return __get__ (this, function (self) {
		return self;
	});},
	get __abs__ () {return __get__ (this, function (self) {
		if (self._days < 0) {
			return __neg__ (self);
		}
		else {
			return self;
		}
	});},
	get __mul__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, int)) {
			return timedelta (self._days * other, self._seconds * other, self._microseconds * other);
		}
		if (isinstance (other, float)) {
			var usec = self._to_microseconds ();
			var __left0__ = other.as_integer_ratio ();
			var a = __left0__ [0];
			var b = __left0__ [1];
			return timedelta (0, 0, _divide_and_round (usec * a, b));
		}
		return NotImplemented;
	});},
	get __rmul__ () {return __get__ (this, function (self, other) {
		return self.__mul__ (other);
	});},
	get _to_microseconds () {return __get__ (this, function (self) {
		return (self._days * (24 * 3600) + self._seconds) * 1000000 + self._microseconds;
	});},
	get __floordiv__ () {return __get__ (this, function (self, other) {
		if (!(isinstance (other, tuple ([int, timedelta])))) {
			return NotImplemented;
		}
		var usec = self._to_microseconds ();
		if (isinstance (other, timedelta)) {
			return Math.floor (usec / other._to_microseconds ());
		}
		if (isinstance (other, int)) {
			return timedelta (0, 0, Math.floor (usec / other));
		}
	});},
	get __truediv__ () {return __get__ (this, function (self, other) {
		if (!(isinstance (other, tuple ([int, float, timedelta])))) {
			return NotImplemented;
		}
		var usec = self._to_microseconds ();
		if (isinstance (other, timedelta)) {
			return usec / other._to_microseconds ();
		}
		if (isinstance (other, int)) {
			return timedelta (0, 0, _divide_and_round (usec, other));
		}
		if (isinstance (other, float)) {
			var __left0__ = other.as_integer_ratio ();
			var a = __left0__ [0];
			var b = __left0__ [1];
			return timedelta (0, 0, _divide_and_round (b * usec, a));
		}
	});},
	get __mod__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, timedelta)) {
			var r = __mod__ (self._to_microseconds (), other._to_microseconds ());
			return timedelta (0, 0, r);
		}
		return NotImplemented;
	});},
	get __divmod__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, timedelta)) {
			var __left0__ = divmod (self._to_microseconds (), other._to_microseconds ());
			var q = __left0__ [0];
			var r = __left0__ [1];
			return tuple ([q, timedelta (0, 0, r)]);
		}
		return NotImplemented;
	});},
	get __eq__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, timedelta)) {
			return self._cmp (other) == 0;
		}
		else {
			return false;
		}
	});},
	get __le__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, timedelta)) {
			return self._cmp (other) <= 0;
		}
		else {
			_cmperror (self, other);
		}
	});},
	get __lt__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, timedelta)) {
			return self._cmp (other) < 0;
		}
		else {
			_cmperror (self, other);
		}
	});},
	get __ge__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, timedelta)) {
			return self._cmp (other) >= 0;
		}
		else {
			_cmperror (self, other);
		}
	});},
	get __gt__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, timedelta)) {
			return self._cmp (other) > 0;
		}
		else {
			_cmperror (self, other);
		}
	});},
	get _cmp () {return __get__ (this, function (self, other) {
		assert (isinstance (other, timedelta));
		return _cmp (self._to_microseconds (), other._to_microseconds ());
	});},
	get __bool__ () {return __get__ (this, function (self) {
		return self._days != 0 || self._seconds != 0 || self._microseconds != 0;
	});}
});
Object.defineProperty (timedelta, 'microseconds', property.call (timedelta, timedelta._get_microseconds));
Object.defineProperty (timedelta, 'seconds', property.call (timedelta, timedelta._get_seconds));
Object.defineProperty (timedelta, 'days', property.call (timedelta, timedelta._get_days));;
export var _td_min = timedelta (-(999999999));
export var _td_max = timedelta (__kwargtrans__ ({days: 999999999, hours: 23, minutes: 59, seconds: 59, microseconds: 999999}));
export var _td_resolution = timedelta (__kwargtrans__ ({microseconds: 1}));
Object.defineProperty (timedelta, 'min', {get: function () {return _td_min;}})
Object.defineProperty (timedelta, 'max', {get: function () {return _td_max;}})
Object.defineProperty (timedelta, 'resolution', {get: function () {return _td_resolution;}})
export var date =  __class__ ('date', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, year, month, day) {
		if (typeof month == 'undefined' || (month != null && month.hasOwnProperty ("__kwargtrans__"))) {;
			var month = null;
		};
		if (typeof day == 'undefined' || (day != null && day.hasOwnProperty ("__kwargtrans__"))) {;
			var day = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'year': var year = __allkwargs0__ [__attrib0__]; break;
						case 'month': var month = __allkwargs0__ [__attrib0__]; break;
						case 'day': var day = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __left0__ = _check_date_fields (year, month, day);
		var year = __left0__ [0];
		var month = __left0__ [1];
		var day = __left0__ [2];
		self._year = year;
		self._month = month;
		self._day = day;
	});},
	get fromtimestamp () {return __getcm__ (this, function (cls, t) {
		var __left0__ = _time.localtime (t);
		var y = __left0__ [0];
		var m = __left0__ [1];
		var d = __left0__ [2];
		var hh = __left0__ [3];
		var mm = __left0__ [4];
		var ss = __left0__ [5];
		var weekday = __left0__ [6];
		var jday = __left0__ [7];
		var dst = __left0__ [8];
		return cls (y, m, d);
	});},
	get today () {return __getcm__ (this, function (cls) {
		var t = _time.time ();
		return cls.fromtimestamp (t);
	});},
	get fromordinal () {return __getcm__ (this, function (cls, n) {
		var __left0__ = _ord2ymd (n);
		var y = __left0__ [0];
		var m = __left0__ [1];
		var d = __left0__ [2];
		return cls (y, m, d);
	});},
	get __repr__ () {return __get__ (this, function (self) {
		return 'datetime.date({}, {}, {})'.format (self._year, self._month, self._day);
	});},
	get ctime () {return __get__ (this, function (self) {
		var weekday = __mod__ (self.toordinal (), 7) || 7;
		return '{} {} {} 00:00:00 {}'.format (, , rjust (self._day, 2), zfill (self._year, 4));
	});},
	get strftime () {return __get__ (this, function (self, fmt) {
		return _wrap_strftime (self, fmt, self.timetuple ());
	});},
	get __format__ () {return __get__ (this, function (self, fmt) {
		if (!(isinstance (fmt, str))) {
			var __except0__ = py_TypeError ('must be str, not {}'.format (py_typeof (fmt).__name__));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (len (fmt) != 0) {
			return self.strftime (fmt);
		}
		return str (self);
	});},
	get isoformat () {return __get__ (this, function (self) {
		return '{}-{}-{}'.format (zfill (self._year, 4), zfill (self._month, 2), zfill (self._day, 2));
	});},
	get __str__ () {return __get__ (this, function (self) {
		return self.isoformat ();
	});},
	get _get_year () {return __get__ (this, function (self) {
		return self._year;
	});},
	get _get_month () {return __get__ (this, function (self) {
		return self._month;
	});},
	get _get_day () {return __get__ (this, function (self) {
		return self._day;
	});},
	get timetuple () {return __get__ (this, function (self) {
		return _build_struct_time (self._year, self._month, self._day, 0, 0, 0, -(1));
	});},
	get toordinal () {return __get__ (this, function (self) {
		return _ymd2ord (self._year, self._month, self._day);
	});},
	get py_replace () {return __get__ (this, function (self, year, month, day) {
		if (typeof year == 'undefined' || (year != null && year.hasOwnProperty ("__kwargtrans__"))) {;
			var year = null;
		};
		if (typeof month == 'undefined' || (month != null && month.hasOwnProperty ("__kwargtrans__"))) {;
			var month = null;
		};
		if (typeof day == 'undefined' || (day != null && day.hasOwnProperty ("__kwargtrans__"))) {;
			var day = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'year': var year = __allkwargs0__ [__attrib0__]; break;
						case 'month': var month = __allkwargs0__ [__attrib0__]; break;
						case 'day': var day = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (year === null) {
			var year = self._year;
		}
		if (month === null) {
			var month = self._month;
		}
		if (day === null) {
			var day = self._day;
		}
		return date (year, month, day);
	});},
	get __eq__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, date)) {
			return self._cmp (other) == 0;
		}
		return NotImplemented;
	});},
	get __le__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, date)) {
			return self._cmp (other) <= 0;
		}
		return NotImplemented;
	});},
	get __lt__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, date)) {
			return self._cmp (other) < 0;
		}
		return NotImplemented;
	});},
	get __ge__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, date)) {
			return self._cmp (other) >= 0;
		}
		return NotImplemented;
	});},
	get __gt__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, date)) {
			return self._cmp (other) > 0;
		}
		return NotImplemented;
	});},
	get _cmp () {return __get__ (this, function (self, other) {
		assert (isinstance (other, date));
		var __left0__ = tuple ([self._year, self._month, self._day]);
		var y = __left0__ [0];
		var m = __left0__ [1];
		var d = __left0__ [2];
		var __left0__ = tuple ([other._year, other._month, other._day]);
		var y2 = __left0__ [0];
		var m2 = __left0__ [1];
		var d2 = __left0__ [2];
		return _cmp ('{}{}{}'.format (zfill (y, 4), zfill (m, 2), zfill (d, 2)), '{}{}{}'.format (zfill (y2, 4), zfill (m2, 2), zfill (d2, 2)));
	});},
	get __add__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, timedelta)) {
			var o = self.toordinal () + other.days;
			if ((0 < o && o <= _MAXORDINAL)) {
				return date.fromordinal (o);
			}
			var __except0__ = OverflowError ('result out of range');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return NotImplemented;
	});},
	get __radd__ () {return __get__ (this, function (self, other) {
		return self.__add__ (other);
	});},
	get __sub__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, timedelta)) {
			return __add__ (self, __call__ (timedelta, null, __neg__ (other.days)));
		}
		if (isinstance (other, date)) {
			var days1 = self.toordinal ();
			var days2 = other.toordinal ();
			return __call__ (timedelta, null, __sub__ (days1, days2));
		}
		return NotImplemented;
	});},
	get weekday () {return __get__ (this, function (self) {
		return __mod__ (self.toordinal () + 6, 7);
	});},
	get isoweekday () {return __get__ (this, function (self) {
		return __mod__ (self.toordinal (), 7) || 7;
	});},
	get isocalendar () {return __get__ (this, function (self) {
		var year = self._year;
		var week1monday = _isoweek1monday (year);
		var today = _ymd2ord (self._year, self._month, self._day);
		var __left0__ = divmod (today - week1monday, 7);
		var week = __left0__ [0];
		var day = __left0__ [1];
		if (week < 0) {
			year--;
			var week1monday = _isoweek1monday (year);
			var __left0__ = divmod (today - week1monday, 7);
			var week = __left0__ [0];
			var day = __left0__ [1];
		}
		else if (week >= 52) {
			if (today >= _isoweek1monday (year + 1)) {
				year++;
				var week = 0;
			}
		}
		return tuple ([year, week + 1, day + 1]);
	});},
	resolution: timedelta (__kwargtrans__ ({days: 1}))
});
Object.defineProperty (date, 'day', property.call (date, date._get_day));
Object.defineProperty (date, 'month', property.call (date, date._get_month));
Object.defineProperty (date, 'year', property.call (date, date._get_year));;
export var _date_class = date;
export var _d_min = date (1, 1, 1);
export var _d_max = date (9999, 12, 31);
Object.defineProperty (date, 'min', {get: function () {return _d_min;}})
Object.defineProperty (date, 'max', {get: function () {return _d_max;}})
export var tzinfo =  __class__ ('tzinfo', [object], {
	__module__: __name__,
	get tzname () {return __get__ (this, function (self, dt) {
		var __except0__ = NotImplementedError ('tzinfo subclass must override tzname()');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get utcoffset () {return __get__ (this, function (self, dt) {
		var __except0__ = NotImplementedError ('tzinfo subclass must override utcoffset()');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get dst () {return __get__ (this, function (self, dt) {
		var __except0__ = NotImplementedError ('tzinfo subclass must override dst()');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get fromutc () {return __get__ (this, function (self, dt) {
		if (!(isinstance (dt, datetime))) {
			var __except0__ = py_TypeError ('fromutc() requires a datetime argument');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (dt.tzinfo !== self) {
			var __except0__ = ValueError ('dt.tzinfo is not self');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var dtoff = dt.utcoffset ();
		if (dtoff === null) {
			var __except0__ = ValueError ('fromutc() requires a non-None utcoffset() result');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var dtdst = dt.dst ();
		if (dtdst === null) {
			var __except0__ = ValueError ('fromutc() requires a non-None dst() result');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var delta = dtoff - dtdst;
		if (delta) {
			dt += delta;
			var dtdst = dt.dst ();
			if (dtdst === null) {
				var __except0__ = ValueError ('fromutc(): dt.dst gave inconsistent results; cannot convert');
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
		return dt + dtdst;
	});}
});
export var _tzinfo_class = tzinfo;
export var time =  __class__ ('time', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, hour, minute, second, microsecond, tzinfo) {
		if (typeof hour == 'undefined' || (hour != null && hour.hasOwnProperty ("__kwargtrans__"))) {;
			var hour = 0;
		};
		if (typeof minute == 'undefined' || (minute != null && minute.hasOwnProperty ("__kwargtrans__"))) {;
			var minute = 0;
		};
		if (typeof second == 'undefined' || (second != null && second.hasOwnProperty ("__kwargtrans__"))) {;
			var second = 0;
		};
		if (typeof microsecond == 'undefined' || (microsecond != null && microsecond.hasOwnProperty ("__kwargtrans__"))) {;
			var microsecond = 0;
		};
		if (typeof tzinfo == 'undefined' || (tzinfo != null && tzinfo.hasOwnProperty ("__kwargtrans__"))) {;
			var tzinfo = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'hour': var hour = __allkwargs0__ [__attrib0__]; break;
						case 'minute': var minute = __allkwargs0__ [__attrib0__]; break;
						case 'second': var second = __allkwargs0__ [__attrib0__]; break;
						case 'microsecond': var microsecond = __allkwargs0__ [__attrib0__]; break;
						case 'tzinfo': var tzinfo = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __left0__ = _check_time_fields (hour, minute, second, microsecond);
		var hour = __left0__ [0];
		var minute = __left0__ [1];
		var second = __left0__ [2];
		var microsecond = __left0__ [3];
		_check_tzinfo_arg (tzinfo);
		self._hour = hour;
		self._minute = minute;
		self._second = second;
		self._microsecond = microsecond;
		self._tzinfo = tzinfo;
	});},
	get _get_hour () {return __get__ (this, function (self) {
		return self._hour;
	});},
	get _get_minute () {return __get__ (this, function (self) {
		return self._minute;
	});},
	get _get_second () {return __get__ (this, function (self) {
		return self._second;
	});},
	get _get_microsecond () {return __get__ (this, function (self) {
		return self._microsecond;
	});},
	get _get_tzinfo () {return __get__ (this, function (self) {
		return self._tzinfo;
	});},
	get __eq__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, time)) {
			return self._cmp (other, __kwargtrans__ ({allow_mixed: true})) == 0;
		}
		else {
			return false;
		}
	});},
	get __le__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, time)) {
			return self._cmp (other) <= 0;
		}
		else {
			_cmperror (self, other);
		}
	});},
	get __lt__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, time)) {
			return self._cmp (other) < 0;
		}
		else {
			_cmperror (self, other);
		}
	});},
	get __ge__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, time)) {
			return self._cmp (other) >= 0;
		}
		else {
			_cmperror (self, other);
		}
	});},
	get __gt__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, time)) {
			return self._cmp (other) > 0;
		}
		else {
			_cmperror (self, other);
		}
	});},
	get _cmp () {return __get__ (this, function (self, other, allow_mixed) {
		if (typeof allow_mixed == 'undefined' || (allow_mixed != null && allow_mixed.hasOwnProperty ("__kwargtrans__"))) {;
			var allow_mixed = false;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'other': var other = __allkwargs0__ [__attrib0__]; break;
						case 'allow_mixed': var allow_mixed = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		assert (isinstance (other, time));
		var mytz = self._tzinfo;
		var ottz = other._tzinfo;
		var __left0__ = null;
		var myoff = __left0__;
		var otoff = __left0__;
		if (mytz === ottz) {
			var base_compare = true;
		}
		else {
			var myoff = self.utcoffset ();
			var otoff = other.utcoffset ();
			var base_compare = myoff == otoff;
		}
		if (base_compare) {
			return _cmp (tuple ([self._hour, self._minute, self._second, self._microsecond]), tuple ([other._hour, other._minute, other._second, other._microsecond]));
		}
		if (myoff === null || otoff === null) {
			if (allow_mixed) {
				return 2;
			}
			else {
				var __except0__ = py_TypeError ('cannot compare naive and aware times');
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
		var myhhmm = __sub__ (__add__ (__mul__ (self._hour, 60), self._minute), __floordiv__ (myoff, __call__ (timedelta, null, __kwargtrans__ ({minutes: 1}))));
		var othhmm = __sub__ (__add__ (__mul__ (other._hour, 60), other._minute), __floordiv__ (otoff, __call__ (timedelta, null, __kwargtrans__ ({minutes: 1}))));
		return _cmp (tuple ([myhhmm, self._second, self._microsecond]), tuple ([othhmm, other._second, other._microsecond]));
	});},
	get _tzstr () {return __get__ (this, function (self, sep) {
		if (typeof sep == 'undefined' || (sep != null && sep.hasOwnProperty ("__kwargtrans__"))) {;
			var sep = ':';
		};
		var off = self.utcoffset ();
		if (off !== null) {
			if (off.days < 0) {
				var sign = '-';
				var off = -(off);
			}
			else {
				var sign = '+';
			}
			var __left0__ = divmod (off, timedelta (__kwargtrans__ ({hours: 1})));
			var hh = __left0__ [0];
			var mm = __left0__ [1];
			assert (!(__mod__ (mm, timedelta (__kwargtrans__ ({minutes: 1})))), 'whole minute');
			var mm = Math.floor (mm / timedelta (__kwargtrans__ ({minutes: 1})));
			assert ((0 <= hh && hh < 24));
			var off = '{}{}{}{}'.format (sign, zfill (hh, 2), sep, zfill (mm, 2));
		}
		return off;
	});},
	get __repr__ () {return __get__ (this, function (self) {
		if (self._microsecond != 0) {
			var s = ', {}, {}'.format (self._second, self._microsecond);
		}
		else if (self._second != 0) {
			var s = ', {}'.format (self._second);
		}
		else {
			var s = '';
		}
		var s = 'datetime.time({}, {}{})'.format (self._hour, self._minute, s);
		if (self._tzinfo !== null) {
			assert (s.__getslice__ (-(1), null, 1) == ')');
			var s = (s.__getslice__ (0, len (s) - 1, 1) + ', tzinfo={}'.format (self._tzinfo.__repr__ ())) + ')';
		}
		return s;
	});},
	get isoformat () {return __get__ (this, function (self) {
		var s = _format_time (self._hour, self._minute, self._second, self._microsecond);
		var tz = self._tzstr ();
		if (tz) {
			s += tz;
		}
		return s;
	});},
	get __str__ () {return __get__ (this, function (self) {
		return self.isoformat ();
	});},
	get strftime () {return __get__ (this, function (self, fmt) {
		var timetuple = tuple ([1900, 1, 1, self._hour, self._minute, self._second, 0, 1, -(1)]);
		return _wrap_strftime (self, fmt, timetuple);
	});},
	get __format__ () {return __get__ (this, function (self, fmt) {
		if (!(isinstance (fmt, str))) {
			var __except0__ = py_TypeError (__mod__ ('must be str, not %s', py_typeof (fmt).__name__));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (len (fmt) != 0) {
			return self.strftime (fmt);
		}
		return str (self);
	});},
	get utcoffset () {return __get__ (this, function (self) {
		if (self._tzinfo === null) {
			return null;
		}
		var offset = self._tzinfo.utcoffset (null);
		_check_utc_offset ('utcoffset', offset);
		return offset;
	});},
	get tzname () {return __get__ (this, function (self) {
		if (self._tzinfo === null) {
			return null;
		}
		var py_name = self._tzinfo.tzname (null);
		_check_tzname (py_name);
		return py_name;
	});},
	get dst () {return __get__ (this, function (self) {
		if (self._tzinfo === null) {
			return null;
		}
		var offset = self._tzinfo.dst (null);
		_check_utc_offset ('dst', offset);
		return offset;
	});},
	get py_replace () {return __get__ (this, function (self, hour, minute, second, microsecond, tzinfo) {
		if (typeof hour == 'undefined' || (hour != null && hour.hasOwnProperty ("__kwargtrans__"))) {;
			var hour = null;
		};
		if (typeof minute == 'undefined' || (minute != null && minute.hasOwnProperty ("__kwargtrans__"))) {;
			var minute = null;
		};
		if (typeof second == 'undefined' || (second != null && second.hasOwnProperty ("__kwargtrans__"))) {;
			var second = null;
		};
		if (typeof microsecond == 'undefined' || (microsecond != null && microsecond.hasOwnProperty ("__kwargtrans__"))) {;
			var microsecond = null;
		};
		if (typeof tzinfo == 'undefined' || (tzinfo != null && tzinfo.hasOwnProperty ("__kwargtrans__"))) {;
			var tzinfo = true;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'hour': var hour = __allkwargs0__ [__attrib0__]; break;
						case 'minute': var minute = __allkwargs0__ [__attrib0__]; break;
						case 'second': var second = __allkwargs0__ [__attrib0__]; break;
						case 'microsecond': var microsecond = __allkwargs0__ [__attrib0__]; break;
						case 'tzinfo': var tzinfo = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (hour === null) {
			var hour = self.hour;
		}
		if (minute === null) {
			var minute = self.minute;
		}
		if (second === null) {
			var second = self.second;
		}
		if (microsecond === null) {
			var microsecond = self.microsecond;
		}
		if (tzinfo === true) {
			var tzinfo = self.tzinfo;
		}
		return time (hour, minute, second, microsecond, tzinfo);
	});},
	resolution: timedelta (__kwargtrans__ ({microseconds: 1}))
});
Object.defineProperty (time, 'tzinfo', property.call (time, time._get_tzinfo));
Object.defineProperty (time, 'microsecond', property.call (time, time._get_microsecond));
Object.defineProperty (time, 'second', property.call (time, time._get_second));
Object.defineProperty (time, 'minute', property.call (time, time._get_minute));
Object.defineProperty (time, 'hour', property.call (time, time._get_hour));;
export var _time_class = time;
export var _tm_min = time (0, 0, 0);
export var _tm_max = time (23, 59, 59, 999999);
Object.defineProperty (time, 'min', {get: function () {return _tm_min;}})
Object.defineProperty (time, 'max', {get: function () {return _tm_max;}})
export var datetime =  __class__ ('datetime', [date], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, year, month, day, hour, minute, second, microsecond, tzinfo) {
		if (typeof month == 'undefined' || (month != null && month.hasOwnProperty ("__kwargtrans__"))) {;
			var month = null;
		};
		if (typeof day == 'undefined' || (day != null && day.hasOwnProperty ("__kwargtrans__"))) {;
			var day = null;
		};
		if (typeof hour == 'undefined' || (hour != null && hour.hasOwnProperty ("__kwargtrans__"))) {;
			var hour = 0;
		};
		if (typeof minute == 'undefined' || (minute != null && minute.hasOwnProperty ("__kwargtrans__"))) {;
			var minute = 0;
		};
		if (typeof second == 'undefined' || (second != null && second.hasOwnProperty ("__kwargtrans__"))) {;
			var second = 0;
		};
		if (typeof microsecond == 'undefined' || (microsecond != null && microsecond.hasOwnProperty ("__kwargtrans__"))) {;
			var microsecond = 0;
		};
		if (typeof tzinfo == 'undefined' || (tzinfo != null && tzinfo.hasOwnProperty ("__kwargtrans__"))) {;
			var tzinfo = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'year': var year = __allkwargs0__ [__attrib0__]; break;
						case 'month': var month = __allkwargs0__ [__attrib0__]; break;
						case 'day': var day = __allkwargs0__ [__attrib0__]; break;
						case 'hour': var hour = __allkwargs0__ [__attrib0__]; break;
						case 'minute': var minute = __allkwargs0__ [__attrib0__]; break;
						case 'second': var second = __allkwargs0__ [__attrib0__]; break;
						case 'microsecond': var microsecond = __allkwargs0__ [__attrib0__]; break;
						case 'tzinfo': var tzinfo = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var __left0__ = _check_date_fields (year, month, day);
		var year = __left0__ [0];
		var month = __left0__ [1];
		var day = __left0__ [2];
		var __left0__ = _check_time_fields (hour, minute, second, microsecond);
		var hour = __left0__ [0];
		var minute = __left0__ [1];
		var second = __left0__ [2];
		var microsecond = __left0__ [3];
		_check_tzinfo_arg (tzinfo);
		self._year = year;
		self._month = month;
		self._day = day;
		self._hour = hour;
		self._minute = minute;
		self._second = second;
		self._microsecond = microsecond;
		self._tzinfo = tzinfo;
	});},
	get _get_hour () {return __get__ (this, function (self) {
		return self._hour;
	});},
	get _get_minute () {return __get__ (this, function (self) {
		return self._minute;
	});},
	get _get_second () {return __get__ (this, function (self) {
		return self._second;
	});},
	get _get_microsecond () {return __get__ (this, function (self) {
		return self._microsecond;
	});},
	get _get_tzinfo () {return __get__ (this, function (self) {
		return self._tzinfo;
	});},
	get _fromtimestamp () {return __getcm__ (this, function (cls, t, utc, tz) {
		var __left0__ = _math.modf (t);
		var frac = __left0__ [0];
		var t = __left0__ [1];
		var us = round (frac * 1000000.0);
		if (us >= 1000000) {
			t++;
			us -= 1000000;
		}
		else if (us < 0) {
			t--;
			us += 1000000;
		}
		var converter = (utc ? _time.gmtime : _time.localtime);
		var __left0__ = converter (t);
		var y = __left0__ [0];
		var m = __left0__ [1];
		var d = __left0__ [2];
		var hh = __left0__ [3];
		var mm = __left0__ [4];
		var ss = __left0__ [5];
		var weekday = __left0__ [6];
		var jday = __left0__ [7];
		var dst = __left0__ [8];
		var ss = min (ss, 59);
		return cls (y, m, d, hh, mm, ss, us, tz);
	});},
	get fromtimestamp () {return __getcm__ (this, function (cls, t, tz) {
		if (typeof tz == 'undefined' || (tz != null && tz.hasOwnProperty ("__kwargtrans__"))) {;
			var tz = null;
		};
		_check_tzinfo_arg (tz);
		var result = cls._fromtimestamp (t, tz !== null, tz);
		if (tz !== null) {
			var result = tz.fromutc (result);
		}
		return result;
	});},
	get utcfromtimestamp () {return __getcm__ (this, function (cls, t) {
		return cls._fromtimestamp (t, true, null);
	});},
	get now () {return __getcm__ (this, function (cls, tz) {
		if (typeof tz == 'undefined' || (tz != null && tz.hasOwnProperty ("__kwargtrans__"))) {;
			var tz = null;
		};
		var t = _time.time ();
		return cls.fromtimestamp (t, tz);
	});},
	get utcnow () {return __getcm__ (this, function (cls) {
		var t = _time.time ();
		return cls.utcfromtimestamp (t);
	});},
	get combine () {return __getcm__ (this, function (cls, date, time) {
		if (!(isinstance (date, _date_class))) {
			var __except0__ = py_TypeError ('date argument must be a date instance');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!(isinstance (time, _time_class))) {
			var __except0__ = py_TypeError ('time argument must be a time instance');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return cls (date.year, date.month, date.day, time.hour, time.minute, time.second, time.microsecond, time.tzinfo);
	});},
	get timetuple () {return __get__ (this, function (self) {
		var dst = self.dst ();
		if (dst === null) {
			var dst = -(1);
		}
		else if (dst) {
			var dst = 1;
		}
		else {
			var dst = 0;
		}
		return _build_struct_time (self.year, self.month, self.day, self.hour, self.minute, self.second, dst);
	});},
	get timestamp () {return __get__ (this, function (self) {
		if (self._tzinfo === null) {
			return _time.mktime (tuple ([self.year, self.month, self.day, self.hour, self.minute, self.second, -(1), -(1), -(1)])) + self.microsecond / 1000000.0;
		}
		else {
			return (function () {
				var __accu0__ = __sub__ (self, _EPOCH);
				return __call__ (__accu0__.total_seconds, __accu0__);
			}) ();
		}
	});},
	get utctimetuple () {return __get__ (this, function (self) {
		var offset = self.utcoffset ();
		if (offset) {
			var self = __call__ (__isub__, null, self, offset);
		}
		var __left0__ = tuple ([self.year, self.month, self.day]);
		var y = __left0__ [0];
		var m = __left0__ [1];
		var d = __left0__ [2];
		var __left0__ = tuple ([self.hour, self.minute, self.second]);
		var hh = __left0__ [0];
		var mm = __left0__ [1];
		var ss = __left0__ [2];
		return _build_struct_time (y, m, d, hh, mm, ss, 0);
	});},
	get date () {return __get__ (this, function (self) {
		return date (self._year, self._month, self._day);
	});},
	get time () {return __get__ (this, function (self) {
		return time (self.hour, self.minute, self.second, self.microsecond);
	});},
	get timetz () {return __get__ (this, function (self) {
		return time (self.hour, self.minute, self.second, self.microsecond, self._tzinfo);
	});},
	get py_replace () {return __get__ (this, function (self, year, month, day, hour, minute, second, microsecond, tzinfo) {
		if (typeof year == 'undefined' || (year != null && year.hasOwnProperty ("__kwargtrans__"))) {;
			var year = null;
		};
		if (typeof month == 'undefined' || (month != null && month.hasOwnProperty ("__kwargtrans__"))) {;
			var month = null;
		};
		if (typeof day == 'undefined' || (day != null && day.hasOwnProperty ("__kwargtrans__"))) {;
			var day = null;
		};
		if (typeof hour == 'undefined' || (hour != null && hour.hasOwnProperty ("__kwargtrans__"))) {;
			var hour = null;
		};
		if (typeof minute == 'undefined' || (minute != null && minute.hasOwnProperty ("__kwargtrans__"))) {;
			var minute = null;
		};
		if (typeof second == 'undefined' || (second != null && second.hasOwnProperty ("__kwargtrans__"))) {;
			var second = null;
		};
		if (typeof microsecond == 'undefined' || (microsecond != null && microsecond.hasOwnProperty ("__kwargtrans__"))) {;
			var microsecond = null;
		};
		if (typeof tzinfo == 'undefined' || (tzinfo != null && tzinfo.hasOwnProperty ("__kwargtrans__"))) {;
			var tzinfo = true;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'year': var year = __allkwargs0__ [__attrib0__]; break;
						case 'month': var month = __allkwargs0__ [__attrib0__]; break;
						case 'day': var day = __allkwargs0__ [__attrib0__]; break;
						case 'hour': var hour = __allkwargs0__ [__attrib0__]; break;
						case 'minute': var minute = __allkwargs0__ [__attrib0__]; break;
						case 'second': var second = __allkwargs0__ [__attrib0__]; break;
						case 'microsecond': var microsecond = __allkwargs0__ [__attrib0__]; break;
						case 'tzinfo': var tzinfo = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (year === null) {
			var year = self.year;
		}
		if (month === null) {
			var month = self.month;
		}
		if (day === null) {
			var day = self.day;
		}
		if (hour === null) {
			var hour = self.hour;
		}
		if (minute === null) {
			var minute = self.minute;
		}
		if (second === null) {
			var second = self.second;
		}
		if (microsecond === null) {
			var microsecond = self.microsecond;
		}
		if (tzinfo === true) {
			var tzinfo = self.tzinfo;
		}
		return datetime (year, month, day, hour, minute, second, microsecond, tzinfo);
	});},
	get astimezone () {return __get__ (this, function (self, tz) {
		if (typeof tz == 'undefined' || (tz != null && tz.hasOwnProperty ("__kwargtrans__"))) {;
			var tz = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'tz': var tz = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (tz === null) {
			if (self.tzinfo === null) {
				var __except0__ = ValueError ('astimezone() requires an aware datetime');
				__except0__.__cause__ = null;
				throw __except0__;
			}
			var ts = __floordiv__ ((__sub__ (self, _EPOCH)), __call__ (timedelta, null, __kwargtrans__ ({seconds: 1})));
			var localtm = _time.localtime (ts);
			var local = datetime (...localtm.__getslice__ (0, 6, 1));
			if (len (localtm) > 9) {
				var gmtoff = ;
				var zone = ;
				var tz = timezone (timedelta (__kwargtrans__ ({seconds: gmtoff})), zone);
			}
			else {
				var delta = __sub__ (local, __call__ (datetime, null, ...__getslice__ ((function () {
					var __accu0__ = _time;
					return __call__ (__accu0__.gmtime, __accu0__, ts);
				}) (), 0, 6, 1)));
				var dst = _time.daylight && __gt__ (, 0);
				var gmtoff = __neg__ ((dst ? _time.altzone : _time.timezone));
				if (__eq__ (delta, __call__ (timedelta, null, __kwargtrans__ ({seconds: gmtoff})))) {
					var tz = __call__ (timezone, null, delta, );
				}
				else {
					var tz = __call__ (timezone, null, delta);
				}
			}
		}
		else if (!(isinstance (tz, tzinfo))) {
			var __except0__ = py_TypeError ('tz argument must be an instance of tzinfo');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var mytz = self.tzinfo;
		if (mytz === null) {
			var __except0__ = ValueError ('astimezone() requires an aware datetime');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (tz === mytz) {
			return self;
		}
		var myoffset = self.utcoffset ();
		if (myoffset === null) {
			var __except0__ = ValueError ('astimezone() requires an aware datetime');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var utc = (function () {
			var __accu0__ = __sub__ (self, myoffset);
			return __call__ (__accu0__.py_replace, __accu0__, __kwargtrans__ ({tzinfo: tz}));
		}) ();
		return tz.fromutc (utc);
	});},
	get ctime () {return __get__ (this, function (self) {
		var weekday = __mod__ (self.toordinal (), 7) || 7;
		return '{} {} {} {}:{}:{} {}'.format (, , zfill (self._day, 2), zfill (self._hour, 2), zfill (self._minute, 2), zfill (self._second, 2), zfill (self._year, 4));
	});},
	get isoformat () {return __get__ (this, function (self, sep) {
		if (typeof sep == 'undefined' || (sep != null && sep.hasOwnProperty ("__kwargtrans__"))) {;
			var sep = 'T';
		};
		var s = '{}-{}-{}{}'.format (zfill (self._year, 4), zfill (self._month, 2), zfill (self._day, 2), sep) + _format_time (self._hour, self._minute, self._second, self._microsecond);
		var off = self.utcoffset ();
		if (off !== null) {
			if (off.days < 0) {
				var sign = '-';
				var off = -(off);
			}
			else {
				var sign = '+';
			}
			var __left0__ = divmod (off, timedelta (__kwargtrans__ ({hours: 1})));
			var hh = __left0__ [0];
			var mm = __left0__ [1];
			assert (!(__mod__ (mm, timedelta (__kwargtrans__ ({minutes: 1})))), 'whole minute');
			var mm = Math.floor (mm / timedelta (__kwargtrans__ ({minutes: 1})));
			s += '{}{}:{}'.format (sign, zfill (hh, 2), zfill (mm, 2));
		}
		return s;
	});},
	get __repr__ () {return __get__ (this, function (self) {
		var L = [self._year, self._month, self._day, self._hour, self._minute, self._second, self._microsecond];
		if ( == 0) {
			L.py_pop ();
		}
		if ( == 0) {
			L.py_pop ();
		}
		var s = 'datetime.datetime({})'.format (', '.join (map (str, L)));
		if (self._tzinfo !== null) {
			assert (s.__getslice__ (-(1), null, 1) == ')');
			var s = (s.__getslice__ (0, len (s) - 1, 1) + ', tzinfo={}'.format (self._tzinfo.__repr__ ())) + ')';
		}
		return s;
	});},
	get __str__ () {return __get__ (this, function (self) {
		return self.isoformat (__kwargtrans__ ({sep: ' '}));
	});},
	get strptime () {return __getcm__ (this, function (cls, date_string, format) {
		return cls (..._time.strptime (date_string, format).__getslice__ (0, 6, 1));
	});},
	get utcoffset () {return __get__ (this, function (self) {
		if (self._tzinfo === null) {
			return null;
		}
		var offset = self._tzinfo.utcoffset (self);
		_check_utc_offset ('utcoffset', offset);
		return offset;
	});},
	get tzname () {return __get__ (this, function (self) {
		if (self._tzinfo === null) {
			return null;
		}
		var py_name = self._tzinfo.tzname (self);
		_check_tzname (py_name);
		return py_name;
	});},
	get dst () {return __get__ (this, function (self) {
		if (self._tzinfo === null) {
			return null;
		}
		var offset = self._tzinfo.dst (self);
		_check_utc_offset ('dst', offset);
		return offset;
	});},
	get __eq__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, datetime)) {
			return self._cmp (other, __kwargtrans__ ({allow_mixed: true})) == 0;
		}
		else if (!(isinstance (other, date))) {
			return NotImplemented;
		}
		else {
			return false;
		}
	});},
	get __le__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, datetime)) {
			return self._cmp (other) <= 0;
		}
		else if (!(isinstance (other, date))) {
			return NotImplemented;
		}
		else {
			_cmperror (self, other);
		}
	});},
	get __lt__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, datetime)) {
			return self._cmp (other) < 0;
		}
		else if (!(isinstance (other, date))) {
			return NotImplemented;
		}
		else {
			_cmperror (self, other);
		}
	});},
	get __ge__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, datetime)) {
			return self._cmp (other) >= 0;
		}
		else if (!(isinstance (other, date))) {
			return NotImplemented;
		}
		else {
			_cmperror (self, other);
		}
	});},
	get __gt__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, datetime)) {
			return self._cmp (other) > 0;
		}
		else if (!(isinstance (other, date))) {
			return NotImplemented;
		}
		else {
			_cmperror (self, other);
		}
	});},
	get _cmp () {return __get__ (this, function (self, other, allow_mixed) {
		if (typeof allow_mixed == 'undefined' || (allow_mixed != null && allow_mixed.hasOwnProperty ("__kwargtrans__"))) {;
			var allow_mixed = false;
		};
		assert (isinstance (other, datetime));
		var mytz = self._tzinfo;
		var ottz = other._tzinfo;
		var __left0__ = null;
		var myoff = __left0__;
		var otoff = __left0__;
		if (mytz === ottz) {
			var base_compare = true;
		}
		else {
			var myoff = self.utcoffset ();
			var otoff = other.utcoffset ();
			var base_compare = myoff == otoff;
		}
		if (base_compare) {
			var s1 = '{}{}{}{}{}{}{}'.format (zfill (self._year, 4), zfill (self._month, 2), zfill (self._day, 2), zfill (self._hour, 2), zfill (self._minute, 2), zfill (self._second, 2), zfill (self._microsecond, 6));
			var s2 = '{}{}{}{}{}{}{}'.format (zfill (other._year, 4), zfill (other._month, 2), zfill (other._day, 2), zfill (other._hour, 2), zfill (other._minute, 2), zfill (other._second, 2), zfill (other._microsecond, 6));
			return _cmp (s1, s2);
		}
		if (myoff === null || otoff === null) {
			if (allow_mixed) {
				return 2;
			}
			else {
				var __except0__ = py_TypeError ('cannot compare naive and aware datetimes');
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
		var diff = __sub__ (self, other);
		if (diff.days < 0) {
			return -(1);
		}
		return diff && 1 || 0;
	});},
	get __add__ () {return __get__ (this, function (self, other) {
		if (!(isinstance (other, timedelta))) {
			return NotImplemented;
		}
		var delta = timedelta (self.toordinal (), __kwargtrans__ ({hours: self._hour, minutes: self._minute, seconds: self._second, microseconds: self._microsecond}));
		var delta = __call__ (__iadd__, null, delta, other);
		var __left0__ = divmod (delta.seconds, 3600);
		var hour = __left0__ [0];
		var rem = __left0__ [1];
		var __left0__ = divmod (rem, 60);
		var minute = __left0__ [0];
		var second = __left0__ [1];
		if ((0 < delta.days && delta.days <= _MAXORDINAL)) {
			return datetime.combine (date.fromordinal (delta.days), time (hour, minute, second, delta.microseconds, __kwargtrans__ ({tzinfo: self._tzinfo})));
		}
		var __except0__ = OverflowError ('result out of range');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get __radd__ () {return __get__ (this, function (self, other) {
		return self.__add__ (other);
	});},
	get __sub__ () {return __get__ (this, function (self, other) {
		if (!(isinstance (other, datetime))) {
			if (isinstance (other, timedelta)) {
				return __add__ (self, __neg__ (other));
			}
			return NotImplemented;
		}
		var days1 = self.toordinal ();
		var days2 = other.toordinal ();
		var secs1 = (self._second + self._minute * 60) + self._hour * 3600;
		var secs2 = (other._second + other._minute * 60) + other._hour * 3600;
		var base = timedelta (days1 - days2, secs1 - secs2, self._microsecond - other._microsecond);
		if (self._tzinfo === other._tzinfo) {
			return base;
		}
		var myoff = self.utcoffset ();
		var otoff = other.utcoffset ();
		if (myoff == otoff) {
			return base;
		}
		if (myoff === null || otoff === null) {
			var __except0__ = py_TypeError ('cannot mix naive and timezone-aware time');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		return __sub__ (__add__ (base, otoff), myoff);
	});},
	resolution: timedelta (__kwargtrans__ ({microseconds: 1}))
});
Object.defineProperty (datetime, 'tzinfo', property.call (datetime, datetime._get_tzinfo));
Object.defineProperty (datetime, 'microsecond', property.call (datetime, datetime._get_microsecond));
Object.defineProperty (datetime, 'second', property.call (datetime, datetime._get_second));
Object.defineProperty (datetime, 'minute', property.call (datetime, datetime._get_minute));
Object.defineProperty (datetime, 'hour', property.call (datetime, datetime._get_hour));;
export var _dt_min = datetime (1, 1, 1);
export var _dt_max = datetime (9999, 12, 31, 23, 59, 59, 999999);
Object.defineProperty (datetime, 'min', {get: function () {return _dt_min;}})
Object.defineProperty (datetime, 'max', {get: function () {return _dt_max;}})
export var _isoweek1monday = function (year) {
	var THURSDAY = 3;
	var firstday = _ymd2ord (year, 1, 1);
	var firstweekday = __mod__ (firstday + 6, 7);
	var week1monday = firstday - firstweekday;
	if (firstweekday > THURSDAY) {
		week1monday += 7;
	}
	return week1monday;
};
export var _Omitted = '@#$^&$^';
export var timezone =  __class__ ('timezone', [tzinfo], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, offset, py_name) {
		if (typeof py_name == 'undefined' || (py_name != null && py_name.hasOwnProperty ("__kwargtrans__"))) {;
			var py_name = _Omitted;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'offset': var offset = __allkwargs0__ [__attrib0__]; break;
						case 'py_name': var py_name = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (!(isinstance (offset, timedelta))) {
			var __except0__ = py_TypeError ('offset must be a timedelta');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (py_name === _Omitted) {
			if (!(offset)) {
				var offset = self.utc;
			}
			var py_name = null;
		}
		else if (!(isinstance (py_name, str))) {
			var __except0__ = py_TypeError ('name must be a string');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (!((__le__ (self._minoffset, offset) && __le__ (offset, self._maxoffset)))) {
			var __except0__ = __call__ (ValueError, null, 'offset must be a timedelta strictly between -timedelta(hours=24) and timedelta(hours=24).');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (offset.microseconds != 0 || __mod__ (offset.seconds, 60) != 0) {
			var __except0__ = ValueError ('offset must be a timedelta representing a whole number of minutes');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._offset = offset;
		self._name = py_name;
	});},
	get _create () {return __getcm__ (this, function (cls, offset, py_name) {
		if (typeof py_name == 'undefined' || (py_name != null && py_name.hasOwnProperty ("__kwargtrans__"))) {;
			var py_name = _Omitted;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'cls': var cls = __allkwargs0__ [__attrib0__]; break;
						case 'offset': var offset = __allkwargs0__ [__attrib0__]; break;
						case 'py_name': var py_name = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return cls (offset, py_name);
	});},
	get __eq__ () {return __get__ (this, function (self, other) {
		if (py_typeof (other) != timezone) {
			return false;
		}
		return self._offset == other._offset;
	});},
	get __repr__ () {return __get__ (this, function (self) {
		if (self === self.utc) {
			return 'datetime.timezone.utc';
		}
		if (self._name === null) {
			return 'datetime.timezone({})'.format (self._offset.__repr__ ());
		}
		return 'datetime.timezone({}, {})'.format (self._offset.__repr__ (), self._name.__repr__ ());
	});},
	get __str__ () {return __get__ (this, function (self) {
		return self.tzname (null);
	});},
	get utcoffset () {return __get__ (this, function (self, dt) {
		if (isinstance (dt, datetime) || dt === null) {
			return self._offset;
		}
		var __except0__ = py_TypeError ('utcoffset() argument must be a datetime instance or None');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get tzname () {return __get__ (this, function (self, dt) {
		if (isinstance (dt, datetime) || dt === null) {
			if (self._name === null) {
				return self._name_from_offset (self._offset);
			}
			return self._name;
		}
		var __except0__ = py_TypeError ('tzname() argument must be a datetime instance or None');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get dst () {return __get__ (this, function (self, dt) {
		if (isinstance (dt, datetime) || dt === null) {
			return null;
		}
		var __except0__ = py_TypeError ('dst() argument must be a datetime instance or None');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get fromutc () {return __get__ (this, function (self, dt) {
		if (isinstance (dt, datetime)) {
			if (dt.tzinfo !== self) {
				var __except0__ = ValueError ('fromutc: dt.tzinfo is not self');
				__except0__.__cause__ = null;
				throw __except0__;
			}
			return __add__ (dt, self._offset);
		}
		var __except0__ = py_TypeError ('fromutc() argument must be a datetime instance or None');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	_maxoffset: timedelta (__kwargtrans__ ({hours: 23, minutes: 59})),
	_minoffset: __neg__ (__call__ (timedelta, null, __kwargtrans__ ({hours: 23, minutes: 59}))),
	get _name_from_offset () {return function (delta) {
		if (__lt__ (delta, __call__ (timedelta, null, 0))) {
			var sign = '-';
			var delta = __neg__ (delta);
		}
		else {
			var sign = '+';
		}
		var __left0__ = __call__ (divmod, null, delta, __call__ (timedelta, null, __kwargtrans__ ({hours: 1})));
		var hours = __left0__ [0];
		var rest = __left0__ [1];
		var minutes = __floordiv__ (rest, __call__ (timedelta, null, __kwargtrans__ ({minutes: 1})));
		return 'UTC{}{}:{}'.format (sign, zfill (hours, 2), zfill (minutes, 2));
	};}
});
export var _tz_utc = timezone._create (timedelta (0));
export var _tz_min = timezone._create (timezone._minoffset);
export var _tz_max = timezone._create (timezone._maxoffset);
Object.defineProperty (timezone, 'utc', {get: function () {return _tz_utc;}})
Object.defineProperty (timezone, 'min', {get: function () {return _tz_min;}})
Object.defineProperty (timezone, 'max', {get: function () {return _tz_max;}})
export var _EPOCH = datetime (1970, 1, 1, __kwargtrans__ ({tzinfo: timezone.utc}));

//# sourceMappingURL=datetime.map