var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var items = [
	'9.00 AM - 10.00 AM',
	'10.00 AM - 11.00 AM',
	'11.00 AM - 12.00 PM',
	'12.00 PM - 01.00 PM',
	'01.00 PM - 02.00 PM',
	'02.00 PM - 03.00 PM',
	'03.00 PM - 04.00 PM',
	'04.00 PM - 05.00 PM'
];
var root = __dirname;
var responseHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10,
    "Content-Type": "application/json"
};

var server = http.createServer(function(req, res) {
	// Web Service
	console.log(req.method);
	if(req.url == '/') {
		switch(req.method) {
			case 'GET':
				res.setHeader('Access-Control-Allow-Origin', '*');
				res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
				res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
				// res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(items));
			break;
		}
	} else {
		res.setHeader('content-Type', 'text/plain');
		res.write('<h4>Sorry URL not recognized.</h4>');
		res.end();
	}
});

server.listen(3003);
