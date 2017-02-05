# Helper functions


def h(elm_type, props='', *args):
    return React.createElement(elm_type, props, *args)


def render(react_element, destination_id, callback=lambda: None):
    container = document.getElementById(destination_id)
    ReactDOM.render(react_element, container, callback)


# Create a component


Hello = React.createClass({
    'displayName': 'Hello',

    'getInitialState': lambda: {'counter': 0},

    'updateCounter': lambda: (this.setState({'counter': this.state['counter']+1})),

    'componentDidMount': lambda: (setInterval(this.updateCounter, 1000)),

    'render': lambda: h('div', {'className': 'maindiv'},
                          h('h1', None, 'Hello ', this.props['name']),
                          h('p', None, 'Lorem ipsum dolor sit ame.'),
                          h('p', None, 'Counter: ', this.state['counter'])
                        )
})


# Render the component in a 'container' div

element = React.createElement(Hello, {'name': 'React!'})
render(element, 'container')
