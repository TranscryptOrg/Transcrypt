	(function () {
		var Spawn = __class__ ('Spawn', [object], {
			get __init__ () {return __get__ (this, function (self, width, height) {
				var __left0__ = tuple ([width, height, 100, d3.scale.category20 ()]);
				self.width = __left0__ [0];
				self.height = __left0__ [1];
				self.spacing = __left0__ [2];
				self.fill = __left0__;
				self.svg = d3.select ('body').append ('svg').attr ('width', self.width).attr ('height', self.height).on ('mousemove', self.mousemove).on ('mousedown', self.mousedown);
				self.svg.append ('rect').attr ('width', self.width).attr ('height', self.height);
				self.cursor = self.svg.append ('circle').attr ('r', self.spacing).attr ('transform', 'translate ({}, {})'.format (self.width / 2, self.height / 2)).attr ('class', 'cursor');
				self.force = d3.layout.force ().size (list ([self.width, self.height])).nodes (list ([dict ({})])).linkDistance (self.spacing).charge (-(1000)).on ('tick', self.tick);
				var __left0__ = tuple ([self.force.nodes (), self.force.links (), self.svg.selectAll ('.node'), self.svg.selectAll ('.link')]);
				self.nodes = __left0__ [0];
				self.links = __left0__ [1];
				self.node = __left0__ [2];
				self.link = __left0__ [3];
				self.restart ();
			});},
			get mousemove () {return __get__ (this, function (self) {
				self.cursor.attr ('transform', ('translate (' + d3.mouse (self.svg.node ())) + ')');
			});},
			get mousedown () {return __get__ (this, function (self) {
				var pushLink = function (target) {
					var __left0__ = tuple ([target.x - node.x, target.y - node.y]);
					var x = __left0__ [0];
					var y = __left0__ [1];
					if (Math.sqrt (x * x + y * y) < self.spacing) {
						spawn.links.push (dict ({'source': node, 'target': target}));
					}
				};
				var point = d3.mouse (self.svg.node ());
				var node = dict ({'x': point [0], 'y': point [1]});
				self.nodes.push (node);
				self.nodes.forEach (pushLink);
				self.restart ();
			});},
			get tick () {return __get__ (this, function (self) {
				self.link.attr ('x1', (function __lambda__ (d) {
					return d.source.x;})).attr ('y1', (function __lambda__ (d) {
					return d.source.y;})).attr ('x2', (function __lambda__ (d) {
					return d.target.x;})).attr ('y2', (function __lambda__ (d) {
					return d.target.y;}));
				self.node.attr ('cx', (function __lambda__ (d) {
					return d.x;})).attr ('cy', (function __lambda__ (d) {
					return d.y;}));
			});},
			get restart () {return __get__ (this, function (self) {
				self.link = self.link.data (self.links);
				self.link.enter ().insert ('line', '.node').attr ('class', 'link');
				self.node = self.node.data (self.nodes);
				self.node.enter ().insert ('circle', '.cursor').attr ('class', 'node').attr ('r', 7).call (self.force.drag);
				self.force.start ();
			});}
		});
		var spawn = Spawn (window.innerWidth, window.innerHeight);
		__pragma__ ('<all>')
			__all__.Spawn = Spawn;
			__all__.spawn = spawn;
		__pragma__ ('</all>')
	}) ();
