

import logging
import logging.handlers as hdlr
from utils import TestHandler, resetLogging

class DemoBufferingFormatter(logging.BufferingFormatter):
    """
    """
    def formatHeader( self, records):
        """
        """
        return "------ {} Records ------\n".format(len(records))


class BetterBufferingHandler(hdlr.MemoryHandler):

    def flush(self):
        """ Overriding the flush method so that we can
        test with the BufferingFormatter objects"""
        self.acquire()
        try:
            if self.target:
                if self.formatter:
                    aggregate = self.formatter.format(self.buffer)
                    self.target.handle(aggregate)
                else:
                    raise NotImplementedError()
            self.buffer = []
        except Exception:
            raise
        finally:
            self.release()

class TestBuffering(logging.Handler):
    def __init__(self, test):
        logging.Handler.__init__(self)
        self._test = test

    def emit(self, record):
        msg = record
        self._test.check(msg)


def run(test):
    """ This tests the buffering handlers which will be
    important for the AJAX and possibly other loggin handlers.
    """

    resetLogging()
    thdlr = TestBuffering(test)
    thdlr.setLevel(2)


    bufHdlr = BetterBufferingHandler(3)
    linefmt = logging.Formatter("{levelname}:{message}", style="{")
    fmt = DemoBufferingFormatter(linefmt)
    bufHdlr.setFormatter(fmt)
    bufHdlr.setTarget(thdlr)

    root = logging.getLogger()
    root.setLevel(5)
    root.addHandler(bufHdlr)

    root.debug("One")
    root.info("Dos")
    root.warning("Tres")

    root.debug("One")
    root.info("Dos")
    root.warning("Tres")

    root.debug("One")
    root.info("Dos")
    root.warning("Tres")

    root.debug("One")
    root.error("Dos")
    root.error("Tres")
