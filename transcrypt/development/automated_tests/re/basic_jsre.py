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
    """
    checkFlagsExist(test)
    escapeTests(test)
    checkMatchProperties(test, re.JSSTRICT)
    checkRegexProperties(test, re.JSSTRICT)

    checkIgnoreCase(test, re.JSSTRICT)

    checkSearchWithGroups(test, re.JSSTRICT)
    checkMatchOps(test, re.JSSTRICT)
    checkMatchWithGroups(test, re.JSSTRICT)
    #checkMatchWithNamedGroups(test, re.JSSTRICT)

    checkFullMatchOps(test, re.JSSTRICT)
    checkFindAllOps(test, re.JSSTRICT)
    checkSplitOps(test, re.JSSTRICT)
    checkSubOps(test, re.JSSTRICT)
    checkSyntaxErrors(test, re.JSSTRICT)
    #checkConditionalGroups(test, re.JSSTRICT)
    #checkCommentGroup(test, re.JSSTRICT)
    #checkWithFlags(test, re.JSSTRICT)

    checkFindIter(test, re.JSSTRICT)
