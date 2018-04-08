// Transcrypt'ed from Python, 2018-04-08 11:00:36
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __globals__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __merge__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setProperty__, __setitem__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {colors, cprint as col_print} from './color.js';
var __name__ = 'riot_tag';
export var __author__ = 'Gunther Klessinger, gk@axiros.com, Germany';
export var c = colors;
var __left0__ = tuple ([c ['purple'], c ['orange'], c ['gray'], c ['red'], c ['black']]);
export var M = __left0__ [0];
export var I = __left0__ [1];
export var L = __left0__ [2];
export var R = __left0__ [3];
export var B = __left0__ [4];
export var lifecycle_ev = list (['before-mount', 'mount', 'update', 'unmount']);
export var cur_tag_col = 0;

export var RiotTag =  __class__ ('RiotTag', [object], {
	__module__: __name__,
	debug: null,
	template: '<h1>it worx</h1>',
	style: '',
	node_name: 'unmounted',
	opts: null,
	get __init__ () {return __get__ (this, function (self, tag, opts) {
		self.opts = opts;
		self._setup_tag (tag);
		cur_tag_col = __mod__ (cur_tag_col + 1, len (colors));
		self.my_col = colors.py_items () [cur_tag_col] [1];
	});},
	get _setup_tag () {return __get__ (this, function (self, tag) {
		tag.py_obj = self;
		self.riot_tag = tag;
		var handlers = dict ({});
		for (var ev of lifecycle_ev) {
			var f = getattr (self, ev.py_replace ('-', '_'));
			if (f) {
				tag.on (ev, f);
			}
		}
	});},
	get pp () {return __get__ (this, function (self) {
		var msg = tuple ([].slice.apply (arguments).slice (1));
		col_print (L ('<', self.my_col (self.node_name, self.my_col), '/> '), M (' '.join ((function () {
			var __accu0__ = [];
			for (var s of msg) {
				__accu0__.append (s);
			}
			return __accu0__;
		}) ())));
	});},
	get _lifecycle_ev () {return __get__ (this, function (self, mode) {
		if (self.debug) {
			self.pp (mode + 'ing');
		}
	});},
	get py_update () {return __get__ (this, function (self) {
		self._lifecycle_ev ('update');
	});},
	get mount () {return __get__ (this, function (self) {
		self._lifecycle_ev ('mount');
	});},
	get unmount () {return __get__ (this, function (self) {
		self._lifecycle_ev ('unmount');
	});},
	get before_mount () {return __get__ (this, function (self) {
		self._lifecycle_ev ('before-mount');
		return self.bind_vars ();
	});},
	get bind_vars () {return __get__ (this, function (self) {
		var tag = self.riot_tag;
		self.node_name = tag.root.nodeName.lower ();
		self.debug && self.pp ('binding vars');
		var __left0__ = list ([]);
		tag._immutables = __left0__;
		var im = __left0__;
		var lc = lifecycle_ev;
		for (var k of dir (self)) {
			if (k [0] == '_' || __in__ (k, lifecycle_ev) || k == 'before_mount') {
				continue;
			}
			var v = getattr (self, k);
			
			                  typeof v === "function" || typeof v === "object" ?
			                  tag[k] = self[k] : tag._immutables.push(k)
		}
		
		        var i = tag._immutables, py = self
		        i.forEach(function(k, j, i) {
		            Object.defineProperty(tag, k, {
		                get: function()  { return self[k]},
		                set: function(v) { self[k] = v }
		            })
		        })
	});}
});

//# sourceMappingURL=riot_tag.map