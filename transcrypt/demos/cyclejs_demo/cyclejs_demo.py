# This is the first 'checkbox' example, with only change:
# view function factored into a render function, for readability:

dom = CycleDOM
div, input, p, h1 = dom.div, dom.input, dom.p

def render(toggled):
    return div([
        input({'attrs': {'type': 'checkbox'}}),
        'Toggle me',
        p('ON' if toggled else 'off')])

def main(drivers):
    xs = xstream['default']
    driver_sinks = {
        'DOM': drivers['DOM'].select('input').events('change')     \
                .map(lambda ev: ev.target.checked)                 \
                .startWith(False)                                  \
                .map(render)
            }
    return driver_sinks


drivers = {'DOM': dom.makeDOMDriver('#app')}


Cycle.run(main, drivers)
