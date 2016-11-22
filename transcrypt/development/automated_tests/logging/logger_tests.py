
from org.transcrypt.stubs.browser import __pragma__, __envir__

#from logging import *
import logging
#import logging as log

class TestHandler(logging.Handler):
    """ This handler is intended to make it easier to test the
    logging module output without requiring the console or the
    sys.stderr.
    """
    def __init__(self, test, level):
        """
        """
        logging.Handler.__init__(self, level)
        self._test = test

    def emit(self, record):
        """
        """
        msg = self.format(record)
        self._test.check(msg)


def logger_basics(test):
    # @note - basicConfig has some issues because the
    #   kwargs parameter is difficult work
    # basehdlr = TestHandler(test, 0)
    # fmt = logging.Formatter(style="{")
    # basehdlr.setFormatter(fmt)

    # logging.basicConfig(handlers = [basehdlr])

    logger = logging.getLogger("tester")
    test.check(logger.name)
    test.check(logger.level)
    test.check(logger.hasHandlers())

    # level set methods
    test.check(logger.getEffectiveLevel())
    logger.setLevel(10)
    test.check(logger.level)
    testLevel = "USERDEFLEVEL"
    test.check(test.expectException(lambda : logger.setLevel(testLevel)))
    test.check(logging.getLevelName(testLevel))
    for i in range(0,50,5):
        test.check(logging.getLevelName(i))

    logging.addLevelName(35, testLevel)
    test.check(logging.getLevelName(testLevel))
    for i in range(0,50,5):
        test.check(logging.getLevelName(i))

    for i in range(0,50,5):
        test.check(logger.isEnabledFor(i))


    hdlr = TestHandler(test, 30)
    fmt = logging.Formatter(style="{")
    hdlr.setFormatter(fmt)
    logger.addHandler(hdlr)

    test.check(logger.hasHandlers())

    logger.debug("This is a debug message")
    logger.info("This is an info message")
    logger.warning("This is a warning message")
    logger.error("This is an error message")
    logger.critical("The house is on fire")

    logger.setLevel(0)

    # @note - Transcrypt only has the '.format()' method for
    #    string formatting but python's logging module has a
    #    fixed mode using the old-style % formating concept
    #    this is obviously non-optimal from a testing perspective
    #    as well as form a interop perspective...

    if __envir__.executor_name == __envir__.transpiler_name:
        logger.debug("This is a debug msg {}", 1)
    else:
        logger.debug("This is a debug msg %d", 1)

    if __envir__.executor_name == __envir__.transpiler_name:
        logger.info("This is an info message: {}", "blarg")
    else:
        logger.info("This is an info message: %s", "blarg")

    if __envir__.executor_name == __envir__.transpiler_name:
        logger.warning("This is a {} warning message in the {}", "blue", "barn")
    else:
        logger.warning("This is a %s warning message in the %s", "blue", "barn")

    if __envir__.executor_name == __envir__.transpiler_name:
        logger.error("This is an error message: {} {} {}", 3, "23", 4)
    else:
        logger.error("This is an error message: %d %s %d", 3, "23", 4)

    logger.critical("The house is on fire")

    # Test the handler level change
    hdlr.setLevel(30)
    logger.debug("This is a debug msg {}", 1)
    logger.info("This is an info message: {}", "blarg")
    if __envir__.executor_name == __envir__.transpiler_name:
        logger.warning("This is a {} warning message in the {}", "blue", "barn")
    else:
        logger.warning("This is a %s warning message in the %s", "blue", "barn")

    if __envir__.executor_name == __envir__.transpiler_name:
        logger.error("This is an error message: {} {} {}", 3, "23", 4)
    else:
        logger.error("This is an error message: %d %s %d", 3, "23", 4)

    logger.critical("The house is on fire")


def logging_api_tests(test):

    logger = logging.getLogger()
    logger.setLevel(20)
    hdlr = TestHandler(test, 30)
    fmt = logging.Formatter(style="{")
    hdlr.setFormatter(fmt)
    logger.addHandler(hdlr)

    logging.critical("Another Crazy Message!")
    logging.error("Oh the humanity")
    logging.warning("Is it hot in here?")
    logging.info("Big Bird says Hello!")
    logging.debug("No body gonna see this message")

    logger.setLevel(40)

    logging.critical("Another Crazy Message!")
    logging.error("Oh the humanity")
    logging.warning("Is it hot in here?")
    logging.info("Big Bird says Hello!")
    logging.debug("No body gonna see this message")

    hdlr.setLevel(20)

    logging.critical("Another Crazy Message!")
    logging.error("Oh the humanity")
    logging.warning("Is it hot in here?")
    logging.info("Big Bird says Hello!")
    logging.debug("No body gonna see this message")

    hdlr.setLevel(39)

    logging.critical("Another Crazy Message!")
    logging.error("Oh the humanity")
    logging.warning("Is it hot in here?")
    logging.info("Big Bird says Hello!")
    logging.debug("No body gonna see this message")

    hdlr.setLevel(41)

    logging.critical("Another Crazy Message!")
    logging.error("Oh the humanity")
    logging.warning("Is it hot in here?")
    logging.info("Big Bird says Hello!")
    logging.debug("No body gonna see this message")

    hdlr.setLevel(40)

    logging.critical("Another Crazy Message!")
    logging.error("Oh the humanity")
    logging.warning("Is it hot in here?")
    logging.info("Big Bird says Hello!")
    logging.debug("No body gonna see this message")

    logger.setLevel(39)

    logging.critical("Another Crazy Message!")
    logging.error("Oh the humanity")
    logging.warning("Is it hot in here?")
    logging.info("Big Bird says Hello!")
    logging.debug("No body gonna see this message")


def formatter_tests(test):
    """ This function contains some tests of the formatter objects
    """
    logger = logging.getLogger("fmttest")
    logger.setLevel(10)

    hdlr = TestHandler(test, 30)
    fmt = logging.Formatter(style="{", fmt="{levelname}:{name}:{message}")
    test.check(fmt.usesTime())
    hdlr.setFormatter(fmt)
    logger.addHandler(hdlr)

    hdlr.setLevel(30)
    test.check(hdlr.name)
    hdlr.name = "Asdf"
    test.check(hdlr.name)
    test.check(hdlr.level)

    test.check(logger.hasHandlers())

    logger.debug("This is a debug message")
    logger.info("This is an info message")
    logger.warning("This is a warning message")
    logger.error("This is an error message")
    logger.critical("The house is on fire")

    hdlr.setLevel(0)

    logger.debug("This is a debug message")
    logger.info("This is an info message")
    logger.warning("This is a warning message")
    logger.error("This is an error message")
    logger.critical("The house is on fire")


def console_test(test):
    """ @note- this test will only generate minimal
    autotester results but can be manually inspected in the
    console.log
    """
    logger = logging.getLogger("consoleTest")

    logger.setLevel(10)

    hdlr = TestHandler(test, 30)
    fmt = logging.Formatter(style="{", fmt="{name}:{message}")
    test.check(fmt.usesTime())
    hdlr.setFormatter(fmt)
    hdlr.setLevel(20)
    logger.addHandler(hdlr)

    shdlr = logging.StreamHandler()
    shdlr.setFormatter(fmt)
    shdlr.setLevel(20)
    logger.addHandler(shdlr)

    logger.debug("This is a debug message")
    logger.info("This is an info message")
    logger.warning("This is a warning message")
    logger.error("This is an error message")
    logger.critical("The house is on fire")

    shdlr.setLevel(10)

    logger.debug("This is a debug message")
    logger.info("This is an info message")
    logger.warning("This is a warning message")
    logger.error("This is an error message")
    logger.critical("The house is on fire")

    shdlr.setLevel(40)

    logger.debug("This is a debug message")
    logger.info("This is an info message")
    logger.warning("This is a warning message")
    logger.error("This is an error message")
    logger.critical("The house is on fire")


def run(test):
    """ These are general logging test for the Logger class and
    associated classes. This does not cover the configuration module.
    """

    logger_basics(test)
    logging_api_tests(test)
    formatter_tests(test)
    console_test(test)
