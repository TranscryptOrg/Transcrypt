# This is the second 'http' example, demoing the interplay of 'drivers'
from snabbdom import makeDOMDriver, span, input, div
d = dict

def log(f):
    '''
    debug tool, you can insert .map(log) anywhere
    I used it to compare first buggy version with the js version, which I
    configured to the "jsapp" DOM element.
    Both worked concurrently.
    '''
    console.log(f)
    return f

def LabeledSlider(sources):
    'A cycle js component'
    dom_source = sources.DOM
    propsS = sources.props

    new_valueS = dom_source \
            .select('.slider') \
            .events('input') \
            .map(lambda ev: ev.target.value)

    stateS = propsS \
            .map(lambda props: new_valueS \
                .map(lambda val: {
                    'label': props.label,
                    'unit' : props.unit,
                    'min'  : props.min,
                    'max'  : props.max,
                    'value': val}) \
                .startWith(props)
                ) \
            .flatten() \
            .remember() # https://github.com/staltz/xstream/wiki/Migrating-from-RxJS
                        # all streams are hot, the start with would be forgotten w/o this:

    vdomS = stateS \
            .map(lambda state: \
                div('.labeled-slider', [
                    span('.label',
                        state.label + ' ' + state.value + state.unit),
                    input('.slider', {'attrs': {
                        'type': 'range', 'min': state.min,
                        'max': state.max, 'value': state.value}}),
                    ]))
    sinks = d(DOM=vdomS, value=stateS.map(lambda state: state.value))
    return sinks


def main(sources):
    xs = xstream['default']
    propsS = xs.of( d(label='Radius', unit='', min=20, value=50, max=80) )
    labeled_slider  = LabeledSlider({'DOM': sources.DOM, 'props': propsS})
    child_vdomS     = labeled_slider.DOM
    child_valueS    = labeled_slider.value

    def render(v):
        value, child_vdom = v
        return div([
                child_vdom,
                div({'style': {
                    'backgroundColor': 'green',
                    'width': str(value) + 'px',
                    'height': str(value) + 'px',
                    'borderRadius': str(value * 0.5) + 'px'
                    }})])


    vdomS = xs.combine(child_valueS, child_vdomS).map(log).map(render)
    return {'DOM': vdomS}



Cycle.run(main, {
  'DOM': makeDOMDriver('#app')
});
