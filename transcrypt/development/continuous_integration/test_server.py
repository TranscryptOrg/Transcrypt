#!/usr/bin/env python2
"""
Transcrypt CI testserver.

Hit /index with a browser and you'll see what it does.
In travis we hit it via `xvfb-run firefox  \
        http://127.0.0.1:8080/do/hello,time,transcrypt/dictionaries,...`

This is to speed up CI testing:
- phantomjs was no option, too much incompat with real browsers
- starting firefox on each autotest.html files would have taken ages due to FF
  startup times (in headless CI envs)
- so we keep FF open and redirect via js from test to test

This can be easily made parallel by starting a few FFs and servers on different
ports


CAUTION:
    The full transcrypt/autotest.py does not run, so we allow to give
    seperate subfolders, for which we create then a ci.py autotest file
    and run that in the parent dir.


## Sequence of hits

Call `/do/<tests>` via the browser and check the network log about the various requests.

## Tips

1. Search os.chdir in this module, we managed to run the tests only in their
dirs.

1. `/chk/<test>` allows to analyse a single test, e.g. `/chk/transcrypt/dictionaries`

1. `/.fooo` is expanded to `/transcrypt/foo` as test name.

"""
# tests to run, filled in sys.argv:
T = []

max_wait = 10 # then its error


import sys, os, time, subprocess
# make py2 >> py3:
reload(sys); sys.setdefaultencoding('utf-8')

from bottle import route, run, template, request

env, j, exists = os.environ, os.path.join, os.path.exists
env['TZ'] = 'Europe/Berlin' # for browser and our transcypt -r
stop_flag = '/tmp/transcrypt_tester_stopflag'

ctx = {'cur_test': None, 'have_run': []}
# /root/Transcrypt/transcrypt:
_ = os.path.abspath(__file__).rsplit
env['d_0'] = d0 = _('/', 3)[0]
# /root/Transcrypt/transcrypt/development_cont.int:
env['d_i'] =  _('/', 1)[0]
env['d_at'] = d0 + '/development/automated_tests'
redir = '\n'.join(('<html>', '<body>', '%s', '<script>',
         'window.location.href="%s";', '</script>',
         '</body>', '</html>'))

def cd():
    'back to integration test dir'
    os.chdir('%(d_i)s' % env)

@route('/')
@route('/do/<tests:path>')
def index(tests=0, single=None):
    if 'favico' in str(tests):
        return ''
    if not tests and not T:
        return '<br>'.join((
        'Need a comma seped. list of tests to run, e.g. /do/hello,time',
        'You can also call a single test like /chk/hello or /chk/.dictionaries'))
    cd()
    if not T:
        if not single:
            reset_ctx()
            ctx['init_url'] = '/do/%s' % tests
        if os.path.exists('./%s' % tests):
            print I('loading test set')
            with open(tests) as fd:
                tests = fd.read()
            tests = [k.strip() for k in tests.splitlines() \
                     if k and not k.startswith('#')]
        else:
            # alternative form:
            tests = [k.strip() for k in tests.split(',')]
        T.extend(tests)
    t = ctx['cur_test']
    if not t:
        if exists(stop_flag):
            os.unlink(stop_flag)
        # starting.
        T.append('done')
    # when we come again for the next test, this was the last we ran:
    last = ctx.get('cur_test')
    if last:
        ctx['have_run'].append(last)
    # next test:
    t = ctx['cur_test'] = T[0] if not t else T[T.index(t) + 1 ]
    t = unalias(t)

    if t == 'done':
        ts = ['<a href="/chk/%s">%s</a>' % (k, k) \
                for k in ctx.get('have_run', ())]
        testlist = '<ul><li>' + '</li><li>'.join(ts) + '</li></ul>'
        return stop('All tests finished:Success.', postfix=testlist)

    for s in ('', 'Next test', I('-' * 20), M(t), I('-' * 20)): print s
    return redir % ('', '/run_test/' + t)

def unalias(t):
    if t.startswith('.'): # shortcut
        t = 'transcrypt/' + t[1:]
    return t

def run_t(*args):
    'invoke transcrypt with flags'
    os.system('%s/run_transcrypt %s' % (env['d_0'], ' '.join(args)))

# %s e.g. dictionaries, we are in its parent dir when writing this:
ci_at = '''
import org.transcrypt.autotester
import %s
autoTester = org.transcrypt.autotester.AutoTester ()
%s.run(autoTester)
autoTester.done ()
'''

@route('/chk/<test:path>')
def chk(test):
    'a single test, intended for browser - stopping after running at the .html'
    test = unalias(test)
    reset_ctx()
    ctx['stop'] = 1
    ctx['init_url'] = '/chk/%s' % test
    return index(tests=test, single=1)

@route('/run_test/<filepath:path>')
def run_test(filepath):

    if '__javascript__' in filepath:
        with open(filepath) as fd:
            js = fd.read()

        if not ctx.get('stop'):
            # we are alraedy in d:
            js += ('\nlocation.href="/result?test=%s&res=" + '
                'document.getElementById("message").innerHTML;' % os.getcwd())
        else:
            js += ('\nhistory.pushState({}, null, "%(init_url)s");' % ctx)
            reset_ctx()
        return js

    if filepath != 'test_html':
        # the compile takes long so we display a message, while we redir to
        # this method again:
        d = j(env['d_at'], filepath)
        os.chdir(d)
        return redir % ('compiling tests in %s...' % d, '/run_test/test_html')

    d = os.getcwd()
    env['PYTHONPATH'] = '.'
    fn = 'autotest'
    if not '%s.py' % fn in os.listdir(d):
        if not '__init__.py' in os.listdir(d):
            return redir % ('err', '/result?test=%s&res=ERROR' % d)
        print(M('creating an ci autotest.py file')) 
        fn = 'ci'

    d_was = d
    if fn == 'ci':
        d, test = d.rsplit('/', 1)
        os.chdir(d)
        with open(fn + '.py', 'w') as fd:
            fd.write(ci_at % (test, test))

    for flags in ('-r', '-b -n -c -da'):
        run_t(flags, './%s.py' % fn)
        #env['PYTHONPATH'] = '/root/Transcrypt/transcrypt/modules:.'

    with open('%s.html' % fn) as fd:
        html = fd.read()
    html = '<h4>%s</h4>' % d_was + html

    if ctx.get('stop'):
        # the test has to load still, need the stopflag not to be deleted:
        # otherwise the js would be augmented with the href forward:
        return stop(html, no_reset=True)

    # if the js fails we would not get a result hit, so:
    cmd = ['sleep %s' % max_wait,
            ('wget -q "http://127.0.0.1:%s/result?'
            'test=%s&res=ERROR" -O /dev/null') % (port, d)]
    ctx['error_reporter'] = subprocess.Popen(' && '.join(cmd), shell=True)

    return html

@route('/result')
def result():
    try:
        ctx['error_reporter'].kill()
    except:
        pass
    res = request.query.res
    test = request.query.test
    if 'ERROR' in res:
        return stop('%s %s' % (test, res))
    print G('SUCCESS'), test
    return redir % ('next test', '/do/next')

def reset_ctx():
    while T: T.pop()
    ctx['cur_test'] = None
    ctx['have_run'] = []
    ctx.pop('stop', 0)
    ctx.pop('init_url', 0)

def stop(msg, postfix='', no_reset=False):
    'no redir here, just a static page'
    iu = ctx.get('init_url')
    if not no_reset:
        reset_ctx()
    with open(stop_flag, 'w') as fd:
        fd.write(msg)
    col = G
    if 'ERROR' in msg:
        col = R
    msg += '[%s set]' % stop_flag
    print col(msg)
    if iu:
        postfix = '<hr>Rerun <a href="%s">%s</a>' % (iu, iu) + postfix
    return msg + postfix

# just ansi color:
def _col(c, *s): return ("\x1B[38;5;%sm%%s\x1B[0m" % c ) % (' '.join(s))
G = lambda *s: _col(154, *s)
R = lambda *s: _col(124, *s)
M = lambda *s: _col(176, *s)
I = lambda *s: _col(146, *s)



if __name__ == '__main__':
    l = sys.argv
    if not len(l) - 1:
        f = l[0]
        print 'Start me with %s <[host:]port>'
        print 'e.g. %s 8080 or %s 0.0.0.0:7777' % (f, f)
        sys.exit(1)
    h, p = ('127.0.0.1:%s' % l[1]).split(':')[-2:]
    port=p
    assert os.system('which wget') == 0, 'require wget'
    print 'now hit me at http://%s:%s/<tests>' % (h, p)
    print 'e.g. http://%s:%s/time,hello' % (h, p)
    stop_flag += '_%s' % p

    run(host=h, port=int(p))


