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
import sys, os, time, subprocess, urllib, logging
# make py2 >> py3:
reload(sys); sys.setdefaultencoding('utf-8')
from bottle import route, run, template, request

# tests to run, filled in sys.argv:
T = []

max_wait = 10 # then its error

# single or multithreaded (latter required for dev mode, getting fs change
# hits, while polling. Disadvantage: pip install paste required, not req. for travis:
dev_mode = 0


test_end_marker = 'done'
env, j, exists = os.environ, os.path.join, os.path.exists
env['TZ'] = 'Europe/Berlin' # for browser and our transcypt -r
stop_flag = '/tmp/transcrypt_tester_stopflag'

ctx = {'cur_test': None, 'have_run': []}

# set some paths into our environ:
_ = os.path.abspath(__file__).rsplit
# /root/Transcrypt/transcrypt:
env['d_0'] = d0 = _('/', 3)[0]


runners = {'3.5': 'run_transcrypt',
           '3.6': 'run_transcrypt36'}

avail_pyvers = []
for maj in '3.5', '3.6':
    if os.popen('python%s --version 2>/dev/null' % maj).read():
        avail_pyvers.append(maj)

'''        
runners = {'3.5': 'run_transcrypt',
           '3.6': 'run_transcrypt36',
           '3.7': 'run_transcrypt37'}

avail_pyvers = []
for maj in '3.5', '3.6', '3.7':
    if os.popen('python%s --version 2>/dev/null' % maj).read():
        avail_pyvers.append(maj)
'''
        
        
# /root/Transcrypt/transcrypt/development_cont.int:
env['d_i'] =  _('/', 1)[0]
log_file = env['d_i'] + '/results.log'
env['d_at'] = d0 + '/development/automated_tests'



dflt_fs_mon = ('find "%s" -name "*.py" | entr -c '
               'wget -q "%%(FS_CHANGE_URL)s" -O -') % env['d_0']
env['TS_MON_CMD'] = os.environ.get('TS_MON_CMD', dflt_fs_mon)
# test flag sets, comma seperated from env or CLI
test_flags = ['-bnc__-da__-e__5', '-bnc__-da__-e__6']

html_tmpl = '''<html>
<body>
%s
<script>
%s
</script>
</body>
</html>'''
redir = html_tmpl % ('%s', 'window.location.href="%s";')

def cd():
    'back to integration test dir'
    os.chdir('%(d_i)s' % env)

@route('/chk/<test:path>')
def chk(test):
    '''
    a single test, intended for browser - stopping after running at the .html
    - test might contain flags (hello::-b -n -c -da -e 5).
    - if not we take the first flag set from test_flags
    '''
    if not '::' in test:
        test += '::' + test_flags[0]
    test = unalias(test)
    reset_ctx()
    ctx['stop'] = 1
    ctx['init_url'] = '/chk/%s' % test
    return index(tests=test, single=1)


@route('/')
@route('/do/<tests:path>')
def index(tests=0, single=None):
    ''' we keep track of which test is run via the ctx structure and
    repeatadly call ourselves'''
    if 'favico' in str(tests):
        return ''

    if not tests and not T:
        # no args -> give info:
        return '<br>'.join((
        'Need a comma seped. list of tests to run, e.g. /do/hello,time',
        'You can also call a single test like /chk/hello or /chk/.dictionaries'))
    cd()
    if not T:
        # first run
        if not single:
            reset_ctx()
            ctx['init_url'] = '/do/%s' % tests
        if os.path.exists('./%s' % tests):
            info(I('loading test set'))
            with open(tests) as fd:
                tests = fd.read()
            # ignoring '# ...' lines, using 'foo' in 'foo # comment' lines:
            tests = [k.split('#')[0].strip() for k in tests.splitlines() \
                     if k and not k.startswith('#')]
        else:
            # alternative form:
            tests = [k.strip() for k in tests.split(',')]

        _t = []
        for t in tests:
            if '::' in t:
                _t.append(t)
                continue
            for flags in test_flags:
                _t.append(t + '::' + flags)
        tests = _t
        T.extend(tests)
        if exists(stop_flag):
            os.unlink(stop_flag)
        T.append(test_end_marker)

    t = ctx['cur_test']
    # when we come again for the next test, this was the last we ran:
    last = ctx.get('cur_test')
    if last:
        ctx['have_run'].append(last)

    # next test:
    t = ctx['cur_test'] = T[0] if not t else T[T.index(t) + 1 ]
    t = unalias(t)
    if t == test_end_marker:
        ts = ['<a href="/chk/%s">%s</a>' % (k, k) \
                for k in ctx.get('have_run', ())]
        testlist = '<ul><li>' + '</li><li>'.join(ts) + '</li></ul>'
        return stop('All tests finished:Success.', postfix=testlist)

    for s in ('', 'Next test', I('-' * 20), M(t), I('-' * 20)):
        info(s)
    return redir % ('', '/run_test/' + t)

def unalias(t):
    if t.startswith('.'): # shortcut
        t = 'transcrypt/' + t[1:]
    return t

def short(d):
    return d.replace(env['d_0'] + '/', '')

def run_t(*args):
    'invoke transcrypt with flags'
    args = ' '.join(args)
    args = args.replace('__', ' ')
    dbg_args = ' -v ' + args
    cmd = '%s %s' % (env['run_transcr'], args)
    dbg_cmd = '%s %s' % (env['run_transcr'], dbg_args)
    info('Invoking transcrypt: %s' % I(short(os.getcwd())), M(short(cmd)))
    if os.system(cmd):
        return os.popen(dbg_cmd + ' 2>&1').read()

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
    '''
    Called 3 times per test (filepath like <testdir>::<flags>)
    1. filepath = the test and the flags -> cd to the test dir, returning redir to:
    2. filepath = 'test_html' (compiling in the test dir ->
                    autotest.html created, which we return)
    3. filepath = '__javascript__/autotest.js' (fetching the js from within the html)
         the js is augemented with the result check and a redir to calling url,
         closing the loop
    '''
    flags = ctx.get('cur_flags', '')
    if '::' in filepath:
        filepath, flags = filepath.split('::', 1)
        ctx['cur_flags'] = flags
    if '__javascript__' in filepath:
        with open(filepath) as fd:
            js = fd.read()
        if not ctx.get('stop'):
            # we are alraedy in d:
            js += ('\nlocation.href="/result?test=%s&flags=%s&res=" + '
                'document.getElementById("message").innerHTML;') % (
                    os.getcwd(), flags)
        else:
            js += ('\nhistory.pushState({}, null, "%(init_url)s");' % ctx)
            reset_ctx()
        js += '\n\n'
        # outputting the js - too much for travis:
        #splt = "var run = function (autoTester) {"
        #if splt in js:
        #    debug(js.split(splt, 1)[1])
        return js

    if not filepath.startswith('test_html'):
        # the compile takes long so we display a message, while we redir to
        # this method again:
        d = j(env['d_at'], filepath)
        os.chdir(d)
        return redir % ('compiling tests in %s... (using %s)' % (d, flags),
                '/run_test/test_html::' + flags)

    d = os.getcwd()
    env['PYTHONPATH'] = '.'
    fn = 'autotest'
    if not '%s.py' % fn in os.listdir(d):
        if not '__init__.py' in os.listdir(d):
            return redir % ('err', '/result?test=%s&flags=%s&res=ERROR' % (
                d, flags))
        print(M('creating ci autotest.py file'))
        fn = 'ci'

    d_was = d
    if fn == 'ci':
        d, test = d.rsplit('/', 1)
        os.chdir(d)
        with open(fn + '.py', 'w') as fd:
            fd.write(ci_at % (test, test))

    err = None
    for _flags in ['-r %s' % flags, flags]:
        err = run_t(_flags, './%s.py' % fn)
        if err:
            break
        #env['PYTHONPATH'] = '/root/Transcrypt/transcrypt/modules:.'

    with open('%s.html' % fn) as fd:
        html = fd.read()
    html = '<h4>%s</h4>' % d_was + html
    if err:
        html = '<h1>ERROR</h1><hr><pre>%s</pre>' % err

    if ctx.get('stop'):
        # this is a single test, run via /chk/<test>
        # the test has to load still, need the stopflag not to be deleted:
        # otherwise the js would be augmented with the href forward:
        return stop(html, no_reset=True)

    # if the js fails we would not get a result hit, so:
    if err:
        global max_wait
        max_wait = 0
    cmd = ['sleep %s' % max_wait,
          ('wget -q "http://127.0.0.1:%s/result?'
           'test=%s&flags=%s&res=ERROR" -O /dev/null') % (port, d, flags)]
    # pid:
    ctx['error_reporter'] = subprocess.Popen(' && '.join(cmd), shell=True)

    return html


@route('/result')
def result():
    info('result reported')
    debug('test', request.query.test)
    debug('res', request.query.res)
    debug('flags', request.query.flags)
    try:
        ctx['error_reporter'].kill()
    except:
        pass
    res = request.query.res
    test = request.query.test
    flags = request.query.flags
    # the result div of the autotest html:
    if not 'green' in res and not 'succeeded' in res:
        return stop('ERROR %s %s' % (test, res))
    info(G('SUCCESS'), test)
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
    if not ctx.get('stop'):
        info(col(msg))
    if iu:
        postfix = '<hr>Rerun <a href="%s">%s</a>' % (iu, iu) + postfix
    return msg + postfix



# ------------------------------------------------------ dev mode (auto reload)
def uq(s):
    return urllib.unquote(s)

import threading
fs_changed = threading.Event()
# max reload of test result page at every ... second:
reload_interval = 2
fs_change_msg = 'Filesystem change detected'
@route('/dev/<url:path>')
def dev(url):
    ''' loading the original url within an iframe and polling for fs changes,
    reloading the iframe on changes'''
    if not dev_mode:
        return 'Sorry, please start server in dev mode (multithreaded)'
    u = request.url
    test_url = u.replace('/dev/', '/')
    fs_change_url = u.split('/dev/', 1)[0] + '/dev_fs_changed'
    ctx['last_reload'] = time.time()
    # env['d_0'] is the whole transcrypt directory.
    c = env.get('TS_MON_CMD')
    if c:
        c = c % {'FS_CHANGE_URL': fs_change_url}
        info(L('$TS_MON_CMD : ', I(c)))
        ctx['monitor_cmd'] = c
        ctx['monitor_msg'] = 'Continue polling...'
        info(I('starting FS monitor', M(ctx['monitor_cmd'])))
        ctx['fs_chcker'] = subprocess.Popen(ctx['monitor_cmd'], shell=True)
    else:
        info('Not spawning fs checker (assuming external checker)')
        ctx['monitor_msg'] = 'Waiting for external hit on "%s"' % fs_change_url

    m = {'test_url': test_url,
         'fs_change_msg': fs_change_msg,
         'monitor_msg': ctx['monitor_msg']}

    return html_tmpl % ('''
            <div id="result">Polling for changes...</div>
            <hr>
            <h2>Test Output of %s</h2>
            <h3>Test Flags: %s</h3>
            <iframe id="test_iframe" src="%s" width="100%%" height="100%%">
            </iframe>''' % (uq(test_url), ', '.join(test_flags), test_url),

            '''
            var nr = 1;
            function load_fs_poll_page() {
                document.title = nr + ' Transcrypt Dev Tester';
                var res=document.getElementById("result");
                var xmlhttp = new XMLHttpRequest();

                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
                    if (xmlhttp.status == 200) {
                        var sr = xmlhttp.responseText;
                        if (sr == '%(fs_change_msg)s') {
                            var i = document.getElementById('test_iframe');
                            nr += 1;
                            i.src = "%(test_url)s?nr=" + nr;
                            res.innerHTML = `Test page reloaded.
                            %(monitor_msg)s...`
                        } else {
                            res.innerHTML = sr +
                                    ' - no fs_change. %(monitor_msg)s...';
                        }
                        load_fs_poll_page();
                    }
                    else {
                        res.innerHTML = `Stopping reload.
                        There was an error on the dev server.
                        Fix and reload this page when done.
                        `;
                        }
                    }
                };
                xmlhttp.open("GET", "/dev_fs_poll?test_url=%(test_url)s", true);
                xmlhttp.send();
            }
            load_fs_poll_page();
            ''' % m)

@route('/dev_fs_poll')
def dev_fs_poll():
    ''' returning a timestamp update all 10 secs to the browser.
    Except if there is an event - then we return the change message,
    causing it to reload the page'''
    for i in range(50):
        if fs_changed.wait(0.2):
            fs_changed.clear()
            if not time.time() - ctx['last_reload'] < reload_interval:
                ctx['last_reload'] = time.time()
                return fs_change_msg
            else:
                info(M('Ignoring fs_change event (too frequent)'))
    info('return')
    return time.ctime()

@route('/dev_fs_changed')
def dev_fs_changed():
    info(M('fs change detected'))
    info(fs_changed)
    fs_changed.set()
    return 'event set'


# --------------------------------------------------------------------- logging
def log(meth, *msg): meth(' '.join(str(a) for a in msg))
def debug(*msg): log(logging.debug, *msg)
def info(*msg) : log(logging.info , *msg)
def warn(*msg) : log(logging.warn , *msg)
def error(*msg): log(logging.error, *msg)

def setup_logging():
    unlinked = 0
    if os.path.exists(log_file):
        os.unlink(log_file)
        unlinked = 1

    logging.basicConfig(filename=log_file, level=logging.DEBUG)
    so = logging.StreamHandler()
    rl = logging.getLogger('')
    rl.addHandler(so)
    for h in rl.handlers:
        h.setFormatter(logging.Formatter('%(created)s: %(levelname)s: %(message)s'))
    if unlinked:
        info('Unlinked old logfile: %s' % short(log_file))
    info(I('ENVIRON'), ':')
    info(L('TRUNNER'), ':', M(short(env['run_transcr'])))
    info(L('DEVMODE'), ': ', M('%s' % bool(dev_mode)))
    info(L('$TS_TEST_FLAGS'), ': ', M(', '.join(test_flags)))
    if dev_mode:
        info(L('$TS_MON_CMD'), ': ', M(os.environ.get('TS_MON_CMD') \
                or '(external)'))
    info('')



# ------------------------------------------------------------ ansi term colors
def _col(c, *s): return ("\x1B[38;5;%sm%%s\x1B[0m" % c ) % (' '.join(s))
I = lambda *s: _col(154, *s)
M = lambda *s: _col(111, *s)
G = lambda *s: _col(28, *s)
L = lambda *s: _col(145, *s)
R = lambda *s: _col(124, *s)

def usage(h, p, exit=None, msg=None):
    print
    print I('Usage')
    f = sys.argv[0]
    usage = M('%s <[host:]port> [py_ver] [dev] [flags <flags>]' % f)
    print
    print usage
    print
    print 'e.g. %s 7777 or %s 0.0.0.0:7777' % (f, f)
    print
    print 'When started hit me with a browser at http://%s:%s/[dev/]do/<tests|testset>' % (
            h, p)
    print
    print '- all CLI args are positional, do not change their order'
    print '- single tests via /chk, e.g. /chk/time'
    print '- dev mode (auto page reload) via /dev/<orig url>, e.g. /dev/chk/time'
    print
    print I('Python Version')
    print 'The python version to use for run_transcrypt (not for this test_server)'
    print 'You have available: %s' % M(' or '.join(sorted(avail_pyvers)))
    print 'Default:'
    print R('-') if not avail_pyvers else M(avail_pyvers[-1])
    print
    print I('Logging')
    print 'We log to a gitignored file in the same dir as the test_server'
    print 'We log incl. ansi color codes, i.e. using cat you have colors'
    print 'You can strip color codes like this:\n%s' % L(
            """python -c 'import re; print(re.compile(r"\\x1b[^m]*m").sub("", open("tests.log").read()))'""")
    print
    print I('Testflags')
    print 'You can configure which set of flags you want to test when transpiling.'
    print 'See transcrypt -h output to understand the flags accepted by the transpiler.'
    print 'Testflags via CLI: Supply a comma sep. list of flag sets: flags "<set1>, <set2>,..."'
    print 'Testflags via ENV: The variable $TS_TEST_FLAGS is understood:'
    print 'e.g. export TS_TEST_FLAGS="-b -n, -b -e 5"'
    print 'Note: Urls with spaces are ugly and we do not unquote in all cases.'
    print 'Therefore we allow to ', M('alias a space with two underscores'),' for testflags.'
    print 'Default: %s' % M(', '.join(test_flags))
    print
    print I('Singe Tests')
    print 'Calling /chk/<testname>[::<flags>] results in one single test hit,'
    print 'displaying the result page'
    print 'If no flags are provided we use the first entry of the test_flags array.'
    print
    print I('DEV Mode / FS Monitor')
    print 'If you do not pass an empty string into $TS_MON_CMD we spawn a filesystem'
    print 'monitor via \n"%s",\nwhere %%(FS_CHANGE_URL)s will be replaced by %s'\
            % (M(dflt_fs_mon), M('http://<host>:<port>/dev_fs_changed'))
    print '=> If you want to start your own FS monitor, have it hit this url and'
    print 'export an empty string to $TS_MON_CMD.'
    print 'You can also pass an alternative monitor command to $TS_MON_CMD, which'
    print 'we then spawn.'
    print 'In DEV mode the server is started multithreaded via paste, which is'
    print 'a dependency.'
    print
    print I('Examples')
    print M('Example URLs')
    print 'http://%s:%s/do/time,hello (testing time and hello module)' % (h, p)
    print 'http://%s:%s/do/set1 (testing a set of modules given in file set1)'\
            % (h, p)
    print 'http://%s:%s/chk/time (single module test, default flags)' % (h, p)
    print 'http://%s:%s/chk/time::-bnc -da -e 6 (single module test, custom flags)' % (h, p)
    print 'http://%s:%s/dev/<do|chk>/<module or set> (dev mode, autoreload)' \
            % (h, p)
    print M('Example Startup')
    print "./test_server.py 7777 dev flags '-bnc__-da__-e__5, -b__-n__-c__-da__-e__6"
    print
    print
    print I('Requirements')
    print '- the "wget" command'
    print
    print I('dev mode') + ' requires:'
    print ' - pip install paste (server is started multithreaded then)'
    print ' - the "entr" command (for filesystem monitoring)'
    print 'you can use your own filesystem monitor if you export a custom $TS_MON_CMD'
    print '(default $TS_MON_CMD is printed out when starting in test mode)'
    print
    print I('Arguments Summary')
    print usage
    print
    if msg:
        print R(msg)
    if exit is not None:
        sys.exit(exit)

if __name__ == '__main__':

    h, p = '127.0.0.1', 8080 # default
    l = list(sys.argv) # copy, we'll mutate l
    if not len(l) - 1 or '-h' in l:
        usage(h, p, exit=1)
        sys.exit(1)

    if not avail_pyvers:
        print R('You have not any supported python version (%s)' % \
                ' or '.join(sorted(runners.keys())))
        sys.exit(1)

    # taking highest as default:
    py_ver = avail_pyvers[-1]
    if len(l) > 2 and l[2] in avail_pyvers:
        py_ver = l[2]
        l.pop(2)
    env['run_transcr'] = d0 + '/' + runners[py_ver]

    if len(l) > 2 and l[2] == 'dev':
        l.pop(2)
        dev_mode = 1


    user_flags = os.environ.get('TS_TEST_FLAGS')
    if len(l) > 2 and l[2] == 'flags':
        l.pop(2)
        if not len(l) > 2:
            usage(h, p, exit=1, msg="'flags' argument requires some flags")
        user_flags = l.pop(2)
    if user_flags:
        while test_flags:
            test_flags.pop()
        [test_flags.append(t.strip()) for t in user_flags.split(',') \
                    if t.strip()]

    (host, port) = (h, p) = ('127.0.0.1:%s' % l[1]).split(':')[-2:]
    l.pop(1)
    assert os.system('which wget >/dev/null') == 0, 'require wget'
    if dev_mode:
        assert os.system('which entr >/dev/null') == 0, 'require entr'
    # usage only on -h or no args:
    # usage(h, p)
    stop_flag += '_%s' % p
    try:
        port = int(port)
    except:
        usage(h, p, exit=1,
              msg='Port argument must be integer - is %s' % I(port))

    # all switches must be popped now:
    if not len(l) == 1:
        usage(h, p, exit=1, msg='Note that all args are positional')

    setup_logging()

    if not dev_mode:
        info(I('Starting single threaded'))
        run(host=host, port=port)
    else:
        info(I('Starting multi threaded (dev mode)'))
        from bottle import PasteServer
        run(server=PasteServer, host=host, port=port)


