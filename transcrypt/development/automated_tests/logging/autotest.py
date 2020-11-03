# Main unit test platform for the logging module

from org.transcrypt.stubs.browser import __pragma__
import org.transcrypt.autotester

import logger_tests
import config_tests
import basicConfig_tests
import buffering_tests

autoTester = org.transcrypt.autotester.AutoTester ()

autoTester.run( logger_tests, "logger_tests" )
autoTester.run( config_tests, "config_tests" )
autoTester.run( basicConfig_tests, "basicConfig_tests" )
autoTester.run( buffering_tests, "buffering_tests")

autoTester.done()
