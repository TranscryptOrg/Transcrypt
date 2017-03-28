	__nest__ (
		__all__,
		'components.labeled_slider', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var span = __init__ (__world__.components.snabbdom).span;
					var input = __init__ (__world__.components.snabbdom).input;
					var div = __init__ (__world__.components.snabbdom).div;
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
						return dict (__kwargtrans__ ({DOM: vdomS, value: stateS.map ((function __lambda__ (state) {
							return state.value;
						}))}));
					};
					var isolate = CycleIsolate ['default'];
					var ILabeledSlider = (function __lambda__ (sources) {
						return isolate (LabeledSlider) (sources);
					});
					__pragma__ ('<use>' +
						'components.snabbdom' +
					'</use>')
					__pragma__ ('<all>')
						__all__.ILabeledSlider = ILabeledSlider;
						__all__.LabeledSlider = LabeledSlider;
						__all__.div = div;
						__all__.input = input;
						__all__.isolate = isolate;
						__all__.span = span;
					__pragma__ ('</all>')
				}
			}
		}
	);
