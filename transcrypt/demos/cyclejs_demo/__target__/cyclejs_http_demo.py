# This is the second 'http' example, demoing the interplay of 'drivers'
dom, http = CycleDOM, CycleHTTPDriver


def render(user):
    return dom.div('.users', [
        dom.button('.get-random', 'Get random user'),
        None if not user else dom.div('.user-details', [
            dom.h1('.user-name' , user.name),
            dom.h4('.user-email', user.email),
            dom.a ('.user-website',
                       {'attrs': {'href': user.website}}, user.website)
            ])
        ])

def main(sources):
    '''This **declares** your app. Evaluated only once(!)'''

    def get_url_params():
        rand = Math.round(Math.random() * 9) + 1
        url = {
            'url': 'http://jsonplaceholder.typicode.com/users/' + str(rand),
            'category': 'users',
            'method': 'GET'
            }
        console.log(url)
        return url

    get_random_user_s = sources.DOM       \
            .select('.get-random')        \
            .events('click')              \
            .map(get_url_params)

    user_s = sources.HTTP.select('users') \
            .flatten()                    \
            .map(lambda res: res.body)    \
            .startWith(None)

    vdom_s = user_s.map(render)

    return { 'DOM' : vdom_s, 'HTTP': get_random_user_s}


Cycle.run(main, {
    'DOM' : dom.makeDOMDriver('#app'),
    'HTTP': http.makeHTTPDriver()
})

