	__nest__ (
		__all__,
		'reprtest', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var run = function (test) {
						var v = 1;
						test.check (repr (v));
						test.check (str (v));
						var v = 'asdf';
						test.check (repr (v));
						test.check (str (v));
						var v = true;
						test.check (repr (v));
						test.check (str (v));
						var v = false;
						test.check (repr (v));
						test.check (str (v));
						var v = 1.2;
						test.check (repr (v));
						test.check (str (v));
						var v = -(31.2);
						test.check (repr (v));
						test.check (str (v));
						var v = 6.3e-11;
						test.check (repr (v));
						test.check (str (v));
						var v = 2.4e+38;
						test.check (repr (v));
						test.check (str (v));
						var v = -(3.4e-22);
						test.check (repr (v));
						test.check (str (v));
						var v = -(8.9e+33);
						test.check (repr (v));
						test.check (str (v));
						var v = null;
						test.check (repr (v));
						test.check (str (v));
						var v = list ([null]);
						test.check (repr (v));
						test.check (str (v));
						var v = list ([null, null]);
						test.check (repr (v));
						test.check (str (v));
						var v = list ([null, 1.02]);
						test.check (repr (v));
						test.check (str (v));
						var v = list ([1, 3.000234]);
						test.check (repr (v));
						test.check (str (v));
						var v = list ([1, 2, 3]);
						test.check (repr (v));
						test.check (str (v));
						var v = list ([1.04, 2.03, 3.005]);
						test.check (repr (v));
						test.check (str (v));
						var v = list (['asdf', 2.00009, '1234']);
						test.check (repr (v));
						test.check (str (v));
						var v = set (list ([1, 2, 3]));
						test.check (repr (v));
						test.check (str (v));
						var v = set (list ([]));
						test.check (repr (v));
						test.check (str (v));
						var v = tuple ([1, 2]);
						test.check (repr (v));
						test.check (str (v));
						var v = tuple ([3.4, 4.4]);
						test.check (repr (v));
						test.check (str (v));
						var v = tuple ([null, 5.32]);
						test.check (repr (v));
						test.check (str (v));
						var v = dict ({});
						test.check (repr (v));
						test.check (str (v));
						var v = dict ({'a': 1});
						test.check (repr (v));
						test.check (str (v));
						var d = dict ({'asdf': 3.4});
						test.check (repr (d));
						test.check (str (d));
						var d = dict ({'qwer': 'qwerqwer qwerqwer'});
						test.check (repr (d));
						test.check (str (d));
						var d = dict ({'a9342': null});
						test.check (repr (d));
						test.check (str (d));
						var d = dict ({'nfdns': true});
						test.check (repr (d));
						test.check (str (d));
						var d = dict ({'alel;e;': false});
						test.check (repr (d));
						test.check (str (d));
						var d = dict ({'didi': list ([true, false, true])});
						test.check (repr (d));
						test.check (str (d));
						var d = dict ({'bibi': list ([1, 2, 3])});
						test.check (repr (d));
						test.check (str (d));
						var d = dict ({'gigi': list (['Asdf', 'qwer', 'rewer'])});
						test.check (repr (d));
						test.check (str (d));
						var d = dict ({'hihi': tuple (['esdf', 'qwer', 'rewer'])});
						test.check (repr (d));
						test.check (str (d));
						var d = dict ({'jiji': list ([null, null, null])});
						test.check (repr (d));
						test.check (str (d));
						var d = dict ({'jiji': tuple ([1.3, 3.4])});
						test.check (repr (d));
						test.check (str (d));
						var d = dict ({'jiji': dict ({'c': 4})});
						test.check (repr (d));
						test.check (str (d));
						var Test1 = __class__ ('Test1', [object], {
							get __init__ () {return __get__ (this, function (self, val) {
								self._val = val;
							});},
							get __str__ () {return __get__ (this, function (self) {
								return '[Test1 {}]'.format (self._val);
							});},
							get __repr__ () {return __get__ (this, function (self) {
								return str (self);
							});}
						});
						var Test2 = __class__ ('Test2', [object], {
							get __init__ () {return __get__ (this, function (self, val) {
								self._val = val;
							});},
							get __repr__ () {return __get__ (this, function (self) {
								return '[Test2 {},{}]'.format (self._val, self._val * 2);
							});},
							get __str__ () {return __get__ (this, function (self) {
								return repr (self);
							});}
						});
						var Test3 = __class__ ('Test3', [Test2], {
							get __str__ () {return __get__ (this, function (self) {
								return '[Test3 {}]'.format (self._val);
							});}
						});
						var Test4 = __class__ ('Test4', [object], {
							get __init__ () {return __get__ (this, function (self, val) {
								self._val = val;
							});},
							get __repr__ () {return __get__ (this, function (self) {
								return '[Test4 {}]'.format (self._val);
							});}
						});
						var t1 = Test1 (2);
						test.check (repr (t1));
						test.check (str (t1));
						var t1 = Test1 (4.5);
						test.check (repr (t1));
						test.check (str (t1));
						var t1 = Test1 ('blarg');
						test.check (repr (t1));
						test.check (str (t1));
						var t1 = Test1 (list ([1, 2, 3]));
						test.check (repr (t1));
						test.check (str (t1));
						var t2 = Test2 (3);
						test.check (repr (t2));
						test.check (str (t2));
						var t2 = Test2 (7.6);
						test.check (repr (t2));
						test.check (str (t2));
						var t2 = Test2 (-(8.9));
						test.check (repr (t2));
						test.check (str (t2));
						var t3 = Test3 (8);
						test.check (repr (t3));
						test.check (str (t3));
						var t3 = Test3 (3.4);
						test.check (repr (t3));
						test.check (str (t3));
						test.check (repr (list ([t1, t2, 3])));
						var d = dict ({'irew': t1});
						test.check (repr (d));
						test.check (str (d));
						var d = dict ({'irew': list ([t1, t2, t3])});
						test.check (repr (d));
						test.check (str (d));
						var t4 = Test4 ('qwer');
						test.check (repr (t4));
						test.check (str (t4));
					};
					__pragma__ ('<all>')
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
