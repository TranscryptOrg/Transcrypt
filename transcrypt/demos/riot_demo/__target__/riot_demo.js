// Transcrypt'ed from Python, 2018-08-28 20:48:13
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {RiotTag} from './riot_tag.js';
var __name__ = '__main__';
export var P =  __class__ ('P', [RiotTag], {
	__module__: __name__,
	debug: 1,
	lv: list ([dict ({'name': 'n0'})]),
	counter: 1,
	template: ' <div><h1>Riot Transcrypt Tag Instance {label}</h1>\n                         <div>INNER</div></div> ',
	get count_up () {return __get__ (this, function (self) {
		self.counter = self.counter + 1;
		self.pp ('counter:', self.counter, 'len lv:', len (self.lv), 'adding one lv');
		self.lv.append (dict ({'name': 'n' + self.counter}));
		return self.counter;
	});}
});
export var Sample2 =  __class__ ('Sample2', [P], {
	__module__: __name__,
	template: P.template.py_replace ('INNER', '\n    <div>\n    <h5 each="{lv}">name: {name} - counter: {count_up()}</h5>\n    </div>\n    '),
	style: 'sample2 h5 {color: green}',
	get __init__ () {return __get__ (this, function (self, tag, opts) {
		self.label = opts.label.capitalize ();
		RiotTag.__init__ (self, tag, opts);
		self.pp ('tag init', 'adding 2 lv');
		self.lv.extend (list ([dict ({'name': 'n1'}), dict ({'name': 'n2'})]));
	});},
	get py_update () {return __get__ (this, function (self) {
		self.pp ('update handler in the custom tag, calling super');
		RiotTag.py_update (self);
	});}
});

//# sourceMappingURL=riot_demo.map