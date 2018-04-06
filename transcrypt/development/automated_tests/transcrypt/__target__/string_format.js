// Transcrypt'ed from Python, 2018-04-05 23:19:53
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, complex, __conj__, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var __name__ = 'string_format';
export var run = function (autoTester) {
	autoTester.check ('Numbers:');
	autoTester.check ('int: {:06d}'.format (18));
	autoTester.check ('int: {:05}'.format (123));
	autoTester.check ('int: {:2d}'.format (180));
	autoTester.check ('int: {: 4d} {: 4d}'.format (75, -(8)));
	autoTester.check ('int: {:<8d}'.format (55));
	autoTester.check ('int: {:*>8d}'.format (55));
	autoTester.check ('int: {:8,d}'.format (5555555));
	autoTester.check ('bin: {:b}'.format (325));
	autoTester.check ('bin: {:b}'.format (-(15)));
	autoTester.check ('bin: {:010b}'.format (-(15)));
	autoTester.check ('bin: {:#010b}'.format (-(15)));
	autoTester.check ('oct: {:+010o}'.format (234));
	autoTester.check ('oct: {:#o}'.format (234));
	autoTester.check ('hex: {:+010x}'.format (234));
	autoTester.check ('hex: {:X}'.format (-(234)));
	autoTester.check ('hex: {:#10X}'.format (-(234)));
	autoTester.check ('chr: {:010c}'.format (64));
	autoTester.check ('float: {:f}'.format (-(1554.1556565)));
	autoTester.check ('float: {:#f}'.format (-(1553)));
	autoTester.check ('float: {:#.0f}'.format (-(1552)));
	autoTester.check ('float: {:.2f}'.format (105.1528));
	autoTester.check ('float: {:.8f}'.format (0.1528));
	autoTester.check ('float: {:.2f}'.format (float ('-inf')));
	autoTester.check ('float: {:f}'.format (float ('nan')));
	autoTester.check ('pct: {:.4%}'.format (1 / 3));
	autoTester.check ('exp: {:e}'.format (-(17.845265568)));
	autoTester.check ('exp: {:#e}'.format (-(17.0)));
	autoTester.check ('exp: {:015.4e}'.format (17.845265568));
	autoTester.check ('exp: {:E}'.format (165665564654686.12));
	autoTester.check ('gen: {:g}'.format (165665564654686.12));
	autoTester.check ('gen: {:g}'.format (1656));
	autoTester.check ('gen: {:g}'.format (1.123485574));
	autoTester.check ('gen: {:.8g}'.format (148560.123485574));
	autoTester.check ('gen: {:.4}'.format (1485.1));
	autoTester.check ('gen: {}'.format (1485.1));
	autoTester.check ('gen: {:.8}'.format (1485.1));
	autoTester.check ('gen: {:.8g}'.format (1485.1));
	autoTester.check ('Strings:');
	autoTester.check ('str: {:20s}'.format ('abc'));
	autoTester.check ('str: {:*>10}'.format ('abc'));
	autoTester.check ('{1}{0}{1}'.format ('kad', 'abra'));
	autoTester.check ('{1}{0!r}{1}'.format ('kad', 'abra'));
	autoTester.check ('{} and {}'.format ('dog', 'cat'));
	autoTester.check ('{:*^13}'.format ('centered'));
	var a = list ([15.846, 16.7856, 18.8563]);
	var B = __class__ ('B', [object], {
		__module__: __name__,
		get __repr__ () {return __get__ (this, function (self) {
			return self.prop;
		});},
		get __format__ () {return __get__ (this, function (self, fmt_spec) {
			return (fmt_spec + ' ') + self.prop;
		});}
	});
	var b = B ();
	b.prop = 'object attribute';
	var c = dict ({'somekey': 'key value'});
	autoTester.check ('{a[1]:.2f} {d} {b.prop} {c[somekey]}'.format (__kwargtrans__ ({a: a, b: b, c: c, d: 'test'})));
	autoTester.check ('Other:');
	autoTester.check ('{}'.format (true));
	autoTester.check ('{:*>10}'.format (true));
	autoTester.check ('{!r:*^20}'.format (b));
	autoTester.check ('{:custom_format}'.format (b));
	autoTester.check ('{}'.format (a));
	autoTester.check ('{}'.format (c));
};

//# sourceMappingURL=string_format.map