from org.transcrypt.stubs.browser import __pragma__, __envir__
from utils import TestHandler, resetLogging
import logging
import logging.config

__pragma__("kwargs")

class TestFilter(logging.Filter):
    """ This a test of the custom filter object concept
    """
    def __init__(self, modulo):
        """
        """
        if ( modulo <= 0 ):
            raise ValueError("Invalid Modulo Value")
        self._modulo = modulo
        self._cnt = 0

    def filter(self, record):
        """
        """
        ret = False
        self._cnt += 1
        if ( self._cnt > self._modulo  ):
            self._cnt = 0
            ret = True
        return(ret)


class TestFormatter(logging.Formatter):
    """This a test of the custom formatter object concept
    """
    def __init__(self, format=None, datefmt=None, style='{'):
        """
        """
        logging.Formatter.__init__(self, format, datefmt, style)

    def format(self, record):
        """ Override the format Method
        """
        msg = logging.Formatter.format(self, record)
        msg = "Custom: " + msg
        return(msg)

def run(test):
    """
    """
    resetLogging()

    d = {
        "version" : 1,
        "formatters": {
            "fmt1" : {
                "format": "{levelname}:{asctime}:{name}:{message}",
                "datefmt": "%H:%M:%S",
                "style": "{",
            },
            "fmt2" : {
                "format" : "{name}_{levelname}_{message}",
                "style": "{",
            },
            "fmt3" : {
                "()" : TestFormatter,
                "format" : "[{name}]_{message}",
                "style" : "{",
            },
        },
        "filters" : {
            "filt1": {
                '()': TestFilter,
                'modulo': 2,
            },
        },
        "handlers" : {
            "hdlr1": {
                "class": "logging.StreamHandler", #TestHandler,
                "formatter": "fmt1",
                "level": "DEBUG",
                "filters": ["filt1"],
            },
            "hdlr2": {
                "class" : "utils.TestHandler",
                "formatter": "fmt2",
                "filters": [],
                "level": "WARNING",
                "test" : test,
                "lvl" : 1,
            },
            "hdlr3": {
                "class" : "utils.TestHandler",
                "formatter": "fmt3",
                "level": "INFO",
                "test" : test,
                "lvl" : 2,
            },
        },
        'root': {
            'level': "INFO",
            'handlers': ["hdlr1"]
        },
        "loggers": {
            "test1": {
                "level": 30,
                "filters": [],
                "handlers": ["hdlr2", "hdlr3"],
            },
        }
    }

    if __envir__.executor_name == __envir__.transpiler_name:
        logging.config.addResolvable("utils.TestHandler", TestHandler)

    logging.config.dictConfig(d)
    tlog = logging.getLogger("test1")

    test.check( len(tlog.handlers) )
    test.check( len(tlog.filters) )
    test.check( tlog.level )


    for i in range(0, 10):
        logging.debug("1234")
        logging.info("asdf")
        logging.warning("ioureoiu")
        logging.error("jekwejrjek")
        logging.critical("jlkjelkjwelkr")

        tlog.debug("1234")
        tlog.info("asdf")
        tlog.warning("ioureoiu")
        tlog.error("jekwejrjek")
        tlog.critical("jlkjelkjwelkr")
