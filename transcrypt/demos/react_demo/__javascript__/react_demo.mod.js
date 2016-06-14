	(function () {
		var h = function (elm_type, props) {
			if (typeof props == 'undefined' || (props != null && props .__class__ == __kwargdict__)) {;
				var props = '';
			};
			var args = tuple ([].slice.apply (arguments).slice (2));
			return React.createElement.apply (null, [elm_type].concat ([props]).concat (args));
		};
		var render = function (react_element, destination_id, callback) {
			if (typeof callback == 'undefined' || (callback != null && callback .__class__ == __kwargdict__)) {;
				var callback = (function __lambda__ () {
					return null;
				});
			};
			var container = document.getElementById (destination_id);
			ReactDOM.render (react_element, container, callback);
		};
		var Hello = React.createClass (dict ({'displayName': 'Hello', 'getInitialState': (function __lambda__ () {
			return dict ({'counter': 0});
		}), 'updateCounter': (function __lambda__ () {
			return this.setState (dict ({'counter': this.state ['counter'] + 1}));
		}), 'componentDidMount': (function __lambda__ () {
			return setInterval (this.updateCounter, 1000);
		}), 'render': (function __lambda__ () {
			return h ('div', dict ({'className': 'maindiv'}), h ('h1', null, 'Hello ', this.props ['name']), h ('p', null, 'Lorem ipsum dolor sit ame.'), h ('p', null, 'Counter: ', this.state ['counter']));
		})}));
		var element = React.createElement (Hello, dict ({'name': 'React!'}));
		render (element, 'container');
		__pragma__ ('<all>')
			__all__.Hello = Hello;
			__all__.element = element;
			__all__.h = h;
			__all__.render = render;
		__pragma__ ('</all>')
	}) ();
