'''
testing strptime.

Note, Py3 bug:

while true; do
    python3.5 -c "import time; print(tuple(time.strptime('nov 1.1.1900', '%b %m.%d.%Y')))"
done

=> we simply cannot test conflicting %b %m switches,
it decides per run which one it takes(!!!), so autotest would fail randomly.

Verified with 3.4, 3.5 on mac and linux.

Root cause explained here: https://github.com/JdeH/Transcrypt/issues/85
'''

import time

# Note: The localized names for months and weekdays assumed to be english here.
# And the js implementation takes the names of the locale. That may fail the
# tests in other areas of the world. tried with export LANG other locales but
# did not get an error though.
# In any case the Js implementation of the checking the weekdays and monthnames
# should be safe.

def run (autoTester):
    def check(t, fmt):
        s = tuple(time.strptime(t, fmt))
        autoTester.check(' '.join([t, '[', fmt, '] = ']), s)

    check('FEb .1.1902'               , '%b .%d.%Y')
    check('3112199912:00:00pm'         , '%d%m%Y%H:%M:%S%p')
    check('FEb .1.1902'               , '%b .%d.%Y')
    check('M1.1.1901'                  , 'M%m.%d.%Y')
    check('2.1.1900'                   , '%m.%d.%Y')
    check('6.1.2000'                   , '%m.%d.%Y')
    check('nov .1.1900'                , '%b .%d.%Y')
    check('2.1.1900'                   , '%m.%d.%Y')
    check('december 1.1999'            , '%B %d.%Y')
    check('Tue Jul 18 19:32:11 2016'   , '%a %b %d %H:%M:%S %Y')
    check('31.12.1999 12:00:00pm'      , '%d.%m.%Y %I:%M:%S%p')
    check('TueJul 18 19:32:11 2016'    , '%a%b %d %H:%M:%S %Y')
    check('TueJul18 19:32:11 2016'     , '%a%b%d %H:%M:%S %Y')
    check('TueJul1819:32x112016'       , '%a%b%d%H:%Mx%S%Y')
    check('TueJul1819:32xx112016'      , '%a%b%d%H:%Mxx%S%Y')
