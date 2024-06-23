// Transcrypt'ed from Python, 2021-05-14 15:01:25
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get __adapt__ () {return __adapt__;}, set __adapt__ (value) {__adapt__ = value;}, get __d () {return __d;}, set __d (value) {__d = value;}, get __date () {return __date;}, set __date (value) {__date = value;}, get __debugGetLanguage () {return __debugGetLanguage;}, set __debugGetLanguage (value) {__debugGetLanguage = value;}, get __jan_jun_tz () {return __jan_jun_tz;}, set __jan_jun_tz (value) {__jan_jun_tz = value;}, get __language () {return __language;}, set __language (value) {__language = value;}, get __lu () {return __lu;}, set __lu (value) {__lu = value;}, get __months () {return __months;}, set __months (value) {__months = value;}, get __months_long () {return __months_long;}, set __months_long (value) {__months_long = value;}, get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get __now () {return __now;}, set __now (value) {__now = value;}, get __tzn () {return __tzn;}, set __tzn (value) {__tzn = value;}, get __weekdays () {return __weekdays;}, set __weekdays (value) {__weekdays = value;}, get __weekdays_long () {return __weekdays_long;}, set __weekdays_long (value) {__weekdays_long = value;}, get _day_of_year () {return _day_of_year;}, set _day_of_year (value) {_day_of_year = value;}, get _daylight () {return _daylight;}, set _daylight (value) {_daylight = value;}, get _daylight_in_effect () {return _daylight_in_effect;}, set _daylight_in_effect (value) {_daylight_in_effect = value;}, get _is_leap () {return _is_leap;}, set _is_leap (value) {_is_leap = value;}, get _jj () {return _jj;}, set _jj (value) {_jj = value;}, get _local_time_tuple () {return _local_time_tuple;}, set _local_time_tuple (value) {_local_time_tuple = value;}, get _lsplit () {return _lsplit;}, set _lsplit (value) {_lsplit = value;}, get _timezone () {return _timezone;}, set _timezone (value) {_timezone = value;}, get _tzname () {return _tzname;}, set _tzname (value) {_tzname = value;}, get _utc_time_tuple () {return _utc_time_tuple;}, set _utc_time_tuple (value) {_utc_time_tuple = value;}, get altzone () {return altzone;}, set altzone (value) {altzone = value;}, get asctime () {return asctime;}, set asctime (value) {asctime = value;}, get ctime () {return ctime;}, set ctime (value) {ctime = value;}, get daylight () {return daylight;}, set daylight (value) {daylight = value;}, get gmtime () {return gmtime;}, set gmtime (value) {gmtime = value;}, get i () {return i;}, set i (value) {i = value;}, get l () {return l;}, set l (value) {l = value;}, get localtime () {return localtime;}, set localtime (value) {localtime = value;}, get mktime () {return mktime;}, set mktime (value) {mktime = value;}, get s () {return s;}, set s (value) {s = value;}, get strftime () {return strftime;}, set strftime (value) {strftime = value;}, get strptime () {return strptime;}, set strptime (value) {strptime = value;}, get time () {return time;}, set time (value) {time = value;}, get timezone () {return timezone;}, set timezone (value) {timezone = value;}, get tzname () {return tzname;}, set tzname (value) {tzname = value;}});
var __name__ = 'time';
try {
	var __language = window.navigator.language;
}
catch (__except0__) {
	var __language = 'en-US';
}
export var __debugGetLanguage = function () {
	return __language;
};
export var __adapt__ = function (request) {
	__language = ;
};
export var __date = new Date (0);
export var __now = new Date ();
export var __weekdays = [];
export var __weekdays_long = [];
export var __d = new Date (1467662339080);
for (var i = 0; i < 7; i++) {
	for (var [l, s] of tuple ([tuple ([__weekdays, 'short']), tuple ([__weekdays_long, 'long'])])) {
		l.append (__d.toLocaleString (__language, dict ({'weekday': s})).lower ());
	}
	__d.setDate (__d.getDate () + 1);
}
export var __months = [];
export var __months_long = [];
var __d = new Date (946681200000.0);
for (var i = 0; i < 12; i++) {
	for (var [l, s] of tuple ([tuple ([__months, 'short']), tuple ([__months_long, 'long'])])) {
		l.append (__d.toLocaleString (__language, dict ({'month': s})).lower ());
	}
	__d.setMonth (__d.getMonth () + 1);
}
export var __lu = dict ({'Y': 0, 'm': 1, 'd': 2, 'H': 3, 'M': 4, 'S': 5});
export var _lsplit = function (s, sep, maxsplit) {
	if (maxsplit == 0) {
		return [s];
	}
	var py_split = s.py_split (sep);
	if (!(maxsplit)) {
		return py_split;
	}
	var ret = py_split.slice (0, maxsplit, 1);
	if (len (ret) == len (py_split)) {
		return ret;
	}
	ret.append (sep.join (py_split.__getslice__ (maxsplit, null, 1)));
	return ret;
};
export var _local_time_tuple = function (jd) {
	var res = tuple ([jd.getFullYear (), jd.getMonth () + 1, jd.getDate (), jd.getHours (), jd.getMinutes (), jd.getSeconds (), (jd.getDay () > 0 ? jd.getDay () - 1 : 6), _day_of_year (jd, true), _daylight_in_effect (jd), jd.getMilliseconds ()]);
	return res;
};
export var _utc_time_tuple = function (jd) {
	var res = tuple ([jd.getUTCFullYear (), jd.getUTCMonth () + 1, jd.getUTCDate (), jd.getUTCHours (), jd.getUTCMinutes (), jd.getUTCSeconds (), jd.getUTCDay () - 1, _day_of_year (jd, false), 0, jd.getUTCMilliseconds ()]);
	return res;
};
export var _day_of_year = function (jd, local) {
	var day_offs = 0;
	if (jd.getHours () + (jd.getTimezoneOffset () * 60) / 3600 < 0) {
		var day_offs = -(1);
	}
	var was = jd.getTime ();
	var cur = jd.setHours (23);
	jd.setUTCDate (1);
	jd.setUTCMonth (0);
	jd.setUTCHours (0);
	jd.setUTCMinutes (0);
	jd.setUTCSeconds (0);
	var res = round ((cur - jd) / 86400000);
	if (!(local)) {
		res += day_offs;
	}
	if (res == 0) {
		var res = 365;
		jd.setTime (jd.getTime () - 86400);
		var last_year = jd.getUTCFullYear ();
		if (_is_leap (last_year)) {
			var res = 366;
		}
	}
	jd.setTime (was);
	return res;
};
export var _is_leap = function (year) {
	return __mod__ (year, 4) == 0 && (__mod__ (year, 100) != 0 || __mod__ (year, 400) == 0);
};
export var __jan_jun_tz = function (t, func) {
	var was = t.getTime ();
	t.setDate (1);
	var res = [];
	for (var m of tuple ([0, 6])) {
		t.setMonth (m);
		if (!(func)) {
			res.append (t.getTimezoneOffset ());
		}
		else {
			res.append (func (t));
		}
	}
	t.setTime (was);
	return res;
};
export var _daylight = function (t) {
	var jj = __jan_jun_tz (t);
	if ( != ) {
		return 1;
	}
	return 0;
};
export var _daylight_in_effect = function (t) {
	var jj = __jan_jun_tz (t);
	if (min (, ) == t.getTimezoneOffset ()) {
		return 1;
	}
	return 0;
};
export var _timezone = function (t) {
	var jj = __jan_jun_tz (t);
	return max (, );
};
export var __tzn = function (t) {
	try {
		return ;
	}
	catch (__except0__) {
		return 'n.a.';
	}
};
export var _tzname = function (t) {
	var cn = __tzn (t);
	var ret = [cn, cn];
	var jj = __jan_jun_tz (t, __tzn);
	var ind = 0;
	if (!(_daylight_in_effect (t))) {
		var ind = 1;
	}
	for (var i of jj) {
		if (i != cn) {
		}
	}
	return tuple (ret);
};
export var altzone = __now.getTimezoneOffset ();
if (!(_daylight_in_effect (__now))) {
	var _jj = __jan_jun_tz (__now);
	var altzone = (altzone ==  ?  : );
}
var altzone = altzone * 60;
export var timezone = _timezone (__now) * 60;
export var daylight = _daylight (__now);
export var tzname = _tzname (__now);
export var time = function () {
	return Date.now () / 1000;
};
export var asctime = function (t) {
	return strftime ('%a %b %d %H:%M:%S %Y', t);
};
export var mktime = function (t) {
	var d = new Date (,  - 1, , , , , 0);
	return (d - 0) / 1000;
};
export var ctime = function (seconds) {
	if (!(seconds)) {
		var seconds = time ();
	}
	return asctime (localtime (seconds));
};
export var localtime = function (seconds) {
	if (!(seconds)) {
		var seconds = time ();
	}
	return gmtime (seconds, true);
};
export var gmtime = function (seconds, localtime) {
	if (!(seconds)) {
		var seconds = time ();
	}
	var millis = seconds * 1000;
	__date.setTime (millis);
	if (localtime) {
		var t = _local_time_tuple (__date);
	}
	else {
		var t = _utc_time_tuple (__date);
	}
	return t.__getslice__ (0, 9, 1);
};
export var strptime = function (string, format) {
	if (!(format)) {
		var format = '%a %b %d %H:%M:%S %Y';
	}
	var __left0__ = tuple ([string, format]);
	var ts = __left0__ [0];
	var fmt = __left0__ [1];
	var get_next = function (fmt) {
		var get_sep = function (fmt) {
			var res = [];
			if (!(fmt)) {
				return tuple (['', '']);
			}
			for (var i = 0; i < len (fmt) - 1; i++) {
				var c = ;
				if (c == '%') {
					break;
				}
				res.append (c);
			}
			return tuple ([''.join (res), fmt.__getslice__ (i, null, 1)]);
		};
		var __left0__ = tuple ([null, null, null]);
		var d = __left0__ [0];
		var sep = __left0__ [1];
		var f = __left0__ [2];
		if (fmt) {
			if ( == '%') {
				var d = ;
				var __left0__ = get_sep (fmt.__getslice__ (2, null, 1));
				var sep = __left0__ [0];
				var f = __left0__ [1];
			}
			else {
				var __left0__ = get_sep (fmt);
				var sep = __left0__ [0];
				var f = __left0__ [1];
			}
		}
		return tuple ([d, sep, f]);
	};
	var dir_val = dict ({});
	while (ts) {
		var __left0__ = get_next (fmt);
		var d = __left0__ [0];
		var sep = __left0__ [1];
		var fmt = __left0__ [2];
		if (sep == '') {
			var lv = null;
			if (d) {
				var l = -(1);
				if (d == 'Y') {
					var l = 4;
				}
				else if (d == 'a') {
					var l = len ();
				}
				else if (d == 'A') {
					var l = len ();
				}
				else if (d == 'b') {
					var l = len ();
				}
				else if (__in__ (d, tuple (['d', 'm', 'H', 'M', 'S']))) {
					var l = 2;
				}
				if (l > -(1)) {
					var lv = [ts.__getslice__ (0, l, 1), ts.__getslice__ (l, null, 1)];
				}
			}
			if (!(lv)) {
				var lv = [ts, ''];
			}
		}
		else {
			var lv = _lsplit (ts, sep, 1);
		}
		if (d == null) {
			var ts = ;
			continue;
		}
		var __left0__ = tuple ([, ]);
		var ts = __left0__ [0];
		if (fmt == '') {
			break;
		}
	}
	var t = [1900, 1, 1, 0, 0, 0, 0, 1, -(1)];
	var ignore_keys = [];
	var have_weekday = false;
	for (var [d, v] of dir_val.py_items ()) {
		if (__in__ (d, ignore_keys)) {
			continue;
		}
		if (d == 'p') {
			continue;
		}
		if (__in__ (d, __lu.py_keys ())) {
			continue;
		}
		if (__in__ (d, tuple (['a', 'A', 'b', 'B']))) {
			var v = v.lower ();
		}
		if (d == 'm') {
			ignore_keys.append ('b');
			ignore_keys.append ('B');
		}
		if (d == 'a') {
			if (!(__in__ (v, __weekdays))) {
				var __except0__ = ValueError ('Weekday unknown in your locale');
				__except0__.__cause__ = null;
				throw __except0__;
			}
			var have_weekday = true;
		}
		else if (d == 'A') {
			if (!(__in__ (v, __weekdays_long))) {
				var __except0__ = ValueError ('Weekday unknown in your locale');
				__except0__.__cause__ = null;
				throw __except0__;
			}
			var have_weekday = true;
		}
		else if (d == 'b') {
			if (!(__in__ (v, __months))) {
				var __except0__ = ValueError ('Month unknown in your locale');
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
		else if (d == 'B') {
			if (!(__in__ (v, __months_long))) {
				var __except0__ = ValueError ('Month unknown in your locale');
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
		else if (d == 'I') {
			var ampm =  || 'am';
			var ampm = ampm.lower ();
			var v = int (v);
			if (v == 12) {
				var v = 0;
			}
			else if (v > 12) {
				var __except0__ = ValueError (((("time data '" + string) + "' does not match format '") + format) + "'");
				__except0__.__cause__ = null;
				throw __except0__;
			}
			if (ampm == 'pm') {
				v += 12;
			}
		}
		else if (d == 'y') {
		}
		else if (d == 'Z') {
			if (__in__ (v.lower (), ['gmt', 'utc'])) {
			}
		}
	}
	var __date = new Date (0);
	__date.setUTCFullYear ();
	__date.setUTCMonth ( - 1);
	__date.setUTCDate ();
	__date.setUTCHours ();
	if (!(have_weekday)) {
	}
	return t;
};
export var strftime = function (format, t) {
	var zf2 = function (v) {
		if (v < 10) {
			return '0' + str (v);
		}
		return v;
	};
	if (!(t)) {
		var t = localtime ();
	}
	var f = format;
	for (var d of __lu.py_keys ()) {
		var k = '%' + d;
		if (!(__in__ (k, f))) {
			continue;
		}
		var v = zf2 ();
		var f = f.py_replace (k, v);
	}
	for (var [d, l, pos] of tuple ([tuple (['b', __months, 1]), tuple (['B', __months_long, 1]), tuple (['a', __weekdays, 6]), tuple (['A', __weekdays_long, 6])])) {
		var p = ;
		if (pos == 1) {
			var p = p - 1;
		}
		var v = .capitalize ();
		var f = f.py_replace ('%' + d, v);
	}
	if (__in__ ('%p', f)) {
		if ( > 11) {
			var ap = 'PM';
		}
		else {
			var ap = 'AM';
		}
		var f = f.py_replace ('%p', ap);
	}
	if (__in__ ('%y', f)) {
		var f = f.py_replace ('%y', str ().__getslice__ (-(2), null, 1));
	}
	if (__in__ ('%I', f)) {
		var v = ;
		if (v == 0) {
			var v = 12;
		}
		else if (v > 12) {
			var v = v - 12;
		}
		var f = f.py_replace ('%I', zf2 (v));
	}
	return f;
};

//# sourceMappingURL=time.map