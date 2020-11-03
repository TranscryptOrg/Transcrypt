from components.snabbdom import span, input, div

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
    # sinks:
    return dict(DOM=vdomS, value=stateS.map(lambda state: state.value))

isolate = CycleIsolate['default']
ILabeledSlider = lambda sources: isolate(LabeledSlider)(sources)
