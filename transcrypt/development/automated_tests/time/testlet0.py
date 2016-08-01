''' general functions '''
import time


# accommodate the offset between python and transcrypt run:

def run (autoTester):
    c = autoTester.check
    c('altzone:'    , time.altzone)
    # rounding this one much, since test res is not updated when code not
    # changes (?)
    c('time():'     , int(time.time() / 1000))
    c('timelen:'    , len(str(int(time.time()))))
    # more tests in other testlests:
    c('localtime:'  , list(time.localtime(1468968009.638596)))
    c('gmtime:'     , list(time.gmtime(1468968009.638596)))
    c('daylight:'  ,  bool(time.daylight))
    c('timezone:'  ,  time.timezone)
    c('tzname:'  ,    time.tzname)
	