Logging AJAX Handler Manual Test
================================

This directory contains the following:

1. `ajaxlogclient.(html|py)` - A transcrypt-based web-page that sets up a logger using the `logging` module and adds two handlers. The first is a custom HTML Handler for showing log messages on the screen. The second is an AJAX Handler that pushes messages to a server. This file can be loaded from the filesystem by firefox or chrome.
2. `ajaxlogserver.py` - A small test server script that acts as an endpoint to receive the AJAX Handler log messages.


To run the test, do the following:

1. Compile the transcript webpage

```
  $> transcrypt -e 5 ajaxlogclient.py
```

2. Run the server endpoint:

```
  $> ./ajaxlogserver.py
```

3. Load the webpage in a browser:

```
  $> firefox ajaxlogclient.html
```

4. Check that the output looks like you expect it to look:

Server Endpoint Output:

```
$> ./ajaxlogserver.py
running server...
MSG: ['INFO[08:59:49]: Started AJAX Logger']
127.0.0.1 - - [30/Nov/2016 08:59:49] "POST /log HTTP/1.1" 200 -
MSG: ['INFO[08:59:50]: Message on The Bus goes Round and Round']
127.0.0.1 - - [30/Nov/2016 08:59:50] "POST /log HTTP/1.1" 200 -
MSG: ['INFO[08:59:51]: Message on The Bus goes Round and Round']
127.0.0.1 - - [30/Nov/2016 08:59:51] "POST /log HTTP/1.1" 200 -
MSG: ['INFO[08:59:52]: Message on The Bus goes Round and Round']
127.0.0.1 - - [30/Nov/2016 08:59:52] "POST /log HTTP/1.1" 200 -
MSG: ['INFO[08:59:53]: Message on The Bus goes Round and Round']
```

Browser Client Output:

![Image of Browser Test Output](https://cloud.githubusercontent.com/assets/15036736/20763406/c6c1b1ac-b6de-11e6-9283-fbfd7f003e3b.png)
