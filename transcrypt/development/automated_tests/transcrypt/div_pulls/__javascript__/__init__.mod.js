	__nest__ (
		__all__,
		'div_pulls', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var aB = __init__ (__world__.div_fixes.issue55).aB;
					var anA = __init__ (__world__.div_fixes.issue55).anA;
					var f1 = __init__ (__world__.div_fixes.issue55).f1;
					var p = __init__ (__world__.div_fixes.issue55).p;
					var q = __init__ (__world__.div_fixes.issue55).q;
					var r = __init__ (__world__.div_fixes.issue55).r;
					var y = __init__ (__world__.div_fixes.issue55).y;
					var run = function (autoTester) {
						autoTester.check ('Pull 56');
						var s = 'abcdefghij';
						autoTester.check (s.__getslice__ (2, 3, 1));
						autoTester.check (s.__getslice__ (0, 3, 1));
						autoTester.check (s.__getslice__ (2, null, 1));
						autoTester.check (s.__getslice__ (0, null, 2));
					};
					__pragma__ ('<use>' +
						'div_fixes.issue55' +
					'</use>')
					__pragma__ ('<all>')
						__all__.aB = aB;
						__all__.anA = anA;
						__all__.f1 = f1;
						__all__.p = p;
						__all__.q = q;
						__all__.r = r;
						__all__.run = run;
						__all__.y = y;
					__pragma__ ('</all>')
				}
			}
		}
	);
