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

see [here](http://trac.axiros.com:1086/?lz=dHJhdmlzLT5ydW46ICQxID0gInByZXBhcmUiCm5vdGUgb3ZlciAAGQVmZXRjaGVzIGRlcHMKACgQJDIgPSBzZXQgInNldDEAKxFyZWFkcyBmaWxlIHNldDEsIHNwbGl0cyBieSBsaW5lLCBcbnN0YXJ0cyBhcHAgc2VydmVyIChib3R0bGUpIGFuZCBcbmZpcmVmb3ggYXQgL2RvL3Rlc3QxLHRlc3QyLC4uLiAoYWxsAEgFcyBpbgBhBSkKcnVuLT4AMQc6IABdBSBhdCAxMjcuMC4wLjE6ODA4MAA9EAAwBgB-BgAtCHVwICh0ZXN0XwCBFQYucHkpCgCBCQcAIQoAgQMTAII5CwBJCGJ1aWxkcyBUPVsAgTwGIACBOgldIGlmIG5vdCBzZXQsIHJlbWVtYmVycyAoZm9yIG5leHQgaGl0KSwKXG5jdXI9AIF7BQoAgiUGAIFaC3JlZGlyZWN0IHRvIC9ydW5fdGVzdACCJwYAgR8TABIPAIEcEmNoZGlyIGludG8gYXV0bwBCCwBnE3R1cm4gbWVzc2FnZSArAH4Nc2FtZSBtZXRob2QAgikQAIEcCmNvbXBpbGVkCmFsdDoAZwkucHkgcHJlc2VudCBpbiBjdXIgZGlyAIEYFAA5BgAsDXdpdGggLXIAhD4FLWJuLCAuLi4KZWxzZQCBUxkuLiwgY3JlYXRlIGNpADoJAIJPBm9yeSB0aGUgaW1wb3J0LlxuAGsIbGlrAGsNCgplbmQgYWx0AINuE2FwcGVuZHMARAVyZXN1bHQgY2hlY2sgdG8AWAVnZW5lcmF0ZWQgamF2YXNjcmlwdCAAhDYTAIYrBjogc2xlZXAgMTA7IHdnZXQgLwBOBj90ZXN0PS4uLiZyZXM9RVJST1IAhEgMcGlkAIdVC2Vycm9yXwCBAQUAhW8FAEsHAIMBB2xsIHdvcmtzAIRPHgCEFwggb3IgY2kuaHRtbAoAhhIScHVsbAAWFQAUFgCBeBQsIFxuKHdoaWNoIHdhcyBtb2RpZmllZCBmb3IAgkMRLikKAIk8CwCGGwp1biBqcwCFfBQAgjELAIhcBQCCOQU8Y29udGVudCBvZiBkaXY-AIYTFWVja3MgACEIZm9yIFNVQ0NFU1MAhwkacwCGFAUAiRAFcGFnZSAoL2RvL25leHQpLACHaQYAhXkFAIUoBgCDFQ0AgRAhAINqBQCIaRN3cml0ZXMgc3RvcF9mbGFnAIsNBQCLWBBzZQAXDCwgZXhpdHMgMQCFSQkKCgoK&s=default)

As text:

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


## Local Running of this

You don't need firefox headless, use your broser.
-> check the deps in `run` when `$1` is "prepare" and install them.

then call `run <testsetname>`


Perf: we can run one testsetfile per port (later), envvar for port is
`$TEST_PORT`


NOTE: We don't run ALL TC autotests in one go, but dir by dir - and create
ci.py files if autotest.py is missing e.g. in transcrypt/dictionaries.
Read `test_server.py` for details.





