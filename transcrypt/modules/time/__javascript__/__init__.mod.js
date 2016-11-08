	__nest__ (
		__all__,
		'time', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __date = new Date (0);
					var __now = new Date ();
					var __weekdays = list ([]);
					var __weekdays_long = list ([]);
					var __d = new Date (1467662339080);
					for (var i = 0; i < 7; i++) {
						var __iterable0__ = tuple ([tuple ([__weekdays, 'short']), tuple ([__weekdays_long, 'long'])]);
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
							var __left0__ = __iterable0__ [__index0__];
							var l = __left0__ [0];
							var s = __left0__ [1];
							l.append (__d.toLocaleString (window.navigator.language, dict ({'weekday': s})).lower ());
						}
						__d.setDate (__d.getDate () + 1);
					}
					var __months = list ([]);
					var __months_long = list ([]);
					var __d = new Date (946681200000.0);
					for (var i = 0; i < 12; i++) {
						var __iterable0__ = tuple ([tuple ([__months, 'short']), tuple ([__months_long, 'long'])]);
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
							var __left0__ = __iterable0__ [__index0__];
							var l = __left0__ [0];
							var s = __left0__ [1];
							l.append (__d.toLocaleString (window.navigator.language, dict ({'month': s})).lower ());
						}
						__d.setMonth (__d.getMonth () + 1);
					}
					var __lu = dict ({'Y': 0, 'm': 1, 'd': 2, 'H': 3, 'M': 4, 'S': 5});
					var _lsplit = function (s, sep, maxsplit) {
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
					var _local_time_tuple = function (jd) {
						var res = tuple ([jd.getFullYear (), jd.getMonth () + 1, jd.getDate (), jd.getHours (), jd.getMinutes (), jd.getSeconds (), (jd.getDay () > 0 ? jd.getDay () - 1 : 6), _day_of_year (jd, true), _daylight_in_effect (jd), jd.getMilliseconds ()]);
						return res;
					};
					var _utc_time_tuple = function (jd) {
						var res = tuple ([jd.getUTCFullYear (), jd.getUTCMonth () + 1, jd.getUTCDate (), jd.getUTCHours (), jd.getUTCMinutes (), jd.getUTCSeconds (), jd.getUTCDay () - 1, _day_of_year (jd, false), 0, jd.getUTCMilliseconds ()]);
						return res;
					};
					var _day_of_year = function (jd, local) {
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
					var _is_leap = function (year) {
						return __mod__ (year, 4) == 0 && (__mod__ (year, 100) != 0 || __mod__ (year, 400) == 0);
					};
					var __jan_jun_tz = function (t, func) {
						var was = t.getTime ();
						t.setDate (1);
						var res = list ([]);
						var __iterable0__ = tuple ([0, 6]);
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
							var m = __iterable0__ [__index0__];
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
					var _daylight = function (t) {
						var jj = __jan_jun_tz (t);
						if (jj [0] != jj [1]) {
							return 1;
						}
						return 0;
					};
					var _daylight_in_effect = function (t) {
						var jj = __jan_jun_tz (t);
						if (min (jj [0], jj [1]) == t.getTimezoneOffset ()) {
							return 1;
						}
						return 0;
					};
					var _timezone = function (t) {
						var jj = __jan_jun_tz (t);
						return max (jj [0], jj [1]);
					};
					var __tzn = function (t) {
						try {
							return str (t).py_split ('(') [1].py_split (')') [0];
						}
						catch (__except0__) {
							return 'n.a.';
						}
					};
					var _tzname = function (t) {
						var cn = __tzn (t);
						var ret = list ([cn, cn]);
						var jj = __jan_jun_tz (t, __tzn);
						var ind = 0;
						if (!(_daylight_in_effect (t))) {
							var ind = 1;
						}
						var __iterable0__ = jj;
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
							var i = __iterable0__ [__index0__];
							if (i != cn) {
								ret [ind] = i;
							}
						}
						return tuple (ret);
					};
					var altzone = __now.getTimezoneOffset ();
					if (!(_daylight_in_effect (__now))) {
						var _jj = __jan_jun_tz (__now);
						var altzone = (altzone == _jj [1] ? _jj [0] : _jj [1]);
					}
					var altzone = altzone * 60;
					var timezone = _timezone (__now) * 60;
					var daylight = _daylight (__now);
					var tzname = _tzname (__now);
					var time = function () {
						return Date.now () / 1000;
					};
					var asctime = function (t) {
						return strftime ('%a %b %d %H:%M:%S %Y', t);
					};
					var mktime = function (t) {
						var d = new Date (t [0], t [1] - 1, t [2], t [3], t [4], t [5], 0);
						return (d - 0) / 1000;
					};
					var ctime = function (seconds) {
						if (!(seconds)) {
							var seconds = time ();
						}
						return asctime (localtime (seconds));
					};
					var localtime = function (seconds) {
						if (!(seconds)) {
							var seconds = time ();
						}
						return gmtime (seconds, true);
					};
					var gmtime = function (seconds, localtime) {
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
					var strptime = function (string, format) {
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
									else {
										if (d == 'a') {
											var l = len (__weekdays [0]);
										}
										else {
											if (d == 'A') {
												var l = len (__weekdays_long [0]);
											}
											else {
												if (d == 'b') {
													var l = len (__months [0]);
												}
												else {
													if (__in__ (d, tuple (['d', 'm', 'H', 'M', 'S']))) {
														var l = 2;
													}
												}
											}
										}
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
						var __iterable0__ = dir_val.items ();
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
							var __left0__ = __iterable0__ [__index0__];
							var d = __left0__ [0];
							var v = __left0__ [1];
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
							else {
								if (d == 'A') {
									if (!(__in__ (v, __weekdays_long))) {
										var __except0__ = ValueError ('Weekday unknown in your locale');
										__except0__.__cause__ = null;
										throw __except0__;
									}
									var have_weekday = true;
									t [6] = __weekdays_long.index (v);
								}
								else {
									if (d == 'b') {
										if (!(__in__ (v, __months))) {
											var __except0__ = ValueError ('Month unknown in your locale');
											__except0__.__cause__ = null;
											throw __except0__;
										}
										t [1] = __months.index (v) + 1;
									}
									else {
										if (d == 'B') {
											if (!(__in__ (v, __months_long))) {
												var __except0__ = ValueError ('Month unknown in your locale');
												__except0__.__cause__ = null;
												throw __except0__;
											}
											t [1] = __months_long.index (v) + 1;
										}
										else {
											if (d == 'I') {
												var ampm = dir_val ['p'] || 'am';
												var ampm = ampm.lower ();
												var v = int (v);
												if (v == 12) {
													var v = 0;
												}
												else {
													if (v > 12) {
														var __except0__ = ValueError (((("time data '" + string) + "' does not match format '") + format) + "'");
														__except0__.__cause__ = null;
														throw __except0__;
													}
												}
												if (ampm == 'pm') {
													v += 12;
												}
												t [__lu ['H']] = v;
											}
											else {
												if (d == 'y') {
													t [0] = 2000 + int (v);
												}
												else {
													if (d == 'Z') {
														if (__in__ (v.lower (), list (['gmt', 'utc']))) {
															t [-(1)] = 0;
														}
													}
												}
											}
										}
									}
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
					var strftime = function (format, t) {
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
						var __iterable0__ = __lu.py_keys ();
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
							var d = __iterable0__ [__index0__];
							var k = '%' + d;
							if (!(__in__ (k, f))) {
								continue;
							}
							var v = zf2 (t [__lu [d]]);
							var f = f.py_replace (k, v);
						}
						var __iterable0__ = tuple ([tuple (['b', __months, 1]), tuple (['B', __months_long, 1]), tuple (['a', __weekdays, 6]), tuple (['A', __weekdays_long, 6])]);
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
							var __left0__ = __iterable0__ [__index0__];
							var d = __left0__ [0];
							var l = __left0__ [1];
							var pos = __left0__ [2];
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
							else {
								if (v > 12) {
									var v = v - 12;
								}
							}
							var f = f.py_replace ('%I', zf2 (v));
						}
						return f;
					};
					__pragma__ ('<all>')
						__all__.__d = __d;
						__all__.__date = __date;
						__all__.__jan_jun_tz = __jan_jun_tz;
						__all__.__lu = __lu;
						__all__.__months = __months;
						__all__.__months_long = __months_long;
						__all__.__now = __now;
						__all__.__tzn = __tzn;
						__all__.__weekdays = __weekdays;
						__all__.__weekdays_long = __weekdays_long;
						__all__._day_of_year = _day_of_year;
						__all__._daylight = _daylight;
						__all__._daylight_in_effect = _daylight_in_effect;
						__all__._is_leap = _is_leap;
						__all__._jj = _jj;
						__all__._local_time_tuple = _local_time_tuple;
						__all__._lsplit = _lsplit;
						__all__._timezone = _timezone;
						__all__._tzname = _tzname;
						__all__._utc_time_tuple = _utc_time_tuple;
						__all__.altzone = altzone;
						__all__.asctime = asctime;
						__all__.ctime = ctime;
						__all__.daylight = daylight;
						__all__.gmtime = gmtime;
						__all__.i = i;
						__all__.l = l;
						__all__.localtime = localtime;
						__all__.mktime = mktime;
						__all__.s = s;
						__all__.strftime = strftime;
						__all__.strptime = strptime;
						__all__.time = time;
						__all__.timezone = timezone;
						__all__.tzname = tzname;
					__pragma__ ('</all>')
				}
			}
		}
	);
