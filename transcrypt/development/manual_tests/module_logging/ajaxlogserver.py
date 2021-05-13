#!/usr/bin/env python3
# File: logAjax.py
# Author: Carl Allendorph

import argparse
import http.server
from urllib.parse import urlparse, parse_qs

def setup_options():
    parser = argparse.ArgumentParser(description="Simple Ajax Logger Test Server")
    parser.add_argument("--host", dest="host", default="127.0.0.1",
                        help="Which network interface this server will bind to. Default is %(default)s")
    parser.add_argument("--port", dest="port", default=8081,type=int,
                        help="The port that the HTTP server will bind to.")
    args = parser.parse_args()
    return(args)


class reqHandler(http.server.BaseHTTPRequestHandler):

    def print_log(self, qdata):
        if "msg" in qdata:
            print("MSG: %s" % qdata["msg"])
        else:
            print("ERROR: No Message")


    def do_GET(self):
        self.send_response(200)

        p = urlparse(self.path)
        qdata = parse_qs(p.query)
        self.print_log(qdata)

        self.send_header('Content-type','text/plain')
        self.end_headers()

        self.wfile.write(bytes("OK", "utf8"))
        return

    def do_POST(self):

        data = self.rfile.read(int(self.headers['Content-Length']))
        data = data.decode('utf-8')
        qdata = parse_qs(data)
        self.print_log(qdata)

        self.send_response(200)
        self.send_header('Content-type','text/plain')
        self.end_headers()

        self.wfile.write(bytes("OK", "utf8"))
        return

    def do_OPTIONS(self):
        self.send_response(200)

        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()


if __name__ == "__main__":

    opts = setup_options()

    addr = (opts.host, opts.port)
    httpd = http.server.HTTPServer(addr, reqHandler)
    print('running server...')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("exiting...")
