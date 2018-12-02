# The BMI example with isolation

from components.labeled_slider import ILabeledSlider
d, dom = dict, CycleDOM
isolate = CycleIsolate['default']

def main(sources):
    xs = xstream['default']
    weight_propsS = xs.of(
            d(label='Weight', unit='kg', min=40, value=70, max=150) )
    height_propsS = xs.of(
            d(label='Height', unit='cm', min=140, value=170, max=210) )

    # isolation as suggested by Andre' done in the component lib:
    def ils(propsS):
        return ILabeledSlider({'DOM': sources.DOM, 'props': propsS})

    weight_slider  =  ils(weight_propsS)
    height_slider  =  ils(height_propsS)

    weight_vdomS   =  weight_slider.DOM
    height_vdomS   =  height_slider.DOM

    weight_valueS  =  weight_slider.value
    height_valueS  =  height_slider.value

    def bmi(wh):
        return round(wh[0] / (wh[1] * 0.01)**2, 2)

    bmiS = xs.combine(weight_valueS, height_valueS).map(bmi)

    def render(v):
        bmi, weight_vdom, height_vdom = v
        return dom.div([weight_vdom, height_vdom, dom.h2('BMI is ' + bmi)])

    vdomS = xs.combine(bmiS, weight_vdomS, height_vdomS).map(render)

    return {'DOM': vdomS}



Cycle.run(main, {'DOM': dom.makeDOMDriver('#app')})
