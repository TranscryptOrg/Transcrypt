	(function () {
		var __name__ = '__main__';
		var ILabeledSlider = __init__ (__world__.components.labeled_slider).ILabeledSlider;
		var __left0__ = tuple ([dict, CycleDOM]);
		var d = __left0__ [0];
		var dom = __left0__ [1];
		var isolate = CycleIsolate ['default'];
		var main = function (sources) {
			var xs = xstream ['default'];
			var weight_propsS = xs.of (d (__kwargtrans__ ({label: 'Weight', unit: 'kg', min: 40, value: 70, max: 150})));
			var height_propsS = xs.of (d (__kwargtrans__ ({label: 'Height', unit: 'cm', min: 140, value: 170, max: 210})));
			var ils = function (propsS) {
				return ILabeledSlider (dict ({'DOM': sources.DOM, 'props': propsS}));
			};
			var weight_slider = ils (weight_propsS);
			var height_slider = ils (height_propsS);
			var weight_vdomS = weight_slider.DOM;
			var height_vdomS = height_slider.DOM;
			var weight_valueS = weight_slider.value;
			var height_valueS = height_slider.value;
			var bmi = function (wh) {
				return round (wh [0] / Math.pow (wh [1] * 0.01, 2), 2);
			};
			var bmiS = xs.combine (weight_valueS, height_valueS).map (bmi);
			var render = function (v) {
				var __left0__ = v;
				var bmi = __left0__ [0];
				var weight_vdom = __left0__ [1];
				var height_vdom = __left0__ [2];
				return dom.div (list ([weight_vdom, height_vdom, dom.h2 ('BMI is ' + bmi)]));
			};
			var vdomS = xs.combine (bmiS, weight_vdomS, height_vdomS).map (render);
			return dict ({'DOM': vdomS});
		};
		Cycle.run (main, dict ({'DOM': dom.makeDOMDriver ('#app')}));
		__pragma__ ('<use>' +
			'components.labeled_slider' +
		'</use>')
		__pragma__ ('<all>')
			__all__.ILabeledSlider = ILabeledSlider;
			__all__.__name__ = __name__;
			__all__.d = d;
			__all__.dom = dom;
			__all__.isolate = isolate;
			__all__.main = main;
		__pragma__ ('</all>')
	}) ();
