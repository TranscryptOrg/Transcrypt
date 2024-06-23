# Utilities for implementating the unit tests for the
# logging module.
#
from org.transcrypt.stubs.browser import __pragma__, __envir__
import logging

__pragma__("kwargs")

class TestHandler(logging.Handler):
    """ This handler is intended to make it easier to test the
    logging module output without requiring the console or the
    sys.stderr.
    """
    def __init__(self, test, lvl):
        """
        @param test AutoTester object that messages will
          be logged to for unit testing.
        @param level logging level that will be filtered.
        """
        logging.Handler.__init__(self, lvl)
        self._test = test

    def emit(self, record):
        """
        """
        msg = self.format(record)
        self._test.check(msg)

def resetLogging():
    """ Reset the handlers and loggers so that we
    can rerun the tests starting from a blank slate.
    """
    __pragma__("skip")
    logging._handlerList = []

    import weakref
    logging._handlers = weakref.WeakValueDictionary()

    logging.root = logging.RootLogger(logging.WARNING)
    logging.Logger.root = logging.root
    logging.Logger.manager = logging.Manager(logging.root)
    logging.root.manager = logging.Logger.manager
    __pragma__("noskip")

    if __envir__.executor_name == __envir__.transpiler_name:
        logging._resetLogging()
