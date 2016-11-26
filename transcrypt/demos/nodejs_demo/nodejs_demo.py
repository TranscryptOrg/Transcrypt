# Compile with p. command line switch (see docs).
# The example will be served at URL: http://localhost:8080 in your browser

http = require ('http')

class Demo:
    texts = (
        'Welcome to the world of node.js',
        'You can have your cake and eat it',
        'Use node\'s ecosystem while programming in Python',
        'Using node.js from Transcrypt is easy',
        'Take a Python ride into the node.js world'
    )

    def __init__ (self, port):
        print ('Demo server started on port', port)
        self.server = http.createServer (self.serve)
        self.server.listen (port)
        self.oldIndex = 0
        self.newIndex = 0
        self.count = 0
        
    def serve (self, request, response):
        response.writeHead (200)
        
        print ('Serving page', self.count)
        self.count += 1
        
        while self.newIndex == self.oldIndex:
            self.newIndex = int (Math.random () * len (self.texts))
        self.oldIndex = self.newIndex
        
        response.end ('<h1>{}</h1>'.format (
            self.texts [self.newIndex]
        ))

demo = Demo (8080)
