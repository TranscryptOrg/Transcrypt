	(function () {
		var __left0__ = tuple ([CycleDOM, CycleHTTPDriver]);
		var dom = __left0__ [0];
		var http = __left0__ [1];
		var render = function (user) {
			return dom.div ('.users', list ([dom.button ('.get-random', 'Get random user'), (!(user) ? null : dom.div ('.user-details', list ([dom.h1 ('.user-name', user.py_name), dom.h4 ('.user-email', user.email), dom.a ('.user-website', dict ({'attrs': dict ({'href': user.website})}), user.website)])))]));
		};
		var main = function (sources) {
			var get_url_params = function () {
				var rand = Math.round (Math.random () * 9) + 1;
				var url = dict ({'url': 'http://jsonplaceholder.typicode.com/users/' + str (rand), 'category': 'users', 'method': 'GET'});
				console.log (url);
				return url;
			};
			var get_random_user_s = sources.DOM.select ('.get-random').events ('click').map (get_url_params);
			var user_s = sources.HTTP.select ('users').flatten ().map ((function __lambda__ (res) {
				return res.body;
			})).startWith (null);
			var vdom_s = user_s.map (render);
			return dict ({'DOM': vdom_s, 'HTTP': get_random_user_s});
		};
		Cycle.run (main, dict ({'DOM': dom.makeDOMDriver ('#app'), 'HTTP': http.makeHTTPDriver ()}));
		__pragma__ ('<all>')
			__all__.dom = dom;
			__all__.http = http;
			__all__.main = main;
			__all__.render = render;
		__pragma__ ('</all>')
	}) ();
