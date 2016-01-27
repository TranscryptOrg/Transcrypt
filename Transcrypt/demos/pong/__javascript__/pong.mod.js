	(function () {
		var fabric = __init__ (__world__.org.transcrypt.fabric).fabric;
		var canvas = new fabric.Canvas ('canvas');
		var rect = new fabric.Rect ({left: 100, top: 100, fill: 'red', width: 20, height: 20});
		canvas.add (rect);
		var orthoWidth = 1000;
		var orthoHeight = 750;
		var fieldHeight = 650;
		var Attribute = __class__ ('Attribute', [object], {
			get __init__ () {return __get__ (this, function (self, game) {
				self.game = game;
				self.game.attributes.append (self);
				self.install ();
				self.reset ();
			});},
			get reset () {return __get__ (this, function (self) {
				self.commit ();
			});},
			get predict () {return __get__ (this, function (self) {
				;
			});},
			get interact () {return __get__ (this, function (self) {
				;
			});},
			get commit () {return __get__ (this, function (self) {
				;
			});}
		});
		var Sprite = __class__ ('Sprite', [Attribute], {
			get __init__ () {return __get__ (this, function (self, game, width, height) {
				self.width = width;
				self.height = height;
				Attribute.__init__ (self, game);
			});},
			get install () {return __get__ (this, function (self) {
				self.image = new fabric.Rect ({width: self.width, height: self.height, originX: 'center', originY: 'center', fill: 'white'});
			});},
			get reset () {return __get__ (this, function (self, vX, vY, x, y) {
				if (typeof self == 'undefined' || self .__class__ == __kwargdict__) {;
					var self = 0;
				};
				if (typeof vX == 'undefined' || vX .__class__ == __kwargdict__) {;
					var vX = 0;
				};
				if (typeof vY == 'undefined' || vY .__class__ == __kwargdict__) {;
					var vY = 0;
				};
				if (typeof x == 'undefined' || x .__class__ == __kwargdict__) {;
					var x = 0;
				};
				self.vX = vX;
				self.vY = vY;
				self.x = x;
				self.y = y;
				Attribute.reset (self);
			});},
			get predict () {return __get__ (this, function (self) {
				self.x = 0;
				self.y = 0;
			});},
			get commit () {return __get__ (this, function (self) {
				var __left0__ = self.game.ortho (self.x, self.y);
				self.image.left = __left0__[0];
				self.image.top = __left0__[1];
			});},
			get draw () {return __get__ (this, function (self) {
				self.game.canvas.add (self.image);
			});}
		});
		var Paddle = __class__ ('Paddle', [Sprite], {
			get __init__ () {return __get__ (this, function (self, game, index) {
				self.index = index;
				Sprite.__init__ (self, game, self.width, self.height);
			});},
			get reset () {return __get__ (this, function (self) {
				Sprite.reset (self, __kwargdict__ ({x: (self.index ? -orthoWidth + self.margin : Math.floor (orthoWidth) / Math.floor (2) + self.margin), y: 0}));
			});},
			get predict () {return __get__ (this, function (self) {
				self.vY = 0;
				Sprite.predict (self);
			});},
			get interact () {return __get__ (this, function (self) {
				self.y = Math.max (self.height / 2, Math.min (self.y, fieldHeight - self.height / 2));
				if ((self.y - Math.floor (self.height) / Math.floor (2) < self.game.ball.y && self.game.ball.y < self.y + Math.floor (self.height) / Math.floor (2)) && (self.index == 0 && self.game.ball.x < self.x || self.index == 1 && self.game.ball.x > self.x)) {
					self.game.ball.x = self.x;
					self.game.ball.vX = -self.game.ball.vX;
					var speedUp = 1 + 0.5 * Math.pow (1 - abs (self.game.ball.y - self.y) / Math.floor (self.height) / Math.floor (2), 2);
					self.game.ball.vX *= speedUp;
					self.game.ball.vY *= speedUp;
				}
			});}
		});
		Paddle.margin = 30;
		Paddle.width = 10;
		Paddle.height = 100;
		Paddle.speed = 400;
		var Ball = __class__ ('Ball', [Sprite], {
			get __init__ () {return __get__ (this, function (self, game) {
				Sprite.__init__ (self, game, self.side, self.side);
			});},
			get reset () {return __get__ (this, function (self) {
				var angle = self.game.serviceIndex * Math.PI + (Math.random () > 0.5 ? 1 : -1) * Math.random () * Math.atan (fieldHeight / orthoWidth);
				Sprite.reset (self, __kwargdict__ ({vX: self.speed * Math.cos (angle), vY: self.speed * Math.sin (angle)}));
			});},
			get predict () {return __get__ (this, function (self) {
				Sprite.predict (self);
				if (self.x < 0) {
					self.game.scored (1);
				}
				else {
					if (self.x > orthoWidth) {
						self.game.scored (0);
					}
				}
				if (self.y > fieldHeight) {
					self.y = fieldHeight;
					self.vY = -self.vY;
				}
				else {
					if (self.y < 0) {
						self.y = 0;
						self.vY = -self.vY;
					}
				}
			});}
		});
		Ball.side = 8;
		Ball.speed = 300;
		var Scoreboard = __class__ ('Scoreboard', [Attribute], {
			get install () {return __get__ (this, function (self) {
				self.image = new fabric.Line ({x1: 0, y1: fieldHeight, x2: orthoWidth, y2: fieldHeight, fill: 'white', stroke: 'white', strokeWidth: '5'});
				self.image.left = Math.floor (self.width) / Math.floor (2);
				self.image.top = Math.floor (self.height) / Math.floor (2);
			});},
			get increment () {return __get__ (this, function (self, playerIndex) {
				self.scores [playerIndex] ++;
			});},
			get reset () {return __get__ (this, function (self) {
				self.scores = list ([0, 0]);
				Attribute.reset (self);
			});},
			get commit () {return __get__ (this, function (self) {
				;
			});},
			get draw () {return __get__ (this, function (self) {
				self.game.canvas.add (self.image);
			});}
		});
		Scoreboard.nameShift = 75;
		Scoreboard.scoreShift = 25;
		var Game = __class__ ('Game', [object], {
			get __init__ () {return __get__ (this, function (self) {
				self.deltaT = 0;
				self.serviceIndex = (Math.random () > 0.5 ? 1 : 0);
				self.pause = true;
				self.canvas = new fabric.Canvas ('canvas', {backgroundColor: 'black', originX: 'center', originY: 'center'});
				self.canvas.onWindowResise = self.resize;
				self.canvas.onWindowDraw = self.draw;
				self.canvas.lineWidth = 2;
				self.canvas.clear ();
				self.attributes = list ([]);
				self.ball = Ball (self);
				self.scoreboard = Scoreboard (self);
				self.deltaT = 1 / 60.0;
				window.setInterval (self.update, self.deltaT);
				window.setInterval (self.draw, 1 / 20.0);
			});},
			get update () {return __get__ (this, function (self) {
				if (false) {
					;
				}
				else {
					var __iter0__ = self.attributes;
					for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
						var attribute = __iter0__ [__index0__] ;
						attribute.predict ();
					}
					var __iter0__ = self.attributes;
					for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
						var attribute = __iter0__ [__index0__] ;
						attribute.interact ();
					}
					var __iter0__ = self.attributes;
					for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
						var attribute = __iter0__ [__index0__] ;
						attribute.commit ();
					}
				}
			});},
			get scored () {return __get__ (this, function (self, playerIndex) {
				self.scoreboard.increment (playerIndex);
				self.serviceIndex = 1 - playerIndex;
				var __iter0__ = self.paddles;
				for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
					var paddle = __iter0__ [__index0__] ;
					paddle.reset ();
				}
				self.ball.reset ();
				self.pause = true;
			});},
			get draw () {return __get__ (this, function (self) {
				self.canvas.clear ();
				var __iter0__ = self.attributes;
				for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
					var attribute = __iter0__ [__index0__] ;
					attribute.draw ();
				}
			});},
			get resize () {return __get__ (this, function (self, width, height) {
				self.canvas.scale (width / orthoWidth, height / orthoHeight);
			});},
			get ortho () {return __get__ (this, function (self, x, y) {
				return tuple (list ([(x + Math.floor (orthoWidth) / Math.floor (2)) * self.canvas.width / orthoWidth, (orthoHeight - Math.floor (fieldHeight) / Math.floor (2) - -fieldHeight / 2) * self.canvas.height / orthoHeight]));
			});}
		});
		var game = Game ();
		//<all>
		__all__.Attribute = Attribute;
		__all__.Ball = Ball;
		__all__.Game = Game;
		__all__.Paddle = Paddle;
		__all__.Scoreboard = Scoreboard;
		__all__.Sprite = Sprite;
		__all__.canvas = canvas;
		__all__.fieldHeight = fieldHeight;
		__all__.game = game;
		__all__.orthoHeight = orthoHeight;
		__all__.orthoWidth = orthoWidth;
		__all__.rect = rect;
		//</all>
	}) ();
