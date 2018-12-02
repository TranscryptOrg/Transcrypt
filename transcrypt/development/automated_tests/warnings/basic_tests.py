
from org.transcrypt.stubs.browser import __pragma__, __envir__

import warnings
import logging


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
        # @note - I'm using strip on the end of the record message
        #    because there are spaces and newlines after the message
        #    that are not substantive but do make the unit test
        #    more difficult
        #    Python includes the line content in the source file at
        #    the specified line which we can't really do in js right now
        content = msg.split('\n')
        if ( len(content) > 0 ):
            checkMsg = content[0].rstrip()
            self._test.check(checkMsg)
        else:
            self._test.check("Invalid Content in Warning message")


def run(test):

    # This message should go to the console - has to be checked manually
    warnings.warn_explicit(
        "Console Test Message", UserWarning, "basic_tests.py", 37, "asdf", {}
    )

    # Setup logger so that we can capture test output
    # and show in the logger.
    logging.captureWarnings(True)
    logger = logging.getLogger("py.warnings")
    logger.setLevel(10)
    hdlr = TestHandler(test, 10)
    logger.addHandler(hdlr)

    msgStr = "Test Message"

    # The registry info we pass in replaces the
    # warnings.__warningregistry__ dict so that we
    # can more accurately test.
    reg = {}

    # @note - it is very difficult to compare warnings.warn against
    #    python - python just has more information available and so
    #    the content is much more diverse.
    #warnings.warn("Invalid asdf asdf asdf")

    warnings.warn_explicit(
        msgStr, UserWarning, "basic_tests.py", 50, "asdf", reg
    )
    warnings.warn_explicit(
        msgStr, UserWarning, "basic_tests.py", 53, "asdf", reg
    )
    warnings.warn_explicit(
        msgStr, UserWarning, "basic_tests.py", 57, "asdf", reg
    )

    # @note - this message should not generate
    warnings.warn_explicit(
        msgStr, UserWarning, "basic_tests.py", 57, "asdf", reg
    )

    # This message should generate
    warnings.warn_explicit(
        msgStr + " blarg", UserWarning, "basic_tests.py", 57, "asdf", reg
    )

    # this message should not generate
    warnings.warn_explicit(
        msgStr + " blarg", UserWarning, "basic_tests.py", 57, "asdf", reg
    )



    reg = {}

    class CustomWarning(Warning):
        """
        """
        pass

    if __envir__.executor_name == __envir__.transpiler_name:
        warnings.addWarningCategory(CustomWarning)

    # This sets the warnings module to generate an exception
    # on a particular warning category.
    warnings.filterwarnings("error", category=CustomWarning)

    test.check( test.expectException( lambda: warnings.warn_explicit(
        "This is a custom msg", CustomWarning,
        "basic_tests.py", 91, "zxcv", reg
    )))

    warnings.filterwarnings("once", category=RuntimeWarning)

    msg = "This is a once message - should not occur more than once"
    warnings.warn_explicit(
        msg, RuntimeWarning,
        "basic_tests.py", 100, "trew", reg
        )

    # @note- this message should not be generated
    for i in range(0,10):
        warnings.warn_explicit(
            msg, RuntimeWarning, "basic_tests.py", 102+i,
            "qwerqwer" + str(i), reg
        )

    warnings.filterwarnings("always", message = "asdf", category=DeprecationWarning)

    # these 3 messages should not generate
    warnings.warn_explicit(
        " no Message Here ", DeprecationWarning, "basic_tests.py", 112,
        "itururue", reg
        )

    warnings.warn_explicit(
        "Warning - asdf of qwer", DeprecationWarning, "basic_tests.py", 112,
        "itururue", reg
        )

    warnings.warn_explicit(
        "Warning - asdfqwer of qwer", DeprecationWarning, "basic_tests.py", 112,
        "itururue", reg
        )

    # These message should generate
    warnings.warn_explicit(
        "asdf of qwer", DeprecationWarning, "basic_tests.py", 112,
        "itururue", reg
        )

    warnings.warn_explicit(
        "asdf of qwer", UserWarning, "basic_tests.py", 112,
        "itururue", reg
        )

    # Warning with object instead of string message
    warnings.warn_explicit(
        UserWarning("asdf"), None, "basic_tests.py", 1234, "qwerqwe", reg
    )
