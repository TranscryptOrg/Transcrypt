// original version with a logger to compare with the python version
const xs = xstream.default;
const {div, span, input, makeDOMDriver} = CycleDOM;

function log(f){
    console.log(f);
    return f
}

function LabeledSlider(sources) {
  const domSource = sources.DOM;
  const props$ = sources.props;
    function f(ev) {
        console.log(ev.target.value);
        return ev.target.value;
    }
  const newValue$ = domSource
    .select('.slider')
    .events('input')
    .map(f);

  const state$ = props$
    .map(props => newValue$
      .map(val => ({
        label: props.label, 
        unit: props.unit,
        min: props.min, 
        value: val, 
        max: props.max
      }))
      .startWith(props)
    )
    .flatten()
    .remember().map(log);

  const vdom$ = state$
    .map(state =>
      div('.labeled-slider', [
        span('.label',
          state.label + ' ' + state.value + state.unit
        ),
        input('.slider', {
          attrs: {type: 'range', min: state.min, max: state.max, value: state.value}
        })
      ])
    );

  const sinks = {
    DOM: vdom$,
    value: state$.map(state => state.value),
  };
  log(sinks)
  return sinks;
}

function main(sources) {
  const props$ = xs.of({
    label: 'Radius', unit: '', min: 20, value: 50, max: 80
  });
  const childSources = {DOM: sources.DOM, props: props$};
  const labeledSlider = LabeledSlider(childSources);
  const childVDom$ = labeledSlider.DOM;
  const childValue$ = labeledSlider.value;

  const vdom$ = xs.combine(childValue$, childVDom$)
      .map(log)
    .map(([value, childVDom]) =>
      div([
        childVDom,
        div({style: {
          backgroundColor: 'red',
          width: String(value) + 'px',
          height: String(value) + 'px',
          borderRadius: String(value * 0.5) + 'px'
        }})
      ])
    );

  return {
    DOM: vdom$
  };
}

Cycle.run(main, {
  DOM: makeDOMDriver('#jsapp')
});
