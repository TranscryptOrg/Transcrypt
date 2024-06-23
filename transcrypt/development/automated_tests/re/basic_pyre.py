# File: basic_pyre.py
#
# This file contains the basic regex tests run on the
# python translated regex expressions.
#

from org.transcrypt.stubs.browser import __pragma__
import re
from basictests import *

def run (test):
    """ basic tests of the re engine. The point is to
    exercise most of the methods to make sure they behave as
    expected. These tests are expected to provide exhaustive
    coverage of the regex engine.
    """
    checkFlagsExist(test)

    escapeTests(test)
    checkMatchProperties(test)
    checkRegexProperties(test)

    checkIgnoreCase(test)

    checkSearchWithGroups(test)
    checkMatchOps(test)
    checkMatchWithGroups(test)
    # checkMatchWithNamedGroups(test)           # !!! @JdeH temporarily disabled this
    checkFullMatchOps(test)
    checkFindAllOps(test)
    checkSplitOps(test)
    checkSubOps(test)
    checkSyntaxErrors(test)
    checkConditionalGroups(test)
    checkCommentGroup(test)
    checkWithFlags(test)

    checkFindIter(test)
