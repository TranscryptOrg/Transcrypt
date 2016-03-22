http = require ('http')

def serve (request, response): 
	response.writeHead (200, {'Content-Type': 'text/plain'})
	response.end ('Use node.js libs and still write Python...\n')
	
http.createServer (serve)v.listen (8000);
console.log("Server running at http://127.0.0.1:8000/");
