	__nest__ (
		__all__,
		'local_classes', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (autoTester) {
						var A = __class__ ('A', [object], {
							B: __class__ ('B', [object], {
								C: __class__ ('C', [object], {
									get __init__ () {return __get__ (this, function (self, x) {
										self.x = x;
									});},
									get tell () {return __get__ (this, function (self) {
										autoTester.check (self.x);
										autoTester.check (self.e);
									});},
									e: 3
								}),
								get __init__ () {return __get__ (this, function (self, x) {
									self.x = x;
								});},
								get tell () {return __get__ (this, function (self) {
									autoTester.check (self.x);
									autoTester.check (self.d);
								});},
								d: 2
							}),
							c: 1,
							get __init__ () {return __get__ (this, function (self, x) {
								self.x = x;
							});},
							get tell () {return __get__ (this, function (self) {
								autoTester.check (self.x);
								autoTester.check (self.c);
							});}
						});
						var f = function (x) {
							var G = __class__ ('G', [object], {
								H: __class__ ('H', [object], {
									get __init__ () {return __get__ (this, function (self, x) {
										self.x = x;
									});},
									get tell () {return __get__ (this, function (self) {
										autoTester.check (self.x);
										autoTester.check (self.i);
									});},
									i: 5
								}),
								get __init__ () {return __get__ (this, function (self, x) {
									self.x = x;
								});},
								get tell () {return __get__ (this, function (self) {
									autoTester.check (self.x);
								});},
								k: 4
							});
							var g = G (6);
							g.tell ();
							autoTester.check (g.k);
							var h = G.H (7);
							h.tell ();
							autoTester.check (h.i);
							var P = __class__ ('P', [A.B], {
							});
							var p = P (7);
							p.tell ();
							autoTester.check (p.d);
						};
						var a = A (8);
						var b = a.B (9);
						var c = b.C (10);
						a.tell ();
						b.tell ();
						c.tell ();
						autoTester.check (a.c);
						autoTester.check (b.d);
						f (7);
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
