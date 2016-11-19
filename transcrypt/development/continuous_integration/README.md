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



## Sequence

```
travis->run: $1 = "prepare"
note over run: fetches deps
travis->run: $1 $2 = set "set1"
note over run: reads file set1, splits by line, \nstarts app server (bottle)
and \nfirefox at /do/test1,test2,... (all lines in set1)
run->firefox: start at 127.0.0.1:8080/do/test1,test2,
run->server: start up (test_server.py)
firefox->server: /do/test1,test2,...
note over server: builds T=[test1, test2,...] if not set, remembers (for next
hit),
\ncur=test1
server->firefox: redirect to /run_test/test1
firefox->server: /run_test/test1
note over server: chdir into autotest/test1
server->firefox: return message + redirect to same method
firefox->server/run_test/compiled
alt: autotest.py present in cur dir
note over server: compile autotest.py with -r and -bn, ...
else
note over server: chdir .., create ci.py with directory the import.\ncompile
like autotest.py

end alt
note over server: appends the result check to the generated javascript 
note over server: starts: sleep 10; wget /result?test=...&res=ERROR, remembers
pid
note over error_checker: sleep 10
alt: all works
server->firefox: redirect to autotest or ci.html

firefox->server: pull autotest or ci.html
firefox->server: pull generated javascript, \n(which was modified for the
result check.)

note over firefox: run js
firefox->server: /result?test=test1&res=<content of div>
note over server: checks content for SUCCESS
server->firefox: redirects to start page (/do/next), next test.
else
error_checker->server: /result?test=test1&res=ERROR
note over server: writes stop_flag file
note over run: sees stop_flag, exits 1
end alt

```

Render this in a sequence diag tool, e.g. plantuml or [here](http://trac.axiros.com:1086/?lz=dHJhdmlzLT5ydW46ICQxID0gInByZXBhcmUiCm5vdGUgb3ZlciAAGQVmZXRjaGVzIGRlcHMKACgQJDIgPSBzZXQgInNldDEAKxFyZWFkcyBmaWxlIHNldDEsIHNwbGl0cyBieSBsaW5lLCBcbnN0YXJ0cyBhcHAgc2VydmVyIChib3R0bGUpIGFuZCBcbmZpcmVmb3ggYXQgL2RvL3Rlc3QxLHRlc3QyLC4uLiAoYWxsAEgFcyBpbgBhBSkKcnVuLT4AMQc6IABdBSBhdCAxMjcuMC4wLjE6ODA4MAA9EAAwBgB-BgAtCHVwICh0ZXN0XwCBFQYucHkpCgCBCQcAIQoAgQMTAII5CwBJCGJ1aWxkcyBUPVsAgTwGIACBOgldIGlmIG5vdCBzZXQsIHJlbWVtYmVycyAoZm9yIG5leHQgaGl0KSwKXG5jdXI9AIF7BQoAgiUGAIFaC3JlZGlyZWN0IHRvIC9ydW5fdGVzdACCJwYAgR8TABIPAIEcEmNoZGlyIGludG8gYXV0bwBCCwBnE3R1cm4gbWVzc2FnZSArAH4Nc2FtZSBtZXRob2QAgikQAIEcCmNvbXBpbGVkCmFsdDoAZwkucHkgcHJlc2VudCBpbiBjdXIgZGlyAIEYFAA5BgAsDXdpdGggLXIAhD4FLWJuLCAuLi4KZWxzZQCBUxkuLiwgY3JlYXRlIGNpADoJAIJPBm9yeSB0aGUgaW1wb3J0LlxuAGsIbGlrAGsNCgplbmQgYWx0AINuE2FwcGVuZHMARAVyZXN1bHQgY2hlY2sgdG8AWAVnZW5lcmF0ZWQgamF2YXNjcmlwdCAAhDYTAIYrBjogc2xlZXAgMTA7IHdnZXQgLwBOBj90ZXN0PS4uLiZyZXM9RVJST1IAhEgMcGlkAIdVC2Vycm9yXwCBAQUAhW8FAEsHAIMBB2xsIHdvcmtzAIRPHgCEFwggb3IgY2kuaHRtbAoAhhIScHVsbAAWFQAUFgCBeBQsIFxuKHdoaWNoIHdhcyBtb2RpZmllZCBmb3IAgkMRLikKAIk8CwCGGwp1biBqcwCFfBQAgjELAIhcBQCCOQU8Y29udGVudCBvZiBkaXY-AIYTFWVja3MgACEIZm9yIFNVQ0NFU1MAhwkacwCGFAUAiRAFcGFnZSAoL2RvL25leHQpLACHaQYAhXkFAIUoBgCDFQ0AgRAhAINqBQCIaRN3cml0ZXMgc3RvcF9mbGFnAIsNBQCLWBBzZQAXDCwgZXhpdHMgMQCFSQkKCgoK&s=default)



## Run the Tests Outside Travis

You don't need firefox headless, use your broser.
-> check the deps in `run` when `$1` is "prepare" and install them.

Then call `run <test set name>`, e.g. `run set1`

`run kill set1` would first kill the app server (if it was running) by `KILLALL
[-9] python2`(!) - which you don't want on a system with running py2 demons!

The app server then starts and you can hit it with your browser to see how the tests
go.

Performance: we can run one test set file per port (later), envvar for port is
`$TEST_PORT`


NOTE: We don't run ALL TC autotests in one go, but dir by dir - and create
ci.py files if autotest.py is missing e.g. in transcrypt/dictionaries.
Read `test_server.py` for details.


### Dev Mode

In Dev mode the server reloads the test page(s) automatically on file system
change.

Here is an informal demo cast explaining what it does: https://www.youtube.com/watch?v=lvTjKWVOwXA

Start the server like this

    ./test_server.py <port> dev

and hit the test url like this

    http://127.0.0.1:<port>/dev/<test_url

e.g.

    http://127.0.0.1:<port>/dev/chk/time

For dev mode you need to `pip install paste` and also have the `entr` command
in your path as a file system change monitor.

Overriding the default:

Check the `$TS_MON_CMD` command output and optionally export a custom one
before starting test test server. Necessary is the hit on the server whenever
there is a change.


### Building Your Own CI Chain

If you want to have the testing done outside travis you'll need a headless X
server and a browser installed on the test site, currently firefox. Have a look at the `run`
script, in order to see how firefox is started with the `set1` testset used as
base url.







