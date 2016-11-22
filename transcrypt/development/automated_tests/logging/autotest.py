# Main unit test platform for the logging module

from org.transcrypt.stubs.browser import __pragma__
import org.transcrypt.autotester

import logger_tests

autoTester = org.transcrypt.autotester.AutoTester ()

autoTester.run( logger_tests, "logger_tests" )

autoTester.done()
