# This file contains some unit tests for the logging.basicConfig
# method.

from org.transcrypt.stubs.browser import __pragma__, __envir__
import logging
from utils import TestHandler, resetLogging

def run(test):
    """
    """
    resetLogging()

    basehdlr = TestHandler(test, 5)
    fmt = logging.Formatter(style="{")
    basehdlr.setFormatter(fmt)

    logging.basicConfig(handlers = [basehdlr], level=logging.INFO)

    root = logging.getLogger()
    test.check(root.hasHandlers())
    test.check(root.level)
    test.check(len(root.handlers))
    hdlr = root.handlers[0]
    test.check(hdlr.level)

    logging.debug("Never gonna give you up")
    logging.info("Never gonna let you go")
    logging.warning("Never gonna run around and desert you")
    logging.error("Never gonna make you cry")

    root.setLevel(logging.DEBUG)

    logging.debug("Never gonna give you up")
    logging.info("Never gonna let you go")
    logging.warning("Never gonna run around and desert you")
    logging.error("Never gonna make you cry")
