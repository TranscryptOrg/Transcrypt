// Transcrypt'ed from Python, 2018-04-07 16:10:18
var random = {};
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
import {wrap, AABB} from './utils.js';
import * as three from './org.threejs.js';
import * as __module_random__ from './random.js';
__nest__ (random, '', __module_random__);
var __name__ = 'units';

export var Unit =  __class__ ('Unit', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.geo = null;
		self.momentum = three.Vector3 (0, 0, 0);
	});},
	get get_position () {return __get__ (this, function (self) {
		return self.geo.position;
	});},
	get set_position () {return __get__ (this, function (self, p) {
		self.geo.position.set (p.x, p.y, p.z);
	});},
	get py_update () {return __get__ (this, function (self, t) {
		if (self.visible) {
			var current_pos = self.geo.position;
			var move = three.Vector3 ().copy (self.momentum).multiplyScalar (t);
			var current_pos = current_pos.add (move);
			self.geo.position.set (current_pos.x, current_pos.y, current_pos.z);
		}
	});},
	get get_vis () {return __get__ (this, function (self) {
		return self.geo.visible;
	});},
	get set_vis () {return __get__ (this, function (self, v) {
		self.geo.visible = v;
	});}
});
Object.defineProperty (Unit, 'visible', property.call (Unit, Unit.get_vis, Unit.set_vis));;
Object.defineProperty (Unit, 'position', property.call (Unit, Unit.get_position, Unit.set_position));;

export var Ship =  __class__ ('Ship', [Unit], {
	__module__: __name__,
	ROTATE_SPEED: 2.1,
	THRUST: 45,
	get __init__ () {return __get__ (this, function (self, keyboard, game) {
		Unit.__init__ (self);
		self.keyboard = keyboard;
		self.geo = three.Mesh (three.ConeBufferGeometry (1, 3, 8), three.MeshNormalMaterial ());
		var exhaust = three.Mesh (three.ConeBufferGeometry (0.5, 2, 8), three.MeshBasicMaterial (dict ({'color': 16776960})));
		self.geo.add (exhaust);
		exhaust.translateY (-(2));
		exhaust.rotateZ (3.14159);
		self.exhaust = exhaust;
		self.momentum = three.Vector3 (0, 0, 0);
		self.keyboard = keyboard;
		self.bbox = AABB (2, 3, self.geo.position);
		self.game = game;
	});},
	get thrust () {return __get__ (this, function (self, amt) {
		var thrust_amt = amt * self.THRUST;
		self.momentum = self.momentum.add (self.heading.multiplyScalar (thrust_amt));
		self.exhaust.visible = amt > 0;
	});},
	get spin () {return __get__ (this, function (self, amt) {
		self.geo.rotateZ ((amt * self.ROTATE_SPEED) * -(1));
	});},
	get py_update () {return __get__ (this, function (self, t) {
		Unit.py_update (self, t);
		self.bbox.py_update (self.position);
	});},
	get get_heading () {return __get__ (this, function (self) {
		var m = self.geo.matrixWorld.elements;
		return three.Vector3 (m [4], m [5], m [6]);
	});}
});
Object.defineProperty (Ship, 'heading', property.call (Ship, Ship.get_heading));;

export var Asteroid =  __class__ ('Asteroid', [Unit], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, radius, pos) {
		Unit.__init__ (self);
		self.radius = radius;
		self.geo = three.Mesh (three.SphereGeometry (self.radius), three.MeshNormalMaterial ());
		self.geo.position.set (pos.x, pos.y, pos.z);
		self.bbox = AABB (self.radius * 2, self.radius * 2, self.geo.position);
		self.momentum = three.Vector3 (0, 0, 0);
	});},
	get py_update () {return __get__ (this, function (self, t) {
		Unit.py_update (self, t);
		self.bbox.py_update (self.position);
	});}
});

export var Bullet =  __class__ ('Bullet', [object], {
	__module__: __name__,
	EXPIRES: 1,
	RESET_POS: three.Vector3 (0, 0, 1000),
	BULLET_SPEED: 50,
	get __init__ () {return __get__ (this, function (self) {
		self.vector = three.Vector3 (0, 0, 0);
		self.geo = three.Mesh (three.BoxGeometry (0.25, 0.25, 0.25), three.MeshBasicMaterial (dict ({'color': 16777215})));
		self.lifespan = 0;
		self.momentum = three.Vector3 (0, 0, 0);
		self.reset ();
	});},
	get py_update () {return __get__ (this, function (self, t) {
		if (self.geo.position.z < 1000) {
			self.lifespan += t;
			if (self.lifespan > self.EXPIRES) {
				self.reset ();
				return ;
			}
			var delta = three.Vector3 ().copy (self.vector);
			delta.multiplyScalar (self.BULLET_SPEED * t);
			delta.add (self.momentum);
			var current_pos = self.geo.position.add (delta);
			self.geo.position.set (current_pos.x, current_pos.y, current_pos.z);
			wrap (self.geo);
		}
	});},
	get reset () {return __get__ (this, function (self) {
		self.lifespan = 0;
		self.momentum = three.Vector3 (0, 0, 0);
		self.geo.position.set (self.RESET_POS.x, self.RESET_POS.y, self.RESET_POS.z);
	});},
	get get_position () {return __get__ (this, function (self) {
		return self.geo.position;
	});}
});
Object.defineProperty (Bullet, 'position', property.call (Bullet, Bullet.get_position));;

//# sourceMappingURL=units.map