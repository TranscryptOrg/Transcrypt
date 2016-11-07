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

Call this via the browser and check the network log about the various requests.

Tip: Search os.chdir in this module, we managed to run the tests only in their
dirs.

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

ctx = {'cur_test': None}
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
def index(tests=0):
    if 'favico' in str(tests):
        return ''
    if not tests and not T:
        return 'need a comma seped. list of tests to run, e.g. /do/hello,time'
    if not T:
        T.extend([k.strip() for k in tests.split(',') if k.strip()])
    t = ctx['cur_test']
    if not t:
        if exists(stop_flag):
            os.unlink(stop_flag)
        # starting.
        T.append('done')
    t = ctx['cur_test'] = T[0] if not t else T[T.index(t) + 1 ]
    cd()
    if t == 'done':
        return stop('All tests finished. Success.')

    for s in ('', 'Next test', I('-' * 20), M(t)): print s
    return redir % ('', '/run_test/' + t)


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

@route('/run_test/<filepath:path>')
def run_test(filepath):

    if '__javascript__' in filepath:
        # we are alraedy in d:
        with open(filepath) as fd:
            js = fd.read()
        js += ('\nlocation.href="/result?test=%s&res=" + '
               'document.getElementById("message").innerHTML;' % os.getcwd())
        return js

    if filepath != 'compiled':
        # the compile takes long so we display a message, while we redir to
        # this method again:
        d = j(env['d_at'], filepath)
        os.chdir(d)
        return redir % ('compiling tests in %s...' % d, '/run_test/compiled')

    d = os.getcwd()
    env['PYTHONPATH'] = '.'
    fn = 'autotest'
    if not '%s.py' % fn in os.listdir(d):
        if not '__init__.py' in os.listdir(d):
            return redir % ('err', '/result?test=%s&res=ERROR' % d)
        print(M('creating an ci autotest.py file')) 
        fn = 'ci'

    if fn == 'ci':
        d, test = d.rsplit('/', 1)
        os.chdir(d)
        with open(fn + '.py', 'w') as fd:
            fd.write(ci_at % (test, test))

    for flags in ('-r', '-bn'):
        run_t(flags, './%s.py' % fn)
        #env['PYTHONPATH'] = '/root/Transcrypt/transcrypt/modules:.'

    with open('%s.html' % fn) as fd:
        html = fd.read()

    # if the js fails we would not get a result hit, so:
    cmd = ['sleep %s' % max_wait,
            ('wget -q "http://127.0.0.1:8080/result?'
             'test=%s&res=ERROR" -O /dev/null') % d]
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


def stop(msg):
    while T: T.pop()
    with open(stop_flag, 'w') as fd:
        fd.write(msg)
    ctx['cur_test'] = None
    col = G
    if 'ERROR' in msg:
        col = R
    msg += '[%s set]' % stop_flag
    print col(msg)
    return msg

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
    assert os.system('which wget') == 0, 'require wget'
    print 'now hit me at http://%s:%s/<tests>' % (h, p)
    print 'e.g. http://%s:%s/time,hello' % (h, p)
    stop_flag += '_%s' % p

    run(host=h, port=int(p))


