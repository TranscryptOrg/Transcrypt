	(function () {
		var time = {};
		var __name__ = '__main__';
		var LOOPS = 50000;
		__nest__ (time, '', __init__ (__world__.time));
		var clock = function () {
			return time.time ();
		};
		var __version__ = '1.1';
		var __left0__ = range (1, 6);
		var Ident1 = __left0__ [0];
		var Ident2 = __left0__ [1];
		var Ident3 = __left0__ [2];
		var Ident4 = __left0__ [3];
		var Ident5 = __left0__ [4];
		var Record = __class__ ('Record', [object], {
			__module__: __name__,
			get __init__ () {return __get__ (this, function (self, PtrComp, Discr, EnumComp, IntComp, StringComp) {
				if (typeof PtrComp == 'undefined' || (PtrComp != null && PtrComp .hasOwnProperty ("__kwargtrans__"))) {;
					var PtrComp = null;
				};
				if (typeof Discr == 'undefined' || (Discr != null && Discr .hasOwnProperty ("__kwargtrans__"))) {;
					var Discr = 0;
				};
				if (typeof EnumComp == 'undefined' || (EnumComp != null && EnumComp .hasOwnProperty ("__kwargtrans__"))) {;
					var EnumComp = 0;
				};
				if (typeof IntComp == 'undefined' || (IntComp != null && IntComp .hasOwnProperty ("__kwargtrans__"))) {;
					var IntComp = 0;
				};
				if (typeof StringComp == 'undefined' || (StringComp != null && StringComp .hasOwnProperty ("__kwargtrans__"))) {;
					var StringComp = 0;
				};
				self.PtrComp = PtrComp;
				self.Discr = Discr;
				self.EnumComp = EnumComp;
				self.IntComp = IntComp;
				self.StringComp = StringComp;
			});},
			get copy () {return __get__ (this, function (self) {
				return Record (self.PtrComp, self.Discr, self.EnumComp, self.IntComp, self.StringComp);
			});}
		});
		var TRUE = 1;
		var FALSE = 0;
		var main = function (loops) {
			if (typeof loops == 'undefined' || (loops != null && loops .hasOwnProperty ("__kwargtrans__"))) {;
				var loops = LOOPS;
			};
			var __left0__ = pystones (loops);
			var benchtime = __left0__ [0];
			var stones = __left0__ [1];
			print ('Pystone({}) time for {} passes = {}'.format (__version__, loops, benchtime));
			print ('This machine benchmarks at {} pystones/second'.format (stones));
		};
		var pystones = function (loops) {
			if (typeof loops == 'undefined' || (loops != null && loops .hasOwnProperty ("__kwargtrans__"))) {;
				var loops = LOOPS;
			};
			return Proc0 (loops);
		};
		var IntGlob = 0;
		var BoolGlob = FALSE;
		var Char1Glob = '\x00';
		var Char2Glob = '\x00';
		var Array1Glob = (function () {
			var __accu0__ = [];
			for (var i = 0; i < 51; i++) {
				__accu0__.append (0);
			}
			return __accu0__;
		}) ();
		var Array2Glob = (function () {
			var __accu0__ = [];
			for (var j = 0; j < 51; j++) {
				__accu0__.append ((function () {
					var __accu1__ = [];
					for (var i = 0; i < 51; i++) {
						__accu1__.append (0);
					}
					return __accu1__;
				}) ());
			}
			return __accu0__;
		}) ();
		var PtrGlb = null;
		var PtrGlbNext = null;
		var Proc0 = function (loops) {
			if (typeof loops == 'undefined' || (loops != null && loops .hasOwnProperty ("__kwargtrans__"))) {;
				var loops = LOOPS;
			};
			var starttime = clock ();
			for (var i = 0; i < loops; i++) {
				// pass;
			}
			var nulltime = clock () - starttime;
			PtrGlbNext = Record ();
			PtrGlb = Record ();
			PtrGlb.PtrComp = PtrGlbNext;
			PtrGlb.Discr = Ident1;
			PtrGlb.EnumComp = Ident3;
			PtrGlb.IntComp = 40;
			PtrGlb.StringComp = 'DHRYSTONE PROGRAM, SOME STRING';
			var String1Loc = "DHRYSTONE PROGRAM, 1'ST STRING";
			Array2Glob [8] [7] = 10;
			var starttime = clock ();
			for (var i = 0; i < loops; i++) {
				Proc5 ();
				Proc4 ();
				var IntLoc1 = 2;
				var IntLoc2 = 3;
				var String2Loc = "DHRYSTONE PROGRAM, 2'ND STRING";
				var EnumLoc = Ident2;
				BoolGlob = !(Func2 (String1Loc, String2Loc));
				while (IntLoc1 < IntLoc2) {
					var IntLoc3 = 5 * IntLoc1 - IntLoc2;
					var IntLoc3 = Proc7 (IntLoc1, IntLoc2);
					var IntLoc1 = IntLoc1 + 1;
				}
				Proc8 (Array1Glob, Array2Glob, IntLoc1, IntLoc3);
				PtrGlb = Proc1 (PtrGlb);
				var CharIndex = 'A';
				while (CharIndex <= Char2Glob) {
					if (EnumLoc == Func1 (CharIndex, 'C')) {
						var EnumLoc = Proc6 (Ident1);
					}
					var CharIndex = chr (ord (CharIndex) + 1);
				}
				var IntLoc3 = IntLoc2 * IntLoc1;
				var IntLoc2 = IntLoc3 / IntLoc1;
				var IntLoc2 = 7 * (IntLoc3 - IntLoc2) - IntLoc1;
				var IntLoc1 = Proc2 (IntLoc1);
			}
			var benchtime = (clock () - starttime) - nulltime;
			if (benchtime == 0.0) {
				var loopsPerBenchtime = 0.0;
			}
			else {
				var loopsPerBenchtime = loops / benchtime;
			}
			return tuple ([benchtime, loopsPerBenchtime]);
		};
		var Proc1 = function (PtrParIn) {
			var __left0__ = PtrGlb.copy ();
			PtrParIn.PtrComp = __left0__;
			var NextRecord = __left0__;
			PtrParIn.IntComp = 5;
			NextRecord.IntComp = PtrParIn.IntComp;
			NextRecord.PtrComp = PtrParIn.PtrComp;
			NextRecord.PtrComp = Proc3 (NextRecord.PtrComp);
			if (NextRecord.Discr == Ident1) {
				NextRecord.IntComp = 6;
				NextRecord.EnumComp = Proc6 (PtrParIn.EnumComp);
				NextRecord.PtrComp = PtrGlb.PtrComp;
				NextRecord.IntComp = Proc7 (NextRecord.IntComp, 10);
			}
			else {
				var PtrParIn = NextRecord.copy ();
			}
			NextRecord.PtrComp = null;
			return PtrParIn;
		};
		var Proc2 = function (IntParIO) {
			var IntLoc = IntParIO + 10;
			while (1) {
				if (Char1Glob == 'A') {
					var IntLoc = IntLoc - 1;
					var IntParIO = IntLoc - IntGlob;
					var EnumLoc = Ident1;
				}
				if (EnumLoc == Ident1) {
					break;
				}
			}
			return IntParIO;
		};
		var Proc3 = function (PtrParOut) {
			if (PtrGlb !== null) {
				var PtrParOut = PtrGlb.PtrComp;
			}
			else {
				IntGlob = 100;
			}
			PtrGlb.IntComp = Proc7 (10, IntGlob);
			return PtrParOut;
		};
		var Proc4 = function () {
			var BoolLoc = Char1Glob == 'A';
			var BoolLoc = BoolLoc || BoolGlob;
			Char2Glob = 'B';
		};
		var Proc5 = function () {
			Char1Glob = 'A';
			BoolGlob = FALSE;
		};
		var Proc6 = function (EnumParIn) {
			var EnumParOut = EnumParIn;
			if (!(Func3 (EnumParIn))) {
				var EnumParOut = Ident4;
			}
			if (EnumParIn == Ident1) {
				var EnumParOut = Ident1;
			}
			else if (EnumParIn == Ident2) {
				if (IntGlob > 100) {
					var EnumParOut = Ident1;
				}
				else {
					var EnumParOut = Ident4;
				}
			}
			else if (EnumParIn == Ident3) {
				var EnumParOut = Ident2;
			}
			else if (EnumParIn == Ident4) {
				// pass;
			}
			else if (EnumParIn == Ident5) {
				var EnumParOut = Ident3;
			}
			return EnumParOut;
		};
		var Proc7 = function (IntParI1, IntParI2) {
			var IntLoc = IntParI1 + 2;
			var IntParOut = IntParI2 + IntLoc;
			return IntParOut;
		};
		var Proc8 = function (Array1Par, Array2Par, IntParI1, IntParI2) {
			var IntLoc = IntParI1 + 5;
			Array1Par [IntLoc] = IntParI2;
			Array1Par [IntLoc + 1] = Array1Par [IntLoc];
			Array1Par [IntLoc + 30] = IntLoc;
			for (var IntIndex = IntLoc; IntIndex < IntLoc + 2; IntIndex++) {
				Array2Par [IntLoc] [IntIndex] = IntLoc;
			}
			Array2Par [IntLoc] [IntLoc - 1] = Array2Par [IntLoc] [IntLoc - 1] + 1;
			Array2Par [IntLoc + 20] [IntLoc] = Array1Par [IntLoc];
			IntGlob = 5;
		};
		var Func1 = function (CharPar1, CharPar2) {
			var CharLoc1 = CharPar1;
			var CharLoc2 = CharLoc1;
			if (CharLoc2 != CharPar2) {
				return Ident1;
			}
			else {
				return Ident2;
			}
		};
		var Func2 = function (StrParI1, StrParI2) {
			var IntLoc = 1;
			while (IntLoc <= 1) {
				if (Func1 (StrParI1 [IntLoc], StrParI2 [IntLoc + 1]) == Ident1) {
					var CharLoc = 'A';
					var IntLoc = IntLoc + 1;
				}
			}
			if (CharLoc >= 'W' && CharLoc <= 'Z') {
				var IntLoc = 7;
			}
			if (CharLoc == 'X') {
				return TRUE;
			}
			else if (StrParI1 > StrParI2) {
				var IntLoc = IntLoc + 7;
				return TRUE;
			}
			else {
				return FALSE;
			}
		};
		var Func3 = function (EnumParIn) {
			var EnumLoc = EnumParIn;
			if (EnumLoc == Ident3) {
				return TRUE;
			}
			return FALSE;
		};
		if (__name__ == '__main__') {
			main (LOOPS);
		}
		__pragma__ ('<use>' +
			'time' +
		'</use>')
		__pragma__ ('<all>')
			__all__.Array1Glob = Array1Glob;
			__all__.Array2Glob = Array2Glob;
			__all__.BoolGlob = BoolGlob;
			__all__.Char1Glob = Char1Glob;
			__all__.Char2Glob = Char2Glob;
			__all__.FALSE = FALSE;
			__all__.Func1 = Func1;
			__all__.Func2 = Func2;
			__all__.Func3 = Func3;
			__all__.Ident1 = Ident1;
			__all__.Ident2 = Ident2;
			__all__.Ident3 = Ident3;
			__all__.Ident4 = Ident4;
			__all__.Ident5 = Ident5;
			__all__.IntGlob = IntGlob;
			__all__.LOOPS = LOOPS;
			__all__.Proc0 = Proc0;
			__all__.Proc1 = Proc1;
			__all__.Proc2 = Proc2;
			__all__.Proc3 = Proc3;
			__all__.Proc4 = Proc4;
			__all__.Proc5 = Proc5;
			__all__.Proc6 = Proc6;
			__all__.Proc7 = Proc7;
			__all__.Proc8 = Proc8;
			__all__.PtrGlb = PtrGlb;
			__all__.PtrGlbNext = PtrGlbNext;
			__all__.Record = Record;
			__all__.TRUE = TRUE;
			__all__.__name__ = __name__;
			__all__.__version__ = __version__;
			__all__.clock = clock;
			__all__.main = main;
			__all__.pystones = pystones;
		__pragma__ ('</all>')
	}) ();
