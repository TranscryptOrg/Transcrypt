	__nest__ (
		__all__,
		'exceptions', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var Ex1 = __class__ ('Ex1', [Exception], {
					});
					var Ex2 = __class__ ('Ex2', [Ex1], {
					});
					var Ex3 = __class__ ('Ex3', [Exception], {
					});
					if (__envir__.executor_name == 'python') {
						var Table = __class__ ('Table', [BaseException], {
							get __init__ () {return __get__ (this, function (self) {
								var args = tuple ([].slice.apply (arguments).slice (1));
								self.fields = args;
							});},
							get __repr__ () {return __get__ (this, function (self) {
								return 'Table' + repr (self.fields).py_replace (', ', ',').py_replace ("'", '');
							});}
						});
					}
					else {
						
								function _Table () {
									this.fields = [] .slice.apply (arguments);
								}
								
								_Table.prototype.__str__ = function () {
									return ('Table(' + this.fields.toString () + ')');
								};
							
						var Table = _Table;
					}
					var test1 = function () {
						__except__ = Exception ('mary');
						__except__.__cause__ = null;
						throw __except__;
					};
					var test2 = function (autoTester) {
						try {
							test1 ();
						}
						catch (__except__) {
							if (isinstance (__except__, Ex1)) {
								var exception = __except__;
								autoTester.check (111);
								autoTester.check (exception);
							}
							else if (isinstance (__except__, Exception)) {
								var exception = __except__;
								autoTester.check (222);
								autoTester.check (exception);
							}
							else {
								throw __except__;
							}
						}
					};
					var run = function (autoTester) {
						test2 (autoTester);
						try {
							__except__ = Ex2 ('had');
							__except__.__cause__ = null;
							throw __except__;
						}
						catch (__except__) {
							if (isinstance (__except__, Ex1)) {
								var exception = __except__;
								autoTester.check ('a');
							}
							else if (isinstance (__except__, Exception)) {
								var exception = __except__;
								autoTester.check ('little');
								autoTester.check (exception);
							}
							else {
								throw __except__;
							}
						}
						autoTester.check (333);
						try {
							__except__ = Ex1 ('lamb');
							__except__.__cause__ = null;
							throw __except__;
						}
						catch (__except__) {
							if (isinstance (__except__, Ex2)) {
								var exception = __except__;
								autoTester.check ('his');
								autoTester.check (exception);
							}
							else if (isinstance (__except__, Ex1)) {
								var exception = __except__;
								autoTester.check ('fleece');
								autoTester.check (exception);
							}
							else if (isinstance (__except__, Exception)) {
								var exception = __except__;
								autoTester.check ('was');
								autoTester.check (exception);
							}
							else {
								throw __except__;
							}
						}
						finally {
							autoTester.check ('white');
						}
						autoTester.check (444);
						var test3 = function () {
							__except__ = Ex3 ('as');
							__except__.__cause__ = null;
							throw __except__;
						};
						autoTester.check (555);
						try {
							test3 ();
						}
						catch (__except__) {
							if (isinstance (__except__, Ex1)) {
								var exception = __except__;
								autoTester.check ('snow');
								autoTester.check (exception);
							}
							else if (isinstance (__except__, Exception)) {
								var exception = __except__;
								autoTester.check ('and');
								autoTester.check (exception);
							}
							else {
								throw __except__;
							}
						}
						finally {
							autoTester.check ('everywhere');
						}
						autoTester.check (666);
						try {
							__except__ = Ex3 ('that');
							__except__.__cause__ = null;
							throw __except__;
						}
						catch (__except__) {
							if (isinstance (__except__, Ex1)) {
								var exception = __except__;
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
								__except__ = Ex3 ('lamb');
								__except__.__cause__ = null;
								throw __except__;
							}
							catch (__except__) {
								if (isinstance (__except__, Ex1)) {
									var exception = __except__;
									autoTester.check ('was');
									autoTester.check (exception);
								}
								else {
									throw __except__;
								}
							}
							finally {
								autoTester.check ('to');
							}
						}
						catch (__except__) {
							if (isinstance (__except__, Ex3)) {
								var exception = __except__;
								autoTester.check ('go');
								autoTester.check (exception);
							}
							else {
								throw __except__;
							}
						}
						try {
							__except__ = new Table ('he', 'followed', 'her');
							__except__.__cause__ = null;
							throw __except__;
						}
						catch (__except__) {
							if (isinstance (__except__, Ex1)) {
								var exception = __except__;
								autoTester.check ('to');
								autoTester.check (exception);
							}
							else if (isinstance (__except__, Table)) {
								var exception = __except__;
								autoTester.check ('school');
								autoTester.check (exception);
							}
							else if (isinstance (__except__, Ex3)) {
								var exception = __except__;
								autoTester.check ('one');
								autoTester.check (exception);
							}
							else {
								throw __except__;
							}
						}
						finally {
							autoTester.check ('day');
						}
						try {
							assert ((2 * 8) / 4 == 2, 'Assert error 1');
						}
						catch (__except__) {
							if (isinstance (__except__, AssertionError)) {
								var exception = __except__;
								autoTester.check (exception);
							}
							else {
								throw __except__;
							}
						}
						try {
							assert ((2 * 8) / 4 == 4, 'Assert error 2');
						}
						catch (__except__) {
							if (isinstance (__except__, AssertionError)) {
								var exception = __except__;
								autoTester.check (exception);
							}
							else {
								throw __except__;
							}
						}
						try {
							assert ((2 * 8) / 4 == 2);
						}
						catch (__except__) {
							if (isinstance (__except__, AssertionError)) {
								var exception = __except__;
								autoTester.check (exception);
							}
							else {
								throw __except__;
							}
						}
						try {
							assert ((2 * 8) / 4 == 4);
						}
						catch (__except__) {
							if (isinstance (__except__, AssertionError)) {
								var exception = __except__;
								autoTester.check (exception);
							}
							else {
								throw __except__;
							}
						}
						autoTester.check (888);
					};
					__pragma__ ('<all>')
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
