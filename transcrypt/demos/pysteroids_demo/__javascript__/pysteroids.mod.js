	(function () {
		var audio = {};
		var logging = {};
		var math = {};
		var random = {};
		__nest__ (logging, '', __init__ (__world__.logging));
		__nest__ (math, '', __init__ (__world__.math));
		__nest__ (random, '', __init__ (__world__.random));
		__nest__ (audio, '', __init__ (__world__.audio));
		var three =  __init__ (__world__.org.threejs);
		var Keyboard = __init__ (__world__.controls).Keyboard;
		var ControlAxis = __init__ (__world__.controls).ControlAxis;
		var Ship = __init__ (__world__.units).Ship;
		var Asteroid = __init__ (__world__.units).Asteroid;
		var Bullet = __init__ (__world__.units).Bullet;
		var wrap = __init__ (__world__.utils).wrap;
		var now = __init__ (__world__.utils).now;
		var FPSCounter = __init__ (__world__.utils).FPSCounter;
		var coroutine = __init__ (__world__.utils).coroutine;
		var clamp = __init__ (__world__.utils).clamp;
		var set_limits = __init__ (__world__.utils).set_limits;
		var DEBUG = true;
		var logger = logging.getLogger ('root');
		logger.addHandler (logging.StreamHandler ());
		if (DEBUG) {
			logger.setLevel (logging.INFO);
			logger.info ('====== debug logging on =====');
		}
		var waiter = function () {
			var args = tuple ([].slice.apply (arguments).slice (0));
			return tuple ([true, args [0]]);
		};
		var done = function () {
			var args = tuple ([].slice.apply (arguments).slice (0));
			print ('done at', args [0]);
		};
		var hfov = function (vfov, w, h) {
			return ;
		};
		var Graphics = __class__ ('Graphics', [object], {
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
		var Audio = __class__ ('Audio', [object], {
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
		var Game = __class__ ('Game', [object], {
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
		var canvas = document.getElementById ('game_canvas');
		var game = Game (canvas, true);
		game.tick ();
		__pragma__ ('<use>' +
			'audio' +
			'controls' +
			'logging' +
			'math' +
			'org.threejs' +
			'random' +
			'units' +
			'utils' +
		'</use>')
		__pragma__ ('<all>')
			__all__.Asteroid = Asteroid;
			__all__.Audio = Audio;
			__all__.Bullet = Bullet;
			__all__.ControlAxis = ControlAxis;
			__all__.DEBUG = DEBUG;
			__all__.FPSCounter = FPSCounter;
			__all__.Game = Game;
			__all__.Graphics = Graphics;
			__all__.Keyboard = Keyboard;
			__all__.Ship = Ship;
			__all__.canvas = canvas;
			__all__.clamp = clamp;
			__all__.coroutine = coroutine;
			__all__.done = done;
			__all__.game = game;
			__all__.hfov = hfov;
			__all__.logger = logger;
			__all__.now = now;
			__all__.set_limits = set_limits;
			__all__.waiter = waiter;
			__all__.wrap = wrap;
		__pragma__ ('</all>')
	}) ();
