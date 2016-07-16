	__nest__ (
		__all__,
		'riot_tag', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __author__ = 'Gunther Klessinger, gk@axiros.com, Germany';
					var __date__ = '$Date: 2016-07-11 02:17:51 +0100 $';
					var RiotTag = __class__ ('RiotTag', [object], {
						get __init__ () {return __get__ (this, function (self, tag, opts) {
							self.opts = opts;
							self._setup_tag (tag);
						});},
						get _setup_tag () {return __get__ (this, function (self, tag) {
							tag.py_obj = self;
							self.riot_tag = tag;
							
							        var evs = ['before-mount', 'update', 'mount', 'unmount']
							        evs.forEach(function(k, i, evs) {
							            var k1 = k.replace('-', '_')
							            tag.on(k, function () {self[k1](this)})
							        })
						});},
						get pp () {return __get__ (this, function (self) {
							var msg = tuple ([].slice.apply (arguments).slice (1));
							print (self.node_name, msg);
						});},
						get _lifecycle_ev () {return __get__ (this, function (self, mode) {
							if (self.debug) {
								self.pp (mode + 'ing');
							}
						});},
						get update () {return __get__ (this, function (self, tag) {
							self._lifecycle_ev ('update');
						});},
						get mount () {return __get__ (this, function (self, tag) {
							self._lifecycle_ev ('mount');
						});},
						get unmount () {return __get__ (this, function (self, tag) {
							self._lifecycle_ev ('unmount');
						});},
						get before_mount () {return __get__ (this, function (self, tag) {
							self._lifecycle_ev ('before-mount');
							return self.bind_vars (tag);
						});},
						get bind_vars () {return __get__ (this, function (self, tag) {
							self.node_name = tag.root.nodeName;
							self.debug && self.pp ('binding vars');
							
							        tag._immutables = []
							        var nobind = [ 'update', 'mount', 'before_mount', 'unmount']
							        for (var k in self) if (k.indexOf('_') != 0 && nobind.indexOf(k) ==-1){
							            var v = self[k]
							            typeof v === 'function' ? tag[k] = self[k] :
							                                      tag._immutables.push(k)
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
					RiotTag.debug = null;
					RiotTag.template = '<h1>it worx</h1>';
					RiotTag.style = '';
					RiotTag.node_name = '<no node>';
					RiotTag.opts = null;
					__pragma__ ('<all>')
						__all__.RiotTag = RiotTag;
						__all__.__author__ = __author__;
						__all__.__date__ = __date__;
					__pragma__ ('</all>')
				}
			}
		}
	);
