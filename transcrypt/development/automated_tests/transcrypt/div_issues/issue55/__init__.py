'''
This sub-testlet only tests for error-free compilation.
It doesn't produce any output that's back to back checked with CPython output.
'''

from div_issues.issue55.a import f1

from div_issues.issue55.sub1 import *
from div_issues.issue55.sub2 import anA, aB
from div_issues.issue55.sub3 import x as y
