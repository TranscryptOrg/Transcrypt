# Contininuous Integration for Transcrypt


1. Read
   [this](https://github.com/mbonaci/mbo-storm/wiki/Integrate-Travis-CI-with-your-GitHub-repo), its short.


1. `.travis.yml` runs the `run` file herein. 2 times.

    - run prepare
    - run <testsetfile>

1. prepare pulls dependencies.

1. testsetfile contains a number of tests, one per line

## Files

- run: Starter of firefox and app server. also prepares environ.
- set1: A testset file
- test_server.py: The app server which compiles the autotest.py files and
  guides the browser throught the single tests, via js location.href settings
to itself

## Test Strategy

phantomjs was of not much use, deps missing. fixable maybe.

So we start a real browser, in headless X mode.

To not have it starting per test dir we start it only once and let it hit a
URL: `http://127.0.0.1:<port>/do/test1,test2,...`

This url is served by a little bottle app server, who

1. parses the tests to be run
1. per test returns javascript files which make the browser hit
1. /run_test/<single_test>
1. bottle then cds into the single_test dir (starting from automatic_tests) and
    - compiles the autotest.py file for py and js, then
    - makes the browser hit the result page, which
    - yet again hits pottle with the content of the messages div
      (/result/?res...) URL

1. There bottle checks if successful is contained.


If succesful -> redirect to first page, now tests (T) are filled, next one,
loop


## Error handling:

After compilation a wget is started which hits the result url with res=ERROR -
but only after 10 seconds.

The pidfile of this wgetter is killed when there was success.





## Local Running of this

You don't need firefox headless, use your broser.
-> check the deps in `run` when `$1` is "prepare" and install them.

then call `run <testsetname>`


Perf: we can run one testsetfile per port (later), envvar for port is
`$TEST_PORT`


NOTE: We don't run ALL TC autotests in one go, but dir by dir - and create
ci.py files if autotest.py is missing e.g. in transcrypt/dictionaries.
Read `test_server.py` for details.





