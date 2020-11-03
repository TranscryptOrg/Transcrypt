from datetime import date, timedelta, datetime, timezone

# __pragma__('opov')

def fix_time (dt):
    if dt.hour > 23:
        dt = dt - timedelta (minutes=60)
    if dt.minute > 50:
        dt = dt - timedelta (minutes=10)
    return dt

def run (autoTester):
    # timezone
    tz = timezone.utc
    autoTester.check (repr (tz))

    tz2 = timezone (timedelta (hours=-5), 'EST')
    autoTester.check (repr (tz2))

    now = fix_time (datetime.utcnow ())
    now2 = fix_time (datetime.now (timezone.utc))
    autoTester.check (now.day == now2.day)
    autoTester.check (now.hour == now2.hour)
    autoTester.check (now.replace (tzinfo=timezone.utc).astimezone (tz=None).hour)

    # timedelta
    delta = timedelta (days=8, minutes=15, microseconds=685)
    delta2 = timedelta (days=8, minutes=15, microseconds=684)
    autoTester.check (delta)
    autoTester.check (delta2)

    # timedelta comparisons
    autoTester.check (delta == delta2)
    autoTester.check (delta > delta2)
    autoTester.check (delta < delta2)

    # date
    d = date (2017, 5, 5)
    autoTester.check (d.day)
    d = date.today ()
    autoTester.check (d)
    autoTester.check (d.day)
    autoTester.check (d.weekday ())
    autoTester.check (d.isoweekday ())
    autoTester.check (d.isocalendar ())
    autoTester.check (d.ctime ())
    d = d.replace (day=28)
    autoTester.check (d.day)
    autoTester.check (d.strftime ('%Y.%m.%d'))
    autoTester.check (d.ctime ())
    autoTester.check (d.isoformat ())

    # date comparisons
    d2 = d + delta
    d3 = d2 - delta
    autoTester.check (d)
    autoTester.check (d2)
    autoTester.check (d3)
    autoTester.check (d == d3)
    autoTester.check (d > d3)
    autoTester.check (d < d3)
    autoTester.check (d == d2)
    autoTester.check (d > d2)
    autoTester.check (d < d2)

    # datetime
    now = fix_time (datetime.now ())
    autoTester.check (now.day)
    autoTester.check (now.hour)
    autoTester.check ((now + timedelta (days=2)).day)

    d = datetime (2010, 1, 1, tzinfo=timezone.utc)
    autoTester.check (d)

    d = datetime (2017, 9, 19, 15, 43, 8, 142)
    autoTester.check (d)
    autoTester.check (d - timedelta (minutes=150))

    d = datetime.strptime ('2017-03-14 15:28:14', '%Y-%m-%d %H:%M:%S')
    autoTester.check (d)
    autoTester.check (d.strftime ('%Y.%m.%d %H:%M:%S'))
    d = d + timedelta (hours=5, minutes=18, seconds=25)
    autoTester.check (d.strftime ('%Y-%m-%d %H:%M:%S'))
    d = d.replace (year=2016, month=1)
    autoTester.check (d.ctime ())
    autoTester.check (d.isoformat ())
    autoTester.check (d.date ())
    autoTester.check (d.time ())
    # named tuples not supported, need to convert
    autoTester.check (tuple (d.timetuple ()))
    autoTester.check (tuple (d.utctimetuple ()))

    # datetime comparisons
    d2 = d + delta
    d3 = d2 - delta
    autoTester.check (d)
    autoTester.check (d2)
    autoTester.check (d3)
    autoTester.check (d == d3)
    autoTester.check (d > d3)
    autoTester.check (d < d3)
    autoTester.check (d == d2)
    autoTester.check (d > d2)
    autoTester.check (d < d2)