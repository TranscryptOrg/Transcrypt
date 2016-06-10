	(function () {
		var Hello = React.createClass (dict ({'displayName': 'Hello', 'render': (function __lambda__ () {
			return React.createElement ('div', null, 'Hello ', this.props ['name']);})}));
		ReactDOM.render (React.createElement (Hello, dict ({'name': 'World'})), document.getElementById ('container'));
		__pragma__ ('<all>')
			__all__.Hello = Hello;
		__pragma__ ('</all>')
	}) ();
