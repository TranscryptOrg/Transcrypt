''' general functions '''
import time

ts = 1468968009.638596 # a test timestamp
hy = 6 * 30 * 86400 # around half a year
# accommodate the offset between python and transcrypt run:
def run (autoTester):
    c = autoTester.check
    # rounding this one much, since test res is not updated when code not
    # changes (?)
    c('time():'         , int(time.time() / 1000))
    c('altzone:'        , time.altzone)
    c('timelen:'        , len(str(int(time.time()))))
    c('localtime:'      , list(time.localtime(ts)))
    c('ltime_no_dst:'   , list(time.localtime(ts + hy)))
    c('gmtime:'         , list(time.gmtime(ts)))
    c('daylight:'       , bool(time.daylight))
    c('timezone:'       , time.timezone)
    # c('tzname:'         , time.tzname) # Won't work under Windows 10, since it mixes up CET/CEST and WET/WEST and names CEST deviantly.
    # more tests in other testlests

