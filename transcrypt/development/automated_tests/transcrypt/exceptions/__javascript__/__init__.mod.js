	__nest__ (
		__all__,
		'exceptions', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					if (__envir__.executor_name == __envir__.transpiler_name) {
						var BaseException = __class__ ('BaseException', [object], {
						});
					}
					var Ex1 = __class__ ('Ex1', [Exception], {
					});
					var Ex2 = __class__ ('Ex2', [Ex1], {
					});
					var Ex3 = __class__ ('Ex3', [Exception], {
					});
					var Table = __class__ ('Table', [BaseException], {
						get __init__ () {return __get__ (this, function (self) {
							var args = tuple ([].slice.apply (arguments).slice (1));
							self.fields = args;
						});},
						get __repr__ () {return __get__ (this, function (self) {
							return 'Table' + repr (self.fields).py_replace (', ', ',').py_replace ("'", '');
						});}
					});
					var test1 = function () {
						var __except0__ = Exception ('mary');
						__except0__.__cause__ = null;
						throw __except0__;
					};
					var test2 = function (autoTester) {
						try {
							test1 ();
						}
						catch (__except0__) {
							if (isinstance (__except0__, Ex1)) {
								var exception = __except0__;
								autoTester.check (111);
								autoTester.check (exception);
							}
							else if (isinstance (__except0__, Exception)) {
								var exception = __except0__;
								autoTester.check (222);
								autoTester.check (exception);
							}
							else {
								throw __except0__;
							}
						}
					};
					var run = function (autoTester) {
						test2 (autoTester);
						try {
							var __except0__ = Ex2 ('had');
							__except0__.__cause__ = null;
							throw __except0__;
						}
						catch (__except0__) {
							if (isinstance (__except0__, Ex1)) {
								var exception = __except0__;
								autoTester.check ('a');
							}
							else if (isinstance (__except0__, Exception)) {
								var exception = __except0__;
								autoTester.check ('little');
								autoTester.check (exception);
							}
							else {
								throw __except0__;
							}
						}
						autoTester.check (333);
						try {
							var __except0__ = Ex1 ('lamb');
							__except0__.__cause__ = null;
							throw __except0__;
						}
						catch (__except0__) {
							if (isinstance (__except0__, Ex2)) {
								var exception = __except0__;
								autoTester.check ('his');
								autoTester.check (exception);
							}
							else if (isinstance (__except0__, Ex1)) {
								var exception = __except0__;
								autoTester.check ('fleece');
								autoTester.check (exception);
							}
							else if (isinstance (__except0__, Exception)) {
								var exception = __except0__;
								autoTester.check ('was');
								autoTester.check (exception);
							}
							else {
								throw __except0__;
							}
						}
						finally {
							autoTester.check ('white');
						}
						autoTester.check (444);
						var test3 = function () {
							var __except0__ = Ex3 ('as');
							__except0__.__cause__ = null;
							throw __except0__;
						};
						autoTester.check (555);
						try {
							test3 ();
						}
						catch (__except0__) {
							if (isinstance (__except0__, Ex1)) {
								var exception = __except0__;
								autoTester.check ('snow');
								autoTester.check (exception);
							}
							else if (isinstance (__except0__, Exception)) {
								var exception = __except0__;
								autoTester.check ('and');
								autoTester.check (exception);
							}
							else {
								throw __except0__;
							}
						}
						finally {
							autoTester.check ('everywhere');
						}
						autoTester.check (666);
						try {
							var __except0__ = Ex3 ('that');
							__except0__.__cause__ = null;
							throw __except0__;
						}
						catch (__except0__) {
							if (isinstance (__except0__, Ex1)) {
								var exception = __except0__;
								autoTester.check ('mary');
								autoTester.check (exception);
							}
							else autoTester.check ('went');
						}
						finally {
							autoTester.check ('the');
						}
						autoTester.check (777);
						try {
							try {
								var __except0__ = Ex3 ('lamb');
								__except0__.__cause__ = null;
								throw __except0__;
							}
							catch (__except0__) {
								if (isinstance (__except0__, Ex1)) {
									var exception = __except0__;
									autoTester.check ('was');
									autoTester.check (exception);
								}
								else {
									throw __except0__;
								}
							}
							finally {
								autoTester.check ('to');
							}
						}
						catch (__except0__) {
							if (isinstance (__except0__, Ex3)) {
								var exception = __except0__;
								autoTester.check ('go');
								autoTester.check (exception);
							}
							else {
								throw __except0__;
							}
						}
						try {
							var __except0__ = new Table ('he', 'followed', 'her');
							__except0__.__cause__ = null;
							throw __except0__;
						}
						catch (__except0__) {
							if (isinstance (__except0__, Ex1)) {
								var exception = __except0__;
								autoTester.check ('to');
								autoTester.check (exception);
							}
							else if (isinstance (__except0__, Table)) {
								var exception = __except0__;
								autoTester.check ('school');
								autoTester.check (exception);
							}
							else if (isinstance (__except0__, Ex3)) {
								var exception = __except0__;
								autoTester.check ('one');
								autoTester.check (exception);
							}
							else {
								throw __except0__;
							}
						}
						finally {
							autoTester.check ('day');
						}
						try {
							assert ((2 * 8) / 4 == 2, 'Assert error 1');
						}
						catch (__except0__) {
							if (isinstance (__except0__, AssertionError)) {
								var exception = __except0__;
								autoTester.check (exception);
							}
							else {
								throw __except0__;
							}
						}
						try {
							assert ((2 * 8) / 4 == 4, 'Assert error 2');
						}
						catch (__except0__) {
							if (isinstance (__except0__, AssertionError)) {
								var exception = __except0__;
								autoTester.check (exception);
							}
							else {
								throw __except0__;
							}
						}
						try {
							assert ((2 * 8) / 4 == 2);
						}
						catch (__except0__) {
							if (isinstance (__except0__, AssertionError)) {
								var exception = __except0__;
								autoTester.check (exception);
							}
							else {
								throw __except0__;
							}
						}
						try {
							assert ((2 * 8) / 4 == 4);
						}
						catch (__except0__) {
							if (isinstance (__except0__, AssertionError)) {
								var exception = __except0__;
								autoTester.check (exception);
							}
							else {
								throw __except0__;
							}
						}
						autoTester.check (888);
						try {
							autoTester.check ('hello world 1');
							try {
								autoTester.check ('no error 1');
							}
							catch (__except0__) {
							}
						}
						catch (__except0__) {
							autoTester.check ('error 1');
						}
						var i = 1 + 2;
						try {
							autoTester.check ('hello world 2');
							if (i == 3) {
								var __except0__ = Exception ();
								__except0__.__cause__ = null;
								throw __except0__;
							}
							try {
								autoTester.check ('no error 2');
							}
							catch (__except0__) {
							}
						}
						catch (__except0__) {
							autoTester.check ('error 2');
						}
						for (var raiseIt of tuple ([false, true])) {
							try {
								try {
									if (raiseIt) {
										var __except0__ = Exception ();
										__except0__.__cause__ = null;
										throw __except0__;
									}
									autoTester.check ('no error 3');
								}
								finally {
									autoTester.check ('anyhow 3');
								}
							}
							catch (__except0__) {
								autoTester.check ('error 3');
							}
						}
					};
					__pragma__ ('<all>')
						__all__.BaseException = BaseException;
						__all__.Ex1 = Ex1;
						__all__.Ex2 = Ex2;
						__all__.Ex3 = Ex3;
						__all__.Table = Table;
						__all__.run = run;
						__all__.test1 = test1;
						__all__.test2 = test2;
					__pragma__ ('</all>')
				}
			}
		}
	);
