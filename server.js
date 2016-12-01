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

var server = http.createServer(function(req, res) {
	// Web Service
	if(req.url == '/') {
		switch(req.method) {
			case 'GET':
				res.setHeader('Access-Control-Allow-Origin', '*');
				res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
				res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
				// res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(items));
				// items.forEach(function(item, i) {
					// res.write(i + ') ' + item + '\n');
				// });
				// res.end();

				// Optimized Way.
				// var body = items.map(function(item, i) {
					// return i + ') ' + item;
				// }).join('\n');
				// res.setHeader('Content-Length', Buffer.byteLength(body));
				// res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
				// res.end(body);

			break;
			case 'POST':
				//req.on('data', function(chunck) { //Chunk is Byte Array, in Node Buffer Objects.
				//	console.log('parsed', chunk);
				//});
				//To set incoming data a UTF String
				console.log('Status: ' + res.statusCode);
				console.log('Headers: ' + JSON.stringify(res.headers));
				req.setEncodeing('utf8');
				req.on('data', function(chunk) {
					console.log(chunk);
					item += chunk;
				});
				req.on('end', function() {
					console.log("Done with Parsing.");
					items.push(item);
					res.end();
				});
				break;
			case 'PUT':
				var parsedUrl = url.parse(req.url);
				var path = parsedUrl.pathname;
				var queryItems = parsedUrl.query.split('=');
				if(isNaN(queryItems[0])) {
					res.StatusCode = 400;
					res.end('Invalid item ID.');
				} if(!items[queryItems[0]]) {
					res.StatusCode = 404;
					res.end('Item ID Not Found.');
				} else {
					res.StatusCode = 200;
					items[queryItems[0]] = queryItems[1];
				}
			break;
			case 'DELETE':
				console.log(req.url);
				var path = url.parse(req.url).pathname;
				var i = parseInt(path.slice(1), 10);
				if (isNaN(i)) {
					res.StatusCode = 400;
					res.end('Invalid item ID.');
				}
				if (!items[i]) {
					res.StatusCode = 404;
					res.end('Item ID Not Found.');
				} else {
					res.StatusCode = 200;
					items.splice(i, 1);
					res.end("Item Delete Successfully.")
				}
			break;
		}
	} else {
		res.setHeader('content-Type', 'text/plain');
		res.write('<h4>Sorry URL not recognized.</h4>');
		res.end();
	}

	// Serving Static Files
	if (req.url == '/someFile') {
		var resourceLocation = path.join(root, url.parse(req.url).pathname);
		var stream = fs.createReadStream(resourceLocation);

		// Streaming of data from File.
		// stream.on('data', function(chunk) {
			// res.write(chunk);
		// });
		// stream.on('end', function() {
			// res.end();
		// })

		//Optimized way to read data from file using File.
		stream.pipe(res);
	}
});

server.listen(3003);
