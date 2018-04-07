// Transcrypt'ed from Python, 2018-04-07 16:10:20
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
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
	__language = request.headers ['accept-language'].py_split (',') [0];
};
export var __date = new Date (0);
export var __now = new Date ();
export var __weekdays = list ([]);
export var __weekdays_long = list ([]);
export var __d = new Date (1467662339080);
for (var i = 0; i < 7; i++) {
	for (var [l, s] of tuple ([tuple ([__weekdays, 'short']), tuple ([__weekdays_long, 'long'])])) {
		l.append (__d.toLocaleString (__language, dict ({'weekday': s})).lower ());
	}
	__d.setDate (__d.getDate () + 1);
}
export var __months = list ([]);
export var __months_long = list ([]);
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
		return list ([s]);
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
	var res = list ([]);
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
	if (jj [0] != jj [1]) {
		return 1;
	}
	return 0;
};
export var _daylight_in_effect = function (t) {
	var jj = __jan_jun_tz (t);
	if (min (jj [0], jj [1]) == t.getTimezoneOffset ()) {
		return 1;
	}
	return 0;
};
export var _timezone = function (t) {
	var jj = __jan_jun_tz (t);
	return max (jj [0], jj [1]);
};
export var __tzn = function (t) {
	try {
		return str (t).py_split ('(') [1].py_split (')') [0];
	}
	catch (__except0__) {
		return 'n.a.';
	}
};
export var _tzname = function (t) {
	var cn = __tzn (t);
	var ret = list ([cn, cn]);
	var jj = __jan_jun_tz (t, __tzn);
	var ind = 0;
	if (!(_daylight_in_effect (t))) {
		var ind = 1;
	}
	for (var i of jj) {
		if (i != cn) {
			ret [ind] = i;
		}
	}
	return tuple (ret);
};
export var altzone = __now.getTimezoneOffset ();
if (!(_daylight_in_effect (__now))) {
	var _jj = __jan_jun_tz (__now);
	var altzone = (altzone == _jj [1] ? _jj [0] : _jj [1]);
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
	var d = new Date (t [0], t [1] - 1, t [2], t [3], t [4], t [5], 0);
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
			var res = list ([]);
			if (!(fmt)) {
				return tuple (['', '']);
			}
			for (var i = 0; i < len (fmt) - 1; i++) {
				var c = fmt [i];
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
			if (fmt [0] == '%') {
				var d = fmt [1];
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
					var l = len (__weekdays [0]);
				}
				else if (d == 'A') {
					var l = len (__weekdays_long [0]);
				}
				else if (d == 'b') {
					var l = len (__months [0]);
				}
				else if (__in__ (d, tuple (['d', 'm', 'H', 'M', 'S']))) {
					var l = 2;
				}
				if (l > -(1)) {
					var lv = list ([ts.__getslice__ (0, l, 1), ts.__getslice__ (l, null, 1)]);
				}
			}
			if (!(lv)) {
				var lv = list ([ts, '']);
			}
		}
		else {
			var lv = _lsplit (ts, sep, 1);
		}
		if (d == null) {
			var ts = lv [1];
			continue;
		}
		var __left0__ = tuple ([lv [1], lv [0]]);
		var ts = __left0__ [0];
		dir_val [d] = __left0__ [1];
		if (fmt == '') {
			break;
		}
	}
	var t = list ([1900, 1, 1, 0, 0, 0, 0, 1, -(1)]);
	var ignore_keys = list ([]);
	var have_weekday = false;
	for (var [d, v] of dir_val.py_items ()) {
		if (__in__ (d, ignore_keys)) {
			continue;
		}
		if (d == 'p') {
			continue;
		}
		if (__in__ (d, __lu.py_keys ())) {
			t [__lu [d]] = int (v);
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
			t [6] = __weekdays.index (v);
		}
		else if (d == 'A') {
			if (!(__in__ (v, __weekdays_long))) {
				var __except0__ = ValueError ('Weekday unknown in your locale');
				__except0__.__cause__ = null;
				throw __except0__;
			}
			var have_weekday = true;
			t [6] = __weekdays_long.index (v);
		}
		else if (d == 'b') {
			if (!(__in__ (v, __months))) {
				var __except0__ = ValueError ('Month unknown in your locale');
				__except0__.__cause__ = null;
				throw __except0__;
			}
			t [1] = __months.index (v) + 1;
		}
		else if (d == 'B') {
			if (!(__in__ (v, __months_long))) {
				var __except0__ = ValueError ('Month unknown in your locale');
				__except0__.__cause__ = null;
				throw __except0__;
			}
			t [1] = __months_long.index (v) + 1;
		}
		else if (d == 'I') {
			var ampm = dir_val ['p'] || 'am';
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
			t [__lu ['H']] = v;
		}
		else if (d == 'y') {
			t [0] = 2000 + int (v);
		}
		else if (d == 'Z') {
			if (__in__ (v.lower (), list (['gmt', 'utc']))) {
				t [-(1)] = 0;
			}
		}
	}
	var __date = new Date (0);
	__date.setUTCFullYear (t [0]);
	__date.setUTCMonth (t [1] - 1);
	__date.setUTCDate (t [2]);
	__date.setUTCHours (t [3]);
	t [7] = _day_of_year (__date);
	if (!(have_weekday)) {
		t [6] = __date.getUTCDay () - 1;
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
		var v = zf2 (t [__lu [d]]);
		var f = f.py_replace (k, v);
	}
	for (var [d, l, pos] of tuple ([tuple (['b', __months, 1]), tuple (['B', __months_long, 1]), tuple (['a', __weekdays, 6]), tuple (['A', __weekdays_long, 6])])) {
		var p = t [pos];
		if (pos == 1) {
			var p = p - 1;
		}
		var v = l [p].capitalize ();
		var f = f.py_replace ('%' + d, v);
	}
	if (__in__ ('%p', f)) {
		if (t [3] > 11) {
			var ap = 'PM';
		}
		else {
			var ap = 'AM';
		}
		var f = f.py_replace ('%p', ap);
	}
	if (__in__ ('%y', f)) {
		var f = f.py_replace ('%y', str (t [0]).__getslice__ (-(2), null, 1));
	}
	if (__in__ ('%I', f)) {
		var v = t [3];
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
export {};

//# sourceMappingURL=time.map