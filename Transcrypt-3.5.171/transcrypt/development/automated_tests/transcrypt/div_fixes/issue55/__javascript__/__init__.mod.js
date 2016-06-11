	__nest__ (
		__all__,
		'div_fixes.issue55', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var f1 = __init__ (__world__.div_fixes.issue55.a).f1;
					var p = __init__ (__world__.div_fixes.issue55.sub1).p;
					var q = __init__ (__world__.div_fixes.issue55.sub1).q;
					var r = __init__ (__world__.div_fixes.issue55.sub1).r;
					var anA = __init__ (__world__.div_fixes.issue55.sub2).anA;
					var aB = __init__ (__world__.div_fixes.issue55.sub2).aB;
					var y = __init__ (__world__.div_fixes.issue55.sub3).x;
					__pragma__ ('<use>' +
						'div_fixes.issue55.a' +
						'div_fixes.issue55.sub1' +
						'div_fixes.issue55.sub2' +
						'div_fixes.issue55.sub3' +
					'</use>')
					__pragma__ ('<all>')
						__all__.aB = aB;
						__all__.anA = anA;
						__all__.f1 = f1;
						__all__.p = p;
						__all__.q = q;
						__all__.r = r;
						__all__.y = y;
					__pragma__ ('</all>')
				}
			}
		}
	);
