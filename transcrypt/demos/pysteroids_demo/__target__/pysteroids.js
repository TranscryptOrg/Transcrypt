// Transcrypt'ed from Python, 2018-04-05 23:20:36
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var audio = {};
var logging = {};
var math = {};
var random = {};
var __name__ = '__main__';
import * as __module_logging__ from './logging.js';
__nest__ (logging, '', __module_logging__);
import * as __module_math__ from './math.js';
__nest__ (math, '', __module_math__);
import * as __module_random__ from './random.js';
__nest__ (random, '', __module_random__);
import * as __module_audio__ from './audio.js';
__nest__ (audio, '', __module_audio__);
import * as three from './org.threejs.js';
import {Keyboard, ControlAxis} from './controls.js';
import {Ship, Asteroid, Bullet} from './units.js';
import {wrap, now, FPSCounter, coroutine, clamp, set_limits} from './utils.js';
export var DEBUG = true;
export var logger = logging.getLogger ('root');
logger.addHandler (logging.StreamHandler ());
if (DEBUG) {
	logger.setLevel (logging.INFO);
	logger.info ('====== debug logging on =====');
}
export var waiter = function () {
	var args = tuple ([].slice.apply (arguments).slice (0));
	return tuple ([true, args [0]]);
};
export var done = function () {
	var args = tuple ([].slice.apply (arguments).slice (0));
	print ('done at', args [0]);
};
export var hfov = function (vfov, w, h) {
	return ;
};

export var Graphics =  __class__ ('Graphics', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, w, h, canvas, fov) {
		if (typeof fov == 'undefined' || (fov != null && fov .hasOwnProperty ("__kwargtrans__"))) {;
			var fov = 53.13;
		};
		self.width = float (w);
		self.height = float (h);
		self.scene = three.Scene ();
		self.camera = three.PerspectiveCamera (fov, self.width / self.height, 1, 500);
		self.vfov = math.radians (fov);
		self.hfov = 2 * math.atan (math.tan (math.radians (fov) / 2.0) * ((w / h) * 1.0));
		self.camera.position.set (0, 0, 80);
		self.camera.lookAt (self.scene.position);
		self.renderer = three.WebGLRenderer (dict ({'Antialias': true}));
		self.renderer.setSize (self.width, self.height);
		canvas.appendChild (self.renderer.domElement);
	});},
	get render () {return __get__ (this, function (self) {
		self.renderer.render (self.scene, self.camera);
	});},
	get add () {return __get__ (this, function (self, item) {
		self.scene.add (item.geo);
	});},
	get extent () {return __get__ (this, function (self) {
		var v_extent = math.tan (self.vfov / 2.0) * 80;
		var h_extent = math.tan (self.hfov / 2.0) * 80;
		return tuple ([h_extent, v_extent]);
	});}
});

export var Audio =  __class__ ('Audio', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, audio_path) {
		if (typeof audio_path == 'undefined' || (audio_path != null && audio_path .hasOwnProperty ("__kwargtrans__"))) {;
			var audio_path = '';
		};
		var pth = (function __lambda__ (p) {
			return audio_path + p;
		});
		self.fire_rota = list ([audio.clip (pth ('344276__nsstudios__laser3.wav')), audio.clip (pth ('344276__nsstudios__laser3.wav')), audio.clip (pth ('344276__nsstudios__laser3.wav')), audio.clip (pth ('344276__nsstudios__laser3.wav'))]);
		self.explosion_rota = list ([audio.clip (pth ('108641__juskiddink__nearby-explosion-with-debris.wav')), audio.clip (pth ('108641__juskiddink__nearby-explosion-with-debris.wav')), audio.clip (pth ('108641__juskiddink__nearby-explosion-with-debris.wav')), audio.clip (pth ('108641__juskiddink__nearby-explosion-with-debris.wav'))]);
		self.thrust = audio.loop (pth ('146770__qubodup__rocket-boost-engine-loop.wav'));
		self.fail = audio.clip (pth ('172950__notr__saddertrombones.mp3'));
		self.thrust.play ();
		self.shoot_ctr = 0;
		self.explode_ctr = 0;
	});},
	get fire () {return __get__ (this, function (self) {
		self.fire_rota [__mod__ (self.shoot_ctr, 4)].play ();
		self.shoot_ctr++;
	});},
	get explode () {return __get__ (this, function (self) {
		self.explosion_rota [__mod__ (self.shoot_ctr, 4)].play ();
		self.shoot_ctr++;
	});}
});

export var Game =  __class__ ('Game', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, canvas, fullscreen) {
		if (typeof fullscreen == 'undefined' || (fullscreen != null && fullscreen .hasOwnProperty ("__kwargtrans__"))) {;
			var fullscreen = true;
		};
		self.keyboard = Keyboard ();
		if (fullscreen) {
			self.graphics = Graphics (window.innerWidth, window.innerHeight, canvas);
		}
		else {
			self.graphics = Graphics (canvas.offsetWidth, (3 * canvas.offsetWidth) / 4, canvas);
		}
		self.extents = self.graphics.extent ();
		set_limits (...self.extents);
		self.create_controls ();
		self.ship = null;
		self.bullets = list ([]);
		self.asteroids = list ([]);
		self.helptext = null;
		self.resetter = null;
		self.setup ();
		self.last_frame = now ();
		self.audio = Audio ();
		self.lives = 3;
		self.score = 0;
		self.score_display = document.getElementById ('score');
		self.fps_counter = FPSCounter (document.getElementById ('FPS'));
		var v_center = canvas.offsetHeight / 3;
		var title = document.getElementById ('game_over');
		title.style.top = v_center;
		var hud = document.getElementById ('hud');
		hud.style.width = canvas.offsetWidth;
		hud.style.height = canvas.offsetHeight;
		var frame = document.getElementById ('game_frame');
		frame.style.min_height = canvas.offsetHeight;
	});},
	get create_controls () {return __get__ (this, function (self) {
		self.keyboard.add_handler ('spin', ControlAxis ('ArrowRight', 'ArrowLeft', __kwargtrans__ ({attack: 1, decay: 0.6})));
		self.keyboard.add_handler ('thrust', ControlAxis ('ArrowUp', 'ArrowDown', __kwargtrans__ ({attack: 0.65, decay: 2.5, deadzone: 0.1})));
		self.keyboard.add_handler ('fire', ControlAxis (' ', 'None', __kwargtrans__ ({attack: 10})));
		document.onkeydown = self.keyboard.key_down;
		document.onkeyup = self.keyboard.key_up;
		var suppress_scroll = function (e) {
			if (__in__ (e.keyCode, list ([32, 37, 38, 39, 40]))) {
				e.preventDefault ();
			}
		};
		window.addEventListener ('keydown', suppress_scroll, false);
	});},
	get setup () {return __get__ (this, function (self) {
		self.ship = Ship (self.keyboard, self);
		self.graphics.add (self.ship);
		var rsign = function () {
			if (random.random () < 0.5) {
				return -(1);
			}
			return 1;
		};
		for (var a = 0; a < 8; a++) {
			var x = (random.random () - 0.5) * 2;
			var y = random.random () - 0.5;
			var z = 0;
			var offset = three.Vector3 (x, y, z);
			offset.normalize ();
			var push = random.randint (20, 60);
			var offset = offset.multiplyScalar (push);
			var r = (random.random () + 1.0) * 2.5;
			var asteroid = Asteroid (r, offset);
			var mx = ((random.random () + random.random ()) + random.random (2)) - 2.0;
			var my = ((random.random () + random.random ()) + random.random (2)) - 2.0;
			asteroid.momentum = three.Vector3 (mx, my, 0);
			self.graphics.add (asteroid);
			self.asteroids.append (asteroid);
		}
		for (var b = 0; b < 8; b++) {
			var bullet = Bullet ();
			self.graphics.add (bullet);
			self.bullets.append (bullet);
		}
		self.helptext = self.help_display ();
	});},
	get tick () {return __get__ (this, function (self) {
		if (len (self.asteroids) == 0 || self.lives < 1) {
			document.getElementById ('game_over').style.visibility = 'visible';
			document.getElementById ('credits').style.visibility = 'visible';
			document.getElementById ('game_canvas').style.cursor = 'auto';
			return ;
		}
		requestAnimationFrame (self.tick);
		var t = now () - self.last_frame;
		self.fps_counter.py_update (t);
		self.keyboard.py_update (t);
		if (self.ship.visible) {
			self.handle_input (t);
		}
		var dead = list ([]);
		for (var b of self.bullets) {
			if (b.position.z < 1000) {
				for (var a of self.asteroids) {
					if (a.bbox.contains (b.position)) {
						var d = a.geo.position.distanceTo (b.position);
						if (d < a.radius) {
							b.reset ();
							dead.append (a);
						}
					}
				}
			}
		}
		if (self.ship.visible) {
			for (var a of self.asteroids) {
				if (a.bbox.contains (self.ship.position)) {
					var d = a.geo.position.distanceTo (self.ship.position);
					if (d < a.radius + 0.5) {
						self.resetter = self.kill ();
						print ('!!', self.resetter);
						dead.append (a);
					}
				}
			}
		}
		else {
			self.resetter.advance (t);
		}
		for (var d of dead) {
			self.asteroids.remove (d);
			var new_score = int (100 * d.radius);
			self.update_score (new_score);
			d.geo.visible = false;
			if (d.radius > 1.5) {
				self.audio.explode ();
				var new_asteroids = random.randint (2, 5);
				for (var n = 0; n < new_asteroids; n++) {
					var new_a = Asteroid ((d.radius + 1.0) / new_asteroids, d.position);
					var mx = (random.random () - 0.5) * 6;
					var my = (random.random () - 0.5) * 4;
					new_a.momentum = three.Vector3 ().copy (d.momentum);
					new_a.momentum.add (three.Vector3 (mx, my, 0));
					self.graphics.add (new_a);
					self.asteroids.append (new_a);
				}
			}
		}
		for (var b of self.bullets) {
			b.py_update (t);
		}
		self.ship.py_update (t);
		wrap (self.ship.geo);
		for (var item of self.asteroids) {
			item.py_update (t);
			wrap (item.geo);
		}
		if (self.resetter !== null) {
			self.resetter.advance (t);
		}
		if (self.helptext !== null) {
			self.helptext.advance (t);
		}
		self.graphics.render ();
		self.last_frame = now ();
	});},
	get handle_input () {return __get__ (this, function (self, t) {
		if (self.keyboard.get_axis ('fire') >= 1) {
			var mo = three.Vector3 ().copy (self.ship.momentum).multiplyScalar (t);
			if (self.fire (self.ship.position, self.ship.heading, mo)) {
				self.audio.fire ();
			}
			self.keyboard.py_clear ('fire');
		}
		var spin = self.keyboard.get_axis ('spin');
		self.ship.spin (spin * t);
		var thrust = self.keyboard.get_axis ('thrust');
		self.audio.thrust.volume = clamp (thrust * 5, 0, 1);
		self.ship.thrust (thrust * t);
	});},
	get fire () {return __get__ (this, function (self, pos, vector, momentum, t) {
		for (var each_bullet of self.bullets) {
			if (each_bullet.geo.position.z >= 1000) {
				each_bullet.geo.position.set (pos.x, pos.y, pos.z);
				each_bullet.vector = vector;
				each_bullet.lifespan = 0;
				each_bullet.momentum = three.Vector3 ().copy (momentum).multiplyScalar (0.66);
				return true;
			}
		}
		return false;
	});},
	get kill () {return __get__ (this, function (self) {
		self.lives--;
		self.ship.momentum = three.Vector3 (0, 0, 0);
		self.ship.position = three.Vector3 (0, 0, 0);
		self.ship.geo.setRotationFromEuler (three.Euler (0, 0, 0));
		self.keyboard.py_clear ('spin');
		self.keyboard.py_clear ('thrust');
		self.keyboard.py_clear ('fire');
		self.ship.visible = false;
		self.audio.fail.play ();
		var can_reappear = now () + 3.0;
		var reappear = function (t) {
			if (now () < can_reappear) {
				return tuple ([true, 'waiting']);
			}
			for (var a of self.asteroids) {
				if (a.bbox.contains (self.ship.position)) {
					return tuple ([true, "can't spawn"]);
				}
			}
			return tuple ([false, 'OK']);
		};
		var clear_resetter = function () {
			self.ship.visible = true;
			self.resetter = null;
		};
		var reset = coroutine (reappear, clear_resetter);
		py_next (reset);
		return reset;
	});},
	get help_display () {return __get__ (this, function (self) {
		var messages = 3;
		var repeats = 2;
		var elapsed = 0;
		var count = 0;
		var period = 2.25;
		var display_stuff = function (t) {
			if (count < messages * repeats) {
				elapsed += t / period;
				count = int (elapsed);
				var lintime = __mod__ (elapsed, 1);
				var opacity = math.pow (math.sin (lintime * 3.1415), 2);
				logger.info (lintime);
				document.getElementById ('instructions{}'.format (__mod__ (count, 3))).style.opacity = opacity;
				return tuple ([true, opacity]);
			}
			else {
				return tuple ([false, 'OK']);
			}
		};
		var done = function () {
			document.getElementById ('instructions1').style.visiblity = 'hidden';
		};
		var displayer = coroutine (display_stuff, done);
		py_next (displayer);
		logger.debug ('displayer', displayer);
		return displayer;
	});},
	get update_score () {return __get__ (this, function (self, score) {
		self.score += score;
		self.score_display.innerHTML = self.score;
		print (self.score, self.score_display);
	});}
});
export var canvas = document.getElementById ('game_canvas');
export var game = Game (canvas, true);
game.tick ();

//# sourceMappingURL=pysteroids.map