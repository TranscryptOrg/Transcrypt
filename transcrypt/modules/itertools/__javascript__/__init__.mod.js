	__nest__ (
		__all__,
		'itertools', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
__pragma__ ('ifdef', 'e6')
					var count = function* (current, step) {
						while (true) {
							yield current;
							current += step;
						}
					}
					var cycle = function* (arg) {						
						var buffer = Array.from (arg);	// Can't reset, Chrome can't obtain iter from gener
						while (true) {
							for (var atom of buffer) {
								yield atom;
							}
						}
					}
					var repeat = function * (element, n) {
						if (typeof n == 'undefined') {
							while (true) {
								yield element;
							}
						}
						else {
							for (var index = 0; index < n; index++) {
								yield element;
							}
						}
					}
					var chain = function* () {
						var args = [] .slice.apply (arguments);							
						for (var arg of args) {
							for (var atom of arg) {
								yield atom;
							}
						}
					}
					var islice = function* () {
						var args = [] .slice.apply (arguments);
						var anIterator = args [0];
						if (args.length == 2) {
							var stop = args [1];
							var start = 0;
							var step = 1;
						}
						else {
							var start = args [1];
							var stop = args [2];
							if (args.length == 4) {
								var step = args [3];
							}
							else {
								var step = 1;
							}
						}
						for (var index = 0; index < start; index++) {
							if (anIterator.next (). done) {
								return;
							}
						}
						for (var index = 0; index < stop - start; index++) {
							var next = anIterator.next ();
							if (next.done) {
								return;
							}
							if (index % step == 0) {
								yield next.value;
							}
						}
					}
__pragma__ ('else')
					var chain = function () {
						var args = [] .slice.apply (arguments);
						var result = [];
						for (var index = 0; index < args.length; index++) {
							result = result.concat (args [index]);
						}
						return list (result);
					}
__pragma__ ('endif')
					//<all>
					__all__.count = count;
					__all__.cycle = cycle;
					__all__.repeat = repeat;
					__all__.chain = chain;
					__all__.islice = islice;
					//</all>
				}
			}
		}
	);
