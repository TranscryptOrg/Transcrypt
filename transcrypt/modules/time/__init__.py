"""
time module

No:

- Platform specific functions
- sleep. In js currently not possible in browsers
         except via busy loops, we don't do that.
- struct_time CLASS. we work only via the tuple interface of it.
- handling of weird stuff.
    e.g.: In Europe/Simferopool (Ukraine) the UTC offset before 1924 was +2.67

Spec for all below (must have open to read this module):

> https://docs.python.org/3.5/library/time.html


Jul 2016, Gunther Klessinger, Axiros GmbH
"""

# we don't need those:
__pragma__ ('nokwargs')

# for js dates:
from org.transcrypt.stubs.browser import __new__

# js date object. might be modified during calculations:
__date = __new__(Date(0))
__now = __new__(Date())


# build the locale's weekday names
__weekdays = []
__weekdays_long = []
__d = __new__(Date(1467662339080)) # a monday
for i in range(7):
    for l, s in (__weekdays, 'short'), (__weekdays_long, 'long'):
        l.append(__d.toLocaleString(window.navigator.language,
                                        {'weekday': s}).lower())
    __d.setDate(__d.getDate() + 1)


# build the locale's months names
__months = []
__months_long = []
__d = __new__(Date(946681200000.0)) # 1.1.2000
for i in range(12):
    for l, s in ((__months, 'short'), (__months_long, 'long')):
        l.append(__d.toLocaleString(window.navigator.language,
                                        {'month': s}).lower())
    __d.setMonth(__d.getMonth() + 1)



# lookup for positions directives in struct_time tuples:
# its a 9-sequence
#        time.struct_time(tm_year=2016, tm_mon=7, tm_mday=19, tm_hour=2,
#                         tm_min=24, tm_sec=2, tm_wday=1, tm_yday=201,
#                         tm_isdst=1)
__lu = {'Y': 0, 'm': 1, 'd': 2, 'H': 3, 'M': 4, 'S': 5}

def _lsplit(s, sep, maxsplit):
    """ not yet in TS """
    if maxsplit == 0:
        return [s]
    split = s.split(sep)
    if not maxsplit:
        return split
    ret = split.slice(0, maxsplit, 1)
    if len(ret) == len(split):
        return ret
    ret.append(sep.join(split[maxsplit:]))
    return ret


def _local_time_tuple(jd):
    """ jd: javascript Date object, from unixtimestamp """
    res =  ( jd.getFullYear()
            ,jd.getMonth() + 1 # zero based
            ,jd.getDate()
            ,jd.getHours()
            ,jd.getMinutes()
            ,jd.getSeconds()
            ,jd.getDay() - 1
            ,_day_of_year(jd, True)
            ,_daylight(jd)
            ,jd.getMilliseconds() # not in use by the pub API
           )
    return res

def _utc_time_tuple(jd):
    """ jd: javascript Date object, from unixtimestamp """
    res =  ( jd.getUTCFullYear()
            ,jd.getUTCMonth() + 1 # zero based
            ,jd.getUTCDate()
            ,jd.getUTCHours()
            ,jd.getUTCMinutes()
            ,jd.getUTCSeconds()
            ,jd.getUTCDay() - 1
            ,_day_of_year(jd, False)
            ,0 # is dst for utc: 0
            ,jd.getUTCMilliseconds()
           )
    return res

def _day_of_year(jd, local):
    # check if jd hours are ahead of UTC less than the offset to it:
    day_offs = 0
    if jd.getHours() + jd.getTimezoneOffset() * 60 / 3600 < 0:
        day_offs = -1
    was = jd.getTime()
    cur = jd.setHours(23)
    jd.setUTCDate(1)
    jd.setUTCMonth(0)
    jd.setUTCHours(0)
    jd.setUTCMinutes(0)
    jd.setUTCSeconds(0)
    res = round((cur - jd) / 86400000 )
    #res = round(((jd.setHours(23) - new Date(jd.getYear(), 0, 1, 0, 0, 0)
    #                 ) / 1000 / 60 / 60 / 24))
    if not local:
        res += day_offs

    if res == 0:
        res = 365
        jd.setTime(jd.getTime() - 86400)
        last_year = jd.getUTCFullYear()
        if _is_leap(last_year):
            res = 366
    jd.setTime(was)
    return res

def _is_leap(year):
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)

def __jan_jun_tz(t, func):
    """ information about local jan and jun month of a t's year
    default is to deliver timezone offset, but a function can be handed to us,
    which we'll run on those two months
    """
    # required to detect dst (daylight saving time) in effect:
    was = t.getTime() # avoid new date objs
    t.setDate(1)
    res = []
    for m in 0, 6:
        t.setMonth(m)
        if not func:
            res.append(t.getTimezoneOffset())
        else:
            res.append(func(t))
    t.setTime(was)
    return res

def _daylight(t):
    """
    http://stackoverflow.com/questions/11887934/
    check-if-daylight-saving-time-is-in-effect-and-if-it-is-for-how-many-hours

    return 0 or 1 like python
    """
    jj = __jan_jun_tz(t)
    # in southern hemisphere the daylight saving is in winter months!
    if min(jj[0], jj[1]) == t.getTimezoneOffset():
        return 1
    return 0

def _timezone(t):
    jj = __jan_jun_tz(t)
    # in southern hemisphere the daylight saving is in winter months!
    return max(jj[0], jj[1])


def __tzn(t):
    # depending on browser ? new Date() -> Wed Jul... (CEST)
    try:
        return str(t).split('(')[1].split(')')[0]
    except:
        # better no crash:
        return 'n.a.'

def _tzname(t):
    cn = __tzn(t)
    ret = [cn, cn]
    jj = __jan_jun_tz(t, __tzn)
    for i in jj:
        if i != cn:
            ret[0] = i
    return tuple(ret)




# ------------------------------------------------------------------ Public API

# we calc that only once. I mean - we run in the browser in the end:
altzone  = __now.getTimezoneOffset() * 60

timezone = _timezone(__now) * 60

daylight = _daylight(__now)

tzname   = _tzname(__now)


def time():
    """
    time() -> floating point number\n\nReturn the current time in seconds
    since the Epoch.
    Fractions of a second may be present if the system clock provides them.
    """
    return Date.now() / 1000


def asctime(t):
    return strftime('%a %b %d %H:%M:%S %Y', t)


def mktime(t):
    ''' inverse of localtime '''
    d = __new__(Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5], 0))
    return (d - 0) / 1000


def ctime(seconds):
    """
    ctime(seconds) -> string

    Convert a time in seconds since the Epoch to a string in local time.
    This is equivalent to asctime(localtime(seconds)). When the time tuple is
    not present, current time as returned by localtime() is used.'
    """
    if not seconds:
        seconds = time()
    return asctime(localtime(seconds))


def localtime(seconds):
    """
    localtime([seconds]) -> (tm_year,tm_mon,tm_mday,tm_hour,tm_min,
                          tm_sec,tm_wday,tm_yday,tm_isdst)

    Convert seconds since the Epoch to a time tuple expressing local time.
    When 'seconds' is not passed in, convert the current time instead.
    """
    if not seconds:
        seconds = time()
    return gmtime(seconds, True)


def gmtime(seconds, localtime):
    """
    localtime([seconds]) -> (tm_year,tm_mon,tm_mday,tm_hour,tm_min,
                          tm_sec,tm_wday,tm_yday,tm_isdst)

    Convert seconds since the Epoch to a time tuple expressing local time.
    When 'seconds' is not passed in, convert the current time instead.
    """
    if not seconds:
        seconds = time()
    millis = seconds * 1000
    __date.setTime(millis)
    if localtime:
        t = _local_time_tuple(__date)
    else:
        t = _utc_time_tuple(__date)
    return t[:9]

# ----------------------------------------------------------------------------
# now the workhorses:
def strptime(string, format):
    """
    strptime(string, format) -> struct_time

    Parse a string to a time tuple according to a format specification.
    See the library reference manual for formatting codes (same as
            strftime()).

    Commonly used format codes:

        %Y  Year with century as a decimal number.
        %m  Month as a decimal number [01,12].
        %d  Day of the month as a decimal number [01,31].
        %H  Hour (24-hour clock) as a decimal number [00,23].
        %M  Minute as a decimal number [00,59].
        %S  Second as a decimal number [00,61].
        %z  Time zone offset from UTC.
        %a  Locale's abbreviated weekday name.
        %A  Locale's full weekday name.
        %b  Locale's abbreviated month name.
        %B  Locale's full month name.
        %c  Locale's appropriate date and time representation.
        %I  Hour (12-hour clock) as a decimal number [01,12].
        %p  Locale's equivalent of either AM or PM.

        Tradoffs of this Transcrypt implementation:

        1. platform specific codes not supported
        2. %% and %c not supported
        """

    if not format:
        format = "%a %b %d %H:%M:%S %Y"
    ts, fmt = string, format
    def get_next(fmt):
        ''' returns next directive, next seperator, rest of format str'''
        def get_sep(fmt):
            res = []
            if not fmt:
                return '', ''
            for i in range(len(fmt)-1):
                c = fmt[i]
                if c == '%':
                    break
                res.append(c)
            return ''.join(res), fmt[i:]

        # return next seperator:
        d, sep, f = None, None, None
        if fmt:
            if fmt[0] == '%':
                d = fmt[1]
                sep, f = get_sep(fmt[2:])
            else:
                sep, f = get_sep(fmt)
        return d, sep, f

    # directive / value tuples go in here:
    dir_val = {}
    while ts:
        d, sep, fmt = get_next(fmt)
        if sep == '':
            lv = None
            if d:
                # we have a directive, seperator is empty. Is the directive
                # fixed length, with next w/o sep? e.g. %Y%Z ?
                # then get the next one like:
                l = -1
                if   d == 'Y': l = 4
                elif d == 'a': l = len(__weekdays[0])
                elif d == 'A': l = len(__weekdays_long[0])
                elif d == 'b': l = len(__months[0])
                elif d in ('d', 'm', 'H', 'M', 'S'):
                    l = 2
                if l > -1:
                    lv = [ts[:l], ts[l:]]
            if not lv:
                lv = [ts, '']
        else:
            lv = _lsplit(ts, sep, 1)
        if d == None:
            ts = lv[1]
            continue
        ts, dir_val[d] = lv[1], lv[0]
        if fmt == '':
            break
    # defaults when not specified:
    t = [1900, 1, 1, 0, 0, 0, 0, 1, -1]
    ignore_keys = []
    have_weekday = False
    for d, v in dir_val.items():
        if d in ignore_keys:
            continue

        if d == 'p':
            continue

        if d in __lu.keys():
            t[__lu[d]] = int(v)
            continue

        if d in ('a', 'A', 'b', 'B'):
            v = v.lower()

        if d == 'm':
            # we go the python 2(!) way for conflicting %b %m and take %m
            # why? because there IS no Py3 way (see strp time testlet)
            ignore_keys.append('b')
            ignore_keys.append('B')

        # better readable than short:
        if d == 'a':
            # funny. the weekday is only set but does not override %d.
            # -> produces impossible dates but well its how py does it:
            if not v in __weekdays:
                raise ValueError('Weekday unknown in your locale')
            have_weekday = True
            t[6] = __weekdays.index(v)

        elif d == 'A':
            if not v in __weekdays_long:
                raise ValueError('Weekday unknown in your locale')
            have_weekday = True
            t[6] = __weekdays_long.index(v)

        elif d == 'b':
            # month short. overruled by m if present
            if not v in __months:
                raise ValueError('Month unknown in your locale')
            t[1] = __months.index(v) + 1

        elif d == 'B':
            # month long. overruled by m if present
            if not v in __months_long:
                raise ValueError('Month unknown in your locale')
            t[1] = __months_long.index(v) + 1


        elif d == 'I':
            # 0-12 hour, with AM/PM.
            ampm = dir_val['p'] or 'am'
            ampm = ampm.lower()
            v = int(v)
            # thats how py does it
            if v == 12:
                v = 0
            elif v > 12:
                raise ValueError("time data '" + string + \
                        "' does not match format '" + format + "'")
            if ampm == 'pm':
                v += 12
            t[__lu['H']] = v

        elif d == 'y':
            t[0] = 2000 + int(v) # producing a y3k problem. try find me, then.

        elif d == 'Z':
            if v.lower() in ['gmt', 'utc']:
                t[-1] = 0

    # get day of year, costing us an object, to stay safe:
    __date = __new__(Date(0))
    __date.setUTCFullYear( t[0] )
    __date.setUTCMonth(t[1] -1 )
    __date.setUTCDate( t[2] )
    __date.setUTCHours(t[3])
    t[7] = _day_of_year(__date)
    if not have_weekday:
        t[6] = __date.getUTCDay() -1

    return t


def strftime(format, t):
    def zf2(v):
        ''' zfill missing '''
        if v < 10:
            return '0' + str(v)
        return v

    if not t:
        t = localtime()

    f = format
    for d in __lu.keys():
        k = '%' + d
        if not k in f:
            continue
        v = zf2(t[__lu[d]])
        f = f.replace(k, v)
    for d, l, pos in (('b', __months  , 1), ('B', __months_long  , 1),
                      ('a', __weekdays, 6), ('A', __weekdays_long, 6)):
        p = t[pos]
        if pos == 1:
            p = p -1
        v = l[p].capitalize()
        f = f.replace('%' + d, v)

    if '%p' in f:
        if t[3] > 11:
            ap = 'PM'
        else:
            ap = 'AM'
        f = f.replace('%p', ap)

    if '%y' in f:
        f = f.replace('%y', str(t[0])[-2:])

    if '%I' in f:
        v = t[3]
        if v == 0:
            v = 12
        elif v > 12:
            v = v - 12
        f = f.replace('%I', zf2(v))

    return f

