	(function () {
		var __name__ = '__main__';
		var makeDOMDriver = __init__ (__world__.snabbdom).makeDOMDriver;
		var span = __init__ (__world__.snabbdom).span;
		var input = __init__ (__world__.snabbdom).input;
		var div = __init__ (__world__.snabbdom).div;
		var d = dict;
		var log = function (f) {
			console.log (f);
			return f;
		};
		var LabeledSlider = function (sources) {
			var dom_source = sources.DOM;
			var propsS = sources.props;
			var new_valueS = dom_source.select ('.slider').events ('input').map ((function __lambda__ (ev) {
				return ev.target.value;
			}));
			var stateS = propsS.map ((function __lambda__ (props) {
				return new_valueS.map ((function __lambda__ (val) {
					return dict ({'label': props.label, 'unit': props.unit, 'min': props.min, 'max': props.max, 'value': val});
				})).startWith (props);
			})).flatten ().remember ();
			var vdomS = stateS.map ((function __lambda__ (state) {
				return div ('.labeled-slider', list ([span ('.label', ((state.label + ' ') + state.value) + state.unit), input ('.slider', dict ({'attrs': dict ({'type': 'range', 'min': state.min, 'max': state.max, 'value': state.value})}))]));
			}));
			var sinks = d (__kwargtrans__ ({DOM: vdomS, value: stateS.map ((function __lambda__ (state) {
				return state.value;
			}))}));
			return sinks;
		};
		var main = function (sources) {
			var xs = xstream ['default'];
			var propsS = xs.of (d (__kwargtrans__ ({label: 'Radius', unit: '', min: 20, value: 50, max: 80})));
			var labeled_slider = LabeledSlider (dict ({'DOM': sources.DOM, 'props': propsS}));
			var child_vdomS = labeled_slider.DOM;
			var child_valueS = labeled_slider.value;
			var render = function (v) {
				var __left0__ = v;
				var value = __left0__ [0];
				var child_vdom = __left0__ [1];
				return div (list ([child_vdom, div (dict ({'style': dict ({'backgroundColor': 'green', 'width': str (value) + 'px', 'height': str (value) + 'px', 'borderRadius': str (value * 0.5) + 'px'})}))]));
			};
			var vdomS = xs.combine (child_valueS, child_vdomS).map (log).map (render);
			return dict ({'DOM': vdomS});
		};
		Cycle.run (main, dict ({'DOM': makeDOMDriver ('#app')}));
		__pragma__ ('<use>' +
			'snabbdom' +
		'</use>')
		__pragma__ ('<all>')
			__all__.LabeledSlider = LabeledSlider;
			__all__.__name__ = __name__;
			__all__.d = d;
			__all__.div = div;
			__all__.input = input;
			__all__.log = log;
			__all__.main = main;
			__all__.makeDOMDriver = makeDOMDriver;
			__all__.span = span;
		__pragma__ ('</all>')
	}) ();
