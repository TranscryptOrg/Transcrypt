	__nest__ (
		__all__,
		'basic_pyre', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var re = {};
					__nest__ (re, '', __init__ (__world__.re));
					var checkCommentGroup = __init__ (__world__.basictests).checkCommentGroup;
					var checkConditionalGroups = __init__ (__world__.basictests).checkConditionalGroups;
					var checkFindAllOps = __init__ (__world__.basictests).checkFindAllOps;
					var checkFindIter = __init__ (__world__.basictests).checkFindIter;
					var checkFlagsExist = __init__ (__world__.basictests).checkFlagsExist;
					var checkFullMatchOps = __init__ (__world__.basictests).checkFullMatchOps;
					var checkIgnoreCase = __init__ (__world__.basictests).checkIgnoreCase;
					var checkMatchOps = __init__ (__world__.basictests).checkMatchOps;
					var checkMatchProperties = __init__ (__world__.basictests).checkMatchProperties;
					var checkMatchWithGroups = __init__ (__world__.basictests).checkMatchWithGroups;
					var checkMatchWithNamedGroups = __init__ (__world__.basictests).checkMatchWithNamedGroups;
					var checkRegexProperties = __init__ (__world__.basictests).checkRegexProperties;
					var checkSearchWithGroups = __init__ (__world__.basictests).checkSearchWithGroups;
					var checkSplitOps = __init__ (__world__.basictests).checkSplitOps;
					var checkSubOps = __init__ (__world__.basictests).checkSubOps;
					var checkSyntaxErrors = __init__ (__world__.basictests).checkSyntaxErrors;
					var checkWithFlags = __init__ (__world__.basictests).checkWithFlags;
					var escapeTests = __init__ (__world__.basictests).escapeTests;
					var testStr1 = __init__ (__world__.basictests).testStr1;
					var testStr2 = __init__ (__world__.basictests).testStr2;
					var testStr3 = __init__ (__world__.basictests).testStr3;
					var testStr4 = __init__ (__world__.basictests).testStr4;
					var run = function (test) {
						checkFlagsExist (test);
						escapeTests (test);
						checkMatchProperties (test);
						checkRegexProperties (test);
						checkIgnoreCase (test);
						checkSearchWithGroups (test);
						checkMatchOps (test);
						checkMatchWithGroups (test);
						checkFullMatchOps (test);
						checkFindAllOps (test);
						checkSplitOps (test);
						checkSubOps (test);
						checkSyntaxErrors (test);
						checkConditionalGroups (test);
						checkCommentGroup (test);
						checkWithFlags (test);
						checkFindIter (test);
					};
					__pragma__ ('<use>' +
						'basictests' +
						're' +
					'</use>')
					__pragma__ ('<all>')
						__all__.checkCommentGroup = checkCommentGroup;
						__all__.checkConditionalGroups = checkConditionalGroups;
						__all__.checkFindAllOps = checkFindAllOps;
						__all__.checkFindIter = checkFindIter;
						__all__.checkFlagsExist = checkFlagsExist;
						__all__.checkFullMatchOps = checkFullMatchOps;
						__all__.checkIgnoreCase = checkIgnoreCase;
						__all__.checkMatchOps = checkMatchOps;
						__all__.checkMatchProperties = checkMatchProperties;
						__all__.checkMatchWithGroups = checkMatchWithGroups;
						__all__.checkMatchWithNamedGroups = checkMatchWithNamedGroups;
						__all__.checkRegexProperties = checkRegexProperties;
						__all__.checkSearchWithGroups = checkSearchWithGroups;
						__all__.checkSplitOps = checkSplitOps;
						__all__.checkSubOps = checkSubOps;
						__all__.checkSyntaxErrors = checkSyntaxErrors;
						__all__.checkWithFlags = checkWithFlags;
						__all__.escapeTests = escapeTests;
						__all__.run = run;
						__all__.testStr1 = testStr1;
						__all__.testStr2 = testStr2;
						__all__.testStr3 = testStr3;
						__all__.testStr4 = testStr4;
					__pragma__ ('</all>')
				}
			}
		}
	);
