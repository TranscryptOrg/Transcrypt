	(function () {
		var dom = CycleDOM;
		var __left0__ = tuple ([dom.div, dom.input, dom.p]);
		var div = __left0__ [0];
		var input = __left0__ [1];
		var p = __left0__ [2];
		var h1 = __left0__ [3];
		var render = function (toggled) {
			return div (list ([input (dict ({'attrs': dict ({'type': 'checkbox'})})), 'Toggle me', p ((toggled ? 'ON' : 'off'))]));
		};
		var main = function (drivers) {
			var xs = xstream ['default'];
			var driver_sinks = dict ({'DOM': drivers ['DOM'].select ('input').events ('change').map ((function __lambda__ (ev) {
				return ev.target.checked;
			})).startWith (false).map (render)});
			return driver_sinks;
		};
		var drivers = dict ({'DOM': dom.makeDOMDriver ('#app')});
		Cycle.run (main, drivers);
		__pragma__ ('<all>')
			__all__.div = div;
			__all__.dom = dom;
			__all__.drivers = drivers;
			__all__.h1 = h1;
			__all__.input = input;
			__all__.main = main;
			__all__.p = p;
			__all__.render = render;
		__pragma__ ('</all>')
	}) ();
