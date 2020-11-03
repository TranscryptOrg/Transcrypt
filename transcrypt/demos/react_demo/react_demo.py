from org.reactjs import createElement, useState, useEffect, useRef
from org.reactjs.dom import render as react_render


# Helper functions

def h(elm_type, props='', *args):
    return createElement(elm_type, props, *args)


def render(react_element, destination_id, callback=lambda: None):
    container = document.getElementById(destination_id)
    react_render(react_element, container, callback)


def useInterval(func, delay=None):
    # can be used as `useInterval(func, delay)`
    # or as `@useInterval(delay)`
    if delay is None:
        delay = func
        return lambda fn: useInterval(fn, delay)

    ref = useRef(func)
    ref.current = func

    @useEffect.withDeps(delay)
    def setup():
        id = setInterval(lambda: ref.current(), delay)
        return lambda: clearInterval(id)

    return func


# Create a component

def Hello(props):
    count, setCount = useState(0)

    @useInterval(1000)
    def updateCounter():
        setCount(count+1)

    return h(
        'div',
        {'className': 'maindiv'},
        h('h1', None, 'Hello ', props['name']),
        h('p', None, 'Lorem ipsum dolor sit ame.'),
        h('p', None, 'Counter: ', count),
        h(
            'button',
            {'onClick': updateCounter},
            'Increment',
        )
    )


# Render the component in a 'container' div

element = React.createElement(Hello, {'name': 'React!'})
render(element, 'container')
