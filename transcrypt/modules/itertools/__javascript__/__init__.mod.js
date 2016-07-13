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
					var cycle = function* (iterable) {						
						let buffer = Array.from (iterable);	// Can't reset, Chrome can't obtain iter from gener
						while (true) {
							for (let item of buffer) {
								yield item;
							}
						}
					}
					var repeat = function* (item, n) {
						if (typeof n == 'undefined') {
							while (true) {
								yield item;
							}
						}
						else {
							for (let index = 0; index < n; index++) {
								yield item;
							}
						}
					}
					var accumulate = function* (iterable, func) {
						let first = true;
						if (func) {
							for (let item of iterable) {
								if (first) {
									var sum = item;
									first = false;
								}
								else {
									sum = func (sum, item);
								}
								yield sum;
							}
						}
						else {
							for (let item of iterable) {
								if (first) {
									var sum = item;
									first = false;
								}
								else {
									sum = sum + item;
								}
								yield sum;
							}
						}
					}
					var chain = function* () {
						let args = [] .slice.apply (arguments);							
						for (let arg of args) {
							for (let item of arg) {
								yield item;
							}
						}
					}
					chain.from_iterable = function* (iterable) {						
						for (let item of iterable) {
							for (let subItem of item) {
								yield subItem;
							}
						}
					}
					var compress = function* (data, selectors) {
						let dataIterator = data [Symbol.iterator] .call (data);
						let selectorsIterator = selectors [Symbol.iterator] .call (selectors);
						while (true) {
							let dataItem = dataIterator.next ();
							let selectorsItem = selectorsIterator.next ();
							if (dataItem.done || selectorsItem.done) {
								break;
							}
							else {
								if (selectorsItem.value) {
									yield dataItem.value;
								}
							}
						}
					}
					var dropwhile = function* (pred, seq) {
						let started = false;
						for (let item of seq) {
							if (started) {
								yield item;
							}
							else if (!pred (item)) {
								started = true;
								yield item;
							}
						}
					}
					var filterfalse = function* (pred, seq) {
						for (let item of seq) {
							if (!pred (item)) {
								yield item;
							}
						}
					}
					var groupby = function* (iterable, keyfunc) {
						let anIterator = iterable [Symbol.iterator] .call (iterable);
						let item = anIterator.next ();
						
						if (item.done) {
							return;
						}
						
						let groupKey = keyfunc (item.value);
						let more = true;
						
						function* group () {
							while (true) {
								yield (item.value);
								item = anIterator.next ();
								
								if (item.done) {
									more = false;
									return;
								}
								
								let key = keyfunc (item.value);
								
								if (key != groupKey) {
									groupKey = key;
									return;
								}
							}
						}
						
						while (more) {
							yield tuple ([groupKey, group ()]);
						}
					}
					
					var islice = function* () {
						let args = [] .slice.apply (arguments);
						let anIterator = args [0];
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
						for (let index = 0; index < start; index++) {
							if (anIterator.next (). done) {
								return;
							}
						}
						for (let index = 0; index < stop - start; index++) {
							let next = anIterator.next ();
							if (next.done) {
								return;
							}
							if (index % step == 0) {
								yield next.value;
							}
						}
					}
					var starmap = function* (func, seq) {
						let anIterator = seq [Symbol.iterator] .call (seq);
						while (true) {
							let next = anIterator.next ()
							if (next.done) {
								return;
							}
							else {
								yield func (...next.value); 
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
__pragma__ ('ifdef', 'e6')
					__all__.count = count;
					__all__.cycle = cycle;
					__all__.repeat = repeat;
					__all__.accumulate = accumulate;
					__all__.chain = chain;
					__all__.compress = compress;
					__all__.dropwhile = dropwhile;
					__all__.filterfalse = filterfalse;
					__all__.groupby = groupby;
					__all__.islice = islice;
					__all__.starmap = starmap;
__pragma__ ('else')
					__all__.chain = chain;
__pragma__ ('endif')
					//</all>
				}
			}
		}
	);
