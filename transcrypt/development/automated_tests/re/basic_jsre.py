from org.transcrypt.stubs.browser import __pragma__
import re
__pragma__("skip")
re.J = (1<<19)
re.JSSTRICT = re.J
__pragma__("noskip")

from basictests import *

def run (test):
    """ basic tests of the re engine. The point is to
    exercise most of the methods to make sure they behave as
    expected. These tests are expected to provide exhaustive
    coverage of the regex engine.

    Note that we can only test the features
    supported by the browsers regex engine. Advanced features
    like named capture groups are only available when not using
    the JSSTRICT flag (which indicates that the browser engine
    should be used).
    """
    checkFlagsExist(test)
    escapeTests(test)
    checkMatchProperties(test, re.JSSTRICT)
    checkRegexProperties(test, re.JSSTRICT)

    checkIgnoreCase(test, re.JSSTRICT)

    checkSearchWithGroups(test, re.JSSTRICT)
    checkMatchOps(test, re.JSSTRICT)
    checkMatchWithGroups(test, re.JSSTRICT)
    checkFullMatchOps(test, re.JSSTRICT)
    checkFindAllOps(test, re.JSSTRICT)
    checkSplitOps(test, re.JSSTRICT)
    checkSubOps(test, re.JSSTRICT)
    checkSyntaxErrors(test, re.JSSTRICT)
    checkFindIter(test, re.JSSTRICT)
