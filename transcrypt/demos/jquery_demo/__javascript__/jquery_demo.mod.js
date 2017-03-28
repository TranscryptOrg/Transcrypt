	(function () {
		var start = function () {
			var changeColors = function () {
				for (var div of $divs) {
					$ (div).css (dict ({'color': 'rgb({},{},{})'.format (...function () {
						var __accu0__ = [];
						for (var i = 0; i < 3; i++) {
							__accu0__.append (int (256 * Math.random ()));
						}
						return __accu0__;
					} ())}));
				}
			};
			var $divs = $ ('div');
			changeColors ();
			window.setInterval (changeColors, 500);
		};
		__pragma__ ('<all>')
			__all__.start = start;
		__pragma__ ('</all>')
	}) ();
