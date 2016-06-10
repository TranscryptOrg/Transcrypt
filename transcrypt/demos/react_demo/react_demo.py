# Create a component
Hello = React.createClass({
  'displayName': 'Hello',
  'render': lambda: React.createElement("div", null, "Hello ", this.props['name'])
  })

# Render the component in a container div
ReactDOM.render(
  React.createElement(Hello, {'name': "World"}),
  document.getElementById('container')
)


