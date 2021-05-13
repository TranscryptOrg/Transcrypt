
from org.transcrypt.stubs.browser import __pragma__, __envir__

import logging
from utils import TestHandler, resetLogging


def logger_basics(test):

    resetLogging()

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

    resetLogging()

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

    resetLogging()

    logger = logging.getLogger("fmttest")
    logger.setLevel(10)

    hdlr = TestHandler(test, 30)
    fmt = logging.Formatter("{levelname}:{name}:{message}", style="{")
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
    resetLogging()

    logger = logging.getLogger("consoleTest")

    logger.setLevel(10)

    hdlr = TestHandler(test, 30)
    fmt = logging.Formatter("{name}:{message}", style="{")
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


def placeholder_testing(test):
    """ This test is intended to manage placeholding of loggers
    For example creating "asdf.qwer.eer" when "asdf.qwer" does not
    exit
    """

    logger = logging.getLogger("phtest.middle.testme")
    logger.setLevel(10)

    hdlr = TestHandler(test, 5)
    fmt = logging.Formatter("{levelname}:{name}:{message}", style="{")
    hdlr.setFormatter(fmt)
    logger.addHandler(hdlr)

    logger.error("Gen a message")

    log2 = logging.getLogger("phtest.middle")
    log2.setLevel(10)
    log2.addHandler(hdlr)

    log2.info("This is another message")

    log3 = logging.getLogger("phtest")
    log3.setLevel(10)
    log3.addHandler(hdlr)
    log3.info("Yet another message")

    # Now let's go the opposite way

    logger = logging.getLogger("mngtest")
    logger.setLevel(10)
    logger.addHandler(hdlr)

    logger.error("Gen a message 2 - the generating")

    log2 = logging.getLogger("mngtest.mid")
    log2.setLevel(10)
    log2.addHandler(hdlr)

    log2.info("This is another message 2 - the anothering")

    log3 = logging.getLogger("mngtest.mid.end")
    log3.setLevel(10)
    log3.addHandler(hdlr)
    log3.info("Yet another message 2 - the whatever...")


def run(test):
    """ These are general logging test for the Logger class and
    associated classes. This does not cover the configuration module.
    """

    logger_basics(test)
    logging_api_tests(test)
    formatter_tests(test)
    console_test(test)
    placeholder_testing(test)
